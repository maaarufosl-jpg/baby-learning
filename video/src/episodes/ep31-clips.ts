import clips from './ep31.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP30_CONFIG} from './ep30-clips';

/**
 * Episode 31 "কেউ খাওয়ালে কী বলি?" from Gemini clips (scene numbers follow episodes/ep31-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP31_SCENE_COUNT = 7;

export const EP31_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'উমম! মা, খুব মজা!', from: 0.19, to: 0.36, top: 880},
    {type: 'say', who: 'ammu', text: 'যে খাওয়ায়,\nতার জন্য একটা দোয়া আছে!', from: 0.37, to: 0.71, top: 780},
  ],
  // The bubbles sit higher so the source note below does not touch them.
  3: [
    {type: 'say', who: 'ammu', text: 'কেউ খাওয়ালে তার জন্য বলি,', from: 0.11, to: 0.33, top: 830},
    {type: 'say', who: 'ammu', text: 'আল্লাহুম্মা আতইম মান আতআমানি,\nওয়াসকি মান সাকানি।', from: 0.36, to: 0.82, top: 730},
    {type: 'footnote', text: 'সহিহ মুসলিম ২০৫৫'},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep31Clips = clips as Record<string, SceneMedia>;

export const EP31_CONFIG: ClipConfig = {
  number: 31,
  title: 'কেউ খাওয়ালে কী বলি?',
  dua: {
    name: 'যে খাওয়ায় তার জন্য দোয়া',
    arabic: 'اللَّهُمَّ أَطْعِمْ مَنْ أَطْعَمَنِي وَاسْقِ مَنْ سَقَانِي',
    parts: ['আল্লাহুম্মা আতইম', 'মান আতআমানি', 'ওয়াসকি', 'মান সাকানি'],
    meaning: 'হে আল্লাহ, যে আমাকে খাওয়াল তাকে খাওয়াও, যে পান করাল তাকে পান করাও',
    source: 'সহিহ মুসলিম ২০৫৫',
  },
  previousDua: EP30_CONFIG.dua,
  sceneCount: EP31_SCENE_COUNT,
  clips: ep31Clips,
  overlays: EP31_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [1.0, 7.4],
    3: [0.9, 8.4],
    7: [3.8, 8.6],
  },
};
