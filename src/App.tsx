import React, { useState, useEffect, useRef } from 'react';
import {
  SHOTS,
  TOTAL_DURATION,
  getActiveShot,
  getActiveShotIndex,
  getShotProgress,
  formatTime,
  ShotConfig,
} from './utils/timeline.ts';
import { toddlerAudio } from './utils/audio.ts';
import { VideoCanvas } from './components/video/VideoCanvas.tsx';
import { VideoControls } from './components/video/VideoControls.tsx';
import { ParentGuideModal } from './components/ui/ParentGuideModal.tsx';
import { VideoExportModal } from './components/video/VideoExportModal.tsx';
import { Smartphone, Monitor, BookOpen, Volume2, Sparkles, Download, Video } from 'lucide-react';

export default function App() {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(true);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState<boolean>(true);
  const [isPracticeMode, setIsPracticeMode] = useState<boolean>(false);
  const [isPhoneFrame, setIsPhoneFrame] = useState<boolean>(true);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [isGuideOpen, setIsGuideOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastShotIdRef = useRef<number>(-1);
  const lastTimeRef = useRef<number>(performance.now());
  const animFrameRef = useRef<number | null>(null);

  const isPureVideoMode = typeof window !== 'undefined' && window.location.search.includes('pure=1');
  const urlShotParam = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('shot') : null;

  // Active shot derived from currentTime or URL shot param
  const currentShot = isPureVideoMode && urlShotParam
    ? (SHOTS.find((s) => s.id === parseInt(urlShotParam, 10)) || SHOTS[0])
    : getActiveShot(currentTime);
  const shotProgress = getShotProgress(currentTime);

  if (isPureVideoMode) {
    return (
      <div className="w-screen h-screen overflow-hidden flex items-center justify-center bg-slate-900">
        <div style={{ width: '100%', height: '100%', maxWidth: '720px', maxHeight: '1280px', aspectRatio: '9 / 16' }}>
          <VideoCanvas
            currentShot={currentShot}
            shotProgress={0.5}
            isPracticeMode={false}
            showCaptions={true}
          />
        </div>
      </div>
    );
  }

  // Trigger Mongolian voice narration & fanfare whenever a shot boundary is crossed
  useEffect(() => {
    if (!isPlaying) return;

    if (currentShot.id !== lastShotIdRef.current) {
      lastShotIdRef.current = currentShot.id;

      // Speak Mongolian phrase via audio clip
      toddlerAudio.playShotVoice(currentShot.id);

      // Celebration fanfare for final shot (Shot 12)
      if (currentShot.id === 12) {
        toddlerAudio.playCelebrationSparkle();
      }
    }
  }, [currentShot.id, isPlaying]);

  // Main playback timer loop across 48s
  useEffect(() => {
    if (!isPlaying) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    lastTimeRef.current = performance.now();

    const tick = (now: number) => {
      const deltaSec = ((now - lastTimeRef.current) / 1000) * playbackSpeed;
      lastTimeRef.current = now;

      setCurrentTime((prev) => {
        let next = prev + deltaSec;
        if (next >= TOTAL_DURATION) {
          if (isLooping) {
            next = 0;
            lastShotIdRef.current = -1;
          } else {
            next = TOTAL_DURATION;
            setIsPlaying(false);
          }
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
    };
  }, [isPlaying, playbackSpeed, isLooping]);

  // Start background gentle music when playing, stop when paused
  useEffect(() => {
    if (isPlaying && isMusicPlaying && !isMuted) {
      toddlerAudio.startGentleMusic();
    } else {
      toddlerAudio.stopGentleMusic();
    }
  }, [isPlaying, isMusicPlaying, isMuted]);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) {
        toddlerAudio.preloadVoiceClips();
        if (currentTime >= TOTAL_DURATION) {
          setCurrentTime(0);
          lastShotIdRef.current = 1;
          toddlerAudio.playShotVoice(1);
        } else {
          lastShotIdRef.current = currentShot.id;
          toddlerAudio.playShotVoice(currentShot.id);
        }
      }
      return next;
    });
  };

  // Seek to specific timestamp
  const handleSeek = (time: number) => {
    const clamped = Math.max(0, Math.min(time, TOTAL_DURATION));
    setCurrentTime(clamped);
    const shot = getActiveShot(clamped);
    lastShotIdRef.current = shot.id;
    if (isVoiceEnabled && !isMuted) {
      toddlerAudio.playShotVoice(shot.id);
    }
  };

  // Jump directly to Shot 1..12
  const handleSelectShot = (shotId: number) => {
    const target = SHOTS.find((s) => s.id === shotId);
    if (target) {
      handleSeek(target.startTime + 0.05);
    }
  };

  // Sound toggles
  const handleToggleMute = () => {
    const nextMuted = toddlerAudio.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleToggleMusic = () => {
    setIsMusicPlaying((prev) => {
      const next = !prev;
      if (next && isPlaying && !isMuted) {
        toddlerAudio.startGentleMusic();
      } else {
        toddlerAudio.stopGentleMusic();
      }
      return next;
    });
  };

  const handleToggleVoice = () => {
    setIsVoiceEnabled((prev) => {
      const next = !prev;
      toddlerAudio.setVoiceEnabled(next);
      return next;
    });
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        handleTogglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleSeek(currentTime + 2);
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handleSeek(currentTime - 2);
      } else if (e.key >= '1' && e.key <= '9') {
        handleSelectShot(parseInt(e.key, 10));
      } else if (e.key === '0') {
        handleSelectShot(11); // Shot 11 is number 10
      } else if (e.key.toLowerCase() === 'm') {
        handleToggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTime, isPlaying]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-amber-50/60 via-sky-50/50 to-purple-50/60 flex flex-col items-center justify-between p-2 sm:p-5"
    >
      {/* APP TOP BAR */}
      <header className="w-full max-w-5xl flex items-center justify-between py-1.5 sm:py-2 mb-1">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 border-2 border-amber-500 shadow-sm flex items-center justify-center text-xl animate-gentle-bob">
            🖐️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-slate-800 tracking-tight">
                Хуруугаараа тоолъё!
              </h1>
              <span className="inline-block text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                1-10 Тоолж сурцгаая
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-semibold hidden sm:block">
              YouTube Shorts &amp; TikTok-д зориулсан 9:16 босоо, 48 секундын бичлэг
            </p>
          </div>
        </div>

        {/* Viewport, Export & Guide Quick Actions */}
        <div className="flex items-center gap-2">
          {/* Direct Video Export Button in Header */}
          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white text-xs font-black shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Video className="w-3.5 h-3.5" />
            <span>Shorts/TikTok татах</span>
          </button>

          {/* Phone Frame Toggle */}
          <button
            type="button"
            onClick={() => setIsPhoneFrame((prev) => !prev)}
            aria-label="Frame toggle"
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isPhoneFrame
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-white text-slate-600 border border-slate-200'
            }`}
          >
            {isPhoneFrame ? <Smartphone className="w-3.5 h-3.5" /> : <Monitor className="w-3.5 h-3.5" />}
            <span>{isPhoneFrame ? '9:16 Хүрээ' : 'Хүрээгүй'}</span>
          </button>

          {/* Educational Guide Button */}
          <button
            type="button"
            onClick={() => setIsGuideOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold shadow-2xs transition-all active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Хөтөч</span>
          </button>
        </div>
      </header>

      {/* MAIN CENTER: Vertical 9:16 Video Player Container */}
      <main className="w-full flex-1 flex flex-col items-center justify-center my-0.5">
        <div
          className={`relative transition-all duration-300 flex items-center justify-center ${
            isPhoneFrame
              ? 'p-2.5 bg-slate-900 rounded-[40px] shadow-2xl ring-10 ring-slate-800/20'
              : 'rounded-3xl shadow-xl'
          }`}
          style={{
            width: '100%',
            maxWidth: '330px',
            aspectRatio: '9 / 16',
            maxHeight: 'min(500px, calc(100vh - 250px))',
          }}
        >
          {/* Phone Speaker & Notch decoration if phone frame is on */}
          {isPhoneFrame && (
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-slate-800 rounded-full flex items-center justify-center z-30 opacity-70 pointer-events-none">
              <div className="w-6 h-1 bg-slate-700 rounded-full" />
              <div className="w-1.5 h-1.5 ml-2 rounded-full bg-slate-700" />
            </div>
          )}

          {/* Internal Video Viewport */}
          <div
            className={`w-full h-full overflow-hidden ${
              isPhoneFrame ? 'rounded-[32px]' : 'rounded-3xl'
            }`}
          >
            <VideoCanvas
              currentShot={currentShot}
              shotProgress={shotProgress}
              isPracticeMode={isPracticeMode}
              showCaptions={showCaptions}
            />
          </div>

          {/* Quick Overlay Play/Pause Button on Video when paused */}
          {!isPlaying && (
            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label="Play video"
              className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-amber-500/80 hover:bg-amber-500 text-white flex items-center justify-center shadow-lg backdrop-blur-xs transition-all hover:scale-110 active:scale-95 z-20 cursor-pointer border-2 border-white/80"
            >
              <div className="w-0 h-0 border-y-8 border-y-transparent border-l-14 border-l-white ml-1" />
            </button>
          )}

          {/* Practice Mode Active Pill */}
          {isPracticeMode && (
            <div className="absolute top-4 right-4 z-30 bg-rose-500 text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full shadow-md animate-pulse">
              Өөрөө тоолох горим ✨
            </div>
          )}
        </div>
      </main>

      {/* BOTTOM CONTROLLER DOCK */}
      <footer className="w-full max-w-xl mt-1">
        <VideoControls
          isPlaying={isPlaying}
          currentTime={currentTime}
          currentShot={currentShot}
          isMuted={isMuted}
          isMusicPlaying={isMusicPlaying}
          isVoiceEnabled={isVoiceEnabled}
          isPracticeMode={isPracticeMode}
          isLooping={isLooping}
          playbackSpeed={playbackSpeed}
          onTogglePlay={handleTogglePlay}
          onSeek={handleSeek}
          onToggleMute={handleToggleMute}
          onToggleMusic={handleToggleMusic}
          onToggleVoice={handleToggleVoice}
          onTogglePracticeMode={() => setIsPracticeMode((prev) => !prev)}
          onToggleLoop={() => setIsLooping((prev) => !prev)}
          onChangeSpeed={(spd) => setPlaybackSpeed(spd)}
          onSelectShot={handleSelectShot}
          onOpenParentGuide={() => setIsGuideOpen(true)}
          onOpenExportModal={() => setIsExportModalOpen(true)}
          onToggleFullscreen={handleToggleFullscreen}
        />
      </footer>

      {/* MODALS */}
      <ParentGuideModal isOpen={isGuideOpen} onClose={() => setIsGuideOpen(false)} />
      <VideoExportModal isOpen={isExportModalOpen} onClose={() => setIsExportModalOpen(false)} />
    </div>
  );
}
