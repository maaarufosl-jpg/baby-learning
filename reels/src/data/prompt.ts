/** Builds a copy-paste Gemini (Veo) prompt with the fixed safety rules at the end. */
export const veo = (subject: string, sounds: string, seconds = 8) =>
  [
    `Vertical 9:16 video, ${seconds} seconds, photorealistic cinematic nature footage.`,
    subject,
    'Very slow, calm camera movement. Soft natural light, peaceful mood, gentle colours.',
    'Keep the middle of the frame soft and uncluttered so text can be placed over it.',
    `Audio: only natural sounds — ${sounds}.`,
    'No people, no animals, no birds or insects visible, no faces, no hands, no buildings, no text, no logos, no watermark, no music, no voice, only natural sounds.',
  ].join(' ');

/**
 * A Gemini (Veo) prompt whose clip also carries the Bengali narration: a soft male voiceover (nobody on screen).
 * Used for reels where Gemini makes the voice; Quran recitation is never asked of Gemini.
 */
/**
 * The narrator the user chose (reel 25, clip 3): a soft young boy's voice, fairly high (about 250 Hz), calm and warm.
 * Described the same way in every prompt so Gemini's voice stays as close to it as possible.
 */
export const VOICE =
  'the same gentle narrator in every clip: a soft, sweet young Bangladeshi boy of about 12, with a fairly high, clear voice, calm, warm and kind, smiling slightly, never robotic';

export const veoVoice = (subject: string, sounds: string, line: string) =>
  [
    'Vertical 9:16 video, 8 seconds, photorealistic cinematic nature footage.',
    subject,
    'Very slow, calm camera movement. Soft natural light, peaceful mood, gentle colours.',
    'Keep the middle of the frame soft and uncluttered so text can be placed over it.',
    `Audio: soft natural sounds (${sounds}) and ${VOICE}, speaking slowly and clearly in Bengali as a voiceover with no one on screen, starting after one second and saying exactly: "${line}"`,
    'No people, no animals, no birds or insects visible, no faces, no hands, no buildings, no text, no subtitles, no logos, no watermark, no music.',
  ].join(' ');
