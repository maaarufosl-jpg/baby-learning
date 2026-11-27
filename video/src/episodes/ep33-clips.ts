import clips from './ep33.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP32_CONFIG} from './ep32-clips';

/**
 * Episode 33 "সবচেয়ে সেরা কথা কী?" from Gemini clips (scene numbers follow episodes/ep33-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP33_SCENE_COUNT = 7;

export const EP33_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  // A stray child's sound at 8.9s is cut.
  2: [
    {type: 'say', who: 'umayer', text: 'মা, সবচেয়ে সেরা কথা কোনটা?', from: 0.22, to: 0.5, top: 880},
    {type: 'say', who: 'ammu', text: 'আল্লাহকে মনে করার কথা!', from: 0.55, to: 0.79, top: 880},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep33Clips = clips as Record<string, SceneMedia>;

export const EP33_CONFIG: ClipConfig = {
  number: 33,
  title: 'সবচেয়ে সেরা কথা কী?',
  dua: {
    name: 'সবচেয়ে সেরা জিকির',
    arabic: 'لَا إِلَهَ إِلَّا اللَّهُ',
    parts: ['লা ইলাহা', 'ইল্লাল্লাহ'],
    meaning: 'আল্লাহ ছাড়া আর কোনো মাবুদ নেই',
    source: 'তিরমিজি ৩৩৮৩, ইবনে মাজাহ ৩৮০০',
  },
  previousDua: EP32_CONFIG.dua,
  sceneCount: EP33_SCENE_COUNT,
  clips: ep33Clips,
  overlays: EP33_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [1.8, 8.0],
    7: [3.8, 8.6],
  },
};
