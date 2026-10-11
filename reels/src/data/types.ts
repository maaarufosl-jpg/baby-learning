export type Kind = 'asma' | 'names' | 'ayah' | 'hadith';

export const KIND_LABEL: Record<Kind, string> = {
  asma: 'আল্লাহর সুন্দর নাম',
  names: 'ইসলামিক নাম',
  ayah: 'ছোট আয়াত',
  hadith: 'ছোট হাদিস',
};

/**
 * One line of on-screen text.
 * kicker: small label · arabicXL: one big Arabic word · arabic: Arabic sentence · title: big Bengali
 * body: Bengali meaning · note: smaller Bengali · source: reference line
 * The line appears when sound number `with` of its step starts (default: the step's start), plus `delay` seconds.
 */
export type Line = {style: 'kicker' | 'arabicXL' | 'arabic' | 'title' | 'body' | 'note' | 'source'; text: string; with?: number; delay?: number};

/**
 * Something heard in a step: Bengali narration (TTS), a qari's recitation of an ayah (optionally only some of its words),
 * or hadith Arabic read by an Arabic TTS voice (chosen by the user; never used for Quran).
 */
export type Say = {voice: string} | {quran: string; words?: [number, number]} | {hadithArabic: string};

/** One block of text on screen, held while its sounds play one after another (after `lead` seconds), then `hold` seconds more. */
export type Step = {lines: Line[]; say: Say[]; lead?: number; hold?: number};

/** A card placed in time (seconds), with each line's appear time. */
export type Card = {from: number; to: number; lines: (Line & {at: number})[]};

export type Scene = {
  /** Drawn scene key from scenes.ts. */
  art: string;
  /** Ambience file in public/sfx (no music). */
  sound: string;
  /** What the scene shows, in Bengali, for the plan. */
  look: string;
  /** Optional English prompt, only if a real video clip is ever wanted instead of the drawn scene. */
  prompt: string;
  /** Base colours (top, bottom), used behind the scene. */
  tint: [string, string];
};

export type Reel = {
  id: string;
  number: number;
  kind: Kind;
  title: string;
  scenes: Scene[];
  steps: Step[];
  /** Every reference shown or used, for the scholar. */
  sources: string[];
  /** Items the scholar should tick before publishing. */
  checklist: string[];
  /** Things I am not fully sure about. */
  unsure: string[];
};
