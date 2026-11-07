import React from 'react';

interface GiantNumberProps {
  number: number;
  color?: string;
  borderColor?: string;
  size?: number;
  className?: string;
}

export const GiantNumber: React.FC<GiantNumberProps> = ({
  number,
  color = '#FF5252',
  borderColor = '#D32F2F',
  size = 190,
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center animate-gentle-bob ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-lg"
      >
        <defs>
          <filter id={`shadow-${number}`} x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor={borderColor} floodOpacity="0.35" />
          </filter>
        </defs>

        {/* Outer friendly pill background badge */}
        <circle cx="80" cy="80" r="74" fill="white" stroke={borderColor} strokeWidth="6" opacity="0.9" />
        <circle cx="80" cy="80" r="66" fill={`${color}15`} />

        {/* Large Rounded Number Render */}
        <g filter={`url(#shadow-${number})`}>
          <text
            x="80"
            y="114"
            textAnchor="middle"
            fontSize="108"
            fontWeight="900"
            fontFamily="'Fredoka', 'Nunito', sans-serif"
            fill={color}
            stroke={borderColor}
            strokeWidth="5"
            strokeLinejoin="round"
            style={{ paintOrder: 'stroke fill' }}
          >
            {number}
          </text>
        </g>

        {/* Glossy cute highlight arc */}
        <path
          d="M 40 45 A 50 50 0 0 1 120 45"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
