import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ACTIVE_BRAND as B, toBn} from '../brand';
import {END_CARD_SECONDS, SCENE_SECONDS} from '../data/builders';
import type {Card, Line, Reel} from '../data/types';
import {ARABIC_FONT, BENGALI_FONT} from '../fonts';
import mediaJson from '../media.json';
import {LogoMark} from './Logo';
import {Nature} from './Nature';
import {SCENES} from '../data/scenes';

type Media = {
  clips?: Record<string, {file: string; seconds: number}>;
  voice?: Record<string, {file: string; seconds: number}>;
  arabic?: {file: string; seconds: number};
};
const MEDIA = mediaJson as Record<string, Media>;

/** Scenes overlap by this much so each clip fades into the next. */
const CROSSFADE = 0.6;
export const REEL_SECONDS = 3 * SCENE_SECONDS;

const BN = `'${BENGALI_FONT}', '${ARABIC_FONT}', sans-serif`;
const AR = `'${ARABIC_FONT}', serif`;
const SHADOW = '0 2px 18px rgba(0,0,0,0.6), 0 0 4px rgba(0,0,0,0.35)';

const arabicSize = (t: string) => (t.length <= 24 ? 112 : t.length <= 44 ? 92 : 76);

const lineStyle = (l: Line): React.CSSProperties => {
  switch (l.style) {
    case 'kicker':
      return {fontFamily: BN, fontWeight: 600, fontSize: 54, color: B.colors.accent, letterSpacing: 1};
    case 'arabicXL':
      return {fontFamily: AR, fontWeight: 700, fontSize: l.text.length > 10 ? 150 : 200, color: B.colors.accent, direction: 'rtl', lineHeight: 1.6};
    case 'arabic':
      return {fontFamily: AR, fontWeight: 700, fontSize: arabicSize(l.text), color: B.colors.accent, direction: 'rtl', lineHeight: 1.75};
    case 'title':
      return {fontFamily: BN, fontWeight: 700, fontSize: 92, color: B.colors.text, lineHeight: 1.25};
    case 'body':
      return {fontFamily: BN, fontWeight: 600, fontSize: 64, color: B.colors.text, lineHeight: 1.4};
    case 'note':
      return {fontFamily: BN, fontWeight: 400, fontSize: 44, color: B.colors.soft, lineHeight: 1.4};
    case 'source':
      return {
        fontFamily: BN,
        fontWeight: 600,
        fontSize: 42,
        color: B.colors.accent,
        border: `2px solid ${B.colors.accent}88`,
        borderRadius: 999,
        padding: '8px 30px',
        background: 'rgba(0,0,0,0.25)',
      };
  }
};

const CardView: React.FC<{card: Card}> = ({card}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const len = (card.to - card.from) * fps;
  const out = interpolate(frame, [len - 0.45 * fps, len], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 80px 240px', opacity: out}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center', maxWidth: 920}}>
        {card.lines.map((l, i) => {
          const start = ((l.at ?? card.from) - card.from) * fps;
          const t = interpolate(frame, [start, start + 0.55 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div key={i} style={{...lineStyle(l), textShadow: SHADOW, opacity: t, transform: `translateY(${(1 - t) * 26}px)`}}>
              {l.text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** Ambience for a drawn scene, fading in and out with the crossfade and dipping under the voice. */
const Ambience: React.FC<{sound: string; offset: number; duckAt: (sec: number) => boolean; first: boolean; last: boolean}> = ({sound, offset, duckAt, first, last}) => {
  const {fps} = useVideoConfig();
  const len = SCENE_SECONDS * fps;
  const fade = CROSSFADE * fps;
  return (
    <Html5Audio
      src={staticFile(`sfx/${sound}.mp3`)}
      volume={(f) => {
        const env = Math.min(first ? 1 : f / fade, last ? 1 : (len - f) / fade, 1);
        return Math.max(0, env) * (duckAt(offset + f / fps) ? 0.22 : 0.8);
      }}
    />
  );
};

const SceneLayer: React.FC<{reel: Reel; i: number; media: Media; duckAt: (sec: number) => boolean}> = ({reel, i, media, duckAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scene = reel.scenes[i];
  const clip = media.clips?.[String(i + 1)];
  const offset = i * (SCENE_SECONDS - CROSSFADE);
  const fadeIn = i === 0 ? 1 : interpolate(frame, [0, CROSSFADE * fps], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: fadeIn, background: `linear-gradient(180deg, ${scene.tint[0]}, ${scene.tint[1]})`}}>
      {clip ? (
        <OffthreadVideo
          src={staticFile(clip.file)}
          volume={(f) => (duckAt(offset + f / fps) ? 0.22 : 0.7)}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      ) : (
        <>
          <Nature scene={SCENES[scene.art]} seconds={SCENE_SECONDS} />
          <Ambience sound={scene.sound} offset={offset} duckAt={duckAt} first={i === 0} last={i === reel.scenes.length - 1} />
        </>
      )}
    </AbsoluteFill>
  );
};

const Header: React.FC = () => (
  <div style={{position: 'absolute', top: 120, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: 0.92}}>
    <LogoMark brand={B} size={64} />
    <span style={{fontFamily: BN, fontWeight: 700, fontSize: 44, color: B.colors.text, textShadow: SHADOW}}>{B.name}</span>
  </div>
);

const EndCard: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const bg = interpolate(frame, [0, 0.5 * fps], [0, 1], {extrapolateRight: 'clamp'});
  const draw = interpolate(frame, [0.2 * fps, 1.3 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const text = interpolate(frame, [0.6 * fps, 1.1 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: B.colors.deep, opacity: bg, alignItems: 'center', justifyContent: 'center', paddingBottom: 200}}>
      <LogoMark brand={B} size={300} draw={draw} />
      <div style={{opacity: text, textAlign: 'center', marginTop: 30}}>
        <div style={{fontFamily: BN, fontWeight: 700, fontSize: 120, color: B.colors.text}}>{B.name}</div>
        <div style={{fontFamily: BN, fontSize: 50, color: B.colors.accent, marginTop: 6}}>{B.tagline}</div>
        <div style={{fontFamily: BN, fontSize: 40, color: B.colors.soft, marginTop: 40}}>পরের রিল দেখতে ফলো করুন</div>
      </div>
    </AbsoluteFill>
  );
};

/** One vertical reel: three nature clips under a soft dark layer, timed text cards, Bengali narration and the end card. */
export const ReelVideo: React.FC<{reel: Reel}> = ({reel}) => {
  const {fps} = useVideoConfig();
  const media = MEDIA[reel.id] ?? {};
  const voices = reel.narration.map((n, i) => ({...n, clip: media.voice?.[String(i + 1)]}));
  const windows: [number, number][] = voices.filter((v) => v.clip).map((v) => [v.at - 0.2, v.at + v.clip!.seconds + 0.2]);
  if (media.arabic && reel.arabicVoice) windows.push([reel.arabicVoice.at - 0.2, reel.arabicVoice.at + media.arabic.seconds + 0.2]);
  const duckAt = (sec: number) => windows.some(([a, b]) => sec >= a && sec <= b);
  const sceneFrames = Math.round(SCENE_SECONDS * fps);
  const endFrom = Math.round((REEL_SECONDS - END_CARD_SECONDS) * fps);
  return (
    <AbsoluteFill style={{background: B.colors.deep}}>
      {reel.scenes.map((_, i) => (
        <Sequence key={i} from={Math.round(i * (SCENE_SECONDS - CROSSFADE) * fps)} durationInFrames={sceneFrames} name={`দৃশ্য ${i + 1}`}>
          <SceneLayer reel={reel} i={i} media={media} duckAt={duckAt} />
        </Sequence>
      ))}
      {/* soft dark layer so text stays readable on any footage; darkest in the middle band where text sits */}
      <AbsoluteFill
        style={{
          background:
            'linear-gradient(180deg, rgba(6,16,12,0.35) 0%, rgba(6,16,12,0.42) 22%, rgba(6,16,12,0.58) 45%, rgba(6,16,12,0.5) 70%, rgba(6,16,12,0.3) 100%)',
        }}
      />
      <Sequence durationInFrames={endFrom} layout="none">
        <Header />
      </Sequence>
      {reel.cards.map((c, i) => (
        <Sequence key={i} from={Math.round(c.from * fps)} durationInFrames={Math.round((c.to - c.from) * fps)} name={`লেখা ${i + 1}`}>
          <CardView card={c} />
        </Sequence>
      ))}
      {voices.map((v, i) =>
        v.clip ? (
          <Sequence key={i} from={Math.round(v.at * fps)} layout="none" name={`কণ্ঠ ${i + 1}`}>
            <Html5Audio src={staticFile(v.clip.file)} />
          </Sequence>
        ) : null,
      )}
      {media.arabic && reel.arabicVoice && (
        <Sequence from={Math.round(reel.arabicVoice.at * fps)} layout="none" name="আরবি কণ্ঠ">
          <Html5Audio src={staticFile(media.arabic.file)} />
        </Sequence>
      )}
      <Sequence from={endFrom} name="শেষ কার্ড">
        <EndCard />
      </Sequence>
    </AbsoluteFill>
  );
};
