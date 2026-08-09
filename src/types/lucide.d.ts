declare module 'lucide-react' {
  import React from 'react';
  export interface LucideProps extends React.SVGProps<SVGSVGElement> {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
  }
  export type LucideIcon = React.ForwardRefExoticComponent<LucideProps & React.RefAttributes<SVGSVGElement>>;

  export const Globe: LucideIcon;
  export const ChevronDown: LucideIcon;
  export const Check: LucideIcon;
  export const X: LucideIcon;
  export const UserCheck: LucideIcon;
  export const Building2: LucideIcon;
  export const Shield: LucideIcon;
  export const LogOut: LucideIcon;
  export const Menu: LucideIcon;
  export const ShieldAlert: LucideIcon;
  export const ShieldCheck: LucideIcon;
  export const Scale: LucideIcon;
  export const Briefcase: LucideIcon;
  export const Bot: LucideIcon;
  export const FileCheck2: LucideIcon;
  export const Award: LucideIcon;
  export const Clock: LucideIcon;
  export const Coins: LucideIcon;
  export const TrendingUp: LucideIcon;
  export const Building: LucideIcon;
  export const CheckCircle2: LucideIcon;
  export const ArrowRight: LucideIcon;
  export const Sparkles: LucideIcon;
  export const Users: LucideIcon;
  export const AlertCircle: LucideIcon;
  export const FileSignature: LucideIcon;
  export const Star: LucideIcon;
  export const MapPin: LucideIcon;
  export const Calendar: LucideIcon;
  export const Search: LucideIcon;
  export const Filter: LucideIcon;
  export const Send: LucideIcon;
  export const MessageSquare: LucideIcon;
  export const Bell: LucideIcon;
  export const Download: LucideIcon;
  export const Eye: LucideIcon;
  export const CheckCheck: LucideIcon;
  export const AlertTriangle: LucideIcon;
}
