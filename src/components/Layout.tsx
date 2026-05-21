import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { HeartHandshake, LogOut, User, Settings, Users, Activity, Home, BookOpen } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Layout = () => {
  const { currentUser, logout, settings } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = currentUser
    ? currentUser.role === 'admin'
      ? [
          { name: 'Dashboard', path: '/admin', icon: Activity },
          { name: 'Transaksi', path: '/admin/transactions', icon: HeartHandshake },
          { name: 'Member', path: '/admin/users', icon: Users },
          { name: 'Pengaturan', path: '/admin/settings', icon: Settings },
          { name: 'Profil', path: '/profile', icon: User },
        ]
      : [
          { name: 'Dashboard', path: '/dashboard', icon: Activity },
          { name: 'Profil', path: '/profile', icon: User },
        ]
    : [
        { name: 'Home', path: '/', icon: Home },
        { name: 'Tutorial Hosting', path: '/tutorial', icon: BookOpen },
        { name: 'Login', path: '/login', icon: User },
        { name: 'Daftar', path: '/register', icon: Users },
      ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <HeartHandshake className="h-8 w-8 text-blue-600" />
                <span className="font-bold text-xl text-slate-800">{settings.siteName}</span>
              </Link>
            </div>
            
            <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-4">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive 
                        ? "bg-blue-50 text-blue-700" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.name}
                  </Link>
                );
              })}
              
              {currentUser && (
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-slate-900 text-slate-300 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <HeartHandshake className="h-8 w-8 mx-auto mb-4 text-blue-500" />
          <p>&copy; {new Date().getFullYear()} {settings.siteName}. Platform Saling Membantu.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;