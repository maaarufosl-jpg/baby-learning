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
    7: [3.8, 8.6],
  },
};
