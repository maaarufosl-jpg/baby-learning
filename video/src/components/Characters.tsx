import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme';
import type {ArmPose, CharacterId, CharacterPlacement, Mood} from '../types';

/** All character positions are expressed on a fixed 1920x1080 stage. */
export const STAGE_W = 1920;
export const STAGE_H = 1080;

/*
 * Soft "chibi" style: big round heads, glossy eyes with two highlights, blush, tiny mouths,
 * and outlines in a darker shade of each fill instead of black.
 */

const SKIN_LINE = '#E8AE88';
const HAIR = '#4A3328';
const HAIR_LIGHT = '#6E4C3B';

const useBlink = (offset: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const period = Math.round(fps * 3.4);
  const t = (frame + offset) % period;
  return t < 5 ? 1 - Math.abs(t - 2.5) / 2.5 : 0;
};

const Defs: React.FC<{p: string}> = ({p}) => (
  <defs>
    <radialGradient id={`${p}-skin`} cx="0.42" cy="0.36" r="0.75">
      <stop offset="0" stopColor="#FFE6D2" />
      <stop offset="1" stopColor="#F5C3A0" />
    </radialGradient>
    <linearGradient id={`${p}-eye`} x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stopColor="#1E120C" />
      <stop offset="0.6" stopColor="#3B2418" />
      <stop offset="1" stopColor="#8A5A3C" />
    </linearGradient>
    <radialGradient id={`${p}-blush`}>
      <stop offset="0" stopColor="#FF8FA0" stopOpacity="0.7" />
      <stop offset="1" stopColor="#FF8FA0" stopOpacity="0" />
    </radialGradient>
  </defs>
);

const Shadow: React.FC<{y: number; rx: number}> = ({y, rx}) => <ellipse cx={100} cy={y} rx={rx} ry={9} fill="rgba(59,58,74,0.10)" />;

const Eye: React.FC<{p: string; cx: number; cy: number; rx: number; ry: number; mood: Mood; blink: number; side: 'l' | 'r'; lashes?: boolean}> = ({
  p,
  cx,
  cy,
  rx,
  ry,
  mood,
  blink,
  side,
  lashes,
}) => {
  const out = side === 'l' ? -1 : 1;
  const brow =
    mood === 'surprised' || mood === 'thinking' || mood === 'sad' ? (
      <path
        d={`M ${cx - rx} ${cy - ry - 7 + (mood === 'sad' ? out * 3 : 0)} Q ${cx} ${cy - ry - (mood === 'surprised' ? 16 : 12)} ${cx + rx} ${cy - ry - 7 - (mood === 'sad' ? out * 3 : 0)}`}
        stroke={HAIR}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
    ) : null;
  if (mood === 'excited' || blink > 0.55) {
    return (
      <g>
        <path d={`M ${cx - rx} ${cy + 2} Q ${cx} ${cy - ry * 0.9} ${cx + rx} ${cy + 2}`} stroke="#2A1A12" strokeWidth={4.5} fill="none" strokeLinecap="round" />
        {lashes && <path d={`M ${cx + out * rx} ${cy + 2} l ${out * 5} 1`} stroke="#2A1A12" strokeWidth={2.5} strokeLinecap="round" />}
        {brow}
      </g>
    );
  }
  const big = mood === 'surprised' ? 1.08 : 1;
  const lookX = mood === 'thinking' ? -2.5 : 0;
  const lookY = mood === 'thinking' ? -2.5 : 0;
  const ery = ry * big * (1 - blink * 0.7);
  const erx = rx * big;
  return (
    <g>
      <ellipse cx={cx} cy={cy} rx={erx} ry={ery} fill={`url(#${p}-eye)`} />
      <circle cx={cx + erx * 0.32 + lookX} cy={cy - ery * 0.36 + lookY} r={erx * 0.42} fill={colors.white} />
      <circle cx={cx - erx * 0.38 + lookX} cy={cy + ery * 0.4 + lookY} r={erx * 0.17} fill={colors.white} opacity={0.9} />
      {lashes && (
        <g stroke="#2A1A12" strokeWidth={2.2} strokeLinecap="round">
          <path d={`M ${cx + out * erx * 0.95} ${cy - ery * 0.25} l ${out * 5} -1`} />
          <path d={`M ${cx + out * erx * 0.8} ${cy - ery * 0.6} l ${out * 4} -3`} />
        </g>
      )}
      {mood === 'sad' && <path d={`M ${cx - erx - 1} ${cy - ery * 0.35} Q ${cx} ${cy - ery * 0.75} ${cx + erx + 1} ${cy - ery * 0.35}`} stroke="#2A1A12" strokeWidth={2.5} fill="none" />}
      {brow}
    </g>
  );
};

const Mouth: React.FC<{cx: number; cy: number; mood: Mood; talking: boolean; scale?: number}> = ({cx, cy, mood, talking, scale = 1}) => {
  const frame = useCurrentFrame();
  const open = talking ? 0.5 + 0.5 * Math.sin(frame * 0.9) : 0;
  const s = scale;
  if (mood === 'surprised') return <ellipse cx={cx} cy={cy + 2} rx={5.5 * s} ry={(7 + open * 2) * s} fill="#8E3B3B" />;
  if (mood === 'sad') return <path d={`M ${cx - 7 * s} ${cy + 4} Q ${cx} ${cy - 3} ${cx + 7 * s} ${cy + 4}`} stroke="#8E3B3B" strokeWidth={3} fill="none" strokeLinecap="round" />;
  if (mood === 'thinking') return <path d={`M ${cx - 6 * s} ${cy + 2} Q ${cx + 2} ${cy + 5 + open * 4} ${cx + 8 * s} ${cy - 1}`} stroke="#8E3B3B" strokeWidth={3} fill="none" strokeLinecap="round" />;
  if (open > 0.15 || mood === 'excited') {
    const w = (mood === 'excited' ? 11 : 8) * s;
    const h = (mood === 'excited' ? 13 : 5 + open * 8) * s;
    return (
      <g>
        <path d={`M ${cx - w} ${cy} Q ${cx} ${cy + h * 1.6} ${cx + w} ${cy} Q ${cx} ${cy + 2} ${cx - w} ${cy} Z`} fill="#8E3B3B" />
        <ellipse cx={cx} cy={cy + h * 0.85} rx={w * 0.55} ry={h * 0.32} fill="#F28B95" />
      </g>
    );
  }
  return <path d={`M ${cx - 7 * s} ${cy} Q ${cx} ${cy + 7 * s} ${cx + 7 * s} ${cy}`} stroke="#8E3B3B" strokeWidth={3} fill="none" strokeLinecap="round" />;
};

const Face: React.FC<{
  p: string;
  cx: number;
  eyeY: number;
  eyeDX: number;
  eyeRX: number;
  eyeRY: number;
  mouthY: number;
  mood: Mood;
  talking: boolean;
  blink: number;
  lashes?: boolean;
  mouthScale?: number;
}> = ({p, cx, eyeY, eyeDX, eyeRX, eyeRY, mouthY, mood, talking, blink, lashes, mouthScale}) => (
  <g>
    <ellipse cx={cx - eyeDX - eyeRX * 0.4} cy={eyeY + eyeRY + 7} rx={eyeRX * 1.35} ry={eyeRX * 0.85} fill={`url(#${p}-blush)`} />
    <ellipse cx={cx + eyeDX + eyeRX * 0.4} cy={eyeY + eyeRY + 7} rx={eyeRX * 1.35} ry={eyeRX * 0.85} fill={`url(#${p}-blush)`} />
    <Eye p={p} cx={cx - eyeDX} cy={eyeY} rx={eyeRX} ry={eyeRY} mood={mood} blink={blink} side="l" lashes={lashes} />
    <Eye p={p} cx={cx + eyeDX} cy={eyeY} rx={eyeRX} ry={eyeRY} mood={mood} blink={blink} side="r" lashes={lashes} />
    <ellipse cx={cx} cy={eyeY + eyeRY * 0.85} rx={2.8} ry={2} fill="#E39B78" />
    <Mouth cx={cx} cy={mouthY} mood={mood} talking={talking} scale={mouthScale} />
  </g>
);

/**
 * Arm angle in degrees. side 'l' is the arm on the viewer's left, which is the character's RIGHT arm.
 * 0 degrees hangs straight down; positive values on the 'l' side swing outward.
 */
const armAngle = (pose: ArmPose, side: 'l' | 'r', frame: number, fps: number) => {
  const out = side === 'l' ? 1 : -1;
  switch (pose) {
    case 'up':
      return out * 150;
    case 'wave':
      return out * (140 + Math.sin(frame * 0.35) * 18);
    case 'reach':
      return -out * 40;
    case 'eat': {
      const t = (1 - Math.cos(((frame / fps) * Math.PI * 2) / 1.8)) / 2;
      return -out * (40 + t * 100);
    }
    default:
      return out * 16 + Math.sin(frame * 0.12) * 3;
  }
};

const Arm: React.FC<{p: string; x: number; y: number; pose: ArmPose; side: 'l' | 'r'; sleeve: string; line: string; len?: number}> = ({
  p,
  x,
  y,
  pose,
  side,
  sleeve,
  line,
  len = 44,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <g transform={`rotate(${armAngle(pose, side, frame, fps)} ${x} ${y})`}>
      <rect x={x - 12} y={y - 8} width={24} height={len} rx={12} fill={sleeve} stroke={line} strokeWidth={2.5} />
      <circle cx={x} cy={y + len - 2} r={11} fill={`url(#${p}-skin)`} stroke={SKIN_LINE} strokeWidth={2} />
    </g>
  );
};

type PersonProps = {mood: Mood; talking: boolean; right: ArmPose; left: ArmPose; blinkOffset: number};

/* ---------- Ayan: 4-year-old boy, white tupi, sky-blue panjabi ---------- */
const Ayan: React.FC<PersonProps> = ({mood, talking, right, left, blinkOffset}) => {
  const blink = useBlink(blinkOffset);
  const p = 'ayan';
  return (
    <g>
      <Defs p={p} />
      <Shadow y={312} rx={54} />
      <rect x={81} y={258} width={17} height={46} rx={8.5} fill="#F6F1E7" stroke="#DCD2C0" strokeWidth={2} />
      <rect x={102} y={258} width={17} height={46} rx={8.5} fill="#F6F1E7" stroke="#DCD2C0" strokeWidth={2} />
      <ellipse cx={88} cy={306} rx={14} ry={7} fill="#8A6650" />
      <ellipse cx={112} cy={306} rx={14} ry={7} fill="#8A6650" />
      <path d="M 66 194 Q 100 180 134 194 Q 146 234 142 270 Q 100 281 58 270 Q 54 234 66 194 Z" fill="#8EC5E8" stroke="#6AA6CF" strokeWidth={2.5} />
      <path d="M 100 190 L 100 226" stroke={colors.white} strokeWidth={3} strokeLinecap="round" />
      <circle cx={100} cy={206} r={2.6} fill={colors.white} />
      <circle cx={100} cy={218} r={2.6} fill={colors.white} />
      <Arm p={p} x={68} y={202} pose={right} side="l" sleeve="#8EC5E8" line="#6AA6CF" />
      <Arm p={p} x={132} y={202} pose={left} side="r" sleeve="#8EC5E8" line="#6AA6CF" />
      <ellipse cx={27} cy={122} rx={10} ry={13} fill={`url(#${p}-skin)`} stroke={SKIN_LINE} strokeWidth={2} />
      <ellipse cx={173} cy={122} rx={10} ry={13} fill={`url(#${p}-skin)`} stroke={SKIN_LINE} strokeWidth={2} />
      <circle cx={100} cy={112} r={75} fill={`url(#${p}-skin)`} stroke={SKIN_LINE} strokeWidth={2.5} />
      <path d="M 30 98 Q 38 58 100 56 Q 162 58 170 98 Q 152 82 134 88 Q 120 74 102 86 Q 84 74 68 88 Q 50 82 30 98 Z" fill={HAIR} />
      <path d="M 120 70 Q 138 72 148 82" stroke={HAIR_LIGHT} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M 32 82 Q 36 30 100 28 Q 164 30 168 82 Q 100 64 32 82 Z" fill={colors.white} stroke="#D9E3EC" strokeWidth={2.5} />
      {[50, 75, 100, 125, 150].map((x) => (
        <circle key={x} cx={x} cy={x === 100 ? 70 : x === 75 || x === 125 ? 71 : 73} r={2.4} fill="#BFD6E8" />
      ))}
      <Face p={p} cx={100} eyeY={126} eyeDX={30} eyeRX={13} eyeRY={16} mouthY={154} mood={mood} talking={talking} blink={blink} />
    </g>
  );
};

/* ---------- Safa: 2.5-year-old girl, soft pink hijab with a flower ---------- */
const Safa: React.FC<PersonProps> = ({mood, talking, right, left, blinkOffset}) => {
  const blink = useBlink(blinkOffset);
  const p = 'safa';
  const hijab = '#F7B8C8';
  const hijabLine = '#EC9DB3';
  return (
    <g>
      <Defs p={p} />
      <Shadow y={312} rx={50} />
      <rect x={84} y={266} width={15} height={38} rx={7.5} fill={`url(#${p}-skin)`} stroke={SKIN_LINE} strokeWidth={2} />
      <rect x={101} y={266} width={15} height={38} rx={7.5} fill={`url(#${p}-skin)`} stroke={SKIN_LINE} strokeWidth={2} />
      <ellipse cx={90} cy={306} rx={12} ry={6.5} fill="#E7798F" />
      <ellipse cx={110} cy={306} rx={12} ry={6.5} fill="#E7798F" />
      <path d="M 72 202 Q 100 190 128 202 Q 146 248 150 278 Q 100 291 50 278 Q 54 248 72 202 Z" fill="#FFC79A" stroke="#F0A672" strokeWidth={2.5} />
      <path d="M 100 246 C 92 236 82 244 100 256 C 118 244 108 236 100 246 Z" fill={colors.white} />
      <Arm p={p} x={74} y={210} pose={right} side="l" sleeve="#FFC79A" line="#F0A672" len={40} />
      <Arm p={p} x={126} y={210} pose={left} side="r" sleeve="#FFC79A" line="#F0A672" len={40} />
      <path d="M 100 32 Q 180 36 177 124 Q 176 184 140 204 Q 100 214 60 204 Q 24 184 23 124 Q 20 36 100 32 Z" fill={hijab} stroke={hijabLine} strokeWidth={2.5} />
      <ellipse cx={100} cy={130} rx={61} ry={63} fill={`url(#${p}-skin)`} stroke={SKIN_LINE} strokeWidth={2.5} />
      <path d="M 38 122 Q 44 62 100 60 Q 156 62 162 122 Q 150 86 100 84 Q 50 86 38 122 Z" fill={hijab} />
      <g transform="translate(148 70)">
        {[0, 72, 144, 216, 288].map((a) => (
          <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 7} cy={Math.sin((a * Math.PI) / 180) * 7} r={6} fill={colors.white} />
        ))}
        <circle r={4.5} fill={colors.gold} />
      </g>
      <Face p={p} cx={100} eyeY={136} eyeDX={26} eyeRX={12} eyeRY={15} mouthY={162} mood={mood} talking={talking} blink={blink} mouthScale={0.9} />
    </g>
  );
};

/* ---------- Ammu / Nanu: mother and grandmother in hijab ---------- */
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
      <Shadow y={316} rx={66} />
      <path d="M 62 176 Q 100 162 138 176 Q 160 250 168 314 Q 100 322 32 314 Q 40 250 62 176 Z" fill={dress} stroke={dressLine} strokeWidth={2.5} />
      <Arm p={p} x={64} y={190} pose={right} side="l" sleeve={dress} line={dressLine} len={62} />
      <Arm p={p} x={136} y={190} pose={left} side="r" sleeve={dress} line={dressLine} len={62} />
      <path d="M 100 22 Q 170 26 168 104 Q 168 150 150 176 Q 130 196 100 198 Q 70 196 50 176 Q 32 150 32 104 Q 30 26 100 22 Z" fill={hijab} stroke={hijabLine} strokeWidth={2.5} />
      <ellipse cx={100} cy={102} rx={47} ry={51} fill={`url(#${p}-skin)`} stroke={SKIN_LINE} strokeWidth={2.5} />
      <path d="M 52 102 Q 56 50 100 48 Q 144 50 148 102 Q 138 72 100 70 Q 62 72 52 102 Z" fill={hijab} />
      <path d="M 70 40 Q 100 30 130 40" stroke={colors.white} strokeOpacity={0.45} strokeWidth={4} fill="none" strokeLinecap="round" />
      <Face p={p} cx={100} eyeY={106} eyeDX={19} eyeRX={9} eyeRY={11} mouthY={130} mood={mood} talking={talking} blink={blink} lashes />
      {glasses && (
        <g stroke="#9C8AA8" strokeWidth={2.5} fill="none">
          <circle cx={81} cy={106} r={14} />
          <circle cx={119} cy={106} r={14} />
          <line x1={95} y1={104} x2={105} y2={104} />
        </g>
      )}
    </g>
  );
};

/* ---------- Abbu: father with tupi and soft beard ---------- */
const Abbu: React.FC<PersonProps> = ({mood, talking, right, left, blinkOffset}) => {
  const blink = useBlink(blinkOffset);
  const p = 'abbu';
  return (
    <g>
      <Defs p={p} />
      <Shadow y={314} rx={62} />
      <rect x={76} y={250} width={21} height={56} rx={10} fill="#F6F1E7" stroke="#DCD2C0" strokeWidth={2} />
      <rect x={103} y={250} width={21} height={56} rx={10} fill="#F6F1E7" stroke="#DCD2C0" strokeWidth={2} />
      <ellipse cx={86} cy={308} rx={15} ry={7} fill="#8A6650" />
      <ellipse cx={114} cy={308} rx={15} ry={7} fill="#8A6650" />
      <path d="M 54 172 Q 100 158 146 172 Q 158 230 156 268 Q 100 279 44 268 Q 42 230 54 172 Z" fill="#9CC9A8" stroke="#79AE88" strokeWidth={2.5} />
      <Arm p={p} x={58} y={182} pose={right} side="l" sleeve="#9CC9A8" line="#79AE88" len={58} />
      <Arm p={p} x={142} y={182} pose={left} side="r" sleeve="#9CC9A8" line="#79AE88" len={58} />
      <circle cx={100} cy={102} r={56} fill={`url(#${p}-skin)`} stroke={SKIN_LINE} strokeWidth={2.5} />
      <path d="M 46 104 Q 50 168 100 170 Q 150 168 154 104 Q 146 142 100 146 Q 54 142 46 104 Z" fill="#5A4033" />
      <path d="M 46 80 Q 50 38 100 36 Q 150 38 154 80 Q 100 68 46 80 Z" fill={colors.white} stroke="#D9E3EC" strokeWidth={2.5} />
      <Face p={p} cx={100} eyeY={102} eyeDX={20} eyeRX={9} eyeRY={11} mouthY={128} mood={mood} talking={talking} blink={blink} />
    </g>
  );
};

/* ---------- Miu: the family kitten ---------- */
const Miu: React.FC<{mood: Mood; talking: boolean}> = ({mood, talking}) => {
  const frame = useCurrentFrame();
  const blink = useBlink(17);
  const p = 'miu';
  const fur = colors.catFur;
  const line = '#E0995C';
  const tail = Math.sin(frame * 0.15) * 16;
  const surprised = mood === 'surprised';
  const earPerk = surprised ? -8 : 0;
  const pawUp = surprised ? -40 : 0;
  return (
    <g>
      <Defs p={p} />
      <ellipse cx={100} cy={308} rx={70} ry={9} fill="rgba(59,58,74,0.10)" />
      <path d="M 146 270 Q 196 250 184 196" stroke={fur} strokeWidth={20} fill="none" strokeLinecap="round" transform={`rotate(${tail} 146 270)`} />
      <ellipse cx={100} cy={264} rx={56} ry={42} fill={fur} stroke={line} strokeWidth={2.5} />
      <ellipse cx={100} cy={276} rx={32} ry={24} fill={colors.catFurLight} />
      <ellipse cx={80} cy={302} rx={15} ry={9} fill={colors.catFurLight} stroke={line} strokeWidth={2} />
      <ellipse cx={120} cy={302 + pawUp} rx={15} ry={9} fill={colors.catFurLight} stroke={line} strokeWidth={2} />
      <path d={`M 46 ${170 + earPerk} Q 40 ${104 + earPerk} 84 ${128}`} fill={fur} stroke={line} strokeWidth={2.5} />
      <path d={`M 154 ${170 + earPerk} Q 160 ${104 + earPerk} 116 ${128}`} fill={fur} stroke={line} strokeWidth={2.5} />
      <path d={`M 54 ${158 + earPerk} Q 52 ${120 + earPerk} 76 ${134}`} fill="#F9B4B4" />
      <path d={`M 146 ${158 + earPerk} Q 148 ${120 + earPerk} 124 ${134}`} fill="#F9B4B4" />
      <circle cx={100} cy={180} r={62} fill={fur} stroke={line} strokeWidth={2.5} />
      <path d="M 90 124 q 2 10 0 18 M 100 122 q 0 12 0 20 M 110 124 q -2 10 0 18" stroke={line} strokeWidth={3.5} strokeLinecap="round" fill="none" />
      <ellipse cx={100} cy={206} rx={30} ry={20} fill={colors.catFurLight} />
      <ellipse cx={66} cy={202} rx={15} ry={9} fill={`url(#${p}-blush)`} />
      <ellipse cx={134} cy={202} rx={15} ry={9} fill={`url(#${p}-blush)`} />
      <Eye p={p} cx={76} cy={182} rx={13} ry={15} mood={mood === 'excited' ? 'excited' : surprised ? 'surprised' : 'calm'} blink={blink} side="l" />
      <Eye p={p} cx={124} cy={182} rx={13} ry={15} mood={mood === 'excited' ? 'excited' : surprised ? 'surprised' : 'calm'} blink={blink} side="r" />
      <path d="M 95 198 Q 100 195 105 198 Q 100 205 95 198 Z" fill="#F28B95" />
      {surprised || talking ? (
        <ellipse cx={100} cy={214} rx={5} ry={6 + (talking ? 3 * Math.abs(Math.sin(frame * 0.5)) : 0)} fill="#8E3B3B" />
      ) : (
        <path d="M 91 207 Q 95.5 213 100 207 Q 104.5 213 109 207" stroke="#8E3B3B" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      <g stroke={line} strokeWidth={2} strokeLinecap="round" opacity={0.8}>
        <line x1={44} y1={204} x2={68} y2={207} />
        <line x1={46} y1={216} x2={68} y2={212} />
        <line x1={156} y1={204} x2={132} y2={207} />
        <line x1={154} y1={216} x2={132} y2={212} />
      </g>
    </g>
  );
};

/* ---------- placement on the stage ---------- */

const BASE_HEIGHT: Record<CharacterId, number> = {ayan: 1, safa: 0.74, ammu: 1.28, abbu: 1.34, nanu: 1.2, miu: 0.55};
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

  const idleBob = Math.sin(frame * 0.1 + index) * 3;
  const walkBob = moving ? -Math.abs(Math.sin(frame * 0.55)) * 16 : 0;
  const hop = mood === 'excited' ? -Math.abs(Math.sin(frame * 0.3)) * 12 : 0;
  const nod = placement.nod ? Math.max(0, Math.sin(frame * 0.4)) * 7 : 0;
  const shake = placement.shake ? Math.sin(frame * 0.5) * 6 : 0;

  const w = 200 * scale;
  const h = 320 * scale;
  const px = x * STAGE_W;
  const py = y * STAGE_H + idleBob + walkBob + hop + nod;
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
      {(() => {
        const right = placement.arms?.right ?? 'down';
        const left = placement.arms?.left ?? 'down';
        const common = {mood, talking, right, left, blinkOffset: index * 37};
        switch (placement.id) {
          case 'ayan':
            return <Ayan {...common} />;
          case 'safa':
            return <Safa {...common} />;
          case 'ammu':
            return <HijabPerson {...common} p="ammu" hijab="#A9BEE3" hijabLine="#8AA4D2" dress="#9CC9A8" dressLine="#79AE88" />;
          case 'nanu':
            return <HijabPerson {...common} p="nanu" hijab="#E6DFF2" hijabLine="#CFC3E3" dress="#BCA4CC" dressLine="#A088B3" glasses />;
          case 'abbu':
            return <Abbu {...common} />;
          case 'miu':
            return <Miu mood={mood} talking={talking} />;
        }
      })()}
    </svg>
  );
};

export const characterName = (id: CharacterId): string =>
  ({ayan: 'আয়ান', safa: 'সাফা', ammu: 'আম্মু', abbu: 'আব্বু', nanu: 'নানু', miu: 'মিউ'})[id];

export const characterColor = (id: CharacterId): string =>
  ({ayan: colors.skyDark, safa: colors.peachDark, ammu: colors.sageDark, abbu: colors.sageDark, nanu: '#A98BB5', miu: colors.peachDark})[id];
