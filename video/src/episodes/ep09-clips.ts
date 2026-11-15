import clips from './ep09.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP08_CONFIG} from './ep08-clips';

/**
 * Episode 9 "সালাম দিলে বন্ধু হয়" from Gemini clips (scene numbers follow episodes/ep09-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP09_SCENE_COUNT = 11;

export const EP09_OVERLAYS: Record<number, ClipOverlay[]> = {
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.15, to: 0.6, top: 860},
    {type: 'recap', from: 0.62, to: 1},
  ],
  2: [
    {type: 'say', who: 'ammu', text: 'ওই দেখো, নতুন একজন এসেছে!', from: 0.23, to: 0.47, top: 880},
    {type: 'say', who: 'umayer', text: 'আমার লজ্জা লাগে...', from: 0.63, to: 0.82, top: 880},
  ],
  3: [{type: 'say', who: 'ammu', text: 'আগে সালাম দাও, দেখবে বন্ধু হয়ে যাবে।', from: 0.27, to: 0.63, top: 880}],
  4: [
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ বলেছেন,', from: 0.14, to: 0.47, top: 880},
    {type: 'say', who: 'ammu', text: 'যে আগে সালাম দেয়,\nসে আল্লাহর সবচেয়ে কাছের।', from: 0.49, to: 0.82, top: 740},
    {type: 'footnote', text: 'আবু দাউদ ৫১৯৭'},
  ],
  5: [
    {type: 'dua', mode: 'broken', from: 0, to: 0.86, pop: true, align: 'right', scale: 0.5, times: [0.03, 0.317, 0.594]},
    // No star here: beside this wide panel it would cover the meaning.
    {type: 'dua', mode: 'full', from: 0.86, showMeaning: true, pop: false, align: 'right', scale: 0.44},
  ],
};

export const ep09Clips = clips as Record<string, SceneMedia>;

export const EP09_CONFIG: ClipConfig = {
  number: 9,
  title: 'সালাম দিলে বন্ধু হয়',
  dua: {
    name: 'পুরো সালাম',
    arabic: 'السَّلَامُ عَلَيْكُمْ وَرَحْمَةُ اللَّهِ وَبَرَكَاتُهُ',
    parts: ['আসসালামু আলাইকুম', 'ওয়া রাহমাতুল্লাহি', 'ওয়া বারাকাতুহ'],
    meaning: 'তোমার ওপর শান্তি, আল্লাহর রহমত ও বরকত বর্ষিত হোক',
    source: 'আবু দাউদ ৫১৯৫, তিরমিজি ২৬৮৯',
  },
  previousDua: EP08_CONFIG.dua,
  sceneCount: EP09_SCENE_COUNT,
  clips: ep09Clips,
  overlays: EP09_OVERLAYS,
  // The opening greeting is shared with episode 1.
  borrowClip: {1: {file: 'clips/ep01/_ready/scene01.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    1: [0.3, 8.9],
    2: [0.5, 8.4],
    3: [1.8, 7.4],
    4: [1.0, 8.6],
    5: [0, 9.8],
  },
};
