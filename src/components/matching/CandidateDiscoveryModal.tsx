import React, { useState } from 'react';
import { Job, CandidateMatchResult } from '../../types';
import { CandidateSearchService } from '../../services/candidateSearchService';
import { CandidateRankingService } from '../../services/candidateRankingService';
import { OfferService } from '../../services/offerService';
import { MatchingAnalyticsService } from '../../services/matchingAnalyticsService';
import { CandidateComparisonModal } from './CandidateComparisonModal';
import { useTranslation } from '../../i18n/i18n';
import {
  Sparkles,
  Bot,
  Star,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Clock,
  Award,
  Coins,
  Send,
  X,
  Layers,
  ChevronRight,
  ShieldCheck,
  Building
} from '../common/Icons';

interface CandidateDiscoveryModalProps {
  job: Job;
  isOpen: boolean;
  onClose: () => void;
  onOfferSent?: (workerId: string) => void;
}

export const CandidateDiscoveryModal: React.FC<CandidateDiscoveryModalProps> = ({
  job,
  isOpen,
  onClose,
  onOfferSent,
}) => {
  const { t } = useTranslation();
  const [candidates, setCandidates] = useState<CandidateMatchResult[]>(
    CandidateSearchService.searchCandidatesForJob(job)
  );
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [sentOfferWorkerIds, setSentOfferWorkerIds] = useState<Record<string, boolean>>({});
  const [ignoredWorkerIds, setIgnoredWorkerIds] = useState<Record<string, boolean>>({});
  const [expandedCandidateId, setExpandedCandidateId] = useState<string | null>(candidates[0]?.worker.id || null);

  if (!isOpen) return null;

  const visibleCandidates = candidates.filter(c => !ignoredWorkerIds[c.worker.id]);

  const handleSendOffer = (candidate: CandidateMatchResult) => {
    OfferService.sendOffer(
      job.id,
      job.companyId,
      candidate.worker.id,
      job.hourlyRate,
      job.title,
      job.companyName,
      `${job.startDate} — ${job.endDate}`
    );

    // Record audit feedback
    MatchingAnalyticsService.logMatchEvaluation(job, candidate, 'OFFER_SENT');

    setSentOfferWorkerIds(prev => ({ ...prev, [candidate.worker.id]: true }));
    if (onOfferSent) onOfferSent(candidate.worker.id);
  };

  const handleIgnore = (candidate: CandidateMatchResult) => {
    MatchingAnalyticsService.logMatchEvaluation(job, candidate, 'IGNORED');
    setIgnoredWorkerIds(prev => ({ ...prev, [candidate.worker.id]: true }));
    setSelectedForComparison(prev => prev.filter(id => id !== candidate.worker.id));
  };

  const toggleSelectForCompare = (workerId: string) => {
    if (selectedForComparison.includes(workerId)) {
      setSelectedForComparison(selectedForComparison.filter(id => id !== workerId));
    } else {
      if (selectedForComparison.length < 3) {
        setSelectedForComparison([...selectedForComparison, workerId]);
      }
    }
  };

  const comparisonCandidates = candidates.filter(c => selectedForComparison.includes(c.worker.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl bg-white shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-y-auto space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X size={20} />
        </button>

        {/* Header with AI Engine Banner */}
        <div className="space-y-3 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-bold w-fit">
            <Sparkles size={14} className="text-purple-600 animate-pulse" />
            <span>Arbetslyft AI Matchningsmotor (Hybrid Semantisk Sökning)</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Topprankade Kandidater för: {job.title}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                AI har sökt igenom databasen och analyserat kompetenser, intyg, erfarenhet och tillgänglighet.
              </p>
            </div>

            {selectedForComparison.length > 1 && (
              <button
                onClick={() => setIsComparisonOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition flex items-center gap-2 shrink-0 animate-bounce"
              >
                <Layers size={15} />
                <span>Jämför {selectedForComparison.length} kandidater sida vid sida</span>
              </button>
            )}
          </div>

          {/* Honest AI Abstraction Status Indicator */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
            <Bot size={18} className="text-purple-600 shrink-0 mt-0.5" />
            <div className="text-[11px] leading-relaxed">
              <strong>Semantisk Term- & Begreppsmatchning Aktiv:</strong> Motorn identifierar ekvivalenta yrkestitlar (t.ex. <em>Logistics assistant</em> ~ <em>Lagerarbetare</em>). <span className="text-slate-400 font-medium">Extern vektor-API: Förberedd hybridarkitektur.</span>
            </div>
          </div>
        </div>

        {/* Candidate Results List */}
        <div className="space-y-4">
          {visibleCandidates.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              Inga fler kandidater att visa just nu.
            </div>
          ) : (
            visibleCandidates.map((res, index) => {
              const w = res.worker;
              const isSent = sentOfferWorkerIds[w.id];
              const isExpanded = expandedCandidateId === w.id;
              const isSelectedCompare = selectedForComparison.includes(w.id);

              return (
                <div
                  key={w.id}
                  className={`rounded-3xl border transition-all overflow-hidden ${
                    res.matchScore >= 90
                      ? 'bg-white border-slate-200 hover:border-purple-300 shadow-card'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  {/* Top Summary Bar */}
                  <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    
                    <div className="flex items-center gap-4">
                      {/* Ranking Badge */}
                      <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 font-black text-xs flex items-center justify-center shrink-0">
                        #{index + 1}
                      </span>

                      <img
                        src={w.profilePhoto}
                        alt={w.fullName}
                        className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm shrink-0"
                      />

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-extrabold text-slate-900 text-base">{w.fullName}</h3>
                          <span className="text-xs text-slate-400">•</span>
                          <span className="text-xs text-slate-500 font-medium">{w.location} ({res.distanceKm} km)</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600 mt-1 font-semibold">
                          <span className="flex items-center gap-1">
                            <Star size={13} className="fill-amber-400 text-amber-400" />
                            <span>{w.rating.toFixed(1)}/5 ({w.completedAssignments} uppdrag)</span>
                          </span>
                          <span>•</span>
                          <span className="text-emerald-700 font-bold">{res.reliabilityScore}% pålitlighet</span>
                          <span>•</span>
                          <span>{w.totalHours} verifierade timmar</span>
                        </div>
                      </div>
                    </div>

                    {/* Match Score & Action Buttons */}
                    <div className="flex items-center gap-3 self-end sm:self-auto">
                      
                      {/* 0 - 100 Match Gauge Badge */}
                      <div className="flex flex-col items-end">
                        <div className={`px-3 py-1 rounded-2xl font-black text-sm flex items-center gap-1.5 shadow-sm ${
                          res.matchScore >= 90 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                          res.matchScore >= 80 ? 'bg-blue-50 text-blue-800 border border-blue-200' :
                          'bg-amber-50 text-amber-900 border border-amber-200'
                        }`}>
                          <Sparkles size={14} className={res.matchScore >= 90 ? 'text-emerald-600' : 'text-blue-600'} />
                          <span>{res.matchScore}% Match</span>
                        </div>
                        <span className="text-[10px] text-slate-400 font-medium mt-0.5">AI-beräknat</span>
                      </div>

                      {/* Expand / View Details */}
                      <button
                        onClick={() => setExpandedCandidateId(isExpanded ? null : w.id)}
                        className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
                      >
                        {isExpanded ? 'Dölj motivering' : 'Visa motivering'}
                      </button>

                      {/* Send Offer */}
                      <button
                        onClick={() => handleSendOffer(res)}
                        disabled={isSent}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-sm ${
                          isSent
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 cursor-default'
                            : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20'
                        }`}
                      >
                        {isSent ? (
                          <>
                            <CheckCircle2 size={14} />
                            <span>Erbjudande Skickat</span>
                          </>
                        ) : (
                          <>
                            <Send size={14} />
                            <span>Skicka Jobberbjudande</span>
                          </>
                        )}
                      </button>

                    </div>
                  </div>

                  {/* Expanded AI Reasoning Breakdown */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-100 bg-slate-50/40 space-y-4 animate-in fade-in duration-150">
                      
                      {/* Strengths / Why */}
                      <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-2">
                        <div className="text-xs font-bold text-emerald-900 flex items-center gap-1.5">
                          <CheckCircle2 size={15} className="text-emerald-600" />
                          <span>Varför {w.fullName} matchar detta uppdrag:</span>
                        </div>
                        <ul className="space-y-1.5 text-xs text-emerald-950 font-medium">
                          {res.strengths.map((st, i) => (
                            <li key={i} className="flex items-center gap-2">
                              <span>{st}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Potential Gaps & Missing Hard Requirements */}
                      {res.potentialGaps.length > 0 && res.potentialGaps[0] !== 'Inga kritiska kompetensluckor identifierade.' && (
                        <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-1.5">
                          <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                            <AlertCircle size={15} className="text-amber-600" />
                            <span>Kompetenslucka & Eventuella begränsningar:</span>
                          </div>
                          <ul className="space-y-1 text-xs text-amber-950">
                            {res.potentialGaps.map((gp, i) => (
                              <li key={i}>{gp}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Semantic Terminology Matches */}
                      {res.semanticSkills.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[11px] uppercase font-bold text-slate-500 tracking-wider">
                            Semantisk förståelse & Synonymkopplingar:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {res.semanticSkills.map((sm, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 rounded-xl bg-purple-50 text-purple-900 border border-purple-100 text-xs flex items-center gap-1.5"
                              >
                                <Sparkles size={12} className="text-purple-600" />
                                <span><strong>{sm.candidateProfileTerm}</strong> → {sm.jobRequiredTerm}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Bottom Tools: Compare Checkbox & Ignore Recommendation */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-200/60 text-xs">
                        <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-700">
                          <input
                            type="checkbox"
                            checked={isSelectedCompare}
                            onChange={() => toggleSelectForCompare(w.id)}
                            className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-slate-300 cursor-pointer"
                          />
                          <span>Markera för att jämföra sida vid sida ({selectedForComparison.length}/3)</span>
                        </label>

                        <button
                          onClick={() => handleIgnore(res)}
                          className="text-slate-400 hover:text-red-600 text-xs font-semibold underline transition"
                        >
                          Ignorera rekommendation
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              );
            })
          )}
        </div>

        {/* Side-by-Side Comparison Modal */}
        {isComparisonOpen && (
          <CandidateComparisonModal
            job={job}
            candidates={comparisonCandidates}
            isOpen={isComparisonOpen}
            onClose={() => setIsComparisonOpen(false)}
            onSendOffer={(c) => handleSendOffer(c)}
          />
        )}

      </div>
    </div>
  );
};
