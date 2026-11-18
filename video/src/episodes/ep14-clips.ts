import clips from './ep14.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP13_CONFIG} from './ep13-clips';

/**
 * Episode 14 "সুন্দর কিছু দেখলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep14-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP14_SCENE_COUNT = 7;

export const EP14_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'ওয়াও! কী সুন্দর!', from: 0.15, to: 0.37, top: 880},
    {type: 'say', who: 'ammu', text: 'সুন্দর কিছু দেখলে আমরা বলি, মাশাআল্লাহ!', from: 0.42, to: 0.75, top: 880},
  ],
  3: [
    {type: 'say', who: 'ammu', text: 'আল্লাহ কুরআনে শিখিয়েছেন,', from: 0.15, to: 0.35, top: 880},
    {type: 'say', who: 'ammu', text: 'সুন্দর কিছু দেখলে বলো,', from: 0.47, to: 0.65, top: 880},
    {type: 'say', who: 'ammu', text: 'মাশাআল্লাহ।', from: 0.67, to: 0.83, top: 880},
    {type: 'footnote', text: 'সূরা কাহফ ১৮:৩৯'},
  ],
};

export const ep14Clips = clips as Record<string, SceneMedia>;

export const EP14_CONFIG: ClipConfig = {
  number: 14,
  title: 'সুন্দর কিছু দেখলে কী বলি?',
  dua: {
    name: 'সুন্দর কিছু দেখলে',
    arabic: 'مَا شَاءَ اللَّهُ',
    parts: ['মা', 'শা', 'আল্লাহ'],
    meaning: 'আল্লাহ যা চেয়েছেন, সব আল্লাহর ইচ্ছায়',
    source: 'সূরা কাহফ ১৮:৩৯',
  },
  previousDua: EP13_CONFIG.dua,
  sceneCount: EP14_SCENE_COUNT,
  clips: ep14Clips,
  overlays: EP14_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [1.0, 7.6],
    3: [1.0, 8.4],
  },
};
