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
  2: [
    {type: 'say', who: 'umayer', text: 'আলহামদু লিল্লাহিল্লাযী আহইয়ানা!', from: 0.32, to: 0.68, top: 880},
    {type: 'say', who: 'umayer', text: 'সকাল হয়ে গেছে!', from: 0.72, to: 0.9, top: 880},
  ],
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
  // Umayer says the parts at about 1.1s, 1.8s and 2.9s, then Safa at about 4.5s, 5.7s and 6.7s.
  // The panel also hides an empty white box Gemini drew at the top right.
  7: [
    {type: 'dua', mode: 'broken', from: 0.02, to: 0.43, pop: true, align: 'right', times: [0.11, 0.18, 0.29]},
    {type: 'dua', mode: 'broken', from: 0.43, to: 0.73, pop: false, align: 'right', times: [0.45, 0.56, 0.66]},
    {type: 'dua', mode: 'full', from: 0.73, showMeaning: true, pop: false, align: 'right'},
    {type: 'star', at: 0.75},
  ],
};

export const ep05Clips = clips as Record<string, SceneMedia>;

export const EP05_CONFIG: ClipConfig = {
  number: 5,
  title: 'সকালে উঠে',
  dua: {
    name: 'ঘুম থেকে উঠার দোয়া',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا',
    parts: ['আলহামদু', 'লিল্লাহিল্লাযী', 'আহইয়ানা'],
    meaning: 'সব প্রশংসা আল্লাহর, যিনি আমাদের জাগিয়ে তুললেন',
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
    // Gemini dissolves to another angle at about 9s.
    2: [1.0, 8.85],
    // Ends on Umayer's worried face: after 6.6s Gemini had Umayer also say "ভাইয়া".
    3: [0.3, 6.55],
    4: [0.4, 8.5],
    5: [0.6, 6.6],
    6: [1.0, 7.9],
    7: [0.5, 8.0],
  },
};
