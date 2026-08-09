import { Review, Assignment } from '../types';
import { ContractService } from './contractService';

const REVIEWS_STORAGE_KEY = 'arbetslyft_reviews';

export const INITIAL_SAMPLE_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    assignmentId: 'ass-101',
    fromName: 'Svensk Logistik Solutions AB',
    toName: 'Astrid Lindgren',
    rating: 5,
    comment: 'Otroligt punktlig, noggrann och snabb i lagret. Skulle gärna anställa igen!',
    createdAt: '2026-08-09T18:00:00Z',
  }
];

export class RatingService {
  static getReviews(): Review[] {
    const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SAMPLE_REVIEWS;
      }
    }
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_REVIEWS));
    return INITIAL_SAMPLE_REVIEWS;
  }

  static addReview(review: Omit<Review, 'id' | 'createdAt'>): Review {
    const reviews = this.getReviews();
    const newRev: Review = {
      ...review,
      id: `rev-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    reviews.unshift(newRev);
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
    return newRev;
  }

  static offerPermanentEmployment(assignmentId: string): void {
    const assignments = ContractService.getAssignments();
    const assignment = assignments.find(a => a.id === assignmentId);
    if (assignment) {
      assignment.permanentEmploymentOffered = true;
      localStorage.setItem('arbetslyft_assignments', JSON.stringify(assignments));
    }
  }
}
