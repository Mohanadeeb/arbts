import React from 'react';
import { CandidateMatchResult, Job } from '../../types';
import {
  X,
  Sparkles,
  Award,
  Coins,
  MapPin,
  Clock,
  Star,
  CheckCircle2,
  AlertCircle,
  Send,
  ShieldCheck
} from '../common/Icons';

interface CandidateComparisonModalProps {
  job: Job;
  candidates: CandidateMatchResult[];
  isOpen: boolean;
  onClose: () => void;
  onSendOffer: (candidate: CandidateMatchResult) => void;
}

export const CandidateComparisonModal: React.FC<CandidateComparisonModalProps> = ({
  job,
  candidates,
  isOpen,
  onClose,
  onSendOffer,
}) => {
  if (!isOpen || candidates.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] rounded-3xl bg-white shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-y-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles size={22} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Jämför Toppkandidater</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                AI-jämförelse för uppdraget: <strong className="text-slate-800">{job.title}</strong> ({job.hourlyRate} SEK/tim)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Comparison Grid (Side-by-Side) */}
        <div className={`grid grid-cols-1 md:grid-cols-${Math.min(candidates.length, 3)} gap-4`}>
          {candidates.slice(0, 3).map((res) => {
            const w = res.worker;
            return (
              <div
                key={w.id}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-4 hover:border-purple-300 transition"
              >
                <div className="space-y-4">
                  
                  {/* Header & Match Score */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={w.profilePhoto}
                        alt={w.fullName}
                        className="w-12 h-12 rounded-xl object-cover border border-slate-200 shadow-sm"
                      />
                      <div>
                        <h3 className="font-extrabold text-slate-900 text-sm">{w.fullName}</h3>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1">
                          <MapPin size={11} />
                          <span>{w.location} ({res.distanceKm} km)</span>
                        </div>
                      </div>
                    </div>

                    <div className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-black text-xs shrink-0">
                      {res.matchScore}% Match
                    </div>
                  </div>

                  {/* Key Stats Pill Matrix */}
                  <div className="grid grid-cols-2 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-medium">Betyg</div>
                      <div className="font-bold text-slate-900 flex items-center justify-center gap-1 mt-0.5">
                        <span>{w.rating.toFixed(1)}</span>
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-medium">Pålitlighet</div>
                      <div className="font-bold text-emerald-700 mt-0.5">{res.reliabilityScore}%</div>
                    </div>

                    <div className="p-2 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-medium">Erfarenhet</div>
                      <div className="font-bold text-slate-900 mt-0.5">{w.totalHours} timmar</div>
                    </div>

                    <div className="p-2 rounded-xl bg-white border border-slate-200">
                      <div className="text-[10px] text-slate-400 font-medium">Önskad Timlön</div>
                      <div className="font-bold text-slate-900 mt-0.5">{w.desiredHourlyRate} SEK/h</div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="text-xs space-y-1">
                    <span className="font-bold text-slate-700 text-[11px] uppercase tracking-wider">Certifikat & Körkort:</span>
                    <div className="flex flex-wrap gap-1">
                      {w.certificates.length > 0 ? (
                        w.certificates.map(c => (
                          <span key={c} className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-100 flex items-center gap-1">
                            <CheckCircle2 size={10} className="text-emerald-600" />
                            <span>{c}</span>
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 text-[11px]">Inga specifika certifikat</span>
                      )}
                      {w.drivingLicenses.map(l => (
                        <span key={l} className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 text-[10px] font-bold border border-blue-100">
                          {l}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Top Strengths */}
                  <div className="text-xs space-y-1.5 p-3 rounded-xl bg-white border border-slate-100">
                    <span className="font-bold text-purple-900 text-[11px]">Varför rekommenderas denna kandidat:</span>
                    <ul className="space-y-1 text-[11px] text-slate-700">
                      {res.strengths.slice(0, 3).map((st, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-600 shrink-0 font-bold">✓</span>
                          <span>{st.replace('✓ ', '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Potential Gap */}
                  {res.potentialGaps.length > 0 && res.potentialGaps[0] !== 'Inga kritiska kompetensluckor identifierade.' && (
                    <div className="text-[11px] text-amber-900 p-2.5 rounded-xl bg-amber-50/70 border border-amber-200">
                      {res.potentialGaps[0]}
                    </div>
                  )}

                </div>

                {/* Send Offer Button */}
                <div className="pt-2 border-t border-slate-200">
                  <button
                    onClick={() => {
                      onSendOffer(res);
                      onClose();
                    }}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition flex items-center justify-center gap-1.5"
                  >
                    <Send size={14} />
                    <span>Välj & Skicka Erbjudande</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
