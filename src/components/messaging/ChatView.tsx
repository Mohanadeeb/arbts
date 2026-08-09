import React, { useState } from 'react';
import { MessageItem, User } from '../../types';
import { MessageService } from '../../services/messageService';
import { useTranslation } from '../../i18n/i18n';
import {
  MessageSquare,
  Send,
  ShieldCheck,
  Building,
  UserCheck,
  Clock,
  Sparkles
} from '../common/Icons';

interface ChatViewProps {
  currentUser: User;
  onClose?: () => void;
}

export const ChatView: React.FC<ChatViewProps> = ({ currentUser, onClose }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<MessageItem[]>(MessageService.getMessages());
  const [inputContent, setInputContent] = useState('');

  const isWorker = currentUser.role === 'WORKER';
  const recipientId = isWorker ? 'u-employer-1' : 'u-worker-1';
  const senderName = isWorker ? 'Astrid Lindgren' : 'Erik Johansson (Svensk Logistik AB)';

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputContent.trim()) {
      const sent = MessageService.sendMessage(
        currentUser.id,
        recipientId,
        senderName,
        inputContent.trim(),
        'ass-101',
        'job-1'
      );
      setMessages([...MessageService.getMessages()]);
      setInputContent('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <MessageSquare size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">Säker Uppdragsdialog</h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Direktkontakt för uppdraget "Lagerarbetare — 5 dagar"
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-100">
          <ShieldCheck size={15} className="text-blue-600" />
          <span>GDPR-skyddad chatt</span>
        </div>
      </div>

      {/* Chat Container */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-card overflow-hidden flex flex-col h-[520px]">
        
        {/* Privacy reminder banner */}
        <div className="p-3 bg-slate-50 border-b border-slate-100 text-center text-[11px] text-slate-500">
          Privata telefonnummer och personnummer hålls skyddade tills båda parter signerat avtal.
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isMe = m.senderId === currentUser.id;
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                  <span>{m.senderName}</span>
                  <span>•</span>
                  <span>{m.createdAt.substring(11, 16)}</span>
                </div>

                <div
                  className={`max-w-md p-4 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-500/15'
                      : 'bg-slate-100 text-slate-800 rounded-bl-none'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input Box */}
        <form onSubmit={handleSend} className="p-4 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
          <input
            type="text"
            required
            value={inputContent}
            onChange={(e) => setInputContent(e.target.value)}
            placeholder="Skriv ett meddelande..."
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-xs bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            type="submit"
            className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition flex items-center gap-1.5 shrink-0"
          >
            <Send size={15} />
            <span>Skicka</span>
          </button>
        </form>

      </div>
    </div>
  );
};
