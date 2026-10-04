import React from 'react';
import {useCurrentFrame} from 'remotion';
import {colors} from '../theme';
import type {BackgroundId} from '../types';
import {STAGE_H, STAGE_W} from './Characters';

/** Plate positions on the kitchen table, as stage fractions. Characters sit behind these. */
export const KITCHEN = {
  tableTop: 800,
  ayanPlateX: 0.42,
  safaBowlX: 0.62,
  dalX: 0.52,
};

const Cloud: React.FC<{x: number; y: number; s: number}> = ({x, y, s}) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={colors.white}>
    <ellipse cx={0} cy={0} rx={60} ry={34} />
    <ellipse cx={50} cy={-18} rx={50} ry={40} />
    <ellipse cx={100} cy={0} rx={60} ry={32} />
  </g>
);

const drift = (frame: number, speed: number, start: number, span: number) => ((start + frame * speed) % span) - 200;

const KitchenBack: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={STAGE_W} height={STAGE_H} viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="kitchenSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#A9D8F0" />
          <stop offset="1" stopColor={colors.sky} />
        </linearGradient>
      </defs>
      <rect width={STAGE_W} height={STAGE_H} fill={colors.cream} />
      <rect y={620} width={STAGE_W} height={250} fill={colors.sage} opacity={0.6} />
      <rect y={612} width={STAGE_W} height={12} fill={colors.sageDark} opacity={0.5} />
      <rect y={860} width={STAGE_W} height={220} fill={colors.peach} opacity={0.7} />
      {Array.from({length: 9}).map((_, i) => (
        <line key={i} x1={i * 240} y1={860} x2={i * 240 - 80} y2={1080} stroke={colors.peachDark} strokeOpacity={0.25} strokeWidth={4} />
      ))}
      {/* window */}
      <rect x={150} y={110} width={480} height={410} rx={30} fill={colors.white} />
      <clipPath id="win">
        <rect x={174} y={134} width={432} height={362} rx={18} />
      </clipPath>
      <g clipPath="url(#win)">
        <rect x={174} y={134} width={432} height={362} fill="url(#kitchenSky)" />
        <circle cx={500} cy={230} r={54 + Math.sin(frame * 0.05) * 3} fill={colors.gold} opacity={0.9} />
        <Cloud x={drift(frame, 0.6, 300, 700)} y={260} s={0.8} />
        <Cloud x={drift(frame, 0.35, 650, 700)} y={180} s={0.55} />
        <ellipse cx={390} cy={520} rx={320} ry={90} fill={colors.sageDark} />
      </g>
      <rect x={384} y={134} width={12} height={362} fill={colors.white} />
      <rect x={174} y={309} width={432} height={12} fill={colors.white} />
      <rect x={130} y={516} width={520} height={22} rx={10} fill={colors.peachDark} opacity={0.7} />
      {/* shelf */}
      <rect x={1240} y={330} width={520} height={18} rx={8} fill={colors.peachDark} opacity={0.75} />
      <rect x={1290} y={250} width={70} height={80} rx={14} fill={colors.skyDark} opacity={0.7} />
      <rect x={1390} y={230} width={80} height={100} rx={16} fill={colors.sageDark} />
      <circle cx={1560} cy={290} r={40} fill={colors.white} stroke={colors.skyDark} strokeWidth={6} />
      <circle cx={1660} cy={290} r={40} fill={colors.white} stroke={colors.peachDark} strokeWidth={6} />
      {/* plant */}
      <path d="M 1800 860 L 1780 760 L 1880 760 L 1860 860 Z" fill={colors.peachDark} />
      {[-30, 0, 30].map((r) => (
        <ellipse key={r} cx={1830} cy={700} rx={22} ry={70} fill={colors.sageDark} transform={`rotate(${r + Math.sin(frame * 0.04) * 3} 1830 760)`} />
      ))}
    </svg>
  );
};

const Steam: React.FC<{x: number; y: number}> = ({x, y}) => {
  const frame = useCurrentFrame();
  return (
    <g>
      {[0, 1, 2].map((i) => {
        const t = ((frame + i * 20) % 60) / 60;
        return (
          <path
            key={i}
            d={`M ${x - 24 + i * 24} ${y + 10 - t * 40} q 8 -10 0 -20 q -8 -10 0 -20`}
            stroke={colors.white}
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
            opacity={(1 - t) * 0.7}
          />
        );
      })}
    </g>
  );
};

const KitchenFront: React.FC = () => {
  const ay = KITCHEN.ayanPlateX * STAGE_W;
  const sf = KITCHEN.safaBowlX * STAGE_W;
  const dl = KITCHEN.dalX * STAGE_W;
  const top = KITCHEN.tableTop;
  return (
    <svg width={STAGE_W} height={STAGE_H} viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} style={{position: 'absolute', inset: 0}}>
      {/* table */}
      <rect x={480} y={top} width={1180} height={46} rx={16} fill={colors.white} />
      <path d={`M 480 ${top + 30} L 1660 ${top + 30} L 1660 1050 Q 1600 1078 1540 1050 Q 1480 1078 1420 1050 Q 1360 1078 1300 1050 Q 1240 1078 1180 1050 Q 1120 1078 1060 1050 Q 1000 1078 940 1050 Q 880 1078 820 1050 Q 760 1078 700 1050 Q 640 1078 580 1050 Q 530 1078 480 1050 Z`} fill={colors.sky} />
      <rect x={480} y={top + 30} width={1180} height={14} fill={colors.skyDark} opacity={0.35} />
      
      
      {/* Ayan's plate: rice + egg */}
      <ellipse cx={ay} cy={top + 14} rx={130} ry={30} fill={colors.white} stroke="#E3D9C6" strokeWidth={5} />
      <ellipse cx={ay - 20} cy={top + 2} rx={70} ry={22} fill="#FFFDF6" stroke="#EDE3CF" strokeWidth={3} />
      <ellipse cx={ay + 70} cy={top + 10} rx={38} ry={14} fill={colors.white} stroke="#EDE3CF" strokeWidth={2} />
      <circle cx={ay + 70} cy={top + 8} r={11} fill={colors.gold} />
      <Steam x={ay - 20} y={top - 20} />
      {/* dal bowl */}
      <ellipse cx={dl} cy={top + 6} rx={60} ry={18} fill="#F2C94C" stroke={colors.white} strokeWidth={8} />
      {/* Safa's bowl */}
      <ellipse cx={sf} cy={top + 10} rx={80} ry={22} fill={colors.peach} stroke={colors.white} strokeWidth={6} />
      <ellipse cx={sf} cy={top + 4} rx={46} ry={12} fill="#FFFDF6" />
      {/* water glasses */}
      <rect x={ay - 190} y={top - 50} width={44} height={66} rx={8} fill={colors.sky} stroke={colors.white} strokeWidth={4} opacity={0.9} />
      <rect x={sf + 110} y={top - 40} width={38} height={56} rx={8} fill={colors.sky} stroke={colors.white} strokeWidth={4} opacity={0.9} />
    </svg>
  );
};

const PlainBack: React.FC = () => {
  const frame = useCurrentFrame();
  const dots = [
    [200, 200, 90, colors.peach],
    [1700, 260, 120, colors.sky],
    [380, 860, 110, colors.sky],
    [1550, 880, 80, colors.peach],
    [980, 120, 60, colors.white],
    [1200, 640, 70, colors.white],
  ] as const;
  return (
    <svg width={STAGE_W} height={STAGE_H} viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} style={{position: 'absolute', inset: 0}}>
      <defs>
        <radialGradient id="plainGrad" cx="0.5" cy="0.45" r="0.8">
          <stop offset="0" stopColor={colors.cream} />
          <stop offset="1" stopColor={colors.sage} />
        </radialGradient>
      </defs>
      <rect width={STAGE_W} height={STAGE_H} fill="url(#plainGrad)" />
      {dots.map(([x, y, r, c], i) => (
        <circle key={i} cx={x + Math.sin(frame * 0.02 + i) * 30} cy={y + Math.cos(frame * 0.025 + i) * 20} r={r} fill={c} opacity={0.45} />
      ))}
      <rect y={1000} width={STAGE_W} height={80} fill={colors.sageDark} opacity={0.25} />
    </svg>
  );
};

const OutdoorBack: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <svg width={STAGE_W} height={STAGE_H} viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} style={{position: 'absolute', inset: 0}}>
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9FD3F0" />
          <stop offset="1" stopColor={colors.cream} />
        </linearGradient>
      </defs>
      <rect width={STAGE_W} height={STAGE_H} fill="url(#sky)" />
      <circle cx={1650} cy={170} r={80 + Math.sin(frame * 0.05) * 4} fill={colors.gold} />
      <Cloud x={drift(frame, 0.8, 200, 2300)} y={180} s={1.1} />
      <Cloud x={drift(frame, 0.5, 1200, 2300)} y={300} s={0.8} />
      <Cloud x={drift(frame, 0.3, 1800, 2300)} y={120} s={0.6} />
      <ellipse cx={500} cy={1140} rx={1100} ry={360} fill={colors.sageDark} />
      <ellipse cx={1600} cy={1180} rx={1000} ry={380} fill="#A9D3B3" />
      {[260, 420, 1380, 1560, 1760].map((x, i) => (
        <g key={x} transform={`rotate(${Math.sin(frame * 0.06 + i) * 6} ${x} 990)`}>
          <line x1={x} y1={990} x2={x} y2={930} stroke="#5E9C6E" strokeWidth={6} />
          <circle cx={x} cy={925} r={16} fill={i % 2 ? colors.peachDark : colors.white} />
          <circle cx={x} cy={925} r={6} fill={colors.gold} />
        </g>
      ))}
    </svg>
  );
};

export const BackgroundBack: React.FC<{id: BackgroundId}> = ({id}) => {
  if (id === 'kitchen') return <KitchenBack />;
  if (id === 'outdoor') return <OutdoorBack />;
  return <PlainBack />;
};

export const BackgroundFront: React.FC<{id: BackgroundId}> = ({id}) => (id === 'kitchen' ? <KitchenFront /> : null);
