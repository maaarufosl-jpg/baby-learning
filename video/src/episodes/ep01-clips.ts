import clips from './ep01.clips.json';

/**
 * Overlays drawn on top of the AI-generated scene clips of episode 1
 * (scene numbers follow episodes/ep01-gemini-prompts.md).
 * Times are fractions of the scene's length (0 = start, 1 = end) so they still fit if a clip is longer or shorter.
 */
export type ClipOverlay =
  | {type: 'title'}
  | {type: 'dua'; mode: 'full' | 'broken'; from?: number; to?: number; showMeaning?: boolean}
  | {type: 'repeat'; parts: [number, number, number]}
  | {type: 'star'; at: number}
  | {type: 'footnote'; text: string}
  | {type: 'card'; from: number};

export const EP01_SCENE_COUNT = 15;

export const EP01_OVERLAYS: Record<number, ClipOverlay[]> = {
  1: [{type: 'title'}],
  7: [{type: 'footnote', text: 'সহিহ বুখারি ৫৩৭৬, সহিহ মুসলিম ২০২২'}],
  8: [{type: 'dua', mode: 'broken', from: 0.05, to: 0.7}, {type: 'dua', mode: 'full', from: 0.7, showMeaning: true}, {type: 'star', at: 0.72}],
  10: [{type: 'footnote', text: 'সহিহ বুখারি ৫৩৭৬'}],
  11: [{type: 'repeat', parts: [0.3, 0.55, 0.8]}],
  12: [{type: 'star', at: 0.15}],
  15: [{type: 'card', from: 0.05}],
};

export const ep01Clips = clips as Record<string, {file: string; seconds: number}>;
