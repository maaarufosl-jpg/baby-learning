import clips from './ep02.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {ep01} from './ep01';

/**
 * Episode 2 "খাওয়ার পর শুকরিয়া" from Gemini clips (scene numbers follow episodes/ep02-gemini-copy.md).
 * Times are fractions of the scene's length (0 = start, 1 = end).
 */
export const EP02_SCENE_COUNT = 12;

export const EP02_OVERLAYS: Record<number, ClipOverlay[]> = {
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.15, to: 0.6, top: 860},
    {type: 'recap', from: 0.62, to: 1},
  ],
  2: [{type: 'say', who: 'safa', text: 'মজা!', from: 0.2, to: 0.5, top: 880}],
  3: [{type: 'say', who: 'umayer', text: 'সাফা, দাঁড়াও!', from: 0.45, to: 0.8, top: 880}],
  4: [{type: 'say', who: 'umayer', text: 'খাওয়ার পর কী বলি, মনে আছে?', from: 0.2, to: 0.6, top: 880}],
  5: [
    {type: 'say', who: 'ammu', text: 'খাওয়া শেষে আমরা আল্লাহর শুকরিয়া করি।', from: 0.1, to: 0.55, top: 880},
    {type: 'say', who: 'ammu', text: 'বলি, আলহামদুলিল্লাহ।', from: 0.55, to: 1, top: 880},
  ],
  6: [
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ বলেছেন,', from: 0.08, to: 0.45, top: 880},
    {type: 'say', who: 'ammu', text: 'খেয়ে আলহামদুলিল্লাহ বললে\nআল্লাহ খুশি হন।', from: 0.45, to: 1, top: 740},
    {type: 'footnote', text: 'সহিহ মুসলিম ২৭৩৪'},
  ],
  7: [
    {type: 'dua', mode: 'full', from: 0.02, to: 0.13, pop: true, align: 'right'},
    {type: 'dua', mode: 'broken', from: 0.13, to: 0.69, pop: false, align: 'right', times: [0.14, 0.3, 0.39, 0.46, 0.56]},
    {type: 'dua', mode: 'full', from: 0.69, showMeaning: true, pop: false, align: 'right'},
    {type: 'star', at: 0.73},
  ],
  8: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.12, to: 0.27},
    {type: 'repeat', parts: [0.28, 0.39, 0.46, 0.53, 0.59], until: 0.76},
  ],
  9: [
    {type: 'say', who: 'safa', text: 'আলহামদুলিল্লা!', from: 0.12, to: 0.45, top: 880},
    {type: 'say', who: 'umayer', text: 'সাফা পেরেছে! তুমিও পেরেছো!', from: 0.45, to: 0.95, top: 880},
    {type: 'star', at: 0.2},
  ],
  10: [
    {type: 'say', who: 'safa', text: 'আলহামদুলিল্লাহ!', from: 0.2, to: 0.45, top: 880},
    {type: 'say', who: 'ammu', text: 'মাশাআল্লাহ, সোনা!', from: 0.7, to: 1, top: 880},
  ],
  11: [
    {type: 'say', who: 'miu', text: 'মিউ!', from: 0.37, to: 0.46, top: 880},
    {type: 'say', who: 'everyone', label: 'উমায়ের ও সাফা', text: 'মিউ, তুমিও বলো আলহামদুলিল্লাহ!', from: 0.46, to: 0.9, top: 880},
  ],
  12: [
    {type: 'say', who: 'umayer', text: 'খাওয়ার পর তুমিও বলবে তো?', from: 0.07, to: 0.33},
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.34, to: 0.8},
    {type: 'card', from: 0.08},
  ],
};

export const ep02Clips = clips as Record<string, SceneMedia>;

export const EP02_CONFIG: ClipConfig = {
  number: 2,
  title: 'খাওয়ার পর শুকরিয়া',
  dua: {
    name: 'খাওয়ার পরের দোয়া',
    arabic: 'الْحَمْدُ لِلَّهِ',
    parts: ['আল', 'হাম', 'দু', 'লিল', 'লাহ'],
    meaning: 'সব প্রশংসা আল্লাহর',
    source: 'সহিহ মুসলিম ২৭৩৪',
  },
  previousDua: ep01.dua,
  sceneCount: EP02_SCENE_COUNT,
  clips: ep02Clips,
  overlays: EP02_OVERLAYS,
  // The opening greeting is shared with episode 1.
  borrowClip: {1: {file: 'clips/ep01/_ready/scene01.mp4', seconds: 10.1}},
};
