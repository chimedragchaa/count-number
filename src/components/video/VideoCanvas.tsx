import React, { useState } from 'react';
import { SHOTS, ShotConfig } from '../../utils/timeline.ts';
import { CartoonHand } from '../cartoon/CartoonHand.tsx';
import { TwoHandsDisplay } from '../cartoon/TwoHandsDisplay.tsx';
import { GiantNumber } from '../cartoon/GiantNumber.tsx';
import { CartoonApple } from '../cartoon/CartoonApple.tsx';
import { CartoonBanana } from '../cartoon/CartoonBanana.tsx';
import { CartoonBall } from '../cartoon/CartoonBall.tsx';
import { CartoonLeaf } from '../cartoon/CartoonLeaf.tsx';
import { CartoonStar } from '../cartoon/CartoonStar.tsx';
import { CartoonFlower } from '../cartoon/CartoonFlower.tsx';
import { CartoonStrawberry } from '../cartoon/CartoonStrawberry.tsx';
import { CartoonBalloon } from '../cartoon/CartoonBalloon.tsx';
import { CartoonHeart } from '../cartoon/CartoonHeart.tsx';
import { CartoonButterfly } from '../cartoon/CartoonButterfly.tsx';
import { CartoonSun } from '../cartoon/CartoonSun.tsx';
import { PastelConfetti } from '../cartoon/PastelConfetti.tsx';
import { toddlerAudio } from '../../utils/audio.ts';

interface VideoCanvasProps {
  currentShot: ShotConfig;
  shotProgress: number; // 0 to 1
  isPracticeMode?: boolean;
  showCaptions?: boolean;
  onItemTapped?: (itemIndex: number) => void;
}

export const VideoCanvas: React.FC<VideoCanvasProps> = ({
  currentShot,
  shotProgress,
  isPracticeMode = false,
  showCaptions = true,
  onItemTapped,
}) => {
  const [tappedIndices, setTappedIndices] = useState<number[]>([]);

  // Reset tapped indices when shot changes
  React.useEffect(() => {
    setTappedIndices([]);
  }, [currentShot.id]);

  const handleItemClick = (idx: number) => {
    const nextTapped = [...tappedIndices];
    if (!nextTapped.includes(idx)) {
      nextTapped.push(idx);
      setTappedIndices(nextTapped);
    }
    // Play chime & speak count in Mongolian
    toddlerAudio.playCountChime(idx + 1);
    toddlerAudio.playCountVoice(idx + 1);
    if (onItemTapped) {
      onItemTapped(idx);
    }
  };

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden transition-colors duration-700 ease-in-out select-none"
      style={{
        backgroundColor: currentShot.theme.bg,
      }}
    >
      {/* Background Decorative Soft Pastel Clouds */}
      <div className="absolute inset-0 pointer-events-none opacity-35">
        <div
          className="absolute -top-10 -left-10 w-40 h-40 rounded-full"
          style={{ backgroundColor: currentShot.theme.bgAccent }}
        />
        <div
          className="absolute top-1/4 -right-12 w-48 h-48 rounded-full"
          style={{ backgroundColor: currentShot.theme.bgAccent }}
        />
        <div
          className="absolute bottom-12 -left-12 w-52 h-52 rounded-full"
          style={{ backgroundColor: currentShot.theme.bgAccent }}
        />
      </div>

      {/* Confetti overlay in Celebration Shot (Shot 12) */}
      {currentShot.id === 12 && <PastelConfetti />}

      {/* TOP HEADER: Huge Friendly Mongolian Title */}
      <div className="z-10 w-full pt-4 sm:pt-5 px-3 text-center flex flex-col items-center">
        {/* Shot progress indicator dots */}
        <div className="flex items-center justify-center gap-1 mb-2">
          {SHOTS.map((s) => (
            <div
              key={s.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s.id === currentShot.id
                  ? 'w-5 bg-amber-400 shadow-sm'
                  : s.id < currentShot.id
                  ? 'w-1.5 bg-slate-400/50'
                  : 'w-1.5 bg-slate-300/40'
              }`}
            />
          ))}
        </div>

        {/* Big Mongolian Word / Title */}
        <h1
          className="text-3xl sm:text-4xl font-black tracking-tight drop-shadow-sm transition-transform duration-500"
          style={{
            color: currentShot.theme.textColor,
            fontFamily: "'Fredoka', 'Nunito', sans-serif",
          }}
        >
          {currentShot.text}
        </h1>

        {/* Subtitle / Pronunciation / English translation guide */}
        {showCaptions && (
          <div className="mt-1 flex flex-col items-center gap-1">
            <span
              className="text-xs sm:text-sm font-bold px-3 py-0.5 rounded-full shadow-2xs inline-flex items-center gap-1.5"
              style={{
                backgroundColor: currentShot.theme.badgeBg,
                color: currentShot.theme.textColor,
              }}
            >
              <span>{currentShot.pronunciation}</span>
              <span className="opacity-60">•</span>
              <span className="font-medium opacity-90">{currentShot.meaning}</span>
            </span>
          </div>
        )}
      </div>

      {/* CENTER STAGE: Giant Number and Count Items / Hand */}
      <div className="z-10 w-full flex-1 flex flex-col items-center justify-center px-3 py-1">
        {/* SHOT 1: Cheerful Cartoon Hand Waving */}
        {currentShot.id === 1 && (
          <div className="flex flex-col items-center justify-center space-y-3">
            <CartoonHand fingersCount={5} isWaving={true} size={175} showFace={true} />
            <div className="bg-white/85 backdrop-blur-xs px-4 py-1.5 rounded-2xl shadow-sm text-slate-700 font-extrabold text-center text-base animate-gentle-bob border border-slate-100">
              Сайн уу! 1-10 тоолцгооё! 🖐️🖐️
            </div>
          </div>
        )}

        {/* SHOT 2 to 11: Numbers 1 to 10 with Countable Cartoon Items */}
        {currentShot.number !== null && (
          <div className="w-full flex flex-col items-center justify-center gap-1.5">
            {/* Giant Rounded Number */}
            <GiantNumber
              number={currentShot.number}
              color={currentShot.theme.numberBg}
              borderColor={currentShot.theme.numberBorder}
              size={105}
            />

            {/* Cartoon Objects Grid */}
            <div className="w-full flex flex-wrap items-center justify-center gap-2 max-w-[270px] min-h-[120px] py-1">
              {/* 1: Red Apple */}
              {currentShot.number === 1 && (
                <CartoonApple
                  size={120}
                  onClick={() => handleItemClick(0)}
                  countBadge={tappedIndices.includes(0) ? 1 : (isPracticeMode ? undefined : 1)}
                  isTapped={tappedIndices.includes(0)}
                />
              )}

              {/* 2: Yellow Bananas */}
              {currentShot.number === 2 && (
                <>
                  <CartoonBanana
                    size={98}
                    onClick={() => handleItemClick(0)}
                    countBadge={tappedIndices.includes(0) ? 1 : (isPracticeMode ? undefined : 1)}
                    isTapped={tappedIndices.includes(0)}
                  />
                  <CartoonBanana
                    size={98}
                    onClick={() => handleItemClick(1)}
                    countBadge={tappedIndices.includes(1) ? 2 : (isPracticeMode ? undefined : 2)}
                    isTapped={tappedIndices.includes(1)}
                  />
                </>
              )}

              {/* 3: Blue Balls */}
              {currentShot.number === 3 && (
                <>
                  {[0, 1, 2].map((idx) => (
                    <CartoonBall
                      key={idx}
                      size={78}
                      onClick={() => handleItemClick(idx)}
                      countBadge={tappedIndices.includes(idx) ? idx + 1 : (isPracticeMode ? undefined : idx + 1)}
                      isTapped={tappedIndices.includes(idx)}
                    />
                  ))}
                </>
              )}

              {/* 4: Green Leaves */}
              {currentShot.number === 4 && (
                <div className="grid grid-cols-2 gap-1.5">
                  {[0, 1, 2, 3].map((idx) => (
                    <CartoonLeaf
                      key={idx}
                      size={70}
                      onClick={() => handleItemClick(idx)}
                      countBadge={tappedIndices.includes(idx) ? idx + 1 : (isPracticeMode ? undefined : idx + 1)}
                      isTapped={tappedIndices.includes(idx)}
                    />
                  ))}
                </div>
              )}

              {/* 5: Orange Stars */}
              {currentShot.number === 5 && (
                <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[230px]">
                  {[0, 1, 2, 3, 4].map((idx) => (
                    <CartoonStar
                      key={idx}
                      size={60}
                      onClick={() => handleItemClick(idx)}
                      countBadge={tappedIndices.includes(idx) ? idx + 1 : (isPracticeMode ? undefined : idx + 1)}
                      isTapped={tappedIndices.includes(idx)}
                    />
                  ))}
                </div>
              )}

              {/* 6: Pink Flowers */}
              {currentShot.number === 6 && (
                <div className="grid grid-cols-3 gap-2">
                  {[0, 1, 2, 3, 4, 5].map((idx) => (
                    <CartoonFlower
                      key={idx}
                      size={58}
                      onClick={() => handleItemClick(idx)}
                      countBadge={tappedIndices.includes(idx) ? idx + 1 : (isPracticeMode ? undefined : idx + 1)}
                      isTapped={tappedIndices.includes(idx)}
                    />
                  ))}
                </div>
              )}

              {/* 7: Sweet Strawberries */}
              {currentShot.number === 7 && (
                <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-[250px]">
                  {[0, 1, 2, 3, 4, 5, 6].map((idx) => (
                    <CartoonStrawberry
                      key={idx}
                      size={56}
                      onClick={() => handleItemClick(idx)}
                      countBadge={tappedIndices.includes(idx) ? idx + 1 : (isPracticeMode ? undefined : idx + 1)}
                      isTapped={tappedIndices.includes(idx)}
                    />
                  ))}
                </div>
              )}

              {/* 8: Colorful Balloons */}
              {currentShot.number === 8 && (
                <div className="grid grid-cols-4 gap-1.5">
                  {[0, 1, 2, 3, 4, 5, 6, 7].map((idx) => {
                    const colors = ['#42A5F5', '#FF7043', '#AB47BC', '#66BB6A'];
                    return (
                      <CartoonBalloon
                        key={idx}
                        size={52}
                        color={colors[idx % colors.length]}
                        onClick={() => handleItemClick(idx)}
                        countBadge={tappedIndices.includes(idx) ? idx + 1 : (isPracticeMode ? undefined : idx + 1)}
                        isTapped={tappedIndices.includes(idx)}
                      />
                    );
                  })}
                </div>
              )}

              {/* 9: Golden Hearts */}
              {currentShot.number === 9 && (
                <div className="grid grid-cols-3 gap-1.5">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                    <CartoonHeart
                      key={idx}
                      size={50}
                      onClick={() => handleItemClick(idx)}
                      countBadge={tappedIndices.includes(idx) ? idx + 1 : (isPracticeMode ? undefined : idx + 1)}
                      isTapped={tappedIndices.includes(idx)}
                    />
                  ))}
                </div>
              )}

              {/* 10: Butterflies */}
              {currentShot.number === 10 && (
                <div className="grid grid-cols-5 gap-1">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => (
                    <CartoonButterfly
                      key={idx}
                      size={46}
                      onClick={() => handleItemClick(idx)}
                      countBadge={tappedIndices.includes(idx) ? idx + 1 : (isPracticeMode ? undefined : idx + 1)}
                      isTapped={tappedIndices.includes(idx)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Practice Mode hint */}
            {isPracticeMode && (
              <div className="text-2xs font-extrabold px-2.5 py-0.5 bg-white/80 rounded-full text-slate-700 shadow-2xs animate-pulse">
                Дээр нь дарж тоолоорой! 👆
              </div>
            )}
          </div>
        )}

        {/* SHOT 12: Smiling Sun, Confetti & Two Hands 10 Fingers Celebration */}
        {currentShot.id === 12 && (
          <div className="w-full flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <CartoonSun size={115} />
              {/* Both Hands High Five celebration */}
              <div className="flex items-center gap-1">
                <CartoonHand fingersCount={5} isWaving={true} size={95} isLeftHand={true} />
                <CartoonHand fingersCount={5} isWaving={true} size={95} isLeftHand={false} />
              </div>
            </div>
            <div className="bg-amber-100/90 border-2 border-amber-300 px-3.5 py-1 rounded-full shadow-xs text-amber-900 font-black text-sm animate-bounce">
              🌟 1-ээс 10 хүртэл тоолж сурлаа! 🌟
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM FOOTER: Clean Hand Finger Counter (1 to 10) */}
      <div className="z-10 w-full pb-3 px-3 flex items-center justify-between">
        {currentShot.number !== null ? (
          <div className="w-full flex items-center justify-between bg-white/85 backdrop-blur-xs py-1 px-3 rounded-2xl shadow-2xs border border-white/60">
            {/* TwoHandsDisplay in compact footer form */}
            <div className="flex items-center gap-2">
              <TwoHandsDisplay
                totalFingers={currentShot.fingersCount}
                size={40}
                isWaving={false}
              />
            </div>

            {/* Object count badge */}
            <div
              className="text-xs font-black px-2.5 py-1 rounded-xl shadow-2xs"
              style={{
                backgroundColor: currentShot.theme.badgeBg,
                color: currentShot.theme.textColor,
              }}
            >
              {currentShot.objectNameMn}
            </div>
          </div>
        ) : (
          <div className="w-full text-center py-1.5 text-xs font-extrabold text-slate-600 bg-white/60 rounded-xl">
            {currentShot.id === 1 ? 'Хуруунуудаа бэлдээрэй! 🖐️🖐️' : 'Бүгдээрээ чадлаа! Баяр хүргэе! 🎉'}
          </div>
        )}
      </div>
    </div>
  );
};
