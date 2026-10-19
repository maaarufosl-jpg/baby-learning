import type {CharacterId, Dua} from '../types';

/**
 * Overlays drawn on top of an episode's scene clips or still images.
 * Times are fractions of the scene's length (0 = start, 1 = end) so they still fit if a clip is longer or shorter.
 */
export type ClipOverlay =
  | {type: 'title'; to?: number}
  | {
      type: 'dua';
      mode: 'full' | 'broken';
      from?: number;
      to?: number;
      showMeaning?: boolean;
      pop?: boolean;
      align?: 'center' | 'right' | 'left';
      /** For 'broken': when each syllable lights up, as fractions of the scene. Evenly spaced if left out. */
      times?: number[];
      /** Panel size: 0.6 at the side, 0.62 in the middle by default. */
      scale?: number;
    }
  | {type: 'repeat'; parts: number[]; until?: number; align?: 'center' | 'right' | 'left'; /** Panel size, 0.62 by default. */ scale?: number}
  | {type: 'star'; at: number}
  | {type: 'footnote'; text: string}
  | {type: 'card'; from: number}
  | {type: 'question'; from: number; x?: number; y?: number}
  | {type: 'recap'; from: number; to: number}
  | {type: 'say'; who: CharacterId | 'narrator' | 'everyone'; text: string; from: number; to: number; label?: string; top?: number};

export type SceneMedia = {file?: string; image?: string; seconds?: number};

export type ClipConfig = {
  number: number;
  title: string;
  dua: Dua;
  /** Previous episode's dua, shown as a short reminder. */
  previousDua?: Dua;
  sceneCount: number;
  clips: Record<string, SceneMedia>;
  overlays: Record<number, ClipOverlay[]>;
  imageSeconds?: Record<number, number>;
  imageMove?: Record<number, {to: number; origin: [number, number]}>;
  fallbackImage?: Record<number, number>;
  leadIn?: Record<number, {image: string; audio: string; seconds: number; text: string}>;
  voiceOver?: Record<number, {audio: string; at: number; seconds: number}[]>;
  /** Use another episode's clip for a scene, e.g. the shared opening. */
  borrowClip?: Record<number, SceneMedia>;
};
