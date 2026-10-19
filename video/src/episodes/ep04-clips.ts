import clips from './ep04.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP03_CONFIG} from './ep03-clips';

/**
 * Episode 4 "ঘুমের আগে" from Gemini clips (scene numbers follow episodes/ep04-gemini-copy.md).
 * Times are fractions of the scene's length (0 = start, 1 = end).
 */
export const EP04_SCENE_COUNT = 12;

export const EP04_OVERLAYS: Record<number, ClipOverlay[]> = {
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.15, to: 0.6, top: 860},
    {type: 'recap', from: 0.62, to: 1},
  ],
  2: [{type: 'say', who: 'umayer', text: 'মা, অন্ধকারে আমার ভয় লাগে।', from: 0.48, to: 0.85, top: 880}],
  // The "scary" shape on the wall turned out to be Miu's shadow.
  3: [
    {type: 'say', who: 'umayer', text: 'ওটা কী?', from: 0.44, to: 0.58, top: 880},
    {type: 'say', who: 'miu', text: 'মিউ!', from: 0.71, to: 0.8, top: 880},
  ],
  4: [
    {type: 'say', who: 'ammu', text: 'ওটা তো মিউয়ের ছায়া, সোনা।', from: 0.12, to: 0.38, top: 880},
    {type: 'say', who: 'ammu', text: 'ভয় নেই, আল্লাহ সবসময়\nআমাদের দেখে রাখেন।', from: 0.4, to: 0.7, top: 740},
  ],
  // Scenes 5 and 6 are mirrored: Gemini laid Umayer on his left side, and flipping puts him on his right side.
  5: [
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ ডান কাতে শুতেন,', from: 0.12, to: 0.55, top: 880},
    {type: 'say', who: 'ammu', text: 'ডান হাত গালের নিচে রেখে।', from: 0.6, to: 0.92, top: 880},
    {type: 'footnote', text: 'সহিহ বুখারি ৬৩১১, ৬৩১৪'},
  ],
  6: [
    {type: 'dua', mode: 'broken', from: 0.03, to: 0.55, pop: true, align: 'left', scale: 0.44, times: [0.05, 0.21, 0.32, 0.43]},
    {type: 'dua', mode: 'full', from: 0.55, showMeaning: true, pop: false, align: 'left', scale: 0.44},
    {type: 'star', at: 0.8},
  ],
  7: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.1, to: 0.28},
    {type: 'repeat', parts: [0.3, 0.46, 0.64, 0.8], until: 1, align: 'right'},
  ],
  8: [
    {type: 'say', who: 'umayer', text: 'এখন আর ভয় লাগছে না।', from: 0.14, to: 0.38, top: 880},
    {type: 'say', who: 'ammu', text: 'মাশাআল্লাহ।', from: 0.4, to: 0.53, top: 880},
    {type: 'say', who: 'ammu', text: 'আল্লাহ তোমাকে দেখে রাখবেন।', from: 0.53, to: 0.85, top: 880},
  ],
  // Mirrored before 2.46s and after 5.46s, where Gemini had him on his left side; the close-up between was already right.
  9: [
    {type: 'say', who: 'umayer', text: 'মিউ, তুমিও ডান কাতে শোও!', from: 0.27, to: 0.56, top: 880},
    {type: 'say', who: 'miu', text: 'মিউ...', from: 0.72, to: 0.85, top: 880},
  ],
  // Mirrored: in the closing wide shot Gemini had him asleep on his left side.
  10: [
    {type: 'say', who: 'ammu', text: 'আসসালামু আলাইকুম, সোনা।', from: 0.28, to: 0.45, top: 880},
    {type: 'say', who: 'umayer', text: 'ওয়ালাইকুমুস সালাম, মা।', from: 0.46, to: 0.65, top: 880},
  ],
  12: [
    {type: 'say', who: 'umayer', text: 'আজ রাতে তুমিও বলবে তো?', from: 0.04, to: 0.25},
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.27, to: 0.68},
    {type: 'card', from: 0.08},
  ],
};

export const ep04Clips = clips as Record<string, SceneMedia>;

export const EP04_CONFIG: ClipConfig = {
  number: 4,
  title: 'ঘুমের আগে',
  dua: {
    name: 'ঘুমের আগের দোয়া',
    arabic: 'اللَّهُمَّ بِاسْمِكَ أَمُوتُ وَأَحْيَا',
    parts: ['আল্লাহুম্মা', 'বিসমিকা', 'আমুতু', 'ওয়া আহইয়া'],
    meaning: 'হে আল্লাহ, তোমার নাম নিয়েই আমি ঘুমাই ও জাগি',
    source: 'সহিহ বুখারি ৬৩১৪',
  },
  previousDua: EP03_CONFIG.dua,
  sceneCount: EP04_SCENE_COUNT,
  clips: ep04Clips,
  overlays: EP04_OVERLAYS,
  // The opening greeting is shared with episode 1.
  borrowClip: {1: {file: 'clips/ep01/_ready/scene01.mp4', seconds: 10.1}},
};
