import React, { useState } from 'react';
import { OfferService } from '../../services/offerService';
import { useTranslation } from '../../i18n/i18n';
import {
  Briefcase,
  Building,
  Calendar,
  Coins,
  CheckCircle2,
  X,
  FileSignature,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  MessageSquare
} from '../common/Icons';

interface OffersManagementViewProps {
  onNavigateTab: (tab: string) => void;
}

export const OffersManagementView: React.FC<OffersManagementViewProps> = ({ onNavigateTab }) => {
  const { t } = useTranslation();
  const [offers, setOffers] = useState(OfferService.getOffers());
  const [questionModal, setQuestionModal] = useState<string | null>(null);
  const [questionText, setQuestionText] = useState('');
  const [sentQuestion, setSentQuestion] = useState(false);

  const handleAccept = (offerId: string) => {
    OfferService.respondToOffer(offerId, 'ACCEPTED');
    setOffers([...OfferService.getOffers()]);
    // Smooth transition directly to Digital Contract acceptance
    setTimeout(() => {
      onNavigateTab('contracts');
    }, 600);
  };

  const handleReject = (offerId: string) => {
    OfferService.respondToOffer(offerId, 'REJECTED');
    setOffers([...OfferService.getOffers()]);
  };

  const handleSendQuestion = () => {
    if (questionText.trim()) {
      setSentQuestion(true);
      setTimeout(() => {
        setSentQuestion(false);
        setQuestionModal(null);
        setQuestionText('');
      }, 1500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
            <Sparkles size={14} className="text-emerald-600" />
            <span>Mottagna Uppdragserbjudanden</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Mina Jobberbjudanden
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Granska erbjudanden från arbetsgivare, acceptera uppdrag och gå vidare till digitalt avtal.
          </p>
        </div>
      </div>

      {/* Offers List */}
      <div className="space-y-4">
        {offers.length === 0 ? (
          <div className="p-12 text-center rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <Briefcase size={32} className="text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-900 text-base">Inga aktiva erbjudanden just nu</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Håll din tillgänglighetskalender uppdaterad så att arbetsgivare kan skicka direkta förfrågningar.
            </p>
          </div>
        ) : (
          offers.map((offer) => {
            const isPending = offer.status === 'OFFERED';
            const isAccepted = offer.status === 'ACCEPTED';
            const isRejected = offer.status === 'REJECTED';

            return (
              <div
                key={offer.id}
                className={`p-6 rounded-3xl border transition-all space-y-5 shadow-card ${
                  isAccepted
                    ? 'bg-emerald-50/40 border-emerald-300'
                    : isRejected
                    ? 'bg-slate-50 border-slate-200 opacity-60'
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-800">{offer.companyName}</span>
                      <ShieldCheck size={14} className="text-blue-600" />
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                        isAccepted ? 'bg-emerald-100 text-emerald-800' :
                        isRejected ? 'bg-slate-200 text-slate-700' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {isAccepted ? 'Accepterat — Avtal Skapas' : isRejected ? 'Nekat' : 'Väntar på ditt svar'}
                      </span>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900">{offer.jobTitle}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-2">
                      <Calendar size={13} />
                      <span>{offer.dates}</span>
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200/80 text-emerald-900 font-extrabold text-lg text-right shrink-0">
                    <div className="text-[10px] uppercase font-bold text-emerald-600">Överenskommen lön</div>
                    <div>{offer.hourlyRate} SEK/tim</div>
                  </div>
                </div>

                {/* Offer Action Buttons */}
                {isPending && (
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => setQuestionModal(offer.id)}
                      className="px-4 py-2 rounded-xl text-slate-600 bg-slate-100 hover:bg-slate-200 text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <MessageSquare size={14} />
                      <span>Ställ Fråga till Arbetsgivare</span>
                    </button>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleReject(offer.id)}
                        className="px-4 py-2.5 rounded-xl text-slate-600 hover:text-red-600 text-xs font-bold hover:bg-red-50 transition"
                      >
                        Neka Erbjudande
                      </button>

                      <button
                        onClick={() => handleAccept(offer.id)}
                        className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition flex items-center gap-2"
                      >
                        <CheckCircle2 size={16} />
                        <span>Acceptera & Skapa Avtal</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {isAccepted && (
                  <div className="pt-3 border-t border-emerald-200/80 flex items-center justify-between text-xs text-emerald-900">
                    <span className="font-semibold">Uppdraget är accepterat. Gå till digitala avtal för att signera.</span>
                    <button
                      onClick={() => onNavigateTab('contracts')}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition flex items-center gap-1.5"
                    >
                      <FileSignature size={14} />
                      <span>Öppna Digitalt Avtal</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Question Modal */}
      {questionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-3xl bg-white shadow-2xl border border-slate-100 p-6 sm:p-8 space-y-4">
            <button
              onClick={() => setQuestionModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>

            <h3 className="text-lg font-bold text-slate-900">Ställ en fråga om uppdraget</h3>
            <p className="text-xs text-slate-500">
              Ditt meddelande skickas krypterat till arbetsgivaren utan att exponera ditt privata telefonnummer.
            </p>

            <textarea
              rows={4}
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              placeholder="Skriv din fråga här (t.ex. om arbetstider, klädsel eller utrustning)..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setQuestionModal(null)}
                className="px-4 py-2 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100"
              >
                Avbryt
              </button>

              <button
                onClick={handleSendQuestion}
                className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition flex items-center gap-1.5"
              >
                <CheckCircle2 size={15} />
                <span>{sentQuestion ? 'Skickat!' : 'Skicka Fråga'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
