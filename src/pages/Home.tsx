import React from 'react';
import { Link } from 'react-router-dom';
import { HeartHandshake, ShieldCheck, Users, TrendingUp } from 'lucide-react';
import { useStore } from '../store/useStore';

const Home = () => {
  const { settings } = useStore();

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              Bersama Kita Bisa Saling Membantu
            </h1>
            <p className="text-lg sm:text-xl text-blue-100 mb-10">
              {settings.siteName} adalah komunitas finansial dimana anggota saling memberikan bantuan secara sukarela untuk mencapai kesejahteraan bersama.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 bg-white text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-colors shadow-lg"
              >
                Mulai Bergabung
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-800 transition-colors border border-blue-500"
              >
                Masuk Akun
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Mengapa Memilih {settings.siteName}?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Platform komunitas yang transparan, aman, dan dirancang untuk kesejahteraan anggota.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow border border-slate-100">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <HeartHandshake className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Saling Membantu</h3>
              <p className="text-slate-600">Sistem Provide Help (PH) dan Get Help (GH) yang adil. Berikan bantuan hari ini, terima bantuan esok.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow border border-slate-100">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Aman & Transparan</h3>
              <p className="text-slate-600">Setiap transaksi diawasi dan wajib menyertakan bukti transfer yang valid.</p>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl text-center hover:shadow-lg transition-shadow border border-slate-100">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Pertumbuhan Bersama</h3>
              <p className="text-slate-600">Dapatkan nilai lebih dari bantuan yang Anda berikan setelah jangka waktu tertentu.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Cara Kerja</h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="absolute left-1/2 -ml-0.5 w-0.5 h-full bg-blue-200 hidden md:block"></div>
            
            <div className="space-y-12 relative">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 text-right order-2 md:order-1 mt-6 md:mt-0">
                  <h4 className="text-xl font-bold text-slate-900">1. Mendaftar</h4>
                  <p className="text-slate-600 mt-2">Buat akun dengan data yang valid termasuk nomor rekening/e-wallet untuk menerima bantuan.</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold z-10 order-1 md:order-2 shadow-[0_0_0_8px_white]">1</div>
                <div className="md:w-1/2 md:pl-12 order-3 hidden md:block"></div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 order-1 hidden md:block"></div>
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold z-10 order-1 md:order-2 shadow-[0_0_0_8px_white]">2</div>
                <div className="md:w-1/2 md:pl-12 order-2 md:order-3 mt-6 md:mt-0 text-left">
                  <h4 className="text-xl font-bold text-slate-900">2. Berikan Bantuan (PH)</h4>
                  <p className="text-slate-600 mt-2">Mulailah dengan memberikan bantuan (Provide Help) kepada anggota lain yang membutuhkan.</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 text-right order-2 md:order-1 mt-6 md:mt-0">
                  <h4 className="text-xl font-bold text-slate-900">3. Terima Bantuan (GH)</h4>
                  <p className="text-slate-600 mt-2">Setelah {settings.ghTimeframe} hari dan menyelesaikan PH, Anda berhak menerima bantuan (Get Help) dengan nilai yang lebih besar.</p>
                </div>
                <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold z-10 order-1 md:order-2 shadow-[0_0_0_8px_white]">3</div>
                <div className="md:w-1/2 md:pl-12 order-3 hidden md:block"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;