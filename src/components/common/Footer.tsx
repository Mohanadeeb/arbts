import React from 'react';
import { Logo } from './Logo';
import { useTranslation } from '../../i18n/i18n';
import { ShieldCheck, ShieldAlert, Scale, Globe } from './Icons';

export const Footer: React.FC = () => {
  const { t, languages } = useTranslation();

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Logo size="md" className="text-white" />
            <p className="text-xs text-slate-400 leading-relaxed">
              Arbetslyft kopplar samman arbetssökande med arbetsgivare för korttidsuppdrag, deltid, akut behov och fasta anställningar.
            </p>
            <div className="pt-2 flex flex-col gap-1.5 text-[11px] font-semibold text-slate-400">
              <span className="text-blue-400">Från möjlighet till arbete.</span>
              <span className="text-emerald-400">Jobba nu. Väx vidare.</span>
            </div>
          </div>

          {/* Integrations Status (Not Connected Abstractions) */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              Integrationsstatus
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span>Swedish BankID</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">Ej ansluten</span>
              </li>
              <li className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span>Arbetsförmedlingen API</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">Ej ansluten</span>
              </li>
              <li className="p-2 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span>Betalnings- & Löneleverantör</span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 font-bold">Ej ansluten</span>
              </li>
            </ul>
          </div>

          {/* Legal Contract Notice */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-100 flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" />
              Avtalsvillkor & Juridik
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
              {t('contract_official_notice')}
            </p>
          </div>

          {/* Supported Languages */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-100 flex items-center gap-2">
              <Globe className="w-4 h-4 text-purple-400" />
              Flerspråkigt Stöd (8 Språk)
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {languages.map((l) => (
                <span key={l.code} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[11px] font-medium text-slate-300">
                  {l.flag} {l.nativeName}
                </span>
              ))}
            </div>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>{t('footer_rights')}</div>
          <div className="flex items-center gap-6 font-medium">
            <span className="hover:text-white cursor-pointer">Integritetspolicy (GDPR)</span>
            <span className="hover:text-white cursor-pointer">Användarvillkor</span>
            <span className="hover:text-white cursor-pointer">Säkerhet & RLS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
