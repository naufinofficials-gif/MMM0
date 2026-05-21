import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { User, Lock, Save } from 'lucide-react';

const Profile = () => {
  const { currentUser, updateProfile } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    bankAccount: currentUser?.bankAccount || '',
    eWallet: currentUser?.eWallet || '',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' });

  if (!currentUser) return null;

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(currentUser.id, formData);
    setIsEditing(false);
    alert('Profil berhasil diperbarui!');
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.currentPassword !== currentUser.password) {
      setPasswordMsg({ type: 'error', text: 'Password saat ini salah.' });
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'Konfirmasi password tidak cocok.' });
      return;
    }
    
    updateProfile(currentUser.id, { password: passwordData.newPassword });
    setPasswordMsg({ type: 'success', text: 'Password berhasil diubah!' });
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Pengaturan Akun</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Profile Info */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <User className="h-5 w-5 text-blue-600" /> Profil Pengguna
            </h3>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Edit
              </button>
            )}
          </div>
          
          <div className="p-6">
            <form onSubmit={handleProfileSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Username</label>
                  <input
                    type="text"
                    disabled
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-500 sm:text-sm"
                    value={currentUser.username}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700">Nama Lengkap</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    required
                    className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${
                      isEditing ? 'border-blue-300 focus:ring-blue-500 focus:border-blue-500 bg-white' : 'border-slate-300 bg-slate-50 text-slate-700'
                    }`}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">No. Rekening & Bank</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    required
                    className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${
                      isEditing ? 'border-blue-300 focus:ring-blue-500 focus:border-blue-500 bg-white' : 'border-slate-300 bg-slate-50 text-slate-700'
                    }`}
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">E-Wallet</label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    className={`mt-1 block w-full px-3 py-2 border rounded-md sm:text-sm ${
                      isEditing ? 'border-blue-300 focus:ring-blue-500 focus:border-blue-500 bg-white' : 'border-slate-300 bg-slate-50 text-slate-700'
                    }`}
                    value={formData.eWallet}
                    onChange={(e) => setFormData({ ...formData, eWallet: e.target.value })}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="mt-6 flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: currentUser.name,
                        bankAccount: currentUser.bankAccount,
                        eWallet: currentUser.eWallet,
                      });
                    }}
                    className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" /> Simpan
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Password Change */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-600" /> Ubah Password
            </h3>
          </div>
          
          <div className="p-6">
            {passwordMsg.text && (
              <div className={`mb-4 p-3 rounded-md text-sm ${passwordMsg.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
                {passwordMsg.text}
              </div>
            )}
            
            <form onSubmit={handlePasswordSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700">Password Saat Ini</label>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700">Password Baru</label>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">Konfirmasi Password Baru</label>
                  <input
                    type="password"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-colors"
                >
                  Perbarui Password
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;