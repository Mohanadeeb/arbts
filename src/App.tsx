import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { LandingPage } from './pages/LandingPage';
import { AuthModal } from './components/auth/AuthModal';
import { WorkerDashboard } from './components/worker/WorkerDashboard';
import { WorkPassportView } from './components/worker/WorkPassportView';
import { JobMarketplace } from './components/jobs/JobMarketplace';
import { EmployerDashboard } from './components/employer/EmployerDashboard';
import { OffersManagementView } from './components/matching/OffersManagementView';
import { ContractsManagementView } from './components/contracts/ContractsManagementView';
import { ChatView } from './components/messaging/ChatView';
import { PaymentPayrollHub } from './components/payments/PaymentPayrollHub';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { WorkerService } from './services/workerService';
import { AuthService } from './services/authService';
import { User, UserRole, WorkerProfile } from './types';
import { useTranslation } from './i18n/i18n';
import { Briefcase, Award, FileSignature, Shield } from './components/common/Icons';

export function App() {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<UserRole>('WORKER');
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [workerProfile, setWorkerProfile] = useState<WorkerProfile>(WorkerService.getProfile());

  useEffect(() => {
    const existing = AuthService.getCurrentUser();
    if (existing) {
      setUser(existing);
    }
  }, []);

  const handleOpenAuth = (role: UserRole = 'WORKER') => {
    setAuthModalRole(role);
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    AuthService.logout();
    setUser(null);
    setActiveTab('landing');
  };

  const handleAuthSuccess = (loggedUser: User) => {
    setUser(loggedUser);
    if (loggedUser.role === 'WORKER') {
      setActiveTab('worker-dashboard');
    } else if (loggedUser.role === 'EMPLOYER') {
      setActiveTab('employer-dashboard');
    } else {
      setActiveTab('admin-dashboard');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-blue-500 selection:text-white">
      {/* Top Header Navbar */}
      <Navbar
        user={user}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Content Router View */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onOpenAuth={handleOpenAuth}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* JOB MARKETPLACE (Phase 3) */}
        {activeTab === 'jobs' && (
          <JobMarketplace
            onOpenAuth={handleOpenAuth}
            onSelectJob={(job) => {
              if (!user) {
                handleOpenAuth('WORKER');
              }
            }}
          />
        )}

        {/* WORKER DASHBOARD (Phase 2) */}
        {activeTab === 'worker-dashboard' && (
          <WorkerDashboard
            user={user || AuthService.loginDemoUser('WORKER')}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* EMPLOYER DASHBOARD (Phase 3) */}
        {activeTab === 'employer-dashboard' && (
          <EmployerDashboard
            user={user || AuthService.loginDemoUser('EMPLOYER')}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* OFFERS VIEW (Phase 4) */}
        {activeTab === 'offers' && (
          <OffersManagementView onNavigateTab={setActiveTab} />
        )}

        {/* WORK PASSPORT VIEW DIRECT ACCESS */}
        {activeTab === 'passport' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                  Officiellt Work Passport
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Verifierade arbetstimmar, referenser och kompetenser.
                </p>
              </div>
            </div>
            <WorkPassportView profile={workerProfile} />
          </div>
        )}

        {/* CONTRACTS VIEW (Phase 5) */}
        {activeTab === 'contracts' && (
          <ContractsManagementView onNavigateTab={setActiveTab} />
        )}

        {/* CHAT / MESSAGING (Phase 6) */}
        {activeTab === 'messages' && (
          <ChatView
            currentUser={user || AuthService.loginDemoUser('WORKER')}
          />
        )}

        {/* PAYMENTS / PAYROLL (Phase 7) */}
        {activeTab === 'payments' && (
          <PaymentPayrollHub />
        )}

        {/* ADMIN DASHBOARD (Phase 8, 9, 10) */}
        {activeTab === 'admin-dashboard' && (
          <AdminDashboard
            currentUser={user || AuthService.loginDemoUser('ADMIN')}
            onNavigateTab={setActiveTab}
          />
        )}

        {/* Fallback View */}
        {activeTab !== 'landing' && activeTab !== 'jobs' && activeTab !== 'worker-dashboard' && activeTab !== 'employer-dashboard' && activeTab !== 'passport' && activeTab !== 'offers' && activeTab !== 'contracts' && activeTab !== 'messages' && activeTab !== 'payments' && activeTab !== 'admin-dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200 shadow-card text-center max-w-3xl mx-auto space-y-6">
              
              {activeTab === 'contracts' && (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                    <FileSignature size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">Digitala Arbetsavtal</h2>
                  <p className="text-slate-600 text-sm">
                    Fas 3 (Arbetsgivare & Marknadsplats) är aktiv. Digitala avtal och oföränderlig versionshantering aktiveras i Fas 5.
                  </p>
                </>
              )}

              {(activeTab.includes('admin-dashboard')) && (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center mx-auto">
                    <Shield size={32} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Administratörspanel
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Fullständig administrationsöversikt och tvistmodereringsverktyg aktiveras i Fas 8.
                  </p>
                </>
              )}

              <button
                onClick={() => setActiveTab('landing')}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
              >
                Tillbaka till Startsidan
              </button>

            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialRole={authModalRole}
      />
    </div>
  );
}
