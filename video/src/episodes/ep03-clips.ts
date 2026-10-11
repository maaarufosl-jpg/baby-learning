import clips from './ep03.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP02_CONFIG} from './ep02-clips';

/**
 * Episode 3 "বিসমিল্লাহ ভুলে গেলে" from Gemini clips (scene numbers follow episodes/ep03-gemini-copy.md).
 * Times are fractions of the scene's length (0 = start, 1 = end).
 */
export const EP03_SCENE_COUNT = 12;

export const EP03_OVERLAYS: Record<number, ClipOverlay[]> = {
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.15, to: 0.6, top: 860},
    {type: 'recap', from: 0.62, to: 1},
  ],
  2: [{type: 'say', who: 'umayer', text: 'মমম! খিচুড়ি খুব মজা!', from: 0.1, to: 0.7, top: 880}],
  // Trimmed to 6.4s: Gemini ended the clip with both children laughing, which clashes with the sad scene 4.
  3: [{type: 'say', who: 'umayer', text: 'ওহ! আমি তো বিসমিল্লাহ বলিনি!', from: 0.27, to: 0.8, top: 880}],
  // Starts at 1.85s of Gemini's clip: its opening shot showed Safa without her hijab.
  4: [
    {type: 'say', who: 'umayer', text: 'এখন কী হবে?', from: 0.18, to: 0.5, top: 880},
    {type: 'say', who: 'miu', text: 'মিউ...', from: 0.62, to: 0.76, top: 880},
  ],
  5: [
    {type: 'say', who: 'ammu', text: 'মন খারাপ করো না, সোনা।', from: 0.33, to: 0.53, top: 880},
    {type: 'say', who: 'ammu', text: 'এখনো বলা যায়।', from: 0.53, to: 0.85, top: 880},
  ],
};

export const ep03Clips = clips as Record<string, SceneMedia>;

export const EP03_CONFIG: ClipConfig = {
  number: 3,
  title: 'বিসমিল্লাহ ভুলে গেলে',
  dua: {
    name: 'ভুলে গেলে যে দোয়া',
    arabic: 'بِسْمِ اللَّهِ أَوَّلَهُ وَآخِرَهُ',
    parts: ['বিসমিল্লাহি', 'আওয়ালাহু', 'ওয়া আখিরাহু'],
    meaning: 'শুরুতে ও শেষে আল্লাহর নামে',
    source: 'আবু দাউদ ৩৭৬৭, তিরমিজি ১৮৫৮',
  },
  previousDua: EP02_CONFIG.dua,
  sceneCount: EP03_SCENE_COUNT,
  clips: ep03Clips,
  overlays: EP03_OVERLAYS,
  // The opening greeting is shared with episode 1.
  borrowClip: {1: {file: 'clips/ep01/_ready/scene01.mp4', seconds: 10.1}},
};
