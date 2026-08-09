import React, { useState } from 'react';
import { PaymentRecord } from '../../types';
import { PaymentService, PlatformPricingConfig } from '../../services/paymentService';
import { useTranslation } from '../../i18n/i18n';
import {
  Coins,
  ShieldCheck,
  AlertCircle,
  Building,
  CheckCircle2,
  Download,
  CreditCard,
  Layers,
  ArrowRight
} from '../common/Icons';

export const PaymentPayrollHub: React.FC = () => {
  const { t } = useTranslation();
  const [payments, setPayments] = useState<PaymentRecord[]>(PaymentService.getPayments());
  const [pricingConfig, setPricingConfig] = useState<PlatformPricingConfig>(PaymentService.getPricingConfig());
  const providerStatus = PaymentService.getPaymentProviderStatus();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2">
            <Coins size={14} className="text-emerald-600" />
            <span>Ekonomi, Löneunderlag & Betalningsarkitektur</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Betalningsöversikt & Prismodell
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Transparent beviskedja för intjänad lön, attesterade timmar och plattformsavgifter.
          </p>
        </div>

        {/* Live Provider Connection Status Notice (Requirement 28) */}
        <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2.5">
          <AlertCircle size={18} className="text-amber-600 shrink-0" />
          <div>
            <div className="font-bold">Betalningsleverantör — Ej ansluten</div>
            <div className="text-[11px] text-amber-700">Förberedd integration för svensk bank- och lönehantering</div>
          </div>
        </div>
      </div>

      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-card">
          <div className="text-xs text-slate-500 font-medium">Totalt Bruttofakturerat</div>
          <div className="text-3xl font-extrabold text-slate-900 mt-1.5">9 500 SEK</div>
          <div className="text-[11px] text-slate-400 mt-0.5 font-semibold">Baserat på 57.5 attesterade timmar</div>
        </div>

        <div className="p-5 rounded-3xl bg-emerald-50/60 border border-emerald-100 shadow-card">
          <div className="text-xs text-emerald-700 font-medium">Utbetalt till Arbetstagare</div>
          <div className="text-3xl font-extrabold text-emerald-800 mt-1.5">8 550 SEK</div>
          <div className="text-[11px] text-emerald-600 mt-0.5 font-semibold">Nettoersättning via plattformen</div>
        </div>

        <div className="p-5 rounded-3xl bg-blue-50/60 border border-blue-100 shadow-card">
          <div className="text-xs text-blue-700 font-medium">Plattformsavgift ({pricingConfig.employerFeePercent}%)</div>
          <div className="text-3xl font-extrabold text-blue-800 mt-1.5">950 SEK</div>
          <div className="text-[11px] text-blue-600 mt-0.5 font-semibold">Matchning & digital avtalshantering</div>
        </div>

        <div className="p-5 rounded-3xl bg-slate-900 text-white shadow-card">
          <div className="text-xs text-slate-300 font-medium">Skatte- & Arbetsgivaravgifter</div>
          <div className="text-xl font-bold text-white mt-2">Hanteras av Partner</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Svenska skatteregler för lön</div>
        </div>
      </div>

      {/* Pricing / Monetization Model Tiers (Requirement 42) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Arbetslyft Företagsabonnemang</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Flexibla nivåer för enstaka timuppdrag eller återkommande personalbehov.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingConfig.subscriptionPlans.map((plan, idx) => (
            <div
              key={plan.name}
              className={`p-6 rounded-3xl border transition space-y-5 flex flex-col justify-between ${
                idx === 1
                  ? 'bg-blue-50/40 border-blue-300 shadow-card relative ring-2 ring-blue-500'
                  : 'bg-white border-slate-200 shadow-card'
              }`}
            >
              {idx === 1 && (
                <span className="absolute -top-3 right-6 px-3 py-1 rounded-full bg-blue-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
                  Mest Populär
                </span>
              )}

              <div className="space-y-3">
                <h3 className="font-extrabold text-slate-900 text-lg">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900">{plan.priceSekMonthly}</span>
                  <span className="text-xs text-slate-500 font-semibold">SEK / månad</span>
                </div>

                <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                className={`w-full py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 ${
                  idx === 1
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                }`}
              >
                <span>Välj {plan.name}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
