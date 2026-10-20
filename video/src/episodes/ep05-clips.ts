import clips from './ep05.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP04_CONFIG} from './ep04-clips';

/**
 * Episode 5 "সকালে উঠে" from Gemini clips (scene numbers follow episodes/ep05-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP05_SCENE_COUNT = 12;

export const EP05_OVERLAYS: Record<number, ClipOverlay[]> = {
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.15, to: 0.6, top: 860},
    {type: 'recap', from: 0.62, to: 1},
  ],
  // Umayer says the full dua on waking: parts at about 3.8s, 5.9s and 8.1s.
  2: [{type: 'say', who: 'umayer', text: "আলহামদু লিল্লাহিল্লাযী আহইয়ানা,\nবা'দা মা আমাতানা, ওয়া ইলাইহিন নুশূর!", from: 0.37, to: 0.98, top: 740}],
  3: [{type: 'say', who: 'safa', text: 'উঁউঁ... ভাইয়া...', from: 0.15, to: 0.4, top: 880}],
  4: [
    {type: 'say', who: 'umayer', text: 'কাঁদে না, সাফা।', from: 0.29, to: 0.48, top: 880},
    {type: 'say', who: 'umayer', text: 'এসো, একটা দোয়া শেখাই।', from: 0.5, to: 0.78, top: 880},
  ],
  5: [{type: 'say', who: 'umayer', text: 'ঘুম থেকে উঠে আমরা\nআল্লাহর শুকরিয়া করি।', from: 0.09, to: 0.45, top: 740}],
  6: [
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ ঘুম থেকে উঠে', from: 0.29, to: 0.55, top: 880},
    {type: 'say', who: 'ammu', text: 'এই দোয়া পড়তেন।', from: 0.56, to: 0.78, top: 880},
    {type: 'footnote', text: 'সহিহ বুখারি ৬৩১২, ৬৩১৪'},
  ],
  9: [
    {type: 'say', who: 'safa', text: 'আলহামদুলিল্লা... আহইয়ানা!', from: 0.13, to: 0.37, top: 880},
    {type: 'say', who: 'umayer', text: 'মাশাআল্লাহ, সাফা!', from: 0.39, to: 0.56, top: 880},
    {type: 'star', at: 0.2},
  ],
  10: [
    {type: 'say', who: 'ammu', text: 'মাশাআল্লাহ!', from: 0.24, to: 0.37, top: 880},
    {type: 'say', who: 'ammu', text: 'আজ আমার উমায়ের ছোট্ট শিক্ষক!', from: 0.39, to: 0.64, top: 880},
  ],
  11: [
    {type: 'say', who: 'safa', text: 'মিউ, তুমিও বলো!', from: 0.19, to: 0.42, top: 880},
    {type: 'say', who: 'miu', text: 'মিউ!', from: 0.67, to: 0.77, top: 880},
  ],
  // Gemini said "পাব" for "পর্বে"; from 6.15s to 8s the sound is episode 2's goodbye line.
  12: [
    {type: 'say', who: 'umayer', text: 'সকালে উঠে তুমিও বলবে তো?', from: 0.13, to: 0.36},
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.41, to: 0.8},
    {type: 'card', from: 0.08},
  ],
};

export const ep05Clips = clips as Record<string, SceneMedia>;

export const EP05_CONFIG: ClipConfig = {
  number: 5,
  title: 'সকালে উঠে',
  dua: {
    name: 'ঘুম থেকে উঠার দোয়া',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    parts: ['আলহামদু লিল্লাহিল্লাযী আহইয়ানা', "বা'দা মা আমাতানা", 'ওয়া ইলাইহিন নুশূর'],
    meaning: 'সব প্রশংসা আল্লাহর, যিনি ঘুমের পর আমাদের জাগালেন; আর তাঁর কাছেই ফিরে যাব',
    source: 'সহিহ বুখারি ৬৩১২, ৬৩১৪',
  },
  previousDua: EP04_CONFIG.dua,
  sceneCount: EP05_SCENE_COUNT,
  clips: ep05Clips,
  overlays: EP05_OVERLAYS,
  // The opening greeting is shared with episode 1.
  borrowClip: {1: {file: 'clips/ep01/_ready/scene01.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    1: [0.3, 8.9],
    // Ends on Umayer's worried face: after 6.6s Gemini had Umayer also say "ভাইয়া".
    3: [0.3, 6.55],
    4: [0.4, 8.5],
    5: [0.6, 6.6],
    6: [1.0, 7.9],
    9: [1.0, 7.0],
    10: [0.8, 7.6],
    11: [0.3, 7.8],
    12: [0.3, 9.8],
  },
};
