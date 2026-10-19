import clips from './ep04.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP03_CONFIG} from './ep03-clips';

/**
 * Episode 4 "ঘুমের আগে" from Gemini clips (scene numbers follow episodes/ep04-gemini-copy.md).
 * Times are fractions of the scene's length (0 = start, 1 = end).
 */
export const EP04_SCENE_COUNT = 12;

export const EP04_OVERLAYS: Record<number, ClipOverlay[]> = {
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.15, to: 0.6, top: 860},
    {type: 'recap', from: 0.62, to: 1},
  ],
  2: [{type: 'say', who: 'umayer', text: 'মা, অন্ধকারে আমার ভয় লাগে।', from: 0.48, to: 0.85, top: 880}],
};

export const ep04Clips = clips as Record<string, SceneMedia>;

export const EP04_CONFIG: ClipConfig = {
  number: 4,
  title: 'ঘুমের আগে',
  dua: {
    name: 'ঘুমের আগের দোয়া',
    arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
    parts: ['আল্লাহুম্মা', 'বিসমিকা', 'আমুতু', 'ওয়া আহইয়া'],
    meaning: 'হে আল্লাহ, তোমার নাম নিয়েই আমি ঘুমাই ও জাগি',
    source: 'সহিহ বুখারি ৬৩১৪',
  },
  previousDua: EP03_CONFIG.dua,
  sceneCount: EP04_SCENE_COUNT,
  clips: ep04Clips,
  overlays: EP04_OVERLAYS,
  // The opening greeting is shared with episode 1.
  borrowClip: {1: {file: 'clips/ep01/_ready/scene01.mp4', seconds: 10.1}},
};
