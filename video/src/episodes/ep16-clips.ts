import clips from './ep16.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP15_CONFIG} from './ep15-clips';

/**
 * Episode 16 "ঘর থেকে বের হলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep16-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP16_SCENE_COUNT = 8;

export const EP16_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'চলো, পার্কে যাই!', from: 0.35, to: 0.5, top: 880},
    {type: 'say', who: 'ammu', text: 'দাঁড়াও! আগে একটা দোয়া পড়ি।', from: 0.52, to: 0.74, top: 880},
  ],
  // The bubbles sit a little higher so the long source note below does not touch them.
  3: [
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ', from: 0.16, to: 0.38, top: 830},
    {type: 'say', who: 'ammu', text: 'ঘর থেকে বের হওয়ার সময় বলতেন,', from: 0.39, to: 0.6, top: 830},
    {type: 'say', who: 'ammu', text: 'বিসমিল্লাহি তাওয়াক্কালতু আলাল্লাহ।', from: 0.63, to: 0.87, top: 830},
    {type: 'footnote', text: 'আবু দাউদ ৫০৯৫, তিরমিজি ৩৪২৬'},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  8: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep16Clips = clips as Record<string, SceneMedia>;

export const EP16_CONFIG: ClipConfig = {
  number: 16,
  title: 'ঘর থেকে বের হলে কী বলি?',
  dua: {
    name: 'ঘর থেকে বের হওয়ার দোয়া',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ',
    parts: ['বিসমিল্লাহি', 'তাওয়াক্কালতু', 'আলাল্লাহ'],
    meaning: 'আল্লাহর নামে, আল্লাহর ওপর ভরসা করলাম',
    source: 'আবু দাউদ ৫০৯৫, তিরমিজি ৩৪২৬',
  },
  previousDua: EP15_CONFIG.dua,
  sceneCount: EP16_SCENE_COUNT,
  clips: ep16Clips,
  overlays: EP16_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 8: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [1.5, 7.8],
    3: [1.0, 9.0],
    8: [3.8, 8.6],
  },
};
