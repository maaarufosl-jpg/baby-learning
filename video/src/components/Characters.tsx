import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme';
import type {ArmPose, CharacterId, CharacterPlacement, Mood} from '../types';

/** All character positions are expressed on a fixed 1920x1080 stage. */
export const STAGE_W = 1920;
export const STAGE_H = 1080;

/*
 * Picture-book style: natural proportions, almond eyes with brown irises and lashes,
 * soft brows, small nose and lips, and clear brown outlines so every shape reads well.
 */
const LINE = '#5B4036';
const SKIN = '#F9D3B6';
const SKIN_SHADE = '#EDB896';
const SKIN_LINE = '#C08A6E';
const HAIR = '#3E2A22';
const LIP = '#9C4A44';

const useBlink = (offset: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const period = Math.round(fps * 3.6);
  const t = (frame + offset) % period;
  return t < 5 ? 1 - Math.abs(t - 2.5) / 2.5 : 0;
};

const Defs: React.FC<{p: string}> = ({p}) => (
  <defs>
    <radialGradient id={`${p}-iris`} cx="0.45" cy="0.35" r="0.7">
      <stop offset="0" stopColor="#9A6440" />
      <stop offset="1" stopColor="#3A2214" />
    </radialGradient>
    <radialGradient id={`${p}-blush`}>
      <stop offset="0" stopColor="#FF9BA6" stopOpacity="0.55" />
      <stop offset="1" stopColor="#FF9BA6" stopOpacity="0" />
    </radialGradient>
  </defs>
);

const Shadow: React.FC<{y: number; rx: number}> = ({y, rx}) => <ellipse cx={100} cy={y} rx={rx} ry={8} fill="rgba(59,58,74,0.12)" />;

/* ---------- face parts ---------- */

type EyeProps = {p: string; cx: number; cy: number; s: number; mood: Mood; blink: number; side: 'l' | 'r'; lashes?: boolean};

const Eye: React.FC<EyeProps> = ({p, cx, cy, s, mood, blink, side, lashes}) => {
  const out = side === 'l' ? -1 : 1;
  const w = 12 * s;
  const lashMarks = (y: number) =>
    lashes ? (
      <g stroke={LINE} strokeWidth={2 * s} strokeLinecap="round">
        <path d={`M ${cx + out * w} ${y} l ${out * 4.5 * s} ${-2 * s}`} />
        <path d={`M ${cx + out * w * 0.7} ${y - 3.5 * s} l ${out * 3.5 * s} ${-3.5 * s}`} />
      </g>
    ) : null;
  if (mood === 'excited') {
    return (
      <g>
        <path d={`M ${cx - w} ${cy + 2 * s} Q ${cx} ${cy - 8 * s} ${cx + w} ${cy + 2 * s}`} stroke={LINE} strokeWidth={2.8 * s} fill="none" strokeLinecap="round" />
        {lashMarks(cy + 1 * s)}
      </g>
    );
  }
  if (blink > 0.5) {
    return (
      <g>
        <path d={`M ${cx - w} ${cy} Q ${cx} ${cy + 5 * s} ${cx + w} ${cy}`} stroke={LINE} strokeWidth={2.6 * s} fill="none" strokeLinecap="round" />
        {lashMarks(cy + 1 * s)}
      </g>
    );
  }
  const open = mood === 'surprised' ? 1.3 : mood === 'sad' ? 0.85 : 1;
  const h = 8.6 * s * open * (1 - blink * 0.8);
  const almond = `M ${cx - w} ${cy} C ${cx - w * 0.6} ${cy - h * 1.2} ${cx + w * 0.6} ${cy - h * 1.2} ${cx + w} ${cy} C ${cx + w * 0.6} ${cy + h * 0.9} ${cx - w * 0.6} ${cy + h * 0.9} ${cx - w} ${cy} Z`;
  const lx = mood === 'thinking' ? -2.5 * s : 0;
  const ly = mood === 'thinking' ? -2 * s : 0.5 * s;
  const ir = 6.8 * s * (mood === 'surprised' ? 0.85 : 1);
  const clip = `${p}-eye-${side}`;
  return (
    <g>
      <clipPath id={clip}>
        <path d={almond} />
      </clipPath>
      <path d={almond} fill={colors.white} />
      <g clipPath={`url(#${clip})`}>
        <circle cx={cx + lx} cy={cy + ly} r={ir} fill={`url(#${p}-iris)`} />
        <circle cx={cx + lx} cy={cy + ly} r={ir * 0.45} fill="#1A0F0A" />
        <circle cx={cx + lx + ir * 0.38} cy={cy + ly - ir * 0.42} r={ir * 0.32} fill={colors.white} />
        <circle cx={cx + lx - ir * 0.35} cy={cy + ly + ir * 0.35} r={ir * 0.14} fill={colors.white} opacity={0.85} />
        <path d={`M ${cx - w} ${cy - h * 1.3} H ${cx + w} V ${cy - h * 0.55} Q ${cx} ${cy - h * 1.05} ${cx - w} ${cy - h * 0.55} Z`} fill="rgba(120,70,40,0.18)" />
      </g>
      <path
        d={`M ${cx - w - 1} ${cy + 0.5} C ${cx - w * 0.6} ${cy - h * 1.25} ${cx + w * 0.6} ${cy - h * 1.25} ${cx + w + 1} ${cy - 0.5}`}
        stroke={LINE}
        strokeWidth={2.6 * s}
        fill="none"
        strokeLinecap="round"
      />
      <path d={`M ${cx - w * 0.7} ${cy + h * 0.72} Q ${cx} ${cy + h * 1.0} ${cx + w * 0.7} ${cy + h * 0.72}`} stroke={SKIN_LINE} strokeWidth={1.2 * s} fill="none" opacity={0.6} />
      {lashMarks(cy - 1 * s)}
    </g>
  );
};

const Brow: React.FC<{cx: number; cy: number; s: number; mood: Mood; side: 'l' | 'r'; color?: string}> = ({cx, cy, s, mood, side, color = HAIR}) => {
  const out = side === 'l' ? -1 : 1;
  const base = cy - 13 * s - (mood === 'surprised' ? 4 * s : 0);
  const outerX = cx + out * 11 * s;
  const innerX = cx - out * 9 * s;
  const innerLift = mood === 'sad' ? -4 * s : mood === 'thinking' && side === 'r' ? -4 * s : 0;
  return (
    <path
      d={`M ${outerX} ${base + 1.5 * s} Q ${cx} ${base - 4 * s} ${innerX} ${base + innerLift}`}
      stroke={color}
      strokeWidth={2.8 * s}
      fill="none"
      strokeLinecap="round"
    />
  );
};

const Mouth: React.FC<{cx: number; cy: number; s: number; mood: Mood; talking: boolean}> = ({cx, cy, s, mood, talking}) => {
  const frame = useCurrentFrame();
  const open = talking ? 0.5 + 0.5 * Math.sin(frame * 0.9) : 0;
  if (mood === 'surprised') return <ellipse cx={cx} cy={cy + 2 * s} rx={4 * s} ry={(5.5 + open * 1.5) * s} fill="#8E3B3B" stroke={LIP} strokeWidth={1.2} />;
  if (mood === 'sad') return <path d={`M ${cx - 6 * s} ${cy + 3 * s} Q ${cx} ${cy - 2 * s} ${cx + 6 * s} ${cy + 3 * s}`} stroke={LIP} strokeWidth={2.4 * s} fill="none" strokeLinecap="round" />;
  if (mood === 'thinking') return <path d={`M ${cx - 5 * s} ${cy + 1 * s} Q ${cx + 1 * s} ${cy + (3 + open * 3) * s} ${cx + 6 * s} ${cy - 1 * s}`} stroke={LIP} strokeWidth={2.4 * s} fill="none" strokeLinecap="round" />;
  if (open > 0.15 || mood === 'excited') {
    const w = (mood === 'excited' ? 10 : 7.5) * s;
    const d = (mood === 'excited' ? 10 : 4 + open * 6) * s;
    return (
      <g>
        <path d={`M ${cx - w} ${cy} Q ${cx} ${cy + d * 1.5} ${cx + w} ${cy} Q ${cx} ${cy + 1.5 * s} ${cx - w} ${cy} Z`} fill="#8E3B3B" stroke={LIP} strokeWidth={1.4 * s} strokeLinejoin="round" />
        <path d={`M ${cx - w * 0.7} ${cy + 1 * s} Q ${cx} ${cy + 3 * s} ${cx + w * 0.7} ${cy + 1 * s} L ${cx + w * 0.6} ${cy + 0.5 * s} Q ${cx} ${cy + 1.6 * s} ${cx - w * 0.6} ${cy + 0.5 * s} Z`} fill={colors.white} />
        <ellipse cx={cx} cy={cy + d * 0.95} rx={w * 0.5} ry={d * 0.28} fill="#F28B95" />
      </g>
    );
  }
  return <path d={`M ${cx - 7 * s} ${cy} Q ${cx} ${cy + 6 * s} ${cx + 7 * s} ${cy}`} stroke={LIP} strokeWidth={2.4 * s} fill="none" strokeLinecap="round" />;
};

type FaceProps = {
  p: string;
  cx: number;
  eyeY: number;
  eyeDX: number;
  s: number;
  noseY: number;
  mouthY: number;
  mood: Mood;
  talking: boolean;
  blink: number;
  lashes?: boolean;
};

const Face: React.FC<FaceProps> = ({p, cx, eyeY, eyeDX, s, noseY, mouthY, mood, talking, blink, lashes}) => (
  <g>
    <ellipse cx={cx - eyeDX - 3 * s} cy={eyeY + 13 * s} rx={9 * s} ry={5.5 * s} fill={`url(#${p}-blush)`} />
    <ellipse cx={cx + eyeDX + 3 * s} cy={eyeY + 13 * s} rx={9 * s} ry={5.5 * s} fill={`url(#${p}-blush)`} />
    <Brow cx={cx - eyeDX} cy={eyeY} s={s} mood={mood} side="l" />
    <Brow cx={cx + eyeDX} cy={eyeY} s={s} mood={mood} side="r" />
    <Eye p={p} cx={cx - eyeDX} cy={eyeY} s={s} mood={mood} blink={blink} side="l" lashes={lashes} />
    <Eye p={p} cx={cx + eyeDX} cy={eyeY} s={s} mood={mood} blink={blink} side="r" lashes={lashes} />
    <path d={`M ${cx - 3 * s} ${noseY} Q ${cx} ${noseY + 3.5 * s} ${cx + 3 * s} ${noseY}`} stroke={SKIN_LINE} strokeWidth={2 * s} fill="none" strokeLinecap="round" />
    <Mouth cx={cx} cy={mouthY} s={s} mood={mood} talking={talking} />
  </g>
);

/** A small hand with four fingers and a thumb, pointing along +y from the wrist at (x, y). */
const Hand: React.FC<{x: number; y: number; s: number; side: 'l' | 'r'}> = ({x, y, s, side}) => {
  const t = side === 'l' ? 1 : -1;
  const lens = [8.5, 10.5, 10, 8];
  return (
    <g fill={SKIN} stroke={SKIN_LINE} strokeWidth={1.5} strokeLinejoin="round">
      {lens.map((len, i) => (
        <rect key={i} x={x + (-8 + i * 4) * s} y={y + 9 * s} width={4.2 * s} height={len * s} rx={2.1 * s} />
      ))}
      <rect
        x={x + t * 7 * s - 2.2 * s}
        y={y + 3 * s}
        width={4.4 * s}
        height={9.5 * s}
        rx={2.2 * s}
        transform={`rotate(${-t * 38} ${x + t * 7 * s} ${y + 4 * s})`}
      />
      <rect x={x - 8.5 * s} y={y} width={17 * s} height={14 * s} rx={6 * s} />
    </g>
  );
};

/* ---------- arms (two segments so elbows can bend) ---------- */

/** [upper arm, forearm relative] in degrees. side 'l' is the viewer's left = the character's RIGHT arm. */
const armAngles = (pose: ArmPose, side: 'l' | 'r', frame: number, fps: number): [number, number] => {
  const out = side === 'l' ? 1 : -1;
  switch (pose) {
    case 'up':
      return [out * 160, 0];
    case 'wave':
      return [out * 150, out * (15 + Math.sin(frame * 0.35) * 25)];
    case 'reach':
      return [-out * 30, -out * 25];
    case 'eat': {
      const t = (1 - Math.cos(((frame / fps) * Math.PI * 2) / 1.8)) / 2;
      return [-out * (25 + t * 35), -out * (15 + t * 105)];
    }
    default:
      return [out * 10 + Math.sin(frame * 0.12) * 2.5, -out * 8];
  }
};

const Arm: React.FC<{x: number; y: number; pose: ArmPose; side: 'l' | 'r'; sleeve: string; line: string; upper: number; fore: number; s?: number}> = ({
  x,
  y,
  pose,
  side,
  sleeve,
  line,
  upper,
  fore,
  s = 1,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const [a, b] = armAngles(pose, side, frame, fps);
  return (
    <g transform={`rotate(${a} ${x} ${y})`}>
      <rect x={x - 10 * s} y={y - 6} width={20 * s} height={upper + 12} rx={10 * s} fill={sleeve} stroke={line} strokeWidth={2} />
      <g transform={`rotate(${b} ${x} ${y + upper})`}>
        <rect x={x - 9 * s} y={y + upper - 8} width={18 * s} height={fore + 8} rx={9 * s} fill={sleeve} stroke={line} strokeWidth={2} />
        <Hand x={x} y={y + upper + fore - 4} s={s} side={side} />
      </g>
    </g>
  );
};

const Shoe: React.FC<{x: number; y: number; color: string; w?: number}> = ({x, y, color, w = 15}) => (
  <g>
    <path d={`M ${x - w} ${y + 4} Q ${x - w} ${y - 6} ${x} ${y - 6} Q ${x + w} ${y - 6} ${x + w} ${y + 4} Q ${x + w} ${y + 8} ${x} ${y + 8} Q ${x - w} ${y + 8} ${x - w} ${y + 4} Z`} fill={color} stroke={LINE} strokeWidth={2} />
    <path d={`M ${x - w + 3} ${y + 5} Q ${x} ${y + 8} ${x + w - 3} ${y + 5}`} stroke="rgba(255,255,255,0.45)" strokeWidth={2} fill="none" />
  </g>
);

type PersonProps = {mood: Mood; talking: boolean; right: ArmPose; left: ArmPose; blinkOffset: number};

/* ---------- Umayer: 4-year-old boy, white tupi, sky-blue panjabi ---------- */
const Umayer: React.FC<PersonProps> = ({mood, talking, right, left, blinkOffset}) => {
  const blink = useBlink(blinkOffset);
  const p = 'umayer';
  const kurta = '#83BCE2';
  const kurtaLine = '#4F7FA3';
  return (
    <g>
      <Defs p={p} />
      <Shadow y={310} rx={44} />
      <rect x={84} y={268} width={14} height={30} rx={6} fill={SKIN} stroke={SKIN_LINE} strokeWidth={1.6} />
      <rect x={102} y={268} width={14} height={30} rx={6} fill={SKIN} stroke={SKIN_LINE} strokeWidth={1.6} />
      <path d="M 74 232 L 99 232 L 99 288 Q 88 292 77 288 Z" fill="#FAF6EE" stroke={LINE} strokeWidth={2} strokeLinejoin="round" />
      <path d="M 101 232 L 126 232 L 123 288 Q 112 292 101 288 Z" fill="#FAF6EE" stroke={LINE} strokeWidth={2} strokeLinejoin="round" />
      <Shoe x={88} y={302} color="#8A5A3A" />
      <Shoe x={112} y={302} color="#8A5A3A" />
      <rect x={91} y={112} width={18} height={18} rx={6} fill={SKIN_SHADE} />
      <path d="M 68 136 Q 100 126 132 136 Q 140 186 142 240 Q 100 250 58 240 Q 60 186 68 136 Z" fill={kurta} stroke={kurtaLine} strokeWidth={2.2} />
      <path d="M 116 142 Q 130 190 132 240 Q 124 242 116 243 Q 120 190 110 142 Z" fill="#6EA7CE" opacity={0.55} />
      <rect x={86} y={124} width={28} height={12} rx={5} fill={kurta} stroke={kurtaLine} strokeWidth={2} />
      <path d="M 100 136 V 178" stroke={kurtaLine} strokeWidth={1.8} />
      {[148, 160, 172].map((y) => (
        <circle key={y} cx={100} cy={y} r={2.2} fill={colors.white} stroke={kurtaLine} strokeWidth={1} />
      ))}
      <Arm x={70} y={142} pose={right} side="l" sleeve={kurta} line={kurtaLine} upper={36} fore={38} />
      <Arm x={130} y={142} pose={left} side="r" sleeve={kurta} line={kurtaLine} upper={36} fore={38} />
      <ellipse cx={50} cy={86} rx={8} ry={11} fill={SKIN} stroke={SKIN_LINE} strokeWidth={2} />
      <ellipse cx={150} cy={86} rx={8} ry={11} fill={SKIN} stroke={SKIN_LINE} strokeWidth={2} />
      <path d="M 100 30 C 133 30 150 52 150 82 C 150 107 132 124 100 124 C 68 124 50 107 50 82 C 50 52 67 30 100 30 Z" fill={SKIN} stroke={SKIN_LINE} strokeWidth={2.2} />
      <path d="M 52 70 C 54 48 74 36 100 36 C 126 36 146 48 148 70 Q 138 60 128 68 Q 116 60 104 68 Q 92 60 80 68 Q 66 60 52 70 Z" fill={HAIR} />
      <path d="M 52 66 Q 51 82 56 90 L 59 70 Z" fill={HAIR} />
      <path d="M 148 66 Q 149 82 144 90 L 141 70 Z" fill={HAIR} />
      <path d="M 50 62 C 50 32 72 18 100 18 C 128 18 150 32 150 62 C 128 54 72 54 50 62 Z" fill={colors.white} stroke="#B8C4CF" strokeWidth={2} />
      <path d="M 56 56 Q 100 46 144 56" stroke="#BFD3E3" strokeWidth={2.4} fill="none" strokeDasharray="3 4" />
      <Face p={p} cx={100} eyeY={86} eyeDX={20} s={1} noseY={98} mouthY={108} mood={mood} talking={talking} blink={blink} />
    </g>
  );
};

/* ---------- Safa: 2.5-year-old girl, pink hijab with a flower ---------- */
const Safa: React.FC<PersonProps> = ({mood, talking, right, left, blinkOffset}) => {
  const blink = useBlink(blinkOffset);
  const p = 'safa';
  const hijab = '#F6AFC2';
  const hijabLine = '#D9839C';
  const frock = '#FFD08A';
  const frockLine = '#D9A050';
  return (
    <g>
      <Defs p={p} />
      <Shadow y={310} rx={40} />
      <path d="M 80 236 L 99 236 L 98 298 Q 89 301 81 298 Z" fill="#FFFFFF" stroke={LINE} strokeWidth={2} strokeLinejoin="round" />
      <path d="M 101 236 L 120 236 L 119 298 Q 111 301 102 298 Z" fill="#FFFFFF" stroke={LINE} strokeWidth={2} strokeLinejoin="round" />
      <Shoe x={90} y={302} color="#EF7C98" w={13} />
      <Shoe x={110} y={302} color="#EF7C98" w={13} />
      <path d="M 74 146 Q 100 138 126 146 Q 140 200 152 256 Q 100 272 48 256 Q 60 200 74 146 Z" fill={frock} stroke={frockLine} strokeWidth={2.2} />
      <path d="M 52 248 Q 100 264 148 248" stroke={colors.white} strokeWidth={5} fill="none" strokeLinecap="round" />
      {[
        [82, 200],
        [116, 188],
        [100, 218],
        [70, 236],
        [130, 234],
      ].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r={3} fill={colors.white} />
      ))}
      <Arm x={76} y={156} pose={right} side="l" sleeve={frock} line={frockLine} upper={30} fore={32} s={0.9} />
      <Arm x={124} y={156} pose={left} side="r" sleeve={frock} line={frockLine} upper={30} fore={32} s={0.9} />
      <path d="M 100 34 C 142 34 162 62 162 96 C 162 122 152 140 140 150 Q 150 168 128 176 L 72 176 Q 50 168 60 150 C 48 140 38 122 38 96 C 38 62 58 34 100 34 Z" fill={hijab} stroke={hijabLine} strokeWidth={2.2} />
      <path d="M 70 168 Q 100 178 130 168" stroke="#E596AC" strokeWidth={3} fill="none" strokeLinecap="round" />
      <path d="M 100 56 C 125 56 140 74 140 97 C 140 119 124 134 100 134 C 76 134 60 119 60 97 C 60 74 75 56 100 56 Z" fill={SKIN} stroke={SKIN_LINE} strokeWidth={2} />
      <path d="M 58 100 C 58 70 76 52 100 52 C 124 52 142 70 142 100 C 138 78 122 62 100 62 C 78 62 62 78 58 100 Z" fill={hijab} />
      <path d="M 70 44 Q 100 34 130 44" stroke={colors.white} strokeOpacity={0.5} strokeWidth={4} fill="none" strokeLinecap="round" />
      <g transform="translate(140 62)">
        {[0, 72, 144, 216, 288].map((a) => (
          <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 6.5} cy={Math.sin((a * Math.PI) / 180) * 6.5} r={5.5} fill={colors.white} stroke="#E7A8B8" strokeWidth={1} />
        ))}
        <circle r={4} fill={colors.gold} />
      </g>
      <Face p={p} cx={100} eyeY={98} eyeDX={17} s={0.95} noseY={109} mouthY={118} mood={mood} talking={talking} blink={blink} lashes />
    </g>
  );
};

/* ---------- Ammu / Nanu: mother and grandmother in hijab and abaya ---------- */
const HijabPerson: React.FC<PersonProps & {p: string; hijab: string; hijabLine: string; dress: string; dressLine: string; glasses?: boolean}> = ({
  mood,
  talking,
  right,
  left,
  blinkOffset,
  p,
  hijab,
  hijabLine,
  dress,
  dressLine,
  glasses,
}) => {
  const blink = useBlink(blinkOffset);
  return (
    <g>
      <Defs p={p} />
      <Shadow y={316} rx={58} />
      <path d="M 72 116 Q 100 108 128 116 Q 146 210 156 314 Q 100 322 44 314 Q 54 210 72 116 Z" fill={dress} stroke={dressLine} strokeWidth={2.2} />
      <path d="M 88 170 Q 84 240 78 312 M 112 170 Q 116 240 122 312" stroke={dressLine} strokeWidth={1.6} opacity={0.5} fill="none" />
      <Arm x={77} y={126} pose={right} side="l" sleeve={dress} line={dressLine} upper={50} fore={46} s={0.95} />
      <Arm x={123} y={126} pose={left} side="r" sleeve={dress} line={dressLine} upper={50} fore={46} s={0.95} />
      <path
        d="M 100 16 C 132 16 148 40 148 70 C 148 92 143 104 137 112 C 160 126 171 164 170 208 Q 136 222 100 220 Q 64 222 30 208 C 29 164 40 126 63 112 C 57 104 52 92 52 70 C 52 40 68 16 100 16 Z"
        fill={hijab}
        stroke={hijabLine}
        strokeWidth={2.2}
        strokeLinejoin="round"
      />
      <path d="M 66 132 Q 56 170 52 212 M 134 132 Q 144 170 148 212 M 84 140 Q 80 180 80 218 M 116 140 Q 120 180 120 218" stroke={hijabLine} strokeWidth={1.6} opacity={0.45} fill="none" strokeLinecap="round" />
      <path d="M 33 203 Q 66 215 100 214 Q 134 215 167 203" stroke={colors.white} strokeOpacity={0.7} strokeWidth={3} fill="none" strokeDasharray="1 6" strokeLinecap="round" />
      <path d="M 100 34 C 120 34 132 50 132 70 C 132 90 118 104 100 104 C 82 104 68 90 68 70 C 68 50 80 34 100 34 Z" fill={SKIN} stroke={SKIN_LINE} strokeWidth={2} />
      <path d="M 66 74 C 66 46 82 30 100 30 C 118 30 134 46 134 74 C 130 54 118 40 100 40 C 82 40 70 54 66 74 Z" fill={hijab} />
      <path d="M 80 26 Q 100 20 120 26" stroke={colors.white} strokeOpacity={0.45} strokeWidth={3} fill="none" strokeLinecap="round" />
      <Face p={p} cx={100} eyeY={70} eyeDX={13} s={0.72} noseY={80} mouthY={89} mood={mood} talking={talking} blink={blink} lashes />
      {glasses && (
        <g stroke="#8C7A99" strokeWidth={2} fill="none">
          <circle cx={87} cy={70} r={9.5} />
          <circle cx={113} cy={70} r={9.5} />
          <line x1={96.5} y1={69} x2={103.5} y2={69} />
        </g>
      )}
    </g>
  );
};

/* ---------- Abbu: father with tupi and short beard ---------- */
const Abbu: React.FC<PersonProps> = ({mood, talking, right, left, blinkOffset}) => {
  const blink = useBlink(blinkOffset);
  const p = 'abbu';
  const kurta = '#94C4A2';
  const kurtaLine = '#5E9670';
  return (
    <g>
      <Defs p={p} />
      <Shadow y={314} rx={52} />
      <path d="M 72 244 L 99 244 L 99 300 Q 87 304 75 300 Z" fill="#FAF6EE" stroke={LINE} strokeWidth={2} strokeLinejoin="round" />
      <path d="M 101 244 L 128 244 L 125 300 Q 113 304 101 300 Z" fill="#FAF6EE" stroke={LINE} strokeWidth={2} strokeLinejoin="round" />
      <Shoe x={87} y={306} color="#6E4A33" w={16} />
      <Shoe x={113} y={306} color="#6E4A33" w={16} />
      <rect x={90} y={96} width={20} height={18} rx={6} fill={SKIN_SHADE} />
      <path d="M 64 120 Q 100 110 136 120 Q 146 190 148 252 Q 100 262 52 252 Q 54 190 64 120 Z" fill={kurta} stroke={kurtaLine} strokeWidth={2.2} />
      <rect x={86} y={108} width={28} height={12} rx={5} fill={kurta} stroke={kurtaLine} strokeWidth={2} />
      <path d="M 100 120 V 170" stroke={kurtaLine} strokeWidth={1.8} />
      <Arm x={66} y={128} pose={right} side="l" sleeve={kurta} line={kurtaLine} upper={48} fore={44} />
      <Arm x={134} y={128} pose={left} side="r" sleeve={kurta} line={kurtaLine} upper={48} fore={44} />
      <ellipse cx={67} cy={66} rx={6} ry={9} fill={SKIN} stroke={SKIN_LINE} strokeWidth={2} />
      <ellipse cx={133} cy={66} rx={6} ry={9} fill={SKIN} stroke={SKIN_LINE} strokeWidth={2} />
      <path d="M 100 26 C 122 26 134 42 134 64 C 134 88 120 104 100 104 C 80 104 66 88 66 64 C 66 42 78 26 100 26 Z" fill={SKIN} stroke={SKIN_LINE} strokeWidth={2} />
      <path d="M 67 66 C 69 94 84 112 100 112 C 116 112 131 94 133 66 C 128 86 118 98 100 98 C 82 98 72 86 67 66 Z" fill="#4A342A" />
      <path d="M 90 85 Q 100 81 110 85 Q 100 88 90 85 Z" fill="#4A342A" />
      <path d="M 66 50 C 66 28 82 18 100 18 C 118 18 134 28 134 50 C 118 44 82 44 66 50 Z" fill={colors.white} stroke="#B8C4CF" strokeWidth={2} />
      <Face p={p} cx={100} eyeY={64} eyeDX={13} s={0.72} noseY={75} mouthY={90} mood={mood} talking={talking} blink={blink} />
    </g>
  );
};

/* ---------- Miu: the family kitten ---------- */
const CatEye: React.FC<{cx: number; cy: number; mood: Mood; blink: number}> = ({cx, cy, mood, blink}) => {
  if (mood === 'excited' || blink > 0.5)
    return <path d={`M ${cx - 10} ${cy + 2} Q ${cx} ${cy - 7} ${cx + 10} ${cy + 2}`} stroke={LINE} strokeWidth={3} fill="none" strokeLinecap="round" />;
  const h = mood === 'surprised' ? 13 : 11;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={10} ry={h} fill="#A8D86E" stroke={LINE} strokeWidth={2} />
      <ellipse cx={cx} cy={cy} rx={mood === 'surprised' ? 5.5 : 3.2} ry={h * 0.8} fill="#1A0F0A" />
      <circle cx={cx + 3} cy={cy - 4} r={2.6} fill={colors.white} />
    </g>
  );
};

const Miu: React.FC<{mood: Mood; talking: boolean}> = ({mood, talking}) => {
  const frame = useCurrentFrame();
  const blink = useBlink(17);
  const fur = colors.catFur;
  const line = '#B0703F';
  const tail = Math.sin(frame * 0.15) * 16;
  const surprised = mood === 'surprised';
  const earPerk = surprised ? -8 : 0;
  const pawUp = surprised ? -40 : 0;
  return (
    <g>
      <defs>
        <radialGradient id="miu-blush">
          <stop offset="0" stopColor="#FF9BA6" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FF9BA6" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={100} cy={308} rx={70} ry={8} fill="rgba(59,58,74,0.12)" />
      <path d="M 146 270 Q 196 250 184 196" stroke={line} strokeWidth={23} fill="none" strokeLinecap="round" transform={`rotate(${tail} 146 270)`} />
      <path d="M 146 270 Q 196 250 184 196" stroke={fur} strokeWidth={18} fill="none" strokeLinecap="round" transform={`rotate(${tail} 146 270)`} />
      <ellipse cx={100} cy={264} rx={54} ry={42} fill={fur} stroke={line} strokeWidth={2.2} />
      <ellipse cx={100} cy={276} rx={30} ry={24} fill={colors.catFurLight} />
      <ellipse cx={80} cy={302} rx={14} ry={8} fill={colors.catFurLight} stroke={line} strokeWidth={2} />
      <ellipse cx={120} cy={302 + pawUp} rx={14} ry={8} fill={colors.catFurLight} stroke={line} strokeWidth={2} />
      <path d={`M 50 ${168 + earPerk} L 56 ${112 + earPerk} L 88 ${136}`} fill={fur} stroke={line} strokeWidth={2.2} strokeLinejoin="round" />
      <path d={`M 150 ${168 + earPerk} L 144 ${112 + earPerk} L 112 ${136}`} fill={fur} stroke={line} strokeWidth={2.2} strokeLinejoin="round" />
      <path d={`M 58 ${156 + earPerk} L 61 ${124 + earPerk} L 80 ${140}`} fill="#F9B4B4" />
      <path d={`M 142 ${156 + earPerk} L 139 ${124 + earPerk} L 120 ${140}`} fill="#F9B4B4" />
      <ellipse cx={100} cy={182} rx={58} ry={52} fill={fur} stroke={line} strokeWidth={2.2} />
      <path d="M 90 134 q 2 9 0 16 M 100 132 q 0 11 0 19 M 110 134 q -2 9 0 16" stroke={line} strokeWidth={3} strokeLinecap="round" fill="none" />
      <ellipse cx={100} cy={204} rx={26} ry={18} fill={colors.catFurLight} />
      <ellipse cx={66} cy={204} rx={13} ry={8} fill="url(#miu-blush)" />
      <ellipse cx={134} cy={204} rx={13} ry={8} fill="url(#miu-blush)" />
      <CatEye cx={78} cy={182} mood={mood} blink={blink} />
      <CatEye cx={122} cy={182} mood={mood} blink={blink} />
      <path d="M 95 196 Q 100 193 105 196 Q 100 202 95 196 Z" fill="#F28B95" stroke={line} strokeWidth={1} />
      {surprised || talking ? (
        <ellipse cx={100} cy={211} rx={4.5} ry={5.5 + (talking ? 3 * Math.abs(Math.sin(frame * 0.5)) : 0)} fill="#8E3B3B" />
      ) : (
        <path d="M 92 205 Q 96 210 100 205 Q 104 210 108 205" stroke={LINE} strokeWidth={2.2} fill="none" strokeLinecap="round" />
      )}
      <g stroke={line} strokeWidth={1.8} strokeLinecap="round" opacity={0.8}>
        <line x1={46} y1={200} x2={70} y2={203} />
        <line x1={48} y1={212} x2={70} y2={208} />
        <line x1={154} y1={200} x2={130} y2={203} />
        <line x1={152} y1={212} x2={130} y2={208} />
      </g>
    </g>
  );
};

/* ---------- placement on the stage ---------- */

const BASE_HEIGHT: Record<CharacterId, number> = {umayer: 1, safa: 0.8, ammu: 1.4, abbu: 1.48, nanu: 1.32, miu: 0.55};
const PX_PER_UNIT = 1.35;

export const Character: React.FC<{placement: CharacterPlacement; prev?: CharacterPlacement; index: number; talking: boolean}> = ({
  placement,
  prev,
  index,
  talking,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const mood = placement.mood ?? 'calm';
  const scale = (placement.scale ?? 1) * BASE_HEIGHT[placement.id] * PX_PER_UNIT;

  // Where the character starts this beat: explicit entry point, last beat's spot, or right here.
  const startX = placement.from?.x ?? prev?.x ?? placement.x;
  const startY = placement.from?.y ?? prev?.y ?? placement.y;
  const isNew = !placement.from && !prev;
  const move = spring({frame, fps, config: {damping: 200}, durationInFrames: placement.from ? 36 : 22});
  const x = interpolate(move, [0, 1], [startX, placement.x]);
  const y = interpolate(move, [0, 1], [startY, placement.y]);
  const moving = Math.abs(startX - placement.x) > 0.01 && move < 0.97;

  const pop = isNew ? spring({frame, fps, config: {damping: 11, mass: 0.6}}) : 1;
  const opacity = isNew ? interpolate(frame, [0, 6], [0, 1], {extrapolateRight: 'clamp'}) : 1;

  const idleBob = Math.sin(frame * 0.1 + index) * 2.5;
  const walkBob = moving ? -Math.abs(Math.sin(frame * 0.55)) * 14 : 0;
  const hop = mood === 'excited' ? -Math.abs(Math.sin(frame * 0.3)) * 10 : 0;
  const nod = placement.nod ? Math.max(0, Math.sin(frame * 0.4)) * 6 : 0;
  const shake = placement.shake ? Math.sin(frame * 0.5) * 6 : 0;

  const w = 200 * scale;
  const h = 320 * scale;
  const px = x * STAGE_W;
  const py = y * STAGE_H + idleBob + walkBob + hop + nod;
  const right = placement.arms?.right ?? 'down';
  const left = placement.arms?.left ?? 'down';
  const common = {mood, talking, right, left, blinkOffset: index * 37};
  return (
    <svg
      viewBox="0 0 200 320"
      width={w}
      height={h}
      style={{
        position: 'absolute',
        left: px - w / 2,
        top: py - h,
        overflow: 'visible',
        opacity,
        transform: `scale(${interpolate(pop, [0, 1], [0.6, 1])}) rotate(${shake}deg)`,
        transformOrigin: '50% 100%',
      }}
    >
      {placement.id === 'umayer' && <Umayer {...common} />}
      {placement.id === 'safa' && <Safa {...common} />}
      {placement.id === 'ammu' && <HijabPerson {...common} p="ammu" hijab="#A9BEE3" hijabLine="#7D97C6" dress="#9CC9A8" dressLine="#6FA27F" />}
      {placement.id === 'nanu' && <HijabPerson {...common} p="nanu" hijab="#E6DFF2" hijabLine="#BFB1D8" dress="#BCA4CC" dressLine="#977DAE" glasses />}
      {placement.id === 'abbu' && <Abbu {...common} />}
      {placement.id === 'miu' && <Miu mood={mood} talking={talking} />}
    </svg>
  );
};

export const characterName = (id: CharacterId): string =>
  ({umayer: 'উমায়ের', safa: 'সাফা', ammu: 'মা', abbu: 'আব্বু', nanu: 'নানু', miu: 'মিউ'})[id];

export const characterColor = (id: CharacterId): string =>
  ({umayer: colors.skyDark, safa: colors.peachDark, ammu: colors.sageDark, abbu: colors.sageDark, nanu: '#A98BB5', miu: colors.peachDark})[id];
