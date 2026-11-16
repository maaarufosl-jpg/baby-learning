import clips from './ep10.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP09_CONFIG} from './ep09-clips';

/**
 * Episode 10 "হাঁচি দিলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep10-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP10_SCENE_COUNT = 7;

export const EP10_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'হা... হা... হাঁচ্চু!', from: 0.2, to: 0.4, top: 880},
    {type: 'say', who: 'ammu', text: 'হাঁচি দিলে হাত দিয়ে মুখ ঢাকতে হয়!', from: 0.61, to: 0.87, top: 880},
  ],
};

export const ep10Clips = clips as Record<string, SceneMedia>;

export const EP10_CONFIG: ClipConfig = {
  number: 10,
  title: 'হাঁচি দিলে কী বলি?',
  dua: {
    name: 'হাঁচির দোয়া',
    arabic: 'الْحَمْدُ لِلَّهِ · يَرْحَمُكَ اللَّهُ',
    parts: ['আলহামদুলিল্লাহ', 'ইয়ারহামুকাল্লাহ'],
    meaning: 'হাঁচি দিলে: সব প্রশংসা আল্লাহর। যে শোনে: আল্লাহ তোমার ওপর রহম করুন',
    source: 'সহিহ বুখারি ৬২২৪',
  },
  previousDua: EP09_CONFIG.dua,
  sceneCount: EP10_SCENE_COUNT,
  clips: ep10Clips,
  overlays: EP10_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [0.8, 8.8],
  },
};
