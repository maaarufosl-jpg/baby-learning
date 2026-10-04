import React from 'react';
import {AbsoluteFill, Html5Audio, interpolate, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {getLayout, type Layout} from '../layout';
import {colors} from '../theme';
import type {Beat, Episode as EpisodeData} from '../types';
import {BackgroundBack, BackgroundFront, KITCHEN} from './Backgrounds';
import {Character, STAGE_H, STAGE_W} from './Characters';
import {DuaPanel, Footnote, QuestionMark, RightHand, SilencePrompt, SpeechBubble, Star, Title} from './Overlays';

export const beatsFor = (episode: EpisodeData, shorts: boolean) => (shorts ? episode.beats.filter((b) => b.shorts) : episode.beats);

export const beatFrames = (beat: Beat, fps: number) => Math.round(beat.seconds * fps);

export const episodeFrames = (episode: EpisodeData, shorts: boolean, fps: number) =>
  beatsFor(episode, shorts).reduce((sum, b) => sum + beatFrames(b, fps), 0);

const PlateGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 0.55 + 0.35 * Math.sin(frame * 0.2);
  const x = KITCHEN.umayerPlateX * STAGE_W;
  return (
    <svg width={STAGE_W} height={STAGE_H} style={{position: 'absolute', inset: 0}}>
      <ellipse cx={x} cy={KITCHEN.tableTop + 14} rx={155} ry={44} fill="none" stroke={colors.gold} strokeWidth={10} opacity={pulse} />
      <ellipse cx={x} cy={KITCHEN.tableTop + 28} rx={95} ry={14} fill={colors.gold} opacity={pulse * 0.8} />
      <path d={`M ${x} ${KITCHEN.tableTop + 120 + Math.sin(frame * 0.25) * 8} l -26 34 h 16 v 30 h 20 v -30 h 16 z`} fill={colors.gold} stroke={colors.white} strokeWidth={4} />
    </svg>
  );
};

const Stage: React.FC<{beat: Beat; prev?: Beat; layout: Layout; blur: boolean; blurIn: boolean}> = ({beat, prev, layout, blur, blurIn}) => {
  const frame = useCurrentFrame();
  const blurAmount = blur ? (blurIn ? interpolate(frame, [0, 10], [0, 7], {extrapolateRight: 'clamp'}) : 7) : 0;
  const speaker = beat.speech?.who;
  return (
    <div
      style={{
        position: 'absolute',
        left: layout.stageLeft,
        top: layout.stageTop,
        width: STAGE_W,
        height: STAGE_H,
        transform: `scale(${layout.stageScale})`,
        transformOrigin: '0 0',
        overflow: 'hidden',
        filter: blurAmount > 0 ? `blur(${blurAmount}px) saturate(0.85)` : undefined,
      }}
    >
      <BackgroundBack id={beat.background} />
      {(beat.characters ?? []).map((c, i) => {
        const sameScene = prev?.background === beat.background;
        const before = sameScene ? prev?.characters?.find((p) => p.id === c.id) : undefined;
        const talking = c.talking ?? (speaker === c.id || (speaker === 'everyone' && c.id !== 'miu'));
        return <Character key={c.id} placement={c} prev={before} index={i} talking={talking} />;
      })}
      <BackgroundFront id={beat.background} />
      {beat.props?.includes('plateGlow') && <PlateGlow />}
    </div>
  );
};

const BeatView: React.FC<{beat: Beat; prev?: Beat; episode: EpisodeData; frames: number; isLast: boolean}> = ({beat, prev, episode, frames, isLast}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const layout = getLayout(width, height);
  const sceneChanged = !prev || prev.background !== beat.background || prev.kind !== beat.kind;
  const fadeIn = sceneChanged ? interpolate(frame, [0, 10], [1, 0], {extrapolateRight: 'clamp'}) : 0;
  const fadeOut = isLast ? interpolate(frame, [frames - 20, frames], [0, 1], {extrapolateLeft: 'clamp'}) : 0;
  const blur = !layout.portrait && !!beat.dua && beat.kind === 'learn';
  const prevBlur = !!prev?.dua && prev.kind === 'learn';
  const duaAnimateIn = !prev?.dua || (prev.dua.mode !== beat.dua?.mode && (prev.dua.mode === 'card' || beat.dua?.mode === 'card'));

  return (
    <AbsoluteFill style={{background: layout.portrait ? colors.cream : undefined}}>
      {layout.portrait && <PortraitBackdrop />}
      <Stage beat={beat} prev={prev} layout={layout} blur={blur} blurIn={blur && !prevBlur} />
      {beat.kind === 'intro' && !prev && <Title layout={layout} episodeLabel={`পর্ব ${toBn(episode.number)} · ${episode.title}`} />}
      {beat.speech && (
        <SpeechBubble speech={beat.speech} layout={layout} top={beat.kind === 'intro' && !prev ? layout.titleTop + (layout.portrait ? 300 : 300) : undefined} />
      )}
      {beat.dua && (
        <DuaPanel dua={episode.dua} display={beat.dua} layout={layout} beatFrames={frames} hasSpeech={!!beat.speech} animateIn={duaAnimateIn} />
      )}
      {beat.question && <QuestionMark layout={layout} />}
      {beat.props?.includes('rightHand') && <RightHand layout={layout} />}
      {beat.silence && <SilencePrompt layout={layout} beatFrames={frames} />}
      {beat.star && <Star layout={layout} />}
      {beat.footnote && <Footnote text={beat.footnote} layout={layout} />}
      {beat.star && <Html5Audio src={staticFile('sfx/ting.wav')} />}
      {beat.question && <Html5Audio src={staticFile('sfx/pop.wav')} />}
      {beat.audio && <Html5Audio src={staticFile(beat.audio)} />}
      {fadeIn > 0 && <AbsoluteFill style={{background: colors.cream, opacity: fadeIn}} />}
      {fadeOut > 0 && <AbsoluteFill style={{background: colors.cream, opacity: fadeOut}} />}
    </AbsoluteFill>
  );
};

const PortraitBackdrop: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${colors.sky} 0%, ${colors.cream} 70%)`}}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: 120 + i * 360 + Math.sin(frame * 0.02 + i) * 30,
            top: 1000 + i * 40,
            width: 160,
            height: 160,
            borderRadius: 999,
            background: i % 2 ? colors.peach : colors.white,
            opacity: 0.5,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
export const toBn = (n: number) => String(n).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

export const EpisodeVideo: React.FC<{episode: EpisodeData; shorts: boolean}> = ({episode, shorts}) => {
  const {fps} = useVideoConfig();
  const beats = beatsFor(episode, shorts);
  let from = 0;
  return (
    <AbsoluteFill style={{background: colors.cream}}>
      {beats.map((beat, i) => {
        const frames = beatFrames(beat, fps);
        const seq = (
          <Sequence key={i} from={from} durationInFrames={frames} name={`${i + 1}. ${beat.kind}${beat.speech ? ': ' + beat.speech.text.slice(0, 24) : ''}`}>
            <BeatView beat={beat} prev={beats[i - 1]} episode={episode} frames={frames} isLast={i === beats.length - 1} />
          </Sequence>
        );
        from += frames;
        return seq;
      })}
    </AbsoluteFill>
  );
};

/** A short reel of selected moments, used to review motion before rendering the full episode. */
export const PreviewReel: React.FC<{episode: EpisodeData; clips: {start: number; seconds: number}[]}> = ({episode, clips}) => {
  const {fps} = useVideoConfig();
  let from = 0;
  return (
    <AbsoluteFill>
      {clips.map((c, i) => {
        const len = Math.round(c.seconds * fps);
        const seq = (
          <Sequence key={i} from={from} durationInFrames={len}>
            <Sequence from={-Math.round(c.start * fps)}>
              <EpisodeVideo episode={episode} shorts={false} />
            </Sequence>
          </Sequence>
        );
        from += len;
        return seq;
      })}
    </AbsoluteFill>
  );
};
