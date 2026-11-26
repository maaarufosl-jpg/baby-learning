import clips from './ep32.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP31_CONFIG} from './ep31-clips';

/**
 * Episode 32 "জান্নাত চাইতে কী বলি?" from Gemini clips (scene numbers follow episodes/ep32-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP32_SCENE_COUNT = 7;

export const EP32_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'মা, জান্নাত কেমন?', from: 0.19, to: 0.44, top: 880},
    {type: 'say', who: 'ammu', text: 'খুব সুন্দর বাগান,\nঅনেক ফল আর নদী!', from: 0.46, to: 0.79, top: 780},
  ],
  // The bubbles sit higher so the source note below does not touch them.
  3: [
    {type: 'say', who: 'ammu', text: 'জান্নাত চাইতে বলি,\nআল্লাহুম্মা ইন্নি আসআলুকাল জান্নাহ।', from: 0.1, to: 0.56, top: 730},
    {type: 'say', who: 'ammu', text: 'তিনবার বললে জান্নাতও\nআমাদের জন্য দোয়া করে!', from: 0.6, to: 0.9, top: 730},
    {type: 'footnote', text: 'তিরমিজি ২৫৭২, আবু দাউদ ৭৯২'},
  ],
  // Ma and Umayer take the dua in turns; the panel lights each part as Ma says it.
  4: [
    {type: 'dua', mode: 'broken', from: 0.1, to: 1, pop: true, align: 'right', times: [0.129, 0.347, 0.693]},
  ],
  5: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.1, to: 0.21},
    {type: 'repeat', parts: [0.337, 0.545, 0.802], until: 1, align: 'right'},
  ],
  // Cut after they fall asleep, before a stray sound at 8.5s.
  6: [
    {type: 'say', who: 'umayer', text: 'আল্লাহুম্মা ইন্নি আসআলুকাল জান্নাহ!', from: 0.18, to: 0.51, top: 880},
    {type: 'say', who: 'safa', text: 'জান্নাহ!', from: 0.535, to: 0.64, top: 880},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep32Clips = clips as Record<string, SceneMedia>;

export const EP32_CONFIG: ClipConfig = {
  number: 32,
  title: 'জান্নাত চাইতে কী বলি?',
  dua: {
    name: 'জান্নাত চাওয়ার দোয়া',
    arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْجَنَّةَ',
    parts: ['আল্লাহুম্মা', 'ইন্নি আসআলুকাল', 'জান্নাহ'],
    meaning: 'হে আল্লাহ, আমি তোমার কাছে জান্নাত চাই',
    source: 'তিরমিজি ২৫৭২, আবু দাউদ ৭৯২',
  },
  previousDua: EP31_CONFIG.dua,
  sceneCount: EP32_SCENE_COUNT,
  clips: ep32Clips,
  overlays: EP32_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [1.2, 8.2],
    3: [0.7, 9.2],
    4: [1.0, 9.4],
    5: [0.7, 9.2],
    6: [1.5, 8.4],
    7: [3.8, 8.6],
  },
};
