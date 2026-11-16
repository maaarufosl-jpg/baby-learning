import clips from './ep11.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP10_CONFIG} from './ep10-clips';

/**
 * Episode 11 "পানি কীভাবে খাই?" from Gemini clips (scene numbers follow episodes/ep11-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP11_SCENE_COUNT = 7;

export const EP11_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'খুক খুক!', from: 0.35, to: 0.5, top: 880},
    {type: 'say', who: 'ammu', text: 'আস্তে আস্তে! বসে পানি খাই।', from: 0.61, to: 0.84, top: 880},
  ],
  3: [
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ', from: 0.18, to: 0.5, top: 880},
    {type: 'say', who: 'ammu', text: 'বসে, ডান হাতে পানি খেতে শিখিয়েছেন।', from: 0.52, to: 0.76, top: 880},
    {type: 'footnote', text: 'সহিহ মুসলিম ২০২০, ২০২৪'},
  ],
  // The source clip has the middle of his long drink (3.2-6.0s) cut out; the original is in assets/scene-originals.
  4: [
    {type: 'dua', mode: 'broken', from: 0.1, to: 1, pop: true, align: 'right', scale: 0.55, times: [0.151, 0.616]},
    {type: 'say', who: 'narrator', label: 'অর্থ', text: 'বিসমিল্লাহ: আল্লাহর নামে', from: 0.32, to: 0.6, top: 880},
    {type: 'say', who: 'narrator', label: 'অর্থ', text: 'আলহামদুলিল্লাহ: সব প্রশংসা আল্লাহর', from: 0.66, to: 1, top: 880},
  ],
};

export const ep11Clips = clips as Record<string, SceneMedia>;

export const EP11_CONFIG: ClipConfig = {
  number: 11,
  title: 'পানি কীভাবে খাই?',
  dua: {
    name: 'পানি খাওয়ার দোয়া',
    arabic: 'بِسْمِ اللَّهِ · الْحَمْدُ لِلَّهِ',
    parts: ['বিসমিল্লাহ', 'আলহামদুলিল্লাহ'],
    meaning: 'শুরুতে: আল্লাহর নামে। শেষে: সব প্রশংসা আল্লাহর',
    source: 'সহিহ মুসলিম ২০২০, ২০২৪, ২৭৩৪',
  },
  previousDua: EP10_CONFIG.dua,
  sceneCount: EP11_SCENE_COUNT,
  clips: ep11Clips,
  overlays: EP11_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [0.3, 8.6],
    3: [0.8, 8.0],
    4: [0.6, 6.0],
  },
};
