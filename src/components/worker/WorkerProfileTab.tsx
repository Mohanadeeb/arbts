import React, { useState } from 'react';
import { WorkerProfile } from '../../types';
import { WorkerService } from '../../services/workerService';
import { useTranslation } from '../../i18n/i18n';
import {
  UserCheck,
  MapPin,
  Coins,
  ShieldCheck,
  Briefcase,
  Award,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  X
} from '../common/Icons';

interface WorkerProfileTabProps {
  profile: WorkerProfile;
  onProfileUpdate: (updated: WorkerProfile) => void;
}

export const WorkerProfileTab: React.FC<WorkerProfileTabProps> = ({ profile, onProfileUpdate }) => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState(profile.fullName);
  const [location, setLocation] = useState(profile.location);
  const [phone, setPhone] = useState(profile.phone || '');
  const [biography, setBiography] = useState(profile.biography);
  const [hourlyRate, setHourlyRate] = useState(profile.desiredHourlyRate);
  const [distanceKm, setDistanceKm] = useState(profile.preferredDistanceKm);
  const [education, setEducation] = useState(profile.education);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [newCertInput, setNewCertInput] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: WorkerProfile = {
      ...profile,
      fullName,
      location,
      phone,
      biography,
      desiredHourlyRate: Number(hourlyRate),
      preferredDistanceKm: Number(distanceKm),
      education,
    };
    const saved = WorkerService.saveProfile(updated);
    onProfileUpdate(saved);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddSkill = () => {
    if (newSkillInput.trim()) {
      const updated = WorkerService.addSkill(newSkillInput.trim());
      onProfileUpdate(updated);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skill: string) => {
    const updated = WorkerService.removeSkill(skill);
    onProfileUpdate(updated);
  };

  const handleAddCert = () => {
    if (newCertInput.trim()) {
      const updated = WorkerService.addCertificate(newCertInput.trim());
      onProfileUpdate(updated);
      setNewCertInput('');
    }
  };

  const handleRemoveCert = (cert: string) => {
    const updated = WorkerService.removeCertificate(cert);
    onProfileUpdate(updated);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      
      {/* GDPR Sensitive Data Protection Banner */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 text-xs text-blue-950 flex items-start gap-3">
        <ShieldCheck size={20} className="text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Integritet & GDPR-skydd:</span>
          <p className="mt-0.5 text-blue-900 leading-relaxed">
            Ditt personnummer, privata adress och telefonnummer döljs från publika listningar och delas endast med en arbetsgivare när ett digitalt avtal tecknats.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="flex items-center justify-between pb-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Redigera Arbetsprofil</h2>
            <p className="text-xs text-slate-500 mt-0.5">Uppdatera dina kontaktuppgifter, önskad timlön och kompetenser.</p>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-2"
          >
            <CheckCircle2 size={16} />
            <span>{savedSuccess ? 'Sparat!' : 'Spara Ändringar'}</span>
          </button>
        </div>

        {/* Basic Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Fullständigt Namn</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Stad / Område</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Telefonnummer (Skyddat)</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="070-123 45 67"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Utbildning</label>
            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="Gymnasieexamen..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Rate & Distance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Önskad Timersättning (SEK/tim)</label>
            <div className="relative">
              <input
                type="number"
                min="100"
                max="1000"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full pl-3.5 pr-14 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-semibold">SEK/h</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Max reseavstånd (km)</label>
            <div className="relative">
              <input
                type="number"
                min="5"
                max="200"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full pl-3.5 pr-14 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <span className="absolute right-3.5 top-2.5 text-xs text-slate-400 font-semibold">km</span>
            </div>
          </div>
        </div>

        {/* Biography */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">Presentation / Biografi</label>
          <textarea
            rows={4}
            value={biography}
            onChange={(e) => setBiography(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Beskriv din erfarenhet och vad du är bra på..."
          />
        </div>

        {/* Skills Tag Management */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-semibold text-slate-700 mb-2">Mina Kompetenser</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100 flex items-center gap-1.5"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="p-0.5 rounded-full hover:bg-blue-200/60 text-blue-500"
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-sm">
            <input
              type="text"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              placeholder="Lägg till kompetens..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition"
            >
              Lägg till
            </button>
          </div>
        </div>

        {/* Certificates Management */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-semibold text-slate-700 mb-2">Intyg & Certifikat</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {profile.certificates.map((cert) => (
              <span
                key={cert}
                className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-semibold border border-emerald-100 flex items-center gap-1.5"
              >
                <Award size={14} className="text-emerald-600" />
                <span>{cert}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCert(cert)}
                  className="p-0.5 rounded-full hover:bg-emerald-200/60 text-emerald-500"
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 max-w-sm">
            <input
              type="text"
              value={newCertInput}
              onChange={(e) => setNewCertInput(e.target.value)}
              placeholder="T.ex. Truckkort A1-A4, Hygienpass..."
              className="flex-1 px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              type="button"
              onClick={handleAddCert}
              className="px-3 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
            >
              Lägg till
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
