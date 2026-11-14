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
  // Seen from behind, the right of the frame is his right: the right sleeve goes on first.
  4: [{type: 'say', who: 'ammu', text: 'আগে ডান হাত, তারপর বাম হাত।', from: 0.12, to: 0.35, top: 880}],
  5: [
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ নতুন কাপড় পরে\nআল্লাহর শুকরিয়া করতে শিখিয়েছেন।', from: 0.24, to: 0.84, top: 740},
    {type: 'footnote', text: 'আবু দাউদ ৪০২৩, তিরমিজি ৩৪৫৮'},
  ],
  // The dua is taught over scenes 6 and 7: here Ma says the first two parts.
  // The panel leaves out the Arabic while the parts are taught, so it stays clear of Umayer's head.
  6: [{type: 'dua', mode: 'broken', from: 0.07, to: 1, pop: true, align: 'right', scale: 0.5, hideArabic: true, times: [0.099, 0.515]}],
  // The first two parts never light here (9 is past the end of the scene).
  7: [
    {type: 'dua', mode: 'broken', from: 0, to: 1, pop: false, align: 'right', scale: 0.5, hideArabic: true, times: [9, 9, 0.01, 0.267, 0.485]},
    // The full panel with the meaning would cover Umayer here, so the meaning comes as a caption instead.
    {type: 'say', who: 'narrator', label: 'অর্থ', text: 'সব প্রশংসা আল্লাহর, যিনি আমাকে এই কাপড় পরালেন,\nআর আমার কোনো শক্তি-সামর্থ্য ছাড়াই আমাকে তা দিলেন', from: 0.76, to: 1, top: 860},
  ],
  8: [
    {type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0.01, to: 0.15},
    {type: 'repeat', parts: [0.168, 0.376, 0.475, 0.693, 0.871], until: 1, align: 'right'},
  ],
  // Mirrored: turned toward Umayer, Safa got her left sleeve first.
  9: [
    {type: 'say', who: 'umayer', text: 'সাফা, আগে ডান হাত!', from: 0.19, to: 0.4, top: 880},
    {type: 'say', who: 'safa', text: 'ডান হাত!', from: 0.73, to: 0.88, top: 880},
  ],
  10: [
    {type: 'say', who: 'miu', text: 'মিউ!', from: 0.37, to: 0.47, top: 880},
    {type: 'say', who: 'umayer', text: 'মিউও নতুন জামা পরেছে!', from: 0.5, to: 0.82, top: 880},
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
  // Before the logo: Miu shows off her new ribbon bow.
  teaser: {scene: 10, from: 3.4, to: 5.4, say: {who: 'miu', text: 'মিউ!'}},
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    1: [0.3, 8.9],
    2: [1.0, 8.9],
    // Keeps the end, where he puts his right arm in first.
    3: [0.8, 10.0],
    // Ends once the right sleeve is on and the left arm reaches out, before the panjabi shows it is on back to front.
    4: [0.4, 3.5],
    5: [0.2, 8.8],
    6: [0.6, 8.5],
    7: [0, 10.0],
    8: [0, 10.0],
    9: [1.4, 9.6],
    10: [1.5, 8.9],
  },
};
