import React from 'react';

interface CartoonAppleProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  countBadge?: number;
  isTapped?: boolean;
}

export const CartoonApple: React.FC<CartoonAppleProps> = ({
  size = 140,
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
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="appleGrad" x1="80" y1="35" x2="80" y2="155" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF5252" />
            <stop offset="1" stopColor="#E53935" />
          </linearGradient>
          <linearGradient id="leafGrad" x1="85" y1="12" x2="115" y2="35" gradientUnits="userSpaceOnUse">
            <stop stopColor="#66BB6A" />
            <stop offset="1" stopColor="#388E3C" />
          </linearGradient>
        </defs>

        {/* Apple Stem */}
        <path
          d="M 80 45 C 80 25, 74 15, 68 12"
          stroke="#5D4037"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cute Green Leaf */}
        <path
          d="M 80 32 C 95 15, 120 18, 115 35 C 100 42, 85 35, 80 32 Z"
          fill="url(#leafGrad)"
          stroke="#2E7D32"
          strokeWidth="2.5"
        />

        {/* Plump Red Apple Body */}
        <path
          d="M 80 50 C 45 42, 22 68, 22 102 C 22 135, 48 152, 70 152 C 78 152, 80 148, 80 148 C 80 148, 82 152, 90 152 C 112 152, 138 135, 138 102 C 138 68, 115 42, 80 50 Z"
          fill="url(#appleGrad)"
          stroke="#C62828"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Shine Highlight */}
        <ellipse cx="50" cy="74" rx="12" ry="18" transform="rotate(-25 50 74)" fill="white" opacity="0.45" />
        <circle cx="44" cy="98" r="4" fill="white" opacity="0.45" />

        {/* Smiling Cartoon Face */}
        <g>
          {/* Cheeks */}
          <ellipse cx="56" cy="112" rx="7" ry="5" fill="#FF8A80" />
          <ellipse cx="104" cy="112" rx="7" ry="5" fill="#FF8A80" />

          {/* Happy Eyes */}
          <circle cx="62" cy="98" r="5" fill="#263238" />
          <circle cx="64" cy="96" r="1.8" fill="white" />
          <circle cx="98" cy="98" r="5" fill="#263238" />
          <circle cx="100" cy="96" r="1.8" fill="white" />

          {/* Smile */}
          <path d="M 74 108 Q 80 118 86 108" stroke="#263238" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </g>
      </svg>

      {/* Touch Count Badge */}
      {countBadge !== undefined && (
        <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-amber-400 border-3 border-white text-slate-900 font-extrabold flex items-center justify-center text-lg shadow-md animate-bounce">
          {countBadge}
        </div>
      )}
    </div>
  );
};
