/** Builds a copy-paste Gemini (Veo) prompt with the fixed safety rules at the end. */
export const veo = (subject: string, sounds: string) =>
  [
    'Vertical 9:16 video, 8 seconds, photorealistic cinematic nature footage.',
    subject,
    'Very slow, calm camera movement. Soft natural light, peaceful mood, gentle colours.',
    'Keep the middle of the frame soft and uncluttered so text can be placed over it.',
    `Audio: only natural sounds — ${sounds}.`,
    'No people, no animals, no birds or insects visible, no faces, no hands, no buildings, no text, no logos, no watermark, no music, no voice, only natural sounds.',
  ].join(' ');
