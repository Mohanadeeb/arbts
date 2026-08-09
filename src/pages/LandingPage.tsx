import React from 'react';
import { useTranslation } from '../i18n/i18n';
import {
  Briefcase,
  Bot,
  FileCheck2,
  Award,
  Clock,
  Coins,
  TrendingUp,
  ShieldCheck,
  Building,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Users,
  AlertCircle,
  FileSignature
} from '../components/common/Icons';

interface LandingPageProps {
  onOpenAuth: (role: 'WORKER' | 'EMPLOYER') => void;
  onNavigateTab: (tab: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth, onNavigateTab }) => {
  const { t } = useTranslation();

  const journeySteps = [
    { num: '1', title: t('journey_step_1'), desc: 'Jobb skapas' },
    { num: '2', title: t('journey_step_2'), desc: 'Poäng 0–100%' },
    { num: '3', title: t('journey_step_3'), desc: 'Erbjudande skickas' },
    { num: '4', title: t('journey_step_4'), desc: 'Avtalsmall genereras' },
    { num: '5', title: t('journey_step_5'), desc: 'Båda parter godkänner' },
    { num: '6', title: t('journey_step_6'), desc: 'Redo att starta' },
    { num: '7', title: t('journey_step_7'), desc: 'Rapporterade timmar' },
    { num: '8', title: t('journey_step_8'), desc: 'Arbetsgivare attesterar' },
    { num: '9', title: t('journey_step_9'), desc: 'Transparent utbetalning' },
    { num: '10', title: t('journey_step_10'), desc: 'Ömsesidigt betyg 1–5' },
    { num: '11', title: t('journey_step_11'), desc: 'Bygger verifierat CV' },
    { num: '12', title: t('journey_step_12'), desc: 'Möjlighet till tillsvidare' },
  ];

  return (
    <div className="space-y-24 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 overflow-hidden">
        {/* Background Glowing Gradient Orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-100/60 via-emerald-50/40 to-transparent blur-3xl -z-10 pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-bold mb-6 shadow-sm animate-pulse">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>{t('secondary_slogan')}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            {t('hero_title')}
          </h1>

          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            {t('hero_subtitle')}
          </p>

          {/* Hero Action Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onOpenAuth('WORKER')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-base shadow-xl shadow-blue-500/25 hover:shadow-blue-500/35 transition flex items-center justify-center gap-3 hover-lift"
            >
              <Briefcase className="w-5 h-5" />
              <span>{t('hero_cta_worker')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => onOpenAuth('EMPLOYER')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-base shadow-xl shadow-slate-900/20 hover:shadow-slate-900/30 transition flex items-center justify-center gap-3 hover-lift"
            >
              <Building className="w-5 h-5" />
              <span>{t('hero_cta_employer')}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl glass-panel border border-slate-200/80 shadow-card">
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">100%</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Digitala Avtal</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-600">0–100</div>
              <div className="text-xs text-slate-500 font-medium mt-1">AI Matchning</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">9 Språk</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Svenska, Arabiska, Engelska...</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">Work Passport</div>
              <div className="text-xs text-slate-500 font-medium mt-1">Verifierad Erfarenhet</div>
            </div>
          </div>

        </div>
      </section>


      {/* 2. THE CORE JOURNEY TIMELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">{t('feature_how_it_works')}</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2">{t('journey_title')}</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mt-2 text-sm">
            Arbetslyft är inte bara en anslagstavla. Det är en komplett digital resa från tillfälliga timmar till tillsvidareanställning.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {journeySteps.map((step) => (
            <div key={step.num} className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-sm hover:border-blue-300 transition hover-lift">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center mb-2">
                {step.num}
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
              <p className="text-[11px] text-slate-500 mt-1">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* 3. FEATURE HIGHLIGHTS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: AI Matchning */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-card-hover transition hover-lift">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t('feature_ai_matching')}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Opartisk matchningsmotor som beräknar kompetens, tillgänglighet, avstånd, licenser och språk för att ge en 0–100% matchningspoäng.
            </p>
            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 text-xs text-blue-800 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Assisterande beslut utan diskriminerande parametrar</span>
            </div>
          </div>

          {/* Card 2: Digitala Arbetsavtal */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-card-hover transition hover-lift">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <FileSignature className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t('feature_contracts')}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Varje accepterat uppdrag genererar ett digitalt avtal med versionshistorik, avtalsnummer och PDF-export innan arbetet påbörjas.
            </p>
            <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 text-xs text-emerald-800 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Svensk officiell avtalsversion med kryptering</span>
            </div>
          </div>

          {/* Card 3: Work Passport */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-card-hover transition hover-lift">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">{t('feature_work_passport')}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Bygg verifierad arbetserfarenhet timme för timme. Visa upp godkända timmar, betyg och omdömen för framtida arbetsgivare.
            </p>
            <div className="p-3 rounded-xl bg-purple-50/60 border border-purple-100 text-xs text-purple-800 font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
              <span>Ökar chansen till permanent anställning</span>
            </div>
          </div>

        </div>
      </section>


      {/* 4. WORKERS & EMPLOYERS DUAL PERSPECTIVES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* For Workers */}
          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-bold mb-4">
                <Users className="w-4 h-4" />
                <span>{t('feature_for_workers')}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">Hitta arbete snabbare och öka din inkomst</h3>
              <ul className="space-y-3 text-sm text-blue-100 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span>Korta uppdrag, timarbete, extrajobb och tillsvidare</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span>Transparent timersättning och tydliga avtalsvillkor</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
                  <span>Digitalt Work Passport med verifierade betyg och timmar</span>
                </li>
              </ul>
              <button
                onClick={() => onOpenAuth('WORKER')}
                className="px-6 py-3 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-md hover:bg-blue-50 transition"
              >
                Skapa Arbetsprofil Gratis
              </button>
            </div>
          </div>

          {/* For Employers */}
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-xs font-bold mb-4 text-emerald-400">
                <Building className="w-4 h-4" />
                <span>{t('feature_for_employers')}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-4">Skräddarsydd personal för en dag eller permanent</h3>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Boka personal för 1 dag, 1 vecka, 1 månad eller tillsvidare</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Direkt tillgång till verifierade kandidater med AI Matchning</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Digital avtalsgenerering och timattestering i plattformen</span>
                </li>
              </ul>
              <button
                onClick={() => onOpenAuth('EMPLOYER')}
                className="px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm shadow-md hover:bg-emerald-400 transition"
              >
                Publicera Första Jobbet
              </button>
            </div>
          </div>

        </div>
      </section>


      {/* 5. FUTURE INTEGRATIONS & PUBLIC SECTOR READINESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-amber-500" />
                <span>{t('feature_public_sector')}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">{t('af_status_not_connected')}</h3>
              <p className="text-sm text-slate-600 max-w-2xl">
                Arbetslyfts arkitektur är förberedd för framtida integrationer mot Arbetsförmedlingen, myndighetsrapportering och etableringsprogram via en dedikerad GovernmentIntegrationService.
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-semibold shrink-0">
              Officiell API-åtkomst kräver partnerskap
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
