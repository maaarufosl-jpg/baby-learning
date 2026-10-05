import type {Beat, CharacterPlacement, Episode} from '../types';
import voice from './ep01.audio.json';

// Script: episodes/ep01-bismillah-bole-khai.md
// Beat lengths are estimates. Once voice is recorded, set each beat's `seconds` to its audio length.

/* Seats at the kitchen table (plates are drawn in Backgrounds.tsx at the same x). */
const umayer = (p: Partial<CharacterPlacement> = {}): CharacterPlacement => ({id: 'umayer', x: 0.42, y: 0.976, scale: 1.3, mood: 'happy', ...p});
const safa = (p: Partial<CharacterPlacement> = {}): CharacterPlacement => ({id: 'safa', x: 0.62, y: 0.918, scale: 1.3, mood: 'happy', ...p});
const ammu = (p: Partial<CharacterPlacement> = {}): CharacterPlacement => ({id: 'ammu', x: 0.13, y: 0.97, scale: 1.05, mood: 'happy', ...p});
const miu = (p: Partial<CharacterPlacement> = {}): CharacterPlacement => ({id: 'miu', x: 0.91, y: 0.98, scale: 1.2, mood: 'happy', ...p});

/* Standing positions on the plain stage, kept to the sides so the dua panel stays clear. */
const umayerSide = (p: Partial<CharacterPlacement> = {}): CharacterPlacement => ({id: 'umayer', x: 0.12, y: 0.98, mood: 'happy', ...p});
const safaSide = (p: Partial<CharacterPlacement> = {}): CharacterPlacement => ({id: 'safa', x: 0.88, y: 0.98, mood: 'happy', ...p});

const repeatPart = (part: number, said: string, shorts = true): Beat[] => [
  {
    seconds: 1.5,
    kind: 'repeat',
    background: 'plain',
    characters: [umayerSide({mood: 'excited'}), safaSide()],
    speech: {who: 'umayer', text: said},
    dua: {mode: 'full', highlightPart: part},
    shorts,
  },
  {
    seconds: 3,
    kind: 'repeat',
    background: 'plain',
    characters: [umayerSide({talking: false}), safaSide()],
    dua: {mode: 'full', highlightPart: part},
    silence: true,
    shorts,
  },
];

const base: Episode = {
  id: 'ep01',
  number: 1,
  season: 1,
  title: 'বিসমিল্লাহ বলে খাই',
  dua: {
    name: 'খাওয়ার আগের দোয়া',
    arabic: 'بِسْمِ اللَّهِ',
    parts: ['বিস', 'মিল', 'লাহ'],
    meaning: 'আল্লাহর নাম নিয়ে শুরু করছি',
    source: 'সহিহ বুখারি ৫৩৭৬, সহিহ মুসলিম ২০২২',
  },
  beats: [
    /* ---- Scene 1: opening nasheed ---- */
    {
      seconds: 8,
      kind: 'intro',
      background: 'outdoor',
      characters: [
        {id: 'umayer', x: 0.4, y: 0.96, mood: 'excited', arms: {right: 'wave'}},
        {id: 'safa', x: 0.54, y: 0.96, mood: 'happy', arms: {right: 'wave'}},
        {id: 'miu', x: 0.68, y: 0.97, mood: 'happy', from: {x: 1.15}},
      ],
      speech: {who: 'everyone', label: 'নাশিদ', text: 'ছোট্ট মুমিন, এসো শিখি,\nবিসমিল্লাহ বলে শুরু করি!'},
    },

    {
      seconds: 5,
      kind: 'intro',
      background: 'outdoor',
      characters: [
        {id: 'umayer', x: 0.4, y: 0.96, mood: 'happy', arms: {right: 'wave'}},
        {id: 'safa', x: 0.54, y: 0.96, mood: 'happy'},
        {id: 'miu', x: 0.68, y: 0.97, mood: 'happy'},
      ],
      speech: {who: 'narrator', text: 'এ হলো উমায়ের আব্দুল মুহাইমিন।\nসবাই আদর করে ডাকে উমায়ের।'},
    },

    /* ---- Scene 2: hungry Umayer ---- */
    {
      seconds: 5,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer({mood: 'excited', from: {x: 1.1}})],
      speech: {who: 'narrator', text: 'উমায়ের সারা সকাল খেলেছে।'},
    },
    {
      seconds: 4,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer({mood: 'happy'})],
      speech: {who: 'narrator', text: 'এখন তার খুব খিদে পেয়েছে।'},
    },
    {
      seconds: 4,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer({mood: 'excited'})],
      speech: {who: 'umayer', text: 'ভাত! ডিম ভাজা! আমার প্রিয়!'},
    },
    {
      seconds: 3,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer(), safa({mood: 'excited', from: {x: 0.75}})],
      speech: {who: 'safa', text: 'ভাইয়া, খাবো!'},
    },
    {
      seconds: 3,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer(), safa(), miu({from: {x: 1.1}})],
      speech: {who: 'miu', text: 'মিউ!'},
    },

    /* ---- Scene 3: the little mistake ---- */
    {
      seconds: 4,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer({mood: 'excited', arms: {left: 'reach'}}), safa(), miu()],
    },
    {
      seconds: 4,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer({mood: 'excited', arms: {left: 'reach'}}), safa({mood: 'surprised'}), miu({mood: 'surprised', shake: true})],
      speech: {who: 'narrator', text: 'এই রে! উমায়ের কিছু একটা ভুলে গেছে।'},
      shorts: true,
    },
    {
      seconds: 5,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer({mood: 'thinking'}), safa({mood: 'calm'}), miu({mood: 'surprised'})],
      speech: {who: 'narrator', text: 'তুমি কি বলতে পারো,\nকী ভুলে গেছে?'},
      question: true,
    },

    /* ---- Scene 4: Ammu teaches ---- */
    {
      seconds: 4,
      kind: 'learn',
      background: 'kitchen',
      characters: [umayer({mood: 'surprised'}), safa(), miu(), ammu({from: {x: -0.15}})],
      speech: {who: 'ammu', text: 'উমায়ের সোনা, একটু থামো তো।'},
    },
    {
      seconds: 4,
      kind: 'learn',
      background: 'kitchen',
      characters: [umayer({mood: 'calm'}), safa(), miu(), ammu()],
      speech: {who: 'ammu', text: 'খাওয়ার আগে আমরা কী বলি?'},
    },
    {
      seconds: 4,
      kind: 'learn',
      background: 'kitchen',
      characters: [umayer({mood: 'thinking'}), safa({mood: 'calm'}), miu(), ammu()],
      speech: {who: 'umayer', text: 'উমম... ভুলে গেছি, মা।'},
    },
    {
      seconds: 5,
      kind: 'learn',
      background: 'kitchen',
      characters: [umayer({mood: 'calm'}), safa(), miu(), ammu()],
      speech: {who: 'ammu', text: 'আমাদের নবীজি ﷺ শিখিয়েছেন,\nখাওয়ার আগে বলতে হয়... বিসমিল্লাহ।'},
      shorts: true,
    },
    {
      seconds: 4,
      kind: 'learn',
      background: 'kitchen',
      characters: [umayer({mood: 'calm'}), safa(), miu(), ammu()],
      dua: {mode: 'full'},
      shorts: true,
    },
    {
      seconds: 5,
      kind: 'learn',
      background: 'kitchen',
      characters: [umayer({mood: 'calm'}), safa(), miu(), ammu()],
      dua: {mode: 'broken'},
      shorts: true,
    },
    {
      seconds: 4,
      kind: 'learn',
      background: 'kitchen',
      characters: [umayer({mood: 'happy'}), safa(), miu(), ammu()],
      dua: {mode: 'full'},
      star: true,
      shorts: true,
    },
    {
      seconds: 5,
      kind: 'learn',
      background: 'kitchen',
      characters: [umayer(), safa(), miu(), ammu()],
      speech: {who: 'ammu', text: 'বিসমিল্লাহ মানে,\nআল্লাহর নাম নিয়ে শুরু করছি।'},
      dua: {mode: 'full', showMeaning: true},
      shorts: true,
    },
    {
      seconds: 4,
      kind: 'learn',
      background: 'kitchen',
      characters: [umayer(), safa(), miu(), ammu()],
      speech: {who: 'ammu', text: 'আল্লাহর নাম নিলে খাবারে বরকত হয়।'},
    },
    {
      seconds: 4,
      kind: 'learn',
      background: 'kitchen',
      characters: [umayer({mood: 'calm'}), safa(), miu(), ammu({arms: {left: 'up'}})],
      speech: {who: 'ammu', text: 'আর খাই কোন হাতে?'},
    },
    {
      seconds: 3,
      kind: 'learn',
      background: 'kitchen',
      characters: [umayer({mood: 'excited', arms: {right: 'up'}}), safa(), miu(), ammu()],
      speech: {who: 'umayer', text: 'ডান হাতে!'},
    },
    {
      seconds: 5,
      kind: 'learn',
      background: 'kitchen',
      characters: [umayer(), safa(), miu({nod: true}), ammu()],
      speech: {who: 'ammu', text: 'ঠিক! আর খাই নিজের সামনে থেকে।\nপ্লেটের মাঝখান থেকে নয়।'},
      props: ['plateGlow'],
    },
    {
      seconds: 6,
      kind: 'learn',
      background: 'kitchen',
      characters: [umayer(), safa(), miu(), ammu()],
      speech: {who: 'ammu', text: 'আল্লাহর নাম নাও, ডান হাতে খাও,\nসামনে থেকে খাও।'},
      footnote: 'সহিহ বুখারি ৫৩৭৬',
    },

    /* ---- Scene 5: "now you say it" ---- */
    {
      seconds: 4,
      kind: 'repeat',
      background: 'plain',
      characters: [umayerSide({mood: 'excited', arms: {right: 'wave'}}), safaSide()],
      speech: {who: 'umayer', text: 'এবার তুমি বলো!\nআমার সাথে, ধীরে ধীরে।'},
      dua: {mode: 'full'},
      shorts: true,
    },
    ...repeatPart(0, 'বিস...'),
    ...repeatPart(1, 'মিল...'),
    ...repeatPart(2, 'লাহ!'),
    {
      seconds: 2.5,
      kind: 'repeat',
      background: 'plain',
      characters: [umayerSide({mood: 'excited'}), safaSide()],
      speech: {who: 'umayer', text: 'এবার পুরোটা! বিসমিল্লাহ!'},
      dua: {mode: 'full'},
      shorts: true,
    },
    {
      seconds: 3,
      kind: 'repeat',
      background: 'plain',
      characters: [umayerSide({talking: false}), safaSide()],
      dua: {mode: 'full'},
      silence: true,
      shorts: true,
    },
    {
      seconds: 3,
      kind: 'repeat',
      background: 'plain',
      characters: [umayerSide(), safaSide({mood: 'excited', arms: {right: 'up', left: 'up'}})],
      speech: {who: 'safa', text: 'বিচমিল্লাহ!'},
      dua: {mode: 'full'},
      star: true,
      shorts: true,
    },
    {
      seconds: 3.5,
      kind: 'repeat',
      background: 'plain',
      characters: [umayerSide({mood: 'excited'}), safaSide()],
      speech: {who: 'umayer', text: 'সাফাও পেরেছে! তুমিও পেরেছো!'},
    },
    {
      seconds: 3.5,
      kind: 'repeat',
      background: 'plain',
      characters: [umayerSide({arms: {right: 'up'}}), safaSide({arms: {right: 'up'}})],
      speech: {who: 'umayer', text: 'আর কোন হাতে খাই?\nডান হাত তোলো তো!'},
      props: ['rightHand'],
    },
    {
      seconds: 3,
      kind: 'repeat',
      background: 'plain',
      characters: [umayerSide({arms: {right: 'wave'}, talking: false}), safaSide({arms: {right: 'wave'}})],
      props: ['rightHand'],
      silence: true,
    },

    /* ---- Scene 6: doing it right ---- */
    {
      seconds: 3,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer(), safa(), miu(), ammu({mood: 'calm'})],
      speech: {who: 'umayer', text: 'বিসমিল্লাহ!'},
    },
    {
      seconds: 4,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer({arms: {right: 'eat'}}), safa(), miu(), ammu()],
    },
    {
      seconds: 4,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer({mood: 'excited', arms: {right: 'eat'}}), safa(), miu(), ammu()],
      speech: {who: 'umayer', text: 'মমম! আজকে ভাত আরও মজা লাগছে!'},
    },
    {
      seconds: 4,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer({arms: {right: 'eat'}}), safa(), miu(), ammu()],
      speech: {who: 'ammu', text: 'বরকত, সোনা।\nআল্লাহর নাম নিলে এমনই হয়।'},
    },
    {
      seconds: 4,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer({arms: {right: 'eat'}}), safa({arms: {right: 'eat'}}), miu(), ammu()],
      speech: {who: 'safa', text: 'বিচমিল্লাহ...'},
    },
    {
      seconds: 3,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer(), safa(), miu({nod: true}), ammu()],
      speech: {who: 'miu', text: 'মিউ!'},
    },
    {
      seconds: 4,
      kind: 'story',
      background: 'kitchen',
      characters: [umayer({mood: 'excited'}), safa({mood: 'excited'}), miu(), ammu()],
      speech: {who: 'everyone', label: 'উমায়ের ও সাফা', text: 'মিউও বিসমিল্লাহ বলেছে!'},
    },

    /* ---- Scene 7: wrap-up ---- */
    {
      seconds: 6,
      kind: 'outro',
      background: 'plain',
      characters: [
        {id: 'ammu', x: 0.09, y: 0.98, mood: 'happy'},
        {id: 'umayer', x: 0.21, y: 0.98, mood: 'happy'},
        {id: 'safa', x: 0.31, y: 0.98, mood: 'happy'},
        {id: 'miu', x: 0.39, y: 0.99, mood: 'happy'},
      ],
      speech: {who: 'ammu', text: 'আজ আমরা শিখলাম: খাওয়ার আগে বিসমিল্লাহ।\nডান হাতে। নিজের সামনে থেকে।'},
      dua: {mode: 'card'},
    },
    {
      seconds: 4,
      kind: 'outro',
      background: 'plain',
      characters: [
        {id: 'ammu', x: 0.09, y: 0.98, mood: 'happy'},
        {id: 'umayer', x: 0.21, y: 0.98, mood: 'excited'},
        {id: 'safa', x: 0.31, y: 0.98, mood: 'happy'},
        {id: 'miu', x: 0.39, y: 0.99, mood: 'happy'},
      ],
      speech: {who: 'umayer', text: 'আজ খাওয়ার সময় তুমিও বলবে তো?'},
      dua: {mode: 'card'},
    },
    {
      seconds: 2.5,
      kind: 'outro',
      background: 'plain',
      characters: [
        {id: 'ammu', x: 0.09, y: 0.98, mood: 'happy'},
        {id: 'umayer', x: 0.21, y: 0.98, mood: 'happy'},
        {id: 'safa', x: 0.31, y: 0.98, mood: 'excited'},
        {id: 'miu', x: 0.39, y: 0.99, mood: 'happy'},
      ],
      speech: {who: 'safa', text: 'বলবে!'},
      dua: {mode: 'card'},
    },
    {
      seconds: 5,
      kind: 'outro',
      background: 'plain',
      characters: [
        {id: 'ammu', x: 0.09, y: 0.98, mood: 'happy', arms: {right: 'wave'}},
        {id: 'umayer', x: 0.21, y: 0.98, mood: 'excited', arms: {right: 'wave'}},
        {id: 'safa', x: 0.31, y: 0.98, mood: 'happy', arms: {right: 'wave'}},
        {id: 'miu', x: 0.39, y: 0.99, mood: 'happy'},
      ],
      speech: {who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!'},
      dua: {mode: 'card'},
      shorts: true,
    },
  ],
};

/**
 * Recorded voice lines (written by scripts/attach-audio.mjs) are matched to beats by line number.
 * A beat is stretched to fit its voice line plus a short pause, never shortened.
 */
const lines = voice as Record<string, {file: string; seconds: number}>;
export const ep01: Episode = {
  ...base,
  beats: base.beats.map((b, i) => {
    const v = lines[String(i + 1)];
    return v ? {...b, audio: v.file, seconds: Math.max(b.seconds, v.seconds + 0.6)} : b;
  }),
};
