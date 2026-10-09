import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {colors} from '../theme';
import {TEXT_FONT} from './Overlays';

/** Square profile picture for Facebook and YouTube; everything important sits inside the central circle. */
export const ProfilePicture: React.FC = () => (
  <AbsoluteFill style={{background: '#CFE6D8'}}>
    <Img src={staticFile('brand/profile-base.jpg')} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}} />
    <div
      style={{
        position: 'absolute',
        left: '50%',
        bottom: 120,
        transform: 'translateX(-50%)',
        background: colors.white,
        border: `10px solid ${colors.gold}`,
        borderRadius: 999,
        padding: '6px 54px 14px',
        boxShadow: '0 10px 0 rgba(59,58,74,0.15)',
        whiteSpace: 'nowrap',
        fontFamily: TEXT_FONT,
        fontWeight: 700,
        fontSize: 104,
        lineHeight: 1.2,
        color: colors.sageDark,
      }}
    >
      ছোট্ট মুমিন
    </div>
  </AbsoluteFill>
);

const BG = '#BFD4BF';

/** Soft floating circles like the mint backdrop in the videos. */
const Bokeh: React.FC<{w: number; h: number; seed: number}> = ({w, h, seed}) => {
  const dots = Array.from({length: 26}, (_, i) => {
    const r = ((Math.sin(i * 12.9898 + seed) * 43758.5453) % 1 + 1) % 1;
    const q = ((Math.sin(i * 78.233 + seed) * 12543.135) % 1 + 1) % 1;
    const z = ((Math.sin(i * 39.425 + seed) * 2341.77) % 1 + 1) % 1;
    return {x: r * w, y: q * h, s: 20 + z * (h * 0.09)};
  });
  return (
    <svg width={w} height={h} style={{position: 'absolute', inset: 0}}>
      {dots.map((d, i) => (
        <circle key={i} cx={d.x} cy={d.y} r={d.s} fill="#FFFBEA" opacity={0.22 + (i % 3) * 0.08} />
      ))}
    </svg>
  );
};

const Family: React.FC<{height: number; left: number; top: number}> = ({height, left, top}) => (
  <Img
    src={staticFile('brand/family.jpg')}
    style={{
      position: 'absolute',
      left,
      top,
      height,
      width: (height * 760) / 720,
      objectFit: 'cover',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 12%, #000 84%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 100%)',
      WebkitMaskComposite: 'source-in',
      maskImage: 'linear-gradient(to right, transparent 0%, #000 12%, #000 84%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 14%, #000 100%)',
      maskComposite: 'intersect',
    }}
  />
);

const Wordmark: React.FC<{size: number; left: number; top: number; width: number}> = ({size, left, top, width}) => (
  <div style={{position: 'absolute', left, top, width, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: size * 0.12}}>
    <div
      style={{
        fontFamily: TEXT_FONT,
        fontWeight: 700,
        fontSize: size,
        lineHeight: 1.15,
        color: colors.sageDark,
        WebkitTextStroke: `${size * 0.045}px ${colors.white}`,
        paintOrder: 'stroke fill',
        textShadow: `0 ${size * 0.06}px 0 rgba(59,58,74,0.14)`,
      }}
    >
      ছোট্ট মুমিন
    </div>
    <div
      style={{
        background: colors.white,
        border: `${size * 0.05}px solid ${colors.gold}`,
        borderRadius: 999,
        padding: `${size * 0.04}px ${size * 0.28}px ${size * 0.07}px`,
        fontFamily: TEXT_FONT,
        fontWeight: 700,
        fontSize: size * 0.38,
        color: colors.peachDark,
        whiteSpace: 'nowrap',
      }}
    >
      গল্পে গল্পে দোয়া ও সুন্নাহ
    </div>
    <div style={{fontFamily: TEXT_FONT, fontWeight: 600, fontSize: size * 0.24, color: colors.ink, opacity: 0.8, whiteSpace: 'nowrap'}}>
      ২-৫ বছরের সোনামণিদের জন্য · বাদ্যযন্ত্র ছাড়া
    </div>
  </div>
);

/**
 * YouTube channel banner, 2560x1440. Everything that must show on every device sits inside
 * the central 1546x423 safe area (x 507-2053, y 508-931); the rest is backdrop for TVs.
 */
export const YouTubeBanner: React.FC = () => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 50%, #C9DEC9 0%, ${BG} 75%)`}}>
    <Bokeh w={2560} h={1440} seed={3} />
    <Family height={420} left={640} top={518} />
    <Wordmark size={146} left={1120} top={540} width={930} />
  </AbsoluteFill>
);

/** Facebook page cover, 1640x624. Phones show only the middle ~1110px, so content stays in x 265-1375. */
export const FacebookCover: React.FC = () => (
  <AbsoluteFill style={{background: `radial-gradient(ellipse at 50% 50%, #C9DEC9 0%, ${BG} 75%)`}}>
    <Bokeh w={1640} h={624} seed={7} />
    <Family height={600} left={250} top={24} />
    <Wordmark size={118} left={830} top={150} width={560} />
  </AbsoluteFill>
);
