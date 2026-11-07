import React from 'react';

interface CartoonLeafProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  countBadge?: number;
  isTapped?: boolean;
}

export const CartoonLeaf: React.FC<CartoonLeafProps> = ({
  size = 115,
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
        className="w-full h-full drop-shadow-md animate-gentle-sway"
      >
        <defs>
          <linearGradient id="leafGrad2" x1="40" y1="20" x2="120" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#81C784" />
            <stop offset="1" stopColor="#43A047" />
          </linearGradient>
        </defs>

        {/* Leaf Stem */}
        <path d="M 80 148 C 80 135, 78 120, 75 105" stroke="#388E3C" strokeWidth="5" strokeLinecap="round" />

        {/* Leaf Body */}
        <path
          d="M 80 18 C 125 45, 138 95, 80 140 C 22 95, 35 45, 80 18 Z"
          fill="url(#leafGrad2)"
          stroke="#2E7D32"
          strokeWidth="4.5"
          strokeLinejoin="round"
        />

        {/* Leaf Center Vein */}
        <path d="M 80 32 L 80 125" stroke="#C8E6C9" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
        <path d="M 80 60 Q 98 50 108 55" stroke="#C8E6C9" strokeWidth="3" strokeLinecap="round" opacity="0.8" fill="none" />
        <path d="M 80 75 Q 62 65 52 70" stroke="#C8E6C9" strokeWidth="3" strokeLinecap="round" opacity="0.8" fill="none" />
        <path d="M 80 90 Q 98 80 108 85" stroke="#C8E6C9" strokeWidth="3" strokeLinecap="round" opacity="0.8" fill="none" />

        {/* Cute Face */}
        <g>
          {/* Cheeks */}
          <circle cx="62" cy="100" r="5" fill="#FF8A80" opacity="0.75" />
          <circle cx="98" cy="100" r="5" fill="#FF8A80" opacity="0.75" />

          {/* Happy Eyes */}
          <circle cx="66" cy="90" r="4" fill="#1B5E20" />
          <circle cx="67.5" cy="88.5" r="1.5" fill="white" />
          <circle cx="94" cy="90" r="4" fill="#1B5E20" />
          <circle cx="95.5" cy="88.5" r="1.5" fill="white" />

          {/* Smile */}
          <path d="M 75 98 Q 80 106 85 98" stroke="#1B5E20" strokeWidth="3" strokeLinecap="round" fill="none" />
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
