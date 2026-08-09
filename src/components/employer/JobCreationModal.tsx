import React, { useState } from 'react';
import { Job, Company } from '../../types';
import { JobService, JOB_CATEGORIES } from '../../services/jobService';
import { useTranslation } from '../../i18n/i18n';
import {
  X,
  Briefcase,
  Building,
  Calendar,
  Clock,
  Coins,
  MapPin,
  Sparkles,
  Award,
  CheckCircle2,
  Users,
  ShieldCheck
} from '../common/Icons';

interface JobCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onJobCreated: (newJob: Job) => void;
  company: Company;
}

export const JobCreationModal: React.FC<JobCreationModalProps> = ({
  isOpen,
  onClose,
  onJobCreated,
  company,
}) => {
  const { t } = useTranslation();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(JOB_CATEGORIES[0].name);
  const [location, setLocation] = useState(company.location || 'Stockholm');
  const [isRemote, setIsRemote] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('17:00');
  const [workersNeeded, setWorkersNeeded] = useState(1);
  const [hourlyRate, setHourlyRate] = useState(165);
  const [skillsInput, setSkillsInput] = useState('Lagerarbete, Truckkort A1-A4, Paketering');
  const [experienceRequired, setExperienceRequired] = useState('1+ år erfarenhet');
  const [certificatesInput, setCertificatesInput] = useState('Truckkort A1-A4');
  const [drivingLicenseRequired, setDrivingLicenseRequired] = useState(false);
  const [languagesInput, setLanguagesInput] = useState('Svenska, Engelska');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const skillsRequired = skillsInput.split(',').map(s => s.trim()).filter(Boolean);
    const certificatesRequired = certificatesInput.split(',').map(c => c.trim()).filter(Boolean);
    const languageRequirements = languagesInput.split(',').map(l => l.trim()).filter(Boolean);

    const created = JobService.createJob({
      companyId: company.id,
      employerUserId: 'u-employer-1',
      companyName: company.companyName,
      companyLogo: company.logoUrl,
      title,
      description,
      category,
      skillsRequired,
      experienceRequired,
      location,
      isRemote,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0],
      startTime,
      endTime,
      workersNeeded: Number(workersNeeded),
      hourlyRate: Number(hourlyRate),
      languageRequirements,
      certificatesRequired,
      drivingLicenseRequired,
    });

    onJobCreated(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-white shadow-2xl border border-slate-100 p-6 sm:p-8 overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Briefcase size={22} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Skapa & Publicera Uppdrag</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Publicera för {company.companyName} • AI-matchning startar omedelbart
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          
          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Uppdragstitel</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="T.ex. Lagerarbetare — 5 dagar (Högsäsong)"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Jobbkategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600 bg-white"
              >
                {JOB_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.name}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Arbetsplats / Stad</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Stockholm, Älvsjö"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Dates and Times */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Startdatum</label>
              <input
                type="date"
                required
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Slutdatum</label>
              <input
                type="date"
                required
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Starttid</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">Sluttid</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Workers needed & Rate */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Antal personer som behövs</label>
              <input
                type="number"
                min="1"
                max="50"
                value={workersNeeded}
                onChange={(e) => setWorkersNeeded(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Erbjuden Timersättning (SEK/tim)</label>
              <div className="relative">
                <input
                  type="number"
                  min="120"
                  max="1000"
                  value={hourlyRate}
                  onChange={(e) => setHourlyRate(Number(e.target.value))}
                  className="w-full pl-3.5 pr-14 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-semibold">SEK/h</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Arbetsbeskrivning</label>
            <textarea
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Beskriv arbetsuppgifter, förutsättningar och eventuella krav på skyddskläder..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          {/* Skills & Certs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Önskade Kompetenser (kommatecken-separerade)</label>
              <input
                type="text"
                value={skillsInput}
                onChange={(e) => setSkillsInput(e.target.value)}
                placeholder="Lagerarbete, Truckkort, Paketering"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Certifikat / Licenser</label>
              <input
                type="text"
                value={certificatesInput}
                onChange={(e) => setCertificatesInput(e.target.value)}
                placeholder="Truckkort A1-A4, Hygienpass"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
            </div>
          </div>

          {/* Driving license checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="drivingLicenseCheck"
              checked={drivingLicenseRequired}
              onChange={(e) => setDrivingLicenseRequired(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300"
            />
            <label htmlFor="drivingLicenseCheck" className="text-xs font-medium text-slate-700 cursor-pointer">
              Kräver giltigt B-körkort för detta uppdrag
            </label>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100 transition"
            >
              Avbryt
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              <span>Publicera Uppdrag Nu</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
