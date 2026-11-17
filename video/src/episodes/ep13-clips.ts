import clips from './ep13.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP12_CONFIG} from './ep12-clips';

/**
 * Episode 13 "বৃষ্টি দেখলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep13-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP13_SCENE_COUNT = 7;

export const EP13_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'মা, দেখো, বৃষ্টি!', from: 0.17, to: 0.4, top: 880},
    {type: 'say', who: 'ammu', text: 'চলো, বৃষ্টির দোয়া পড়ি!', from: 0.48, to: 0.69, top: 880},
  ],
  3: [
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ', from: 0.13, to: 0.37, top: 880},
    {type: 'say', who: 'ammu', text: 'বৃষ্টি দেখলে বলতেন,', from: 0.38, to: 0.53, top: 880},
    {type: 'say', who: 'ammu', text: 'আল্লাহুম্মা সাইয়িবান নাফিআ।', from: 0.56, to: 0.8, top: 880},
    {type: 'footnote', text: 'সহিহ বুখারি ১০৩২'},
  ],
  4: [
    {type: 'dua', mode: 'broken', from: 0.05, to: 0.82, pop: true, align: 'right', scale: 0.55, times: [0.109, 0.356, 0.584]},
    {type: 'dua', mode: 'full', from: 0.82, showMeaning: true, pop: false, align: 'right', scale: 0.55},
  ],
  5: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.03, to: 0.15},
    {type: 'repeat', parts: [0.248, 0.465, 0.663], until: 1, align: 'right'},
  ],
  6: [
    {type: 'say', who: 'safa', text: 'আল্লাহুম্মা সাইয়িবান নাফিআ!', from: 0.4, to: 0.65, top: 880},
    {type: 'say', who: 'umayer', text: 'সাফাও পেরেছে!', from: 0.75, to: 0.89, top: 880},
  ],
};

export const ep13Clips = clips as Record<string, SceneMedia>;

export const EP13_CONFIG: ClipConfig = {
  number: 13,
  title: 'বৃষ্টি দেখলে কী বলি?',
  dua: {
    name: 'বৃষ্টির দোয়া',
    arabic: 'اللَّهُمَّ صَيِّبًا نَافِعًا',
    parts: ['আল্লাহুম্মা', 'সাইয়িবান', 'নাফিআ'],
    meaning: 'হে আল্লাহ, উপকারী বৃষ্টি দাও',
    source: 'সহিহ বুখারি ১০৩২',
  },
  previousDua: EP12_CONFIG.dua,
  sceneCount: EP13_SCENE_COUNT,
  clips: ep13Clips,
  overlays: EP13_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [0.6, 7.2],
    3: [0.9, 8.2],
    4: [0.6, 9.6],
    // Keeps the pause at the end for the child to say it.
    5: [0.2, 9.0],
    6: [1.6, 9.1],
  },
};
