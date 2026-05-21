import React from 'react';
import { Server, Globe, Database, UploadCloud } from 'lucide-react';

const Tutorial = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Tutorial Upload ke Hosting Gratis</h1>
        <p className="text-slate-600">Panduan lengkap cara mengonlinekan website Anda secara gratis menggunakan InfinityFree atau ByetHost.</p>
      </div>

      <div className="space-y-12">
        {/* Persiapan */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <UploadCloud className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">1. Persiapan File Website</h2>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <p>Sebelum mengupload, pastikan file website Anda sudah siap:</p>
            <ol className="list-decimal list-inside space-y-2 text-slate-700">
              <li>Karena ini aplikasi React (Vite), Anda harus mem-build-nya terlebih dahulu.</li>
              <li>Buka terminal/command prompt di folder project.</li>
              <li>Jalankan perintah: <code className="bg-slate-100 px-2 py-1 rounded text-sm text-pink-600">npm run build</code></li>
              <li>Tunggu proses selesai. Akan muncul folder baru bernama <code className="bg-slate-100 px-2 py-1 rounded text-sm font-bold">dist</code>.</li>
              <li><strong>Isi dari folder <code className="bg-slate-100 px-2 py-1 rounded text-sm">dist</code> inilah yang akan kita upload ke hosting.</strong> (Bukan folder src atau node_modules).</li>
            </ol>
          </div>
        </section>

        {/* Daftar Hosting */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">2. Mendaftar Hosting Gratis</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-slate-200 rounded-xl p-5">
              <h3 className="font-bold text-lg mb-3">Opsi A: InfinityFree</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
                <li>Buka <a href="https://infinityfree.net" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">infinityfree.net</a></li>
                <li>Klik "Register" dan buat akun.</li>
                <li>Verifikasi email Anda.</li>
                <li>Login, klik "Create Account".</li>
                <li>Pilih subdomain gratis (misal: <em>namasite.epizy.com</em>).</li>
                <li>Klik "Create Account", lalu buka "Control Panel".</li>
              </ol>
            </div>
            
            <div className="border border-slate-200 rounded-xl p-5">
              <h3 className="font-bold text-lg mb-3">Opsi B: ByetHost</h3>
              <ol className="list-decimal list-inside space-y-2 text-sm text-slate-700">
                <li>Buka <a href="https://byethost.com" target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">byethost.com</a></li>
                <li>Pilih "Free Hosting" &gt; "Sign Up".</li>
                <li>Isi form pendaftaran (subdomain, password, email).</li>
                <li>Cek email untuk aktivasi dan informasi login cPanel (Cpanel URL, Username, Password).</li>
                <li>Login ke cPanel menggunakan data dari email.</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Upload File */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">3. Upload via File Manager (cPanel)</h2>
          </div>
          
          <div className="prose prose-slate max-w-none">
            <p>Langkah ini sama baik di InfinityFree maupun ByetHost karena keduanya menggunakan vPanel (mirip cPanel):</p>
            <ol className="list-decimal list-inside space-y-3 text-slate-700">
              <li>Di Control Panel, cari dan klik menu <strong>Online File Manager</strong>.</li>
              <li>Akan terbuka tab baru. Masuk ke folder bernama <strong className="text-blue-600">htdocs</strong>.</li>
              <li>Hapus file <code className="bg-slate-100 px-2 py-1 rounded text-sm">index2.html</code> (jika ada).</li>
              <li>Klik icon <strong>Upload</strong> (biasanya gambar panah ke atas).</li>
              <li>Pilih <strong>Upload Folder</strong> atau buat file zip dari isi folder <code className="bg-slate-100 px-2 py-1 rounded text-sm">dist</code> lalu <strong>Upload Zip</strong>.</li>
              <li>Jika upload Zip, klik kanan file zip tersebut dan pilih <strong>Extract</strong>.</li>
              <li>Pastikan file <code className="bg-slate-100 px-2 py-1 rounded text-sm">index.html</code> (dari folder dist) berada langsung di dalam folder <strong>htdocs</strong>, bukan di dalam sub-folder.</li>
            </ol>
            
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <p className="text-sm text-amber-800 font-medium mb-1">Penting untuk Aplikasi React (SPA):</p>
              <p className="text-sm text-amber-700">
                Karena React menggunakan routing client-side, jika Anda me-refresh halaman selain halaman utama (Home), server akan menampilkan error 404. Untuk mengatasinya, buat file bernama <code className="bg-white px-1 rounded font-bold">.htaccess</code> di folder htdocs dan isi dengan:
              </p>
              <pre className="bg-slate-800 text-slate-100 p-3 rounded mt-2 text-xs overflow-x-auto">
{`Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]`}
              </pre>
            </div>
          </div>
        </section>

        {/* Database (Jika menggunakan PHP/MySQL) */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">4. Setup Database (Opsional)</h2>
          </div>
          
          <div className="prose prose-slate max-w-none text-sm text-slate-600">
            <p><em>Catatan: Aplikasi ini menggunakan LocalStorage untuk simulasi. Jika Anda mengembangkan backend PHP/MySQL asli, ikuti langkah ini:</em></p>
            <ol className="list-decimal list-inside space-y-2 mt-2">
              <li>Di Control Panel, klik <strong>MySQL Databases</strong>.</li>
              <li>Buat database baru (misal: db_bantu).</li>
              <li>Catat nama database, username (biasanya epiz_xxx), dan password (sama dengan password cpanel).</li>
              <li>Kembali ke Control Panel, klik <strong>phpMyAdmin</strong>.</li>
              <li>Import file <code className="bg-slate-100 px-2 py-1 rounded text-xs">.sql</code> Anda.</li>
              <li>Update file koneksi PHP Anda (misal: <code className="bg-slate-100 px-2 py-1 rounded text-xs">koneksi.php</code>) dengan detail database yang baru, lalu upload ke htdocs.</li>
            </ol>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Tutorial;