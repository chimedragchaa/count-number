import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { SHOTS, TOTAL_DURATION } from '../src/utils/timeline.ts';

const tempDir = path.resolve('.temp_video_build');
const outDir = path.resolve('public/video');
const audioDir = path.resolve('public/audio');

if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

console.log('--- Building Complete Video with Crystal Clear Mongolian Voice & Music ---');

// 1. Generate gentle lullaby music track (48s, 44100Hz stereo)
console.log('1. Generating 48s gentle lullaby marimba music...');
const sampleRate = 44100;
const numChannels = 2;
const totalSamples = Math.floor(sampleRate * TOTAL_DURATION);
const lullabyBuffer = Buffer.alloc(44 + totalSamples * numChannels * 2);

lullabyBuffer.write('RIFF', 0);
lullabyBuffer.writeUInt32LE(36 + totalSamples * numChannels * 2, 4);
lullabyBuffer.write('WAVE', 8);
lullabyBuffer.write('fmt ', 12);
lullabyBuffer.writeUInt32LE(16, 16);
lullabyBuffer.writeUInt16LE(1, 20); // PCM
lullabyBuffer.writeUInt16LE(numChannels, 22);
lullabyBuffer.writeUInt32LE(sampleRate, 24);
lullabyBuffer.writeUInt32LE(sampleRate * numChannels * 2, 28);
lullabyBuffer.writeUInt16LE(numChannels * 2, 32);
lullabyBuffer.writeUInt16LE(16, 34);
lullabyBuffer.write('data', 36);
lullabyBuffer.writeUInt32LE(totalSamples * numChannels * 2, 40);

const melodyNotes = [261.63, 329.63, 392.00, 523.25, 440.00, 392.00, 329.63, 261.63, 293.66, 392.00, 440.00, 523.25];
const bassNotes = [130.81, 130.81, 164.81, 164.81, 174.61, 174.61, 196.00, 196.00];

let byteOffset = 44;
for (let i = 0; i < totalSamples; i++) {
  const t = i / sampleRate;

  // Gentle marimba melody (volume 0.18)
  const noteIdx = Math.floor(t * 2.2) % melodyNotes.length;
  const noteFreq = melodyNotes[noteIdx];
  const notePhase = (t * 2.2) % 1.0;
  const noteEnv = Math.exp(-notePhase * 4.2);
  const lullabySample = Math.sin(2 * Math.PI * noteFreq * t) * 0.18 * noteEnv;

  // Bass
  const bassIdx = Math.floor(t * 0.55) % bassNotes.length;
  const bassFreq = bassNotes[bassIdx];
  const bassEnv = Math.exp(-((t * 0.55) % 1.0) * 2.8);
  const bassSample = Math.sin(2 * Math.PI * bassFreq * t) * 0.10 * bassEnv;

  const mixed = Math.max(-0.85, Math.min(0.85, lullabySample + bassSample));
  const intVal = Math.round(mixed * 32767);

  lullabyBuffer.writeInt16LE(intVal, byteOffset);
  lullabyBuffer.writeInt16LE(intVal, byteOffset + 2);
  byteOffset += 4;
}

const lullabyPath = path.join(tempDir, 'lullaby.wav');
fs.writeFileSync(lullabyPath, lullabyBuffer);
console.log(`Lullaby music saved to ${lullabyPath}`);

// 2. Mix Lullaby + 12 Mongolian spoken voice clips using FFmpeg adelay & amix
console.log('2. Mixing background music and 12 spoken Mongolian voice clips...');
const inputArgs: string[] = [`-i "${lullabyPath}"`];
const filterDelays: string[] = [];

for (let shotIdx = 0; shotIdx < SHOTS.length; shotIdx++) {
  const shot = SHOTS[shotIdx];
  const clipFile = path.join(audioDir, `shot_${shot.id.toString().padStart(2, '0')}.wav`);
  inputArgs.push(`-i "${clipFile}"`);

  // Start voice clip 300ms after shot cut for smooth audio presence
  const delayMs = Math.round((shot.startTime + 0.3) * 1000);
  const inputNum = shotIdx + 1; // 0 is lullaby, 1..12 are voice clips
  filterDelays.push(`[${inputNum}:a]adelay=${delayMs}|${delayMs},volume=2.2[v${inputNum}]`);
}

// Mix inputs: 0 (music) + v1..v12 (voice clips)
const allVoiceTags = filterDelays.map((_, i) => `[v${i + 1}]`).join('');
const filterComplex = [
  ...filterDelays,
  `[0:a]volume=0.35[bg]`,
  `[bg]${allVoiceTags}amix=inputs=13:duration=first:dropout_transition=2,volume=1.4[aout]`
].join(';');

const mixedAudioPath = path.join(tempDir, 'soundtrack_mixed.wav');
const mixCmd = `ffmpeg -y ${inputArgs.join(' ')} -filter_complex "${filterComplex}" -map "[aout]" -ar 44100 -ac 2 "${mixedAudioPath}"`;
execSync(mixCmd, { stdio: 'inherit' });
console.log(`Mixed soundtrack written to ${mixedAudioPath}`);

// 3. Concat demuxer for video frames
const concatPath = path.join(tempDir, 'concat_shots.txt');
let concatContent = '';
for (const shot of SHOTS) {
  const frameFile = `shot_${shot.id.toString().padStart(2, '0')}.png`;
  concatContent += `file '${frameFile}'\nduration ${shot.duration.toFixed(2)}\n`;
}
concatContent += `file 'shot_12.png'\n`;
fs.writeFileSync(concatPath, concatContent);

// 4. Encode MP4
const outMp4 = path.join(outDir, 'khuruugaaraa_tooly_1_to_10.mp4');
console.log('4. Encoding MP4 with FFmpeg (H.264 / AAC / yuv420p)...');

const ffmpegCmd = [
  'ffmpeg -y',
  `-f concat -safe 0 -i "${concatPath}"`,
  `-i "${mixedAudioPath}"`,
  '-c:v libx264',
  '-preset medium',
  '-crf 20',
  '-pix_fmt yuv420p',
  '-c:a aac',
  '-b:a 192k',
  '-r 30',
  '-t 48.0',
  '-movflags +faststart',
  `"${outMp4}"`
].join(' ');

execSync(ffmpegCmd, { stdio: 'inherit', cwd: tempDir });

// 5. Encode WebM
const outWebm = path.join(outDir, 'khuruugaaraa_tooly_1_to_10.webm');
console.log('5. Encoding WebM with FFmpeg...');
const ffmpegWebmCmd = [
  'ffmpeg -y',
  `-i "${outMp4}"`,
  '-c:v libvpx-vp9',
  '-crf 28',
  '-b:v 0',
  '-c:a libopus',
  '-b:a 128k',
  `"${outWebm}"`
].join(' ');

try {
  execSync(ffmpegWebmCmd, { stdio: 'inherit', cwd: tempDir });
} catch (e) {
  console.warn('WebM fallback:', e);
}

const mp4Stats = fs.statSync(outMp4);
console.log(`\n==============================================`);
console.log(`SUCCESS! Re-encoded MP4 with Crystal Clear Mongolian Voice:`);
console.log(`File: ${outMp4}`);
console.log(`Size: ${(mp4Stats.size / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Duration: 48 seconds, 9:16 vertical (720x1280)`);
console.log(`==============================================\n`);
