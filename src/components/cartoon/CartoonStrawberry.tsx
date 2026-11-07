import React from 'react';

interface CartoonStrawberryProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  countBadge?: number;
  isTapped?: boolean;
}

export const CartoonStrawberry: React.FC<CartoonStrawberryProps> = ({
  size = 62,
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
          <linearGradient id="strawGrad" x1="50" y1="25" x2="50" y2="95" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF5252" />
            <stop offset="1" stopColor="#D50000" />
          </linearGradient>
        </defs>

        {/* Green Calyx / Leaves on top */}
        <path d="M 50 12 L 50 24" stroke="#2E7D32" strokeWidth="3" strokeLinecap="round" />
        <path d="M 50 24 C 40 18, 30 20, 26 26 C 36 28, 44 26, 50 24 Z" fill="#66BB6A" stroke="#2E7D32" strokeWidth="1.5" />
        <path d="M 50 24 C 60 18, 70 20, 74 26 C 64 28, 56 26, 50 24 Z" fill="#66BB6A" stroke="#2E7D32" strokeWidth="1.5" />
        <path d="M 50 24 C 48 32, 52 32, 50 34" stroke="#2E7D32" strokeWidth="2" />

        {/* Plump Strawberry Body */}
        <path
          d="M 50 24 C 26 24, 18 42, 22 64 C 26 84, 46 94, 50 94 C 54 94, 74 84, 78 64 C 82 42, 74 24, 50 24 Z"
          fill="url(#strawGrad)"
          stroke="#B71C1C"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Cute Seeds */}
        <circle cx="34" cy="46" r="1.5" fill="#FFF9C4" />
        <circle cx="66" cy="46" r="1.5" fill="#FFF9C4" />
        <circle cx="42" cy="74" r="1.5" fill="#FFF9C4" />
        <circle cx="58" cy="74" r="1.5" fill="#FFF9C4" />

        {/* Cute Face */}
        <g>
          <circle cx="38" cy="62" r="2.5" fill="#FF8A80" />
          <circle cx="62" cy="62" r="2.5" fill="#FF8A80" />
          <circle cx="42" cy="56" r="2" fill="#212121" />
          <circle cx="58" cy="56" r="2" fill="#212121" />
          <path d="M 46 62 Q 50 66 54 62" stroke="#212121" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </g>
      </svg>

      {countBadge !== undefined && (
        <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-amber-400 border-2 border-white text-slate-900 font-extrabold flex items-center justify-center text-xs shadow-md animate-bounce">
          {countBadge}
        </div>
      )}
    </div>
  );
};
