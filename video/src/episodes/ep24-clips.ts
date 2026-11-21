import clips from './ep24.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP23_CONFIG} from './ep23-clips';

/**
 * Episode 24 "পড়া শুরুর আগে কী বলি?" from Gemini clips (scene numbers follow episodes/ep24-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP24_SCENE_COUNT = 7;

export const EP24_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'মা, এটা খুব কঠিন!\nআমি পারি না।', from: 0.54, to: 0.86, top: 780},
  ],
  // The bubbles sit higher so the source note below does not touch them.
  3: [
    {type: 'say', who: 'ammu', text: 'শেখার আগে আল্লাহর কাছে চাই,\nরাব্বি যিদনি ইলমা।', from: 0.14, to: 0.48, top: 730},
    {type: 'say', who: 'ammu', text: 'মানে, হে আল্লাহ,\nআমার জ্ঞান বাড়িয়ে দাও।', from: 0.5, to: 0.81, top: 730},
    {type: 'footnote', text: 'সূরা ত্বহা ২০:১১৪'},
  ],
  // Umayer raises his hands in dua, then picks up his crayon, under the full panel.
  4: [
    {type: 'dua', mode: 'broken', from: 0.0, to: 0.68, pop: true, align: 'right', scale: 0.55, times: [0.03, 0.238, 0.446]},
    {type: 'dua', mode: 'full', from: 0.68, showMeaning: true, pop: false, align: 'right', scale: 0.55},
  ],
  5: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.09, to: 0.34},
    {type: 'repeat', parts: [0.376, 0.554, 0.782], until: 1, align: 'right'},
  ],
  6: [
    {type: 'say', who: 'safa', text: 'আমিও শিখবো!\nরাব্বি যিদনি ইলমা!', from: 0.27, to: 0.53, top: 780},
    {type: 'say', who: 'umayer', text: 'চলো, একসাথে আঁকি!', from: 0.54, to: 0.72, top: 880},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep24Clips = clips as Record<string, SceneMedia>;

export const EP24_CONFIG: ClipConfig = {
  number: 24,
  title: 'পড়া শুরুর আগে কী বলি?',
  dua: {
    name: 'জ্ঞান বাড়ানোর দোয়া',
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    parts: ['রাব্বি', 'যিদনি', 'ইলমা'],
    meaning: 'হে আমার রব, আমার জ্ঞান বাড়িয়ে দাও',
    source: 'সূরা ত্বহা ২০:১১৪',
  },
  previousDua: EP23_CONFIG.dua,
  sceneCount: EP24_SCENE_COUNT,
  clips: ep24Clips,
  overlays: EP24_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [1.2, 8.8],
    3: [0.9, 8.4],
    4: [0.1, 9.6],
    5: [0.6, 9.0],
    6: [1.2, 8.8],
    7: [3.8, 8.6],
  },
};
