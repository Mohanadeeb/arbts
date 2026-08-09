import React, { useState } from 'react';
import { useTranslation } from '../../i18n/i18n';
import { UserRole, User } from '../../types';
import { AuthService } from '../../services/authService';
import { IdentityVerificationService } from '../../services/identityService';
import { X, UserCheck, Building2, ShieldCheck, AlertCircle, ArrowRight } from '../common/Icons';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: User) => void;
  initialRole?: UserRole;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialRole = 'WORKER',
}) => {
  const { t } = useTranslation();
  const [role, setRole] = useState<UserRole>(initialRole);
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');

  if (!isOpen) return null;

  const bankidStatus = IdentityVerificationService.getBankIDStatus();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = await AuthService.login(email || 'demo@example.se', role);
    onSuccess(user);
    onClose();
  };

  const handleQuickDemo = (selectedRole: UserRole) => {
    const user = AuthService.loginDemoUser(selectedRole);
    onSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-100 p-6 md:p-8 overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-slate-900">{t('modal_login_title')}</h2>
          <p className="text-sm text-slate-500 mt-1">{t('modal_select_role')}</p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            type="button"
            onClick={() => setRole('WORKER')}
            className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${
              role === 'WORKER'
                ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-600/20'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className={`p-2 rounded-lg ${role === 'WORKER' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-blue-600">Roll</div>
              <div className="font-semibold text-slate-900 text-sm">{t('role_worker')}</div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setRole('EMPLOYER')}
            className={`p-3.5 rounded-xl border text-left transition flex items-start gap-3 ${
              role === 'EMPLOYER'
                ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-600/20'
                : 'border-slate-200 hover:border-slate-300 bg-white'
            }`}
          >
            <div className={`p-2 rounded-lg ${role === 'EMPLOYER' ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-bold text-emerald-600">Roll</div>
              <div className="font-semibold text-slate-900 text-sm">{t('role_employer')}</div>
            </div>
          </button>
        </div>

        {/* BankID Unconnected Indicator */}
        <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">{t('bankid_status_not_connected')}</span>
            <p className="mt-0.5 text-amber-800">{bankidStatus.statusMessage}</p>
          </div>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('name_label')}</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Astrid Lindgren"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          )}

          {isRegistering && role === 'EMPLOYER' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">{t('company_name_label')}</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Svensk Logistik AB"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('email_label')}</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="namn@exempel.se"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">{t('password_label')}</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-xl font-bold text-white shadow-md transition flex items-center justify-center gap-2 ${
              role === 'WORKER' ? 'bg-blue-600 hover:bg-blue-700 shadow-blue-500/20' : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
            }`}
          >
            <span>{isRegistering ? t('btn_submit_register') : t('btn_submit_login')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fast Login Banner */}
        <div className="mt-5 pt-4 border-t border-slate-100 text-center">
          <div className="text-xs text-slate-400 font-medium mb-2">Snabbdemo / Testkonto:</div>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={() => handleQuickDemo('WORKER')}
              className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold hover:bg-blue-100 transition"
            >
              Demo Arbetssökande
            </button>
            <button
              onClick={() => handleQuickDemo('EMPLOYER')}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-semibold hover:bg-emerald-100 transition"
            >
              Demo Arbetsgivare
            </button>
            <button
              onClick={() => handleQuickDemo('ADMIN')}
              className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 text-xs font-semibold hover:bg-purple-100 transition"
            >
              Demo Admin
            </button>
          </div>

          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="mt-3 text-xs text-slate-500 hover:text-slate-800 underline font-medium block mx-auto"
          >
            {isRegistering ? t('toggle_login') : t('toggle_register')}
          </button>
        </div>
      </div>
    </div>
  );
};
