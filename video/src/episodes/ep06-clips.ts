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
  // Ma says the parts at about 0.6s, 2.0s and 3.0s; then they go over it again together.
  5: [
    {type: 'dua', mode: 'broken', from: 0.03, to: 0.45, pop: true, align: 'right', scale: 0.5, times: [0.06, 0.2, 0.3]},
    {type: 'dua', mode: 'full', from: 0.45, showMeaning: true, pop: false, align: 'right', scale: 0.5},
    {type: 'star', at: 0.5},
  ],
  // Mirrored: Gemini pointed at and lifted his right foot; seen from behind, the flip makes it his left foot.
  6: [{type: 'say', who: 'ammu', text: 'আর ঢুকি বাম পা দিয়ে।', from: 0.18, to: 0.5, top: 880}],
  7: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.03, to: 0.2},
    {type: 'repeat', parts: [0.23, 0.55, 0.72], until: 1, align: 'right'},
  ],
  // Mirrored: facing the camera, Safa lifted her right foot.
  8: [
    {type: 'say', who: 'safa', text: 'বাম পা!', from: 0.13, to: 0.32, top: 880},
    {type: 'say', who: 'umayer', text: 'মাশাআল্লাহ, সাফা!', from: 0.52, to: 0.7, top: 880},
  ],
  9: [
    {type: 'say', who: 'ammu', text: 'মাশাআল্লাহ!', from: 0.23, to: 0.35, top: 880},
    {type: 'say', who: 'ammu', text: 'আর বের হওয়ার দোয়া\nশিখব পরের পর্বে।', from: 0.37, to: 0.6, top: 740},
  ],
  10: [
    {type: 'say', who: 'umayer', text: 'মিউ, তুমিও বাম পা আগে!', from: 0.26, to: 0.56, top: 880},
    {type: 'say', who: 'miu', text: 'মিউ!', from: 0.68, to: 0.77, top: 880},
  ],
  11: [
    {type: 'say', who: 'umayer', text: 'বাথরুমে ঢোকার আগে\nতুমিও বলবে তো?', from: 0.05, to: 0.44},
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.49, to: 0.86},
    {type: 'card', from: 0.08},
  ],
};

export const ep06Clips = clips as Record<string, SceneMedia>;

export const EP06_CONFIG: ClipConfig = {
  number: 6,
  title: 'বাথরুমে যাওয়ার আগে',
  dua: {
    name: 'বাথরুমে ঢোকার দোয়া',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    parts: ['আল্লাহুম্মা ইন্নী আউযু বিকা', 'মিনাল খুবুসি', 'ওয়াল খাবাইস'],
    meaning: 'হে আল্লাহ, আমি তোমার কাছে সব খারাপ থেকে আশ্রয় চাই',
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
    5: [0.4, 9.8],
    6: [1.5, 5.05],
    // Keeps its ending: the pause for the child to say it.
    7: [0.1, 10.0],
    8: [0.9, 7.2],
    // Ends before the last shot, where an open door at the left showed the toilet.
    9: [0.6, 6.1],
    10: [0.3, 8.0],
    11: [0.3, 9.8],
  },
};
