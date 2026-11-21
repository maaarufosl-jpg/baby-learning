import clips from './ep22.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP21_CONFIG} from './ep21-clips';

/**
 * Episode 22 "মা-বাবার জন্য কী দোয়া করি?" from Gemini clips (scene numbers follow episodes/ep22-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP22_SCENE_COUNT = 7;

export const EP22_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'মা, তুমি কি ক্লান্ত?\nআমি সাহায্য করি!', from: 0.27, to: 0.61, top: 780},
    {type: 'say', who: 'ammu', text: 'জাযাকাল্লাহু খাইরান, বাবা!', from: 0.64, to: 0.84, top: 880},
  ],
  // The bubbles sit a little higher so the source note below does not touch them.
  3: [
    {type: 'say', who: 'ammu', text: 'মা-বাবার জন্য আল্লাহ\nএকটা দোয়া শিখিয়েছেন।', from: 0.12, to: 0.44, top: 780},
    {type: 'say', who: 'ammu', text: 'রাব্বির হামহুমা\nকামা রাব্বায়ানি সাগিরা।', from: 0.5, to: 0.95, top: 780},
    {type: 'footnote', text: 'সূরা বনি ইসরাইল ১৭:২৪'},
  ],
  // Umayer raises his hands in dua at the end, under the full panel with the meaning.
  4: [
    {type: 'dua', mode: 'broken', from: 0.08, to: 0.75, pop: true, align: 'right', scale: 0.55, times: [0.119, 0.356, 0.554]},
    {type: 'dua', mode: 'full', from: 0.75, showMeaning: true, pop: false, align: 'right', scale: 0.55},
  ],
  5: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.1, to: 0.32},
    {type: 'repeat', parts: [0.347, 0.594, 0.842], until: 1, align: 'right'},
  ],
  6: [
    {type: 'say', who: 'safa', text: 'মা, তোমাকে ভালোবাসি!', from: 0.28, to: 0.5, top: 880},
    {type: 'say', who: 'ammu', text: 'আমিও তোমাদের ভালোবাসি!', from: 0.69, to: 0.87, top: 880},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep22Clips = clips as Record<string, SceneMedia>;

export const EP22_CONFIG: ClipConfig = {
  number: 22,
  title: 'মা-বাবার জন্য কী দোয়া করি?',
  dua: {
    name: 'মা-বাবার জন্য দোয়া',
    arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    parts: ['রাব্বির হামহুমা', 'কামা রাব্বায়ানি', 'সাগিরা'],
    meaning: 'হে আমার রব, তাঁদের প্রতি দয়া করো, যেমন তাঁরা ছোটবেলায় আমাকে লালন-পালন করেছেন',
    source: 'সূরা বনি ইসরাইল ১৭:২৪',
  },
  previousDua: EP21_CONFIG.dua,
  sceneCount: EP22_SCENE_COUNT,
  clips: ep22Clips,
  overlays: EP22_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [0.8, 8.6],
    3: [0.9, 9.8],
    4: [0.8, 9.8],
    5: [0.7, 10.0],
    6: [1.0, 9.6],
    7: [3.8, 8.6],
  },
};
