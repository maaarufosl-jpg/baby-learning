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
