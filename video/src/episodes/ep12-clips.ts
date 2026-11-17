import clips from './ep12.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP11_CONFIG} from './ep11-clips';

/**
 * Episode 12 "কেউ কিছু দিলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep12-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP12_SCENE_COUNT = 7;

export const EP12_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'থ্যাংক ইউ, মা!', from: 0.31, to: 0.46, top: 880},
    {type: 'say', who: 'ammu', text: 'এর চেয়েও সুন্দর একটা কথা আছে!', from: 0.51, to: 0.86, top: 880},
  ],
  3: [
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ শিখিয়েছেন,', from: 0.12, to: 0.46, top: 880},
    {type: 'say', who: 'ammu', text: 'কেউ কিছু দিলে বলি,', from: 0.51, to: 0.66, top: 880},
    {type: 'say', who: 'ammu', text: 'জাযাকাল্লাহু খাইরান।', from: 0.67, to: 0.86, top: 880},
    {type: 'footnote', text: 'তিরমিজি ২০৩৫'},
  ],
  4: [
    {type: 'dua', mode: 'broken', from: 0.05, to: 0.68, pop: true, align: 'right', scale: 0.55, times: [0.109, 0.446]},
    {type: 'dua', mode: 'full', from: 0.68, showMeaning: true, pop: false, align: 'right', scale: 0.55},
  ],
  5: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.03, to: 0.15},
    {type: 'say', who: 'umayer', text: 'কেউ কিছু দিলে...', from: 0.24, to: 0.42, top: 880},
    {type: 'repeat', parts: [0.505, 0.762], until: 1, align: 'right'},
  ],
  6: [
    {type: 'say', who: 'safa', text: 'জাযাকাল্লাহু খাইরান!', from: 0.36, to: 0.55, top: 880},
    {type: 'say', who: 'umayer', text: 'সাফাও পেরেছে!', from: 0.59, to: 0.79, top: 880},
  ],
  7: [
    {type: 'say', who: 'umayer', text: 'কেউ কিছু দিলে\nতুমিও বলবে তো?', from: 0.12, to: 0.33},
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.43, to: 0.77},
    {type: 'card', from: 0.08},
  ],
};

export const ep12Clips = clips as Record<string, SceneMedia>;

export const EP12_CONFIG: ClipConfig = {
  number: 12,
  title: 'কেউ কিছু দিলে কী বলি?',
  dua: {
    name: 'কেউ কিছু দিলে',
    arabic: 'جَزَاكَ اللَّهُ خَيْرًا',
    parts: ['জাযাকাল্লাহু', 'খাইরান'],
    meaning: 'আল্লাহ তোমাকে উত্তম প্রতিদান দিন',
    source: 'তিরমিজি ২০৩৫',
  },
  previousDua: EP11_CONFIG.dua,
  sceneCount: EP12_SCENE_COUNT,
  clips: ep12Clips,
  overlays: EP12_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [0.8, 8.8],
    3: [0.8, 8.8],
    4: [0.6, 9.6],
    5: [0.2, 9.0],
    6: [1.0, 8.4],
    7: [0.8, 8.2],
  },
};
