import clips from './ep06.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP05_CONFIG} from './ep05-clips';

/**
 * Episode 6 "বাথরুমে যাওয়ার আগে" from Gemini clips (scene numbers follow episodes/ep06-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP06_SCENE_COUNT = 11;

export const EP06_OVERLAYS: Record<number, ClipOverlay[]> = {
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.15, to: 0.6, top: 860},
    {type: 'recap', from: 0.62, to: 1},
  ],
  2: [{type: 'say', who: 'umayer', text: 'মা, আমি বাথরুমে যাব!', from: 0.54, to: 0.76, top: 880}],
  // Gemini opened the door onto the toilet at 3.25-3.96s; that part is cut out of the clip itself.
  3: [{type: 'say', who: 'umayer', text: 'কোন পা আগে দেব?', from: 0.57, to: 0.75, top: 880}],
  4: [
    {type: 'say', who: 'ammu', text: 'থামো সোনা।', from: 0.28, to: 0.39, top: 880},
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ বাথরুমে ঢোকার আগে', from: 0.41, to: 0.66, top: 880},
    {type: 'say', who: 'ammu', text: 'একটা দোয়া পড়তেন।', from: 0.67, to: 0.9, top: 880},
    {type: 'footnote', text: 'সহিহ বুখারি ১৪২, সহিহ মুসলিম ৩৭৫'},
  ],
  // Ma says each part and Umayer echoes it. The clip is cut to 2.2-7.0s: before that they said "বিসমিল্লাহ",
  // and after it Umayer repeated the whole line with "বিসমিল্লাহ", which this episode does not teach.
  5: [
    {type: 'dua', mode: 'broken', from: 0.2, to: 0.62, pop: true, align: 'right', times: [0.22, 0.39, 0.56]},
    {type: 'dua', mode: 'full', from: 0.62, showMeaning: true, pop: false, align: 'right'},
    {type: 'star', at: 0.64},
  ],
};

export const ep06Clips = clips as Record<string, SceneMedia>;

export const EP06_CONFIG: ClipConfig = {
  number: 6,
  title: 'বাথরুমে যাওয়ার আগে',
  dua: {
    name: 'বাথরুমে ঢোকার দোয়া',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ',
    parts: ['আল্লাহুম্মা', 'ইন্নী আউযু', 'বিকা'],
    meaning: 'হে আল্লাহ, আমি তোমার কাছে আশ্রয় চাই',
    source: 'সহিহ বুখারি ১৪২, সহিহ মুসলিম ৩৭৫',
  },
  previousDua: EP05_CONFIG.dua,
  sceneCount: EP06_SCENE_COUNT,
  clips: ep06Clips,
  overlays: EP06_OVERLAYS,
  // The opening greeting is shared with episode 1.
  borrowClip: {1: {file: 'clips/ep01/_ready/scene01.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    1: [0.3, 8.9],
    2: [1.0, 7.8],
    3: [0.5, 8.0],
    4: [1.2, 9.2],
    5: [2.2, 7.0],
  },
};
