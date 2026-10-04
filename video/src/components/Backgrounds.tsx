import React from 'react';
import {useCurrentFrame} from 'remotion';
import {colors} from '../theme';
import type {BackgroundId} from '../types';
import {STAGE_H, STAGE_W} from './Characters';

/** Plate positions on the kitchen table, as stage fractions. Characters sit behind these. */
export const KITCHEN = {
  tableTop: 800,
  umayerPlateX: 0.42,
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

const WOOD = '#C98B5A';
const WOOD_LINE = '#8A5A3A';
const OUT = '#8A6A55';

const Chair: React.FC<{x: number}> = ({x}) => (
  <g fill={WOOD} stroke={WOOD_LINE} strokeWidth={3}>
    <rect x={x - 118} y={630} width={20} height={240} rx={7} />
    <rect x={x + 98} y={630} width={20} height={240} rx={7} />
    <rect x={x - 126} y={606} width={252} height={46} rx={20} />
    <rect x={x - 104} y={700} width={208} height={18} rx={8} />
  </g>
);

const Cabinet: React.FC<{x: number; y: number; w: number; h: number; knob: 'left' | 'right' | 'bar'}> = ({x, y, w, h, knob}) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={8} fill="#CFE6D6" stroke={OUT} strokeWidth={3} />
    <rect x={x + 14} y={y + 14} width={w - 28} height={h - 28} rx={6} fill="none" stroke="#A9CBB4" strokeWidth={3} />
    {knob === 'bar' ? (
      <rect x={x + w / 2 - 22} y={y + h / 2 - 5} width={44} height={10} rx={5} fill="#E9C27A" stroke={OUT} strokeWidth={2} />
    ) : (
      <circle cx={knob === 'left' ? x + 28 : x + w - 28} cy={y + h / 2} r={8} fill="#E9C27A" stroke={OUT} strokeWidth={2} />
    )}
  </g>
);

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
      {/* wall with soft stripes */}
      <rect width={STAGE_W} height={STAGE_H} fill="#FFF3DF" />
      {Array.from({length: 32}).map((_, i) => (
        <rect key={i} x={i * 60} y={0} width={28} height={850} fill="#FBE7CB" opacity={0.55} />
      ))}
      {/* floor tiles */}
      <rect y={862} width={STAGE_W} height={218} fill="#F1D3AE" />
      {[930, 1005].map((y) => (
        <line key={y} x1={0} y1={y} x2={STAGE_W} y2={y} stroke="#D9B48A" strokeWidth={3} />
      ))}
      {Array.from({length: 14}).map((_, i) => {
        const x = i * 160 - 80;
        return <line key={i} x1={x} y1={862} x2={x + (x - 960) * 0.3} y2={1080} stroke="#D9B48A" strokeWidth={3} />;
      })}
      <rect y={846} width={STAGE_W} height={18} fill="#E9C9A0" stroke={OUT} strokeWidth={2} />

      {/* window with curtains */}
      <rect x={100} y={90} width={560} height={12} rx={6} fill="#B98A60" stroke={OUT} strokeWidth={2} />
      <circle cx={100} cy={96} r={11} fill="#B98A60" stroke={OUT} strokeWidth={2} />
      <circle cx={660} cy={96} r={11} fill="#B98A60" stroke={OUT} strokeWidth={2} />
      <rect x={160} y={130} width={440} height={370} rx={14} fill={colors.white} stroke={OUT} strokeWidth={3} />
      <clipPath id="win">
        <rect x={182} y={152} width={396} height={326} rx={8} />
      </clipPath>
      <g clipPath="url(#win)">
        <rect x={182} y={152} width={396} height={326} fill="url(#kitchenSky)" />
        <circle cx={480} cy={235} r={46 + Math.sin(frame * 0.05) * 3} fill={colors.gold} />
        <Cloud x={drift(frame, 0.6, 300, 700)} y={270} s={0.7} />
        <Cloud x={drift(frame, 0.35, 650, 700)} y={200} s={0.5} />
        <ellipse cx={380} cy={500} rx={300} ry={90} fill={colors.sageDark} />
      </g>
      <rect x={374} y={152} width={12} height={326} fill={colors.white} stroke={OUT} strokeWidth={2} />
      <rect x={182} y={309} width={396} height={12} fill={colors.white} stroke={OUT} strokeWidth={2} />
      <rect x={140} y={496} width={480} height={22} rx={8} fill="#E9C9A0" stroke={OUT} strokeWidth={3} />
      <path d="M 112 102 L 230 102 Q 206 300 246 470 Q 196 506 168 462 Q 146 300 112 102 Z" fill="#F4A9A0" stroke="#C9776E" strokeWidth={3} />
      <path d="M 648 102 L 530 102 Q 554 300 514 470 Q 564 506 592 462 Q 614 300 648 102 Z" fill="#F4A9A0" stroke="#C9776E" strokeWidth={3} />
      <path d="M 150 400 Q 190 412 226 398 M 610 400 Q 570 412 534 398" stroke="#E9C27A" strokeWidth={8} strokeLinecap="round" fill="none" />
      <path d="M 486 496 L 476 448 L 548 448 L 538 496 Z" fill={colors.peachDark} stroke={OUT} strokeWidth={2.5} />
      {[-28, 0, 28].map((r) => (
        <ellipse key={r} cx={512} cy={410} rx={13} ry={40} fill={colors.sageDark} stroke="#5E9C6E" strokeWidth={2} transform={`rotate(${r + Math.sin(frame * 0.04) * 3} 512 448)`} />
      ))}

      {/* framed calligraphy */}
      <rect x={1000} y={300} width={200} height={130} rx={8} fill="#FFFDF6" stroke="#C79A5A" strokeWidth={8} />
      <text x={1100} y={384} textAnchor="middle" fontFamily="Amiri, serif" fontWeight={700} fontSize={54} fill="#3B6E52">
        بِسْمِ اللَّهِ
      </text>

      {/* kitchen: upper cabinets, tiles, counter, lower cabinets */}
      {[0, 1, 2, 3].map((i) => (
        <Cabinet key={`u${i}`} x={1250 + i * 160} y={140} w={154} h={230} knob={i % 2 ? 'left' : 'right'} />
      ))}
      <rect x={1250} y={376} width={634} height={212} fill={colors.white} stroke={OUT} strokeWidth={2} />
      {Array.from({length: 15}).map((_, i) => (
        <line key={`tv${i}`} x1={1250 + i * 42} y1={376} x2={1250 + i * 42} y2={588} stroke="#E3ECF1" strokeWidth={2} />
      ))}
      {Array.from({length: 5}).map((_, i) => (
        <line key={`th${i}`} x1={1250} y1={376 + i * 42} x2={1884} y2={376 + i * 42} stroke="#E3ECF1" strokeWidth={2} />
      ))}
      {/* pot on the stove, kettle, jar */}
      <rect x={1330} y={566} width={170} height={20} rx={6} fill="#5B5B66" stroke={OUT} strokeWidth={2} />
      <rect x={1350} y={496} width={130} height={72} rx={16} fill="#7FA9C9" stroke={OUT} strokeWidth={3} />
      <ellipse cx={1415} cy={496} rx={70} ry={12} fill="#9CC0DA" stroke={OUT} strokeWidth={3} />
      <circle cx={1415} cy={482} r={8} fill="#5B5B66" />
      <path d="M 1350 516 h -18 M 1480 516 h 18" stroke={OUT} strokeWidth={6} strokeLinecap="round" />
      <path d="M 1580 586 Q 1570 520 1620 512 Q 1670 520 1660 586 Z" fill="#F2C94C" stroke={OUT} strokeWidth={3} />
      <path d="M 1660 548 q 26 -6 30 -26" stroke={OUT} strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M 1596 516 Q 1620 484 1644 516" stroke={OUT} strokeWidth={5} fill="none" />
      <rect x={1740} y={520} width={70} height={66} rx={12} fill="#E9F2F7" stroke={OUT} strokeWidth={3} />
      <rect x={1734} y={508} width={82} height={16} rx={6} fill={colors.peachDark} stroke={OUT} strokeWidth={2} />
      <rect x={1236} y={586} width={662} height={28} rx={8} fill="#E9DCC6" stroke={OUT} strokeWidth={3} />
      <Cabinet x={1250} y={614} w={634} h={60} knob="bar" />
      {[0, 1, 2, 3].map((i) => (
        <Cabinet key={`l${i}`} x={1250 + i * 160} y={680} w={154} h={166} knob={i % 2 ? 'left' : 'right'} />
      ))}

      {/* chairs behind the table */}
      <Chair x={KITCHEN.umayerPlateX * STAGE_W} />
      <Chair x={KITCHEN.safaBowlX * STAGE_W} />
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
  const ay = KITCHEN.umayerPlateX * STAGE_W;
  const sf = KITCHEN.safaBowlX * STAGE_W;
  const dl = KITCHEN.dalX * STAGE_W;
  const top = KITCHEN.tableTop;
  return (
    <svg width={STAGE_W} height={STAGE_H} viewBox={`0 0 ${STAGE_W} ${STAGE_H}`} style={{position: 'absolute', inset: 0}}>
      <defs>
        <pattern id="gingham" width="44" height="44" patternUnits="userSpaceOnUse">
          <rect width="44" height="44" fill={colors.white} />
          <rect width="22" height="44" fill="#A9D3EE" opacity="0.6" />
          <rect width="44" height="22" fill="#A9D3EE" opacity="0.6" />
        </pattern>
      </defs>
      {/* table legs peeking below the cloth */}
      <rect x={478} y={1040} width={26} height={40} fill={WOOD} stroke={WOOD_LINE} strokeWidth={3} />
      <rect x={1636} y={1040} width={26} height={40} fill={WOOD} stroke={WOOD_LINE} strokeWidth={3} />
      {/* tablecloth: top surface and front drape */}
      <path d={`M 480 ${top - 12} L 1660 ${top - 12} L 1690 ${top + 30} L 450 ${top + 30} Z`} fill={colors.white} stroke={OUT} strokeWidth={3} strokeLinejoin="round" />
      <path
        d={`M 450 ${top + 30} L 1690 ${top + 30} L 1690 1040 Q 1659 1062 1628 1040 Q 1597 1062 1566 1040 Q 1535 1062 1504 1040 Q 1473 1062 1442 1040 Q 1411 1062 1380 1040 Q 1349 1062 1318 1040 Q 1287 1062 1256 1040 Q 1225 1062 1194 1040 Q 1163 1062 1132 1040 Q 1101 1062 1070 1040 Q 1039 1062 1008 1040 Q 977 1062 946 1040 Q 915 1062 884 1040 Q 853 1062 822 1040 Q 791 1062 760 1040 Q 729 1062 698 1040 Q 667 1062 636 1040 Q 605 1062 574 1040 Q 543 1062 512 1040 Q 481 1062 450 1040 Z`}
        fill="url(#gingham)"
        stroke={OUT}
        strokeWidth={3}
        strokeLinejoin="round"
      />
      {/* Umayer's plate: rice + egg */}
      <ellipse cx={ay} cy={top + 10} rx={120} ry={26} fill={colors.white} stroke={OUT} strokeWidth={3} />
      <ellipse cx={ay} cy={top + 8} rx={92} ry={18} fill="#F7F3EA" />
      <ellipse cx={ay - 22} cy={top + 2} rx={58} ry={16} fill="#FFFDF6" stroke="#E2D6BF" strokeWidth={2} />
      <ellipse cx={ay + 54} cy={top + 6} rx={30} ry={11} fill={colors.white} stroke="#E2D6BF" strokeWidth={2} />
      <circle cx={ay + 54} cy={top + 4} r={9} fill={colors.gold} stroke="#E0A800" strokeWidth={1.5} />
      <Steam x={ay - 22} y={top - 18} />
      {/* dal bowl */}
      <ellipse cx={dl} cy={top + 6} rx={56} ry={16} fill="#F2C94C" stroke={OUT} strokeWidth={3} />
      <ellipse cx={dl} cy={top + 3} rx={42} ry={9} fill="#F7D976" />
      {/* Safa's bowl */}
      <ellipse cx={sf} cy={top + 10} rx={76} ry={20} fill={colors.peach} stroke={OUT} strokeWidth={3} />
      <ellipse cx={sf} cy={top + 6} rx={50} ry={11} fill="#FFFDF6" />
      {/* water glasses */}
      <path d={`M ${ay - 196} ${top - 50} h 44 l -5 64 h -34 Z`} fill="#D6EEF8" stroke={OUT} strokeWidth={3} strokeLinejoin="round" />
      <rect x={ay - 190} y={top - 20} width={32} height={30} fill="#A9D8F0" opacity={0.7} />
      <path d={`M ${sf + 104} ${top - 42} h 38 l -4 54 h -30 Z`} fill="#D6EEF8" stroke={OUT} strokeWidth={3} strokeLinejoin="round" />
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
