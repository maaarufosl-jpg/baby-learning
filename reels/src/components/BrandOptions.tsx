import React from 'react';
import {AbsoluteFill} from 'remotion';
import {BRANDS, toBn} from '../brand';
import {ARABIC_FONT, BENGALI_FONT} from '../fonts';
import {LogoMark} from './Logo';

/** One still showing the three proposed identities side by side, for choosing on a phone. */
export const BrandOptions: React.FC = () => (
  <AbsoluteFill style={{flexDirection: 'column'}}>
    {Object.values(BRANDS).map((b, i) => (
      <div
        key={b.id}
        style={{
          flex: 1,
          background: `linear-gradient(160deg, ${b.colors.deep} 0%, #0b0f12 140%)`,
          display: 'flex',
          alignItems: 'center',
          padding: '0 70px',
          gap: 50,
          borderBottom: i < 2 ? '4px solid rgba(255,255,255,0.15)' : undefined,
        }}
      >
        <LogoMark brand={b} size={260} />
        <div style={{fontFamily: BENGALI_FONT}}>
          <div style={{fontSize: 36, color: b.colors.soft}}>বিকল্প {toBn(i + 1)}</div>
          <div style={{fontSize: 104, fontWeight: 700, color: b.colors.text, lineHeight: 1.2}}>{b.name}</div>
          <div style={{fontSize: 40, color: b.colors.accent}}>{b.tagline}</div>
          <div style={{fontFamily: ARABIC_FONT, fontSize: 64, color: b.colors.accent, marginTop: 8}}>الرَّحْمٰنُ</div>
          <div style={{display: 'flex', gap: 16, marginTop: 14}}>
            {Object.values(b.colors).map((c) => (
              <div key={c} style={{width: 58, height: 58, borderRadius: 29, background: c, border: '3px solid rgba(255,255,255,0.4)'}} />
            ))}
          </div>
        </div>
      </div>
    ))}
  </AbsoluteFill>
);
