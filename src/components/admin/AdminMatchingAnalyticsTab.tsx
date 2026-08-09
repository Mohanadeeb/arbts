import React, { useState } from 'react';
import { MatchingAnalyticsService } from '../../services/matchingAnalyticsService';
import { CandidateMatchingService } from '../../services/candidateMatchingService';
import { MatchingAnalyticsData, MatchingWeightsConfig, CandidateMatchAuditLog } from '../../types';
import {
  Sparkles,
  Bot,
  Sliders,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
  Award,
  Layers,
  Clock,
  ShieldCheck
} from '../common/Icons';

export const AdminMatchingAnalyticsTab: React.FC = () => {
  const [analytics, setAnalytics] = useState<MatchingAnalyticsData>(
    MatchingAnalyticsService.getAnalyticsMetrics()
  );
  const [weights, setWeights] = useState<MatchingWeightsConfig>(
    CandidateMatchingService.getWeights()
  );
  const [auditLogs, setAuditLogs] = useState<CandidateMatchAuditLog[]>(
    MatchingAnalyticsService.getAuditLogs()
  );
  const [savedWeightsNotice, setSavedWeightsNotice] = useState(false);

  const handleWeightChange = (field: keyof MatchingWeightsConfig, value: number) => {
    const updated = { ...weights, [field]: value };
    setWeights(updated);
  };

  const handleSaveWeights = (e: React.FormEvent) => {
    e.preventDefault();
    CandidateMatchingService.updateWeights(weights);
    setSavedWeightsNotice(true);
    setTimeout(() => setSavedWeightsNotice(false), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* Top AI Engine Header & Status */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-900 to-indigo-950 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-purple-200 text-xs font-bold mb-2">
              <Sparkles size={14} className="text-purple-300" />
              <span>Arbetslyft AI Rekommendationsmotor v2.4</span>
            </div>
            <h2 className="text-2xl font-extrabold">Kandidatmatchning & Träffsäkerhetsanalys</h2>
            <p className="text-xs text-purple-200 mt-1 max-w-2xl">
              Kontinuerlig mätning av hur väl AI-kandidatrekommendationer leder till godkända avtal och lyckade uppdrag.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/20 text-xs space-y-1">
            <div className="font-bold text-amber-300">Hybrid Semantisk Graf: Aktiv</div>
            <div className="text-[11px] text-purple-200">Supabase pgvector API: Förberedd</div>
          </div>
        </div>
      </div>

      {/* AI Performance KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="text-xs text-slate-500 font-medium">Utvärderade Matchningar</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">{analytics.totalMatchesEvaluated}</div>
          <div className="text-[11px] text-purple-600 font-semibold mt-0.5">I realtid per skapat jobb</div>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-50/60 border border-emerald-100 shadow-card">
          <div className="text-xs text-emerald-700 font-medium">Genomsnittlig Matchningspoäng</div>
          <div className="text-3xl font-extrabold text-emerald-800 mt-1">{analytics.averageMatchScore}%</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">För topp 5 rekommendationer</div>
        </div>

        <div className="p-5 rounded-3xl bg-blue-50/60 border border-blue-100 shadow-card">
          <div className="text-xs text-blue-700 font-medium">Rekommendationsacceptans</div>
          <div className="text-3xl font-extrabold text-blue-800 mt-1">{analytics.recommendationPlacementRate}%</div>
          <div className="text-[11px] text-blue-600 font-semibold mt-0.5">Arbetsgivare skickar erbjudande</div>
        </div>

        <div className="p-5 rounded-3xl bg-purple-50/60 border border-purple-100 shadow-card">
          <div className="text-xs text-purple-700 font-medium">Slutförda Tillsättningar</div>
          <div className="text-3xl font-extrabold text-purple-800 mt-1">{analytics.successfulPlacementsCount}</div>
          <div className="text-[11px] text-purple-600 font-semibold mt-0.5">Genererade digitala avtal</div>
        </div>
      </div>

      {/* Configurable AI Matching Weights Form */}
      <form onSubmit={handleSaveWeights} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sliders size={20} className="text-purple-600" />
              <span>Konfigurerbara AI-Vikter för Matchningsalgoritm</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Justera hur mycket respektive dimension påverkar totalpoängen (0–100%).
            </p>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition flex items-center gap-2"
          >
            <CheckCircle2 size={16} />
            <span>{savedWeightsNotice ? 'Sparat!' : 'Spara Vikter'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Kompetens & Semantik</label>
              <span className="text-xs font-black text-purple-700">{weights.skillsWeight}%</span>
            </div>
            <input
              type="range"
              min="10"
              max="50"
              value={weights.skillsWeight}
              onChange={(e) => handleWeightChange('skillsWeight', Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Arbetslivserfarenhet</label>
              <span className="text-xs font-black text-purple-700">{weights.experienceWeight}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="40"
              value={weights.experienceWeight}
              onChange={(e) => handleWeightChange('experienceWeight', Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Kalendertillgänglighet</label>
              <span className="text-xs font-black text-purple-700">{weights.availabilityWeight}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={weights.availabilityWeight}
              onChange={(e) => handleWeightChange('availabilityWeight', Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Avstånd & Plats (km)</label>
              <span className="text-xs font-black text-purple-700">{weights.locationWeight}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={weights.locationWeight}
              onChange={(e) => handleWeightChange('locationWeight', Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Certifikat & Körkort</label>
              <span className="text-xs font-black text-purple-700">{weights.certificationsWeight}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="30"
              value={weights.certificationsWeight}
              onChange={(e) => handleWeightChange('certificationsWeight', Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Språkkrav</label>
              <span className="text-xs font-black text-purple-700">{weights.languagesWeight}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={weights.languagesWeight}
              onChange={(e) => handleWeightChange('languagesWeight', Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Tidigare Liknande Uppdrag</label>
              <span className="text-xs font-black text-purple-700">{weights.previousWorkWeight}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={weights.previousWorkWeight}
              onChange={(e) => handleWeightChange('previousWorkWeight', Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Pålitlighet & Omdömen</label>
              <span className="text-xs font-black text-purple-700">{weights.reliabilityWeight}%</span>
            </div>
            <input
              type="range"
              min="1"
              max="20"
              value={weights.reliabilityWeight}
              onChange={(e) => handleWeightChange('reliabilityWeight', Number(e.target.value))}
              className="w-full accent-purple-600 cursor-pointer"
            />
          </div>

        </div>
      </form>

      {/* Skill Demand vs Skill Gaps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Most Requested Skills */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-600" />
            <span>Mest Efterfrågade Kompetenser (Live Marknadsdata)</span>
          </h3>
          <div className="space-y-2.5">
            {analytics.topRequestedSkills.map((item) => (
              <div key={item.skill} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                <span className="font-bold text-slate-800">{item.skill}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-extrabold text-[11px]">
                  {item.count} uppdrag
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Identified Skill Gaps */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <AlertCircle size={18} className="text-amber-600" />
            <span>Identifierade Kompetensbrister på Plattformen</span>
          </h3>
          <div className="space-y-2.5">
            {analytics.detectedSkillGaps.map((item) => (
              <div key={item.gap} className="flex items-center justify-between p-3 rounded-xl bg-amber-50/50 border border-amber-200/80 text-xs">
                <span className="font-bold text-amber-950">{item.gap}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 font-extrabold text-[11px]">
                  {item.frequency} sökningar
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* AI Recommendation Audit Trail Log */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
        <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
          <ShieldCheck size={18} className="text-blue-600" />
          <span>Revisionslogg för AI-Rekommendationer (Audit Trail)</span>
        </h3>

        <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden text-xs">
          {auditLogs.map((log) => (
            <div key={log.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white hover:bg-slate-50 transition">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <span>{log.candidateName}</span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 text-[10px] font-black">
                    {log.matchScore}% Match
                  </span>
                  <span className="text-slate-400 font-normal">→ {log.jobTitle}</span>
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Modell: {log.aiModelVersion} • Faktorer: Kompetens {log.matchingFactors.skills}%, Erfarenhet {log.matchingFactors.experience}%, Avstånd {log.matchingFactors.distance}%
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                  log.employerAction === 'HIRED' || log.employerAction === 'OFFER_SENT'
                    ? 'bg-emerald-100 text-emerald-800'
                    : log.employerAction === 'SHORTLISTED'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-slate-200 text-slate-700'
                }`}>
                  {log.employerAction}
                </span>
                <span className="text-slate-400 text-[11px] font-mono">{log.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
