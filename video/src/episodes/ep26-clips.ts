import clips from './ep26.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP25_CONFIG} from './ep25-clips';

/**
 * Episode 26 "গাড়িতে চড়লে কী বলি?" from Gemini clips (scene numbers follow episodes/ep26-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP26_SCENE_COUNT = 7;

export const EP26_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'মা, রিকশায় চড়বো!', from: 0.31, to: 0.52, top: 880},
    {type: 'say', who: 'ammu', text: 'চড়ার আগে একটা দোয়া শিখি!', from: 0.61, to: 0.82, top: 880},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep26Clips = clips as Record<string, SceneMedia>;

export const EP26_CONFIG: ClipConfig = {
  number: 26,
  title: 'গাড়িতে চড়লে কী বলি?',
  dua: {
    name: 'বাহনে চড়ার দোয়া',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا',
    parts: ['সুবহানাল্লাযি', 'সাখখারা লানা', 'হাযা'],
    meaning: 'পবিত্র তিনি, যিনি এটাকে আমাদের জন্য বশ করে দিয়েছেন',
    source: 'সূরা যুখরুফ ৪৩:১৩',
  },
  previousDua: EP25_CONFIG.dua,
  sceneCount: EP26_SCENE_COUNT,
  clips: ep26Clips,
  overlays: EP26_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [1.0, 8.4],
    7: [3.8, 8.6],
  },
};
