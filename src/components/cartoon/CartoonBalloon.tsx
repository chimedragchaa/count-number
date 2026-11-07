import React from 'react';

interface CartoonBalloonProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  countBadge?: number;
  isTapped?: boolean;
  color?: string;
  borderColor?: string;
}

export const CartoonBalloon: React.FC<CartoonBalloonProps> = ({
  size = 58,
  className = '',
  onClick,
  countBadge,
  isTapped = false,
  color = '#42A5F5',
  borderColor = '#1E88E5',
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
        className="w-full h-full drop-shadow-sm animate-gentle-sway"
      >
        {/* Balloon String */}
        <path d="M 50 82 Q 46 90 54 98" stroke="#B0BEC5" strokeWidth="2" strokeLinecap="round" fill="none" />

        {/* Balloon Knot */}
        <polygon points="46,84 54,84 50,78" fill={color} stroke={borderColor} strokeWidth="2" />

        {/* Balloon Oval Body */}
        <ellipse cx="50" cy="46" rx="32" ry="36" fill={color} stroke={borderColor} strokeWidth="3" />

        {/* Glossy Curved Highlight */}
        <ellipse cx="36" cy="32" rx="7" ry="12" transform="rotate(-30 36 32)" fill="white" opacity="0.55" />

        {/* Cute Face */}
        <g>
          <circle cx="40" cy="54" r="2.5" fill="#FF8A80" opacity="0.8" />
          <circle cx="60" cy="54" r="2.5" fill="#FF8A80" opacity="0.8" />
          <circle cx="43" cy="48" r="2.2" fill="#263238" />
          <circle cx="57" cy="48" r="2.2" fill="#263238" />
          <path d="M 47 54 Q 50 58 53 54" stroke="#263238" strokeWidth="1.8" strokeLinecap="round" fill="none" />
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
