import clips from './ep18.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP17_CONFIG} from './ep17-clips';

/**
 * Episode 18 "উপরে উঠলে, নিচে নামলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep18-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP18_SCENE_COUNT = 7;

export const EP18_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'মা, আমি স্লাইডে উঠবো!', from: 0.19, to: 0.42, top: 880},
    {type: 'say', who: 'ammu', text: 'ওঠার সময় একটা কথা বলতে হয়!', from: 0.48, to: 0.72, top: 880},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep18Clips = clips as Record<string, SceneMedia>;

export const EP18_CONFIG: ClipConfig = {
  number: 18,
  title: 'উপরে উঠলে, নিচে নামলে কী বলি?',
  dua: {
    name: 'ওঠা-নামার জিকির',
    arabic: 'اللَّهُ أَكْبَرُ · سُبْحَانَ اللَّهِ',
    parts: ['আল্লাহু আকবার', 'সুবহানাল্লাহ'],
    meaning: 'উঠতে: আল্লাহ সবচেয়ে বড় · নামতে: আল্লাহ পবিত্র',
    source: 'সহিহ বুখারি ২৯৯৩',
  },
  previousDua: EP17_CONFIG.dua,
  sceneCount: EP18_SCENE_COUNT,
  clips: ep18Clips,
  overlays: EP18_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [1.0, 7.6],
    7: [3.8, 8.6],
  },
};
