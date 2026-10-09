// Makes the soft, slow Bengali narration for one reel with ElevenLabs. Arabic is never sent to the AI voice.
// The key comes only from the ELEVENLABS_API_KEY environment variable (never write it into a file).
// Usage: node scripts/narrate.mjs reel01 [--voice "Mahika"] [--model eleven_v3] [--out public/audio/reel01]
import {mkdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {duration, readMedia, reelArg, writeMedia} from './lib.mjs';

const argv = process.argv.slice(3);
const opt = (name, def) => (argv.includes(`--${name}`) ? argv[argv.indexOf(`--${name}`) + 1] : def);
const key = process.env.ELEVENLABS_API_KEY;
if (!key) {
  console.error('ELEVENLABS_API_KEY is not set.');
  process.exit(1);
}
const reel = await reelArg();
const API = 'https://api.elevenlabs.io';
const api = async (path, init = {}) => {
  const res = await fetch(API + path, {...init, headers: {'xi-api-key': key, 'Content-Type': 'application/json'}});
  if (!res.ok) throw new Error(`${init.method ?? 'GET'} ${path} -> ${res.status} ${await res.text()}`);
  return res;
};

const ARABIC = /[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]/;
const voiceName = opt('voice', 'Mahika');
const voices = (await (await api('/v1/voices')).json()).voices;
const voice = voices.find((v) => v.voice_id === voiceName || v.name.toLowerCase().includes(voiceName.toLowerCase()));
if (!voice) throw new Error(`Voice "${voiceName}" not found in the account.`);
const model = opt('model', 'eleven_v3');
const custom = opt('out', '');
const dir = custom || join('public', 'audio', reel.id);
mkdirSync(dir, {recursive: true});
console.log(`${reel.id}: voice ${voice.name}, model ${model}`);

const media = readMedia();
const entry = (media[reel.id] ??= {});
if (!custom) entry.voice = {};
for (const [i, line] of reel.narration.entries()) {
  if (ARABIC.test(line.text)) throw new Error(`Line ${i + 1} contains Arabic; Arabic must be a human recording.`);
  const res = await api(`/v1/text-to-speech/${voice.voice_id}?output_format=mp3_44100_128`, {
    method: 'POST',
    body: JSON.stringify({
      text: line.text,
      model_id: model,
      language_code: 'bn',
      voice_settings: {stability: Number(opt('stability', '0.6')), similarity_boost: 0.75, speed: Number(opt('speed', '0.9'))},
    }),
  });
  const file = join(dir, `n${i + 1}.mp3`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  const seconds = duration(file);
  if (!custom) entry.voice[i + 1] = {file: file.replace(/^public\//, ''), seconds};
  const next = reel.narration[i + 1]?.at ?? 21.8;
  const warn = line.at + seconds > next ? `  ⚠ runs ${(line.at + seconds - next).toFixed(1)}s into the next line` : '';
  console.log(`n${i + 1} @${line.at}s ${seconds}s  "${line.text}"${warn}`);
}
if (!custom) writeMedia(media);
