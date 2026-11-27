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
  // Ma's teaching ends at 6.6s; the unscripted lines after it are cut. Bubbles sit higher to clear the source note.
  3: [
    {type: 'say', who: 'ammu', text: 'সবচেয়ে সেরা জিকির,\nলা ইলাহা ইল্লাল্লাহ।', from: 0.13, to: 0.45, top: 730},
    {type: 'say', who: 'ammu', text: 'মানে, আল্লাহ ছাড়া\nআর কোনো মাবুদ নেই।', from: 0.46, to: 0.69, top: 730},
    {type: 'footnote', text: 'তিরমিজি ৩৩৮৩, ইবনে মাজাহ ৩৮০০'},
  ],
  // Ma and Umayer take the two parts in turns, then say it all together; Umayer's extra sound at 9.1s is cut.
  4: [
    {type: 'dua', mode: 'broken', from: 0.05, to: 0.52, pop: true, align: 'right', times: [0.089, 0.297]},
    {type: 'dua', mode: 'full', from: 0.52, showMeaning: true, pop: false, align: 'right', scale: 0.5},
  ],
  // A low hum after 8.6s is cut.
  5: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.12, to: 0.26},
    {type: 'repeat', parts: [0.406, 0.673], until: 1, align: 'right'},
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
    3: [1.1, 6.9],
    4: [0.6, 8.2],
    5: [1.0, 8.4],
    7: [3.8, 8.6],
  },
};
