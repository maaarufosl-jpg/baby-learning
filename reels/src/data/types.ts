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
 * `at` (seconds from reel start) delays the line inside its card.
 */
export type Line = {style: 'kicker' | 'arabicXL' | 'arabic' | 'title' | 'body' | 'note' | 'source'; text: string; at?: number};

/** A block of lines shown from `from` to `to` seconds. */
export type Card = {from: number; to: number; lines: Line[]};

/** One 8-second scene: a drawn nature scene (or, if one is attached later, a real video clip). */
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

/** A Bengali narration line made with ElevenLabs, played at `at` seconds. */
export type Narration = {at: number; text: string};

export type Reel = {
  id: string;
  number: number;
  kind: Kind;
  title: string;
  scenes: Scene[];
  cards: Card[];
  narration: Narration[];
  /** Where a recorded Arabic voice goes (seconds) and what it should say. Without a recording, the Arabic is text only. */
  arabicVoice?: {at: number; text: string};
  /** Every reference shown or used, for the scholar. */
  sources: string[];
  /** Items the scholar should tick before publishing. */
  checklist: string[];
  /** Things I am not fully sure about. */
  unsure: string[];
};
