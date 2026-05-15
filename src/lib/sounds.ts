let _ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!_ctx) {
    try {
      _ctx = new AudioContext();
    } catch {
      return null;
    }
  }
  return _ctx;
}

export function unlockAudio() {
  const ctx = getCtx();
  if (!ctx) return;
  if (ctx.state === 'suspended') ctx.resume();
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

function makeHardClipCurve(threshold: number): Float32Array {
  const n = 256;
  const curve = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1;
    curve[i] = Math.max(-threshold, Math.min(threshold, x * (1 / threshold)));
  }
  return curve;
}

// Harsh stuttering digital corruption — for cyan (ops/security) badges
export function playGlitch() {
  const ctx = getCtx();
  if (!ctx || ctx.state !== 'running') return;

  const t = ctx.currentTime;
  const numBursts = 5 + Math.floor(Math.random() * 3);

  for (let i = 0; i < numBursts; i++) {
    const burstStart = t + i * 0.015;
    const burstLen   = 0.008 + Math.random() * 0.007;
    const freq       = 400 + Math.random() * 5000;

    const osc = ctx.createOscillator();
    osc.type = 'square';
    osc.frequency.setValueAtTime(freq, burstStart);

    // Hard clip — makes it sound digitally broken
    const clip = ctx.createWaveShaper();
    clip.curve = makeHardClipCurve(0.15);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.55, burstStart);
    gain.gain.setValueAtTime(0, burstStart + burstLen);

    osc.connect(clip);
    clip.connect(gain);
    gain.connect(ctx.destination);
    osc.start(burstStart);
    osc.stop(burstStart + burstLen + 0.002);
  }
}

// Two-oscillator monster roar + low growl — for purple (dev) badges
export function playMonster() {
  const ctx = getCtx();
  if (!ctx || ctx.state !== 'running') return;

  const t = ctx.currentTime;
  const dur = 0.42;

  // Low growl — drops from ~120Hz to ~35Hz
  const growl = ctx.createOscillator();
  growl.type = 'sawtooth';
  growl.frequency.setValueAtTime(120 + Math.random() * 20, t);
  growl.frequency.exponentialRampToValueAtTime(35, t + dur);

  const growlGain = ctx.createGain();
  growlGain.gain.setValueAtTime(0.7, t);
  growlGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

  // Upper roar — starts higher and crashes down for the "creature vocal" quality
  const roar = ctx.createOscillator();
  roar.type = 'sawtooth';
  roar.frequency.setValueAtTime(260 + Math.random() * 40, t);
  roar.frequency.exponentialRampToValueAtTime(55, t + dur * 0.65);
  roar.frequency.exponentialRampToValueAtTime(38, t + dur);

  const roarGain = ctx.createGain();
  roarGain.gain.setValueAtTime(0.55, t);
  roarGain.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.7);

  // Shared heavy distortion
  const dist = ctx.createWaveShaper();
  dist.curve = makeDistortionCurve(320);

  const master = ctx.createGain();
  master.gain.value = 0.65;

  growl.connect(growlGain);
  roar.connect(roarGain);
  growlGain.connect(dist);
  roarGain.connect(dist);
  dist.connect(master);
  master.connect(ctx.destination);

  growl.start(t); growl.stop(t + dur + 0.02);
  roar.start(t);  roar.stop(t + dur + 0.02);
}
