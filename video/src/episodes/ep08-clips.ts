import clips from './ep08.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP07_CONFIG} from './ep07-clips';

/**
 * Episode 8 "নতুন জামা" from Gemini clips (scene numbers follow episodes/ep08-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP08_SCENE_COUNT = 11;

export const EP08_OVERLAYS: Record<number, ClipOverlay[]> = {
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.15, to: 0.6, top: 860},
    {type: 'recap', from: 0.62, to: 1},
  ],
  2: [
    {type: 'say', who: 'ammu', text: 'তোমার জন্য নতুন পাঞ্জাবি!', from: 0.16, to: 0.37, top: 880},
    {type: 'say', who: 'umayer', text: 'আমার জন্য? কী সুন্দর!', from: 0.55, to: 0.86, top: 880},
  ],
  // The close-up (1.58-3.17s) is mirrored: Gemini put his right arm in first, but here he hurries with the left.
  3: [
    {type: 'say', who: 'ammu', text: 'আস্তে, আস্তে!', from: 0.32, to: 0.46, top: 880},
    {type: 'say', who: 'ammu', text: 'জামা পরার সময় আগে ডান হাত।', from: 0.47, to: 0.76, top: 880},
  ],
};

export const ep08Clips = clips as Record<string, SceneMedia>;

export const EP08_CONFIG: ClipConfig = {
  number: 8,
  title: 'নতুন জামা',
  dua: {
    name: 'নতুন কাপড় পরার দোয়া',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
    parts: ['আলহামদু লিল্লাহিল্লাযী', 'কাসানী হাযা', 'ওয়া রাযাকানীহি', 'মিন গাইরি হাওলিম মিন্নী', 'ওয়ালা কুওয়াহ'],
    meaning: 'সব প্রশংসা আল্লাহর, যিনি আমাকে এই কাপড় পরালেন, আর আমার কোনো শক্তি-সামর্থ্য ছাড়াই আমাকে তা দিলেন',
    source: 'আবু দাউদ ৪০২৩, তিরমিজি ৩৪৫৮',
  },
  previousDua: EP07_CONFIG.dua,
  sceneCount: EP08_SCENE_COUNT,
  clips: ep08Clips,
  overlays: EP08_OVERLAYS,
  // The opening greeting is shared with episode 1.
  borrowClip: {1: {file: 'clips/ep01/_ready/scene01.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    1: [0.3, 8.9],
    2: [1.0, 8.9],
    // Keeps the end, where he puts his right arm in first.
    3: [0.8, 10.0],
  },
};
