// Multi-Sensory Cross-Platform Haptic & Psychoacoustic Audio Engine
// Supports: iOS 18+ Taptic Engine + Android LRA Vibration + Web Audio API Synthesizer

const SOUND_KEY = 'hair_flow_sound_enabled';

class HapticsEngine {
  constructor() {
    this.ctx = null;
    this.soundEnabled = localStorage.getItem(SOUND_KEY) !== 'false';
    this.iosSwitch = null;
    this.isUnlocked = false;

    // Auto-unlock AudioContext on first touch / click (bypasses browser autoplay restrictions)
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        this.getAudioCtx();
        window.removeEventListener('touchstart', unlockAudio);
        window.removeEventListener('pointerdown', unlockAudio);
        window.removeEventListener('click', unlockAudio);
      };
      window.addEventListener('touchstart', unlockAudio, { passive: true });
      window.addEventListener('pointerdown', unlockAudio, { passive: true });
      window.addEventListener('click', unlockAudio, { passive: true });
    }
  }

  getIosSwitch() {
    if (!this.iosSwitch && typeof document !== 'undefined') {
      this.iosSwitch = document.getElementById('haptic-trigger');
    }
    return this.iosSwitch;
  }

  getAudioCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    localStorage.setItem(SOUND_KEY, this.soundEnabled);
    if (this.soundEnabled) this.success();
    return this.soundEnabled;
  }

  isSoundOn() {
    return this.soundEnabled;
  }

  // 0. PHYSICAL VIBRATION (iOS Taptic + Android Vibration API)
  vibrate(pattern) {
    if (!this.soundEnabled) return;

    // iOS 18+ Taptic Engine Trigger via input[switch] click
    const iosSwitch = this.getIosSwitch();
    if (iosSwitch) {
      try {
        if (Array.isArray(pattern)) {
          let delay = 0;
          for (let i = 0; i < pattern.length; i += 2) {
            setTimeout(() => {
              try { iosSwitch.click(); } catch (_) {}
            }, delay);
            delay += (pattern[i] || 0) + (pattern[i + 1] || 0);
          }
        } else {
          iosSwitch.click();
        }
      } catch (_) {}
    }

    // Android / Standard Vibration API
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (_) {}
    }
  }

  // 1. Selection / Light Tick (For tabs, toggles, accordions)
  // Feel: Crisp Apple Watch crown tick / Leica aperture detent
  tick() {
    this.vibrate(18);
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, t);
      osc.frequency.exponentialRampToValueAtTime(300, t + 0.04);
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.04);
    } catch (_) {}
  }

  // 2. Liquid Droplet Tap (For 8 water cups - ascending musical pitch)
  droplet(cupIdx = 1) {
    this.vibrate(24);
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime;
      const baseFreq = 400 + (cupIdx * 55); // Pitch ascends from 400Hz to 840Hz!
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, t);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, t + 0.08);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.08);
    } catch (_) {}
  }

  // 3. Ratchet Step (For Protein +/-)
  // Feel: Mechanical Dyson dial notch
  ratchet(isAdd = true) {
    this.vibrate(22);
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime;
      osc.type = 'triangle';
      const freq = isAdd ? 780 : 540;
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.7, t + 0.05);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.05);
    } catch (_) {}
  }

  // 4. Mission Accomplished (For checking today's mission card)
  // Feel: Deep satisfying double-thump + warm champagne chime chord
  success() {
    this.vibrate([40, 50, 85]);
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioCtx();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 triad
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = ctx.currentTime + (i * 0.06);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.14, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.35);
      });
    } catch (_) {}
  }

  // 5. Celebration / Fanfare (When finishing all 8 glasses or scratch card)
  celebrate() {
    this.vibrate([45, 40, 60, 40, 120]);
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioCtx();
      if (!ctx) return;
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const t = ctx.currentTime + (i * 0.08);
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.16, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.4);
      });
    } catch (_) {}
  }

  // 6. Camera Shutter (For Photo Vault upload)
  shutter() {
    this.vibrate([28, 40, 45]);
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioCtx();
      if (!ctx) return;
      const t = ctx.currentTime;
      [0, 0.06].forEach((offset) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(1400, t + offset);
        osc.frequency.exponentialRampToValueAtTime(300, t + offset + 0.03);
        gain.gain.setValueAtTime(0.08, t + offset);
        gain.gain.exponentialRampToValueAtTime(0.001, t + offset + 0.03);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t + offset);
        osc.stop(t + offset + 0.03);
      });
    } catch (_) {}
  }

  // 7. Massage Zone Shift (Every 60s during 4-min massage)
  // Feel: Two soothing gentle hums so user knows to switch zones with eyes closed!
  zoneShift() {
    this.vibrate([75, 110, 75]);
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, t);
      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.1, t + 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 1.2);
    } catch (_) {}
  }

  // 9. Playful Pop / Mascot Speech (When tapping mascot avatar or speech bubble)
  pop() {
    this.vibrate(20);
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime;
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(1100, t + 0.05);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.06);
    } catch (_) {}
  }

  // 8. Warning / Rigid Alert (For reset week)
  warning() {
    this.vibrate([60, 40, 60]);
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = ctx.currentTime;
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, t);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.15);
    } catch (_) {}
  }
}

export const Haptics = new HapticsEngine();
export const soundEngine = Haptics; // alias for backwards compatibility
