export type CharacterId = 'umayer' | 'safa' | 'ammu' | 'abbu' | 'nanu' | 'miu';
export type Mood = 'happy' | 'excited' | 'surprised' | 'thinking' | 'calm' | 'sad';
export type BackgroundId = 'kitchen' | 'plain' | 'outdoor';
export type ArmPose = 'down' | 'up' | 'wave' | 'reach' | 'eat';
export type PropId = 'plateGlow' | 'rightHand';

export type CharacterPlacement = {
  id: CharacterId;
  /** Horizontal position as a fraction of the stage width (0 = left, 1 = right). */
  x: number;
  /** Vertical position of the character's feet as a fraction of the stage height. */
  y: number;
  scale?: number;
  mood?: Mood;
  /** Mouth animation. Defaults to true when this character is the speaker. */
  talking?: boolean;
  /** Arm poses, from the character's own point of view. */
  arms?: {right?: ArmPose; left?: ArmPose};
  /** Small side-to-side head shake ("no no!"). */
  shake?: boolean;
  /** Small up-down nod ("yes!"). */
  nod?: boolean;
  /** Walk in from this position at the start of the beat. */
  from?: {x: number; y?: number};
};

export type Speech = {
  who: CharacterId | 'narrator' | 'everyone';
  text: string;
  /** Overrides the name shown on the speech bubble. */
  label?: string;
  /** How the line is spoken; overrides the speaker's mood (and the narrator's usual warm tone). */
  mood?: Mood;
  /** The line for text-to-speech, with ElevenLabs audio tags such as "[gasps] এই রে! [whispers] ...". Defaults to the text with a tag from the mood. */
  tts?: string;
};

export type DuaDisplay = {
  /** 'full' shows the whole dua, 'broken' highlights one part after another, 'card' is the end card. */
  mode: 'full' | 'broken' | 'card';
  /** Highlight only this part (used in the repeat-after-me segment). */
  highlightPart?: number;
  showMeaning?: boolean;
};

export type Beat = {
  /** Length of this beat in seconds. Adjust to the recorded voice once audio exists. */
  seconds: number;
  kind: 'intro' | 'story' | 'learn' | 'repeat' | 'outro';
  background: BackgroundId;
  characters?: CharacterPlacement[];
  speech?: Speech;
  dua?: DuaDisplay;
  /** Small footnote at the bottom, e.g. a hadith reference. */
  footnote?: string;
  /** Golden star + "ting" sound at the start of the beat. */
  star?: boolean;
  /** Shows the "your turn" prompt with a dot per second of silence. */
  silence?: boolean;
  /** Big question mark (used for "what did Umayer forget?"). */
  question?: boolean;
  props?: PropId[];
  /** Include this beat in the 60-second Shorts cut. */
  shorts?: boolean;
  /** Optional voice file under public/, e.g. 'audio/ep01/04-ammu.mp3'. */
  audio?: string;
};

export type Dua = {
  /** Short label, e.g. "খাওয়ার আগের দোয়া". */
  name: string;
  arabic: string;
  /** Transliteration split into the parts that are taught one by one. */
  parts: string[];
  meaning: string;
  source: string;
};

export type Episode = {
  id: string;
  number: number;
  season: number;
  title: string;
  dua: Dua;
  beats: Beat[];
};
