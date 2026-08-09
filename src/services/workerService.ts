import { WorkerProfile, WorkHistoryItem } from '../types';
import { SAMPLE_WORKERS_DATABASE } from './sampleDataService';
import { DEMO_WORKER_PROFILE } from './authService';

const WORKER_STORAGE_KEY = 'arbetslyft_worker_profile';
const AVAILABILITY_STORAGE_KEY = 'arbetslyft_worker_availability';

export class WorkerService {
  static getProfile(): WorkerProfile {
    const saved = localStorage.getItem(WORKER_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return SAMPLE_WORKERS_DATABASE[0] || DEMO_WORKER_PROFILE;
      }
    }
    return SAMPLE_WORKERS_DATABASE[0] || DEMO_WORKER_PROFILE;
  }

  static saveProfile(profile: WorkerProfile): WorkerProfile {
    localStorage.setItem(WORKER_STORAGE_KEY, JSON.stringify(profile));
    return profile;
  }

  static getAvailability(): Record<string, boolean> {
    const saved = localStorage.getItem(AVAILABILITY_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    // Default next 14 days available
    const defaults: Record<string, boolean> = {};
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const key = d.toISOString().split('T')[0];
      defaults[key] = i % 7 !== 0; // Available except Sundays
    }
    localStorage.setItem(AVAILABILITY_STORAGE_KEY, JSON.stringify(defaults));
    return defaults;
  }

  static toggleAvailabilityDate(dateStr: string): Record<string, boolean> {
    const current = this.getAvailability();
    current[dateStr] = !current[dateStr];
    localStorage.setItem(AVAILABILITY_STORAGE_KEY, JSON.stringify(current));
    return current;
  }

  static addSkill(skill: string): WorkerProfile {
    const profile = this.getProfile();
    if (!profile.skills.includes(skill)) {
      profile.skills.push(skill);
      this.saveProfile(profile);
    }
    return profile;
  }

  static removeSkill(skill: string): WorkerProfile {
    const profile = this.getProfile();
    profile.skills = profile.skills.filter(s => s !== skill);
    this.saveProfile(profile);
    return profile;
  }

  static addCertificate(cert: string): WorkerProfile {
    const profile = this.getProfile();
    if (!profile.certificates.includes(cert)) {
      profile.certificates.push(cert);
      this.saveProfile(profile);
    }
    return profile;
  }

  static removeCertificate(cert: string): WorkerProfile {
    const profile = this.getProfile();
    profile.certificates = profile.certificates.filter(c => c !== cert);
    this.saveProfile(profile);
    return profile;
  }
}
