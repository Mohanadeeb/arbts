import React, { useState } from 'react';
import { Contract, ContractVersion } from '../../types';
import { ContractService, ContractAuditEntry } from '../../services/contractService';
import { useTranslation } from '../../i18n/i18n';
import {
  X,
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
  Scale,
  Award
} from '../common/Icons';

interface ContractViewModalProps {
  contract: Contract;
  isOpen: boolean;
  onClose: () => void;
  onAccepted?: () => void;
  currentUserRole?: 'WORKER' | 'EMPLOYER' | 'ADMIN';
}

export const ContractViewModal: React.FC<ContractViewModalProps> = ({
  contract,
  isOpen,
  onClose,
  onAccepted,
  currentUserRole = 'WORKER',
}) => {
  const { t } = useTranslation();
  const [hasAgreedCheckbox, setHasAgreedCheckbox] = useState(false);
  const [audits, setAudits] = useState<ContractAuditEntry[]>(
    ContractService.getAudits(contract.contractNumber)
  );

  if (!isOpen) return null;

  const version: ContractVersion = contract.currentVersion;
  const isWorkerAccepted = Boolean(version.workerAcceptedAt);
  const isEmployerAccepted = Boolean(version.employerAcceptedAt);
  const isFullyAccepted = isWorkerAccepted && isEmployerAccepted;

  const handleAcceptContract = () => {
    ContractService.acceptWorkerContract(contract.id, version.workerName);
    setAudits(ContractService.getAudits(contract.contractNumber));
    if (onAccepted) onAccepted();
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] rounded-3xl bg-white shadow-2xl border border-slate-200 p-6 sm:p-10 overflow-y-auto space-y-6">
        
        {/* Close & Header Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <FileSignature size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-slate-900 text-lg">Digitalt Arbetsavtal</span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 font-mono text-xs font-bold">
                  {contract.contractNumber} (v{version.versionNumber.toFixed(1)})
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Genererat via Arbetslyft Avtalsmotor • Oföränderlig version
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrintPDF}
              className="p-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 transition flex items-center gap-1.5 text-xs font-bold"
              title="Exportera eller skriv ut avtals-PDF"
            >
              <Download size={16} />
              <span className="hidden sm:inline">Exportera PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Official Swedish Legal Version Banner (Requirement 7) */}
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
          <Scale size={18} className="text-blue-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-slate-900">Officiell Avtalsreferens:</span>
            <p className="mt-0.5 text-slate-600">
              {t('contract_official_notice')}
            </p>
          </div>
        </div>

        {/* Contract Parties */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5 rounded-2xl bg-slate-50/70 border border-slate-200">
          <div>
            <div className="text-[11px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
              <Building size={14} />
              <span>Arbetsgivare (Beställare)</span>
            </div>
            <div className="font-extrabold text-slate-900 text-sm mt-1">{version.companyName}</div>
            <div className="text-xs text-slate-600 font-mono">Org.nr: {version.orgNumber}</div>
            <div className="text-xs text-slate-500 mt-1">Plats: {version.workLocation}</div>
          </div>

          <div>
            <div className="text-[11px] uppercase font-bold text-slate-400 flex items-center gap-1.5">
              <UserCheck size={14} />
              <span>Arbetstagare (Uppdragstagare)</span>
            </div>
            <div className="font-extrabold text-slate-900 text-sm mt-1">{version.workerName}</div>
            <div className="text-xs text-slate-500 mt-1">Status: Registrerad & Verifierad profil</div>
          </div>
        </div>

        {/* Work Terms & Compensation Details */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-sm">Uppdragets Villkor & Ersättning</h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
              <div className="text-slate-400 font-medium">Period</div>
              <div className="font-bold text-slate-900 mt-0.5">{version.startDate} — {version.endDate}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white border border-slate-200">
              <div className="text-slate-400 font-medium">Arbetstider</div>
              <div className="font-bold text-slate-900 mt-0.5">{version.startTime} — {version.endTime}</div>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-extrabold">
              <div className="text-emerald-700 font-medium">Överenskommen Timlön</div>
              <div className="text-base mt-0.5">{version.hourlyRate} SEK/tim</div>
            </div>

            <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 font-extrabold">
              <div className="text-blue-700 font-medium">Beräknat Bruttobelopp</div>
              <div className="text-base mt-0.5">{version.expectedGrossAmount} SEK</div>
            </div>
          </div>

          {/* Description */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <span className="font-bold text-slate-900">Arbetsuppgifter:</span>
            <p className="leading-relaxed">{version.jobDescription}</p>
          </div>

          {/* Cancellation and Working terms */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div>
              <span className="font-bold text-slate-900">Avbokningsregler:</span>
              <p className="mt-0.5 leading-relaxed">{version.cancellationTerms}</p>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <span className="font-bold text-slate-900">Allmänna Arbetsvillkor:</span>
              <p className="mt-0.5 leading-relaxed">{version.workTerms}</p>
            </div>
          </div>
        </div>

        {/* Audit Trail Timeline */}
        <div className="space-y-3 pt-2">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-slate-500">
            Avtalshistorik & Revisionslogg
          </h4>

          <div className="space-y-2 text-xs">
            {audits.map((a) => (
              <div key={a.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <ShieldCheck size={14} className="text-emerald-600" />
                    <span>{a.action} ({a.actor})</span>
                  </div>
                  <div className="text-slate-500 text-[11px]">{a.details}</div>
                </div>
                <span className="text-[11px] font-mono text-slate-400 shrink-0">{a.timestamp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Acceptance Section (Requirement 21) */}
        {!isWorkerAccepted && (
          <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 space-y-4">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="contractAgreeCheck"
                checked={hasAgreedCheckbox}
                onChange={(e) => setHasAgreedCheckbox(e.target.checked)}
                className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-slate-300 mt-0.5 cursor-pointer"
              />
              <label htmlFor="contractAgreeCheck" className="text-xs font-bold text-slate-900 cursor-pointer leading-snug">
                Jag har läst och accepterar avtalet samt bekräftar att jag åtar mig att genomföra uppdraget enligt de angivna villkoren.
              </label>
            </div>

            <button
              type="button"
              disabled={!hasAgreedCheckbox}
              onClick={handleAcceptContract}
              className={`w-full py-3.5 rounded-xl font-extrabold text-sm transition flex items-center justify-center gap-2 shadow-lg ${
                hasAgreedCheckbox
                  ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/25 cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
              }`}
            >
              <CheckCircle2 size={18} />
              <span>Acceptera avtal och arbete</span>
            </button>
          </div>
        )}

        {isWorkerAccepted && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between font-bold">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={18} className="text-emerald-600" />
              <span>Avtalet är godkänt och aktivt. Redo att starta!</span>
            </div>
            <span className="font-mono text-[11px] text-emerald-700">
              Signerat: {version.workerAcceptedAt?.substring(0, 16).replace('T', ' ')}
            </span>
          </div>
        )}

      </div>
    </div>
  );
};
