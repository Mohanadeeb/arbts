import React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
  title?: string;
}

const defaultProps = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Globe: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </svg>
);

export const ChevronRight: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="m9 18 6-6-6-6" />
  </svg>
);

export const ChevronDown: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const Sliders: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" /><line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" /><line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" /><line x1="1" x2="7" y1="14" y2="14" /><line x1="9" x2="15" y1="8" y2="8" /><line x1="17" x2="23" y1="16" y2="16" />
  </svg>
);

export const ExternalLink: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
);

export const Check: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

export const X: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const UserCheck: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </svg>
);

export const Building2: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" />
    <path d="M10 6h4" />
    <path d="M10 10h4" />
    <path d="M10 14h4" />
    <path d="M10 18h4" />
  </svg>
);

export const Building: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
    <path d="M9 22v-4h6v4" />
    <path d="M8 6h.01" />
    <path d="M16 6h.01" />
    <path d="M12 6h.01" />
    <path d="M12 10h.01" />
    <path d="M12 14h.01" />
    <path d="M16 10h.01" />
    <path d="M16 14h.01" />
    <path d="M8 10h.01" />
    <path d="M8 14h.01" />
  </svg>
);

export const Shield: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
  </svg>
);

export const ShieldCheck: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const ShieldAlert: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

export const LogOut: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" x2="9" y1="12" y2="12" />
  </svg>
);

export const Menu: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

export const Scale: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);

export const Briefcase: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
);

export const Bot: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M12 8V4H8" />
    <rect width="16" height="12" x="4" y="8" rx="2" />
    <path d="M2 14h2" />
    <path d="M20 14h2" />
    <path d="M15 13v2" />
    <path d="M9 13v2" />
  </svg>
);

export const FileCheck2: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="m3 15 2 2 4-4" />
  </svg>
);

export const Award: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
    <circle cx="12" cy="8" r="6" />
  </svg>
);

export const Clock: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const Coins: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <circle cx="8" cy="8" r="6" />
    <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
    <path d="M7 6h1v4" />
    <path d="m16.71 13.88.7.71-2.82 2.82" />
  </svg>
);

export const TrendingUp: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
);

export const CreditCard: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);

export const Layers: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.9a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" /><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" /><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
  </svg>
);

export const CheckCircle: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const CheckCircle2: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const ArrowRight: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const Sparkles: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
    <path d="M5 3v4" />
    <path d="M19 17v4" />
    <path d="M3 5h4" />
    <path d="M17 19h4" />
  </svg>
);

export const Users: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

export const AlertCircle: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" x2="12" y1="8" y2="12" />
    <line x1="12" x2="12.01" y1="16" y2="16" />
  </svg>
);

export const FileSignature: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M20 19.5v.5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8.5L19 6.5V14" />
    <path d="M14 2v5a1 1 0 0 0 1 1h5" />
    <path d="m18.5 15.5-6 6H10v-2.5l6-6a1.4 1.4 0 0 1 2 0l.5.5a1.4 1.4 0 0 1 0 2Z" />
  </svg>
);

export const Star: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const MapPin: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const Calendar: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M8 2v4" />
    <path d="M16 2v4" />
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M3 10h18" />
  </svg>
);

export const Search: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

export const Filter: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const Send: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

export const MessageSquare: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

export const Bell: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

export const Download: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);

export const Eye: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const CheckCheck: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="M18 6 7 17l-5-5" />
    <path d="m22 10-7.5 7.5L13 16" />
  </svg>
);

export const AlertTriangle: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg width={size} height={size} className={className} {...defaultProps} {...props}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" x2="12" y1="9" y2="13" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </svg>
);
