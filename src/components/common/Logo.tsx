import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true }) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Modern 'A' + Upward Movement Arrow Logo */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-blue-700 to-emerald-500 p-2 shadow-md shadow-blue-500/20 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full text-white"
        >
          {/* Base A lines */}
          <path
            d="M4 19L12 4L20 19"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Upward rising arrow crossbar */}
          <path
            d="M8 14H16M12 10L15 13M12 10L9 13"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Accent dot for growth */}
          <circle cx="12" cy="7" r="1.5" fill="#12B76A" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-extrabold tracking-tight text-slate-900 leading-none ${textSizes[size]}`}>
            Arbets<span className="text-blue-600">lyft</span>
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-slate-500 uppercase mt-0.5">
            Från möjlighet till arbete
          </span>
        </div>
      )}
    </div>
  );
};
