import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {colors} from '../theme';
import {TEXT_FONT} from './Overlays';

/** YouTube thumbnail: the family at the table, a big question, and the series label. */
export const Ep01Thumbnail: React.FC = () => (
  <AbsoluteFill style={{background: colors.cream}}>
    <Img src={staticFile('thumb/ep01-family.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition: '60% 40%'}} />
    <div
      style={{
        position: 'absolute',
        left: 28,
        top: 28,
        background: colors.white,
        borderRadius: 32,
        border: `7px solid ${colors.gold}`,
        padding: '12px 30px 16px',
        boxShadow: '0 8px 0 rgba(59,58,74,0.15)',
      }}
    >
      <div style={{fontFamily: TEXT_FONT, fontWeight: 700, fontSize: 70, lineHeight: 1.15, color: colors.ink}}>
        খাওয়ার আগে
        <br />
        <span style={{color: colors.peachDark}}>কী বলি?</span>
      </div>
    </div>
    <div
      style={{
        position: 'absolute',
        left: 40,
        bottom: 36,
        background: colors.sageDark,
        color: colors.white,
        borderRadius: 999,
        padding: '8px 30px',
        fontFamily: TEXT_FONT,
        fontWeight: 700,
        fontSize: 40,
      }}
    >
      ছোট্ট মুমিন · পর্ব ১
    </div>
  </AbsoluteFill>
);

type Corner = 'tl' | 'tr' | 'tc';

/** A thumbnail for any episode: a still from the episode, a big two-line question and the series label. */
export const EpisodeThumbnail: React.FC<{image: string; line1: string; line2: string; number: number; corner?: Corner; objectPosition?: string}> = ({
  image,
  line1,
  line2,
  number,
  corner = 'tl',
  objectPosition = '50% 40%',
}) => {
  const box: React.CSSProperties =
    corner === 'tr' ? {right: 28, top: 28} : corner === 'tc' ? {left: '50%', top: 28, transform: 'translateX(-50%)'} : {left: 28, top: 28};
  return (
    <AbsoluteFill style={{background: colors.cream}}>
      <Img src={staticFile(image)} style={{width: '100%', height: '100%', objectFit: 'cover', objectPosition}} />
      <div
        style={{
          position: 'absolute',
          ...box,
          background: colors.white,
          borderRadius: 32,
          border: `7px solid ${colors.gold}`,
          padding: '12px 30px 16px',
          boxShadow: '0 8px 0 rgba(59,58,74,0.15)',
          textAlign: 'center',
        }}
      >
        <div style={{fontFamily: TEXT_FONT, fontWeight: 700, fontSize: 64, lineHeight: 1.15, color: colors.ink, whiteSpace: 'nowrap'}}>
          {line1}
          <br />
          <span style={{color: colors.peachDark}}>{line2}</span>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          ...(corner === 'tr' ? {left: 40} : {right: 40}),
          bottom: 36,
          background: colors.sageDark,
          color: colors.white,
          borderRadius: 999,
          padding: '8px 30px',
          fontFamily: TEXT_FONT,
          fontWeight: 700,
          fontSize: 40,
        }}
      >
        ছোট্ট মুমিন · পর্ব {'০১২৩৪৫৬৭৮৯'[number]}
      </div>
    </AbsoluteFill>
  );
};

/** Thumbnails for episodes 2 onward; each still comes from that episode's clips. */
export const EPISODE_THUMBNAILS = [
  {number: 2, image: 'thumb/ep02-bg.jpg', line1: 'খাওয়ার পর', line2: 'কী বলি?', corner: 'tl' as Corner},
  {number: 3, image: 'thumb/ep03-bg.jpg', line1: 'বিসমিল্লাহ', line2: 'ভুলে গেলে?', corner: 'tr' as Corner},
  {number: 4, image: 'thumb/ep04-bg.jpg', line1: 'ঘুমের আগে', line2: 'কী বলি?', corner: 'tc' as Corner},
  {number: 5, image: 'thumb/ep05-bg.jpg', line1: 'ঘুম থেকে উঠে', line2: 'কী বলি?', corner: 'tr' as Corner},
  {number: 6, image: 'thumb/ep06-bg.jpg', line1: 'বাথরুমে ঢোকার', line2: 'আগে কী বলি?', corner: 'tl' as Corner},
];
