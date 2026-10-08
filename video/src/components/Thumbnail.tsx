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
