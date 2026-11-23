import clips from './ep27.clips.json';
import type {ClipConfig, ClipOverlay, SceneMedia} from './clip-types';
import {EP26_CONFIG} from './ep26-clips';

/**
 * Episode 27 "কঠিন কাজে কী বলি?" from Gemini clips (scene numbers follow episodes/ep27-gemini-copy.md).
 * Times are fractions of the whole clip (0 = start, 1 = end), before trimming.
 */
export const EP27_SCENE_COUNT = 7;

export const EP27_OVERLAYS: Record<number, ClipOverlay[]> = {
  // The short shared opener: the salam, then the recap.
  1: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!', from: 0.08, to: 0.55, top: 860},
    {type: 'recap', from: 0.45, to: 1},
  ],
  2: [
    {type: 'say', who: 'umayer', text: 'উফ! মা, তরমুজটা খুব ভারী!', from: 0.42, to: 0.72, top: 880},
    {type: 'say', who: 'ammu', text: 'একটা দোয়া বলে দেখো!', from: 0.75, to: 0.9, top: 880},
  ],
  // The bubbles sit higher so the source note below does not touch them; Umayer's unscripted reply after 6.2s is cut.
  3: [
    {type: 'say', who: 'ammu', text: 'কঠিন কাজে বলি,\nলা হাওলা ওয়ালা কুওয়াতা ইল্লা বিল্লাহ।', from: 0.12, to: 0.43, top: 730},
    {type: 'say', who: 'ammu', text: 'এটা জান্নাতের গুপ্তধন!', from: 0.44, to: 0.62, top: 830},
    {type: 'footnote', text: 'সহিহ বুখারি ৬৩৮৪, সহিহ মুসলিম ২৭০৪'},
  ],
  // Episode 7's goodbye stands in for this episode's own: same outfits, kept from the salam on.
  7: [
    {type: 'say', who: 'everyone', text: 'আসসালামু আলাইকুম!\nপরের পর্বে দেখা হবে!', from: 0.39, to: 0.8},
    {type: 'card', from: 0.38},
  ],
};

export const ep27Clips = clips as Record<string, SceneMedia>;

export const EP27_CONFIG: ClipConfig = {
  number: 27,
  title: 'কঠিন কাজে কী বলি?',
  dua: {
    name: 'জান্নাতের গুপ্তধন',
    arabic: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    parts: ['লা হাওলা', 'ওয়ালা কুওয়াতা', 'ইল্লা বিল্লাহ'],
    meaning: 'আল্লাহর সাহায্য ছাড়া কোনো শক্তি ও ক্ষমতা নেই',
    source: 'সহিহ বুখারি ৬৩৮৪, সহিহ মুসলিম ২৭০৪',
  },
  previousDua: EP26_CONFIG.dua,
  sceneCount: EP27_SCENE_COUNT,
  clips: ep27Clips,
  overlays: EP27_OVERLAYS,
  // The opening greeting is a short cut of episode 1's first scene (public/clips/shared/opener.mp4).
  borrowClip: {1: {file: 'clips/shared/opener.mp4', seconds: 4.1}, 7: {file: 'clips/ep07/_ready/scene10.mp4', seconds: 10.1}},
  introSeconds: 2.5,
  // Seconds of each Gemini clip to keep, so the episode stays short.
  trim: {
    2: [0.5, 9.1],
    3: [1.0, 6.2],
    7: [3.8, 8.6],
  },
};
