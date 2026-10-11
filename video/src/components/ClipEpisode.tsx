import React, {createContext, useContext} from 'react';
import {AbsoluteFill, Html5Audio, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {EP01_CONFIG} from '../episodes/ep01-clips';
import type {ClipConfig, ClipOverlay, SceneMedia} from '../episodes/clip-types';
import {getLayout} from '../layout';
import {colors} from '../theme';
import {toBn} from './Episode';
import {DuaPanel, Footnote, QuestionMark, SilencePrompt, SpeechBubble, Star, TEXT_FONT, Title} from './Overlays';

const PLACEHOLDER_SECONDS = 3;

const Cfg = createContext<ClipConfig>(EP01_CONFIG);
const useCfg = () => useContext(Cfg);
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
export const clipScenes = (fps: number, cfg: ClipConfig = EP01_CONFIG) =>
  Array.from({length: cfg.sceneCount}, (_, i) => {
    const n = i + 1;
    const own = cfg.clips[String(n)] ?? cfg.borrowClip?.[n];
    const fb = cfg.fallbackImage?.[n];
    const borrowed = !own && fb ? cfg.clips[String(fb)] : undefined;
    const media: SceneMedia | undefined = own ?? (borrowed?.image ? {image: borrowed.image} : undefined);
    const seconds = media?.file ? media.seconds ?? PLACEHOLDER_SECONDS : cfg.imageSeconds?.[n] ?? PLACEHOLDER_SECONDS;
    const li = cfg.leadIn?.[n];
    const lead = media?.file && li ? Math.round(li.seconds * fps) : 0;
    return {n, media, lead, frames: lead + Math.round(seconds * fps)};
  });

export const clipEpisodeFrames = (fps: number, cfg: ClipConfig = EP01_CONFIG) => Math.round(INTRO_SECONDS * fps) + clipScenes(fps, cfg).reduce((s, c) => s + c.frames, 0);

/** Opening card: series logo and episode name above the four characters. */
const IntroCard: React.FC<{frames: number}> = ({frames}) => {
  const cfg = useCfg();
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const layout = getLayout(width, height);
  const fadeOut = interpolate(frame, [frames - 10, frames], [0, 1], {extrapolateLeft: 'clamp'});
  const rise = interpolate(frame, [0, 24], [40, 0], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: `linear-gradient(180deg, ${colors.sky} 0%, ${colors.cream} 60%)`}}>
      <Img src={staticFile('thumb/lineup.jpg')} style={{position: 'absolute', left: '50%', bottom: 0, width: 1500, transform: `translate(-50%, ${rise}px)`, borderRadius: '48px 48px 0 0'}} />
      <Title layout={{...layout, titleTop: 60}} episodeLabel={`পর্ব ${toBn(cfg.number)} · ${cfg.title}`} />
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

const RepeatOverlay: React.FC<{frames: number; parts: number[]; until?: number; align?: 'center' | 'right'}> = ({frames, parts, until = 1, align}) => {
  const cfg = useCfg();
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const layout = getLayout(width, height);
  const starts = parts.map((p) => Math.round(p * frames));
  const active = starts.reduce((acc, s, i) => (frame >= s ? i : acc), -1);
  const last = starts[starts.length - 1];
  const silenceFrom = last + 20;
  const silenceTo = Math.round(until * frames);
  // The panel arrives just before the first syllable, so an earlier speech bubble is not hidden behind it.
  if (frame < starts[0] - 8) return null;
  return (
    <>
      <Compact align={align}>
        <DuaPanel dua={cfg.dua} display={{mode: 'full', highlightPart: active >= 0 ? active : undefined}} layout={layout} beatFrames={frames} hasSpeech={false} animateIn />
      </Compact>
      {silenceTo > silenceFrom && (
        <Sequence from={silenceFrom} durationInFrames={silenceTo - silenceFrom} layout="none">
          <SilencePrompt layout={layout} beatFrames={silenceTo - silenceFrom} />
        </Sequence>
      )}
    </>
  );
};

/** Lights up one syllable after another at given moments (fractions of the scene). */
const TimedSyllables: React.FC<{frames: number; times: number[]; align?: 'center' | 'right'; pop: boolean}> = ({frames, times, align, pop}) => {
  const cfg = useCfg();
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const layout = getLayout(width, height);
  const starts = times.map((t) => Math.round(t * frames));
  const active = starts.reduce((acc, s, i) => (frame >= s ? i : acc), -1);
  return (
    <Compact align={align}>
      <DuaPanel dua={cfg.dua} display={{mode: 'full', highlightPart: active >= 0 ? active : undefined}} layout={layout} beatFrames={frames} hasSpeech={false} animateIn={pop} />
    </Compact>
  );
};

/** Small reminder of the previous episode's dua. */
const Recap: React.FC = () => {
  const cfg = useCfg();
  const frame = useCurrentFrame();
  if (!cfg.previousDua) return null;
  const pop = interpolate(frame, [0, 10], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <div
      style={{
        position: 'absolute',
        top: 40,
        left: 40,
        opacity: pop,
        transform: `translateY(${(1 - pop) * -20}px)`,
        background: colors.white,
        border: `6px solid ${colors.gold}`,
        borderRadius: 32,
        padding: '10px 30px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        boxShadow: '0 10px 0 rgba(59,58,74,0.10)',
      }}
    >
      <span style={{fontFamily: TEXT_FONT, fontWeight: 700, fontSize: 34, color: colors.inkSoft}}>গত পর্বের দোয়া</span>
      <span style={{fontFamily: "'Amiri', serif", fontWeight: 700, fontSize: 64, color: colors.ink, direction: 'rtl'}}>{cfg.previousDua.arabic}</span>
      <span style={{fontFamily: TEXT_FONT, fontWeight: 700, fontSize: 40, color: colors.peachDark}}>{cfg.previousDua.parts.join('-')}</span>
    </div>
  );
};

const Overlay: React.FC<{o: ClipOverlay; frames: number}> = ({o, frames}) => {
  const cfg = useCfg();
  const {width, height} = useVideoConfig();
  const layout = getLayout(width, height);
  switch (o.type) {
    case 'title':
      return (
        <Window frames={frames} to={o.to ?? 0.85}>
          <Title layout={layout} episodeLabel={`পর্ব ${toBn(cfg.number)} · ${cfg.title}`} />
        </Window>
      );
    case 'dua':
      if (o.mode === 'broken' && o.times)
        return (
          <Window frames={frames} from={o.from} to={o.to}>
            <TimedSyllables frames={frames} times={o.times.map((t) => t - (o.from ?? 0))} align={o.align} pop={o.pop ?? (o.from ?? 0) < 0.1} />
          </Window>
        );
      return (
        <Window frames={frames} from={o.from} to={o.to}>
          <Compact align={o.align}>
            <DuaPanel
              dua={cfg.dua}
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
      return <RepeatOverlay frames={frames} parts={o.parts} until={o.until} align={o.align} />;
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
    case 'recap':
      return (
        <Window frames={frames} from={o.from} to={o.to}>
          <Recap />
        </Window>
      );
    case 'card':
      return (
        <Window frames={frames} from={o.from}>
          <DuaPanel dua={cfg.dua} display={{mode: 'card'}} layout={layout.portrait ? layout : {...layout, cardCenterX: 1470, cardW: 780}} beatFrames={frames} hasSpeech={false} animateIn />
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
  const cfg = useCfg();
  const frame = useCurrentFrame();
  const move = cfg.imageMove?.[n] ?? {to: 1.07, origin: [n % 2 ? 40 : 60, 45] as [number, number]};
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

const SceneBody: React.FC<{n: number; media?: SceneMedia; frames: number}> = ({n, media, frames}) => {
  const cfg = useCfg();
  const {fps} = useVideoConfig();
  const voices = cfg.voiceOver?.[n] ?? [];
  const windows = voices.map((v) => [Math.round(v.at * frames), Math.round(v.at * frames + v.seconds * fps)] as const);
  const clipVolume = (f: number) => (windows.some(([s, e]) => f >= s - 6 && f <= e + 6) ? 0.25 : 1);
  return (
    <AbsoluteFill>
      {media?.file ? (
        <OffthreadVideo src={staticFile(media.file)} volume={clipVolume} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      ) : media?.image ? (
        <StillImage n={n} src={media.image} frames={frames} />
      ) : (
        <Placeholder n={n} />
      )}
      {voices.map((v, i) => (
        <Sequence key={i} from={windows[i][0]} layout="none">
          <Html5Audio src={staticFile(v.audio)} />
        </Sequence>
      ))}
      {(cfg.overlays[n] ?? []).map((o, i) => (
        <Overlay key={i} o={o} frames={frames} />
      ))}
    </AbsoluteFill>
  );
};

const LeadIn: React.FC<{n: number; frames: number}> = ({n, frames}) => {
  const cfg = useCfg();
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const layout = getLayout(width, height);
  const lead = cfg.leadIn![n];
  const t = interpolate(frame, [0, frames], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{overflow: 'hidden'}}>
      <Img src={staticFile(lead.image)} style={{width: '100%', height: '100%', objectFit: 'cover', transform: `scale(${1 + 0.08 * t})`, transformOrigin: '30% 50%'}} />
      <Sequence from={8} layout="none">
        <Html5Audio src={staticFile(lead.audio)} />
      </Sequence>
      <Sequence from={4} durationInFrames={frames - 4} layout="none">
        <SpeechBubble speech={{who: 'narrator', text: lead.text}} layout={layout} />
      </Sequence>
    </AbsoluteFill>
  );
};

const Scene: React.FC<{n: number; media?: SceneMedia; frames: number; lead: number; first: boolean; last: boolean}> = ({n, media, frames, lead, first, last}) => {
  const frame = useCurrentFrame();
  const fadeIn = interpolate(frame, [0, first ? 12 : 8], [first ? 1 : 0.6, 0], {extrapolateRight: 'clamp'});
  const fadeOut = last ? interpolate(frame, [frames - 20, frames], [0, 1], {extrapolateLeft: 'clamp'}) : 0;
  return (
    <AbsoluteFill style={{background: colors.cream}}>
      {lead > 0 && (
        <Sequence durationInFrames={lead} layout="none">
          <LeadIn n={n} frames={lead} />
        </Sequence>
      )}
      <Sequence from={lead} durationInFrames={frames - lead} layout="none">
        <SceneBody n={n} media={media} frames={frames - lead} />
      </Sequence>
      {fadeIn > 0 && <AbsoluteFill style={{background: colors.cream, opacity: fadeIn}} />}
      {fadeOut > 0 && <AbsoluteFill style={{background: colors.cream, opacity: fadeOut}} />}
    </AbsoluteFill>
  );
};

/** An episode assembled from AI-generated scene clips, with title, dua panels, repeat prompt and end card on top. */
export const ClipEpisode: React.FC<{cfg?: ClipConfig}> = ({cfg = EP01_CONFIG}) => (
  <Cfg.Provider value={cfg}>
    <ClipEpisodeBody />
  </Cfg.Provider>
);

const ClipEpisodeBody: React.FC = () => {
  const cfg = useCfg();
  const {fps} = useVideoConfig();
  const scenes = clipScenes(fps, cfg);
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
            <Scene n={s.n} media={s.media} frames={s.frames} lead={s.lead} first={false} last={i === scenes.length - 1} />
          </Sequence>
        );
        from += s.frames;
        return seq;
      })}
    </AbsoluteFill>
  );
};
