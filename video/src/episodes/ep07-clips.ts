import clips from './ep07.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP06_CONFIG} from './ep06-clips';

/**
 * Episode 7 "বাথরুম থেকে বের হয়ে" from Gemini clips (scene numbers follow episodes/ep07-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP07_SCENE_COUNT = 10;

export const EP07_OVERLAYS: Record<number, ClipOverlay[]> = {
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.15, to: 0.6, top: 860},
    {type: 'recap', from: 0.62, to: 1},
  ],
  // Seen from above as he walks down the frame, the foot on the left of the frame is his right foot, and it crosses first.
  2: [{type: 'say', who: 'ammu', text: 'বের হওয়ার সময় ডান পা আগে।', from: 0.27, to: 0.62, top: 880}],
  3: [{type: 'say', who: 'ammu', text: 'আর বের হয়ে কী বলি, জানো?', from: 0.29, to: 0.65, top: 880}],
  4: [
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ বাথরুম থেকে\nবের হয়ে বলতেন,', from: 0.08, to: 0.46, top: 740},
    {type: 'say', who: 'ammu', text: 'গুফরানাক।', from: 0.52, to: 0.84, top: 880},
    {type: 'footnote', text: 'আবু দাউদ ৩০, তিরমিজি ৭'},
  ],
  5: [
    {type: 'dua', mode: 'broken', from: 0.07, to: 0.63, pop: true, align: 'right', scale: 0.5, times: [0.089, 0.238, 0.396]},
    {type: 'dua', mode: 'full', from: 0.63, showMeaning: true, pop: false, align: 'right', scale: 0.5},
    {type: 'star', at: 0.66},
  ],
  6: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.04, to: 0.17},
    {type: 'repeat', parts: [0.356, 0.416, 0.495], until: 1, align: 'right'},
  ],
  7: [
    {type: 'say', who: 'safa', text: 'গুফরানাক!', from: 0.29, to: 0.42, top: 880},
    {type: 'say', who: 'umayer', text: 'সাফাও পেরেছে!', from: 0.43, to: 0.64, top: 880},
  ],
  8: [{type: 'say', who: 'ammu', text: 'এবার সাবান দিয়ে হাত ধুই।', from: 0.14, to: 0.45, top: 880}],
  9: [
    {type: 'say', who: 'miu', text: 'মিউ!', from: 0.46, to: 0.58, top: 880},
    {type: 'say', who: 'umayer', text: 'মিউ, তুমিও হাত ধোবে?', from: 0.6, to: 0.82, top: 880},
  ],
  10: [
    {type: 'say', who: 'umayer', text: 'বাথরুম থেকে বের হয়ে\nতুমিও বলবে তো?', from: 0.1, to: 0.37},
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.4, to: 0.76},
    {type: 'card', from: 0.08},
  ],
};

export const ep07Clips = clips as Record<string, SceneMedia>;

export const EP07_CONFIG: ClipConfig = {
  number: 7,
  title: 'বাথরুম থেকে বের হয়ে',
  dua: {
    name: 'বাথরুম থেকে বের হওয়ার দোয়া',
    arabic: 'غُفْرَانَكَ',
    parts: ['গুফ', 'রা', 'নাক'],
    meaning: 'হে আল্লাহ, আমি তোমার কাছে ক্ষমা চাই',
    source: 'আবু দাউদ ৩০, তিরমিজি ৭',
  },
  previousDua: EP06_CONFIG.dua,
  sceneCount: EP07_SCENE_COUNT,
  clips: ep07Clips,
  overlays: EP07_OVERLAYS,
  // The opening greeting is shared with episode 1.
  borrowClip: {1: {file: 'clips/ep01/_ready/scene01.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Before the logo: Miu jumps back from the water drop.
  teaser: {scene: 9, from: 4.5, to: 6.6, say: {who: 'miu', text: 'মিউ!'}},
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    1: [0.3, 8.9],
    2: [0.8, 7.2],
    3: [1.5, 7.8],
    4: [0.6, 8.6],
    5: [0.6, 9.0],
    // Keeps most of its ending: the pause for the child to say it.
    6: [0.3, 9.6],
    7: [1.3, 7.8],
    8: [0.5, 7.6],
    9: [1.0, 8.4],
    10: [0.6, 8.6],
  },
};
