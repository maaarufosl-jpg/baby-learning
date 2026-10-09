import React from 'react';
import {AbsoluteFill, Html5Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ep01} from '../episodes/ep01';
import {getLayout, type Layout} from '../layout';
import {colors} from '../theme';
import type {CharacterId} from '../types';
import {DuaPanel, SilencePrompt, SpeechBubble, Star, TEXT_FONT} from './Overlays';

/*
 * Vertical 9:16 Shorts / Reels cut from the Gemini scene clips:
 * a question title at the top, the clip across the middle, and teaching overlays below it.
 * All times in a segment are seconds from the start of that segment.
 */
type Who = CharacterId | 'narrator' | 'everyone';
type ShortOverlay =
  | {type: 'say'; who: Who; text: string; from: number; to: number; label?: string}
  | {type: 'dua'; mode: 'full' | 'broken'; from: number; to: number; showMeaning?: boolean}
  | {type: 'repeat'; parts: number[]; until: number}
  | {type: 'star'; at: number}
  | {type: 'think'; from: number; to: number}
  | {type: 'card'; from: number};

type Segment = {
  /** Video under public/, or a still image for a freeze frame. */
  video?: string;
  image?: string;
  start?: number;
  end?: number;
  seconds?: number;
  voices?: {audio: string; at: number; seconds: number}[];
  overlays?: ShortOverlay[];
};

export type ShortSpec = {title: string; segments: Segment[]};

const FPS = 30;
const VIDEO_TOP = 380;
const VIDEO_H = 608;
const BELOW = VIDEO_TOP + VIDEO_H + 50;

const segSeconds = (s: Segment) => (s.video ? (s.end ?? 10) - (s.start ?? 0) : s.seconds ?? 3);
export const shortFrames = (spec: ShortSpec) => spec.segments.reduce((n, s) => n + Math.round(segSeconds(s) * FPS), 0);

const shortLayout = (base: Layout): Layout => ({
  ...base,
  duaTop: BELOW,
  duaTopNoSpeech: BELOW,
  duaW: 1000,
  cardCenterX: 540,
  cardTop: BELOW,
  cardW: 980,
  silenceY: 1720,
  starX: 930,
  starY: VIDEO_TOP + 110,
});

const At: React.FC<{from: number; to?: number; children: React.ReactNode}> = ({from, to, children}) => (
  <Sequence from={Math.round(from * FPS)} durationInFrames={to === undefined ? undefined : Math.max(1, Math.round((to - from) * FPS))} layout="none">
    {children}
  </Sequence>
);

const RepeatPanel: React.FC<{parts: number[]; until: number; layout: Layout}> = ({parts, until, layout}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const active = parts.reduce((acc, p, i) => (t >= p ? i : acc), -1);
  const last = parts[parts.length - 1];
  return (
    <>
      <DuaPanel dua={ep01.dua} display={{mode: 'full', highlightPart: active >= 0 ? active : undefined}} layout={layout} beatFrames={90} hasSpeech={false} animateIn />
      {t > last + 0.7 && t < until && (
        <At from={0}>
          <SilencePrompt layout={layout} beatFrames={Math.round((until - last - 0.7) * FPS)} />
        </At>
      )}
    </>
  );
};

const SegmentView: React.FC<{seg: Segment; frames: number}> = ({seg, frames}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const layout = shortLayout(getLayout(width, height));
  const voices = seg.voices ?? [];
  const ducked = (f: number) => (voices.some((v) => f >= v.at * FPS - 6 && f <= (v.at + v.seconds) * FPS + 6) ? 0.25 : 1);
  const fade = interpolate(frame, [0, 6], [0.5, 0], {extrapolateRight: 'clamp'});
  const zoom = seg.image ? 1 + 0.06 * interpolate(frame, [0, frames], [0, 1]) : 1;
  return (
    <AbsoluteFill>
      <div style={{position: 'absolute', left: 0, top: VIDEO_TOP, width: 1080, height: VIDEO_H, overflow: 'hidden', boxShadow: '0 18px 0 rgba(59,58,74,0.10)'}}>
        {seg.video ? (
          <OffthreadVideo
            src={staticFile(seg.video)}
            startFrom={Math.round((seg.start ?? 0) * FPS)}
            endAt={Math.round((seg.end ?? 10) * FPS)}
            volume={ducked}
            style={{width: '100%', height: '100%', objectFit: 'cover'}}
          />
        ) : (
          <Img src={staticFile(seg.image!)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${zoom})`}} />
        )}
        {fade > 0 && <AbsoluteFill style={{background: colors.cream, opacity: fade}} />}
      </div>
      {voices.map((v, i) => (
        <At key={i} from={v.at}>
          <Html5Audio src={staticFile(v.audio)} />
        </At>
      ))}
      {(seg.overlays ?? []).map((o, i) => {
        switch (o.type) {
          case 'say':
            return (
              <At key={i} from={o.from} to={o.to}>
                <SpeechBubble speech={{who: o.who, text: o.text, label: o.label}} layout={layout} top={BELOW + 30} />
              </At>
            );
          case 'dua':
            return (
              <At key={i} from={o.from} to={o.to}>
                <DuaPanel dua={ep01.dua} display={{mode: o.mode, showMeaning: o.showMeaning}} layout={layout} beatFrames={Math.round((o.to - o.from) * FPS)} hasSpeech={false} animateIn={o.from < 0.5} />
              </At>
            );
          case 'repeat':
            return <RepeatPanel key={i} parts={o.parts} until={o.until} layout={layout} />;
          case 'star':
            return (
              <At key={i} from={o.at} to={o.at + 3}>
                <Star layout={layout} />
                <Html5Audio src={staticFile('sfx/ting.wav')} />
              </At>
            );
          case 'think':
            return (
              <At key={i} from={o.from} to={o.to}>
                <SpeechBubble speech={{who: 'narrator', label: 'তুমি বলো তো', text: 'কোন হাতে খাই?'}} layout={layout} top={BELOW + 30} />
                <SilencePrompt layout={layout} beatFrames={Math.round((o.to - o.from) * FPS)} />
                <Html5Audio src={staticFile('sfx/pop.wav')} />
              </At>
            );
          case 'card':
            return (
              <At key={i} from={o.from}>
                <DuaPanel dua={ep01.dua} display={{mode: 'card'}} layout={layout} beatFrames={frames} hasSpeech={false} animateIn />
              </At>
            );
        }
      })}
    </AbsoluteFill>
  );
};

const Backdrop: React.FC = () => (
  <AbsoluteFill style={{background: 'radial-gradient(ellipse at 50% 40%, #DCEEDC 0%, #BFD4BF 80%)'}}>
    <svg width={1080} height={1920} style={{position: 'absolute', inset: 0}}>
      {[
        [120, 1180, 90],
        [940, 1300, 120],
        [200, 1700, 70],
        [880, 1820, 100],
        [980, 220, 80],
        [80, 300, 60],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#FFFBEA" opacity={0.3} />
      ))}
    </svg>
  </AbsoluteFill>
);

const Header: React.FC<{title: string}> = ({title}) => (
  <div style={{position: 'absolute', top: 70, left: 0, right: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18}}>
    <div style={{background: colors.sageDark, color: colors.white, fontFamily: TEXT_FONT, fontWeight: 700, fontSize: 40, padding: '6px 30px', borderRadius: 999}}>ছোট্ট মুমিন</div>
    <div
      style={{
        fontFamily: TEXT_FONT,
        fontWeight: 700,
        fontSize: 96,
        lineHeight: 1.15,
        textAlign: 'center',
        color: colors.ink,
        WebkitTextStroke: `6px ${colors.white}`,
        paintOrder: 'stroke fill',
        padding: '0 30px',
      }}
    >
      {title}
    </div>
  </div>
);

const Footer: React.FC = () => (
  <div style={{position: 'absolute', bottom: 60, left: 0, right: 0, textAlign: 'center', fontFamily: TEXT_FONT, fontWeight: 600, fontSize: 36, color: colors.ink, opacity: 0.75}}>
    পুরো গল্প দেখুন "ছোট্ট মুমিন" চ্যানেলে
  </div>
);

export const ShortVideo: React.FC<{spec: ShortSpec}> = ({spec}) => {
  let from = 0;
  return (
    <AbsoluteFill>
      <Backdrop />
      <Header title={spec.title} />
      {spec.segments.map((seg, i) => {
        const frames = Math.round(segSeconds(seg) * FPS);
        const el = (
          <Sequence key={i} from={from} durationInFrames={frames}>
            <SegmentView seg={seg} frames={frames} />
          </Sequence>
        );
        from += frames;
        return el;
      })}
      <Footer />
    </AbsoluteFill>
  );
};

const C = (n: string) => `clips/ep01/_ready/scene${n}.mp4`;

/** Short 1: the whole Bismillah lesson in about 45 seconds. */
export const SHORT_BISMILLAH: ShortSpec = {
  title: 'খাওয়ার আগে কী বলি?',
  segments: [
    {
      video: C('04'),
      start: 0,
      end: 10.1,
      voices: [
        {audio: 'audio/ep01/narration2a.wav', at: 0.8, seconds: 3.8},
        {audio: 'audio/ep01/narration2b.wav', at: 5.35, seconds: 3.0},
      ],
      overlays: [
        {type: 'say', who: 'narrator', text: 'এই রে! উমায়ের কিছু একটা ভুলে গেছে।', from: 0.6, to: 5.1},
        {type: 'say', who: 'narrator', text: 'তুমি কি বলতে পারো, কী ভুলে গেছে?', from: 5.1, to: 10.1},
      ],
    },
    {
      video: C('07'),
      start: 1.0,
      end: 10.1,
      overlays: [{type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ শিখিয়েছেন,\nখাওয়ার আগে বলতে হয়... বিসমিল্লাহ।', from: 0.2, to: 9.1}],
    },
    {
      video: C('08'),
      start: 0,
      end: 10.1,
      overlays: [
        {type: 'dua', mode: 'full', from: 0.2, to: 2.8},
        {type: 'dua', mode: 'broken', from: 2.8, to: 6.9},
        {type: 'dua', mode: 'full', from: 6.9, to: 10.1, showMeaning: true},
        {type: 'star', at: 7.4},
      ],
    },
    {
      video: C('11'),
      start: 1.3,
      end: 10.1,
      overlays: [
        {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0, to: 2.0},
        {type: 'repeat', parts: [2.1, 3.45, 4.75], until: 8.8},
      ],
    },
    {
      video: C('15'),
      start: 0.5,
      end: 7.0,
      overlays: [{type: 'card', from: 0.2}],
    },
  ],
};

/** Short 2: a quiz with a thinking pause before Umayer answers. */
export const SHORT_RIGHT_HAND: ShortSpec = {
  title: 'বলো তো, কোন হাতে খাই?',
  segments: [
    {
      video: C('09'),
      start: 0,
      end: 2.6,
      overlays: [{type: 'say', who: 'ammu', text: 'আর খাই কোন হাতে?', from: 0, to: 2.6}],
    },
    {image: 'shorts/quiz-freeze.jpg', seconds: 4, overlays: [{type: 'think', from: 0, to: 4}]},
    {
      video: C('09'),
      start: 2.65,
      end: 7.0,
      overlays: [
        {type: 'say', who: 'umayer', text: 'ডান হাতে!', from: 1.2, to: 4.35},
        {type: 'star', at: 1.5},
      ],
    },
    {
      video: C('10'),
      start: 0,
      end: 7.6,
      overlays: [
        {type: 'say', who: 'ammu', text: 'ঠিক! আর খাই নিজের সামনে থেকে।', from: 0.3, to: 4.0},
        {type: 'say', who: 'ammu', text: 'প্লেটের মাঝখান থেকে নয়।', from: 4.0, to: 7.6},
      ],
    },
    {
      video: C('13'),
      start: 0,
      end: 10.1,
      overlays: [
        {type: 'say', who: 'umayer', text: 'বিসমিল্লাহ!', from: 1.2, to: 3.2},
        {type: 'say', who: 'umayer', text: 'মমম! আজকে ভাত আরও মজা লাগছে!', from: 3.2, to: 6.9},
        {type: 'say', who: 'ammu', text: 'বরকত, সোনা। আল্লাহর নাম নিলে এমনই হয়।', from: 6.9, to: 10.1},
      ],
    },
  ],
};
