import React, { useState } from 'react';
import { Logo } from './Logo';
import { LanguageSelector } from './LanguageSelector';
import { NotificationBell } from '../notifications/NotificationBell';
import { useTranslation } from '../../i18n/i18n';
import { User } from '../../types';
import { UserCheck, Building2, Shield, LogOut, Menu, X, ShieldAlert } from './Icons';

interface NavbarProps {
  user: User | null;
  onOpenAuth: (role?: 'WORKER' | 'EMPLOYER') => void;
  onLogout: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenAuth,
  onLogout,
  activeTab,
  setActiveTab,
}) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-6 cursor-pointer" onClick={() => setActiveTab('landing')}>
            <Logo size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/60">
            <button
              onClick={() => setActiveTab('landing')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                activeTab === 'landing' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('nav_home')}
            </button>
            <button
              onClick={() => setActiveTab('jobs')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                activeTab === 'jobs' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('nav_jobs')}
            </button>
            <button
              onClick={() => setActiveTab('passport')}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                activeTab === 'passport' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('nav_passport')}
            </button>
            <button
              onClick={() => setActiveTab('contracts')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                activeTab === 'contracts' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('nav_contracts')}
            </button>
            <button
              onClick={() => setActiveTab('offers')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                activeTab === 'offers' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Erbjudanden
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                activeTab === 'messages' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Dialog
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition ${
                activeTab === 'payments' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ekonomi
            </button>
          </nav>

          {/* Right Action Bar */}
          <div className="hidden md:flex items-center gap-3">
            {/* BankID Readiness Status Tag */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[11px] font-medium" title="BankID integration är förberedd i koden men inte live-kopplad ännu">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              <span>BankID — Ej ansluten</span>
            </div>

            {/* Notification Bell Component */}
            <NotificationBell onNavigateTab={setActiveTab} />

            {/* Language Dropdown Selector */}
            <LanguageSelector />

            {user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <button
                  onClick={() => setActiveTab(user.role === 'WORKER' ? 'worker-dashboard' : user.role === 'EMPLOYER' ? 'employer-dashboard' : 'admin-dashboard')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 font-medium text-xs hover:bg-blue-100 transition"
                >
                  {user.role === 'WORKER' && <UserCheck className="w-4 h-4" />}
                  {user.role === 'EMPLOYER' && <Building2 className="w-4 h-4" />}
                  {user.role === 'ADMIN' && <Shield className="w-4 h-4" />}
                  <span>{user.email.split('@')[0]} ({user.role})</span>
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                  title="Logga ut"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth('WORKER')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100 transition"
                >
                  {t('nav_login')}
                </button>
                <button
                  onClick={() => onOpenAuth('EMPLOYER')}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition"
                >
                  {t('nav_register')}
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSelector />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-3 animate-in fade-in duration-150">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            <button
              onClick={() => { setActiveTab('landing'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg bg-slate-50 text-slate-800 text-xs font-semibold text-left"
            >
              {t('nav_home')}
            </button>
            <button
              onClick={() => { setActiveTab('jobs'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg bg-slate-50 text-slate-800 text-xs font-semibold text-left"
            >
              {t('nav_jobs')}
            </button>
            <button
              onClick={() => { setActiveTab('passport'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg bg-slate-50 text-slate-800 text-xs font-semibold text-left"
            >
              {t('nav_passport')}
            </button>
            <button
              onClick={() => { setActiveTab('contracts'); setMobileMenuOpen(false); }}
              className="px-3 py-2 rounded-lg bg-slate-50 text-slate-800 text-xs font-semibold text-left"
            >
              {t('nav_contracts')}
            </button>
          </div>

          {!user ? (
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => { onOpenAuth('WORKER'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-center text-blue-600 bg-blue-50"
              >
                {t('hero_cta_worker')}
              </button>
              <button
                onClick={() => { onOpenAuth('EMPLOYER'); setMobileMenuOpen(false); }}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-center text-white bg-emerald-600"
              >
                {t('hero_cta_employer')}
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-slate-700">{user.email}</span>
              <button onClick={onLogout} className="text-xs font-bold text-red-600">Logga ut</button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
