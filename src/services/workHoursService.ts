import { WorkHoursSubmission, Assignment } from '../types';
import { ContractService } from './contractService';

const HOURS_STORAGE_KEY = 'arbetslyft_work_hours';

export const INITIAL_SAMPLE_WORK_HOURS: WorkHoursSubmission[] = [
  {
    id: 'wh-101',
    assignmentId: 'ass-101',
    workerId: 'w-1',
    date: '2026-08-15',
    startTime: '07:00',
    endTime: '16:00',
    breakMinutes: 45,
    totalHours: 8.25,
    workerNotes: 'Genomfört orderplock och trucklossning på sektion B enligt plan.',
    status: 'APPROVED',
    approvedAt: '2026-08-15T17:30:00Z',
    submittedAt: '2026-08-15T16:15:00Z',
  },
  {
    id: 'wh-102',
    assignmentId: 'ass-101',
    workerId: 'w-1',
    date: '2026-08-16',
    startTime: '07:00',
    endTime: '16:00',
    breakMinutes: 45,
    totalHours: 8.25,
    workerNotes: 'Lagerarbete och etikettering av inkommande pallar.',
    status: 'SUBMITTED',
    submittedAt: '2026-08-16T16:10:00Z',
  }
];

export class WorkHoursService {
  static getHours(assignmentId?: string): WorkHoursSubmission[] {
    const saved = localStorage.getItem(HOURS_STORAGE_KEY);
    let hours: WorkHoursSubmission[] = [];
    if (saved) {
      try {
        hours = JSON.parse(saved);
      } catch {
        hours = INITIAL_SAMPLE_WORK_HOURS;
      }
    } else {
      hours = INITIAL_SAMPLE_WORK_HOURS;
      localStorage.setItem(HOURS_STORAGE_KEY, JSON.stringify(hours));
    }
    if (assignmentId) {
      return hours.filter(h => h.assignmentId === assignmentId);
    }
    return hours;
  }

  static submitHours(submission: Omit<WorkHoursSubmission, 'id' | 'status' | 'submittedAt'>): WorkHoursSubmission {
    const hours = this.getHours();
    const newSubmission: WorkHoursSubmission = {
      ...submission,
      id: `wh-${Date.now()}`,
      status: 'SUBMITTED',
      submittedAt: new Date().toISOString(),
    };
    hours.unshift(newSubmission);
    localStorage.setItem(HOURS_STORAGE_KEY, JSON.stringify(hours));
    return newSubmission;
  }

  static approveHours(hoursId: string): WorkHoursSubmission {
    const hours = this.getHours();
    const item = hours.find(h => h.id === hoursId);
    if (item) {
      item.status = 'APPROVED';
      item.approvedAt = new Date().toISOString();
      localStorage.setItem(HOURS_STORAGE_KEY, JSON.stringify(hours));

      // Update assignment totals
      const assignments = ContractService.getAssignments();
      const assignment = assignments.find(a => a.id === item.assignmentId);
      if (assignment) {
        assignment.totalApprovedHours = (assignment.totalApprovedHours || 0) + item.totalHours;
        assignment.totalGrossAmount = assignment.totalApprovedHours * assignment.hourlyRate;
        assignment.status = 'HOURS_APPROVED';
        localStorage.setItem('arbetslyft_assignments', JSON.stringify(assignments));
      }
    }
    return item!;
  }

  static rejectHours(hoursId: string, reason: string): WorkHoursSubmission {
    const hours = this.getHours();
    const item = hours.find(h => h.id === hoursId);
    if (item) {
      item.status = 'REJECTED';
      item.employerRejectionReason = reason;
      localStorage.setItem(HOURS_STORAGE_KEY, JSON.stringify(hours));
    }
    return item!;
  }
}
