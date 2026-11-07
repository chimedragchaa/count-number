import React from 'react';
import { CartoonHand } from './CartoonHand.tsx';

interface TwoHandsDisplayProps {
  totalFingers: number; // 0 to 10
  size?: number;
  className?: string;
  isWaving?: boolean;
}

export const TwoHandsDisplay: React.FC<TwoHandsDisplayProps> = ({
  totalFingers = 5,
  size = 180,
  className = '',
  isWaving = true,
}) => {
  // 1 to 5 fingers: 1 cute hand centered
  if (totalFingers <= 5) {
    return (
      <div className={`flex flex-col items-center justify-center ${className}`}>
        <CartoonHand
          fingersCount={totalFingers}
          isWaving={isWaving}
          size={size}
          showFace={true}
        />
      </div>
    );
  }

  // 6 to 10 fingers: 2 cute hands side-by-side
  const leftFingers = 5;
  const rightFingers = totalFingers - 5;
  const handSize = Math.round(size * 0.72);

  return (
    <div className={`flex flex-col items-center justify-center gap-1 ${className}`}>
      <div className="flex items-center justify-center gap-2">
        {/* Left Hand: always 5 open fingers */}
        <CartoonHand
          fingersCount={leftFingers}
          isWaving={isWaving}
          size={handSize}
          showFace={true}
          isLeftHand={true}
        />

        {/* Plus sign badge */}
        <div className="w-7 h-7 rounded-full bg-amber-400 text-slate-900 font-black text-sm flex items-center justify-center shadow-xs">
          +
        </div>

        {/* Right Hand: rightFingers (1..5) */}
        <CartoonHand
          fingersCount={rightFingers}
          isWaving={isWaving}
          size={handSize}
          showFace={true}
          isLeftHand={false}
        />
      </div>

      {/* Toddler Math indicator: 5 + N = total */}
      <div className="px-3 py-0.5 rounded-full bg-white/80 border border-amber-200 text-slate-700 font-extrabold text-xs shadow-2xs">
        5 + {rightFingers} = {totalFingers} хуруу 🖐️
      </div>
    </div>
  );
};
