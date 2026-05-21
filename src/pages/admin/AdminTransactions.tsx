import React, { useState } from 'react';
import { useStore, TransactionStatus } from '../../store/useStore';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { Check, X, ExternalLink } from 'lucide-react';

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
};

const AdminTransactions = () => {
  const { transactions, users, verifyTransaction } = useStore();
  const [filter, setFilter] = useState<'all' | 'waiting_verification'>('waiting_verification');

  const filteredTxs = transactions
    .filter(t => filter === 'all' || t.status === filter)
    .sort((a, b) => b.createdAt - a.createdAt);

  const handleVerify = (txId: string, status: TransactionStatus) => {
    if (window.confirm(`Anda yakin ingin mengubah status transaksi ini menjadi ${status}?`)) {
      verifyTransaction(txId, status);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Monitoring Transaksi</h1>
        
        <div className="flex gap-2 bg-white p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setFilter('waiting_verification')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'waiting_verification' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Menunggu Verifikasi
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === 'all' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            Semua Transaksi
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-sm">
                <th className="px-6 py-3 font-medium">Tanggal</th>
                <th className="px-6 py-3 font-medium">User</th>
                <th className="px-6 py-3 font-medium">Jenis</th>
                <th className="px-6 py-3 font-medium">Jumlah</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Bukti</th>
                <th className="px-6 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredTxs.map((tx) => {
                const user = users.find(u => u.id === tx.userId);
                const isPendingVerification = tx.status === 'waiting_verification';

                return (
                  <tr key={tx.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {format(tx.createdAt, 'dd MMM yyyy HH:mm', { locale: id })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{user?.username || 'Unknown'}</div>
                      <div className="text-xs text-slate-500">{user?.name}</div>
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
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        tx.status === 'completed' ? 'bg-green-100 text-green-800' :
                        tx.status === 'rejected' ? 'bg-red-100 text-red-800' :
                        tx.status === 'waiting_verification' ? 'bg-purple-100 text-purple-800' :
                        'bg-slate-100 text-slate-800'
                      }`}>
                        {tx.status.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {tx.proofUrl ? (
                        <a 
                          href={tx.proofUrl} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          Lihat <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      {isPendingVerification && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleVerify(tx.id, 'completed')}
                            className="p-1.5 bg-green-100 text-green-700 hover:bg-green-200 rounded-md transition-colors"
                            title="Setujui"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleVerify(tx.id, 'rejected')}
                            className="p-1.5 bg-red-100 text-red-700 hover:bg-red-200 rounded-md transition-colors"
                            title="Tolak"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
              {filteredTxs.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    Tidak ada transaksi yang sesuai filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminTransactions;