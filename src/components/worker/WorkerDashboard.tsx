import React, { useState } from 'react';
import { WorkerProfile, User } from '../../types';
import { WorkerService } from '../../services/workerService';
import { WorkPassportView } from './WorkPassportView';
import { WorkerAvailabilityCalendar } from './WorkerAvailabilityCalendar';
import { WorkerProfileTab } from './WorkerProfileTab';
import { useTranslation } from '../../i18n/i18n';
import {
  Coins,
  Clock,
  CheckCircle2,
  AlertCircle,
  Award,
  Calendar,
  UserCheck,
  Briefcase,
  Star,
  FileSignature,
  ArrowRight,
  ShieldCheck
} from '../common/Icons';

interface WorkerDashboardProps {
  user: User;
  onNavigateTab: (tab: string) => void;
}

export const WorkerDashboard: React.FC<WorkerDashboardProps> = ({ user, onNavigateTab }) => {
  const { t } = useTranslation();
  const [profile, setProfile] = useState<WorkerProfile>(WorkerService.getProfile());
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'passport' | 'availability' | 'profile'>('overview');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Banner with Sub-Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider">
            <span>Arbetssökande & Uppdragstagare</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            Välkommen, {profile.fullName}
          </h1>
        </div>

        {/* Dashboard Sub-Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100/80 border border-slate-200/80 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${
              activeSubTab === 'overview' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase size={15} />
            <span>Översikt</span>
          </button>

          <button
            onClick={() => setActiveSubTab('passport')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${
              activeSubTab === 'passport' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Award size={15} />
            <span>Work Passport</span>
          </button>

          <button
            onClick={() => setActiveSubTab('availability')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${
              activeSubTab === 'availability' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar size={15} />
            <span>Tillgänglighet</span>
          </button>

          <button
            onClick={() => setActiveSubTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center gap-2 ${
              activeSubTab === 'profile' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <UserCheck size={15} />
            <span>Min Profil</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: OVERVIEW */}
      {activeSubTab === 'overview' && (
        <div className="space-y-8">
          
          {/* Requirement 29: Worker Earnings Overview */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Coins size={20} className="text-emerald-600" />
                  <span>Mina Arbetstimmar & Ersättning — Denna Månad</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">Sammanställning av inrapporterade och attesterade timmar.</p>
              </div>

              {/* Requirement 29/28 notice: Clearly label estimated amounts until payment provider connected */}
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-[11px] font-bold border border-amber-200 flex items-center gap-1.5 w-fit">
                <AlertCircle size={13} className="text-amber-600" />
                <span>Beräknade belopp (Betalleverantör ej live-kopplad)</span>
              </span>
            </div>

            {/* 5-Metric Financial Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
              
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-xs text-slate-500 font-medium">Arbetade Timmar</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">72</div>
                <div className="text-[11px] text-slate-400 mt-0.5 font-semibold">timmar denna månad</div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100">
                <div className="text-xs text-blue-700 font-medium">Beräknad Brutto</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-800 mt-1">11 880</div>
                <div className="text-[11px] text-blue-600 mt-0.5 font-semibold">SEK brutto</div>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100">
                <div className="text-xs text-emerald-700 font-medium">Attesterat / Godkänt</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-800 mt-1">9 500</div>
                <div className="text-[11px] text-emerald-600 mt-0.5 font-semibold">SEK godkänt av kund</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900 text-white">
                <div className="text-xs text-slate-300 font-medium">Utbetalt</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white mt-1">8 500</div>
                <div className="text-[11px] text-emerald-400 mt-0.5 font-semibold">SEK överfört</div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 col-span-2 sm:col-span-1">
                <div className="text-xs text-amber-800 font-medium">Väntande Attestering</div>
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-900 mt-1">1 000</div>
                <div className="text-[11px] text-amber-700 mt-0.5 font-semibold">SEK under granskning</div>
              </div>

            </div>
          </div>


          {/* Active Job Assignment Preview & Shortcut to Passport */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Quick Passport Highlight Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Award size={22} className="text-white" />
              </div>
              <h3 className="text-xl font-bold">Ditt Work Passport är aktivt</h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Du har {profile.totalHours} verifierade timmar och {profile.rating.toFixed(1)} i snittbetyg från {profile.completedAssignments} uppdrag.
              </p>
              <button
                onClick={() => setActiveSubTab('passport')}
                className="w-full py-2.5 rounded-xl bg-white text-blue-700 font-bold text-xs shadow hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                <span>Öppna Work Passport</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Quick Availability Shortcut */}
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Calendar size={22} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Uppdatera Tillgänglighet</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Håll din kalender uppdaterad så att AI-matchningsmotorn kan skicka relevanta jobberbjudanden och timuppdrag.
              </p>
              <button
                onClick={() => setActiveSubTab('availability')}
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow hover:bg-emerald-700 transition flex items-center justify-center gap-2"
              >
                <span>Hantera Kalender</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Contract Transparency Chain Note */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-card space-y-4">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-emerald-400 flex items-center justify-center">
                <FileSignature size={22} />
              </div>
              <h3 className="text-lg font-bold">Digital Beviskedja</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Varje pass kopplas till ett digitalt avtal med överenskommen timlön och verifierade tidsstämplar.
              </p>
              <button
                onClick={() => onNavigateTab('contracts')}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-2"
              >
                <span>Visa Digitala Avtal</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>

        </div>
      )}

      {/* SUBTAB 2: WORK PASSPORT */}
      {activeSubTab === 'passport' && (
        <WorkPassportView profile={profile} />
      )}

      {/* SUBTAB 3: AVAILABILITY */}
      {activeSubTab === 'availability' && (
        <WorkerAvailabilityCalendar />
      )}

      {/* SUBTAB 4: PROFILE */}
      {activeSubTab === 'profile' && (
        <WorkerProfileTab
          profile={profile}
          onProfileUpdate={(updated) => setProfile(updated)}
        />
      )}

    </div>
  );
};
