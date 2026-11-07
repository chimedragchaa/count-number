export interface ShotConfig {
  id: number;
  shotNumber: number;
  startTime: number;
  endTime: number;
  duration: number;
  text: string;
  subtext?: string;
  pronunciation: string;
  meaning: string;
  number: number | null;
  objectCount: number;
  objectType:
    | 'hand_wave'
    | 'apple'
    | 'banana'
    | 'ball'
    | 'leaf'
    | 'star'
    | 'flower'
    | 'strawberry'
    | 'balloon'
    | 'heart'
    | 'butterfly'
    | 'celebration';
  objectNameMn?: string;
  objectNameEn?: string;
  fingersCount: number; // 0 to 10
  leftHandFingers?: number;
  rightHandFingers?: number;
  theme: {
    bg: string;
    bgAccent: string;
    numberBg: string;
    numberBorder: string;
    textColor: string;
    badgeBg: string;
  };
}

export const TOTAL_DURATION = 48.0;

export const SHOTS: ShotConfig[] = [
  {
    id: 1,
    shotNumber: 1,
    startTime: 0.0,
    endTime: 3.5,
    duration: 3.5,
    text: "Хуруугаараа тоолъё!",
    subtext: "1-ээс 10 хүртэл хамтдаа тоолцгооё 🖐️🖐️",
    pronunciation: "Khuruugaaraa tooly!",
    meaning: "Let's count from 1 to 10 with our fingers!",
    number: null,
    objectCount: 0,
    objectType: 'hand_wave',
    fingersCount: 5,
    theme: {
      bg: '#EDE7F6', // Gentle pastel lavender
      bgAccent: '#D1C4E9',
      numberBg: '#7E57C2',
      numberBorder: '#5E35B1',
      textColor: '#4527A0',
      badgeBg: '#D1C4E9',
    },
  },
  {
    id: 2,
    shotNumber: 2,
    startTime: 3.5,
    endTime: 7.5,
    duration: 4.0,
    text: "Нэг",
    subtext: "Нэг улаан алим 🍎",
    pronunciation: "Neg [neɡ]",
    meaning: "One red apple",
    number: 1,
    objectCount: 1,
    objectType: 'apple',
    objectNameMn: "1 алим",
    objectNameEn: "One apple",
    fingersCount: 1,
    leftHandFingers: 1,
    rightHandFingers: 0,
    theme: {
      bg: '#E0F7FA', // Soft pastel baby cyan
      bgAccent: '#B2EBF2',
      numberBg: '#FF5252',
      numberBorder: '#D32F2F',
      textColor: '#C2185B',
      badgeBg: '#FFCDD2',
    },
  },
  {
    id: 3,
    shotNumber: 3,
    startTime: 7.5,
    endTime: 11.5,
    duration: 4.0,
    text: "Хоёр",
    subtext: "Хоёр шар гадил 🍌🍌",
    pronunciation: "Khoyor [xɔir]",
    meaning: "Two yellow bananas",
    number: 2,
    objectCount: 2,
    objectType: 'banana',
    objectNameMn: "2 гадил",
    objectNameEn: "Two bananas",
    fingersCount: 2,
    leftHandFingers: 2,
    rightHandFingers: 0,
    theme: {
      bg: '#FFF8E1', // Soft pastel butter
      bgAccent: '#FFECB3',
      numberBg: '#FFA000',
      numberBorder: '#FF6F00',
      textColor: '#E65100',
      badgeBg: '#FFE082',
    },
  },
  {
    id: 4,
    shotNumber: 4,
    startTime: 11.5,
    endTime: 15.5,
    duration: 4.0,
    text: "Гурав",
    subtext: "Гурав хөх бөмбөг ⚽⚽⚽",
    pronunciation: "Gurav [ɡʊrəw]",
    meaning: "Three blue balls",
    number: 3,
    objectCount: 3,
    objectType: 'ball',
    objectNameMn: "3 бөмбөг",
    objectNameEn: "Three blue balls",
    fingersCount: 3,
    leftHandFingers: 3,
    rightHandFingers: 0,
    theme: {
      bg: '#FCE4EC', // Soft pastel blush
      bgAccent: '#F8BBD0',
      numberBg: '#1E88E5',
      numberBorder: '#1565C0',
      textColor: '#0D47A1',
      badgeBg: '#BBDEFB',
    },
  },
  {
    id: 5,
    shotNumber: 5,
    startTime: 15.5,
    endTime: 19.5,
    duration: 4.0,
    text: "Дөрөв",
    subtext: "Дөрөв ногоон навч 🍃🍃🍃🍃",
    pronunciation: "Döröv [dɵrɵw]",
    meaning: "Four green leaves",
    number: 4,
    objectCount: 4,
    objectType: 'leaf',
    objectNameMn: "4 навч",
    objectNameEn: "Four green leaves",
    fingersCount: 4,
    leftHandFingers: 4,
    rightHandFingers: 0,
    theme: {
      bg: '#F1F8E9', // Soft pastel sage
      bgAccent: '#DCEDC8',
      numberBg: '#43A047',
      numberBorder: '#2E7D32',
      textColor: '#1B5E20',
      badgeBg: '#C8E6C9',
    },
  },
  {
    id: 6,
    shotNumber: 6,
    startTime: 19.5,
    endTime: 23.5,
    duration: 4.0,
    text: "Тав",
    subtext: "Тав шар од ⭐⭐⭐⭐⭐",
    pronunciation: "Tav [taw]",
    meaning: "Five orange stars",
    number: 5,
    objectCount: 5,
    objectType: 'star',
    objectNameMn: "5 од",
    objectNameEn: "Five orange stars",
    fingersCount: 5,
    leftHandFingers: 5,
    rightHandFingers: 0,
    theme: {
      bg: '#E1F5FE', // Soft pastel azure
      bgAccent: '#B3E5FC',
      numberBg: '#FB8C00',
      numberBorder: '#EF6C00',
      textColor: '#E65100',
      badgeBg: '#FFE0B2',
    },
  },
  {
    id: 7,
    shotNumber: 7,
    startTime: 23.5,
    endTime: 27.5,
    duration: 4.0,
    text: "Зургаа",
    subtext: "Зургаан ягаан цэцэг 🌸🌸🌸🌸🌸🌸",
    pronunciation: "Zurgaa [dzʊrɢa:]",
    meaning: "Six pink flowers (5 + 1)",
    number: 6,
    objectCount: 6,
    objectType: 'flower',
    objectNameMn: "6 цэцэг",
    objectNameEn: "Six pink flowers",
    fingersCount: 6,
    leftHandFingers: 5,
    rightHandFingers: 1,
    theme: {
      bg: '#F3E5F5', // Soft pastel orchid
      bgAccent: '#E1BEE7',
      numberBg: '#EC407A',
      numberBorder: '#C2185B',
      textColor: '#880E4F',
      badgeBg: '#F8BBD0',
    },
  },
  {
    id: 8,
    shotNumber: 8,
    startTime: 27.5,
    endTime: 31.5,
    duration: 4.0,
    text: "Долоо",
    subtext: "Долоон амтат гүзээлзгэнэ 🍓🍓🍓🍓🍓🍓🍓",
    pronunciation: "Doloo [dɔlɔ:]",
    meaning: "Seven strawberries (5 + 2)",
    number: 7,
    objectCount: 7,
    objectType: 'strawberry',
    objectNameMn: "7 гүзээлзгэнэ",
    objectNameEn: "Seven strawberries",
    fingersCount: 7,
    leftHandFingers: 5,
    rightHandFingers: 2,
    theme: {
      bg: '#FFEBEE', // Soft pastel strawberry milk
      bgAccent: '#FFCDD2',
      numberBg: '#E91E63',
      numberBorder: '#C2185B',
      textColor: '#B71C1C',
      badgeBg: '#FFCDD2',
    },
  },
  {
    id: 9,
    shotNumber: 9,
    startTime: 31.5,
    endTime: 35.5,
    duration: 4.0,
    text: "Найм",
    subtext: "Найман хөөрхөн бөмбөлөг 🎈🎈🎈🎈🎈🎈🎈🎈",
    pronunciation: "Naim [næ:m]",
    meaning: "Eight balloons (5 + 3)",
    number: 8,
    objectCount: 8,
    objectType: 'balloon',
    objectNameMn: "8 бөмбөлөг",
    objectNameEn: "Eight balloons",
    fingersCount: 8,
    leftHandFingers: 5,
    rightHandFingers: 3,
    theme: {
      bg: '#E8F5E9', // Soft pastel mint
      bgAccent: '#C8E6C9',
      numberBg: '#00ACC1',
      numberBorder: '#00838F',
      textColor: '#006064',
      badgeBg: '#B2EBF2',
    },
  },
  {
    id: 10,
    shotNumber: 10,
    startTime: 35.5,
    endTime: 39.5,
    duration: 4.0,
    text: "Ес",
    subtext: "Есөн шар зүрххэн 💛💛💛💛💛💛💛💛💛",
    pronunciation: "Ys [jəs]",
    meaning: "Nine golden hearts (5 + 4)",
    number: 9,
    objectCount: 9,
    objectType: 'heart',
    objectNameMn: "9 зүрх",
    objectNameEn: "Nine hearts",
    fingersCount: 9,
    leftHandFingers: 5,
    rightHandFingers: 4,
    theme: {
      bg: '#FFFDE7', // Soft pastel sunny cream
      bgAccent: '#FFF9C4',
      numberBg: '#FFB300',
      numberBorder: '#FF8F00',
      textColor: '#E65100',
      badgeBg: '#FFE082',
    },
  },
  {
    id: 11,
    shotNumber: 11,
    startTime: 39.5,
    endTime: 43.5,
    duration: 4.0,
    text: "Арав",
    subtext: "Арван хөөрхөн эрвээхэй 🦋🦋🦋🦋🦋🦋🦋🦋🦋🦋",
    pronunciation: "Arav [arəw]",
    meaning: "Ten butterflies (5 + 5 = 10)",
    number: 10,
    objectCount: 10,
    objectType: 'butterfly',
    objectNameMn: "10 эрвээхэй",
    objectNameEn: "Ten butterflies",
    fingersCount: 10,
    leftHandFingers: 5,
    rightHandFingers: 5,
    theme: {
      bg: '#E0F2F1', // Soft pastel turquoise aqua
      bgAccent: '#B2DFDB',
      numberBg: '#26A69A',
      numberBorder: '#00897B',
      textColor: '#004D40',
      badgeBg: '#80CBC4',
    },
  },
  {
    id: 12,
    shotNumber: 12,
    startTime: 43.5,
    endTime: 48.0,
    duration: 4.5,
    text: "Баяр хүргэе!",
    subtext: "1-ээс 10 хүртэл бүгдийг сурлаа! 🌟🎉",
    pronunciation: "Bayar khürgye!",
    meaning: "Congratulations! We counted from 1 to 10!",
    number: null,
    objectCount: 10,
    objectType: 'celebration',
    fingersCount: 10,
    leftHandFingers: 5,
    rightHandFingers: 5,
    theme: {
      bg: '#FFF3E0', // Celebratory warm pastel
      bgAccent: '#FFE0B2',
      numberBg: '#FFB300',
      numberBorder: '#FF8F00',
      textColor: '#BF360C',
      badgeBg: '#FFCC80',
    },
  },
];

/**
 * Returns the active shot index (0 to 11) for a given timestamp in seconds.
 */
export function getActiveShotIndex(currentTime: number): number {
  const clamped = Math.max(0, Math.min(currentTime, TOTAL_DURATION));
  const idx = SHOTS.findIndex(shot => clamped >= shot.startTime && clamped < shot.endTime);
  return idx !== -1 ? idx : SHOTS.length - 1;
}

/**
 * Returns the active shot object for a given timestamp.
 */
export function getActiveShot(currentTime: number): ShotConfig {
  const index = getActiveShotIndex(currentTime);
  return SHOTS[index];
}

/**
 * Returns progress (0.0 to 1.0) through the current shot.
 */
export function getShotProgress(currentTime: number, shotIndex?: number): number {
  const idx = shotIndex !== undefined ? shotIndex : getActiveShotIndex(currentTime);
  const shot = SHOTS[idx];
  if (!shot) return 0;
  const elapsed = Math.max(0, currentTime - shot.startTime);
  return Math.min(1.0, elapsed / shot.duration);
}

/**
 * Formats time in seconds as MM:SS (e.g. 00:08).
 */
export function formatTime(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(s / 60);
  const secs = s % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formats seconds with tenths (e.g. 04.2s).
 */
export function formatTimeWithTenths(seconds: number): string {
  const clamped = Math.max(0, Math.min(seconds, TOTAL_DURATION));
  return `${clamped.toFixed(1)}s`;
}
