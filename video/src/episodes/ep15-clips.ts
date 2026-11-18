import clips from './ep15.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP14_CONFIG} from './ep14-clips';

/**
 * Episode 15 "ভুল কাজ করলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep15-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP15_SCENE_COUNT = 7;

export const EP15_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  // Ends before Umayer hands the ball back, which belongs to scene 6.
  2: [
    {type: 'say', who: 'safa', text: 'আমার বল!', from: 0.3, to: 0.44, top: 880},
    {type: 'say', who: 'ammu', text: 'ভুল কাজ করলে আমরা বলি, আস্তাগফিরুল্লাহ।', from: 0.55, to: 0.85, top: 880},
  ],
  3: [
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ', from: 0.14, to: 0.42, top: 880},
    {type: 'say', who: 'ammu', text: 'প্রতিদিন অনেকবার আস্তাগফিরুল্লাহ বলতেন।', from: 0.46, to: 0.75, top: 880},
    {type: 'footnote', text: 'সহিহ বুখারি ৬৩০৭'},
  ],
  4: [
    {type: 'dua', mode: 'broken', from: 0.05, to: 0.72, pop: true, align: 'right', scale: 0.55, times: [0.139, 0.416]},
    {type: 'dua', mode: 'full', from: 0.72, showMeaning: true, pop: false, align: 'right', scale: 0.55},
  ],
  // Umayer says the word in one go, so the two parts light up one right after the other.
  5: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.1, to: 0.21},
    {type: 'say', who: 'umayer', text: 'ভুল কাজ করলে...', from: 0.36, to: 0.5, top: 880},
    {type: 'repeat', parts: [0.683, 0.743], until: 1, align: 'right'},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep15Clips = clips as Record<string, SceneMedia>;

export const EP15_CONFIG: ClipConfig = {
  number: 15,
  title: 'ভুল কাজ করলে কী বলি?',
  dua: {
    name: 'ক্ষমা চাওয়া',
    arabic: 'أَسْتَغْفِرُ اللَّهَ',
    parts: ['আস্তাগ', 'ফিরুল্লাহ'],
    meaning: 'আমি আল্লাহর কাছে ক্ষমা চাই',
    source: 'সহিহ বুখারি ৬৩০৭',
  },
  previousDua: EP14_CONFIG.dua,
  sceneCount: EP15_SCENE_COUNT,
  clips: ep15Clips,
  overlays: EP15_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [1.2, 8.6],
    3: [1.0, 7.8],
    4: [0.8, 9.1],
    5: [0.8, 9.0],
    7: [3.8, 8.6],
  },
};
