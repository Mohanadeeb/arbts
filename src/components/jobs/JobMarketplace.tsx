import React, { useState } from 'react';
import { Job } from '../../types';
import { JobService, JOB_CATEGORIES } from '../../services/jobService';
import { useTranslation } from '../../i18n/i18n';
import {
  Search,
  Filter,
  MapPin,
  Calendar,
  Coins,
  Clock,
  Briefcase,
  Building,
  CheckCircle2,
  Sparkles,
  Bot,
  ArrowRight,
  ShieldCheck,
  Award,
  X
} from '../common/Icons';

interface JobMarketplaceProps {
  onSelectJob?: (job: Job) => void;
  onOpenAuth?: (role: 'WORKER' | 'EMPLOYER') => void;
}

export const JobMarketplace: React.FC<JobMarketplaceProps> = ({ onSelectJob, onOpenAuth }) => {
  const { t } = useTranslation();
  const [jobs, setJobs] = useState<Job[]>(JobService.getJobs());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [minRate, setMinRate] = useState<number>(0);
  const [activeSort, setActiveSort] = useState<'MATCH' | 'RATE' | 'NEWEST'>('MATCH');
  const [selectedJobModal, setSelectedJobModal] = useState<Job | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.skillsRequired.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'ALL' || job.category === selectedCategory;
    const matchesRate = job.hourlyRate >= minRate;

    return matchesSearch && matchesCategory && matchesRate;
  }).sort((a, b) => {
    if (activeSort === 'MATCH') return (b.matchScore || 0) - (a.matchScore || 0);
    if (activeSort === 'RATE') return b.hourlyRate - a.hourlyRate;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleApply = (job: Job) => {
    setAppliedJobs(prev => ({ ...prev, [job.id]: true }));
    if (onSelectJob) onSelectJob(job);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
            <Sparkles size={14} className="text-blue-600" />
            <span>AI-Matchad Arbetsmarknad</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Hitta Jobb & Uppdrag i Sverige
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Korta uppdrag, timvikariat, deltid och fasta anställningar med digitala avtal.
          </p>
        </div>

        {/* Sorting Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs font-semibold self-start md:self-auto">
          <button
            onClick={() => setActiveSort('MATCH')}
            className={`px-3 py-1.5 rounded-lg transition ${activeSort === 'MATCH' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Högst AI-Matchning
          </button>
          <button
            onClick={() => setActiveSort('RATE')}
            className={`px-3 py-1.5 rounded-lg transition ${activeSort === 'RATE' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Högst Timlön
          </button>
          <button
            onClick={() => setActiveSort('NEWEST')}
            className={`px-3 py-1.5 rounded-lg transition ${activeSort === 'NEWEST' ? 'bg-white text-blue-600 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Nyast
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-card space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Main Keyword Search */}
          <div className="relative md:col-span-6">
            <Search size={18} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Sök på yrkestitel, kompetens, företag eller stad..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Category Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-700"
            >
              <option value="ALL">Alla Kategorier</option>
              {JOB_CATEGORIES.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Min Hourly Rate Filter */}
          <div className="md:col-span-3">
            <select
              value={minRate}
              onChange={(e) => setMinRate(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-700"
            >
              <option value="0">Alla Timlöner</option>
              <option value="150">Minst 150 SEK/tim</option>
              <option value="165">Minst 165 SEK/tim</option>
              <option value="180">Minst 180 SEK/tim</option>
            </select>
          </div>

        </div>

        {/* Quick Filter Tags */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
          <span className="text-slate-400 font-medium">Populära sökningar:</span>
          {['Lager & Truckkort', 'Stockholm', 'Kassa', 'Eventvärd', '165+ SEK/h'].map(tag => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag.split(' ')[0])}
              className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>


      {/* Job Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredJobs.map((job) => {
          const isApplied = appliedJobs[job.id];
          return (
            <div
              key={job.id}
              className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-card hover:shadow-card-hover transition-all space-y-4 hover-lift flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header: Company, Verified Badge & AI Match Score */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={job.companyLogo || 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80'}
                      alt={job.companyName}
                      className="w-12 h-12 rounded-2xl object-cover border border-slate-100 shadow-sm"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-800 text-xs">{job.companyName}</span>
                        <ShieldCheck size={14} className="text-blue-600" title="Verifierat företag" />
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-base leading-snug mt-0.5">{job.title}</h3>
                    </div>
                  </div>

                  {/* AI Match Score Badge */}
                  {job.matchScore && (
                    <div className="flex flex-col items-end shrink-0">
                      <div className="px-2.5 py-1 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-700 font-black text-xs flex items-center gap-1">
                        <Sparkles size={12} className="text-emerald-600" />
                        <span>{job.matchScore}% Match</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-medium mt-0.5">AI-beräknad</span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {job.description}
                </p>

                {/* Job Meta Specs */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-semibold text-slate-600 pt-1">
                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <MapPin size={14} className="text-slate-500 shrink-0" />
                    <span className="truncate">{job.location}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <Calendar size={14} className="text-slate-500 shrink-0" />
                    <span>{job.startDate.substring(5)} — {job.endDate.substring(5)}</span>
                  </div>

                  <div className="flex items-center gap-1.5 bg-emerald-50/70 p-2 rounded-xl border border-emerald-100 text-emerald-800 font-bold col-span-2 sm:col-span-1">
                    <Coins size={14} className="text-emerald-600 shrink-0" />
                    <span>{job.hourlyRate} SEK/tim</span>
                  </div>
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {job.skillsRequired.map(skill => (
                    <span
                      key={skill}
                      className="px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-100/80"
                    >
                      {skill}
                    </span>
                  ))}
                  {job.drivingLicenseRequired && (
                    <span className="px-2.5 py-0.5 rounded-lg bg-purple-50 text-purple-700 text-[11px] font-semibold border border-purple-100">
                      B-Körkort
                    </span>
                  )}
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedJobModal(job)}
                  className="text-xs font-bold text-blue-600 hover:text-blue-700 underline"
                >
                  Visa detaljer & AI-motivering
                </button>

                <button
                  onClick={() => handleApply(job)}
                  disabled={isApplied}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition flex items-center gap-2 ${
                    isApplied
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20'
                  }`}
                >
                  {isApplied ? (
                    <>
                      <CheckCircle2 size={15} className="text-emerald-700" />
                      <span>Ansökt & Klar</span>
                    </>
                  ) : (
                    <>
                      <span>Ansök Nu</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Job Details & AI Match Breakdown */}
      {selectedJobModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-xl rounded-3xl bg-white shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-hidden space-y-6">
            <button
              onClick={() => setSelectedJobModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X size={20} />
            </button>

            <div className="flex items-start gap-4">
              <img
                src={selectedJobModal.companyLogo}
                alt={selectedJobModal.companyName}
                className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
              />
              <div>
                <span className="text-xs text-blue-600 font-bold uppercase">{selectedJobModal.category}</span>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedJobModal.title}</h3>
                <p className="text-xs text-slate-500">{selectedJobModal.companyName} • {selectedJobModal.location}</p>
              </div>
            </div>

            {/* AI Match Explanation Breakdown */}
            {selectedJobModal.matchBreakdown && (
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                    <Bot size={16} className="text-blue-600" />
                    Varför du matchar detta uppdrag:
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white font-extrabold text-xs">
                    {selectedJobModal.matchScore}% Match
                  </span>
                </div>
                <ul className="space-y-1.5 text-xs text-blue-950 font-medium">
                  {selectedJobModal.matchBreakdown.reasons.map((r, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle2 size={13} className="text-blue-600 shrink-0" />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-3 text-xs text-slate-700">
              <h4 className="font-bold text-slate-900 text-sm">Om uppdraget</h4>
              <p className="leading-relaxed">{selectedJobModal.description}</p>
              
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-medium">Arbetstider</div>
                  <div className="font-bold text-slate-800 mt-0.5">{selectedJobModal.startTime} — {selectedJobModal.endTime}</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-slate-400 font-medium">Ersättning</div>
                  <div className="font-bold text-emerald-700 mt-0.5">{selectedJobModal.hourlyRate} SEK/tim brutto</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedJobModal(null)}
                className="px-4 py-2 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100"
              >
                Stäng
              </button>
              <button
                onClick={() => {
                  handleApply(selectedJobModal);
                  setSelectedJobModal(null);
                }}
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20"
              >
                Bekräfta Ansökan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
