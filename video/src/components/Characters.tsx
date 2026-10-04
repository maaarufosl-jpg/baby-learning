import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {colors} from '../theme';
import type {ArmPose, CharacterId, CharacterPlacement, Mood} from '../types';

/** All character positions are expressed on a fixed 1920x1080 stage. */
export const STAGE_W = 1920;
export const STAGE_H = 1080;

/* ---------- shared face parts ---------- */

const useBlink = (offset: number) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const period = Math.round(fps * 3.4);
  const t = (frame + offset) % period;
  return t < 4 ? 1 - Math.abs(t - 2) / 2 : 0;
};

/** Simple dot eyes with a small shine; excited = happy arcs; brows only for strong moods. */
const Eye: React.FC<{cx: number; cy: number; mood: Mood; blink: number; side: 'l' | 'r'}> = ({cx, cy, mood, blink, side}) => {
  const dx = mood === 'thinking' ? -3 : 0;
  const dy = mood === 'thinking' ? -3 : 2;
  const big = mood === 'surprised';
  const brow =
    mood === 'surprised' || mood === 'thinking' || mood === 'sad' ? (
      <path
        d={`M ${cx - 9} ${cy - 16 + (mood === 'sad' ? (side === 'l' ? -3 : 3) : 0)} Q ${cx} ${cy - (big ? 24 : 20) - (mood === 'thinking' && side === 'r' ? 4 : 0)} ${cx + 9} ${cy - 16 + (mood === 'sad' ? (side === 'l' ? 3 : -3) : 0)}`}
        stroke={colors.ink}
        strokeWidth={3}
        fill="none"
        strokeLinecap="round"
      />
    ) : null;
  if (mood === 'excited' || blink > 0.6) {
    return (
      <g>
        <path d={`M ${cx - 8} ${cy + 3} Q ${cx} ${cy - 7} ${cx + 8} ${cy + 3}`} stroke={colors.ink} strokeWidth={4} fill="none" strokeLinecap="round" />
        {brow}
      </g>
    );
  }
  return (
    <g>
      <ellipse cx={cx + dx} cy={cy + dy} rx={big ? 8 : 6.5} ry={(big ? 10 : 8) * (1 - blink * 0.6)} fill={colors.ink} />
      <circle cx={cx + dx + 2.2} cy={cy + dy - 3} r={2.2} fill={colors.white} />
      {brow}
    </g>
  );
};

const Mouth: React.FC<{cx: number; cy: number; mood: Mood; talking: boolean}> = ({cx, cy, mood, talking}) => {
  const frame = useCurrentFrame();
  const open = talking ? 0.5 + 0.5 * Math.sin(frame * 0.9) : 0;
  if (mood === 'surprised') return <ellipse cx={cx} cy={cy + 4} rx={9} ry={12 + open * 4} fill={colors.ink} />;
  if (mood === 'sad')
    return <path d={`M ${cx - 14} ${cy + 8} Q ${cx} ${cy - 6} ${cx + 14} ${cy + 8}`} stroke={colors.ink} strokeWidth={4} fill="none" strokeLinecap="round" />;
  if (mood === 'thinking')
    return <path d={`M ${cx - 10} ${cy + 2} Q ${cx} ${cy + 2 + open * 10} ${cx + 10} ${cy}`} stroke={colors.ink} strokeWidth={4} fill="none" strokeLinecap="round" />;
  const wideSmile = mood === 'excited' || mood === 'happy';
  const w = wideSmile ? 20 : 14;
  const depth = (wideSmile ? 16 : 10) + open * 14;
  return (
    <g>
      <path d={`M ${cx - w} ${cy} Q ${cx} ${cy + depth} ${cx + w} ${cy}`} fill={open > 0.2 || wideSmile ? '#B4524F' : 'none'} stroke={colors.ink} strokeWidth={4} strokeLinejoin="round" strokeLinecap="round" />
      {open > 0.2 && <path d={`M ${cx - w + 6} ${cy + 2} Q ${cx} ${cy + 8} ${cx + w - 6} ${cy + 2}`} fill={colors.white} />}
    </g>
  );
};

const Cheeks: React.FC<{cx: number; cy: number}> = ({cx, cy}) => (
  <g opacity={0.55}>
    <ellipse cx={cx - 34} cy={cy + 14} rx={9} ry={6} fill="#F7A8A0" />
    <ellipse cx={cx + 34} cy={cy + 14} rx={9} ry={6} fill="#F7A8A0" />
  </g>
);

const Shadow: React.FC<{y: number; rx: number}> = ({y, rx}) => <ellipse cx={100} cy={y} rx={rx} ry={10} fill="rgba(59,58,74,0.10)" />;

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
      return -out * (40 + t * 95);
    }
    default:
      return out * 25 + Math.sin(frame * 0.12) * 3;
  }
};

const Arm: React.FC<{x: number; y: number; pose: ArmPose; side: 'l' | 'r'; sleeve: string}> = ({x, y, pose, side, sleeve}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <g transform={`rotate(${armAngle(pose, side, frame, fps)} ${x} ${y})`}>
      <line x1={x} y1={y} x2={x} y2={y + 72} stroke={sleeve} strokeWidth={24} strokeLinecap="round" />
      <circle cx={x} cy={y + 78} r={13} fill={colors.skin} stroke={colors.skinDark} strokeWidth={1.5} />
    </g>
  );
};

/* ---------- people ---------- */

type PersonProps = {mood: Mood; talking: boolean; right: ArmPose; left: ArmPose; blinkOffset: number};

const Ayan: React.FC<PersonProps> = ({mood, talking, right, left, blinkOffset}) => {
  const blink = useBlink(blinkOffset);
  const headY = 95;
  return (
    <g>
      <Shadow y={316} rx={62} />
      <rect x={72} y={238} width={24} height={78} rx={12} fill={colors.skin} />
      <rect x={104} y={238} width={24} height={78} rx={12} fill={colors.skin} />
      <ellipse cx={84} cy={314} rx={18} ry={8} fill={colors.ink} />
      <ellipse cx={116} cy={314} rx={18} ry={8} fill={colors.ink} />
      <path d="M 52 160 Q 100 140 148 160 L 156 252 Q 100 262 44 252 Z" fill={colors.skyDark} />
      <path d="M 88 160 L 100 190 L 112 160" fill="none" stroke={colors.white} strokeWidth={4} strokeLinecap="round" />
      <Arm x={58} y={168} pose={right} side="l" sleeve={colors.skyDark} />
      <Arm x={142} y={168} pose={left} side="r" sleeve={colors.skyDark} />
      <circle cx={100} cy={headY} r={60} fill={colors.skin} />
      <path d="M 40 90 Q 45 30 100 32 Q 155 30 160 90 Q 150 60 130 58 Q 100 50 70 60 Q 50 66 40 90 Z" fill={colors.hair} />
      <ellipse cx={40} cy={100} rx={9} ry={12} fill={colors.skin} />
      <ellipse cx={160} cy={100} rx={9} ry={12} fill={colors.skin} />
      <Cheeks cx={100} cy={headY} />
      <Eye cx={78} cy={headY} mood={mood} blink={blink} side="l" />
      <Eye cx={122} cy={headY} mood={mood} blink={blink} side="r" />
      <Mouth cx={100} cy={headY + 30} mood={mood} talking={talking} />
    </g>
  );
};

const Safa: React.FC<PersonProps> = ({mood, talking, right, left, blinkOffset}) => {
  const blink = useBlink(blinkOffset);
  const headY = 100;
  return (
    <g>
      <Shadow y={316} rx={58} />
      <rect x={74} y={250} width={22} height={66} rx={11} fill={colors.skin} />
      <rect x={104} y={250} width={22} height={66} rx={11} fill={colors.skin} />
      <ellipse cx={85} cy={314} rx={16} ry={7} fill="#B4524F" />
      <ellipse cx={115} cy={314} rx={16} ry={7} fill="#B4524F" />
      <path d="M 60 168 Q 100 150 140 168 L 162 262 Q 100 276 38 262 Z" fill={colors.peachDark} />
      <circle cx={100} cy={200} r={5} fill={colors.white} />
      <circle cx={100} cy={222} r={5} fill={colors.white} />
      <Arm x={62} y={176} pose={right} side="l" sleeve={colors.peachDark} />
      <Arm x={138} y={176} pose={left} side="r" sleeve={colors.peachDark} />
      <circle cx={38} cy={88} r={20} fill={colors.hair} />
      <circle cx={162} cy={88} r={20} fill={colors.hair} />
      <circle cx={38} cy={88} r={7} fill={colors.peachDark} />
      <circle cx={162} cy={88} r={7} fill={colors.peachDark} />
      <circle cx={100} cy={headY} r={58} fill={colors.skin} />
      <path d="M 44 92 Q 50 40 100 40 Q 150 40 156 92 Q 140 68 118 66 Q 100 78 82 66 Q 60 68 44 92 Z" fill={colors.hair} />
      <Cheeks cx={100} cy={headY} />
      <Eye cx={80} cy={headY} mood={mood} blink={blink} side="l" />
      <Eye cx={120} cy={headY} mood={mood} blink={blink} side="r" />
      <Mouth cx={100} cy={headY + 28} mood={mood} talking={talking} />
    </g>
  );
};

const HijabPerson: React.FC<PersonProps & {hijab: string; dress: string; glasses?: boolean}> = ({mood, talking, right, left, blinkOffset, hijab, dress, glasses}) => {
  const blink = useBlink(blinkOffset);
  const headY = 92;
  return (
    <g>
      <Shadow y={318} rx={72} />
      <path d="M 54 166 Q 100 150 146 166 L 168 318 L 32 318 Z" fill={dress} />
      <Arm x={56} y={178} pose={right} side="l" sleeve={dress} />
      <Arm x={144} y={178} pose={left} side="r" sleeve={dress} />
      <path d="M 100 20 Q 176 30 170 120 Q 172 165 148 186 L 52 186 Q 28 165 30 120 Q 24 30 100 20 Z" fill={hijab} />
      <ellipse cx={100} cy={headY + 6} rx={46} ry={54} fill={colors.skin} />
      <path d="M 100 36 Q 150 40 150 100 Q 140 60 100 58 Q 60 60 50 100 Q 50 40 100 36 Z" fill={hijab} />
      <Cheeks cx={100} cy={headY} />
      <Eye cx={80} cy={headY} mood={mood} blink={blink} side="l" />
      <Eye cx={120} cy={headY} mood={mood} blink={blink} side="r" />
      {glasses && (
        <g stroke={colors.inkSoft} strokeWidth={3} fill="none">
          <circle cx={80} cy={headY} r={18} />
          <circle cx={120} cy={headY} r={18} />
          <line x1={98} y1={headY} x2={102} y2={headY} />
        </g>
      )}
      <Mouth cx={100} cy={headY + 30} mood={mood} talking={talking} />
    </g>
  );
};

const Abbu: React.FC<PersonProps> = ({mood, talking, right, left, blinkOffset}) => {
  const blink = useBlink(blinkOffset);
  const headY = 92;
  return (
    <g>
      <Shadow y={316} rx={66} />
      <rect x={72} y={240} width={24} height={76} rx={12} fill={colors.ink} />
      <rect x={104} y={240} width={24} height={76} rx={12} fill={colors.ink} />
      <path d="M 50 160 Q 100 142 150 160 L 158 258 Q 100 268 42 258 Z" fill={colors.sageDark} />
      <Arm x={56} y={170} pose={right} side="l" sleeve={colors.sageDark} />
      <Arm x={144} y={170} pose={left} side="r" sleeve={colors.sageDark} />
      <circle cx={100} cy={headY} r={58} fill={colors.skin} />
      <path d="M 48 100 Q 50 160 100 162 Q 150 160 152 100 Q 140 140 100 142 Q 60 140 48 100 Z" fill={colors.hair} />
      <path d="M 44 70 Q 50 30 100 30 Q 150 30 156 70 Z" fill={colors.white} stroke={colors.sageDark} strokeWidth={3} />
      <Eye cx={80} cy={headY} mood={mood} blink={blink} side="l" />
      <Eye cx={120} cy={headY} mood={mood} blink={blink} side="r" />
      <Mouth cx={100} cy={headY + 28} mood={mood} talking={talking} />
    </g>
  );
};

const Miu: React.FC<{mood: Mood; talking: boolean}> = ({mood, talking}) => {
  const frame = useCurrentFrame();
  const blink = useBlink(17);
  const tail = Math.sin(frame * 0.15) * 18;
  const surprised = mood === 'surprised';
  const earPerk = surprised ? -10 : 0;
  const pawUp = surprised ? -46 : 0;
  return (
    <g>
      <ellipse cx={100} cy={306} rx={78} ry={10} fill="rgba(59,58,74,0.10)" />
      <path d="M 150 260 Q 200 240 190 190" stroke={colors.catFur} strokeWidth={18} fill="none" strokeLinecap="round" transform={`rotate(${tail} 150 260)`} />
      <ellipse cx={100} cy={250} rx={70} ry={50} fill={colors.catFur} />
      <ellipse cx={100} cy={262} rx={44} ry={30} fill={colors.catFurLight} />
      <ellipse cx={60} cy={296} rx={18} ry={10} fill={colors.catFur} />
      <ellipse cx={140} cy={296 + pawUp} rx={18} ry={10} fill={colors.catFur} />
      <path d={`M 48 ${170 + earPerk} L 60 125 L 92 158 Z`} fill={colors.catFur} />
      <path d={`M 152 ${170 + earPerk} L 140 125 L 108 158 Z`} fill={colors.catFur} />
      <path d={`M 56 ${166 + earPerk} L 63 140 L 84 160 Z`} fill="#F7A8A0" />
      <path d={`M 144 ${166 + earPerk} L 137 140 L 116 160 Z`} fill="#F7A8A0" />
      <circle cx={100} cy={190} r={52} fill={colors.catFur} />
      <ellipse cx={100} cy={206} rx={30} ry={22} fill={colors.catFurLight} />
      {[-20, 20].map((dx) => (
        <g key={dx}>
          {blink > 0.6 ? (
            <path d={`M ${92 + dx} 186 Q ${100 + dx} 178 ${108 + dx} 186`} stroke={colors.ink} strokeWidth={3.5} fill="none" strokeLinecap="round" />
          ) : (
            <>
              <ellipse cx={100 + dx} cy={186} rx={surprised ? 8 : 6.5} ry={surprised ? 10 : 8} fill={colors.ink} />
              <circle cx={102 + dx} cy={183} r={2.2} fill={colors.white} />
            </>
          )}
        </g>
      ))}
      <path d="M 94 200 L 106 200 L 100 207 Z" fill="#E88C8C" />
      {surprised || talking ? (
        <ellipse cx={100} cy={218} rx={6} ry={7 + (talking ? 3 * Math.abs(Math.sin(frame * 0.5)) : 0)} fill={colors.ink} />
      ) : (
        <path d="M 90 210 Q 95 218 100 210 Q 105 218 110 210" stroke={colors.ink} strokeWidth={2.5} fill="none" strokeLinecap="round" />
      )}
      <g stroke={colors.ink} strokeWidth={2} strokeLinecap="round">
        <line x1={40} y1={198} x2={70} y2={202} />
        <line x1={40} y1={212} x2={70} y2={208} />
        <line x1={160} y1={198} x2={130} y2={202} />
        <line x1={160} y1={212} x2={130} y2={208} />
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
            return <HijabPerson {...common} hijab={colors.hijabAmmu} dress={colors.sageDark} />;
          case 'nanu':
            return <HijabPerson {...common} hijab="#D9D4E6" dress="#A98BB5" glasses />;
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
