let ctx: AudioContext | null = null;
let enabled = true;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function setAudioEnabled(value: boolean) {
  enabled = value;
}

export function isAudioEnabled() {
  return enabled;
}

/** Soft 60–90ms digital whoosh at the start of a camera move. */
export function playWhoosh() {
  if (!enabled) return;
  const ac = getCtx();
  if (!ac) return;
  const dur = 0.08;
  const frames = Math.floor(ac.sampleRate * dur);
  const buffer = ac.createBuffer(1, frames, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < frames; i++) {
    const t = i / frames;
    data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * t) * 0.55;
  }
  const src = ac.createBufferSource();
  src.buffer = buffer;

  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.Q.value = 0.9;
  filter.frequency.setValueAtTime(420, ac.currentTime);
  filter.frequency.exponentialRampToValueAtTime(2600, ac.currentTime + dur);

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.05, ac.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + dur);

  src.connect(filter).connect(gain).connect(ac.destination);
  src.start();
  src.stop(ac.currentTime + dur + 0.01);
}

/** Subtle electronic click when the move settles. */
export function playClick() {
  if (!enabled) return;
  const ac = getCtx();
  if (!ac) return;
  const osc = ac.createOscillator();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(1750, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(900, ac.currentTime + 0.035);

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.0001, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.028, ac.currentTime + 0.005);
  gain.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + 0.045);

  osc.connect(gain).connect(ac.destination);
  osc.start();
  osc.stop(ac.currentTime + 0.06);
}
