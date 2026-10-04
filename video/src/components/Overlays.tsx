import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {ARABIC_FONT, BENGALI_FONT} from '../fonts';
import type {Layout} from '../layout';
import {colors} from '../theme';
import type {Dua, DuaDisplay, Speech} from '../types';
import {characterColor, characterName} from './Characters';

export const TEXT_FONT = `'${BENGALI_FONT}', '${ARABIC_FONT}', sans-serif`;

const usePop = (animate = true, damping = 13) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return animate ? spring({frame, fps, config: {damping, mass: 0.7}}) : 1;
};

/* ---------- speech bubble ---------- */

export const SpeechBubble: React.FC<{speech: Speech; layout: Layout; top?: number}> = ({speech, layout, top}) => {
  const pop = usePop(true, 16);
  const who = speech.who;
  const narrator = who === 'narrator';
  const color = who === 'narrator' ? colors.inkSoft : who === 'everyone' ? colors.gold : characterColor(who);
  const name = speech.label ?? (who === 'narrator' ? 'গল্প' : who === 'everyone' ? 'সবাই' : characterName(who));
  return (
    <div
      style={{
        position: 'absolute',
        top: top ?? layout.speechTop,
        left: '50%',
        transform: `translateX(-50%) scale(${interpolate(pop, [0, 1], [0.9, 1])})`,
        opacity: pop,
        maxWidth: layout.speechMaxW,
        width: 'max-content',
        background: narrator ? '#FFFBF2' : colors.white,
        border: `6px ${narrator ? 'dashed' : 'solid'} ${color}`,
        borderRadius: 44,
        padding: '34px 56px 30px',
        boxShadow: '0 12px 0 rgba(59,58,74,0.08)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -30,
          left: 40,
          background: color,
          color: colors.white,
          fontFamily: TEXT_FONT,
          fontWeight: 700,
          fontSize: 34,
          padding: '4px 22px',
          borderRadius: 999,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: TEXT_FONT,
          fontWeight: 700,
          fontSize: layout.speechFont,
          lineHeight: 1.4,
          color: colors.ink,
          textAlign: 'center',
          whiteSpace: 'pre-line',
        }}
      >
        {speech.text}
      </div>
    </div>
  );
};

/* ---------- dua panel ---------- */

export const DuaPanel: React.FC<{dua: Dua; display: DuaDisplay; layout: Layout; beatFrames: number; hasSpeech: boolean; animateIn: boolean}> = ({
  dua,
  display,
  layout,
  beatFrames,
  hasSpeech,
  animateIn,
}) => {
  const frame = useCurrentFrame();
  const pop = usePop(animateIn, 14);
  const card = display.mode === 'card';

  let active = -1;
  if (display.highlightPart !== undefined) active = display.highlightPart;
  else if (display.mode === 'broken') {
    const lead = 10;
    const per = (beatFrames - lead * 2) / dua.parts.length;
    active = frame < lead ? -1 : Math.min(dua.parts.length - 1, Math.floor((frame - lead) / per));
  }
  const partStart = (i: number) => {
    if (display.highlightPart !== undefined) return 0;
    const per = (beatFrames - 20) / dua.parts.length;
    return 10 + i * per;
  };

  const width = card ? layout.cardW : layout.duaW;
  const left = card ? layout.cardCenterX - width / 2 : undefined;
  const top = card ? layout.cardTop : hasSpeech ? layout.duaTop : layout.duaTopNoSpeech;

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: left ?? '50%',
        width,
        transform: `${left === undefined ? 'translateX(-50%) ' : ''}scale(${interpolate(pop, [0, 1], [0.85, 1])})`,
        opacity: pop,
        background: colors.white,
        borderRadius: 52,
        border: `8px solid ${card ? colors.gold : colors.sageDark}`,
        boxShadow: '0 16px 0 rgba(59,58,74,0.08)',
        padding: card ? '64px 40px 40px' : '58px 40px 36px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: -34,
          left: '50%',
          transform: 'translateX(-50%)',
          background: card ? colors.gold : colors.sageDark,
          color: card ? colors.ink : colors.white,
          fontFamily: TEXT_FONT,
          fontWeight: 700,
          fontSize: 38,
          padding: '6px 30px',
          borderRadius: 999,
          whiteSpace: 'nowrap',
        }}
      >
        {card ? 'আজকের দোয়া' : dua.name}
      </div>
      <div
        style={{
          fontFamily: `'${ARABIC_FONT}', serif`,
          fontWeight: 700,
          fontSize: card ? 150 : 170,
          lineHeight: 1.35,
          color: colors.ink,
          direction: 'rtl',
        }}
      >
        {dua.arabic}
      </div>
      <div style={{fontFamily: TEXT_FONT, fontWeight: 700, fontSize: card ? 80 : 92, color: colors.inkSoft, marginTop: 6}}>
        {dua.parts.map((p, i) => {
          const isActive = active === i;
          const dim = active !== -1 && !isActive;
          const bounce = isActive ? spring({frame: frame - partStart(i), fps: 30, config: {damping: 9}}) : 0;
          return (
            <React.Fragment key={i}>
              {i > 0 && <span style={{opacity: 0.4}}>-</span>}
              <span
                style={{
                  display: 'inline-block',
                  color: isActive ? colors.peachDark : dim ? '#B9B8C4' : colors.ink,
                  transform: `scale(${1 + bounce * 0.22}) translateY(${-bounce * 6}px)`,
                  padding: '0 6px',
                }}
              >
                {p}
              </span>
            </React.Fragment>
          );
        })}
      </div>
      {(display.showMeaning || card) && (
        <div style={{fontFamily: TEXT_FONT, fontWeight: 600, fontSize: card ? 46 : 50, color: colors.ink, marginTop: 14}}>
          {dua.meaning}
        </div>
      )}
      {card && <div style={{fontFamily: TEXT_FONT, fontWeight: 400, fontSize: 32, color: colors.inkSoft, marginTop: 14}}>{dua.source}</div>}
    </div>
  );
};

/* ---------- small overlays ---------- */

export const Footnote: React.FC<{text: string; layout: Layout}> = ({text, layout}) => (
  <div
    style={{
      position: 'absolute',
      right: layout.portrait ? undefined : 48,
      left: layout.portrait ? '50%' : undefined,
      transform: layout.portrait ? 'translateX(-50%)' : undefined,
      bottom: 36,
      background: 'rgba(255,255,255,0.85)',
      color: colors.inkSoft,
      fontFamily: TEXT_FONT,
      fontWeight: 600,
      fontSize: 32,
      padding: '6px 22px',
      borderRadius: 999,
      whiteSpace: 'nowrap',
    }}
  >
    সূত্র: {text}
  </div>
);

const starPath = (cx: number, cy: number, outer: number, inner: number) => {
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = (Math.PI / 5) * i - Math.PI / 2;
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return `M ${pts.join(' L ')} Z`;
};

export const Star: React.FC<{layout: Layout}> = ({layout}) => {
  const frame = useCurrentFrame();
  const pop = usePop(true, 8);
  const size = 260;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      style={{
        position: 'absolute',
        left: layout.starX - size / 2,
        top: layout.starY - size / 2,
        transform: `scale(${pop}) rotate(${Math.sin(frame * 0.08) * 8}deg)`,
        overflow: 'visible',
      }}
    >
      <circle cx={100} cy={100} r={90} fill={colors.gold} opacity={0.18 + 0.08 * Math.sin(frame * 0.2)} />
      <path d={starPath(100, 100, 78, 34)} fill={colors.gold} stroke="#E0A800" strokeWidth={5} strokeLinejoin="round" />
      {[0, 1, 2, 3].map((i) => {
        const a = (Math.PI / 2) * i + frame * 0.05;
        const d = 105 + Math.sin(frame * 0.3 + i) * 8;
        return <path key={i} d={starPath(100 + Math.cos(a) * d, 100 + Math.sin(a) * d, 12, 5)} fill={colors.gold} />;
      })}
    </svg>
  );
};

export const SilencePrompt: React.FC<{layout: Layout; beatFrames: number}> = ({layout, beatFrames}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = usePop(true, 12);
  const seconds = Math.max(1, Math.round(beatFrames / fps));
  const breathe = 1 + Math.sin(frame * 0.2) * 0.03;
  return (
    <div
      style={{
        position: 'absolute',
        top: layout.silenceY,
        left: '50%',
        transform: `translate(-50%, -50%) scale(${pop * breathe})`,
        display: 'flex',
        alignItems: 'center',
        gap: 26,
        background: colors.peachDark,
        borderRadius: 999,
        padding: '18px 44px',
        boxShadow: '0 10px 0 rgba(59,58,74,0.10)',
      }}
    >
      <span style={{fontFamily: TEXT_FONT, fontWeight: 700, fontSize: 54, color: colors.white, whiteSpace: 'nowrap'}}>এবার তুমি বলো</span>
      <span style={{display: 'flex', gap: 14}}>
        {Array.from({length: seconds}).map((_, i) => {
          const filled = frame >= (i + 1) * fps - 4;
          return (
            <span
              key={i}
              style={{
                width: 30,
                height: 30,
                borderRadius: 999,
                background: filled ? colors.white : 'rgba(255,255,255,0.35)',
                transform: `scale(${filled ? 1.1 : 1})`,
              }}
            />
          );
        })}
      </span>
    </div>
  );
};

export const QuestionMark: React.FC<{layout: Layout}> = ({layout}) => {
  const frame = useCurrentFrame();
  const pop = usePop(true, 7);
  const size = 230;
  return (
    <div
      style={{
        position: 'absolute',
        left: layout.questionX - size / 2,
        top: layout.questionY - size / 2 + Math.sin(frame * 0.18) * 14,
        width: size,
        height: size,
        borderRadius: 999,
        background: colors.white,
        border: `10px solid ${colors.skyDark}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${pop}) rotate(${Math.sin(frame * 0.12) * 10}deg)`,
        fontFamily: TEXT_FONT,
        fontWeight: 700,
        fontSize: 170,
        color: colors.skyDark,
        lineHeight: 1,
      }}
    >
      ?
    </div>
  );
};

export const RightHand: React.FC<{layout: Layout}> = ({layout}) => {
  const frame = useCurrentFrame();
  const pop = usePop(true, 9);
  const wave = Math.sin(frame * 0.3) * 10;
  return (
    <div
      style={{
        position: 'absolute',
        left: layout.handX,
        top: layout.handY,
        transform: `translate(-50%, -50%) scale(${pop})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <svg width={220} height={240} viewBox="0 0 220 240" style={{transform: `rotate(${wave}deg)`, transformOrigin: '50% 90%'}}>
        <g fill={colors.skin} stroke={colors.skinDark} strokeWidth={5} strokeLinejoin="round">
          {[52, 86, 120, 154].map((x, i) => (
            <rect key={x} x={x - 15} y={[40, 18, 22, 48][i]} width={30} height={110} rx={15} />
          ))}
          <rect x={10} y={110} width={30} height={90} rx={15} transform="rotate(-38 25 155)" />
          <rect x={30} y={110} width={150} height={110} rx={50} />
        </g>
      </svg>
      <div
        style={{
          background: colors.skyDark,
          color: colors.white,
          fontFamily: TEXT_FONT,
          fontWeight: 700,
          fontSize: 48,
          padding: '6px 30px',
          borderRadius: 999,
        }}
      >
        ডান হাত
      </div>
    </div>
  );
};

export const Title: React.FC<{layout: Layout; episodeLabel: string}> = ({layout, episodeLabel}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const letters = Array.from('ছোট্ট মুমিন');
  const sub = spring({frame: frame - 20, fps, config: {damping: 14}});
  return (
    <div style={{position: 'absolute', top: layout.titleTop, left: 0, right: 0, textAlign: 'center'}}>
      <div style={{fontFamily: TEXT_FONT, fontWeight: 700, fontSize: layout.portrait ? 130 : 150, color: colors.ink, lineHeight: 1.2}}>
        <span
          style={{
            display: 'inline-block',
            transform: `translateY(${interpolate(spring({frame, fps, config: {damping: 10}}), [0, 1], [-160, 0])}px)`,
            color: colors.sageDark,
            WebkitTextStroke: `4px ${colors.white}`,
            paintOrder: 'stroke fill',
            textShadow: '0 8px 0 rgba(59,58,74,0.12)',
          }}
        >
          {letters.join('')}
        </span>
      </div>
      <div
        style={{
          display: 'inline-block',
          marginTop: 16,
          opacity: sub,
          transform: `scale(${interpolate(sub, [0, 1], [0.8, 1])})`,
          background: colors.white,
          borderRadius: 999,
          padding: '8px 36px',
          fontFamily: TEXT_FONT,
          fontWeight: 700,
          fontSize: 50,
          color: colors.peachDark,
        }}
      >
        {episodeLabel}
      </div>
    </div>
  );
};
