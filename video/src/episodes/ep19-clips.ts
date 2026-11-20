import clips from './ep19.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP18_CONFIG} from './ep18-clips';

/**
 * Episode 19 "ঘরে ঢুকলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep19-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP19_SCENE_COUNT = 7;

export const EP19_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'ammu', text: 'উমায়ের, ঘরে ঢুকে কী বলতে হয়?', from: 0.33, to: 0.61, top: 880},
    {type: 'say', who: 'umayer', text: 'কী বলতে হয়, মা?', from: 0.65, to: 0.86, top: 880},
  ],
  // The bubbles sit a little higher so the source note below does not touch them.
  3: [
    {type: 'say', who: 'ammu', text: 'ঘরে ঢোকার সময় বলি,\nবিসমিল্লাহ।', from: 0.12, to: 0.35, top: 780},
    {type: 'say', who: 'ammu', text: 'তারপর সবাইকে সালাম দিই,\nআসসালামু আলাইকুম।', from: 0.37, to: 0.72, top: 780},
    {type: 'footnote', text: 'সহিহ মুসলিম ২০১৮, সূরা নূর ২৪:৬১'},
  ],
  // Ma answers the salam twice in the clip; the scene ends after her first answer.
  4: [
    {type: 'dua', mode: 'broken', from: 0.25, to: 0.6, pop: true, align: 'right', scale: 0.55, times: [0.297, 0.436]},
    {type: 'dua', mode: 'full', from: 0.6, showMeaning: true, pop: false, align: 'right', scale: 0.55},
    {type: 'say', who: 'ammu', text: 'ওয়া আলাইকুমুস সালাম!', from: 0.62, to: 0.8, top: 880},
  ],
  5: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.1, to: 0.31},
    {type: 'repeat', parts: [0.337, 0.525], until: 1, align: 'right'},
  ],
  6: [
    {type: 'say', who: 'safa', text: 'ওয়া আলাইকুমুস সালাম, ভাইয়া!', from: 0.15, to: 0.37, top: 880},
    {type: 'say', who: 'umayer', text: 'সাফা, তুমিও বলবে তো!', from: 0.6, to: 0.83, top: 880},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep19Clips = clips as Record<string, SceneMedia>;

export const EP19_CONFIG: ClipConfig = {
  number: 19,
  title: 'ঘরে ঢুকলে কী বলি?',
  dua: {
    name: 'ঘরে ঢোকার সময়',
    arabic: 'بِسْمِ اللَّهِ · السَّلَامُ عَلَيْكُمْ',
    parts: ['বিসমিল্লাহ', 'আসসালামু আলাইকুম'],
    meaning: 'আল্লাহর নামে · তোমাদের ওপর শান্তি হোক',
    source: 'সহিহ মুসলিম ২০১৮, সূরা নূর ২৪:৬১',
  },
  previousDua: EP18_CONFIG.dua,
  sceneCount: EP19_SCENE_COUNT,
  clips: ep19Clips,
  overlays: EP19_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [0.3, 8.8],
    3: [0.9, 7.6],
    4: [1.2, 8.1],
    5: [0.8, 8.0],
    6: [0.8, 8.5],
    7: [3.8, 8.6],
  },
};
