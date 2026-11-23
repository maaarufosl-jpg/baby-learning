import clips from './ep28.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP27_CONFIG} from './ep27-clips';

/**
 * Episode 28 "ভয় পেলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep28-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP28_SCENE_COUNT = 7;

export const EP28_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'মা! আমার ভয় করছে!', from: 0.27, to: 0.55, top: 880},
    {type: 'say', who: 'ammu', text: 'ভয় নেই, বাবা। আমি আছি।', from: 0.62, to: 0.86, top: 880},
  ],
  // The bubbles sit higher so the source note below does not touch them.
  3: [
    {type: 'say', who: 'ammu', text: "ভয় পেলে বলি,\nহাসবুনাল্লাহু ওয়া নি'মাল ওয়াকিল।", from: 0.15, to: 0.56, top: 730},
    {type: 'say', who: 'ammu', text: 'আল্লাহই আমাদের জন্য যথেষ্ট।', from: 0.58, to: 0.8, top: 830},
    {type: 'footnote', text: 'সূরা আলে ইমরান ৩:১৭৩, সহিহ বুখারি ৪৫৬৩'},
  ],
  4: [
    {type: 'dua', mode: 'broken', from: 0.13, to: 0.74, pop: true, align: 'right', scale: 0.55, times: [0.149, 0.347, 0.574]},
    {type: 'dua', mode: 'full', from: 0.74, showMeaning: true, pop: false, align: 'right', scale: 0.5},
  ],
  5: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.1, to: 0.32},
    {type: 'repeat', parts: [0.356, 0.594, 0.782], until: 1, align: 'right'},
  ],
  6: [
    {type: 'say', who: 'umayer', text: "সাফা, ভয় নেই!\nহাসবুনাল্লাহু ওয়া নি'মাল ওয়াকিল!", from: 0.23, to: 0.64, top: 780},
    {type: 'say', who: 'safa', text: 'আর ভয় নাই!', from: 0.65, to: 0.82, top: 880},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep28Clips = clips as Record<string, SceneMedia>;

export const EP28_CONFIG: ClipConfig = {
  number: 28,
  title: 'ভয় পেলে কী বলি?',
  dua: {
    name: 'ভয় পেলে',
    arabic: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ',
    parts: ['হাসবুনাল্লাহু', "ওয়া নি'মাল", 'ওয়াকিল'],
    meaning: 'আল্লাহই আমাদের জন্য যথেষ্ট, আর তিনি কত উত্তম অভিভাবক',
    source: 'সূরা আলে ইমরান ৩:১৭৩, সহিহ বুখারি ৪৫৬৩',
  },
  previousDua: EP27_CONFIG.dua,
  sceneCount: EP28_SCENE_COUNT,
  clips: ep28Clips,
  overlays: EP28_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [0.3, 9.0],
    3: [0.8, 8.4],
    4: [1.0, 9.6],
    5: [0.7, 9.6],
    6: [0.3, 9.0],
    7: [3.8, 8.6],
  },
};
