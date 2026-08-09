import React, { useState } from 'react';
import { WorkerService } from '../../services/workerService';
import { useTranslation } from '../../i18n/i18n';
import { Calendar, CheckCircle2, X, Clock, AlertCircle } from '../common/Icons';

export const WorkerAvailabilityCalendar: React.FC = () => {
  const { t } = useTranslation();
  const [availability, setAvailability] = useState<Record<string, boolean>>(WorkerService.getAvailability());

  // Generate 28 days from today
  const dates: { dateStr: string; dayName: string; dayNum: number; monthName: string }[] = [];
  const today = new Date();
  const swedishDays = ['Sön', 'Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör'];
  const swedishMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'Maj', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dec'];

  for (let i = 0; i < 28; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    dates.push({
      dateStr: d.toISOString().split('T')[0],
      dayName: swedishDays[d.getDay()],
      dayNum: d.getDate(),
      monthName: swedishMonths[d.getMonth()],
    });
  }

  const handleToggle = (dateStr: string) => {
    const updated = WorkerService.toggleAvailabilityDate(dateStr);
    setAvailability({ ...updated });
  };

  const availableCount = Object.values(availability).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Calendar size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Min Tillgänglighet för Jobb</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Klicka på datum för att markera när du kan ta uppdrag. Matchningsmotorn prioriterar dagar du är ledig.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60 flex items-center gap-1.5">
            <CheckCircle2 size={16} />
            <span>{availableCount} aktiva dagar markerade</span>
          </span>
        </div>
      </div>

      {/* Legend & Instructions */}
      <div className="flex items-center gap-6 px-2 text-xs font-medium text-slate-600">
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-md bg-emerald-500" />
          <span>Tillgänglig för uppdrag</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-md bg-slate-200" />
          <span>Inte tillgänglig</span>
        </div>
      </div>

      {/* Calendar 28-day Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
        {dates.map((d) => {
          const isAvailable = availability[d.dateStr] ?? false;
          return (
            <button
              key={d.dateStr}
              onClick={() => handleToggle(d.dateStr)}
              className={`p-3.5 rounded-2xl border text-center transition-all flex flex-col items-center justify-between min-h-[96px] ${
                isAvailable
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-sm ring-1 ring-emerald-500/30'
                  : 'border-slate-200 bg-white hover:border-slate-300 opacity-75'
              }`}
            >
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {d.dayName}
              </div>
              <div className={`text-2xl font-extrabold my-1 ${isAvailable ? 'text-emerald-700' : 'text-slate-700'}`}>
                {d.dayNum}
              </div>
              <div className="text-[10px] text-slate-400 font-semibold mb-1">
                {d.monthName}
              </div>

              {isAvailable ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-bold">
                  Ledig
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-semibold">
                  Upptagen
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Short-notice notice */}
      <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 flex items-start gap-3">
        <Clock size={18} className="text-blue-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Akuta & korta uppdrag:</span>
          <p className="mt-0.5 text-blue-800">
            Arbetsgivare med akuta personalbehov kan skicka direkta erbjudanden för de dagar du markerat som tillgängliga.
          </p>
        </div>
      </div>
    </div>
  );
};
