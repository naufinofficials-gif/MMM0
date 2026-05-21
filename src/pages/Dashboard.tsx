import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Upload, CheckCircle, Clock, AlertCircle, ArrowUpRight, ArrowDownLeft, Copy } from 'lucide-react';

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const Dashboard = () => {
  const { currentUser, transactions, settings, createTransaction, uploadProof } = useStore();
  const [proofUrl, setProofUrl] = useState('');
  const [selectedTxId, setSelectedTxId] = useState<string | null>(null);

  if (!currentUser) return null;

  const myTransactions = transactions.filter(t => t.userId === currentUser.id).sort((a, b) => b.createdAt - a.createdAt);
  
  const handlePH = () => {
    if (window.confirm(`Anda akan melakukan Provide Help (PH) sebesar ${formatRupiah(settings.phValue)}. Lanjutkan?`)) {
      createTransaction('PH', currentUser.id, settings.phValue);
    }
  };

  const handleGH = () => {
    if (!currentUser.hasProvidedHelp) {
      alert('Anda harus melakukan Provide Help (PH) terlebih dahulu sebelum bisa Get Help (GH).');
      return;
    }
    
    // Check if there's a completed PH that is older than ghTimeframe
    const completedPHs = myTransactions.filter(t => t.type === 'PH' && t.status === 'completed' && t.completedAt);
    const eligiblePH = completedPHs.find(t => {
      const daysSinceCompletion = (Date.now() - t.completedAt!) / (1000 * 60 * 60 * 24);
      return daysSinceCompletion >= settings.ghTimeframe;
    });

    // For demonstration, we'll allow GH if they have any completed PH, ignoring the strict timeframe check
    // In a real app, you'd enforce the `eligiblePH` check.
    if (completedPHs.length === 0) {
       alert('PH Anda belum selesai diverifikasi.');
       return;
    }

    if (window.confirm(`Anda akan melakukan Get Help (GH) sebesar ${formatRupiah(settings.ghValue)}. Lanjutkan?`)) {
      createTransaction('GH', currentUser.id, settings.ghValue);
    }
  };

  const handleUploadProof = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTxId && proofUrl) {
      uploadProof(selectedTxId, proofUrl);
      setSelectedTxId(null);
      setProofUrl('');
      alert('Bukti transfer berhasil diunggah dan menunggu verifikasi admin.');
    }
  };

  const copyReferral = () => {
    navigator.clipboard.writeText(currentUser.referralCode);
    alert('Kode referral disalin!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Halo, {currentUser.name}!</h1>
          <p className="text-slate-600">Selamat datang di dashboard {settings.siteName}</p>
        </div>
        
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-blue-600 font-medium">Kode Referral Anda</p>
            <p className="font-mono font-bold text-lg text-slate-900">{currentUser.referralCode}</p>
          </div>
          <button 
            onClick={copyReferral}
            className="p-2 bg-white rounded-md text-blue-600 hover:bg-blue-100 transition-colors"
            title="Salin Kode"
          >
            <Copy className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Provide Help Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
            <ArrowUpRight className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Provide Help (PH)</h2>
          <p className="text-slate-600 mb-6">Berikan bantuan kepada anggota lain untuk memulai perjalanan Anda.</p>
          <div className="text-2xl font-bold text-blue-600 mb-6">{formatRupiah(settings.phValue)}</div>
          <button
            onClick={handlePH}
            className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Berikan Bantuan
          </button>
        </div>

        {/* Get Help Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <ArrowDownLeft className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Get Help (GH)</h2>
          <p className="text-slate-600 mb-6">Terima bantuan setelah {settings.ghTimeframe} hari melakukan PH.</p>
          <div className="text-2xl font-bold text-green-600 mb-6">{formatRupiah(settings.ghValue)}</div>
          <button
            onClick={handleGH}
            disabled={!currentUser.hasProvidedHelp}
            className={`w-full py-3 px-4 font-medium rounded-lg transition-colors ${
              currentUser.hasProvidedHelp 
                ? 'bg-green-600 text-white hover:bg-green-700' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {!currentUser.hasProvidedHelp ? 'Lakukan PH Terlebih Dahulu' : 'Terima Bantuan'}
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="text-lg font-bold text-slate-900">Riwayat Transaksi</h3>
        </div>
        
        {myTransactions.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            Belum ada transaksi.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-600 text-sm">
                  <th className="px-6 py-3 font-medium">Tanggal</th>
                  <th className="px-6 py-3 font-medium">Jenis</th>
                  <th className="px-6 py-3 font-medium">Jumlah</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {myTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {format(tx.createdAt, 'dd MMM yyyy HH:mm', { locale: id })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        tx.type === 'PH' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {formatRupiah(tx.amount)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5">
                        {tx.status === 'pending' && <Clock className="w-4 h-4 text-amber-500" />}
                        {tx.status === 'matched' && <AlertCircle className="w-4 h-4 text-blue-500" />}
                        {tx.status === 'waiting_verification' && <Clock className="w-4 h-4 text-purple-500" />}
                        {tx.status === 'completed' && <CheckCircle className="w-4 h-4 text-green-500" />}
                        {tx.status === 'rejected' && <AlertCircle className="w-4 h-4 text-red-500" />}
                        
                        <span className="text-sm capitalize text-slate-700">
                          {tx.status.replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {tx.type === 'PH' && tx.status === 'matched' && (
                        <button
                          onClick={() => setSelectedTxId(tx.id)}
                          className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1"
                        >
                          <Upload className="w-4 h-4" /> Upload Bukti
                        </button>
                      )}
                      {tx.proofUrl && (
                        <a href={tx.proofUrl} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-slate-700 underline text-xs">
                          Lihat Bukti
                        </a>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {selectedTxId && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold text-slate-900 mb-4">Upload Bukti Transfer</h3>
            <p className="text-sm text-slate-600 mb-4">
              Silakan masukkan URL gambar bukti transfer Anda (misal dari imgur, postimg, dll).
            </p>
            <form onSubmit={handleUploadProof}>
              <input
                type="url"
                required
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-4"
                value={proofUrl}
                onChange={(e) => setProofUrl(e.target.value)}
              />
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedTxId(null)}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Kirim Bukti
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;