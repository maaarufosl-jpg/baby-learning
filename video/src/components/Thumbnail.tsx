import React from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import {colors} from '../theme';
import {TEXT_FONT} from './Overlays';
import {toBn} from './Episode';

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

type Corner = 'tl' | 'tr' | 'tc' | 'bl';

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
    corner === 'tr' ? {right: 28, top: 28} : corner === 'tc' ? {left: '50%', top: 28, transform: 'translateX(-50%)'} : corner === 'bl' ? {left: 28, bottom: 28} : {left: 28, top: 28};
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
        ছোট্ট মুমিন · পর্ব {toBn(number)}
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
  {number: 7, image: 'thumb/ep07-bg.jpg', line1: 'বাথরুম থেকে', line2: 'বের হয়ে কী বলি?', corner: 'tr' as Corner},
  {number: 8, image: 'thumb/ep08-bg.jpg', line1: 'নতুন জামা পরে', line2: 'কী বলি?', corner: 'tr' as Corner},
  {number: 9, image: 'thumb/ep09-bg.jpg', line1: 'সালাম দিলে', line2: 'কী হয়?', corner: 'tl' as Corner},
  {number: 10, image: 'thumb/ep10-bg.jpg', line1: 'হাঁচি দিলে', line2: 'কী বলি?', corner: 'tl' as Corner},
  {number: 11, image: 'thumb/ep11-bg.jpg', line1: 'পানি কীভাবে', line2: 'খাই?', corner: 'tr' as Corner},
  {number: 12, image: 'thumb/ep12-bg.jpg', line1: 'কেউ কিছু দিলে', line2: 'কী বলি?', corner: 'tr' as Corner},
  {number: 13, image: 'thumb/ep13-bg.jpg', line1: 'বৃষ্টি দেখলে', line2: 'কী বলি?', corner: 'tl' as Corner},
  {number: 14, image: 'thumb/ep14-bg.jpg', line1: 'সুন্দর কিছু দেখলে', line2: 'কী বলি?', corner: 'tr' as Corner},
  {number: 15, image: 'thumb/ep15-bg.jpg', line1: 'ভুল কাজ করলে', line2: 'কী বলি?', corner: 'tr' as Corner},
  {number: 16, image: 'thumb/ep16-bg.jpg', line1: 'ঘর থেকে বের হলে', line2: 'কী বলি?', corner: 'tr' as Corner},
  {number: 17, image: 'thumb/ep17-bg.jpg', line1: 'পরে কিছু করবো বললে', line2: 'কী বলি?', corner: 'tr' as Corner},
  {number: 18, image: 'thumb/ep18-bg.jpg', line1: 'উপরে উঠলে, নিচে নামলে', line2: 'কী বলি?', corner: 'tr' as Corner},
  {number: 19, image: 'thumb/ep19-bg.jpg', line1: 'ঘরে ঢুকলে', line2: 'কী বলি?', corner: 'tr' as Corner},
  {number: 20, image: 'thumb/ep20-bg.jpg', line1: 'রাগ হলে', line2: 'কী বলি?', corner: 'tc' as Corner},
  {number: 21, image: 'thumb/ep21-bg.jpg', line1: 'কিছু হারিয়ে গেলে', line2: 'কী বলি?', corner: 'tl' as Corner},
  {number: 22, image: 'thumb/ep22-bg.jpg', line1: 'মা-বাবার জন্য', line2: 'কী দোয়া করি?', corner: 'tr' as Corner},
  {number: 23, image: 'thumb/ep23-bg.jpg', line1: 'চাঁদ-তারা দেখলে', line2: 'কী বলি?', corner: 'tr' as Corner},
  {number: 24, image: 'thumb/ep24-bg.jpg', line1: 'পড়া শুরুর আগে', line2: 'কী বলি?', corner: 'tr' as Corner},
  {number: 25, image: 'thumb/ep25-bg.jpg', line1: 'কেউ অসুস্থ হলে', line2: 'কী বলি?', corner: 'tl' as Corner},
  {number: 26, image: 'thumb/ep26-bg.jpg', line1: 'গাড়িতে চড়লে', line2: 'কী বলি?', corner: 'tl' as Corner},
  {number: 27, image: 'thumb/ep27-bg.jpg', line1: 'কঠিন কাজে', line2: 'কী বলি?', corner: 'tr' as Corner},
  {number: 28, image: 'thumb/ep28-bg.jpg', line1: 'ভয় পেলে', line2: 'কী বলি?', corner: 'tl' as Corner},
  {number: 29, image: 'thumb/ep29-bg.jpg', line1: 'বন্ধু ভালো কিছু পেলে', line2: 'কী বলি?', corner: 'bl' as Corner},
  {number: 30, image: 'thumb/ep30-bg.jpg', line1: 'দুধ খেলে', line2: 'কী বলি?', corner: 'bl' as Corner},
  {number: 31, image: 'thumb/ep31-bg.jpg', line1: 'কেউ খাওয়ালে', line2: 'কী বলি?', corner: 'bl' as Corner},
  {number: 32, image: 'thumb/ep32-bg.jpg', line1: 'জান্নাত চাইতে', line2: 'কী বলি?', corner: 'tr' as Corner},
];
