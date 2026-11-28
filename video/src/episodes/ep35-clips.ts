import clips from './ep35.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP34_CONFIG} from './ep34-clips';

/**
 * Episode 35 "আয়না দেখলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep35-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP35_SCENE_COUNT = 7;

export const EP35_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  // Umayer brushes his hair at the mirror first; the clip ends before the reflection drifts out of step.
  2: [
    {type: 'say', who: 'umayer', text: 'মা, দেখো, আমি কত সুন্দর!', from: 0.23, to: 0.48, top: 880},
    {type: 'say', who: 'ammu', text: 'মাশাআল্লাহ!\nআয়না দেখলে দোয়া পড়ি।', from: 0.5, to: 0.78, top: 780},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep35Clips = clips as Record<string, SceneMedia>;

export const EP35_CONFIG: ClipConfig = {
  number: 35,
  title: 'আয়না দেখলে কী বলি?',
  dua: {
    name: 'আয়না দেখার দোয়া',
    arabic: 'اللَّهُمَّ أَنْتَ حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي',
    parts: ['আল্লাহুম্মা আনতা', 'হাসসানতা খালকি', 'ফাহাসসিন খুলুকি'],
    meaning: 'হে আল্লাহ, তুমি আমার চেহারা সুন্দর করেছ, আমার স্বভাবও সুন্দর করে দাও',
    source: 'মুসনাদে আহমাদ ৩৮২৩',
  },
  previousDua: EP34_CONFIG.dua,
  sceneCount: EP35_SCENE_COUNT,
  clips: ep35Clips,
  overlays: EP35_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [0.8, 8.0],
    7: [3.8, 8.6],
  },
};
