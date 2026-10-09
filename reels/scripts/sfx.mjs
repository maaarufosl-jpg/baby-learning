// Generates the shared library of natural ambience (no music) with the ElevenLabs sound-effects API.
// Each sound is ~10 s and reused across reels. Files go to public/sfx/<name>.mp3.
// The key comes only from the ELEVENLABS_API_KEY environment variable.
// Usage: node scripts/sfx.mjs [name ...]   (no names = generate the missing ones)
import {existsSync, mkdirSync, writeFileSync} from 'node:fs';

export const SOUNDS = {
  'morning-birds': 'Calm early morning countryside ambience, soft breeze, faint distant songbirds far away, peaceful, no music',
  stream: 'Gentle clear stream flowing over small stones in a quiet forest, soft water babbling, no music',
  rain: 'Gentle steady rain falling on leaves and a field, calm, no thunder, no music',
  'rain-water': 'Soft rain falling on the calm surface of a lake, gentle drops on water, no thunder, no music',
  waterfall: 'Steady waterfall pouring into a pool in a forest, constant soft roar of falling water, no music',
  wind: 'Soft warm wind blowing through tall grass in an open meadow, calm, no music',
  'mountain-wind': 'Cool mountain wind, airy and calm, very soft distant thunder rumble once, no music',
  leaves: 'Leaves of a large tree rustling softly in a light breeze, calm afternoon, no music',
  night: 'Quiet calm night ambience, very soft breeze, still air, peaceful, no insects, no music',
  waves: 'Gentle small sea waves washing onto a sandy beach at sunset, calm, no music',
};

const key = process.env.ELEVENLABS_API_KEY;
if (!key) {
  console.error('ELEVENLABS_API_KEY is not set.');
  process.exit(1);
}
mkdirSync('public/sfx', {recursive: true});
const wanted = process.argv.slice(2);
for (const [name, text] of Object.entries(SOUNDS)) {
  const file = `public/sfx/${name}.mp3`;
  if (wanted.length ? !wanted.includes(name) : existsSync(file)) continue;
  const res = await fetch('https://api.elevenlabs.io/v1/sound-generation', {
    method: 'POST',
    headers: {'xi-api-key': key, 'Content-Type': 'application/json'},
    body: JSON.stringify({text, duration_seconds: 10, prompt_influence: 0.6}),
  });
  if (!res.ok) throw new Error(`${name}: ${res.status} ${await res.text()}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  console.log(`${name}: ${file}`);
}
