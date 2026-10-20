import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ACTIVE_BRAND as B, toBn} from '../brand';
import {THEMES, type Theme} from '../data/themes';
import {buildTimeline, CROSSFADE, type ReelMedia} from '../data/timeline';
import type {Card, Line, Reel} from '../data/types';
import {ARABIC_FONT, BENGALI_FONT} from '../fonts';
import mediaJson from '../media.json';
import {LogoMark} from './Logo';
import {Nature} from './Nature';
import {SCENES} from '../data/scenes';

const MEDIA = mediaJson as Record<string, ReelMedia>;
type Media = ReelMedia;

/** The reel laid out in time from its steps and the lengths of its recorded audio. */
export const reelTimeline = (reel: Reel) => buildTimeline(reel, MEDIA[reel.id]);

const BN = `'${BENGALI_FONT}', '${ARABIC_FONT}', sans-serif`;
const AR = `'${ARABIC_FONT}', serif`;
const SHADOW = '0 2px 18px rgba(0,0,0,0.6), 0 0 4px rgba(0,0,0,0.35)';

const arabicSize = (t: string) => (t.length <= 24 ? 112 : t.length <= 44 ? 92 : 76);

const lineStyle = (l: Line, T: Theme): React.CSSProperties => {
  switch (l.style) {
    case 'kicker':
      return {fontFamily: BN, fontWeight: 600, fontSize: 54, color: T.accent, letterSpacing: 1};
    case 'arabicXL':
      return {fontFamily: AR, fontWeight: 700, fontSize: l.text.length > 10 ? 150 : 200, color: T.accent, direction: 'rtl', lineHeight: 1.6};
    case 'arabic':
      return {fontFamily: AR, fontWeight: 700, fontSize: arabicSize(l.text), color: T.accent, direction: 'rtl', lineHeight: 1.75};
    case 'title':
      return {fontFamily: BN, fontWeight: 700, fontSize: 92, color: B.colors.text, lineHeight: 1.25};
    case 'body':
      return {fontFamily: BN, fontWeight: 600, fontSize: 64, color: B.colors.text, lineHeight: 1.4};
    case 'note':
      return {fontFamily: BN, fontWeight: 400, fontSize: 44, color: T.soft, lineHeight: 1.4};
    case 'source':
      return {
        fontFamily: BN,
        fontWeight: 600,
        fontSize: 42,
        color: T.accent,
        border: `2px solid ${T.accent}88`,
        borderRadius: 999,
        padding: '8px 30px',
        background: 'rgba(0,0,0,0.25)',
      };
  }
};

const CardView: React.FC<{card: Card; theme: Theme}> = ({card, theme}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const len = (card.to - card.from) * fps;
  const out = interpolate(frame, [len - 0.45 * fps, len], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', padding: '0 80px 240px', opacity: out}}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, textAlign: 'center', maxWidth: 920}}>
        {card.lines.map((l, i) => {
          const start = (l.at - card.from) * fps;
          const t = interpolate(frame, [start, start + 0.55 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
          return (
            <div key={i} style={{...lineStyle(l, theme), textShadow: SHADOW, opacity: t, transform: `translateY(${(1 - t) * 26}px)`}}>
              {l.text}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** Ambience for a drawn scene, fading in and out with the crossfade and dipping under the voice. */
const Ambience: React.FC<{sound: string; seconds: number; offset: number; duck: (sec: number) => number; first: boolean; last: boolean}> = ({sound, seconds, offset, duck, first, last}) => {
  const {fps} = useVideoConfig();
  const len = seconds * fps;
  const fade = CROSSFADE * fps;
  return (
    <Html5Audio
      src={staticFile(`sfx/${sound}.mp3`)}
      volume={(f) => {
        const env = Math.min(first ? 1 : f / fade, last ? 1 : (len - f) / fade, 1);
        return Math.max(0, env) * 0.8 * duck(offset + f / fps);
      }}
    />
  );
};

/** `need` is how long the scene must show footage (the end card covers the rest), so a slightly short clip is slowed to fit. */
const SceneLayer: React.FC<{reel: Reel; i: number; media: Media; seconds: number; need: number; duck: (sec: number) => number}> = ({reel, i, media, seconds, need, duck}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const scene = reel.scenes[i];
  const clip = media.clips?.[String(i + 1)];
  const offset = i * (seconds - CROSSFADE);
  const fadeIn = i === 0 ? 1 : interpolate(frame, [0, CROSSFADE * fps], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{opacity: fadeIn, background: `linear-gradient(180deg, ${scene.tint[0]}, ${scene.tint[1]})`}}>
      {clip ? (
        <OffthreadVideo
          src={staticFile(clip.file)}
          playbackRate={Math.min(1, Math.max(0.7, clip.seconds / need))}
          volume={(f) => 0.7 * duck(offset + f / fps)}
          style={{width: '100%', height: '100%', objectFit: 'cover'}}
        />
      ) : (
        <>
          <Nature scene={SCENES[scene.art]} seconds={seconds} />
          <Ambience sound={scene.sound} seconds={seconds} offset={offset} duck={duck} first={i === 0} last={i === reel.scenes.length - 1} />
        </>
      )}
    </AbsoluteFill>
  );
};

/** Credit shown while the qari's recitation plays. */
export const RECITER = 'তিলাওয়াত: শায়খ মিশারি রাশিদ আল-আফাসি';
const ReciterCredit: React.FC<{frames: number; theme: Theme}> = ({frames, theme}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const o = interpolate(frame, [0, 0.4 * fps, frames - 0.4 * fps, frames], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return (
    <div style={{position: 'absolute', top: 1330, width: '100%', textAlign: 'center', opacity: o}}>
      <span style={{fontFamily: BN, fontSize: 36, color: theme.soft, textShadow: SHADOW, background: 'rgba(0,0,0,0.25)', borderRadius: 999, padding: '8px 26px'}}>{RECITER}</span>
    </div>
  );
};

const Header: React.FC<{theme: Theme}> = ({theme}) => (
  <div style={{position: 'absolute', top: 120, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, opacity: 0.92}}>
    <LogoMark brand={{...B, colors: {...B.colors, accent: theme.accent}}} size={64} />
    <span style={{fontFamily: BN, fontWeight: 700, fontSize: 44, color: B.colors.text, textShadow: SHADOW}}>{B.name}</span>
  </div>
);

/** The scene fades softly to dark at the very end; there is no end card. */
const FadeOut: React.FC<{frames: number; theme: Theme}> = ({frames, theme}) => {
  const frame = useCurrentFrame();
  const o = interpolate(frame, [0, frames], [0, 1], {extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{background: `rgb(${theme.shade})`, opacity: o}} />;
};

/** One vertical reel: nature scenes under a soft dark layer, timed text cards, narration and recitation, fading out at the end. */
export const ReelVideo: React.FC<{reel: Reel}> = ({reel}) => {
  const {fps} = useVideoConfig();
  const media = MEDIA[reel.id] ?? {};
  const tl = buildTimeline(reel, media);
  const T = THEMES[reel.theme];
  const shade = (a: number) => `rgba(${T.shade},${a})`;
  // nature sound dips under the voice, and almost disappears under the recitation
  const duck = (sec: number) => {
    const s = tl.sounds.find((x) => x.file && sec >= x.at - 0.25 && sec <= x.at + x.seconds + 0.25);
    return s ? (s.arabic ? 0.12 : 0.28) : 1;
  };
  const sceneFrames = Math.round(tl.sceneSeconds * fps);
  const endFrom = Math.round(tl.endAt * fps);
  return (
    <AbsoluteFill style={{background: B.colors.deep}}>
      {reel.scenes.map((_, i) => (
        <Sequence key={i} from={Math.round(i * (tl.sceneSeconds - CROSSFADE) * fps)} durationInFrames={sceneFrames} name={`দৃশ্য ${i + 1}`}>
          <SceneLayer
            reel={reel}
            i={i}
            media={media}
            seconds={tl.sceneSeconds}
            need={i === reel.scenes.length - 1 ? Math.min(tl.sceneSeconds, tl.endAt + 0.6 - i * (tl.sceneSeconds - CROSSFADE)) : tl.sceneSeconds}
            duck={duck}
          />
        </Sequence>
      ))}
      {/* soft dark layer so text stays readable on any footage; darkest in the middle band where text sits */}
      <AbsoluteFill
        style={{
          background:
            `linear-gradient(180deg, ${shade(0.35)} 0%, ${shade(0.42)} 22%, ${shade(0.58)} 45%, ${shade(0.5)} 70%, ${shade(0.3)} 100%)`,
        }}
      />
      <Sequence layout="none">
        <Header theme={T} />
      </Sequence>
      {tl.cards.map((c, i) => (
        <Sequence key={i} from={Math.round(c.from * fps)} durationInFrames={Math.round((c.to - c.from) * fps)} name={`লেখা ${i + 1}`}>
          <CardView card={c} theme={T} />
        </Sequence>
      ))}
      {tl.sounds.map((s, i) =>
        s.file ? (
          <Sequence key={i} from={Math.round(s.at * fps)} layout="none" name={s.quran ? `তিলাওয়াত ${s.text}` : s.arabic ? 'হাদিসের আরবি' : `কণ্ঠ ${i + 1}`}>
            <Html5Audio src={staticFile(s.file)} />
          </Sequence>
        ) : null,
      )}
      {tl.sounds.map((s, i) =>
        s.quran && s.file ? (
          <Sequence key={`c${i}`} from={Math.round(s.at * fps)} durationInFrames={Math.round((s.seconds + 1) * fps)} layout="none" name="কারির নাম">
            <ReciterCredit frames={Math.round((s.seconds + 1) * fps)} theme={T} />
          </Sequence>
        ) : null,
      )}
      <Sequence from={endFrom} name="মিলিয়ে যাওয়া">
        <FadeOut frames={Math.round((tl.total - tl.endAt) * fps)} theme={T} />
      </Sequence>
    </AbsoluteFill>
  );
};
