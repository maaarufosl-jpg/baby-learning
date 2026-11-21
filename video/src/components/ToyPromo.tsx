import React from 'react';
import {AbsoluteFill, Img, interpolate, OffthreadVideo, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {getLayout} from '../layout';
import {colors} from '../theme';
import type {CharacterId} from '../types';
import {SpeechBubble, TEXT_FONT} from './Overlays';

/**
 * Toy promo: Umayer and Safa with the talking card toy (sold as "ইকরা টকিং কার্ড")
 * (prompts in episodes/promo-littlestar-gemini-copy.md, product assets in assets/promo/toy1/).
 * Clip times are seconds within each _ready clip.
 */
type Say = {who: CharacterId; text: string; from: number; to: number; top?: number};
type Clip = {file: string; from: number; to: number; says?: Say[]; toyVoice?: [number, number]; endCard?: number};

const FPS = 30;
export const PROMO_CLIPS: Clip[] = [
  {
    file: 'clips/promo1/_ready/scene01.mp4', from: 1.0, to: 8.2,
    says: [
      {who: 'umayer', text: 'ওয়াও! জাযাকাল্লাহু খাইরান, মা!', from: 2.8, to: 5.5, top: 880},
      {who: 'ammu', text: 'এটা দিয়ে খেলতে খেলতে শিখবে!', from: 5.9, to: 8.2, top: 880},
    ],
  },
  {
    // Card goes in, the toy's real recorded voice plays in full, then Umayer answers.
    file: 'clips/promo1/_ready/scene02.mp4', from: 0, to: 15.6, toyVoice: [2.6, 12.8],
    says: [{who: 'umayer', text: 'আপেল! মা, খেলনা কথা বলে!', from: 12.85, to: 15.6, top: 880}],
  },
  {
    file: 'clips/promo1/_ready/scene03.mp4', from: 0, to: 15.7, toyVoice: [2.1, 10.8],
    says: [
      {who: 'safa', text: 'বল!', from: 11.1, to: 12.8, top: 880},
      {who: 'umayer', text: 'মাশাআল্লাহ, সাফা!', from: 13.8, to: 15.7, top: 880},
    ],
  },
  {file: 'features', from: 0, to: 7.5},
  {
    file: 'clips/promo1/_ready/scene04.mp4', from: 0.8, to: 9.9, endCard: 5.8,
    says: [
      {who: 'umayer', text: 'আমরা খেলতে খেলতে শিখি!', from: 1.7, to: 4.2, top: 880},
      {who: 'safa', text: 'তুমিও শেখো!', from: 4.5, to: 6.0, top: 880},
    ],
  },
];

export const promoFrames = () => PROMO_CLIPS.reduce((n, c) => n + Math.round((c.to - c.from) * FPS), 0);

const usePop = (delay = 0) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return spring({frame: frame - delay, fps, config: {damping: 14, mass: 0.7}});
};

const ToyVoiceTag: React.FC = () => {
  const pop = usePop();
  return (
    <div style={{position: 'absolute', top: 40, left: 40, opacity: pop, transform: `scale(${interpolate(pop, [0, 1], [0.85, 1])})`, transformOrigin: 'left top',
      background: colors.white, border: `5px solid ${colors.skyDark}`, borderRadius: 999, padding: '12px 34px', fontFamily: TEXT_FONT, fontWeight: 700, fontSize: 44, color: colors.ink}}>
      খেলনার আসল আওয়াজ শুনুন
    </div>
  );
};

const FEATURES = ['বাংলা স্বরবর্ণ ও ব্যঞ্জনবর্ণ', 'ইংরেজি বর্ণ', 'আরবি হরফ', 'ইসলামিক বেসিকস ও সূরা', 'সংখ্যা ও নামতা', 'পশুপাখি, ফল-ফুল, যানবাহন', 'রেকর্ডিং অপশন', 'রিচার্জেবল · ১ বছরের ওয়ারেন্টি'];

const Product: React.FC<{size: number}> = ({size}) => (
  <div style={{width: size, height: size, borderRadius: 48, overflow: 'hidden', background: colors.white, boxShadow: '0 18px 0 rgba(59,58,74,0.08)', border: `8px solid ${colors.white}`}}>
    <Img src={staticFile('promo/toy1-product-crop.jpg')} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
  </div>
);

const Features: React.FC = () => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, 225], [1, 1.06]);
  return (
    <AbsoluteFill style={{background: `linear-gradient(135deg, ${colors.cream}, ${colors.sky})`, flexDirection: 'row', alignItems: 'center', padding: '0 110px', gap: 90}}>
      <div style={{transform: `scale(${zoom})`}}><Product size={760} /></div>
      <div style={{flex: 1}}>
        <div style={{fontFamily: TEXT_FONT, fontWeight: 700, fontSize: 70, color: colors.ink, lineHeight: 1.2}}>ইকরা টকিং কার্ড</div>
        <div style={{fontFamily: TEXT_FONT, fontWeight: 700, fontSize: 50, color: colors.peachDark, margin: '10px 0 26px'}}>২৫৫ কার্ডে ৫১০টি শিক্ষা</div>
        <div style={{display: 'flex', flexWrap: 'wrap', gap: 18}}>
          {FEATURES.map((f, i) => {
            const pop = spring({frame: frame - 12 - i * 14, fps: FPS, config: {damping: 14, mass: 0.6}});
            return (
              <div key={f} style={{opacity: pop, transform: `scale(${interpolate(pop, [0, 1], [0.8, 1])})`, background: colors.white, border: `4px solid ${colors.sageDark}`,
                borderRadius: 999, padding: '10px 30px', fontFamily: TEXT_FONT, fontWeight: 600, fontSize: 40, color: colors.ink}}>{f}</div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const EndCard: React.FC = () => {
  const pop = usePop();
  return (
    <div style={{position: 'absolute', right: 90, top: 70, width: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 30, opacity: pop, transform: `translateY(${interpolate(pop, [0, 1], [40, 0])}px)`}}>
      <Product size={560} />
      <div style={{background: colors.white, border: `6px solid ${colors.gold}`, borderRadius: 40, padding: '24px 46px', textAlign: 'center', fontFamily: TEXT_FONT, color: colors.ink}}>
        <div style={{fontWeight: 700, fontSize: 52}}>ইকরা টকিং কার্ড</div>
        <div style={{fontWeight: 700, fontSize: 50, color: colors.peachDark, marginTop: 6, whiteSpace: 'nowrap'}}>অর্ডার ও দাম জানতে ইনবক্স করুন</div>
      </div>
    </div>
  );
};

export const ToyPromo: React.FC = () => {
  const {width, height} = useVideoConfig();
  const layout = getLayout(width, height);
  let at = 0;
  return (
    <AbsoluteFill style={{background: colors.cream}}>
      {PROMO_CLIPS.map((c, i) => {
        const len = Math.round((c.to - c.from) * FPS);
        const start = at;
        at += len;
        const rel = (t: number) => Math.round((t - c.from) * FPS);
        return (
          <Sequence key={i} from={start} durationInFrames={len}>
            {c.file === 'features' ? <Features /> : <OffthreadVideo src={staticFile(c.file)} startFrom={Math.round(c.from * FPS)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />}
            {c.toyVoice && (
              <Sequence from={rel(c.toyVoice[0])} durationInFrames={rel(c.toyVoice[1]) - rel(c.toyVoice[0])} layout="none"><ToyVoiceTag /></Sequence>
            )}
            {c.says?.map((s, k) => (
              <Sequence key={k} from={rel(s.from)} durationInFrames={rel(s.to) - rel(s.from)} layout="none">
                <SpeechBubble speech={{who: s.who, text: s.text}} layout={layout} top={s.top} />
              </Sequence>
            ))}
            {c.endCard !== undefined && <Sequence from={rel(c.endCard)} layout="none"><EndCard /></Sequence>}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};
