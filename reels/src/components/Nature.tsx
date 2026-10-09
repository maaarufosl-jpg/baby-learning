import React from 'react';
import {AbsoluteFill, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';

/**
 * Drawn nature scenes (no people, no animals): each scene is a stack of layers painted in order
 * into one 1080×1920 SVG, with slow movement and a gentle camera push-in.
 * Positions are fractions of the frame (x of width, y of height).
 */
export type Layer =
  | {type: 'sky'; colors: string[]; to?: string[]}
  | {type: 'sun'; x: number; y: number; r: number; color: string; rise?: number; glow?: number}
  | {type: 'moon'; x: number; y: number; r: number}
  | {type: 'stars'; count: number; milky?: boolean; bottom?: number}
  | {type: 'clouds'; count: number; y: [number, number]; color: string; opacity: number; speed?: number; size?: number; seed?: number; part?: boolean}
  | {type: 'rays'; x: number; y: number; color: string; opacity: number}
  | {type: 'ridge'; kind: 'hills' | 'mountains' | 'forest'; y: number; amp: number; color: string; seed: number; drift?: number; snow?: string}
  | {type: 'water'; y: number; colors: [string, string]; shimmer: string; sunX?: number; ripples?: boolean; mirror?: string}
  | {type: 'river'; color: string; shimmer: string; from: number; width: number; seed?: number; fork?: boolean}
  | {type: 'waterfall'; x: number; w: number; top: number; bottom: number; color: string}
  | {type: 'rain'; count: number; opacity: number; color?: string}
  | {type: 'mist'; y: number; color: string; opacity: number; count?: number}
  | {type: 'grass'; y: number; color: string; height: number; count: number; tip?: string; seed?: number}
  | {type: 'field'; y: number; colors: [string, string]; rows: number; stalk: string; grain?: string}
  | {type: 'flowers'; y: number; colors: string[]; count: number; size: number; seed?: number}
  | {type: 'tree'; x: number; y: number; scale: number; leaf: string; trunk: string; fruit?: string; seed?: number}
  | {type: 'branch'; side: 'left' | 'right'; y: number; wood: string; leaf?: string; blossom?: string; fruit?: string; fruitShape?: 'round' | 'mango'}
  | {type: 'leaves'; colors: string[]; dew: boolean}
  | {type: 'canopy'; color: string; light: string}
  | {type: 'lotus'; y: number; count: number; pad: string; petal: string}
  | {type: 'rainbow'; cx: number; cy: number; r: number; opacity: number}
  | {type: 'petals'; count: number; color: string}
  | {type: 'waves'; y: number; sea: string; foam: string; sand: string}
  | {type: 'stones'; y: number; colors: string[]; count: number}
  | {type: 'sparkle'; count: number; color: string; y: [number, number]};

export type NatureScene = {layers: Layer[]; zoom?: number; originY?: number};

const W = 1080;
const H = 1920;

/** Smooth 1-D value noise, deterministic per seed. */
const noise = (seed: string | number, x: number) => {
  const i = Math.floor(x);
  const f = x - i;
  const a = random(`${seed}-${i}`);
  const b = random(`${seed}-${i + 1}`);
  const s = f * f * (3 - 2 * f);
  return a + (b - a) * s;
};

const ridgePath = (l: Extract<Layer, {type: 'ridge'}>, shift: number) => {
  const base = l.y * H;
  const pts: string[] = [];
  for (let x = -40; x <= W + 40; x += 12) {
    const u = (x + shift) / W;
    let h: number;
    if (l.kind === 'mountains') {
      h = noise(l.seed, u * 3) * 0.65 + Math.abs(noise(l.seed + 7, u * 9) - 0.5) * 0.7;
    } else if (l.kind === 'forest') {
      const tree = Math.abs(Math.sin(u * Math.PI * 34 + noise(l.seed, u * 20) * 3));
      h = noise(l.seed, u * 2.5) * 0.55 + Math.pow(tree, 3) * 0.45;
    } else {
      h = noise(l.seed, u * 2) * 0.75 + noise(l.seed + 3, u * 5) * 0.25;
    }
    pts.push(`${x},${(base - h * l.amp * H).toFixed(1)}`);
  }
  return `M-40,${H + 40} L${pts.join(' L')} L${W + 40},${H + 40} Z`;
};

const mix = (a: string[], b: string[] | undefined, t: number) => {
  if (!b) return a;
  const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
  return a.map((c, i) => {
    const x = hex(c);
    const y = hex(b[i] ?? b[b.length - 1]);
    return `rgb(${x.map((v, k) => Math.round(v + (y[k] - v) * t)).join(',')})`;
  });
};

const LayerView: React.FC<{l: Layer; i: number; t: number; frame: number; fps: number; u: string}> = ({l, i, t, frame, fps, u}) => {
  const sec = frame / fps;
  const id = `${u}l${i}`;
  const f = (name: string) => `url(#${u}${name})`;
  switch (l.type) {
    case 'sky': {
      const c = mix(l.colors, l.to, t);
      return (
        <>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              {c.map((col, k) => (
                <stop key={k} offset={k / (c.length - 1)} stopColor={col} />
              ))}
            </linearGradient>
          </defs>
          <rect width={W} height={H} fill={`url(#${id})`} />
        </>
      );
    }
    case 'sun': {
      const cy = (l.y + (l.rise ?? 0) * (1 - t)) * H;
      const glow = l.glow ?? 6;
      return (
        <>
          <defs>
            <radialGradient id={id}>
              <stop offset="0" stopColor={l.color} stopOpacity={0.55} />
              <stop offset="1" stopColor={l.color} stopOpacity={0} />
            </radialGradient>
          </defs>
          <circle cx={l.x * W} cy={cy} r={l.r * glow} fill={`url(#${id})`} />
          <circle cx={l.x * W} cy={cy} r={l.r} fill={l.color} />
        </>
      );
    }
    case 'moon':
      return (
        <>
          <defs>
            <radialGradient id={id}>
              <stop offset="0" stopColor="#F4F1E1" stopOpacity={0.45} />
              <stop offset="1" stopColor="#F4F1E1" stopOpacity={0} />
            </radialGradient>
          </defs>
          <circle cx={l.x * W} cy={l.y * H} r={l.r * 5} fill={`url(#${id})`} />
          <circle cx={l.x * W} cy={l.y * H} r={l.r} fill="#F4F1E1" />
        </>
      );
    case 'stars': {
      const bottom = (l.bottom ?? 0.7) * H;
      return (
        <g>
          {l.milky && (
            <ellipse cx={W * 0.5} cy={bottom * 0.45} rx={W * 0.9} ry={130} fill="#C9D3FF" opacity={0.13} transform={`rotate(${-28 + t * 4} ${W / 2} ${bottom * 0.45})`} filter={f('blur40')} />
          )}
          {Array.from({length: l.count}, (_, k) => {
            const x = random(`sx${k}`) * W;
            const y = random(`sy${k}`) * bottom;
            const r = 0.8 + random(`sr${k}`) * 2.4;
            const tw = 0.45 + 0.55 * Math.abs(Math.sin(sec * (0.6 + random(`st${k}`) * 1.4) + k));
            return <circle key={k} cx={(x + sec * 3) % W} cy={y} r={r} fill="#FFFFFF" opacity={tw * (0.5 + y / bottom / 2 > 0.9 ? 0.6 : 1)} />;
          })}
        </g>
      );
    }
    case 'clouds': {
      const speed = l.speed ?? 14;
      const size = l.size ?? 1;
      return (
        <g filter={f('blur18')} opacity={l.opacity}>
          {Array.from({length: l.count}, (_, k) => {
            const seed = `${l.seed ?? 0}c${k}`;
            const y = (l.y[0] + random(seed + 'y') * (l.y[1] - l.y[0])) * H;
            let x = random(seed + 'x') * (W + 600) - 300 + sec * speed * (0.6 + random(seed + 's'));
            if (l.part) x += (random(seed + 'p') > 0.5 ? 1 : -1) * t * 420;
            const s = (0.7 + random(seed + 'z') * 0.8) * size;
            return (
              <g key={k} transform={`translate(${x} ${y}) scale(${s})`}>
                <ellipse cx={0} cy={0} rx={220} ry={70} fill={l.color} />
                <ellipse cx={-90} cy={-35} rx={120} ry={80} fill={l.color} />
                <ellipse cx={70} cy={-50} rx={140} ry={95} fill={l.color} />
              </g>
            );
          })}
        </g>
      );
    }
    case 'rays': {
      const cx = l.x * W;
      const cy = l.y * H;
      return (
        <g opacity={l.opacity * (0.75 + 0.25 * Math.sin(sec * 0.8))} filter={f('blur18')}>
          {Array.from({length: 7}, (_, k) => {
            const a = (-35 + k * 12 + Math.sin(sec * 0.3 + k) * 2) * (Math.PI / 180);
            const len = H * 1.1;
            const wdt = 0.05 + random(`ray${k}`) * 0.05;
            const p = (ang: number) => `${cx + Math.sin(ang) * len},${cy + Math.cos(ang) * len}`;
            return <polygon key={k} points={`${cx},${cy} ${p(a - wdt)} ${p(a + wdt)}`} fill={l.color} opacity={0.35 + random(`ro${k}`) * 0.4} />;
          })}
        </g>
      );
    }
    case 'ridge':
      return (
        <g>
          <path d={ridgePath(l, sec * (l.drift ?? 0))} fill={l.color} />
          {l.snow && <path d={ridgePath(l, sec * (l.drift ?? 0))} fill={l.snow} clipPath={`url(#${id}snow)`} />}
          {l.snow && (
            <defs>
              <clipPath id={`${id}snow`}>
                <rect x={0} y={0} width={W} height={(l.y - l.amp * 0.62) * H} />
              </clipPath>
            </defs>
          )}
        </g>
      );
    case 'water': {
      const top = l.y * H;
      return (
        <g>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={l.colors[0]} />
              <stop offset="1" stopColor={l.colors[1]} />
            </linearGradient>
          </defs>
          <rect x={0} y={top} width={W} height={H - top} fill={`url(#${id})`} />
          {l.mirror && <rect x={0} y={top} width={W} height={(H - top) * 0.35} fill={l.mirror} opacity={0.35} filter={f('blur18')} />}
          {Array.from({length: 46}, (_, k) => {
            const d = random(`wd${k}`);
            const y = top + Math.pow(d, 1.6) * (H - top);
            const near = (y - top) / (H - top);
            const len = 30 + near * 160 * random(`wl${k}`);
            const x = (random(`wx${k}`) * W + sec * (8 + near * 20)) % (W + 200) - 100;
            const o = 0.15 + 0.5 * Math.abs(Math.sin(sec * 1.4 + k));
            return <rect key={k} x={x} y={y} width={len} height={2 + near * 3} rx={2} fill={l.shimmer} opacity={o} />;
          })}
          {l.sunX !== undefined &&
            Array.from({length: 26}, (_, k) => {
              const y = top + 10 + k * ((H - top) / 30);
              const w = 40 + k * 9 + Math.sin(sec * 2 + k) * 18;
              return <rect key={k} x={l.sunX! * W - w / 2 + Math.sin(sec * 1.5 + k * 1.3) * 10} y={y} width={w} height={5} rx={3} fill={l.shimmer} opacity={0.6 - k * 0.018} />;
            })}
          {l.ripples &&
            Array.from({length: 18}, (_, k) => {
              const period = 2.2;
              const ph = (sec + random(`rp${k}`) * period) % period;
              const x = random(`rx${k}`) * W;
              const y = top + 60 + random(`ry${k}`) * (H - top - 60);
              const s = 0.5 + (y - top) / (H - top);
              return <ellipse key={k} cx={x} cy={y} rx={ph * 40 * s} ry={ph * 9 * s} fill="none" stroke={l.shimmer} strokeWidth={2} opacity={(1 - ph / period) * 0.7} />;
            })}
        </g>
      );
    }
    case 'river': {
      const top = l.from * H;
      const pts = (side: number, s: string) => {
        const arr: string[] = [];
        for (let k = 0; k <= 24; k++) {
          const v = k / 24;
          const y = top + v * (H - top);
          const half = (8 + v * v * l.width * W) / 2;
          const cx = W * 0.5 + Math.sin(v * 5 + (l.seed ?? 0)) * (60 + 220 * (1 - v)) * (1 - v * 0.3);
          arr.push(`${(cx + side * half).toFixed(1)},${y.toFixed(1)}${s}`);
        }
        return arr;
      };
      const left = pts(-1, '');
      const right = pts(1, '').reverse();
      return (
        <g>
          <path d={`M${left.join(' L')} L${right.join(' L')} Z`} fill={l.color} />
          {l.fork && <path d={`M${W * 0.5},${top + (H - top) * 0.45} Q${W * 0.15},${top + (H - top) * 0.2} ${W * 0.05},${top}`} stroke={l.color} strokeWidth={38} fill="none" />}
          {Array.from({length: 40}, (_, k) => {
            const v = random(`rv${k}`);
            const y = top + ((v + sec * 0.04) % 1) * (H - top);
            const vv = (y - top) / (H - top);
            const cx = W * 0.5 + Math.sin(vv * 5 + (l.seed ?? 0)) * (60 + 220 * (1 - vv)) * (1 - vv * 0.3);
            const w = (8 + vv * vv * l.width * W) * 0.35 * random(`rw${k}`);
            return <rect key={k} x={cx - w / 2 + (random(`ro${k}`) - 0.5) * w} y={y} width={w} height={2 + vv * 4} rx={2} fill={l.shimmer} opacity={0.5 * Math.abs(Math.sin(sec * 2 + k))} />;
          })}
        </g>
      );
    }
    case 'waterfall': {
      const x = l.x * W - (l.w * W) / 2;
      const w = l.w * W;
      const top = l.top * H;
      const bottom = l.bottom * H;
      return (
        <g>
          <rect x={x} y={top} width={w} height={bottom - top} fill={l.color} opacity={0.9} />
          {Array.from({length: 60}, (_, k) => {
            const lx = x + random(`fx${k}`) * w;
            const len = 60 + random(`fl${k}`) * 160;
            const y = top + ((random(`fy${k}`) * (bottom - top) + sec * 520) % (bottom - top + len)) - len;
            return <rect key={k} x={lx} y={Math.max(top, y)} width={3 + random(`fw${k}`) * 5} height={len} fill="#FFFFFF" opacity={0.35 + random(`fo${k}`) * 0.4} />;
          })}
          <g filter={f('blur18')}>
            {Array.from({length: 9}, (_, k) => (
              <ellipse key={k} cx={x + (k / 8) * w} cy={bottom + Math.sin(sec * 3 + k) * 8} rx={w * 0.22} ry={46} fill="#FFFFFF" opacity={0.55} />
            ))}
          </g>
        </g>
      );
    }
    case 'rain':
      return (
        <g opacity={l.opacity}>
          {Array.from({length: l.count}, (_, k) => {
            const speed = 1500 + random(`rs${k}`) * 700;
            const x = random(`rx${k}`) * (W + 200) - 100;
            const y = ((random(`ry${k}`) * H + sec * speed) % (H + 200)) - 100;
            const len = 40 + random(`rl${k}`) * 50;
            return <line key={k} x1={x} y1={y} x2={x - len * 0.12} y2={y + len} stroke={l.color ?? '#E6EEF2'} strokeWidth={2} strokeLinecap="round" opacity={0.3 + random(`ro${k}`) * 0.5} />;
          })}
        </g>
      );
    case 'mist':
      return (
        <g filter={f('blur40')} opacity={l.opacity}>
          {Array.from({length: l.count ?? 5}, (_, k) => (
            <ellipse key={k} cx={((random(`mx${i}${k}`) * W + sec * (10 + k * 4)) % (W + 600)) - 300} cy={l.y * H + (k - 2) * 26} rx={420} ry={60} fill={l.color} />
          ))}
        </g>
      );
    case 'grass': {
      const base = l.y * H;
      return (
        <g>
          <rect x={0} y={base} width={W} height={H - base} fill={l.color} />
          {Array.from({length: l.count}, (_, k) => {
            const seed = `${l.seed ?? 0}g${k}`;
            const x = random(seed) * W;
            const y = base + random(seed + 'y') * (H - base) * 0.9;
            const h = l.height * H * (0.5 + random(seed + 'h') * 0.7) * (0.6 + (y - base) / (H - base));
            const sway = Math.sin(sec * 1.3 + x * 0.01) * h * 0.18;
            return (
              <path
                key={k}
                d={`M${x - 5},${y} Q${x + sway * 0.4},${y - h * 0.6} ${x + sway},${y - h} Q${x + sway * 0.4 + 2},${y - h * 0.6} ${x + 5},${y} Z`}
                fill={random(seed + 'c') > 0.6 && l.tip ? l.tip : l.color}
                stroke={l.tip ?? l.color}
                strokeOpacity={0.25}
              />
            );
          })}
        </g>
      );
    }
    case 'field': {
      const base = l.y * H;
      return (
        <g>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor={l.colors[0]} />
              <stop offset="1" stopColor={l.colors[1]} />
            </linearGradient>
          </defs>
          <rect x={0} y={base} width={W} height={H - base} fill={`url(#${id})`} />
          {Array.from({length: l.rows}, (_, r) => {
            const v = Math.pow((r + 1) / l.rows, 1.8);
            const y = base + v * (H - base);
            const n = Math.round(14 + (1 - v) * 40);
            const h = 10 + v * 120;
            return Array.from({length: n}, (_, k) => {
              const x = ((k + (r % 2) * 0.5) / n) * W;
              const sway = Math.sin(sec * 1.4 + x * 0.008 + r) * h * 0.25;
              return (
                <g key={`${r}-${k}`}>
                  <path d={`M${x},${y} Q${x + sway * 0.3},${y - h * 0.5} ${x + sway},${y - h}`} stroke={l.stalk} strokeWidth={1.5 + v * 4} fill="none" strokeLinecap="round" />
                  {l.grain && <ellipse cx={x + sway} cy={y - h} rx={2 + v * 5} ry={5 + v * 14} fill={l.grain} transform={`rotate(${sway * 0.8} ${x + sway} ${y - h})`} />}
                </g>
              );
            });
          })}
        </g>
      );
    }
    case 'flowers': {
      const base = l.y * H;
      return (
        <g>
          {Array.from({length: l.count}, (_, k) => {
            const seed = `${l.seed ?? 0}f${k}`;
            const y = base + Math.pow(random(seed + 'y'), 1.5) * (H - base);
            const near = (y - base) / (H - base);
            const x = random(seed) * W;
            const s = l.size * (0.35 + near * 1.1);
            const sway = Math.sin(sec * 1.2 + k) * 10 * near;
            const c = l.colors[k % l.colors.length];
            return (
              <g key={k} transform={`translate(${x + sway} ${y})`}>
                <path d={`M${-sway},${s * 4} Q0,${s * 2} 0,0`} stroke="#3F6B3A" strokeWidth={Math.max(1.5, s * 0.25)} fill="none" />
                {Array.from({length: 5}, (_, p) => (
                  <ellipse key={p} cx={0} cy={-s * 0.6} rx={s * 0.45} ry={s * 0.75} fill={c} transform={`rotate(${p * 72})`} />
                ))}
                <circle r={s * 0.35} fill="#F5D46A" />
              </g>
            );
          })}
        </g>
      );
    }
    case 'tree': {
      const x = l.x * W;
      const y = l.y * H;
      const s = l.scale;
      const sway = Math.sin(sec * 0.9) * 6 * s;
      const blobs = Array.from({length: 11}, (_, k) => ({
        cx: (random(`tb${l.seed}${k}x`) - 0.5) * 300 * s,
        cy: -300 * s - random(`tb${l.seed}${k}y`) * 260 * s,
        r: (90 + random(`tb${l.seed}${k}r`) * 70) * s,
      }));
      return (
        <g>
          <path d={`M${x - 24 * s},${y} Q${x - 10 * s},${y - 200 * s} ${x - 30 * s},${y - 320 * s} L${x + 30 * s},${y - 320 * s} Q${x + 10 * s},${y - 200 * s} ${x + 24 * s},${y} Z`} fill={l.trunk} />
          <g transform={`translate(${x + sway} ${y})`}>
            {blobs.map((b, k) => (
              <circle key={k} cx={b.cx} cy={b.cy} r={b.r} fill={l.leaf} opacity={0.92} />
            ))}
            {blobs.map((b, k) => (
              <circle key={`h${k}`} cx={b.cx - b.r * 0.25} cy={b.cy - b.r * 0.3} r={b.r * 0.55} fill="#FFFFFF" opacity={0.06} />
            ))}
            {l.fruit &&
              Array.from({length: 22}, (_, k) => (
                <circle key={`f${k}`} cx={(random(`tf${k}x`) - 0.5) * 380 * s} cy={-260 * s - random(`tf${k}y`) * 300 * s} r={14 * s} fill={l.fruit} />
              ))}
          </g>
        </g>
      );
    }
    case 'branch': {
      const flip = l.side === 'right' ? -1 : 1;
      const ox = l.side === 'right' ? W : 0;
      const y = l.y * H;
      const sway = Math.sin(sec * 0.8) * 8;
      const tw = (k: number) => ({x: ox + flip * (120 + k * 95), y: y + Math.sin(k * 1.7) * 60 + k * 18 + sway * (k / 8)});
      return (
        <g>
          <path d={`M${ox},${y + 30} Q${ox + flip * 400},${y - 40} ${ox + flip * 860},${y + 140 + sway}`} stroke={l.wood} strokeWidth={26} fill="none" strokeLinecap="round" />
          {Array.from({length: 8}, (_, k) => {
            const p = tw(k);
            return (
              <g key={k}>
                {l.leaf && <ellipse cx={p.x} cy={p.y - 40} rx={34} ry={78} fill={l.leaf} transform={`rotate(${flip * (30 + k * 9)} ${p.x} ${p.y - 40})`} />}
                {l.leaf && <ellipse cx={p.x + 20} cy={p.y + 40} rx={30} ry={70} fill={l.leaf} opacity={0.85} transform={`rotate(${flip * (140 + k * 7)} ${p.x + 20} ${p.y + 40})`} />}
                {l.blossom &&
                  Array.from({length: 4}, (_, q) => {
                    const bx = p.x + (random(`bb${k}${q}x`) - 0.5) * 110;
                    const by = p.y + (random(`bb${k}${q}y`) - 0.5) * 110;
                    return (
                      <g key={q} transform={`translate(${bx} ${by})`}>
                        {Array.from({length: 5}, (_, z) => (
                          <ellipse key={z} cx={0} cy={-13} rx={10} ry={15} fill={l.blossom} transform={`rotate(${z * 72})`} />
                        ))}
                        <circle r={6} fill="#F2C9A0" />
                      </g>
                    );
                  })}
                {l.fruit && k % 2 === 1 && (
                  <g>
                    <line x1={p.x} y1={p.y} x2={p.x} y2={p.y + 40} stroke={l.wood} strokeWidth={4} />
                    {l.fruitShape === 'mango' ? (
                      <ellipse cx={p.x + 6} cy={p.y + 95} rx={38} ry={58} fill={l.fruit} transform={`rotate(-12 ${p.x} ${p.y + 95})`} />
                    ) : (
                      <circle cx={p.x} cy={p.y + 80} r={44} fill={l.fruit} />
                    )}
                  </g>
                )}
              </g>
            );
          })}
        </g>
      );
    }
    case 'leaves': {
      return (
        <g>
          {[
            {x: 320, y: 1250, r: -35, s: 1.5},
            {x: 780, y: 1050, r: 30, s: 1.25},
            {x: 520, y: 1650, r: 10, s: 1.7},
            {x: 150, y: 820, r: -60, s: 1},
          ].map((lf, k) => {
            const sway = Math.sin(sec * 0.7 + k) * 3;
            return (
              <g key={k} transform={`translate(${lf.x} ${lf.y}) rotate(${lf.r + sway}) scale(${lf.s})`}>
                <path d="M0,0 C120,-60 200,-220 0,-420 C-200,-220 -120,-60 0,0 Z" fill={l.colors[k % l.colors.length]} />
                <path d="M0,0 L0,-400" stroke="#FFFFFF" strokeOpacity={0.25} strokeWidth={4} />
                {[0.25, 0.45, 0.65].map((v) => (
                  <path key={v} d={`M0,${-400 * v} Q${70},${-400 * v - 50} ${110},${-400 * v - 70} M0,${-400 * v} Q${-70},${-400 * v - 50} ${-110},${-400 * v - 70}`} stroke="#FFFFFF" strokeOpacity={0.15} strokeWidth={3} fill="none" />
                ))}
                {l.dew &&
                  [
                    [30, -140, 14],
                    [-50, -220, 10],
                    [20, -300, 8],
                  ].map(([dx, dy, r], q) => {
                    const slide = q === 0 ? ((sec % 2.5) / 2.5) * 120 : 0;
                    return (
                      <g key={q} transform={`translate(${dx} ${dy + slide})`}>
                        <circle r={r} fill="#FFFFFF" opacity={0.35} />
                        <circle r={r * 0.35} cx={-r * 0.3} cy={-r * 0.3} fill="#FFFFFF" opacity={0.9} />
                      </g>
                    );
                  })}
              </g>
            );
          })}
        </g>
      );
    }
    case 'canopy':
      return (
        <g>
          {Array.from({length: 30}, (_, k) => {
            const a = (k / 30) * Math.PI * 2;
            const d = 620 + random(`cd${k}`) * 300;
            const sway = Math.sin(sec * 0.9 + k) * 12;
            return <circle key={k} cx={W / 2 + Math.cos(a) * d + sway} cy={H / 2 + Math.sin(a) * d * 1.4} r={220 + random(`cr${k}`) * 160} fill={l.color} />;
          })}
          {Array.from({length: 24}, (_, k) => (
            <circle key={`s${k}`} cx={random(`cl${k}x`) * W} cy={random(`cl${k}y`) * H} r={10 + random(`cl${k}r`) * 22} fill={l.light} opacity={0.5 * Math.abs(Math.sin(sec * 1.7 + k))} />
          ))}
        </g>
      );
    case 'lotus': {
      const base = l.y * H;
      return (
        <g>
          {Array.from({length: l.count}, (_, k) => {
            const y = base + Math.pow(random(`ly${k}`), 1.3) * (H - base - 80);
            const near = (y - base) / (H - base);
            const x = random(`lx${k}`) * W;
            const s = 0.4 + near * 1.3;
            const bob = Math.sin(sec * 1.1 + k) * 4;
            return (
              <g key={k} transform={`translate(${x} ${y + bob}) scale(${s})`}>
                <path d="M0,0 m-110,0 a110,38 0 1,0 220,0 a110,38 0 1,0 -220,0 M0,0 L95,-18" fill={l.pad} stroke="#2E5A3A" strokeWidth={2} />
                {k % 2 === 0 &&
                  [-50, -25, 0, 25, 50].map((r, p) => (
                    <path key={p} d="M0,-8 C-28,-50 -18,-100 0,-120 C18,-100 28,-50 0,-8 Z" fill={l.petal} opacity={0.92 - Math.abs(r) / 200} transform={`rotate(${r}) scale(${1 - Math.abs(r) / 220})`} />
                  ))}
              </g>
            );
          })}
        </g>
      );
    }
    case 'rainbow': {
      const cols = ['#E57373', '#F0A35E', '#F3D36B', '#8CCB7E', '#6FB3E0', '#8C88D8'];
      return (
        <g opacity={l.opacity * Math.min(1, t * 2.5)} filter={f('blur6')}>
          {cols.map((c, k) => (
            <path key={k} d={`M${l.cx * W - (l.r * W - k * 16)},${l.cy * H} A${l.r * W - k * 16},${l.r * W - k * 16} 0 0 1 ${l.cx * W + (l.r * W - k * 16)},${l.cy * H}`} stroke={c} strokeWidth={17} fill="none" />
          ))}
        </g>
      );
    }
    case 'petals':
      return (
        <g>
          {Array.from({length: l.count}, (_, k) => {
            const y = ((random(`py${k}`) * H + sec * (60 + random(`ps${k}`) * 60)) % (H + 100)) - 50;
            const x = random(`px${k}`) * W + Math.sin(sec + k) * 40;
            return <ellipse key={k} cx={x} cy={y} rx={9} ry={14} fill={l.color} opacity={0.85} transform={`rotate(${sec * 60 + k * 40} ${x} ${y})`} />;
          })}
        </g>
      );
    case 'waves': {
      const top = l.y * H;
      return (
        <g>
          <rect x={0} y={top} width={W} height={H - top} fill={l.sand} />
          {Array.from({length: 4}, (_, k) => {
            const ph = ((sec / 4 + k / 4) % 1);
            const edge = top + ph * (H - top) * 0.55;
            const wav = (yy: number) => {
              const pts: string[] = [];
              for (let x = 0; x <= W; x += 30) pts.push(`${x},${(yy + Math.sin(x * 0.012 + k * 2 + sec) * 18).toFixed(1)}`);
              return pts.join(' L');
            };
            return (
              <g key={k} opacity={1 - ph}>
                <path d={`M0,${top} L${W},${top} L${W},${edge} L${wav(edge).split(' L').reverse().join(' L')} Z`} fill={l.sea} opacity={0.45} />
                <path d={`M${wav(edge)}`} stroke={l.foam} strokeWidth={6} fill="none" strokeLinecap="round" />
              </g>
            );
          })}
        </g>
      );
    }
    case 'stones': {
      const base = l.y * H;
      return (
        <g>
          {Array.from({length: l.count}, (_, k) => {
            const y = base + Math.pow(random(`gy${k}`), 1.2) * (H - base);
            const near = (y - base) / (H - base);
            return <ellipse key={k} cx={random(`gx${k}`) * W} cy={y} rx={(30 + random(`gr${k}`) * 50) * (0.4 + near * 1.6)} ry={(14 + random(`gq${k}`) * 20) * (0.4 + near * 1.6)} fill={l.colors[k % l.colors.length]} opacity={0.9} />;
          })}
        </g>
      );
    }
    case 'sparkle':
      return (
        <g>
          {Array.from({length: l.count}, (_, k) => {
            const x = random(`kx${k}`) * W;
            const y = (l.y[0] + random(`ky${k}`) * (l.y[1] - l.y[0])) * H - sec * 12;
            return <circle key={k} cx={x + Math.sin(sec + k) * 20} cy={y} r={2 + random(`kr${k}`) * 4} fill={l.color} opacity={0.6 * Math.abs(Math.sin(sec * 1.3 + k))} />;
          })}
        </g>
      );
  }
};

/** Paints a scene. `seconds` is how long it is on screen, for the slow camera move and colour changes. */
export const Nature: React.FC<{scene: NatureScene; seconds: number}> = ({scene, seconds}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  // every SVG id must be unique in the page, since several scenes are drawn at once during crossfades
  const u = React.useId().replace(/:/g, '');
  const t = interpolate(frame, [0, seconds * fps], [0, 1], {extrapolateRight: 'clamp'});
  const eased = t * t * (3 - 2 * t);
  const zoom = 1 + (scene.zoom ?? 0.06) * eased;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{transform: `scale(${zoom})`, transformOrigin: `50% ${(scene.originY ?? 0.55) * 100}%`}}>
        <defs>
          <filter id={`${u}blur6`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation={6} />
          </filter>
          <filter id={`${u}blur18`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={18} />
          </filter>
          <filter id={`${u}blur40`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation={40} />
          </filter>
        </defs>
        {scene.layers.map((l, i) => (
          <LayerView key={i} l={l} i={i} t={eased} frame={frame} fps={fps} u={u} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
