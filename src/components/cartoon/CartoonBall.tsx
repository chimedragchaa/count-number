import React from 'react';

interface CartoonBallProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  countBadge?: number;
  isTapped?: boolean;
}

export const CartoonBall: React.FC<CartoonBallProps> = ({
  size = 125,
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
        className="w-full h-full drop-shadow-md animate-gentle-bob"
      >
        <defs>
          <linearGradient id="ballGrad" x1="50" y1="20" x2="120" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#42A5F5" />
            <stop offset="1" stopColor="#1E88E5" />
          </linearGradient>
        </defs>

        {/* Ball Circle */}
        <circle cx="80" cy="80" r="66" fill="url(#ballGrad)" stroke="#1565C0" strokeWidth="5" />

        {/* Fun Curved Pattern Stripe */}
        <path
          d="M 22 65 C 50 85, 110 85, 138 65"
          stroke="#90CAF9"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Glossy Reflection */}
        <ellipse cx="56" cy="48" rx="16" ry="10" transform="rotate(-30 56 48)" fill="white" opacity="0.5" />
        <circle cx="42" cy="65" r="4" fill="white" opacity="0.5" />

        {/* Cute Face */}
        <g>
          {/* Cheeks */}
          <circle cx="58" cy="115" r="6" fill="#FF8A80" opacity="0.7" />
          <circle cx="102" cy="115" r="6" fill="#FF8A80" opacity="0.7" />

          {/* Happy Eyes */}
          <circle cx="64" cy="102" r="5" fill="#0D47A1" />
          <circle cx="66" cy="100" r="1.8" fill="white" />
          <circle cx="96" cy="102" r="5" fill="#0D47A1" />
          <circle cx="98" cy="100" r="1.8" fill="white" />

          {/* Smile */}
          <path d="M 74 112 Q 80 122 86 112" stroke="#0D47A1" strokeWidth="3.5" strokeLinecap="round" fill="none" />
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
