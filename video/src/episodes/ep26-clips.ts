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
  // The bubbles sit higher so the source note below does not touch them; the extra talk after 6.8s is cut.
  3: [
    {type: 'say', who: 'ammu', text: 'কোনো বাহনে চড়লে বলি,\nসুবহানাল্লাযি সাখখারা লানা হাযা।', from: 0.1, to: 0.45, top: 730},
    {type: 'say', who: 'ammu', text: 'আল্লাহ কুরআনে এটা শিখিয়েছেন।', from: 0.47, to: 0.67, top: 830},
    {type: 'footnote', text: 'সূরা যুখরুফ ৪৩:১৩'},
  ],
  // Gemini put the rickshaw puller facing the wrong way, so the clip is zoomed onto Ma and Umayer
  // (assets/scene-originals/ep26/scene04.mp4 is the untouched clip); Ma's extra line at the end is cut.
  4: [
    {type: 'dua', mode: 'broken', from: 0.03, to: 0.78, pop: true, align: 'right', scale: 0.5, times: [0.059, 0.317, 0.624]},
    {type: 'dua', mode: 'full', from: 0.78, showMeaning: true, pop: false, align: 'right', scale: 0.5},
  ],
  5: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.1, to: 0.3},
    {type: 'repeat', parts: [0.347, 0.594, 0.832], until: 1, align: 'right'},
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
    3: [0.8, 6.8],
    4: [0.4, 8.2],
    5: [0.7, 9.9],
    7: [3.8, 8.6],
  },
};
