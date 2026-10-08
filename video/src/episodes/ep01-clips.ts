import clips from './ep01.clips.json';
import type {CharacterId} from '../types';

/**
 * Overlays drawn on top of the scene clips or still images of episode 1
 * (scene numbers follow episodes/ep01-gemini-prompts.md).
 * Times are fractions of the scene's length (0 = start, 1 = end) so they still fit if a clip is longer or shorter.
 */
export type ClipOverlay =
  | {type: 'title'; to?: number}
  | {type: 'dua'; mode: 'full' | 'broken'; from?: number; to?: number; showMeaning?: boolean}
  | {type: 'repeat'; parts: [number, number, number]}
  | {type: 'star'; at: number}
  | {type: 'footnote'; text: string}
  | {type: 'card'; from: number}
  | {type: 'question'; from: number; x?: number; y?: number}
  | {type: 'say'; who: CharacterId | 'narrator' | 'everyone'; text: string; from: number; to: number; label?: string; top?: number};

export const EP01_SCENE_COUNT = 15;

/** Length of each scene when it is a still image (a video clip uses its own length). */
export const EP01_IMAGE_SECONDS: Record<number, number> = {
  1: 6, 2: 7, 3: 5, 4: 7, 5: 7, 6: 5, 7: 7, 8: 9, 9: 6, 10: 7, 11: 11, 12: 6, 13: 8, 14: 6, 15: 8,
};

/** Slow camera move on still images: zoom from 1 to `to`, toward `origin` (percent of the frame). */
export const EP01_IMAGE_MOVE: Record<number, {to: number; origin: [number, number]}> = {
  2: {to: 1.1, origin: [35, 45]},
  3: {to: 1.08, origin: [45, 40]},
  4: {to: 1.2, origin: [50, 62]},
  6: {to: 1.08, origin: [35, 35]},
  9: {to: 1.1, origin: [65, 35]},
  10: {to: 1.12, origin: [45, 70]},
  13: {to: 1.08, origin: [40, 45]},
  14: {to: 1.1, origin: [45, 75]},
};

/** Until a scene's own image or clip exists, borrow another scene's image. */
export const EP01_FALLBACK_IMAGE: Record<number, number> = {4: 3, 7: 8};

export const EP01_OVERLAYS: Record<number, ClipOverlay[]> = {
  1: [{type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.15, to: 0.6, top: 860}],
  2: [
    {type: 'say', who: 'narrator', text: 'উমায়ের সারা সকাল খেলেছে।\nএখন তার খুব খিদে পেয়েছে।', from: 0, to: 0.5},
    {type: 'say', who: 'umayer', text: 'ভাত! ডিম ভাজা! আমার প্রিয়!', from: 0.5, to: 1},
  ],
  3: [
    {type: 'say', who: 'safa', text: 'ভাইয়া, খাবো!', from: 0, to: 0.38},
    {type: 'say', who: 'miu', text: 'মিউ!', from: 0.38, to: 0.62},
  ],
  4: [
    {type: 'say', who: 'narrator', text: 'এই রে! উমায়ের কিছু একটা ভুলে গেছে।', from: 0, to: 0.5},
    {type: 'say', who: 'narrator', text: 'তুমি কি বলতে পারো,\nকী ভুলে গেছে?', from: 0.5, to: 1},
    {type: 'question', from: 0.5, x: 330, y: 430},
  ],
  5: [
    {type: 'say', who: 'ammu', text: 'উমায়ের সোনা, একটু থামো তো।', from: 0.18, to: 0.58},
    {type: 'say', who: 'ammu', text: 'খাওয়ার আগে আমরা কী বলি?', from: 0.58, to: 1},
  ],
  6: [{type: 'say', who: 'umayer', text: 'উমম... ভুলে গেছি, মা।', from: 0.1, to: 1, top: 880}],
  7: [
    {type: 'say', who: 'ammu', text: 'আমাদের নবীজি ﷺ শিখিয়েছেন,\nখাওয়ার আগে বলতে হয়... বিসমিল্লাহ।', from: 0, to: 1},
    {type: 'footnote', text: 'সহিহ বুখারি ৫৩৭৬, সহিহ মুসলিম ২০২২'},
  ],
  8: [{type: 'dua', mode: 'broken', from: 0.05, to: 0.7}, {type: 'dua', mode: 'full', from: 0.7, showMeaning: true}, {type: 'star', at: 0.72}],
  9: [
    {type: 'say', who: 'ammu', text: 'আর খাই কোন হাতে?', from: 0, to: 0.5},
    {type: 'say', who: 'umayer', text: 'ডান হাতে!', from: 0.5, to: 1},
  ],
  10: [
    {type: 'say', who: 'ammu', text: 'ঠিক! আর খাই নিজের সামনে থেকে।\nপ্লেটের মাঝখান থেকে নয়।', from: 0, to: 1},
    {type: 'footnote', text: 'সহিহ বুখারি ৫৩৭৬'},
  ],
  11: [{type: 'say', who: 'umayer', text: 'এবার তুমি বলো!', from: 0, to: 0.25}, {type: 'repeat', parts: [0.28, 0.52, 0.76]}],
  12: [
    {type: 'say', who: 'safa', text: 'বিচমিল্লাহ!', from: 0, to: 0.45},
    {type: 'say', who: 'umayer', text: 'সাফাও পেরেছে! তুমিও পেরেছো!', from: 0.45, to: 1},
    {type: 'star', at: 0.1},
  ],
  13: [
    {type: 'say', who: 'umayer', text: 'বিসমিল্লাহ!', from: 0, to: 0.25},
    {type: 'say', who: 'umayer', text: 'মমম! আজকে ভাত আরও মজা লাগছে!', from: 0.25, to: 0.62},
    {type: 'say', who: 'ammu', text: 'বরকত, সোনা।\nআল্লাহর নাম নিলে এমনই হয়।', from: 0.62, to: 1},
  ],
  14: [
    {type: 'say', who: 'miu', text: 'মিউ!', from: 0, to: 0.3},
    {type: 'say', who: 'everyone', label: 'উমায়ের ও সাফা', text: 'মিউও বিসমিল্লাহ বলেছে!', from: 0.3, to: 1},
  ],
  15: [
    {type: 'say', who: 'umayer', text: 'আজ খাওয়ার সময় তুমিও বলবে তো?', from: 0, to: 0.45},
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.45, to: 1},
    {type: 'card', from: 0.05},
  ],
};

export type SceneMedia = {file?: string; image?: string; seconds?: number};
export const ep01Clips = clips as Record<string, SceneMedia>;
