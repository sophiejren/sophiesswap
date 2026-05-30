/*
  Swamp Sounds v1.0.0
  ────────────────────
  Small procedural Web-Audio sound library.
  No audio files. Generates everything from oscillators.
  ~3 KB minified. MIT licensed.

  Source:    https://sophieren.com/swamp-sounds/
  Repo:      https://github.com/sophiejren/sophiesswap
  Author:    Sophie

  Usage:
    <script src="https://sophieren.com/swamp-sounds/swamp-sounds.js"></script>
    <script>
      // After any user gesture (click/tap/keypress) call sounds:
      document.addEventListener('click', () => swampSounds.plop());

      // Or wire directly:
      swampSounds.attach('button.submit', 'chime');

      // Tweak per call:
      swampSounds.croak({ volume: 0.3, pitch: 1.4 });

      // Global mute:
      swampSounds.mute(true);
    </script>

  Sounds (call as swampSounds.<name>() ):
    plop      — water drop / button press
    chime     — bell-like single note
    croak     — frog call
    buzz      — mosquito / fly
    splash    — wet impact
    firefly   — gentle blip (catch / collect)
    bite      — sharp two-note (lure cast strike)
    splat     — sharp damp impact
    hop       — frog landing (two-tone bounce)
    riserun   — ascending pentatonic ladder (firefly release / win)
    tarot     — mystical reveal (low → high shimmer)
    rip       — ripple expansion (low sine sweep)
    lure      — fishing line whoosh
*/
(function (root) {
  'use strict';

  let ctx = null;
  let muted = false;
  let masterGain = null;

  function ensure() {
    if (ctx) return true;
    try {
      const AC = root.AudioContext || root.webkitAudioContext;
      if (!AC) return false;
      ctx = new AC();
      masterGain = ctx.createGain();
      masterGain.gain.value = 1.0;
      masterGain.connect(ctx.destination);
      // Some browsers start the context in 'suspended' state.
      if (ctx.state === 'suspended') ctx.resume().catch(() => {});
      return true;
    } catch (e) {
      return false;
    }
  }

  function tone(opts) {
    if (muted || !ensure()) return;
    const t0 = opts.start != null ? ctx.currentTime + opts.start : ctx.currentTime;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = opts.type || 'sine';
    osc.frequency.setValueAtTime(opts.freq, t0);
    if (opts.freqEnd != null) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(0.01, opts.freqEnd), t0 + opts.dur);
    }
    g.gain.setValueAtTime(opts.vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0008, t0 + opts.dur);
    osc.connect(g).connect(masterGain);
    osc.start(t0);
    osc.stop(t0 + opts.dur + 0.02);
  }

  function noise(opts) {
    if (muted || !ensure()) return;
    const t0 = opts.start != null ? ctx.currentTime + opts.start : ctx.currentTime;
    const dur = opts.dur || 0.18;
    const buf = ctx.createBuffer(1, Math.max(1, Math.floor(ctx.sampleRate * dur)), ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const filt = ctx.createBiquadFilter();
    filt.type = opts.filter || 'bandpass';
    filt.frequency.value = opts.freq || 800;
    filt.Q.value = opts.q || 4;
    const g = ctx.createGain();
    g.gain.setValueAtTime(opts.vol || 0.18, t0);
    g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
    src.connect(filt).connect(g).connect(masterGain);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }

  // ────────── sounds ──────────

  function plop(o) {
    o = o || {};
    const p = o.pitch || 1;
    const v = o.volume != null ? o.volume : 0.18;
    tone({ freq: 180 * p, freqEnd: 55 * p, dur: 0.28, vol: v, type: 'sine' });
  }

  function chime(o) {
    o = o || {};
    const p = o.pitch || 1;
    const v = o.volume != null ? o.volume : 0.13;
    tone({ freq: 880 * p, dur: 0.45, vol: v, type: 'sine' });
    tone({ freq: 1320 * p, dur: 0.4, vol: v * 0.45, type: 'sine', start: 0.005 });
  }

  function croak(o) {
    o = o || {};
    const p = o.pitch || 1;
    const v = o.volume != null ? o.volume : 0.22;
    // descending wobble — that frog-throat feeling
    tone({ freq: 220 * p, freqEnd: 95 * p, dur: 0.22, vol: v, type: 'sawtooth' });
    tone({ freq: 110 * p, freqEnd: 75 * p, dur: 0.16, vol: v * 0.6, type: 'square', start: 0.18 });
  }

  function buzz(o) {
    o = o || {};
    const p = o.pitch || 1;
    const v = o.volume != null ? o.volume : 0.06;
    const dur = o.dur || 0.5;
    tone({ freq: 220 * p, dur: dur, vol: v, type: 'sawtooth' });
    tone({ freq: 224 * p, dur: dur, vol: v * 0.8, type: 'square', start: 0.005 });
  }

  function splash(o) {
    o = o || {};
    const v = o.volume != null ? o.volume : 0.22;
    noise({ freq: 2000, q: 1.5, vol: v, dur: 0.22, filter: 'bandpass' });
    tone({ freq: 240, freqEnd: 90, dur: 0.3, vol: v * 0.4, type: 'sine', start: 0.02 });
  }

  function firefly(o) {
    o = o || {};
    const p = o.pitch || 1;
    const v = o.volume != null ? o.volume : 0.1;
    tone({ freq: 1320 * p, dur: 0.18, vol: v, type: 'sine' });
    tone({ freq: 1760 * p, dur: 0.16, vol: v * 0.5, type: 'sine', start: 0.05 });
  }

  function bite(o) {
    o = o || {};
    const p = o.pitch || 1;
    const v = o.volume != null ? o.volume : 0.18;
    tone({ freq: 880 * p, dur: 0.06, vol: v, type: 'square' });
    tone({ freq: 740 * p, dur: 0.08, vol: v * 0.85, type: 'sine', start: 0.06 });
  }

  function splat(o) {
    o = o || {};
    const v = o.volume != null ? o.volume : 0.18;
    tone({ freq: 220, freqEnd: 60, dur: 0.08, vol: v, type: 'square' });
    noise({ freq: 600, q: 2, vol: v * 0.5, dur: 0.1, filter: 'lowpass', start: 0.01 });
  }

  function hop(o) {
    o = o || {};
    const p = o.pitch || 1;
    const v = o.volume != null ? o.volume : 0.13;
    tone({ freq: 440 * p, dur: 0.16, vol: v, type: 'sine' });
    tone({ freq: 660 * p, dur: 0.14, vol: v * 0.85, type: 'sine', start: 0.08 });
  }

  function riserun(o) {
    o = o || {};
    const v = o.volume != null ? o.volume : 0.1;
    const scale = o.scale || [523.25, 659.25, 783.99, 987.77, 1174.66]; // C major pentatonic-ish
    scale.forEach((f, i) => tone({ freq: f, dur: 0.35, vol: v, type: 'sine', start: i * 0.08 }));
  }

  function tarot(o) {
    o = o || {};
    const v = o.volume != null ? o.volume : 0.1;
    // low bell + sparkle
    tone({ freq: 220, freqEnd: 196, dur: 1.0, vol: v, type: 'sine' });
    tone({ freq: 1318.51, dur: 0.4, vol: v * 0.4, type: 'sine', start: 0.15 });
    tone({ freq: 1760, dur: 0.32, vol: v * 0.3, type: 'sine', start: 0.32 });
    tone({ freq: 2349.32, dur: 0.28, vol: v * 0.22, type: 'sine', start: 0.5 });
  }

  function rip(o) {
    o = o || {};
    const v = o.volume != null ? o.volume : 0.13;
    tone({ freq: 90, freqEnd: 40, dur: 0.7, vol: v, type: 'sine' });
  }

  function lure(o) {
    o = o || {};
    const v = o.volume != null ? o.volume : 0.13;
    noise({ freq: 3000, q: 1, vol: v, dur: 0.4, filter: 'highpass' });
  }

  // ────────── helpers ──────────

  function mute(on) { muted = !!on; return muted; }
  function isMuted() { return muted; }

  function setVolume(v) {
    if (!ensure()) return;
    masterGain.gain.value = Math.max(0, Math.min(1, +v));
  }

  // attach: bind a click-handler that plays the named sound
  function attach(selector, name, opts) {
    const handler = (e) => {
      if (!e.target.closest(selector)) return;
      const fn = root.swampSounds[name];
      if (typeof fn === 'function') fn(opts);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }

  // names: list every sound the library exposes
  const SOUNDS = ['plop','chime','croak','buzz','splash','firefly','bite','splat','hop','riserun','tarot','rip','lure'];
  function names() { return SOUNDS.slice(); }

  // play by name
  function play(name, opts) {
    const fn = root.swampSounds[name];
    if (typeof fn === 'function') fn(opts);
  }

  // ────────── export ──────────
  root.swampSounds = {
    version: '1.0.0',
    plop: plop,
    chime: chime,
    croak: croak,
    buzz: buzz,
    splash: splash,
    firefly: firefly,
    bite: bite,
    splat: splat,
    hop: hop,
    riserun: riserun,
    tarot: tarot,
    rip: rip,
    lure: lure,
    mute: mute,
    isMuted: isMuted,
    setVolume: setVolume,
    attach: attach,
    play: play,
    names: names,
    // for advanced users — expose primitives
    _tone: tone,
    _noise: noise
  };
})(typeof window !== 'undefined' ? window : globalThis);
