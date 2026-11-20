import clips from './ep21.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP20_CONFIG} from './ep20-clips';

/**
 * Episode 21 "কিছু হারিয়ে গেলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep21-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP21_SCENE_COUNT = 7;

export const EP21_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'আমার বেলুন! উড়ে গেল!', from: 0.6, to: 0.86, top: 880},
  ],
  // The bubble sits higher so the source note below does not touch it.
  3: [
    {type: 'say', who: 'ammu', text: 'কিছু হারিয়ে গেলে বলি,\nইন্না লিল্লাহি ওয়া ইন্না ইলাইহি রাজিউন।', from: 0.37, to: 0.88, top: 730},
    {type: 'footnote', text: 'সূরা বাকারা ২:১৫৬, সহিহ মুসলিম ৯১৮'},
  ],
  // The clip briefly shows two Umayers while the camera pans; the first 2.7s are zoomed in on the right
  // (assets/scene-originals/ep21/scene04.mp4 is the untouched clip).
  4: [
    {type: 'dua', mode: 'broken', from: 0.0, to: 1, pop: true, align: 'right', scale: 0.55, times: [0.03, 0.455, 0.782]},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep21Clips = clips as Record<string, SceneMedia>;

export const EP21_CONFIG: ClipConfig = {
  number: 21,
  title: 'কিছু হারিয়ে গেলে কী বলি?',
  dua: {
    name: 'কিছু হারিয়ে গেলে',
    arabic: 'إِنَّا لِلَّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ',
    parts: ['ইন্না লিল্লাহি', 'ওয়া ইন্না ইলাইহি', 'রাজিউন'],
    meaning: 'নিশ্চয়ই আমরা আল্লাহর, আর তাঁর কাছেই ফিরে যাব',
    source: 'সূরা বাকারা ২:১৫৬, সহিহ মুসলিম ৯১৮',
  },
  previousDua: EP20_CONFIG.dua,
  sceneCount: EP21_SCENE_COUNT,
  clips: ep21Clips,
  overlays: EP21_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [1.0, 8.9],
    3: [2.4, 9.1],
    4: [0.1, 10.0],
    7: [3.8, 8.6],
  },
};
