import clips from './ep29.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP28_CONFIG} from './ep28-clips';

/**
 * Episode 29 "বন্ধু ভালো কিছু পেলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep29-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP29_SCENE_COUNT = 7;

export const EP29_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'ওয়াও জুনায়েদ, নতুন সাইকেল!', from: 0.25, to: 0.5, top: 880},
    {type: 'say', who: 'junayed', text: 'আব্বু কিনে দিয়েছেন!', from: 0.51, to: 0.69, top: 880},
  ],
  // The bubbles sit higher so the source note below does not touch them.
  3: [
    {type: 'say', who: 'ammu', text: 'বন্ধু ভালো কিছু পেলে দোয়া করি,\nবারাকাল্লাহু লাকা।', from: 0.13, to: 0.43, top: 730},
    {type: 'say', who: 'ammu', text: 'মানে,\nআল্লাহ তোমার জন্য বরকত দিন।', from: 0.47, to: 0.87, top: 730},
    {type: 'footnote', text: 'সহিহ বুখারি ৫১৫৫'},
  ],
  // After the two parts Umayer says it whole, under the full panel with the meaning.
  4: [
    {type: 'dua', mode: 'broken', from: 0.05, to: 0.6, pop: true, align: 'right', scale: 0.55, times: [0.069, 0.356]},
    {type: 'dua', mode: 'full', from: 0.6, showMeaning: true, pop: false, align: 'right', scale: 0.47},
  ],
  5: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.11, to: 0.33},
    {type: 'repeat', parts: [0.366, 0.634], until: 1, align: 'right'},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep29Clips = clips as Record<string, SceneMedia>;

export const EP29_CONFIG: ClipConfig = {
  number: 29,
  title: 'বন্ধু ভালো কিছু পেলে কী বলি?',
  dua: {
    name: 'বরকতের দোয়া',
    arabic: 'بَارَكَ اللَّهُ لَكَ',
    parts: ['বারাকাল্লাহু', 'লাকা'],
    meaning: 'আল্লাহ তোমার জন্য বরকত দিন',
    source: 'সহিহ বুখারি ৫১৫৫',
  },
  previousDua: EP28_CONFIG.dua,
  sceneCount: EP29_SCENE_COUNT,
  clips: ep29Clips,
  overlays: EP29_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [0.3, 7.0],
    3: [1.0, 9.0],
    4: [0.4, 8.6],
    5: [0.8, 7.7],
    7: [3.8, 8.6],
  },
};
