import React from 'react';

interface CartoonFlowerProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  countBadge?: number;
  isTapped?: boolean;
}

export const CartoonFlower: React.FC<CartoonFlowerProps> = ({
  size = 65,
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
          <linearGradient id="petalGrad" x1="50" y1="10" x2="50" y2="90" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F48FB1" />
            <stop offset="1" stopColor="#EC407A" />
          </linearGradient>
        </defs>

        {/* 5 Rounded Petals */}
        {[0, 72, 144, 216, 288].map((angle, i) => (
          <circle
            key={i}
            cx="50"
            cy="26"
            r="18"
            fill="url(#petalGrad)"
            stroke="#D81B60"
            strokeWidth="2.5"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}

        {/* Center Yellow Disc */}
        <circle cx="50" cy="50" r="16" fill="#FFEE58" stroke="#FBC02D" strokeWidth="2.5" />

        {/* Cheerful Kawaii Face */}
        <g>
          <circle cx="44" cy="53" r="2.5" fill="#E65100" opacity="0.6" />
          <circle cx="56" cy="53" r="2.5" fill="#E65100" opacity="0.6" />
          <circle cx="45" cy="48" r="2" fill="#37474F" />
          <circle cx="55" cy="48" r="2" fill="#37474F" />
          <path d="M 47 52 Q 50 56 53 52" stroke="#37474F" strokeWidth="1.8" strokeLinecap="round" fill="none" />
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
