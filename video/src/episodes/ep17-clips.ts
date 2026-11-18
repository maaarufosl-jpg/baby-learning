import clips from './ep17.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP16_CONFIG} from './ep16-clips';

/**
 * Episode 17 "পরে কিছু করবো বললে কী বলি?" from Gemini clips (scene numbers follow episodes/ep17-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP17_SCENE_COUNT = 7;

export const EP17_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'মা, কাল আবার পার্কে যাব!', from: 0.35, to: 0.62, top: 880},
    {type: 'say', who: 'ammu', text: 'বলো, ইনশাআল্লাহ।', from: 0.75, to: 0.93, top: 880},
  ],
  // The bubbles sit a little higher so the source note below does not touch them.
  3: [
    {type: 'say', who: 'ammu', text: 'ইনশাআল্লাহ মানে, আল্লাহ চাইলে।', from: 0.12, to: 0.34, top: 830},
    {type: 'say', who: 'ammu', text: 'পরে কিছু করবো বললে\nআমরা ইনশাআল্লাহ বলি।', from: 0.37, to: 0.65, top: 780},
    {type: 'say', who: 'ammu', text: 'আল্লাহ কুরআনে এটা শিখিয়েছেন।', from: 0.67, to: 0.88, top: 830},
    {type: 'footnote', text: 'সূরা কাহফ ১৮:২৩–২৪'},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep17Clips = clips as Record<string, SceneMedia>;

export const EP17_CONFIG: ClipConfig = {
  number: 17,
  title: 'পরে কিছু করবো বললে কী বলি?',
  dua: {
    name: 'ইনশাআল্লাহ',
    arabic: 'إِنْ شَاءَ اللَّهُ',
    parts: ['ইন', 'শা', 'আল্লাহ'],
    meaning: 'আল্লাহ চাইলে',
    source: 'সূরা কাহফ ১৮:২৩–২৪',
  },
  previousDua: EP16_CONFIG.dua,
  sceneCount: EP17_SCENE_COUNT,
  clips: ep17Clips,
  overlays: EP17_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [1.4, 9.4],
    3: [1.0, 9.1],
    7: [3.8, 8.6],
  },
};
