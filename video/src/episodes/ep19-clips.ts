import clips from './ep19.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP18_CONFIG} from './ep18-clips';

/**
 * Episode 19 "ঘরে ঢুকলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep19-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP19_SCENE_COUNT = 7;

export const EP19_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'ammu', text: 'উমায়ের, ঘরে ঢুকে কী বলতে হয়?', from: 0.33, to: 0.61, top: 880},
    {type: 'say', who: 'umayer', text: 'কী বলতে হয়, মা?', from: 0.65, to: 0.86, top: 880},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep19Clips = clips as Record<string, SceneMedia>;

export const EP19_CONFIG: ClipConfig = {
  number: 19,
  title: 'ঘরে ঢুকলে কী বলি?',
  dua: {
    name: 'ঘরে ঢোকার সময়',
    arabic: 'بِسْمِ اللَّهِ · السَّلَامُ عَلَيْكُمْ',
    parts: ['বিসমিল্লাহ', 'আসসালামু আলাইকুম'],
    meaning: 'আল্লাহর নামে · তোমাদের ওপর শান্তি হোক',
    source: 'সহিহ মুসলিম ২০১৮, সূরা নূর ২৪:৬১',
  },
  previousDua: EP18_CONFIG.dua,
  sceneCount: EP19_SCENE_COUNT,
  clips: ep19Clips,
  overlays: EP19_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [0.3, 8.8],
    7: [3.8, 8.6],
  },
};
