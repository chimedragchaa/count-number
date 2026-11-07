import React from 'react';

interface CartoonStarProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  countBadge?: number;
  isTapped?: boolean;
}

export const CartoonStar: React.FC<CartoonStarProps> = ({
  size = 110,
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
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md animate-slow-pulse"
      >
        <defs>
          <linearGradient id="starGrad" x1="80" y1="20" x2="80" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFA726" />
            <stop offset="1" stopColor="#FF9800" />
          </linearGradient>
        </defs>

        {/* 5-pointed Rounded Star */}
        <path
          d="M 80 16 
             C 83 26, 92 48, 101 54 
             C 112 60, 137 62, 142 70 
             C 146 77, 126 93, 120 102 
             C 113 111, 120 134, 113 140 
             C 106 145, 87 131, 80 131 
             C 73 131, 54 145, 47 140 
             C 40 134, 47 111, 40 102 
             C 34 93, 14 77, 18 70 
             C 23 62, 48 60, 59 54 
             C 68 48, 77 26, 80 16 Z"
          fill="url(#starGrad)"
          stroke="#E65100"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Highlight Accent */}
        <circle cx="68" cy="62" r="5" fill="white" opacity="0.6" />
        <circle cx="60" cy="74" r="3" fill="white" opacity="0.6" />

        {/* Cute Face */}
        <g>
          {/* Cheeks */}
          <circle cx="62" cy="98" r="5" fill="#FF7043" opacity="0.8" />
          <circle cx="98" cy="98" r="5" fill="#FF7043" opacity="0.8" />

          {/* Happy Eyes */}
          <circle cx="66" cy="88" r="4.5" fill="#BF360C" />
          <circle cx="67.5" cy="86.5" r="1.6" fill="white" />
          <circle cx="94" cy="88" r="4.5" fill="#BF360C" />
          <circle cx="95.5" cy="86.5" r="1.6" fill="white" />

          {/* Cheerful Smile */}
          <path d="M 74 96 Q 80 104 86 96" stroke="#BF360C" strokeWidth="3" strokeLinecap="round" fill="none" />
        </g>
      </svg>

      {/* Count Badge */}
      {countBadge !== undefined && (
        <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-amber-400 border-3 border-white text-slate-900 font-extrabold flex items-center justify-center text-lg shadow-md animate-bounce">
          {countBadge}
        </div>
      )}
    </div>
  );
};
