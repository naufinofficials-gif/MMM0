import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Settings, Save } from 'lucide-react';

const AdminSettings = () => {
  const { settings, updateSettings } = useStore();
  const [formData, setFormData] = useState(settings);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    alert('Pengaturan berhasil disimpan!');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Settings className="h-6 w-6 text-blue-600" /> Pengaturan Sistem
          </h1>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700">Nama Website</label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700">Nilai Provide Help (PH) - Rp</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="10000"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.phValue}
                  onChange={(e) => setFormData({ ...formData, phValue: Number(e.target.value) })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">Nilai Get Help (GH) - Rp</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="10000"
                  className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.ghValue}
                  onChange={(e) => setFormData({ ...formData, ghValue: Number(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Jangka Waktu GH (Hari)</label>
              <p className="text-xs text-slate-500 mb-2">Waktu tunggu setelah PH selesai sebelum bisa melakukan GH.</p>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                value={formData.ghTimeframe}
                onChange={(e) => setFormData({ ...formData, ghTimeframe: Number(e.target.value) })}
              >
                <option value={3}>3 Hari</option>
                <option value={7}>7 Hari</option>
                <option value={10}>10 Hari</option>
                <option value={15}>15 Hari</option>
                <option value={30}>30 Hari</option>
              </select>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                type="submit"
                className="flex justify-center items-center gap-2 w-full sm:w-auto py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="h-4 w-4" /> Simpan Pengaturan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;