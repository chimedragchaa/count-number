import React from 'react';

interface CartoonSunProps {
  size?: number;
  className?: string;
}

export const CartoonSun: React.FC<CartoonSunProps> = ({
  size = 180,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Rotating Sun Rays */}
      <svg
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full absolute inset-0 animate-slow-spin drop-shadow-md"
      >
        <defs>
          <linearGradient id="rayGrad" x1="100" y1="10" x2="100" y2="190" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD54F" />
            <stop offset="1" stopColor="#FFB300" />
          </linearGradient>
        </defs>

        {/* 12 Rounded Friendly Sun Rays */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <rect
              key={i}
              x="92"
              y="10"
              width="16"
              height="34"
              rx="8"
              fill="url(#rayGrad)"
              stroke="#FFA000"
              strokeWidth="2.5"
              transform={`rotate(${angle} 100 100)`}
            />
          );
        })}
      </svg>

      {/* Sun Face (Steady, gently bobbing, smiling) */}
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-3/4 h-3/4 z-10 animate-gentle-bob"
      >
        <defs>
          <linearGradient id="sunFaceGrad" x1="80" y1="20" x2="80" y2="140" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFEE58" />
            <stop offset="1" stopColor="#FDD835" />
          </linearGradient>
        </defs>

        <circle cx="80" cy="80" r="58" fill="url(#sunFaceGrad)" stroke="#F57F17" strokeWidth="4" />

        {/* Glossy top-left highlight */}
        <path d="M 46 44 A 45 45 0 0 1 114 44" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.6" />

        {/* Cheerful Sun Face */}
        <g>
          {/* Big Rosy Cheeks */}
          <circle cx="50" cy="92" r="9" fill="#FF8A80" opacity="0.85" />
          <circle cx="110" cy="92" r="9" fill="#FF8A80" opacity="0.85" />

          {/* Happy Cartoon Eyes */}
          <circle cx="58" cy="74" r="5" fill="#37474F" />
          <circle cx="60" cy="72" r="1.8" fill="white" />
          <circle cx="102" cy="74" r="5" fill="#37474F" />
          <circle cx="104" cy="72" r="1.8" fill="white" />

          {/* Big Warm Smile */}
          <path
            d="M 66 86 Q 80 105 94 86"
            stroke="#37474F"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};
