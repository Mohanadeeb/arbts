import React, { useState } from 'react';
import { User, Dispute } from '../../types';
import { AdminService, AdminKPIs, SystemIntegrationStatus } from '../../services/adminService';
import { PaymentService, PlatformPricingConfig } from '../../services/paymentService';
import { GovernmentService, SSYK_TAXONOMY } from '../../services/governmentService';
import { WorkerService } from '../../services/workerService';
import { useTranslation } from '../../i18n/i18n';
import {
  Shield,
  Users,
  Briefcase,
  Coins,
  AlertCircle,
  CheckCircle2,
  Sliders,
  Scale,
  Building2,
  Building,
  Award,
  FileSignature,
  Download,
  Sparkles,
  Bot,
  ExternalLink
} from '../common/Icons';

import { AdminMatchingAnalyticsTab } from './AdminMatchingAnalyticsTab';

interface AdminDashboardProps {
  currentUser: User;
  onNavigateTab: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser, onNavigateTab }) => {
  const { t } = useTranslation();
  const [kpis, setKpis] = useState<AdminKPIs>(AdminService.getKPIs());
  const [integrations, setIntegrations] = useState<SystemIntegrationStatus[]>(AdminService.getSystemIntegrations());
  const [disputes, setDisputes] = useState<Dispute[]>(AdminService.getDisputes());
  const [pricingConfig, setPricingConfig] = useState<PlatformPricingConfig>(PaymentService.getPricingConfig());
  const [activeTab, setActiveTab] = useState<'overview' | 'ai-matching' | 'disputes' | 'pricing' | 'government' | 'enterprise'>('overview');
  const [resolutionText, setResolutionText] = useState('');
  const [activeDisputeId, setActiveDisputeId] = useState<string | null>(null);

  const handleResolveDispute = (disputeId: string) => {
    if (resolutionText.trim()) {
      AdminService.resolveDispute(disputeId, resolutionText.trim());
      setDisputes(AdminService.getDisputes());
      setActiveDisputeId(null);
      setResolutionText('');
    }
  };

  const handleUpdateFee = (newFee: number) => {
    const updated = PaymentService.updatePricingConfig({
      ...pricingConfig,
      employerFeePercent: newFee,
    });
    setPricingConfig(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Admin Control Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold mb-2">
            <Shield size={14} className="text-purple-600" />
            <span>Arbetslyft Huvudkontroll & Plattformstillsyn</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Administratörspanel (Admin Hub)
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Realtidsövervakning av användare, transaktioner, AI-matchningsmotorn, tvister och myndighetsflöden.
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap ${
              activeTab === 'overview' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Översikt & KPI
          </button>
          <button
            onClick={() => setActiveTab('ai-matching')}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'ai-matching' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Sparkles size={13} className="text-purple-600" />
            <span>AI Matchningsanalys</span>
          </button>
          <button
            onClick={() => setActiveTab('disputes')}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap ${
              activeTab === 'disputes' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tvister ({disputes.filter(d => d.status === 'OPEN').length})
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap ${
              activeTab === 'pricing' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Prissättning
          </button>
          <button
            onClick={() => setActiveTab('government')}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap ${
              activeTab === 'government' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Myndigheter & SSYK
          </button>
          <button
            onClick={() => setActiveTab('enterprise')}
            className={`px-3.5 py-2 rounded-xl transition whitespace-nowrap ${
              activeTab === 'enterprise' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Offentlig Sektor & Enterprise
          </button>
        </div>
      </div>

      {/* TOP KPI CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="text-[11px] text-slate-500 font-medium">Totalt Användare</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{kpis.totalUsers.toLocaleString()}</div>
          <div className="text-[10px] text-blue-600 font-semibold mt-0.5">{kpis.activeWorkers} arbetssökande</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="text-[11px] text-slate-500 font-medium">Aktiva Uppdrag</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{kpis.activeJobs}</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Live på marknaden</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="text-[11px] text-slate-500 font-medium">Pågående Uppdrag</div>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{kpis.activeAssignments}</div>
          <div className="text-[10px] text-purple-600 font-semibold mt-0.5">Tecknade avtal</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="text-[11px] text-slate-500 font-medium">Plattformsvolym (Gross)</div>
          <div className="text-xl font-extrabold text-slate-900 mt-1.5">{kpis.grossVolumeSek.toLocaleString()} SEK</div>
          <div className="text-[10px] text-slate-400 font-semibold mt-0.5">Arbetade timmar</div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 shadow-card">
          <div className="text-[11px] text-emerald-700 font-medium">Plattformsintäkt</div>
          <div className="text-xl font-extrabold text-emerald-800 mt-1.5">{kpis.platformRevenueSek.toLocaleString()} SEK</div>
          <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">10% kommission</div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="text-[11px] text-slate-500 font-medium">Öppna Tvister</div>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{kpis.disputesCount}</div>
          <div className="text-[10px] text-amber-700 font-semibold mt-0.5">Kräver moderering</div>
        </div>
      </div>

      {/* SUBTAB 1: OVERVIEW & SYSTEM INTEGRATIONS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Systemstatus & Externa Integrationer</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Övervakning av kärntjänster och integrationer mot svenska myndigheter och betalväxlar.
                </p>
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {integrations.map((item, idx) => (
                <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                      <span>{item.serviceName}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        item.status === 'CONFIGURED' ? 'bg-blue-100 text-blue-800' :
                        item.status === 'CONNECTED' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-amber-100 text-amber-900'
                      }`}>
                        {item.statusLabel}
                      </span>
                    </div>
                    <p className="text-slate-500 text-xs">{item.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB: AI MATCHING & ANALYTICS */}
      {activeTab === 'ai-matching' && (
        <AdminMatchingAnalyticsTab />
      )}

      {/* SUBTAB 2: DISPUTES & MODERATION */}
      {activeTab === 'disputes' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Tvist- & Innehållsmoderering</h2>
            
            <div className="space-y-4">
              {disputes.map((dispute) => (
                <div
                  key={dispute.id}
                  className="p-5 rounded-2xl border border-slate-200 bg-slate-50 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <AlertCircle size={16} className="text-amber-600" />
                      <span>Tvist #{dispute.id}: {dispute.reason}</span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      dispute.status === 'OPEN' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {dispute.status === 'OPEN' ? 'Öppen Granskning' : 'Löst & Avslutad'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{dispute.description}</p>

                  {dispute.resolution && (
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 text-xs font-medium border border-emerald-200">
                      <strong>Beslut av Admin:</strong> {dispute.resolution}
                    </div>
                  )}

                  {dispute.status === 'OPEN' && (
                    <div className="pt-2 flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={activeDisputeId === dispute.id ? resolutionText : ''}
                        onChange={(e) => {
                          setActiveDisputeId(dispute.id);
                          setResolutionText(e.target.value);
                        }}
                        placeholder="Ange beslut / förlikningsbesked..."
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                      />
                      <button
                        onClick={() => handleResolveDispute(dispute.id)}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold transition"
                      >
                        Fastställ Beslut
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 3: PRICING CONFIGURATION */}
      {activeTab === 'pricing' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
            <h2 className="text-lg font-bold text-slate-900">Dynamisk Prissättning & Plattformskonfiguration</h2>
            <p className="text-xs text-slate-500">
              Konfigurera kommissionsnivåer och avgifter utan att ändra källkoden.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Plattformsavgift Arbetsgivare (%)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={pricingConfig.employerFeePercent}
                    onChange={(e) => handleUpdateFee(Number(e.target.value))}
                    className="w-24 px-3 py-2 rounded-xl border border-slate-200 text-sm font-black bg-white"
                  />
                  <span className="text-xs text-slate-500">% av bruttobelopp</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Fastanställningsavgift (SEK)</label>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-slate-900">{pricingConfig.permanentHiringFeeSek} SEK</span>
                  <span className="text-xs text-emerald-600 font-semibold">Vid lyckad rekrytering</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-700">Timavgift Basmodell (SEK)</label>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-black text-slate-900">{pricingConfig.perHourPlatformFeeSek} SEK/h</span>
                  <span className="text-xs text-slate-500 font-semibold">Standardavgift</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 4: GOVERNMENT & SSYK READINESS */}
      {activeTab === 'government' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Arbetsförmedlingen & SSYK-Integration</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Standard för svensk yrkesklassificering och Platsbanken JobStream JSON/XML-format.
                </p>
              </div>

              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-900 text-xs font-bold border border-amber-200">
                Arbetsförmedlingen — Ej ansluten (Förberedd)
              </span>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-slate-900 text-sm">SSYK-Taxonomimappning för Arbetslyft Jobbkategorier</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SSYK_TAXONOMY.map((ssyk) => (
                  <div key={ssyk.code} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-slate-900">{ssyk.title}</div>
                      <div className="text-slate-500 text-[11px]">Kategori: {ssyk.category}</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-lg bg-blue-100 text-blue-800 font-mono font-bold text-[11px]">
                      SSYK {ssyk.code}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 5: ENTERPRISE & PUBLIC SECTOR ARCHITECTURE */}
      {activeTab === 'enterprise' && (
        <div className="space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Enterprise & Offentlig Sektor</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Hur kommuner, bemanning och större arbetsgivare integrerar Arbetslyft för snabb arbetsmarknadsetablering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                  <Building2 size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Kommuner & Arbetsmarknadsenheter</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Automatisk generering av aktivitetsrapporter för nyanlända och deltagare i etableringsinsatser baserat på verifierade timmar i Work Passport.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <Users size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Bemannings- & Rekryteringsföretag</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Direkt API-koppling för att snabbt täcka akut personalbrist hos kunder med förverifierade kandidater med digitala standardavtal.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center">
                  <Award size={20} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Enterprise Arbetsgivare</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Smidig övergång från korttidsuppdrag till tillsvidareanställning (Fast anställning) med fullständig dokumentation av provperioden.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
