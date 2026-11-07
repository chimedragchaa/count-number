import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Music,
  Mic,
  Maximize2,
  Sparkles,
  BookOpen,
  FastForward,
  Download,
  Share2,
} from 'lucide-react';
import { SHOTS, ShotConfig, formatTime, formatTimeWithTenths, TOTAL_DURATION } from '../../utils/timeline.ts';

interface VideoControlsProps {
  isPlaying: boolean;
  currentTime: number;
  currentShot: ShotConfig;
  isMuted: boolean;
  isMusicPlaying: boolean;
  isVoiceEnabled: boolean;
  isPracticeMode: boolean;
  isLooping: boolean;
  playbackSpeed: number;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onToggleMute: () => void;
  onToggleMusic: () => void;
  onToggleVoice: () => void;
  onTogglePracticeMode: () => void;
  onToggleLoop: () => void;
  onChangeSpeed: (speed: number) => void;
  onSelectShot: (shotId: number) => void;
  onOpenParentGuide: () => void;
  onOpenExportModal: () => void;
  onToggleFullscreen: () => void;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  isPlaying,
  currentTime,
  currentShot,
  isMuted,
  isMusicPlaying,
  isVoiceEnabled,
  isPracticeMode,
  isLooping,
  playbackSpeed,
  onTogglePlay,
  onSeek,
  onToggleMute,
  onToggleMusic,
  onToggleVoice,
  onTogglePracticeMode,
  onToggleLoop,
  onChangeSpeed,
  onSelectShot,
  onOpenParentGuide,
  onOpenExportModal,
  onToggleFullscreen,
}) => {
  const progressPercent = Math.min(100, Math.max(0, (currentTime / TOTAL_DURATION) * 100));

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    onSeek(pos * TOTAL_DURATION);
  };

  return (
    <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-3 sm:p-4 shadow-xl border border-slate-100 flex flex-col gap-3">
      {/* TIMELINE SCRUBBER */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500">
          <span className="flex items-center gap-1.5 text-slate-700">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
            {formatTime(currentTime)} ({formatTimeWithTenths(currentTime)})
          </span>
          <span className="font-extrabold text-amber-600 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            {currentShot.shotNumber}-р хэсэг: {currentShot.text}
          </span>
          <span>{formatTime(TOTAL_DURATION)}</span>
        </div>

        {/* Interactive Scrub Bar */}
        <div
          role="slider"
          aria-label="Video timeline scrubber"
          aria-valuemin={0}
          aria-valuemax={TOTAL_DURATION}
          aria-valuenow={currentTime}
          tabIndex={0}
          onClick={handleProgressBarClick}
          className="relative w-full h-3.5 bg-slate-100 rounded-full cursor-pointer overflow-hidden p-0.5 group focus:outline-hidden focus:ring-2 focus:ring-amber-400"
        >
          {/* Shot segment dividers for all 12 shots */}
          {SHOTS.map((s, idx) => (
            <div
              key={s.id}
              className="absolute top-0 bottom-0 border-r border-slate-300 z-10 opacity-50"
              style={{ left: `${(s.startTime / TOTAL_DURATION) * 100}%` }}
              title={`Shot ${idx + 1}: ${s.text}`}
            />
          ))}

          {/* Progress fill */}
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-full transition-all duration-100"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* SHOT PICKER TABS (12 Shots: Intro, 1..10, Outro) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
        {SHOTS.map((s) => {
          const isActive = s.id === currentShot.id;
          return (
            <button
              key={s.id}
              type="button"
              aria-label={`Shot ${s.shotNumber}: ${s.text}`}
              onClick={() => onSelectShot(s.id)}
              className={`flex-shrink-0 px-2.5 py-1 rounded-xl font-bold text-xs transition-all duration-200 flex items-center gap-1 ${
                isActive
                  ? 'bg-amber-500 text-white shadow-md scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{s.shotNumber === 1 ? '🖐️' : s.shotNumber === 12 ? '🎉' : `${s.number}`}</span>
              <span className="hidden md:inline">{s.text}</span>
            </button>
          );
        })}
      </div>

      {/* PRIMARY CONTROLS ROW */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-slate-100">
        {/* Left: Playback toggles */}
        <div className="flex items-center gap-1.5">
          {/* Main Play/Pause Button */}
          <button
            type="button"
            onClick={onTogglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
            className="w-10 h-10 rounded-2xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white flex items-center justify-center shadow-md transition-transform"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-white" /> : <Play className="w-5 h-5 fill-white ml-0.5" />}
          </button>

          {/* Replay */}
          <button
            type="button"
            onClick={() => onSeek(0)}
            aria-label="Replay from start"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 flex items-center justify-center transition-all"
            title="Эхнээс нь эхлүүлэх"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Loop toggle */}
          <button
            type="button"
            onClick={onToggleLoop}
            aria-label={isLooping ? 'Disable repeat' : 'Enable repeat'}
            className={`px-2.5 h-9 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
              isLooping ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-slate-100 text-slate-500'
            }`}
          >
            <span>Давтах</span>
          </button>

          {/* Speed toggle */}
          <button
            type="button"
            onClick={() => onChangeSpeed(playbackSpeed === 1.0 ? 0.75 : 1.0)}
            aria-label="Change playback speed"
            className={`px-2.5 h-9 rounded-xl font-bold text-xs flex items-center gap-1 transition-all ${
              playbackSpeed < 1.0 ? 'bg-purple-100 text-purple-800 border border-purple-300' : 'bg-slate-100 text-slate-600'
            }`}
            title="Хурд тохируулах"
          >
            <FastForward className="w-3.5 h-3.5" />
            <span>{playbackSpeed === 1.0 ? '1.0x' : '0.75x'}</span>
          </button>
        </div>

        {/* Right: Export button & Audio toggles */}
        <div className="flex items-center gap-1.5">
          {/* YouTube Shorts & TikTok Download Button */}
          <button
            type="button"
            onClick={onOpenExportModal}
            aria-label="Download video for YouTube Shorts and TikTok"
            className="px-3 h-9 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-extrabold text-xs shadow-md flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>YouTube / TikTok татах</span>
          </button>

          {/* Interactive Tap-to-Count Practice Mode */}
          <button
            type="button"
            onClick={onTogglePracticeMode}
            aria-label="Toggle toddler interactive practice mode"
            className={`px-3 h-9 rounded-xl font-extrabold text-xs flex items-center gap-1.5 transition-all shadow-2xs ${
              isPracticeMode
                ? 'bg-rose-500 text-white shadow-md animate-pulse'
                : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
            }`}
            title="Дэлгэц дээр өөрөө дарж тоолох"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{isPracticeMode ? 'Тоолох горим ✨' : 'Өөрөө тоолох 👆'}</span>
          </button>

          {/* Music Lullaby toggle */}
          <button
            type="button"
            onClick={onToggleMusic}
            aria-label={isMusicPlaying ? 'Stop music' : 'Play lullaby music'}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isMusicPlaying ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-100 text-slate-400'
            }`}
            title="Ая хөгжим"
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Mongolian Voice toggle */}
          <button
            type="button"
            onClick={onToggleVoice}
            aria-label={isVoiceEnabled ? 'Mute voice' : 'Enable voice'}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isVoiceEnabled ? 'bg-sky-100 text-sky-800 border border-sky-300' : 'bg-slate-100 text-slate-400'
            }`}
            title="Монгол дуу хоолой"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Master Sound Mute */}
          <button
            type="button"
            onClick={onToggleMute}
            aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
              isMuted ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Parent Guide */}
          <button
            type="button"
            onClick={onOpenParentGuide}
            aria-label="Parent and educator guide"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all"
            title="Хөтөч"
          >
            <BookOpen className="w-4 h-4" />
          </button>

          {/* Fullscreen */}
          <button
            type="button"
            onClick={onToggleFullscreen}
            aria-label="Toggle fullscreen"
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-all"
            title="Бүтэн дэлгэц"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
