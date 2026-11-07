import React from 'react';
import { X, CheckCircle2, Heart, Sparkles, Volume2 } from 'lucide-react';
import { toddlerAudio } from '../../utils/audio.ts';

interface ParentGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentGuideModal: React.FC<ParentGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const vocabulary = [
    {
      num: 'Intro',
      shot: 'Shot 1',
      mn: 'Хуруугаараа тоолъё!',
      ipa: 'Khuruugaaraa tooly!',
      en: "Let's count with our fingers!",
      desc: 'Нөхөрсөг гар даллаж, 1-ээс 10 хүртэл тоолох урилга.',
    },
    {
      num: '1',
      shot: 'Shot 2',
      mn: 'Нэг (1)',
      ipa: 'Neg [neɡ]',
      en: 'One red apple',
      desc: '1 улаан алим, 1 хуруу.',
    },
    {
      num: '2',
      shot: 'Shot 3',
      mn: 'Хоёр (2)',
      ipa: 'Khoyor [xɔir]',
      en: 'Two yellow bananas',
      desc: '2 шар гадил, 2 хуруу.',
    },
    {
      num: '3',
      shot: 'Shot 4',
      mn: 'Гурав (3)',
      ipa: 'Gurav [ɡʊrəw]',
      en: 'Three blue balls',
      desc: '3 цэнхэр бөмбөг, 3 хуруу.',
    },
    {
      num: '4',
      shot: 'Shot 5',
      mn: 'Дөрөв (4)',
      ipa: 'Döröv [dɵrɵw]',
      en: 'Four green leaves',
      desc: '4 ногоон навч, 4 хуруу.',
    },
    {
      num: '5',
      shot: 'Shot 6',
      mn: 'Тав (5)',
      ipa: 'Tav [taw]',
      en: 'Five orange stars',
      desc: '5 шар од, 5 хуруу (бүтэн нэг гар).',
    },
    {
      num: '6',
      shot: 'Shot 7',
      mn: 'Зургаа (6)',
      ipa: 'Zurgaa [dzʊrɢa:]',
      en: 'Six pink flowers',
      desc: '6 ягаан цэцэг, 5 + 1 = 6 хуруу.',
    },
    {
      num: '7',
      shot: 'Shot 8',
      mn: 'Долоо (7)',
      ipa: 'Doloo [dɔlɔ:]',
      en: 'Seven strawberries',
      desc: '7 амтат гүзээлзгэнэ, 5 + 2 = 7 хуруу.',
    },
    {
      num: '8',
      shot: 'Shot 9',
      mn: 'Найм (8)',
      ipa: 'Naim [næ:m]',
      en: 'Eight balloons',
      desc: '8 өнгөлөг бөмбөлөг, 5 + 3 = 8 хуруу.',
    },
    {
      num: '9',
      shot: 'Shot 10',
      mn: 'Ес (9)',
      ipa: 'Ys [jəs]',
      en: 'Nine golden hearts',
      desc: '9 шар зүрххэн, 5 + 4 = 9 хуруу.',
    },
    {
      num: '10',
      shot: 'Shot 11',
      mn: 'Арав (10)',
      ipa: 'Arav [arəw]',
      en: 'Ten butterflies',
      desc: '10 эрвээхэй, 5 + 5 = 10 хуруу (хоёр гар бүтэн).',
    },
    {
      num: '★',
      shot: 'Shot 12',
      mn: 'Баяр хүргэе!',
      ipa: 'Bayar khürgye!',
      en: 'Congratulations! All 10 counted!',
      desc: 'Инээмсэглэсэн нар, конфетти, хоёр гар даллаж буй баяр.',
    },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="parent-guide-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 p-6 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-xl">
              📖
            </div>
            <div>
              <h2 id="parent-guide-title" className="text-xl font-extrabold text-slate-800">
                1-ээс 10 хүртэл тоолох хөтөч
              </h2>
              <p className="text-xs text-slate-500 font-semibold">
                3-6 насны хүүхдэд зориулсан 9:16 видео, дуудлага ба заавар
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Хаах"
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toddler Pedagogy Highlights */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 flex flex-col gap-2.5">
          <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm">
            <Heart className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>Хүүхдэд тоо заах зөвлөмж:</span>
          </div>
          <ul className="text-xs text-amber-900/90 font-medium space-y-1.5 list-disc pl-4">
            <li><strong>Хоёр гар ашиглах:</strong> 1-5 тоог нэг гараар, 6-10 тоог 5 + N буюу хоёр гараар үзүүлж хүүхдэд анхан шатны нийлбэрийг ойлгуулна.</li>
            <li><strong>Shorts / TikTok формат:</strong> 48 секунд үргэлжлэх тул сошиал сувгууд дээр шууд байршуулан хүүхдэд давтан үзүүлэхэд нэн тохиромжтой.</li>
          </ul>
        </div>

        {/* Vocabulary & Pronunciation Table */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-extrabold text-slate-700 uppercase tracking-wider">
            1-ээс 10 хүртэлх монгол үгс ба дуудлага
          </h3>
          <div className="space-y-2">
            {vocabulary.map((v, i) => (
              <div
                key={i}
                className="bg-slate-50 rounded-2xl p-2.5 border border-slate-100 flex items-start justify-between gap-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 text-sm">{v.mn}</span>
                    <button
                      type="button"
                      onClick={() => toddlerAudio.speakMongolian(v.mn)}
                      aria-label={`Сонсох: ${v.mn}`}
                      className="text-amber-600 hover:text-amber-700 p-0.5 rounded-md hover:bg-amber-100 transition-colors"
                      title="Дуудах"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500">
                    {v.ipa} • <span className="text-slate-600 italic">{v.en}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{v.desc}</div>
                </div>
                <div className="w-6 h-6 rounded-lg bg-amber-200/70 text-amber-900 font-extrabold flex items-center justify-center text-xs">
                  {v.num}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm shadow-md transition-all active:scale-98"
        >
          Ойлголоо, видео руу буцах
        </button>
      </div>
    </div>
  );
};
