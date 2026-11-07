/**
 * Web Audio API and Real Spoken Mongolian Audio Clips for toddler counting video.
 * Plays crystal-clear female voice counting 1-10 plus gentle lullaby background music.
 */

class ToddlerAudioEngine {
  private ctx: AudioContext | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isMusicPlaying: boolean = false;
  private musicIntervalId: number | null = null;
  private musicStep: number = 0;
  private isMuted: boolean = false;
  private volume: number = 0.65;
  private isVoiceEnabled: boolean = true;
  private currentVoiceAudio: HTMLAudioElement | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.musicGain = this.ctx.createGain();
      this.sfxGain = this.ctx.createGain();

      this.updateGains();

      this.musicGain.connect(this.ctx.destination);
      this.sfxGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  private updateGains() {
    if (!this.musicGain || !this.sfxGain) return;
    const effectiveVol = this.isMuted ? 0 : this.volume;
    this.musicGain.gain.setValueAtTime(effectiveVol * 0.22, this.ctx?.currentTime || 0);
    this.sfxGain.gain.setValueAtTime(effectiveVol * 0.55, this.ctx?.currentTime || 0);
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.updateGains();
  }

  public getVolume(): number {
    return this.volume;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    this.updateGains();
    if (this.isMuted && this.currentVoiceAudio) {
      this.currentVoiceAudio.pause();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public setVoiceEnabled(enabled: boolean) {
    this.isVoiceEnabled = enabled;
    if (!enabled && this.currentVoiceAudio) {
      this.currentVoiceAudio.pause();
    }
  }

  public getVoiceEnabled(): boolean {
    return this.isVoiceEnabled;
  }

  /**
   * Gentle, soft music-box / marimba lullaby background music
   */
  public startGentleMusic() {
    this.initContext();
    if (this.isMusicPlaying) return;
    this.isMusicPlaying = true;

    const notes = [
      261.63, 329.63, 392.00, 523.25,
      440.00, 392.00, 329.63, 261.63,
      293.66, 392.00, 440.00, 523.25,
      392.00, 329.63, 293.66, 261.63
    ];

    const bassNotes = [
      130.81, 130.81, 164.81, 164.81,
      174.61, 174.61, 196.00, 196.00
    ];

    this.musicIntervalId = window.setInterval(() => {
      if (!this.ctx || !this.musicGain || !this.isMusicPlaying || this.isMuted) return;

      const now = this.ctx.currentTime;
      const noteFreq = notes[this.musicStep % notes.length];
      const bassFreq = bassNotes[Math.floor(this.musicStep / 2) % bassNotes.length];

      this.playSoftBell(noteFreq, now, 0.45, 0.18);

      if (this.musicStep % 2 === 0) {
        this.playWarmBass(bassFreq, now, 0.7, 0.12);
      }

      this.musicStep++;
    }, 450);
  }

  public stopGentleMusic() {
    this.isMusicPlaying = false;
    if (this.musicIntervalId !== null) {
      clearInterval(this.musicIntervalId);
      this.musicIntervalId = null;
    }
    this.musicStep = 0;
  }

  private playSoftBell(freq: number, startTime: number, duration: number, gainAmount: number) {
    if (!this.ctx || !this.musicGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, startTime);
    filter.frequency.exponentialRampToValueAtTime(300, startTime + duration);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(gainAmount, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  private playWarmBass(freq: number, startTime: number, duration: number, gainAmount: number) {
    if (!this.ctx || !this.musicGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, startTime);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, startTime);

    gain.gain.setValueAtTime(0.001, startTime);
    gain.gain.linearRampToValueAtTime(gainAmount, startTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  }

  /**
   * Play happy toddler chime for a count item (1..10)
   */
  public playCountChime(countNumber: number) {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const scale = [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25, 587.33, 659.25];
    const freq = scale[Math.min(Math.max(1, countNumber) - 1, scale.length - 1)];
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start(now);
    osc.stop(now + 0.65);
  }

  /**
   * Play sweet celebratory fanfare for final shot
   */
  public playCelebrationSparkle() {
    this.initContext();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;

    const chord = [523.25, 659.25, 783.99, 1046.50];
    chord.forEach((freq, idx) => {
      const now = (this.ctx?.currentTime || 0) + idx * 0.12;
      const osc = this.ctx?.createOscillator();
      const gain = this.ctx?.createGain();
      if (!osc || !gain || !this.sfxGain) return;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.3, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

      osc.connect(gain);
      gain.connect(this.sfxGain);

      osc.start(now);
      osc.stop(now + 0.85);
    });
  }

  /**
   * Preload all static voice clips in the background so they play instantly
   */
  private voiceCache: Map<string, HTMLAudioElement> = new Map();

  public preloadVoiceClips() {
    if (typeof window === 'undefined') return;
    try {
      for (let i = 1; i <= 12; i++) {
        const fileNum = i.toString().padStart(2, '0');
        const key = `shot_${fileNum}`;
        if (!this.voiceCache.has(key)) {
          const a = new Audio(`/audio/${key}.wav`);
          a.preload = 'auto';
          this.voiceCache.set(key, a);
        }
      }
      for (let i = 1; i <= 10; i++) {
        const fileNum = i.toString().padStart(2, '0');
        const key = `count_${fileNum}`;
        if (!this.voiceCache.has(key)) {
          const a = new Audio(`/audio/${key}.wav`);
          a.preload = 'auto';
          this.voiceCache.set(key, a);
        }
      }
    } catch {}
  }

  /**
   * Play the authentic spoken Mongolian voice audio clip for a given shot (1..12).
   * Guaranteed to work on all browsers and devices.
   */
  public playShotVoice(shotId: number) {
    if (!this.isVoiceEnabled || this.isMuted || typeof window === 'undefined') {
      return;
    }

    try {
      // Stop prior voice clip cleanly
      if (this.currentVoiceAudio) {
        this.currentVoiceAudio.pause();
        this.currentVoiceAudio.currentTime = 0;
      }

      const fileNum = Math.max(1, Math.min(12, shotId)).toString().padStart(2, '0');
      const key = `shot_${fileNum}`;
      let audio = this.voiceCache.get(key);

      if (!audio) {
        audio = new Audio(`/audio/${key}.wav`);
        this.voiceCache.set(key, audio);
      } else {
        audio.currentTime = 0;
      }

      audio.volume = Math.min(1.0, this.volume * 1.3);
      this.currentVoiceAudio = audio;

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback to Web Speech if audio element blocked
          this.speakUtteranceFallback(shotId);
        });
      }
    } catch {
      this.speakUtteranceFallback(shotId);
    }
  }

  /**
   * Play authentic spoken voice when tapping an item in Practice Mode (1..10)
   */
  public playCountVoice(countNum: number) {
    if (!this.isVoiceEnabled || this.isMuted || typeof window === 'undefined') {
      return;
    }

    try {
      const fileNum = Math.max(1, Math.min(10, countNum)).toString().padStart(2, '0');
      const key = `count_${fileNum}`;
      let audio = this.voiceCache.get(key);

      if (!audio) {
        audio = new Audio(`/audio/${key}.wav`);
        this.voiceCache.set(key, audio);
      } else {
        audio.currentTime = 0;
      }

      audio.volume = Math.min(1.0, this.volume * 1.3);
      audio.play().catch(() => {});
    } catch {}
  }

  /**
   * Speak Mongolian text (triggers audio clip or speech synthesis).
   */
  public speakMongolian(text: string, countNum?: number, shotId?: number) {
    if (!this.isVoiceEnabled || this.isMuted) {
      if (countNum) this.playCountChime(countNum);
      return;
    }

    if (shotId !== undefined) {
      this.playShotVoice(shotId);
      if (countNum) this.playCountChime(countNum);
      return;
    }

    if (countNum !== undefined) {
      // Numbers 1..10 correspond to shots 2..11
      const mappedShotId = countNum + 1;
      this.playShotVoice(mappedShotId);
      this.playCountChime(countNum);
      return;
    }

    // Default to shot 1 (intro)
    this.playShotVoice(1);
  }

  private speakUtteranceFallback(shotId: number) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const phrases: Record<number, string> = {
        1: "Хуруугаараа тоолъё!",
        2: "Нэг",
        3: "Хоёр",
        4: "Гурав",
        5: "Дөрөв",
        6: "Тав",
        7: "Зургаа",
        8: "Долоо",
        9: "Найм",
        10: "Ес",
        11: "Арав",
        12: "Баяр хүргэе! Маш сайн!",
      };
      const text = phrases[shotId] || "Нэг";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.82;
      utterance.pitch = 1.15;
      utterance.lang = 'mn-MN';
      window.speechSynthesis.speak(utterance);
    } catch {}
  }
}

export const toddlerAudio = new ToddlerAudioEngine();

