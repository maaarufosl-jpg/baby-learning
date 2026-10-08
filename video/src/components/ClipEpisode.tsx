import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {EP01_OVERLAYS, ep01Clips, EP01_SCENE_COUNT, type ClipOverlay} from '../episodes/ep01-clips';
import {ep01} from '../episodes/ep01';
import {getLayout} from '../layout';
import {colors} from '../theme';
import {toBn} from './Episode';
import {DuaPanel, Footnote, SilencePrompt, Star, TEXT_FONT, Title} from './Overlays';

const PLACEHOLDER_SECONDS = 3;

/** Scenes in order, with their clip (or a placeholder length when the clip has not arrived yet). */
export const clipScenes = (fps: number) =>
  Array.from({length: EP01_SCENE_COUNT}, (_, i) => {
    const n = i + 1;
    const clip = ep01Clips[String(n)];
    return {n, clip, frames: Math.round((clip?.seconds ?? PLACEHOLDER_SECONDS) * fps)};
  });

export const clipEpisodeFrames = (fps: number) => clipScenes(fps).reduce((s, c) => s + c.frames, 0);

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
      <DuaPanel dua={ep01.dua} display={{mode: 'full', highlightPart: active >= 0 ? active : undefined}} layout={layout} beatFrames={frames} hasSpeech={false} animateIn />
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
        <Window frames={frames} to={0.85}>
          <Title layout={layout} episodeLabel={`পর্ব ${toBn(ep01.number)} · ${ep01.title}`} />
        </Window>
      );
    case 'dua':
      return (
        <Window frames={frames} from={o.from} to={o.to}>
          <DuaPanel
            dua={ep01.dua}
            display={{mode: o.mode, showMeaning: o.showMeaning}}
            layout={layout}
            beatFrames={Math.round(((o.to ?? 1) - (o.from ?? 0)) * frames)}
            hasSpeech={false}
            animateIn={o.mode === 'broken' || o.from === undefined}
          />
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

const Scene: React.FC<{n: number; file?: string; frames: number; first: boolean; last: boolean}> = ({n, file, frames, first, last}) => {
  const frame = useCurrentFrame();
  const fadeIn = first ? interpolate(frame, [0, 12], [1, 0], {extrapolateRight: 'clamp'}) : 0;
  const fadeOut = last ? interpolate(frame, [frames - 20, frames], [0, 1], {extrapolateLeft: 'clamp'}) : 0;
  return (
    <AbsoluteFill style={{background: colors.cream}}>
      {file ? <OffthreadVideo src={staticFile(file)} style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : <Placeholder n={n} />}
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
  let from = 0;
  return (
    <AbsoluteFill style={{background: colors.cream}}>
      {scenes.map((s, i) => {
        const seq = (
          <Sequence key={s.n} from={from} durationInFrames={s.frames} name={`দৃশ্য ${s.n}`}>
            <Scene n={s.n} file={s.clip?.file} frames={s.frames} first={i === 0} last={i === scenes.length - 1} />
          </Sequence>
        );
        from += s.frames;
        return seq;
      })}
    </AbsoluteFill>
  );
};
