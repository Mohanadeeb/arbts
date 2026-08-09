import { MessageItem } from '../types';

const MESSAGES_STORAGE_KEY = 'arbetslyft_messages';

export const INITIAL_SAMPLE_MESSAGES: MessageItem[] = [
  {
    id: 'msg-1',
    senderId: 'u-employer-1',
    recipientId: 'u-worker-1',
    senderName: 'Erik Johansson (Svensk Logistik Solutions AB)',
    jobId: 'job-1',
    assignmentId: 'ass-101',
    content: 'Hej Astrid! Välkommen till uppdraget på måndag. Samling sker vid Lastkaj 4 kl 06:50 för säkerhetsgenomgång.',
    isRead: true,
    createdAt: '2026-08-09T11:00:00Z',
  },
  {
    id: 'msg-2',
    senderId: 'u-worker-1',
    recipientId: 'u-employer-1',
    senderName: 'Astrid Lindgren',
    jobId: 'job-1',
    assignmentId: 'ass-101',
    content: 'Tack Erik! Jag är på plats i god tid med godkända skyddsskor och varselväst.',
    isRead: true,
    createdAt: '2026-08-09T11:15:00Z',
  }
];

export class MessageService {
  static getMessages(assignmentId?: string): MessageItem[] {
    const saved = localStorage.getItem(MESSAGES_STORAGE_KEY);
    let msgs: MessageItem[] = [];
    if (saved) {
      try {
        msgs = JSON.parse(saved);
      } catch {
        msgs = INITIAL_SAMPLE_MESSAGES;
      }
    } else {
      msgs = INITIAL_SAMPLE_MESSAGES;
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(msgs));
    }
    if (assignmentId) {
      return msgs.filter(m => m.assignmentId === assignmentId);
    }
    return msgs;
  }

  static sendMessage(
    senderId: string,
    recipientId: string,
    senderName: string,
    content: string,
    assignmentId?: string,
    jobId?: string
  ): MessageItem {
    const msgs = this.getMessages();
    const newMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      senderId,
      recipientId,
      senderName,
      content,
      assignmentId,
      jobId,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    msgs.push(newMsg);
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(msgs));
    return newMsg;
  }
}
