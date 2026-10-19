import type {Kind, Line, Reel, Say, Scene, Step} from './types';

type Base = {id: string; number: number; title: string; voice?: string; scenes: Scene[]; sources: string[]; checklist: string[]; unsure?: string[]};
/** A qari recitation: verse key and, for part of an ayah, the word range (1-based, inclusive). */
export type QuranRef = {ref: string; words?: [number, number]};
const recite = (q: QuranRef): Say => ({quran: q.ref, words: q.words});

/** Asmaul Husna: kicker → big Arabic name, pronunciation, meaning → the ayah recited, its meaning and reference. */
export const asmaReel = (
  b: Base & {
    count: string;
    arabic: string;
    bangla: string;
    meaning: string;
    explain: string;
    /** An ayah that is the name alone (like 55:1), recited when the name appears, with its reference. */
    nameAyah?: {ref: string; source: string};
    ayah: {arabic: string; meaning: string; source: string; note?: string; quran: QuranRef};
    /** `ayah` is said after the ayah's meaning; leave it empty when the meaning is long (the source stays on screen). */
    narration: {intro: string; meaning: string; ayah: string};
  },
): Reel => ({
  ...b,
  kind: 'asma',
  unsure: b.unsure ?? [],
  steps: [
    {lines: [{style: 'kicker', text: `আল্লাহর সুন্দর নাম · ${b.count}`}], say: [{voice: b.narration.intro}]},
    {
      lines: [
        {style: 'arabicXL', text: b.arabic},
        ...(b.nameAyah ? [{style: 'source' as const, text: b.nameAyah.source, delay: 1.2}] : []),
        {style: 'title', text: b.bangla, with: b.nameAyah ? 1 : 0},
        {style: 'body', text: b.meaning, with: b.nameAyah ? 2 : 1},
        {style: 'note', text: b.explain, with: b.nameAyah ? 2 : 1, delay: 1.4},
      ],
      say: [...(b.nameAyah ? [{quran: b.nameAyah.ref}] : []), {voice: `${b.bangla}।`}, {voice: b.narration.meaning}],
      hold: 1.0,
    },
    {
      lines: [
        {style: 'arabic', text: b.ayah.arabic},
        {style: 'body', text: b.ayah.meaning, with: 1},
        {style: 'source', text: b.ayah.source, with: 1},
        ...(b.ayah.note ? [{style: 'note' as const, text: b.ayah.note, with: b.narration.ayah ? 2 : 1, delay: b.narration.ayah ? 0 : 2}] : []),
      ],
      say: [recite(b.ayah.quran), {voice: b.ayah.meaning}, ...(b.narration.ayah ? [{voice: b.narration.ayah}] : [])],
    },
  ],
});

/**
 * Short dua for children, short enough for one 10–14 s Gemini clip:
 * the dua (Arabic voice) with pronunciation, meaning and source → "let's say it together": the dua again, then a closing line.
 */
export const duaReel = (
  b: Base & {
    count: string;
    arabic: string;
    bangla: string;
    meaning: string;
    source: string;
    narration: {meaning: string; closing: string};
  },
): Reel => ({
  ...b,
  kind: 'dua',
  unsure: b.unsure ?? [],
  steps: [
    {
      lines: [
        {style: 'kicker', text: b.title},
        {style: 'arabic', text: b.arabic},
        {style: 'title', text: b.bangla, delay: 0.6},
        {style: 'body', text: b.meaning, with: 1},
        {style: 'source', text: b.source, with: 1, delay: 1},
      ],
      say: [{hadithArabic: b.arabic}, {voice: b.narration.meaning}],
    },
    {
      lines: [
        {style: 'kicker', text: 'এসো, একসাথে বলি'},
        {style: 'arabic', text: b.arabic},
        {style: 'title', text: b.bangla},
      ],
      say: [{hadithArabic: b.arabic}, {voice: b.narration.closing}],
    },
  ],
});

/** Ayah or hadith: kicker → Arabic text (recited by a qari for an ayah), meaning, reference. */
export const textReel = (
  b: Base & {
    kind: Extract<Kind, 'ayah' | 'hadith'>;
    kicker: string;
    arabic: string;
    meaning: string;
    source: string;
    note?: string;
    /** Ayah: the qari recitation to play. Hadith: the Arabic is read by the Arabic TTS voice. */
    quran?: QuranRef;
    narration: {intro: string; meaning: string; source: string; note?: string};
  },
): Reel => {
  const say: Say[] = [b.quran ? recite(b.quran) : {hadithArabic: b.arabic}, {voice: b.narration.meaning}];
  const meaningAt = say.length - 1;
  if (b.narration.source) say.push({voice: b.narration.source});
  if (b.narration.note) say.push({voice: b.narration.note});
  const lines: Line[] = [
    {style: 'arabic', text: b.arabic},
    {style: 'body', text: b.meaning, with: meaningAt},
    {style: 'source', text: b.source, with: b.narration.source ? meaningAt + 1 : meaningAt, delay: b.narration.source ? 0 : 1.5},
    ...(b.note ? [{style: 'note' as const, text: b.note, with: b.narration.note ? say.length - 1 : meaningAt, delay: b.narration.note ? 0 : 2.5}] : []),
  ];
  return {
    ...b,
    unsure: b.unsure ?? [],
    steps: [
      {lines: [{style: 'kicker', text: b.kicker}], say: [{voice: b.narration.intro}]},
      {lines, say, hold: 1.2},
    ],
  };
};
