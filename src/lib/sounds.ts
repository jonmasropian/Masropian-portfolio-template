let _ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!_ctx) _ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  if (_ctx.state === 'suspended') _ctx.resume();
  return _ctx;
}

function makeDistortionCurve(amount: number): Float32Array {
  const n = 256;
  const curve = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = ((Math.PI + amount) * x) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}

export function playGlitch() {
  const ctx = getCtx();
  if (!ctx) return;

  const t = ctx.currentTime;
  const bufferSize = Math.floor(ctx.sampleRate * 0.055);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.3;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 2800 + Math.random() * 1200;
  filter.Q.value = 0.6;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.38, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.055);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  source.start(t);
}

export function playGrowl() {
  const ctx = getCtx();
  if (!ctx) return;

  const t = ctx.currentTime;

  const osc = ctx.createOscillator();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(95 + Math.random() * 20, t);
  osc.frequency.exponentialRampToValueAtTime(48, t + 0.22);

  const dist = ctx.createWaveShaper();
  dist.curve = makeDistortionCurve(160);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.26, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + 0.24);

  osc.connect(dist);
  dist.connect(gain);
  gain.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + 0.26);
}
