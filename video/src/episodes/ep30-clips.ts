import clips from './ep30.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP29_CONFIG} from './ep29-clips';

/**
 * Episode 30 "দুধ খেলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep30-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP30_SCENE_COUNT = 7;

export const EP30_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  // The clip ends with Umayer already drinking before the dua, so it is cut before that.
  2: [
    {type: 'say', who: 'umayer', text: 'দুধ! মা, আমি খাবো!', from: 0.17, to: 0.42, top: 880},
    {type: 'say', who: 'ammu', text: 'দুধ খাওয়ার একটা সুন্দর দোয়া আছে!', from: 0.48, to: 0.74, top: 880},
  ],
  // The bubbles sit higher so the source note below does not touch them; Umayer drinking at the end is cut.
  3: [
    {type: 'say', who: 'ammu', text: 'দুধ খাওয়ার সময় বলি,\nআল্লাহুম্মা বারিক লানা ফিহি ওয়া যিদনা মিনহু।', from: 0.11, to: 0.59, top: 730},
    {type: 'say', who: 'ammu', text: 'নবীজি ﷺ শিখিয়েছেন।', from: 0.6, to: 0.73, top: 830},
    {type: 'footnote', text: 'আবু দাউদ ৩৭৩০, তিরমিজি ৩৪৫৫'},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep30Clips = clips as Record<string, SceneMedia>;

export const EP30_CONFIG: ClipConfig = {
  number: 30,
  title: 'দুধ খেলে কী বলি?',
  dua: {
    name: 'দুধ খাওয়ার দোয়া',
    arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيهِ وَزِدْنَا مِنْهُ',
    parts: ['আল্লাহুম্মা', 'বারিক লানা ফিহি', 'ওয়া যিদনা মিনহু'],
    meaning: 'হে আল্লাহ, এতে আমাদের বরকত দিন এবং আমাদের আরও বাড়িয়ে দিন',
    source: 'আবু দাউদ ৩৭৩০, তিরমিজি ৩৪৫৫',
  },
  previousDua: EP29_CONFIG.dua,
  sceneCount: EP30_SCENE_COUNT,
  clips: ep30Clips,
  overlays: EP30_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [1.0, 7.6],
    3: [0.9, 7.4],
    7: [3.8, 8.6],
  },
};
