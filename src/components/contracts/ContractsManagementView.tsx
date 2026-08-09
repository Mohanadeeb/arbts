import React, { useState } from 'react';
import { Contract, Assignment, WorkHoursSubmission } from '../../types';
import { ContractService } from '../../services/contractService';
import { WorkHoursService } from '../../services/workHoursService';
import { RatingService } from '../../services/ratingService';
import { ContractViewModal } from './ContractViewModal';
import { useTranslation } from '../../i18n/i18n';
import {
  FileSignature,
  Building,
  UserCheck,
  CheckCircle2,
  Calendar,
  Clock,
  Coins,
  ShieldCheck,
  Download,
  AlertCircle,
  Star,
  Award,
  Sparkles,
  ArrowRight,
  X
} from '../common/Icons';

interface ContractsManagementViewProps {
  onNavigateTab: (tab: string) => void;
}

export const ContractsManagementView: React.FC<ContractsManagementViewProps> = ({ onNavigateTab }) => {
  const { t } = useTranslation();
  const [contracts, setContracts] = useState<Contract[]>(ContractService.getContracts());
  const [assignments, setAssignments] = useState<Assignment[]>(ContractService.getAssignments());
  const [workHours, setWorkHours] = useState<WorkHoursSubmission[]>(WorkHoursService.getHours());
  const [selectedContractModal, setSelectedContractModal] = useState<Contract | null>(null);

  // Time reporting modal state
  const [reportModalAssignment, setReportModalAssignment] = useState<Assignment | null>(null);
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [reportStart, setReportStart] = useState('07:00');
  const [reportEnd, setReportEnd] = useState('16:00');
  const [reportBreak, setReportBreak] = useState(45);
  const [reportNotes, setReportNotes] = useState('');

  // Permanent employment offer notification banner
  const [permanentOfferedBanner, setPermanentOfferedBanner] = useState(false);

  const handleRefresh = () => {
    setContracts(ContractService.getContracts());
    setAssignments(ContractService.getAssignments());
    setWorkHours(WorkHoursService.getHours());
  };

  const handleContractAccepted = () => {
    handleRefresh();
    setSelectedContractModal(null);
  };

  const handleSubmitHours = (e: React.FormEvent) => {
    e.preventDefault();
    if (reportModalAssignment) {
      // Calculate total hours
      const [sh, sm] = reportStart.split(':').map(Number);
      const [eh, em] = reportEnd.split(':').map(Number);
      const grossMinutes = (eh * 60 + em) - (sh * 60 + sm);
      const netHours = Number(Math.max(0, (grossMinutes - reportBreak) / 60).toFixed(2));

      WorkHoursService.submitHours({
        assignmentId: reportModalAssignment.id,
        workerId: reportModalAssignment.workerId,
        date: reportDate,
        startTime: reportStart,
        endTime: reportEnd,
        breakMinutes: Number(reportBreak),
        totalHours: netHours,
        workerNotes: reportNotes,
      });

      handleRefresh();
      setReportModalAssignment(null);
      setReportNotes('');
    }
  };

  const handleApproveHours = (hoursId: string) => {
    WorkHoursService.approveHours(hoursId);
    handleRefresh();
  };

  const handleOfferPermanent = (assignmentId: string) => {
    RatingService.offerPermanentEmployment(assignmentId);
    setPermanentOfferedBanner(true);
    handleRefresh();
    setTimeout(() => setPermanentOfferedBanner(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-2">
            <ShieldCheck size={14} className="text-blue-600" />
            <span>Digital Avtals- & Attesteringsmotor</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Digitala Arbetsavtal & Rapporterade Timmar
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Varje uppdrag kopplas till ett juridiskt avtal och en transparent beviskedja för arbetade timmar.
          </p>
        </div>
      </div>

      {/* Permanent Employment Offer Alert (Requirement 31) */}
      {permanentOfferedBanner && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-bold flex items-center justify-between shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2.5">
            <Award size={20} className="text-amber-300" />
            <span>Företaget är intresserat av att erbjuda dig en fast anställning! Registrerat i Arbetslyft Analytics.</span>
          </div>
        </div>
      )}

      {/* Contracts & Assignments List */}
      <div className="space-y-6">
        {assignments.map((assignment) => {
          const matchingContract = contracts.find(c => c.id === assignment.contractId);
          const assignmentHours = workHours.filter(h => h.assignmentId === assignment.id);
          const isContractSigned = matchingContract?.currentVersion.workerAcceptedAt;

          return (
            <div
              key={assignment.id}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-800">{assignment.companyName}</span>
                    <ShieldCheck size={14} className="text-blue-600" />
                    <span className="font-mono text-xs text-slate-400">ID: {assignment.id}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900">{assignment.jobTitle}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={13} />
                      {assignment.startDate} — {assignment.endDate}
                    </span>
                    <span>•</span>
                    <span className="text-emerald-700 font-bold">{assignment.hourlyRate} SEK/tim avtalat</span>
                  </div>
                </div>

                <div className="flex flex-col items-start sm:items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase ${
                    isContractSigned
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-amber-100 text-amber-900 border border-amber-300'
                  }`}>
                    {isContractSigned ? 'Avtal Signerat & Aktivt' : 'Avtal Väntar Signering'}
                  </span>

                  {matchingContract && (
                    <button
                      onClick={() => setSelectedContractModal(matchingContract)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 underline flex items-center gap-1"
                    >
                      <FileSignature size={14} />
                      <span>Granska Avtal #{matchingContract.contractNumber}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Requirement 27: Payment Protection / Transparency Evidence Chain */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  <span>Digital Beviskedja för Uppdraget</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <div className="text-[10px] text-slate-400 font-medium">1. Avtalsstatus</div>
                    <div className="font-bold text-slate-900 mt-0.5">{isContractSigned ? 'Signerat' : 'Väntar'}</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <div className="text-[10px] text-slate-400 font-medium">2. Avtalad Timlön</div>
                    <div className="font-bold text-emerald-700 mt-0.5">{assignment.hourlyRate} SEK/tim</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <div className="text-[10px] text-slate-400 font-medium">3. Rapporterade Timmar</div>
                    <div className="font-bold text-slate-900 mt-0.5">
                      {assignmentHours.reduce((acc, h) => acc + h.totalHours, 0)} h
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200">
                    <div className="text-[10px] text-slate-400 font-medium">4. Attesterat Belopp</div>
                    <div className="font-bold text-blue-700 mt-0.5">
                      {assignment.totalGrossAmount || 0} SEK
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-slate-200 col-span-2 sm:col-span-1">
                    <div className="text-[10px] text-slate-400 font-medium">5. Löneutbetalning</div>
                    <div className="font-bold text-amber-700 mt-0.5">Ej ansluten</div>
                  </div>
                </div>
              </div>

              {/* Reported Timesheets Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
                    Inrapporterade Arbetspass ({assignmentHours.length})
                  </h4>

                  {isContractSigned && (
                    <button
                      onClick={() => setReportModalAssignment(assignment)}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                    >
                      <Clock size={14} />
                      <span>Rapportera Nytt Arbetspass</span>
                    </button>
                  )}
                </div>

                <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden bg-white">
                  {assignmentHours.length === 0 ? (
                    <div className="p-4 text-center text-xs text-slate-400">
                      Inga timmar inrapporterade ännu för detta uppdrag.
                    </div>
                  ) : (
                    assignmentHours.map((h) => (
                      <div key={h.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div className="space-y-0.5">
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span>{h.date}</span>
                            <span className="text-slate-400">({h.startTime} — {h.endTime}, rast {h.breakMinutes}m)</span>
                          </div>
                          {h.workerNotes && (
                            <div className="text-slate-500 italic text-[11px]">"{h.workerNotes}"</div>
                          )}
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-extrabold text-slate-900 bg-slate-100 px-2.5 py-1 rounded-lg">
                            {h.totalHours} timmar
                          </span>

                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                            h.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-800' :
                            h.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {h.status === 'APPROVED' ? 'Attesterat' : h.status === 'REJECTED' ? 'Nekat' : 'Väntar Attest'}
                          </span>

                          {h.status === 'SUBMITTED' && (
                            <button
                              onClick={() => handleApproveHours(h.id)}
                              className="px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 transition"
                            >
                              Attestera
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Requirement 31: Permanent Employment Offer Button */}
              {isContractSigned && (
                <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-500">
                    Nöjd med arbetstagarens insats efter slutfört uppdrag?
                  </div>

                  <button
                    onClick={() => handleOfferPermanent(assignment.id)}
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md shadow-purple-500/20 transition flex items-center gap-1.5"
                  >
                    <Award size={15} />
                    <span>Erbjud Fast Anställning</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Contract View Modal */}
      {selectedContractModal && (
        <ContractViewModal
          contract={selectedContractModal}
          isOpen={Boolean(selectedContractModal)}
          onClose={() => setSelectedContractModal(null)}
          onAccepted={handleContractAccepted}
        />
      )}

      {/* Report Work Hours Modal */}
      {reportModalAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl bg-white shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-4">
            <button
              onClick={() => setReportModalAssignment(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-slate-900">Rapportera Arbetspass</h3>
            <p className="text-xs text-slate-500">
              Uppdrag: <strong className="text-slate-800">{reportModalAssignment.jobTitle}</strong>
            </p>

            <form onSubmit={handleSubmitHours} className="space-y-3.5 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Datum</label>
                <input
                  type="date"
                  required
                  value={reportDate}
                  onChange={(e) => setReportDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Starttid</label>
                  <input
                    type="time"
                    required
                    value={reportStart}
                    onChange={(e) => setReportStart(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Sluttid</label>
                  <input
                    type="time"
                    required
                    value={reportEnd}
                    onChange={(e) => setReportEnd(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Rast (minuter)</label>
                <input
                  type="number"
                  min="0"
                  max="180"
                  value={reportBreak}
                  onChange={(e) => setReportBreak(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Anteckningar / Arbetsmoment</label>
                <textarea
                  rows={2}
                  value={reportNotes}
                  onChange={(e) => setReportNotes(e.target.value)}
                  placeholder="Kort sammanfattning av utfört arbete..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setReportModalAssignment(null)}
                  className="px-4 py-2 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100"
                >
                  Avbryt
                </button>

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
                >
                  Skicka in för Attest
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
