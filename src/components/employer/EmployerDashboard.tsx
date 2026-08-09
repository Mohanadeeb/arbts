import React, { useState } from 'react';
import { User, Company, Job, CandidateMatchResult } from '../../types';
import { JobService } from '../../services/jobService';
import { CandidateSearchService } from '../../services/candidateSearchService';
import { JobCreationModal } from './JobCreationModal';
import { CandidateDiscoveryModal } from '../matching/CandidateDiscoveryModal';
import { useTranslation } from '../../i18n/i18n';
import {
  Building2,
  Building,
  Briefcase,
  Users,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Coins,
  MapPin,
  Sparkles,
  ArrowRight,
  Send,
  Star,
  Award,
  Filter,
  Bot
} from '../common/Icons';

interface EmployerDashboardProps {
  user: User;
  onNavigateTab: (tab: string) => void;
}

export const EmployerDashboard: React.FC<EmployerDashboardProps> = ({ user, onNavigateTab }) => {
  const { t } = useTranslation();
  const [company, setCompany] = useState<Company>(JobService.getCompany());
  const [jobs, setJobs] = useState<Job[]>(JobService.getJobs());
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [activeSubTab, setActiveSubTab] = useState<'jobs' | 'workers' | 'company'>('jobs');
  const [selectedJobForDiscovery, setSelectedJobForDiscovery] = useState<Job | null>(null);
  const [offerSentWorkerIds, setOfferSentWorkerIds] = useState<Record<string, boolean>>({});

  // Auto-run AI matching for the primary job
  const primaryJob = jobs[0] || null;
  const recommendedCandidates: CandidateMatchResult[] = primaryJob
    ? CandidateSearchService.searchCandidatesForJob(primaryJob)
    : [];

  const handleJobCreated = (newJob: Job) => {
    setJobs([newJob, ...jobs]);
    // Automatically trigger AI candidate discovery modal
    setSelectedJobForDiscovery(newJob);
  };

  const handleOfferSent = (workerId: string) => {
    setOfferSentWorkerIds(prev => ({ ...prev, [workerId]: true }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Company Header & Stats */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <img
              src={company.logoUrl || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80'}
              alt={company.companyName}
              className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">{company.companyName}</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200 flex items-center gap-1">
                  <ShieldCheck size={13} />
                  <span>Verifierat Företag</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Org.nr: <strong className="font-mono">{company.orgNumber}</strong> • {company.industry} • {company.location}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsJobModalOpen(true)}
            className="w-full md:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2 hover-lift"
          >
            <Briefcase size={16} />
            <span>Skapa Nytt Uppdrag</span>
          </button>
        </div>

        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-xs text-slate-500 font-medium">Publicerade Uppdrag</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">{jobs.length}</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">Aktiva på marknadsplatsen</div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100">
            <div className="text-xs text-purple-700 font-medium">AI-Matchade Kandidater</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-800 mt-1">11</div>
            <div className="text-[11px] text-purple-600 mt-0.5 font-semibold">I tillgänglig databas</div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
            <div className="text-xs text-emerald-700 font-medium">Digitala Avtal Tecknade</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 mt-1">8</div>
            <div className="text-[11px] text-emerald-600 mt-0.5 font-semibold">100% juridiskt signerade</div>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
            <div className="text-xs text-blue-700 font-medium">Fastanställningskonvertering</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-800 mt-1">2</div>
            <div className="text-[11px] text-blue-600 mt-0.5 font-semibold">Från timmar till tillsvidare</div>
          </div>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button
            onClick={() => setActiveSubTab('jobs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'jobs' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Briefcase size={15} />
            <span>Mina Uppdrag ({jobs.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('workers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
              activeSubTab === 'workers' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles size={15} className="text-purple-400" />
            <span>AI-Kandidatupptäckt & Matchning ({recommendedCandidates.length})</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: JOBS LIST */}
      {activeSubTab === 'jobs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">Aktiva & Publicerade Uppdrag</h2>
            <button
              onClick={() => setIsJobModalOpen(true)}
              className="text-xs font-bold text-emerald-600 hover:text-emerald-700 underline"
            >
              + Lägg till uppdrag
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card hover:border-purple-300 transition space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        {job.category}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base mt-1.5">{job.title}</h3>
                    </div>

                    <span className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-black">
                      {job.hourlyRate} SEK/tim
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">{job.description}</p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold text-slate-500 pt-2 border-t border-slate-100">
                    <span className="flex items-center gap-1">
                      <MapPin size={13} />
                      {job.location}
                    </span>
                    <span>•</span>
                    <span>{job.startDate} — {job.endDate}</span>
                    <span>•</span>
                    <span className="text-blue-600 font-bold">{job.workersNeeded} personal sökes</span>
                  </div>
                </div>

                {/* AI Discovery Trigger Button */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-purple-700 font-bold flex items-center gap-1">
                    <Sparkles size={13} />
                    <span>AI-kandidater redo</span>
                  </span>

                  <button
                    onClick={() => setSelectedJobForDiscovery(job)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-500/20 transition flex items-center gap-1.5"
                  >
                    <Bot size={14} />
                    <span>Öppna AI-Matchning</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SUBTAB 2: WORKER DISCOVERY & AI MATCHING */}
      {activeSubTab === 'workers' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-slate-900">AI-Matchade Toppkandidater</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-extrabold">
                  {primaryJob?.title || 'Lagerarbetare'}
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Kandidater rankade efter kompetens, erfarenhet, licenser (Truckkort), avstånd och kalendertillgänglighet.
              </p>
            </div>

            {primaryJob && (
              <button
                onClick={() => setSelectedJobForDiscovery(primaryJob)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition flex items-center gap-2"
              >
                <Sparkles size={14} />
                <span>Djup AI-analys & Jämförelse</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendedCandidates.slice(0, 6).map((res) => {
              const worker = res.worker;
              const isOffered = offerSentWorkerIds[worker.id];

              return (
                <div
                  key={worker.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-card-hover transition space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    
                    {/* Header with Match % Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={worker.profilePhoto}
                          alt={worker.fullName}
                          className="w-13 h-13 rounded-2xl object-cover border border-slate-100 shadow-sm"
                        />
                        <div>
                          <h3 className="font-extrabold text-slate-900 text-base leading-tight">{worker.fullName}</h3>
                          <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                            <MapPin size={11} />
                            <span>{worker.location} ({res.distanceKm} km)</span>
                          </div>
                        </div>
                      </div>

                      <div className={`px-2.5 py-1 rounded-xl text-xs font-black shrink-0 ${
                        res.matchScore >= 90 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' :
                        'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}>
                        {res.matchScore}% Match
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
                      <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
                        <div className="text-[10px] text-slate-400 font-medium">Work Passport</div>
                        <div className="font-extrabold text-slate-900 mt-0.5">{worker.totalHours} timmar</div>
                      </div>
                      <div className="p-2 rounded-xl bg-amber-50/60 border border-amber-100">
                        <div className="text-[10px] text-amber-700 font-medium">Snittbetyg</div>
                        <div className="font-extrabold text-amber-900 mt-0.5 flex items-center justify-center gap-1">
                          <span>{worker.rating.toFixed(1)}</span>
                          <Star size={13} className="fill-amber-400 text-amber-400" />
                        </div>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {worker.biography}
                    </p>

                    {/* Top match strength */}
                    <div className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 text-[11px] text-emerald-900 font-medium space-y-1">
                      <div className="font-bold flex items-center gap-1 text-emerald-800">
                        <CheckCircle2 size={12} className="text-emerald-600" />
                        <span>AI-Styrka:</span>
                      </div>
                      <div className="line-clamp-1">{res.strengths[0]}</div>
                    </div>

                    {/* Skills & Certs */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {worker.skills.slice(0, 3).map(skill => (
                        <span key={skill} className="px-2 py-0.5 rounded-lg bg-purple-50 text-purple-800 text-[10px] font-semibold border border-purple-100">
                          {skill}
                        </span>
                      ))}
                      {worker.certificates.slice(0, 1).map(cert => (
                        <span key={cert} className="px-2 py-0.5 rounded-lg bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-100">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Send Offer Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedJobForDiscovery(primaryJob)}
                      className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition text-center"
                    >
                      Granska
                    </button>

                    <button
                      onClick={() => handleOfferSent(worker.id)}
                      disabled={isOffered}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm ${
                        isOffered
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-500/20'
                      }`}
                    >
                      {isOffered ? (
                        <>
                          <CheckCircle2 size={13} />
                          <span>Skickat</span>
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          <span>Erbjudande</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Job Creation Modal */}
      <JobCreationModal
        isOpen={isJobModalOpen}
        onClose={() => setIsJobModalOpen(false)}
        onJobCreated={handleJobCreated}
        company={company}
      />

      {/* Candidate Discovery Modal */}
      {selectedJobForDiscovery && (
        <CandidateDiscoveryModal
          job={selectedJobForDiscovery}
          isOpen={Boolean(selectedJobForDiscovery)}
          onClose={() => setSelectedJobForDiscovery(null)}
          onOfferSent={handleOfferSent}
        />
      )}

    </div>
  );
};
