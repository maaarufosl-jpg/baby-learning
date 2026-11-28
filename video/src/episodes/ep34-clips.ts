import clips from './ep34.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP33_CONFIG} from './ep33-clips';

/**
 * Episode 34 "নবীজির নাম শুনলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep34-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP34_SCENE_COUNT = 7;

export const EP34_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি মুহাম্মদ (সা.)\nছোটদের খুব ভালোবাসতেন।', from: 0.13, to: 0.52, top: 780},
    {type: 'say', who: 'umayer', text: 'মা, নবীজির নাম শুনলে কী বলি?', from: 0.54, to: 0.86, top: 880},
  ],
  // Bubbles sit higher so the source note below does not touch them.
  3: [
    {type: 'say', who: 'ammu', text: 'বলি,\nসাল্লাল্লাহু আলাইহি ওয়া সাল্লাম।', from: 0.13, to: 0.44, top: 730},
    {type: 'say', who: 'ammu', text: 'একবার বললে আল্লাহ\nদশবার রহমত দেন!', from: 0.5, to: 0.84, top: 730},
    {type: 'footnote', text: 'সহিহ মুসলিম ৪০৮'},
  ],
  // Ma and Umayer take the three parts in turns; the panel lights each part as Ma says it.
  4: [
    {type: 'dua', mode: 'broken', from: 0.04, to: 1, pop: true, align: 'right', times: [0.069, 0.307, 0.515]},
  ],
  5: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.12, to: 0.25},
    {type: 'repeat', parts: [0.376, 0.614, 0.802], until: 1, align: 'right'},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep34Clips = clips as Record<string, SceneMedia>;

export const EP34_CONFIG: ClipConfig = {
  number: 34,
  title: 'নবীজির নাম শুনলে কী বলি?',
  dua: {
    name: 'দরুদ',
    arabic: 'صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ',
    parts: ['সাল্লাল্লাহু', 'আলাইহি', 'ওয়া সাল্লাম'],
    meaning: 'আল্লাহ তাঁর উপর রহমত ও শান্তি দিন',
    source: 'সহিহ মুসলিম ৪০৮',
  },
  previousDua: EP33_CONFIG.dua,
  sceneCount: EP34_SCENE_COUNT,
  clips: ep34Clips,
  overlays: EP34_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [1.1, 8.8],
    3: [1.0, 8.7],
    4: [0.4, 8.4],
    5: [1.0, 9.4],
    7: [3.8, 8.6],
  },
};
