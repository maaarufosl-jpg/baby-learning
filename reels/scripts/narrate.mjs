// Makes the soft, slow Bengali narration for one reel. Arabic text is never sent to an AI voice.
// Default engine: Google Cloud Text-to-Speech, native Bengali Chirp 3 HD voices (key: GOOGLE_TTS_API_KEY).
// Optional engine: ElevenLabs (key: ELEVENLABS_API_KEY). Keys come only from the environment, never from files.
// Usage ("all" instead of reel01 does every reel):
//   node scripts/narrate.mjs reel01                               # Google, default voice
//   node scripts/narrate.mjs reel01 --voice bn-IN-Chirp3-HD-Kore --speed 0.9
//   node scripts/narrate.mjs reel01 --engine elevenlabs --voice Sarah
import {mkdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {duration, loadData, readMedia, writeMedia} from './lib.mjs';

export const DEFAULT_VOICE = 'bn-IN-Chirp3-HD-Aoede';
const argv = process.argv.slice(3);
const opt = (name, def) => (argv.includes(`--${name}`) ? argv[argv.indexOf(`--${name}`) + 1] : def);
const engine = opt('engine', 'google');
const speed = Number(opt('speed', '0.9'));
const {reels, soundKey, isQuran, buildTimeline} = await loadData();
const which = process.argv[2];
const list = which === 'all' ? reels : reels.filter((r) => r.id === which || r.number === Number(which));
if (!list.length) {
  console.error('Which reel? e.g. "reel01", "1" or "all".');
  process.exit(1);
}
const ARABIC = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;

const need = (name) => {
  if (!process.env[name]) {
    console.error(`${name} is not set.`);
    process.exit(1);
  }
  return process.env[name];
};

const ok = async (res, what) => {
  if (!res.ok) throw new Error(`${what} -> ${res.status} ${await res.text()}`);
  return res;
};

let speak;
let label;
if (engine === 'google') {
  const key = need('GOOGLE_TTS_API_KEY');
  const name = opt('voice', DEFAULT_VOICE);
  label = name;
  speak = async (text) => {
    const res = await ok(
      await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'X-Goog-Api-Key': key},
        body: JSON.stringify({
          input: {text},
          voice: {languageCode: 'bn-IN', name},
          audioConfig: {audioEncoding: 'MP3', speakingRate: speed, sampleRateHertz: 44100},
        }),
      }),
      'Google TTS',
    );
    return Buffer.from((await res.json()).audioContent, 'base64');
  };
} else {
  const key = need('ELEVENLABS_API_KEY');
  const headers = {'xi-api-key': key, 'Content-Type': 'application/json'};
  const wanted = opt('voice', 'Sarah');
  const voices = (await (await ok(await fetch('https://api.elevenlabs.io/v1/voices', {headers}), 'voices')).json()).voices;
  const voice = voices.find((v) => v.voice_id === wanted || v.name.toLowerCase().includes(wanted.toLowerCase()));
  if (!voice) throw new Error(`Voice "${wanted}" not found in the account.`);
  label = voice.name;
  speak = async (text) => {
    const res = await ok(
      await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice.voice_id}?output_format=mp3_44100_128`, {
        method: 'POST',
        headers,
        body: JSON.stringify({text, model_id: opt('model', 'eleven_v3'), language_code: 'bn', voice_settings: {stability: 0.6, similarity_boost: 0.75, speed}}),
      }),
      'ElevenLabs TTS',
    );
    return Buffer.from(await res.arrayBuffer());
  };
}

const media = readMedia();
console.log(`${engine} voice ${label}, speed ${speed}`);
for (const reel of list) {
  const dir = join('public', 'audio', reel.id);
  mkdirSync(dir, {recursive: true});
  const entry = (media[reel.id] ??= {});
  entry.audio ??= {};
  for (const [si, step] of reel.steps.entries()) {
    for (const [k, s] of step.say.entries()) {
      if (isQuran(s)) continue;
      if (ARABIC.test(s.voice)) throw new Error(`${reel.id} ${soundKey(si, k)} contains Arabic; Arabic is never sent to an AI voice.`);
      const file = join(dir, `v${si + 1}-${k + 1}.mp3`);
      writeFileSync(file, await speak(s.voice));
      entry.audio[soundKey(si, k)] = {file: file.replace(/^public\//, ''), seconds: duration(file)};
      console.log(`${reel.id} ${soundKey(si, k)} ${entry.audio[soundKey(si, k)].seconds}s  "${s.voice}"`);
    }
  }
  const t = buildTimeline(reel, entry);
  console.log(`${reel.id}: ${t.total.toFixed(1)}s${t.total > 30 ? '  ⚠ longer than 30 s' : ''}`);
}
writeMedia(media);
