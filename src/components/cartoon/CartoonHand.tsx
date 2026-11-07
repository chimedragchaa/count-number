import React from 'react';

interface CartoonHandProps {
  fingersCount?: number; // 0 to 5
  isWaving?: boolean;
  size?: number;
  className?: string;
  showFace?: boolean;
  isLeftHand?: boolean;
}

/**
 * Clean, adorable, vector cartoon hand for toddlers.
 * Each finger is cleanly articulated with zero jagged seams or glitches.
 */
export const CartoonHand: React.FC<CartoonHandProps> = ({
  fingersCount = 5,
  isWaving = true,
  size = 200,
  className = '',
  showFace = true,
  isLeftHand = false,
}) => {
  // Finger poses for counts 0 to 5:
  // [Thumb, Index, Middle, Ring, Pinky]
  const fingerStates = {
    0: [false, false, false, false, false],
    1: [false, true, false, false, false],       // Index up
    2: [false, true, true, false, false],       // Index + Middle (Peace / 2)
    3: [false, true, true, true, false],       // Index + Middle + Ring (or Thumb+Index+Middle)
    4: [false, true, true, true, true],        // 4 fingers up
    5: [true, true, true, true, true],         // All 5 open
  }[Math.max(0, Math.min(5, fingersCount))] || [true, true, true, true, true];

  const [hasThumb, hasIndex, hasMiddle, hasRing, hasPinky] = fingerStates;

  return (
    <div
      className={`relative inline-flex items-center justify-center ${
        isWaving ? 'animate-gentle-wave' : 'animate-gentle-bob'
      } ${className}`}
      style={{
        width: size,
        height: size,
        transform: isLeftHand ? 'scaleX(-1)' : undefined,
      }}
    >
      <svg
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md overflow-visible"
      >
        <defs>
          <linearGradient id="handGradMain" x1="100" y1="20" x2="100" y2="210" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFF3E0" />
            <stop offset="0.3" stopColor="#FFE082" />
            <stop offset="1" stopColor="#FFCA28" />
          </linearGradient>

          <linearGradient id="cuffGradMain" x1="60" y1="170" x2="140" y2="215" gradientUnits="userSpaceOnUse">
            <stop stopColor="#81D4FA" />
            <stop offset="1" stopColor="#039BE5" />
          </linearGradient>

          <filter id="handSoftShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#FFB300" floodOpacity="0.35" />
          </filter>
        </defs>

        {/* --- WRIST CUFF --- */}
        <g>
          <rect
            x="68"
            y="174"
            width="64"
            height="34"
            rx="14"
            fill="url(#cuffGradMain)"
            stroke="#0277BD"
            strokeWidth="3.5"
          />
          <line x1="84" y1="181" x2="84" y2="201" stroke="#E1F5FE" strokeWidth="3" strokeLinecap="round" />
          <line x1="100" y1="181" x2="100" y2="201" stroke="#E1F5FE" strokeWidth="3" strokeLinecap="round" />
          <line x1="116" y1="181" x2="116" y2="201" stroke="#E1F5FE" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* --- FINGERS LAYER (Rendered behind palm for seamless joints) --- */}

        {/* 1. THUMB (left side) */}
        {hasThumb ? (
          <g transform="rotate(-36 56 128)">
            <rect
              x="42"
              y="74"
              width="24"
              height="58"
              rx="12"
              fill="url(#handGradMain)"
              stroke="#FFA000"
              strokeWidth="3.5"
            />
          </g>
        ) : (
          /* Folded thumb cushion */
          <ellipse
            cx="58"
            cy="132"
            rx="14"
            ry="11"
            fill="url(#handGradMain)"
            stroke="#FFA000"
            strokeWidth="3"
            transform="rotate(-20 58 132)"
          />
        )}

        {/* 2. INDEX FINGER */}
        {hasIndex ? (
          <g transform="rotate(-7 74 115)">
            <rect
              x="62"
              y="32"
              width="24"
              height="84"
              rx="12"
              fill="url(#handGradMain)"
              stroke="#FFA000"
              strokeWidth="3.5"
            />
          </g>
        ) : (
          /* Folded index knuckle */
          <ellipse cx="73" cy="115" rx="11" ry="8" fill="url(#handGradMain)" stroke="#FFA000" strokeWidth="2.5" />
        )}

        {/* 3. MIDDLE FINGER (Tallest) */}
        {hasMiddle ? (
          <g>
            <rect
              x="88"
              y="20"
              width="24"
              height="96"
              rx="12"
              fill="url(#handGradMain)"
              stroke="#FFA000"
              strokeWidth="3.5"
            />
          </g>
        ) : (
          /* Folded middle knuckle */
          <ellipse cx="100" cy="112" rx="11" ry="8" fill="url(#handGradMain)" stroke="#FFA000" strokeWidth="2.5" />
        )}

        {/* 4. RING FINGER */}
        {hasRing ? (
          <g transform="rotate(7 126 115)">
            <rect
              x="114"
              y="32"
              width="24"
              height="84"
              rx="12"
              fill="url(#handGradMain)"
              stroke="#FFA000"
              strokeWidth="3.5"
            />
          </g>
        ) : (
          /* Folded ring knuckle */
          <ellipse cx="127" cy="115" rx="11" ry="8" fill="url(#handGradMain)" stroke="#FFA000" strokeWidth="2.5" />
        )}

        {/* 5. PINKY FINGER (Smallest, right side) */}
        {hasPinky ? (
          <g transform="rotate(22 148 128)">
            <rect
              x="138"
              y="54"
              width="21"
              height="72"
              rx="10.5"
              fill="url(#handGradMain)"
              stroke="#FFA000"
              strokeWidth="3.5"
            />
          </g>
        ) : (
          /* Folded pinky knuckle */
          <ellipse cx="145" cy="122" rx="9" ry="7" fill="url(#handGradMain)" stroke="#FFA000" strokeWidth="2.5" />
        )}

        {/* --- PALM BASE (Clean, seamless rounded heart-drop palm) --- */}
        <ellipse
          cx="100"
          cy="144"
          rx="46"
          ry="38"
          fill="url(#handGradMain)"
          stroke="#FFA000"
          strokeWidth="3.5"
        />

        {/* Soft Palm Center Highlight */}
        <ellipse cx="100" cy="138" rx="36" ry="24" fill="#FFF8E1" opacity="0.4" />

        {/* --- KAWAII FACE ON PALM --- */}
        {showFace && (
          <g>
            {/* Soft Rosy Cheeks */}
            <circle cx="76" cy="148" r="8" fill="#FF8A80" opacity="0.75" />
            <circle cx="124" cy="148" r="8" fill="#FF8A80" opacity="0.75" />

            {/* Happy Curved Cartoon Eyes */}
            <path
              d="M 72 138 Q 78 130 84 138"
              stroke="#37474F"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 116 138 Q 122 130 128 138"
              stroke="#37474F"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Cheerful Smile */}
            <path
              d="M 88 147 Q 100 160 112 147"
              stroke="#37474F"
              strokeWidth="3.5"
              strokeLinecap="round"
              fill="none"
            />
          </g>
        )}
      </svg>
    </div>
  );
};
