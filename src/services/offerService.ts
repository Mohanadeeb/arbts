import { JobOffer, NotificationItem, Assignment } from '../types';

const OFFERS_STORAGE_KEY = 'arbetslyft_job_offers';
const NOTIFICATIONS_STORAGE_KEY = 'arbetslyft_notifications';

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'u-worker-1',
    title: 'Nytt Jobberbjudande!',
    message: 'Svensk Logistik Solutions AB har skickat dig ett erbjudande för "Lagerarbetare — 5 dagar".',
    type: 'OFFER',
    link: 'offers',
    isRead: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'notif-2',
    userId: 'u-worker-1',
    title: '96% AI-Matchat Uppdrag',
    message: 'Ett nytt uppdrag som matchar ditt Truckkort A1-A4 har publicerats.',
    type: 'SYSTEM',
    link: 'jobs',
    isRead: true,
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  }
];

export const INITIAL_OFFERS: (JobOffer & { jobTitle: string; companyName: string; dates: string })[] = [
  {
    id: 'offer-1',
    jobId: 'job-1',
    companyId: 'c-1',
    workerId: 'w-1',
    hourlyRate: 165,
    status: 'OFFERED',
    jobTitle: 'Lagerarbetare — 5 dagar (Högsäsong)',
    companyName: 'Svensk Logistik Solutions AB',
    dates: '2026-08-15 — 2026-08-20',
    createdAt: new Date().toISOString(),
  }
];

export class OfferService {
  static getOffers(): (JobOffer & { jobTitle: string; companyName: string; dates: string })[] {
    const saved = localStorage.getItem(OFFERS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_OFFERS;
      }
    }
    localStorage.setItem(OFFERS_STORAGE_KEY, JSON.stringify(INITIAL_OFFERS));
    return INITIAL_OFFERS;
  }

  static sendOffer(
    jobId: string,
    companyId: string,
    workerId: string,
    hourlyRate: number,
    jobTitle: string,
    companyName: string,
    dates: string
  ): JobOffer {
    const offers = this.getOffers();
    const newOffer = {
      id: `offer-${Date.now()}`,
      jobId,
      companyId,
      workerId,
      hourlyRate,
      status: 'OFFERED' as const,
      jobTitle,
      companyName,
      dates,
      createdAt: new Date().toISOString(),
    };
    offers.unshift(newOffer);
    localStorage.setItem(OFFERS_STORAGE_KEY, JSON.stringify(offers));

    // Send notification to worker
    this.addNotification({
      userId: 'u-worker-1',
      title: 'Nytt Jobberbjudande!',
      message: `${companyName} har erbjudit dig uppdraget "${jobTitle}" för ${hourlyRate} SEK/tim.`,
      type: 'OFFER',
      link: 'offers',
    });

    return newOffer;
  }

  static respondToOffer(offerId: string, status: 'ACCEPTED' | 'REJECTED'): void {
    const offers = this.getOffers();
    const offer = offers.find(o => o.id === offerId);
    if (offer) {
      offer.status = status;
      localStorage.setItem(OFFERS_STORAGE_KEY, JSON.stringify(offers));

      if (status === 'ACCEPTED') {
        this.addNotification({
          userId: 'u-employer-1',
          title: 'Kandidat Accepterade Erbjudande!',
          message: `Arbetstagaren har accepterat erbjudandet för "${offer.jobTitle}". Digitalt avtal genereras nu för granskning.`,
          type: 'CONTRACT',
          link: 'contracts',
        });
      }
    }
  }

  static getNotifications(userId?: string): NotificationItem[] {
    const saved = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_NOTIFICATIONS;
      }
    }
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS));
    return INITIAL_NOTIFICATIONS;
  }

  static addNotification(item: Omit<NotificationItem, 'id' | 'createdAt' | 'isRead'>): NotificationItem {
    const notifs = this.getNotifications();
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    notifs.unshift(newNotif);
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifs));
    return newNotif;
  }

  static markAllAsRead(): void {
    const notifs = this.getNotifications();
    notifs.forEach(n => n.isRead = true);
    localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifs));
  }
}
