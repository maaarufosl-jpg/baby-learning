import React from 'react';
import {AbsoluteFill, Html5Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {EP01_FALLBACK_IMAGE, EP01_IMAGE_MOVE, EP01_IMAGE_SECONDS, EP01_OVERLAYS, ep01Clips, EP01_SCENE_COUNT, type ClipOverlay, type SceneMedia} from '../episodes/ep01-clips';
import {ep01} from '../episodes/ep01';
import {getLayout} from '../layout';
import {colors} from '../theme';
import {toBn} from './Episode';
import {DuaPanel, Footnote, QuestionMark, SilencePrompt, SpeechBubble, Star, TEXT_FONT, Title} from './Overlays';

const PLACEHOLDER_SECONDS = 3;
const INTRO_SECONDS = 3.5;

/** Dua panels over full-frame artwork are drawn smaller and higher so they don't cover the characters' faces. */
const Compact: React.FC<{children: React.ReactNode; align?: 'center' | 'right'}> = ({children, align = 'center'}) => (
  <AbsoluteFill
    style={{
      transform: align === 'right' ? 'translate(-40px, -72px) scale(0.6)' : 'translateY(-72px) scale(0.62)',
      transformOrigin: align === 'right' ? '100% 0%' : '50% 0%',
    }}
  >
    {children}
  </AbsoluteFill>
);

/** Scenes in order: own video clip, own image, a borrowed image, or a placeholder. */
export const clipScenes = (fps: number) =>
  Array.from({length: EP01_SCENE_COUNT}, (_, i) => {
    const n = i + 1;
    const own = ep01Clips[String(n)];
    const borrowed = !own && EP01_FALLBACK_IMAGE[n] ? ep01Clips[String(EP01_FALLBACK_IMAGE[n])] : undefined;
    const media: SceneMedia | undefined = own ?? (borrowed?.image ? {image: borrowed.image} : undefined);
    const seconds = media?.file ? media.seconds ?? PLACEHOLDER_SECONDS : EP01_IMAGE_SECONDS[n] ?? PLACEHOLDER_SECONDS;
    return {n, media, frames: Math.round(seconds * fps)};
  });

export const clipEpisodeFrames = (fps: number) => Math.round(INTRO_SECONDS * fps) + clipScenes(fps).reduce((s, c) => s + c.frames, 0);

/** Opening card: series logo and episode name above the four characters. */
const IntroCard: React.FC<{frames: number}> = ({frames}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const layout = getLayout(width, height);
  const fadeOut = interpolate(frame, [frames - 10, frames], [0, 1], {extrapolateLeft: 'clamp'});
  const rise = interpolate(frame, [0, 24], [40, 0], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${colors.sky} 0%, ${colors.cream} 60%)`}}>
      <Img src={staticFile('thumb/lineup.jpg')} style={{position: 'absolute', left: '50%', bottom: 0, width: 1500, transform: `translate(-50%, ${rise}px)`, borderRadius: '48px 48px 0 0'}} />
      <Title layout={{...layout, titleTop: 60}} episodeLabel={`পর্ব ${toBn(ep01.number)} · ${ep01.title}`} />
      {fadeOut > 0 && <AbsoluteFill style={{background: colors.cream, opacity: fadeOut}} />}
    </AbsoluteFill>
  );
};

const Window: React.FC<{frames: number; from?: number; to?: number; children: React.ReactNode}> = ({frames, from = 0, to = 1, children}) => {
  const start = Math.round(from * frames);
  const end = Math.round(to * frames);
  return (
    <Sequence from={start} durationInFrames={Math.max(1, end - start)} layout="none">
      {children}
    </Sequence>
  );
};

const RepeatOverlay: React.FC<{frames: number; parts: [number, number, number]}> = ({frames, parts}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const layout = getLayout(width, height);
  const starts = parts.map((p) => Math.round(p * frames));
  const active = starts.reduce((acc, s, i) => (frame >= s ? i : acc), -1);
  const nextStart = active >= 0 ? starts[active + 1] ?? frames : starts[0];
  const inSilence = active >= 0 && frame > starts[active] + 20 && frame < nextStart;
  return (
    <>
      <Compact>
        <DuaPanel dua={ep01.dua} display={{mode: 'full', highlightPart: active >= 0 ? active : undefined}} layout={layout} beatFrames={frames} hasSpeech={false} animateIn />
      </Compact>
      {inSilence && (
        <Sequence from={starts[active] + 20} layout="none">
          <SilencePrompt layout={layout} beatFrames={Math.max(30, nextStart - starts[active] - 20)} />
        </Sequence>
      )}
    </>
  );
};

const Overlay: React.FC<{o: ClipOverlay; frames: number}> = ({o, frames}) => {
  const {width, height} = useVideoConfig();
  const layout = getLayout(width, height);
  switch (o.type) {
    case 'title':
      return (
        <Window frames={frames} to={o.to ?? 0.85}>
          <Title layout={layout} episodeLabel={`পর্ব ${toBn(ep01.number)} · ${ep01.title}`} />
        </Window>
      );
    case 'dua':
      return (
        <Window frames={frames} from={o.from} to={o.to}>
          <Compact align={o.align}>
            <DuaPanel
              dua={ep01.dua}
              display={{mode: o.mode, showMeaning: o.showMeaning}}
              layout={layout}
              beatFrames={Math.round(((o.to ?? 1) - (o.from ?? 0)) * frames)}
              hasSpeech={false}
              animateIn={o.pop ?? (o.from ?? 0) < 0.1}
            />
          </Compact>
        </Window>
      );
    case 'repeat':
      return <RepeatOverlay frames={frames} parts={o.parts} />;
    case 'star':
      return (
        <Window frames={frames} from={o.at} to={Math.min(1, o.at + 0.35)}>
          <Star layout={layout} />
          <Html5Audio src={staticFile('sfx/ting.wav')} />
        </Window>
      );
    case 'footnote':
      return <Footnote text={o.text} layout={layout} />;
    case 'question':
      return (
        <Window frames={frames} from={o.from}>
          <QuestionMark layout={{...layout, questionX: o.x ?? layout.questionX, questionY: o.y ?? layout.questionY}} />
          <Html5Audio src={staticFile('sfx/pop.wav')} />
        </Window>
      );
    case 'say':
      return (
        <Window frames={frames} from={o.from} to={o.to}>
          <SpeechBubble speech={{who: o.who, text: o.text, label: o.label}} layout={layout} top={o.top} />
        </Window>
      );
    case 'card':
      return (
        <Window frames={frames} from={o.from}>
          <DuaPanel dua={ep01.dua} display={{mode: 'card'}} layout={layout} beatFrames={frames} hasSpeech={false} animateIn />
        </Window>
      );
  }
};

const Placeholder: React.FC<{n: number}> = ({n}) => (
  <AbsoluteFill style={{background: colors.sage, alignItems: 'center', justifyContent: 'center'}}>
    <div style={{fontFamily: TEXT_FONT, fontWeight: 700, fontSize: 90, color: colors.ink}}>দৃশ্য {toBn(n)}</div>
    <div style={{fontFamily: TEXT_FONT, fontSize: 48, color: colors.inkSoft, marginTop: 20}}>ক্লিপ এখনো যোগ হয়নি</div>
  </AbsoluteFill>
);

const StillImage: React.FC<{n: number; src: string; frames: number}> = ({n, src, frames}) => {
  const frame = useCurrentFrame();
  const move = EP01_IMAGE_MOVE[n] ?? {to: 1.07, origin: [n % 2 ? 40 : 60, 45] as [number, number]};
  const t = interpolate(frame, [0, frames], [0, 1], {extrapolateRight: 'clamp'});
  const eased = t * t * (3 - 2 * t);
  const scale = 1 + (move.to - 1) * eased;
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Img
        src={staticFile(src)}
        style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${scale})`, transformOrigin: `${move.origin[0]}% ${move.origin[1]}%`}}
      />
    </AbsoluteFill>
  );
};

const Scene: React.FC<{n: number; media?: SceneMedia; frames: number; first: boolean; last: boolean}> = ({n, media, frames, first, last}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, first ? 12 : 8], [first ? 1 : 0.6, 0], {extrapolateRight: 'clamp'});
  const fadeOut = last ? interpolate(frame, [frames - 20, frames], [0, 1], {extrapolateLeft: 'clamp'}) : 0;
  return (
    <AbsoluteFill style={{background: colors.cream}}>
      {media?.file ? (
        <OffthreadVideo src={staticFile(media.file)} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      ) : media?.image ? (
        <StillImage n={n} src={media.image} frames={frames} />
      ) : (
        <Placeholder n={n} />
      )}
      {(EP01_OVERLAYS[n] ?? []).map((o, i) => (
        <Overlay key={i} o={o} frames={frames} />
      ))}
      {fadeIn > 0 && <AbsoluteFill style={{background: colors.cream, opacity: fadeIn}} />}
      {fadeOut > 0 && <AbsoluteFill style={{background: colors.cream, opacity: fadeOut}} />}
    </AbsoluteFill>
  );
};

/** Episode 1 assembled from AI-generated scene clips, with title, dua panels, repeat prompt and end card on top. */
export const ClipEpisode: React.FC = () => {
  const {fps} = useVideoConfig();
  const scenes = clipScenes(fps);
  const introFrames = Math.round(INTRO_SECONDS * fps);
  let from = introFrames;
  return (
    <AbsoluteFill style={{background: colors.cream}}>
      <Sequence durationInFrames={introFrames} name="পরিচিতি">
        <IntroCard frames={introFrames} />
      </Sequence>
      {scenes.map((s, i) => {
        const seq = (
          <Sequence key={s.n} from={from} durationInFrames={s.frames} name={`দৃশ্য ${s.n}`}>
            <Scene n={s.n} media={s.media} frames={s.frames} first={false} last={i === scenes.length - 1} />
          </Sequence>
        );
        from += s.frames;
        return seq;
      })}
    </AbsoluteFill>
  );
};
