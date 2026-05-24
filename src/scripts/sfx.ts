/**
 * Synthesized placeholder SFX via Web Audio API.
 * Real audio files (via Howler) will replace these once Jess records/picks them.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx) ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

type SfxName = "bark" | "vinyl" | "crumple" | "drip" | "page";

export function play(name: SfxName): void {
  switch (name) {
    case "bark":
      bark();
      return;
    case "vinyl":
      vinyl();
      return;
    case "crumple":
      crumple();
      return;
    case "drip":
      drip();
      return;
    case "page":
      page();
      return;
  }
}

function bark(): void {
  const ac = getCtx();
  const t = ac.currentTime;
  const duration = 0.22;

  const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * duration), ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const p = i / data.length;
    data[i] = (Math.random() * 2 - 1) * (1 - p);
  }
  const noise = ac.createBufferSource();
  noise.buffer = buffer;

  const bandpass = ac.createBiquadFilter();
  bandpass.type = "bandpass";
  bandpass.frequency.setValueAtTime(900, t);
  bandpass.frequency.exponentialRampToValueAtTime(450, t + duration);
  bandpass.Q.value = 4;

  const osc = ac.createOscillator();
  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(220, t);
  osc.frequency.exponentialRampToValueAtTime(110, t + duration);

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.45, t + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

  noise.connect(bandpass).connect(gain);
  osc.connect(gain).connect(ac.destination);

  noise.start(t);
  osc.start(t);
  noise.stop(t + duration);
  osc.stop(t + duration);
}

function vinyl(): void {
  const ac = getCtx();
  const t = ac.currentTime;
  const duration = 1.2;

  const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * duration), ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.4;
  }
  const noise = ac.createBufferSource();
  noise.buffer = buffer;

  const filter = ac.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 1800;

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.18, t + 0.05);
  gain.gain.linearRampToValueAtTime(0.04, t + 0.4);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

  noise.connect(filter).connect(gain).connect(ac.destination);
  noise.start(t);
  noise.stop(t + duration);
}

function crumple(): void {
  const ac = getCtx();
  const t = ac.currentTime;
  const duration = 0.4;

  const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * duration), ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const p = i / data.length;
    const burst = Math.random() < 0.15 ? Math.random() : 0;
    data[i] = burst * (1 - p) * (Math.random() * 2 - 1);
  }
  const noise = ac.createBufferSource();
  noise.buffer = buffer;

  const filter = ac.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = 2200;

  const gain = ac.createGain();
  gain.gain.value = 0.35;

  noise.connect(filter).connect(gain).connect(ac.destination);
  noise.start(t);
  noise.stop(t + duration);
}

function drip(): void {
  const ac = getCtx();
  const t = ac.currentTime;
  const duration = 0.18;

  const osc = ac.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(1200, t);
  osc.frequency.exponentialRampToValueAtTime(380, t + duration);

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.25, t + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

  osc.connect(gain).connect(ac.destination);
  osc.start(t);
  osc.stop(t + duration);
}

function page(): void {
  const ac = getCtx();
  const t = ac.currentTime;
  const duration = 0.25;

  const buffer = ac.createBuffer(1, Math.floor(ac.sampleRate * duration), ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    const p = i / data.length;
    data[i] = (Math.random() * 2 - 1) * (1 - Math.abs(p - 0.3));
  }
  const noise = ac.createBufferSource();
  noise.buffer = buffer;

  const filter = ac.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 3500;
  filter.Q.value = 1.5;

  const gain = ac.createGain();
  gain.gain.value = 0.25;

  noise.connect(filter).connect(gain).connect(ac.destination);
  noise.start(t);
  noise.stop(t + duration);
}
