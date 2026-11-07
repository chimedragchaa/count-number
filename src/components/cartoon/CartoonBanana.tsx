import React from 'react';

interface CartoonBananaProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  countBadge?: number;
  isTapped?: boolean;
}

export const CartoonBanana: React.FC<CartoonBananaProps> = ({
  size = 135,
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
          <linearGradient id="bananaGrad" x1="40" y1="30" x2="130" y2="130" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFEE58" />
            <stop offset="1" stopColor="#FDD835" />
          </linearGradient>
        </defs>

        {/* Banana Stem Tip */}
        <path d="M 36 34 L 46 25 L 54 33 L 44 42 Z" fill="#8D6E63" stroke="#5D4037" strokeWidth="2" />

        {/* Yellow Banana Body */}
        <path
          d="M 44 38 C 75 42, 126 75, 128 120 C 130 135, 120 142, 108 142 C 70 142, 38 90, 44 38 Z"
          fill="url(#bananaGrad)"
          stroke="#F57F17"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Bottom Tip */}
        <path d="M 122 128 C 126 133, 128 138, 126 142 C 122 142, 118 138, 116 134 Z" fill="#6D4C41" />

        {/* Soft Highlight */}
        <path
          d="M 52 50 C 74 60, 110 88, 112 118"
          stroke="white"
          strokeWidth="4.5"
          strokeLinecap="round"
          opacity="0.5"
          fill="none"
        />

        {/* Cute Face */}
        <g>
          {/* Cheeks */}
          <ellipse cx="78" cy="100" rx="6" ry="4" fill="#FF8A80" />
          <ellipse cx="98" cy="112" rx="6" ry="4" fill="#FF8A80" />

          {/* Happy Eyes */}
          <circle cx="82" cy="90" r="4" fill="#37474F" />
          <circle cx="83.5" cy="88.5" r="1.5" fill="white" />
          <circle cx="95" cy="98" r="4" fill="#37474F" />
          <circle cx="96.5" cy="96.5" r="1.5" fill="white" />

          {/* Smile */}
          <path d="M 86 98 Q 92 106 96 102" stroke="#37474F" strokeWidth="3" strokeLinecap="round" fill="none" />
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
