import React from 'react';
import type {Brand} from '../brand';

/** Line-drawn mark for each proposed series identity. Drawn in the brand accent on a transparent background. */
export const LogoMark: React.FC<{brand: Brand; size: number; draw?: number}> = ({brand, size, draw = 1}) => {
  const c = brand.colors.accent;
  const dash = (len: number) => ({strokeDasharray: len, strokeDashoffset: len * (1 - draw)});
  const common = {fill: 'none', stroke: c, strokeWidth: 5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const};
  return (
    <svg width={size} height={size} viewBox="0 0 200 200">
      {brand.id === 'nidarshan' && (
        <>
          {/* mihrab arch framing a sunrise over two hills */}
          <path d="M45 175 V95 Q45 40 100 22 Q155 40 155 95 V175 Z" {...common} style={dash(480)} />
          <circle cx="100" cy="128" r="22" fill={c} opacity={draw} />
          <path d="M45 150 Q80 118 112 140 Q135 126 155 136" {...common} style={dash(140)} />
          <path d="M45 175 Q95 140 155 165" {...common} strokeWidth={4} style={dash(130)} />
        </>
      )}
      {brand.id === 'bhorer-alo' && (
        <>
          {/* rising half sun with rays under a thin crescent */}
          <path d="M40 140 H160" {...common} style={dash(120)} />
          <path d="M65 140 A35 35 0 0 1 135 140" {...common} style={dash(110)} />
          {[-60, -30, 0, 30, 60].map((a) => (
            <line key={a} x1="100" y1="140" x2="100" y2="88" {...common} strokeWidth={4} transform={`rotate(${a} 100 140) translate(0 -8)`} style={dash(52)} />
          ))}
          <path d="M112 30 A26 26 0 1 0 136 62 A20 20 0 1 1 112 30 Z" fill={c} opacity={draw} />
          <path d="M60 165 H140" {...common} strokeWidth={4} style={dash(80)} />
        </>
      )}
      {brand.id === 'sobuj-tasbih' && (
        <>
          {/* leaf with a falling drop */}
          <path d="M100 175 C40 140 40 70 100 25 C160 70 160 140 100 175 Z" {...common} style={dash(420)} />
          <path d="M100 175 V45" {...common} strokeWidth={4} style={dash(130)} />
          <path d="M100 120 L72 95 M100 95 L128 72 M100 145 L128 122" {...common} strokeWidth={3.5} style={dash(150)} />
          <path d="M160 150 Q170 166 160 176 Q150 166 160 150 Z" fill={c} opacity={draw} />
        </>
      )}
    </svg>
  );
};
