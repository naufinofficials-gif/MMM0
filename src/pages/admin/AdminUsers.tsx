import React from 'react';
import { useStore, UserStatus } from '../../store/useStore';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { ShieldAlert, ShieldCheck, Ban } from 'lucide-react';

const AdminUsers = () => {
  const { users, updateUserStatus } = useStore();

  const handleStatusChange = (userId: string, currentStatus: UserStatus) => {
    let newStatus: UserStatus = 'active';
    
    if (currentStatus === 'active') {
      const action = window.prompt('Pilih aksi: ketik "suspend" atau "ban"');
      if (action === 'suspend') newStatus = 'suspended';
      else if (action === 'ban') newStatus = 'banned';
      else return; // Cancelled or invalid
    } else {
      if (window.confirm('Aktifkan kembali user ini?')) {
        newStatus = 'active';
      } else {
        return;
      }
    }

    updateUserStatus(userId, newStatus);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-8">Manajemen User</h1>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-600 text-sm">
                <th className="px-6 py-3 font-medium">Username / Nama</th>
                <th className="px-6 py-3 font-medium">Kontak & Rekening</th>
                <th className="px-6 py-3 font-medium">Referral</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Bergabung</th>
                <th className="px-6 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.filter(u => u.role !== 'admin').map((user) => (
                <tr key={user.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{user.username}</div>
                    <div className="text-sm text-slate-500">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    <div><span className="font-medium">Bank:</span> {user.bankAccount}</div>
                    <div><span className="font-medium">E-Wallet:</span> {user.eWallet || '-'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="text-slate-900 font-mono">{user.referralCode}</div>
                    {user.referredBy && <div className="text-slate-500 text-xs">Ref by: {user.referredBy}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'suspended' ? 'bg-amber-100 text-amber-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {format(user.createdAt, 'dd MMM yyyy', { locale: id })}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleStatusChange(user.id, user.status)}
                      className={`flex items-center gap-1 font-medium ${
                        user.status === 'active' ? 'text-amber-600 hover:text-amber-800' : 'text-green-600 hover:text-green-800'
                      }`}
                    >
                      {user.status === 'active' ? (
                        <><ShieldAlert className="w-4 h-4" /> Suspend/Ban</>
                      ) : (
                        <><ShieldCheck className="w-4 h-4" /> Aktifkan</>
                      )}
                    </button>
                  </td>
                </tr>
              ))}
              {users.filter(u => u.role !== 'admin').length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                    Belum ada member yang mendaftar.
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

export default AdminUsers;