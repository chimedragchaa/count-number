import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const audioDir = path.resolve('public/audio');
if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

// Spoken text tailored for natural phonetic Mongolian pronunciation with friendly female voice (slt)
const speechClips = [
  { id: 1, text: "Khuruugaaraa tooly!" },
  { id: 2, text: "Neg!" },
  { id: 3, text: "Hoyor!" },
  { id: 4, text: "Goorav!" },
  { id: 5, text: "Duruv!" },
  { id: 6, text: "Tahv!" },
  { id: 7, text: "Zoorgaa!" },
  { id: 8, text: "Dohloh!" },
  { id: 9, text: "Nah eem!" },
  { id: 10, text: "Yees!" },
  { id: 11, text: "Ah rahv!" },
  { id: 12, text: "Bayar hoor gyeh! Mash sain!" },
];

console.log('Generating spoken audio clips using FFmpeg flite (female voice: slt)...');

for (const clip of speechClips) {
  const fileName = `shot_${clip.id.toString().padStart(2, '0')}.wav`;
  const filePath = path.join(audioDir, fileName);

  // Synthesize voice and resample to clean 44100Hz stereo
  const cmd = `ffmpeg -y -f lavfi -i "flite=text='${clip.text}':voice=slt" -af "volume=1.8,asetrate=16000*0.95,aresample=44100" -ac 2 "${filePath}"`;
  execSync(cmd, { stdio: 'ignore' });

  const stat = fs.statSync(filePath);
  console.log(`Generated ${fileName} (${stat.size} bytes) for text: "${clip.text}"`);
}

console.log('All speech audio clips successfully generated in public/audio/!');
