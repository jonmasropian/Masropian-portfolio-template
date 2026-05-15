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

// Metal scratch — for purple (dev) badges
export function playMonster() {
  const ctx = getCtx();
  if (!ctx || ctx.state !== 'running') return;

  const t = ctx.currentTime;
  const dur = 0.2;

  // Noise buffer with grainy amplitude variation to simulate rough surface drag
  const bufferSize = Math.floor(ctx.sampleRate * dur);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    const grain = Math.abs(Math.sin(i * 0.04 + Math.random() * 0.8)) * 0.6 + 0.4;
    data[i] = (Math.random() * 2 - 1) * grain;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;

  // Bandpass sweeps like dragging across metal surface
  const bp = ctx.createBiquadFilter();
  bp.type = 'bandpass';
  bp.Q.value = 4;
  bp.frequency.setValueAtTime(3000 + Math.random() * 1000, t);
  bp.frequency.linearRampToValueAtTime(8000 + Math.random() * 2000, t + dur * 0.5);
  bp.frequency.linearRampToValueAtTime(4500 + Math.random() * 1000, t + dur);

  // High peaking for metallic bite
  const peak = ctx.createBiquadFilter();
  peak.type = 'peaking';
  peak.frequency.value = 9000 + Math.random() * 2000;
  peak.gain.value = 10;
  peak.Q.value = 2;

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.7, t + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur);

  source.connect(bp);
  bp.connect(peak);
  peak.connect(gain);
  gain.connect(ctx.destination);
  source.start(t);

  // Brief metallic ring — the resonance of the metal after scratch
  const ring = ctx.createOscillator();
  ring.type = 'sine';
  ring.frequency.setValueAtTime(7000 + Math.random() * 3000, t);
  ring.frequency.exponentialRampToValueAtTime(2500, t + 0.12);

  const ringGain = ctx.createGain();
  ringGain.gain.setValueAtTime(0.22, t);
  ringGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

  ring.connect(ringGain);
  ringGain.connect(ctx.destination);
  ring.start(t);
  ring.stop(t + 0.15);
}
