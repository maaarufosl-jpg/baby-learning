import clips from './ep20.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP19_CONFIG} from './ep19-clips';

/**
 * Episode 20 "রাগ হলে কী বলি?" from Gemini clips (scene numbers follow episodes/ep20-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP20_SCENE_COUNT = 7;

export const EP20_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'সাফা! আমার টাওয়ার ভেঙে দিলে!', from: 0.53, to: 0.79, top: 880},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep20Clips = clips as Record<string, SceneMedia>;

export const EP20_CONFIG: ClipConfig = {
  number: 20,
  title: 'রাগ হলে কী বলি?',
  dua: {
    name: 'রাগ হলে',
    arabic: 'أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ',
    parts: ['আউযু বিল্লাহি', 'মিনাশ শাইতানির', 'রাজিম'],
    meaning: 'বিতাড়িত শয়তান থেকে আল্লাহর কাছে আশ্রয় চাই',
    source: 'সহিহ বুখারি ৬১১৫, সহিহ মুসলিম ২৬১০',
  },
  previousDua: EP19_CONFIG.dua,
  sceneCount: EP20_SCENE_COUNT,
  clips: ep20Clips,
  overlays: EP20_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [0.5, 8.2],
    7: [3.8, 8.6],
  },
};
