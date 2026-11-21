import clips from './ep23.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP22_CONFIG} from './ep22-clips';

/**
 * Episode 23 "আকাশে চাঁদ-তারা দেখলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep23-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP23_SCENE_COUNT = 7;

export const EP23_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'মা, দেখো! কত তারা!\nকত বড় চাঁদ!', from: 0.35, to: 0.8, top: 780},
  ],
  // The bubbles sit a little higher so the source note below does not touch them.
  3: [
    {type: 'say', who: 'ammu', text: 'এগুলো সব আল্লাহ বানিয়েছেন।', from: 0.17, to: 0.4, top: 830},
    {type: 'say', who: 'ammu', text: 'তাই আমরা বলি,\nসুবহানাল্লাহি ওয়া বিহামদিহি।', from: 0.5, to: 0.91, top: 730},
    {type: 'footnote', text: 'সহিহ বুখারি ৬৪০৬, সহিহ মুসলিম ২৬৯৪'},
  ],
  // After the two parts Umayer points at the stars and says it whole, under the full panel.
  4: [
    {type: 'dua', mode: 'broken', from: 0.09, to: 0.67, pop: true, align: 'right', scale: 0.55, times: [0.129, 0.356]},
    {type: 'dua', mode: 'full', from: 0.67, showMeaning: true, pop: false, align: 'right', scale: 0.55},
  ],
  5: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.06, to: 0.3},
    {type: 'repeat', parts: [0.356, 0.653], until: 1, align: 'right'},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep23Clips = clips as Record<string, SceneMedia>;

export const EP23_CONFIG: ClipConfig = {
  number: 23,
  title: 'আকাশে চাঁদ-তারা দেখলে কী বলি?',
  dua: {
    name: 'আল্লাহর প্রশংসা',
    arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    parts: ['সুবহানাল্লাহি', 'ওয়া বিহামদিহি'],
    meaning: 'আল্লাহ পবিত্র, সব প্রশংসা তাঁর',
    source: 'সহিহ বুখারি ৬৪০৬, সহিহ মুসলিম ২৬৯৪',
  },
  previousDua: EP22_CONFIG.dua,
  sceneCount: EP23_SCENE_COUNT,
  clips: ep23Clips,
  overlays: EP23_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [1.5, 8.6],
    3: [1.3, 9.4],
    4: [0.8, 9.9],
    5: [0.4, 8.4],
    7: [3.8, 8.6],
  },
};
