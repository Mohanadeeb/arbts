import React, { useState } from 'react';
import { WorkerProfile } from '../../types';
import { useTranslation } from '../../i18n/i18n';
import {
  Award,
  Star,
  CheckCircle2,
  Clock,
  Briefcase,
  Building,
  ShieldCheck,
  Download,
  Eye,
  CheckCheck,
  TrendingUp,
  Sparkles,
  MapPin,
  Calendar
} from '../common/Icons';

interface WorkPassportViewProps {
  profile: WorkerProfile;
}

export const WorkPassportView: React.FC<WorkPassportViewProps> = ({ profile }) => {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    const passportUrl = `${window.location.origin}/passport/${profile.id}`;
    navigator.clipboard?.writeText(passportUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-8">
      
      {/* 1. PASSPORT HEADER CARD */}
      <div className="relative overflow-hidden p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 text-white shadow-xl border border-slate-800">
        
        {/* Ambient background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={profile.profilePhoto || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                alt={profile.fullName}
                className="w-20 h-20 rounded-2xl object-cover ring-4 ring-blue-500/30 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-emerald-500 text-white shadow-md" title="Verifierat Work Passport">
                <CheckCheck size={14} />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-bold tracking-wider uppercase border border-blue-500/30">
                  Officiellt Work Passport
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: AL-WP-{profile.id}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5">{profile.fullName}</h1>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <MapPin size={13} className="text-slate-400" />
                  {profile.location}
                </span>
                <span>•</span>
                <span>Önskad lön: <strong className="text-emerald-400">{profile.desiredHourlyRate} SEK/tim</strong></span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleShare}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md shadow-blue-600/30"
            >
              <Eye size={16} />
              <span>{copied ? 'Länk kopierad!' : 'Dela Work Passport'}</span>
            </button>
          </div>
        </div>

        {/* Passport Key Metrics Grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
          
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="text-xs text-slate-400 font-medium">Dokumenterade Timmar</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-baseline gap-1">
              <span>{profile.totalHours}</span>
              <span className="text-xs text-slate-400 font-normal">timmar</span>
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 size={12} />
              <span>100% Attesterade</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="text-xs text-slate-400 font-medium">Slutförda Uppdrag</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 mt-1">
              {profile.completedAssignments}
            </div>
            <div className="text-[10px] text-blue-300 font-semibold mt-1">
              Genomförda med avtal
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="text-xs text-slate-400 font-medium">Snittbetyg från Arbetsgivare</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1 flex items-center gap-1.5">
              <span>{profile.rating.toFixed(1)}</span>
              <Star size={20} className="fill-amber-400 text-amber-400 inline" />
            </div>
            <div className="text-[10px] text-slate-300 font-semibold mt-1">
              Baserat på {profile.completedAssignments} recensioner
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="text-xs text-slate-400 font-medium">Pålitlighet & Punktlighet</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-1">
              98%
            </div>
            <div className="text-[10px] text-emerald-300 font-semibold mt-1">
              Inga oanmälda frånfall
            </div>
          </div>

        </div>
      </div>


      {/* 2. VERIFIED SKILLS & CERTIFICATES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Verified Skills */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles size={18} className="text-blue-600" />
              Verifierade Kompetenser
            </h3>
            <span className="text-xs text-slate-400 font-semibold">{profile.skills.length} st</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100 flex items-center gap-1.5"
              >
                <CheckCircle2 size={13} className="text-blue-600" />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Certificates & Licenses */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Award size={18} className="text-emerald-600" />
              Intyg, Licenser & Språk
            </h3>
            <span className="text-xs text-slate-400 font-semibold">{profile.certificates.length + profile.drivingLicenses.length} st</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {profile.certificates.map((cert) => (
              <div key={cert} className="p-2.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center justify-between">
                <div className="font-semibold text-emerald-900 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  <span>{cert}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-emerald-700">Verifierad</span>
              </div>
            ))}

            {profile.drivingLicenses.map((dl) => (
              <div key={dl} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="font-semibold text-slate-800 flex items-center gap-2">
                  <Briefcase size={16} className="text-slate-600" />
                  <span>Körkort: {dl}</span>
                </div>
                <span className="text-[10px] uppercase font-bold text-slate-500">Giltig</span>
              </div>
            ))}
          </div>
        </div>

      </div>


      {/* 3. WORK TIMELINE & EMPLOYER FEEDBACK */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Arbetshistorik & Arbetsgivaromdömen</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Kronologisk logg över genomförda uppdrag via Arbetslyft med verifierade timmar och referenser.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {profile.workHistory?.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl border border-slate-200 hover:border-blue-200 bg-slate-50/50 hover:bg-white transition shadow-sm space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm">
                    <Building size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{item.jobTitle}</h4>
                    <div className="text-xs text-slate-500 font-medium">{item.companyName}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold">
                    {item.hoursWorked} timmar
                  </span>
                  <div className="flex items-center gap-1 font-bold text-amber-500 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                    <Star size={14} className="fill-amber-400" />
                    <span>{item.rating.toFixed(1)} / 5</span>
                  </div>
                </div>
              </div>

              {item.feedback && (
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 text-xs text-slate-700 italic">
                  "{item.feedback}"
                </div>
              )}

              <div className="text-[11px] text-slate-400 flex items-center gap-2">
                <Calendar size={12} />
                <span>{item.startDate} — {item.endDate}</span>
                <span>•</span>
                <span className="text-emerald-600 font-semibold">Digitalt avtal slutfört</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
