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
  3: [
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ শিখিয়েছেন,', from: 0.13, to: 0.35, top: 880},
    {type: 'say', who: 'ammu', text: 'হাঁচি দিলে বলি আলহামদুলিল্লাহ।', from: 0.36, to: 0.64, top: 880},
    {type: 'say', who: 'ammu', text: 'আর যে শোনে, সে বলে ইয়ারহামুকাল্লাহ।', from: 0.66, to: 0.93, top: 880},
    {type: 'footnote', text: 'সহিহ বুখারি ৬২২৪'},
  ],
  // Umayer says the first word after his sneeze, Ma answers with the second.
  4: [
    {type: 'dua', mode: 'broken', from: 0.2, to: 1, pop: true, align: 'right', scale: 0.55, times: [0.267, 0.396]},
    {type: 'say', who: 'narrator', label: 'অর্থ', text: 'ইয়ারহামুকাল্লাহ: আল্লাহ তোমার ওপর রহম করুন', from: 0.42, to: 1, top: 880},
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
    3: [1.0, 9.6],
    // Ends before Umayer's long laugh and Ma's second "ইয়ারহামুকাল্লাহ".
    4: [0.6, 6.0],
  },
};
