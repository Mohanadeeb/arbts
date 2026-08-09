import { User, UserRole, WorkerProfile, EmployerProfile } from '../types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const DEMO_USER_KEY = 'arbetslyft_demo_user';

export const DEMO_WORKER_PROFILE: WorkerProfile = {
  id: 'w-1',
  userId: 'u-worker-1',
  fullName: 'Astrid Lindgren',
  profilePhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  phone: '070-123 45 67',
  location: 'Stockholm, Sverige',
  biography: 'Erfaren lagerarbetare och eventvärd med truckkort A1-A4. Noggrann, punktlig och flitig.',
  skills: ['Lagerarbete', 'Truckkort A1-A4', 'Kundtjänst', 'Event & Mässa', 'Kassa/Butik', 'Paketering'],
  education: 'Gymnasieexamen — Handel & Logistik',
  languages: ['Svenska (Modersmål)', 'Engelska (Flytande)', 'Spanska (Grundläggande)'],
  certificates: ['Truckkort A1-A4', 'Första Hjälpen (CPR)', 'Hygienpass'],
  drivingLicenses: ['B-Körkort'],
  preferredJobCategories: ['Lager & Logistik', 'Butik & Handel', 'Event & Resturang'],
  preferredDistanceKm: 20,
  desiredHourlyRate: 165,
  rating: 4.9,
  completedAssignments: 14,
  totalHours: 216,
  bankidVerified: false,
  workHistory: [
    {
      id: 'wh-1',
      companyName: 'Nordic Logistics AB',
      jobTitle: 'Lagerarbetare',
      startDate: '2026-05-10',
      endDate: '2026-05-24',
      hoursWorked: 80,
      rating: 5.0,
      feedback: 'Enastående arbetsinsats och perfekt punktlighet!',
    },
    {
      id: 'wh-2',
      companyName: 'Stockholm Event Partners',
      jobTitle: 'Eventassistent',
      startDate: '2026-06-01',
      endDate: '2026-06-03',
      hoursWorked: 24,
      rating: 4.8,
      feedback: 'Trevlig, professionell och flexibel.',
    }
  ]
};

export const DEMO_EMPLOYER_PROFILE: EmployerProfile = {
  id: 'e-1',
  userId: 'u-employer-1',
  fullName: 'Erik Johansson',
  position: 'Rekryteringsansvarig',
  phone: '08-999 88 77',
  company: {
    id: 'c-1',
    companyName: 'Svensk Logistik Solutions AB',
    orgNumber: '556123-4567',
    logoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80',
    industry: 'Lager, Transport & Logistik',
    description: 'Ledande svenska leverantör inom lagerhantering, paketering och expresstransporter i Mälardalen.',
    location: 'Stockholm / Katrineholm',
    contactEmail: 'kontakt@svensklogistik.se',
    contactPhone: '08-999 88 77',
    verificationStatus: 'VERIFIED',
  }
};

export class AuthService {
  static getCurrentUser(): User | null {
    const saved = localStorage.getItem(DEMO_USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  }

  static loginDemoUser(role: UserRole): User {
    const demoUser: User = {
      id: role === 'WORKER' ? 'u-worker-1' : role === 'EMPLOYER' ? 'u-employer-1' : 'u-admin-1',
      email: role === 'WORKER' ? 'astrid@example.se' : role === 'EMPLOYER' ? 'erik@svensklogistik.se' : 'admin@arbetslyft.se',
      role,
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(DEMO_USER_KEY, JSON.stringify(demoUser));
    return demoUser;
  }

  static async login(email: string, role: UserRole): Promise<User> {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: 'password123',
      });
      if (error) {
        console.warn('Supabase auth fallback:', error.message);
      }
    }
    return this.loginDemoUser(role);
  }

  static logout(): void {
    localStorage.removeItem(DEMO_USER_KEY);
    if (isSupabaseConfigured) {
      supabase.auth.signOut();
    }
  }
}
