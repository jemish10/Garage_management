import { useState } from 'react';
import { Page } from '../types';
import { Wrench, Menu, X, LogOut, LayoutDashboard, FileText, PlusCircle, Receipt, Home, BookOpen } from 'lucide-react';

interface NavbarProps {
  currentPage: Page;
  isLoggedIn: boolean;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export default function Navbar({ currentPage, isLoggedIn, onNavigate, onLogout }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const publicLinks = [
    { label: 'Home', page: 'home' as Page, icon: <Home size={16} /> },
    { label: 'Setup Guide', page: 'setup-guide' as Page, icon: <BookOpen size={16} /> },
  ];

  const adminLinks = [
    { label: 'Dashboard', page: 'dashboard' as Page, icon: <LayoutDashboard size={16} /> },
    { label: 'Add Service', page: 'add-service' as Page, icon: <PlusCircle size={16} /> },
    { label: 'Records', page: 'records' as Page, icon: <FileText size={16} /> },
    { label: 'Billing', page: 'billing' as Page, icon: <Receipt size={16} /> },
  ];

  const links = isLoggedIn ? [...publicLinks, ...adminLinks] : publicLinks;

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl sticky top-0 z-50 border-b border-orange-500/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-orange-500 p-2 rounded-lg group-hover:bg-orange-400 transition-colors">
              <Wrench size={22} className="text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-white">AutoCare<span className="text-orange-400">Pro</span></span>
              <p className="text-xs text-gray-400 leading-none">Garage Management</p>
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <button
                key={link.page}
                onClick={() => onNavigate(link.page)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentPage === link.page
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                {link.icon}
                {link.label}
              </button>
            ))}

            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all ml-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="flex items-center gap-2 px-4 py-2 ml-2 rounded-lg text-sm font-medium bg-orange-500 hover:bg-orange-400 text-white transition-all shadow-lg"
              >
                Admin Login
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-700 bg-gray-900 px-4 py-3 space-y-1">
          {links.map(link => (
            <button
              key={link.page}
              onClick={() => { onNavigate(link.page); setMobileOpen(false); }}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                currentPage === link.page
                  ? 'bg-orange-500 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {link.icon}
              {link.label}
            </button>
          ))}
          {isLoggedIn ? (
            <button
              onClick={() => { onLogout(); setMobileOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <button
              onClick={() => { onNavigate('login'); setMobileOpen(false); }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium bg-orange-500 text-white"
            >
              Admin Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
