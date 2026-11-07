import React, { useState } from 'react';
import { X, Download, Share2, Copy, Check, Video, Play, Sparkles, CheckCircle2 } from 'lucide-react';

interface VideoExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoExportModal: React.FC<VideoExportModalProps> = ({ isOpen, onClose }) => {
  const [copiedTitle, setCopiedTitle] = useState<boolean>(false);
  const [copiedTags, setCopiedTags] = useState<boolean>(false);
  const [downloadInitiated, setDownloadInitiated] = useState<boolean>(false);

  if (!isOpen) return null;

  const mp4Url = "/video/khuruugaaraa_tooly_1_to_10.mp4";
  const webmUrl = "/video/khuruugaaraa_tooly_1_to_10.webm";

  const ytTitle = "Хуруугаараа тоолъё! 🖐️ (1-ээс 10 хүртэл тоолж сурцгаая) #Shorts #TikTok";
  const ytTags = "#Shorts #TikTok #хүүхдийндуу #хүүхдэдзориулсан #монголхэл #тоосурах #хүүхэлдэйнкино #1to10counting";

  const handleCopyTitle = () => {
    navigator.clipboard.writeText(ytTitle);
    setCopiedTitle(true);
    setTimeout(() => setCopiedTitle(false), 2000);
  };

  const handleCopyTags = () => {
    navigator.clipboard.writeText(ytTags);
    setCopiedTags(true);
    setTimeout(() => setCopiedTags(false), 2000);
  };

  const handleDownloadClick = () => {
    setDownloadInitiated(true);
    setTimeout(() => setDownloadInitiated(false), 3000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="video-export-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-100 p-5 sm:p-6 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 id="video-export-title" className="text-lg sm:text-xl font-black text-slate-800">
                YouTube Shorts &amp; TikTok бичлэг
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                9:16 босоо, 48 сек, 1-10 тоолох бичлэг татаж авах
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Хаах"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Preview Card: Real HTML5 Video Player */}
        <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-inner flex flex-col items-center justify-center p-2">
          <div className="relative w-full max-w-[220px] aspect-[9/16] rounded-xl overflow-hidden bg-black shadow-md border border-slate-700">
            <video
              src={mp4Url}
              controls
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="text-[11px] text-slate-400 mt-2 font-medium">
            Дээрх тоглуулагчаас бичлэгийг шууд үзэж шалгах боломжтой 👆
          </span>
        </div>

        {/* Video Technical Specs */}
        <div className="grid grid-cols-4 gap-1.5 text-center">
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[9px] uppercase font-bold text-slate-400">Формат</div>
            <div className="text-xs font-black text-slate-800">MP4 (H.264)</div>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[9px] uppercase font-bold text-slate-400">Харьцаа</div>
            <div className="text-xs font-black text-slate-800">9:16 Босоо</div>
          </div>
          <div className="p-2 rounded-xl bg-slate-50 border border-slate-100">
            <div className="text-[9px] uppercase font-bold text-slate-400">Хугацаа</div>
            <div className="text-xs font-black text-slate-800">48 сек</div>
          </div>
          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-100">
            <div className="text-[9px] uppercase font-bold text-emerald-600">Хэмжээ</div>
            <div className="text-xs font-black text-emerald-700">1.0 MB</div>
          </div>
        </div>

        {/* Download Buttons Section */}
        <div className="flex flex-col gap-2">
          {/* Primary MP4 Download Button (Universal for iPhone, Android, TikTok, YouTube) */}
          <a
            href={mp4Url}
            download="khuruugaaraa_tooly_1_to_10.mp4"
            onClick={handleDownloadClick}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 active:scale-98 text-white font-black text-sm shadow-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer"
          >
            <Download className="w-5 h-5" />
            <span>MP4 Бичлэг татах (1.0 MB) — Санал болгох</span>
          </a>

          {/* Alternate WebM download */}
          <a
            href={webmUrl}
            download="khuruugaaraa_tooly_1_to_10.webm"
            className="w-full py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>WebM хувилбар татах (1.1 MB)</span>
          </a>

          {downloadInitiated && (
            <div className="p-2 rounded-xl bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold text-center flex items-center justify-center gap-1.5 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Бичлэг амжилттай татагдаж байна! Татаж авсан фолдероо шалгана уу.</span>
            </div>
          )}
        </div>

        {/* Copy-paste Title & Tags for YouTube Shorts & TikTok */}
        <div className="flex flex-col gap-2 pt-1 border-t border-slate-100">
          <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
            Бичлэг оруулах гарчиг ба хаштаг
          </div>

          {/* Title box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center justify-between gap-2">
            <div className="text-xs font-bold text-slate-800 truncate">
              {ytTitle}
            </div>
            <button
              type="button"
              onClick={handleCopyTitle}
              className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-1 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {copiedTitle ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedTitle ? 'Хууллаа!' : 'Хуулах'}</span>
            </button>
          </div>

          {/* Tags box */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex items-center justify-between gap-2">
            <div className="text-xs text-slate-600 truncate">
              {ytTags}
            </div>
            <button
              type="button"
              onClick={handleCopyTags}
              className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-extrabold text-xs flex items-center gap-1 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              {copiedTags ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              <span>{copiedTags ? 'Хууллаа!' : 'Хуулах'}</span>
            </button>
          </div>
        </div>

        {/* YouTube & TikTok upload guidance */}
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2">
          <Share2 className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-rose-900 leading-relaxed font-medium">
            <strong>Оруулах заавар:</strong> Татаж авсан <code>.mp4</code> бичлэг нь стандартын H.264/AAC кодтой тул утсан дээрээ болон компьютерээсээ шууд YouTube эсвэл TikTok руу оруулахад шууд танигдаж, 9:16 Shorts хэлбэрээр байршина.
          </div>
        </div>
      </div>
    </div>
  );
};
