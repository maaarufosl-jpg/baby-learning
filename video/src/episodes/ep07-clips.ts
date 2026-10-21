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
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    1: [0.3, 8.9],
    2: [0.8, 7.2],
    3: [1.5, 7.8],
  },
};
