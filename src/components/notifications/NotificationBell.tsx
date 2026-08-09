import React, { useState, useRef, useEffect } from 'react';
import { OfferService } from '../../services/offerService';
import { NotificationItem } from '../../types';
import { Bell, Check, Sparkles, FileSignature, Briefcase } from '../common/Icons';

interface NotificationBellProps {
  onNavigateTab?: (tab: string) => void;
}

export const NotificationBell: React.FC<NotificationBellProps> = ({ onNavigateTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>(OfferService.getNotifications());
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.isRead).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMarkAllRead = () => {
    OfferService.markAllAsRead();
    setNotifications(OfferService.getNotifications());
  };

  const handleNotificationClick = (link?: string) => {
    setIsOpen(false);
    if (link && onNavigateTab) {
      onNavigateTab(link);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition shadow-sm"
        aria-label="Notiser"
      >
        <Bell size={18} className="text-slate-700" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-extrabold flex items-center justify-center shadow-md animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-white shadow-2xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex items-center justify-between px-4 pb-2 border-b border-slate-100">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
              Notiser ({notifications.length})
            </span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[11px] font-bold text-blue-600 hover:text-blue-700"
              >
                Markera alla som lästa
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400">Inga nya notiser</div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n.link)}
                  className={`p-3.5 hover:bg-blue-50/50 cursor-pointer transition flex items-start gap-3 ${
                    !n.isRead ? 'bg-blue-50/30' : ''
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 mt-0.5 ${
                    n.type === 'OFFER' ? 'bg-emerald-50 text-emerald-600' :
                    n.type === 'CONTRACT' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {n.type === 'OFFER' && <Briefcase size={16} />}
                    {n.type === 'CONTRACT' && <FileSignature size={16} />}
                    {n.type === 'SYSTEM' && <Sparkles size={16} />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-bold text-slate-900 text-xs truncate">{n.title}</span>
                      {!n.isRead && (
                        <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed line-clamp-2">
                      {n.message}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
