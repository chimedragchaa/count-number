import React from 'react';

interface CartoonHeartProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  countBadge?: number;
  isTapped?: boolean;
}

export const CartoonHeart: React.FC<CartoonHeartProps> = ({
  size = 54,
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
        className="w-full h-full drop-shadow-sm animate-slow-pulse"
      >
        <defs>
          <linearGradient id="heartGrad" x1="50" y1="15" x2="50" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFCA28" />
            <stop offset="1" stopColor="#FFA000" />
          </linearGradient>
        </defs>

        {/* Rounded Heart Shape */}
        <path
          d="M 50 86 
             C 20 62, 10 40, 18 26 
             C 26 12, 44 14, 50 28 
             C 56 14, 74 12, 82 26 
             C 90 40, 80 62, 50 86 Z"
          fill="url(#heartGrad)"
          stroke="#FF8F00"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Soft Highlight */}
        <circle cx="34" cy="30" r="3.5" fill="white" opacity="0.6" />

        {/* Cute Face */}
        <g>
          <circle cx="36" cy="48" r="2.5" fill="#E65100" opacity="0.65" />
          <circle cx="64" cy="48" r="2.5" fill="#E65100" opacity="0.65" />
          <circle cx="40" cy="42" r="2.2" fill="#3E2723" />
          <circle cx="60" cy="42" r="2.2" fill="#3E2723" />
          <path d="M 46 48 Q 50 52 54 48" stroke="#3E2723" strokeWidth="1.8" strokeLinecap="round" fill="none" />
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
