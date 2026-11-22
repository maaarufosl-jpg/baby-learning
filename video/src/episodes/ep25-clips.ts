import clips from './ep25.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP24_CONFIG} from './ep24-clips';

/**
 * Episode 25 "কেউ অসুস্থ হলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep25-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP25_SCENE_COUNT = 7;

export const EP25_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'মা, সাফার কী হয়েছে?', from: 0.18, to: 0.42, top: 880},
    {type: 'say', who: 'ammu', text: 'সাফার একটু জ্বর হয়েছে, বাবা।', from: 0.47, to: 0.72, top: 880},
  ],
  // The bubbles sit higher so the source note below does not touch them.
  3: [
    {type: 'say', who: 'ammu', text: "অসুস্থ কাউকে দেখতে গেলে বলি,\nলা বা'সা তাহুরুন ইনশাআল্লাহ।", from: 0.1, to: 0.65, top: 730},
    {type: 'say', who: 'ammu', text: 'নবীজি ﷺ এভাবে বলতেন।', from: 0.67, to: 0.85, top: 830},
    {type: 'footnote', text: 'সহিহ বুখারি ৩৬১৬'},
  ],
  4: [
    {type: 'dua', mode: 'broken', from: 0.08, to: 0.86, pop: true, align: 'right', scale: 0.55, times: [0.119, 0.366, 0.634]},
    {type: 'dua', mode: 'full', from: 0.86, showMeaning: true, pop: false, align: 'right', scale: 0.55},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep25Clips = clips as Record<string, SceneMedia>;

export const EP25_CONFIG: ClipConfig = {
  number: 25,
  title: 'কেউ অসুস্থ হলে কী বলি?',
  dua: {
    name: 'অসুস্থকে দেখতে গেলে',
    arabic: 'لَا بَأْسَ طَهُورٌ إِنْ شَاءَ اللَّهُ',
    parts: ["লা বা'সা", 'তাহুরুন', 'ইনশাআল্লাহ'],
    meaning: 'কোনো ভয় নেই, এই অসুখ পবিত্র করে দেবে, ইনশাআল্লাহ',
    source: 'সহিহ বুখারি ৩৬১৬',
  },
  previousDua: EP24_CONFIG.dua,
  sceneCount: EP25_SCENE_COUNT,
  clips: ep25Clips,
  overlays: EP25_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [0.3, 8.0],
    3: [0.7, 8.6],
    4: [0.8, 9.9],
    7: [3.8, 8.6],
  },
};
