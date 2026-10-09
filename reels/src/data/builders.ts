import type {Card, Kind, Narration, Reel, Scene} from './types';

/** Every reel: three 8-second clips, the last 2 seconds belong to the end card. */
export const SCENE_SECONDS = 8;
export const END_CARD_SECONDS = 2.2;
const CONTENT_END = 3 * SCENE_SECONDS - END_CARD_SECONDS - 0.2;

type Base = {id: string; number: number; title: string; scenes: Scene[]; sources: string[]; checklist: string[]; unsure?: string[]};

/** Asmaul Husna: kicker → big Arabic name, pronunciation, meaning → the ayah it comes from. */
export const asmaReel = (
  b: Base & {
    count: string;
    arabic: string;
    bangla: string;
    meaning: string;
    explain: string;
    ayah: {arabic: string; meaning: string; source: string; note?: string};
    narration: {intro: string; meaning: string; explain: string; ayah: string};
  },
): Reel => ({
  ...b,
  kind: 'asma',
  unsure: b.unsure ?? [],
  cards: [
    {from: 0.3, to: 3.4, lines: [{style: 'kicker', text: `আল্লাহর সুন্দর নাম · ${b.count}`}]},
    {
      from: 3.4,
      to: 15.6,
      lines: [
        {style: 'arabicXL', text: b.arabic},
        {style: 'title', text: b.bangla, at: 5.6},
        {style: 'body', text: b.meaning, at: 8.4},
        {style: 'note', text: b.explain, at: 11.4},
      ],
    },
    {
      from: 16,
      to: CONTENT_END,
      lines: [
        {style: 'arabic', text: b.ayah.arabic},
        {style: 'body', text: b.ayah.meaning, at: 17.2},
        {style: 'source', text: b.ayah.source, at: 17.2},
        ...(b.ayah.note ? [{style: 'note' as const, text: b.ayah.note, at: 19.4}] : []),
      ],
    },
  ],
  narration: [
    {at: 0.6, text: b.narration.intro},
    {at: 8.6, text: b.narration.meaning},
    {at: 11.6, text: b.narration.explain},
    {at: 16.6, text: b.narration.ayah},
  ],
  arabicVoice: {at: 4, text: b.arabic},
});

type BabyName = {arabic: string; bangla: string; gender: 'ছেলে' | 'মেয়ে'; meaning: string; origin: string; say: string};

/** Baby names: one card per name, shared evenly between the intro and the end card. */
export const namesReel = (b: Base & {heading: string; intro: string; names: BabyName[]}): Reel => {
  const start = 3.4;
  const span = (CONTENT_END - start) / b.names.length;
  const cards: Card[] = [{from: 0.3, to: start, lines: [{style: 'kicker', text: b.heading}]}];
  const narration: Narration[] = [{at: 0.6, text: b.intro}];
  b.names.forEach((n, i) => {
    const from = start + i * span;
    cards.push({
      from,
      to: from + span - 0.15,
      lines: [
        {style: 'arabicXL', text: n.arabic},
        {style: 'title', text: `${n.bangla} · ${n.gender}`},
        {style: 'body', text: n.meaning, at: from + 0.8},
        {style: 'note', text: n.origin, at: from + 1.6},
      ],
    });
    narration.push({at: from + 0.9, text: n.say});
  });
  return {...b, kind: 'names', unsure: b.unsure ?? [], cards, narration};
};

/** Ayah or hadith: kicker → Arabic text with meaning and reference. */
export const textReel = (
  b: Base & {
    kind: Extract<Kind, 'ayah' | 'hadith'>;
    kicker: string;
    arabic: string;
    meaning: string;
    source: string;
    note?: string;
    narration: {intro: string; meaning: string; source: string; note?: string};
  },
): Reel => ({
  ...b,
  unsure: b.unsure ?? [],
  cards: [
    {from: 0.3, to: 3.4, lines: [{style: 'kicker', text: b.kicker}]},
    {
      from: 3.4,
      to: CONTENT_END,
      lines: [
        {style: 'arabic', text: b.arabic},
        {style: 'body', text: b.meaning, at: 9},
        {style: 'source', text: b.source, at: 14},
        ...(b.note ? [{style: 'note' as const, text: b.note, at: 17}] : []),
      ],
    },
  ],
  narration: [
    {at: 0.6, text: b.narration.intro},
    {at: 9.2, text: b.narration.meaning},
    {at: 14.2, text: b.narration.source},
    ...(b.narration.note ? [{at: 17.4, text: b.narration.note}] : []),
  ],
  arabicVoice: {at: 4, text: b.arabic},
});
