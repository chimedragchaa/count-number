import React from 'react';

interface CartoonButterflyProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  countBadge?: number;
  isTapped?: boolean;
}

export const CartoonButterfly: React.FC<CartoonButterflyProps> = ({
  size = 50,
  className = '',
  onClick,
  countBadge,
  isTapped = false,
}) => {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`relative inline-flex items-center justify-center cursor-pointer transition-transform duration-300 ${
        isTapped ? 'scale-110' : 'hover:scale-105'
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm animate-gentle-bob"
      >
        <defs>
          <linearGradient id="wingGrad" x1="10" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#80DEEA" />
            <stop offset="1" stopColor="#26C6DA" />
          </linearGradient>
        </defs>

        {/* Antennae */}
        <path d="M 47 34 Q 42 22 36 24" stroke="#006064" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M 53 34 Q 58 22 64 24" stroke="#006064" strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="36" cy="24" r="2" fill="#006064" />
        <circle cx="64" cy="24" r="2" fill="#006064" />

        {/* Left Wings */}
        <ellipse cx="32" cy="42" rx="20" ry="16" transform="rotate(-20 32 42)" fill="url(#wingGrad)" stroke="#00838F" strokeWidth="2.5" />
        <ellipse cx="36" cy="62" rx="14" ry="12" transform="rotate(15 36 62)" fill="#B2EBF2" stroke="#00838F" strokeWidth="2" />

        {/* Right Wings */}
        <ellipse cx="68" cy="42" rx="20" ry="16" transform="rotate(20 68 42)" fill="url(#wingGrad)" stroke="#00838F" strokeWidth="2.5" />
        <ellipse cx="64" cy="62" rx="14" ry="12" transform="rotate(-15 64 62)" fill="#B2EBF2" stroke="#00838F" strokeWidth="2" />

        {/* Wing dots */}
        <circle cx="28" cy="40" r="3.5" fill="#FFF9C4" />
        <circle cx="72" cy="40" r="3.5" fill="#FFF9C4" />

        {/* Body */}
        <rect x="46" y="32" width="8" height="40" rx="4" fill="#00838F" />

        {/* Cute Face */}
        <circle cx="48" cy="38" r="1.3" fill="white" />
        <circle cx="52" cy="38" r="1.3" fill="white" />
        <path d="M 48 42 Q 50 44 52 42" stroke="white" strokeWidth="1" strokeLinecap="round" fill="none" />
      </svg>

      {countBadge !== undefined && (
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-400 border-2 border-white text-slate-900 font-extrabold flex items-center justify-center text-[10px] shadow-md animate-bounce">
          {countBadge}
        </div>
      )}
    </div>
  );
};
