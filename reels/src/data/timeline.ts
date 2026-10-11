import type {Card, Reel, Say} from './types';

/** Audio made for a reel, keyed by "<step>-<sound>" (1-based); written by scripts/narrate.mjs and scripts/quran.mjs. */
export type ReelMedia = {
  clips?: Record<string, {file: string; seconds: number}>;
  audio?: Record<string, {file: string; seconds: number}>;
};

export const soundKey = (step: number, sound: number) => `${step + 1}-${sound + 1}`;
export const isQuran = (s: Say): s is {quran: string; words?: [number, number]} => 'quran' in s;
export const isHadithArabic = (s: Say): s is {hadithArabic: string} => 'hadithArabic' in s;

export const START = 0.4;
const GAP = 0.35;
const HOLD = 0.6;
const STEP_GAP = 0.35;
export const END_CARD_SECONDS = 2.6;
export const CROSSFADE = 0.6;

/** Rough length before the audio exists, so previews and docs still have a timeline. */
const estimate = (s: Say) => (isQuran(s) ? 4 : isHadithArabic(s) ? 0.5 + [...s.hadithArabic].length * 0.07 : 0.4 + [...s.voice].length * 0.085);

export type Timeline = {
  cards: Card[];
  /** `arabic` marks recitation or hadith Arabic, under which the nature sound almost disappears. */
  sounds: {at: number; seconds: number; file?: string; quran: boolean; arabic: boolean; text: string}[];
  /** When the end card starts, and the whole length, in seconds. */
  endAt: number;
  total: number;
  /** Length of each of the three scenes (they overlap by CROSSFADE). */
  sceneSeconds: number;
};

const sayText = (s: Say) => (isQuran(s) ? `${s.quran}${s.words ? ` (শব্দ ${s.words[0]}–${s.words[1]})` : ''}` : isHadithArabic(s) ? s.hadithArabic : s.voice);

/** Lays the steps out one after another, each as long as its sounds. */
export const buildTimeline = (reel: Reel, media: ReelMedia = {}): Timeline => {
  const cards: Card[] = [];
  const sounds: Timeline['sounds'] = [];
  let t = START;
  reel.steps.forEach((step, si) => {
    const from = t;
    let at = from + (step.lead ?? 0.2);
    const starts: number[] = [];
    step.say.forEach((s, k) => {
      const m = media.audio?.[soundKey(si, k)];
      const seconds = m?.seconds ?? estimate(s);
      starts.push(at);
      sounds.push({at, seconds, file: m?.file, quran: isQuran(s), arabic: isQuran(s) || isHadithArabic(s), text: sayText(s)});
      at += seconds + GAP;
    });
    const to = Math.max(at - GAP + (step.hold ?? HOLD), from + 2.5);
    cards.push({
      from,
      to,
      lines: step.lines.map((l) => ({...l, at: Math.min((l.with !== undefined ? starts[l.with] ?? from : from) + (l.delay ?? 0), to - 0.8)})),
    });
    t = to + STEP_GAP;
  });
  const endAt = t;
  const total = endAt + END_CARD_SECONDS;
  return {cards, sounds, endAt, total, sceneSeconds: (total + 2 * CROSSFADE) / 3};
};
