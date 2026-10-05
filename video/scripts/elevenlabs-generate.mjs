// Generates voice lines for an episode with the ElevenLabs API.
// Reads the key from the ELEVENLABS_API_KEY environment variable (never commit a key).
//
// Usage:
//   node scripts/elevenlabs-generate.mjs ep01 --voice "Jane" --who umayer --lines 5,13 --out out/voice-tests
//   node scripts/elevenlabs-generate.mjs ep01 --voice "Jane" --who umayer            # all of Umayer's lines
// Options:
//   --voice   voice name (searched in your voices, then the public Voice Library) or a voice id
//   --who     only lines spoken by this character (umayer, safa, ammu, narrator, everyone)
//   --lines   only these line numbers (comma separated)
//   --out     output folder (default public/audio/<ep>)
//   --model   ElevenLabs model id (default eleven_v3)
//   --stability, --similarity  voice settings (default 0.5 / 0.75)
import {build} from 'esbuild';
import {mkdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const argv = process.argv.slice(2);
const opt = (name, def) => (argv.includes(`--${name}`) ? argv[argv.indexOf(`--${name}`) + 1] : def);
const id = argv[0] && !argv[0].startsWith('--') ? argv[0] : 'ep01';
const key = process.env.ELEVENLABS_API_KEY;
if (!key) {
  console.error('Set ELEVENLABS_API_KEY first.');
  process.exit(1);
}
const API = 'https://api.elevenlabs.io';
const headers = {'xi-api-key': key, 'Content-Type': 'application/json'};
const api = async (path, init = {}) => {
  const res = await fetch(API + path, {...init, headers: {...headers, ...(init.headers ?? {})}});
  if (!res.ok) throw new Error(`${init.method ?? 'GET'} ${path} -> ${res.status} ${await res.text()}`);
  return res;
};

/** Finds a voice id by name in the account, then in the public library (adding it to the account). */
const resolveVoice = async (nameOrId) => {
  const own = await (await api('/v1/voices')).json();
  const mine = own.voices.find((v) => v.voice_id === nameOrId || v.name.toLowerCase().includes(nameOrId.toLowerCase()));
  if (mine) return {id: mine.voice_id, name: mine.name};
  const shared = await (await api(`/v1/shared-voices?page_size=20&search=${encodeURIComponent(nameOrId)}`)).json();
  const hit = shared.voices?.[0];
  if (!hit) throw new Error(`Voice "${nameOrId}" not found.`);
  const added = await (await api(`/v1/voices/add/${hit.public_owner_id}/${hit.voice_id}`, {method: 'POST', body: JSON.stringify({new_name: hit.name})})).json();
  return {id: added.voice_id, name: hit.name};
};

const out = await build({entryPoints: [`src/episodes/${id}.ts`], bundle: true, format: 'esm', write: false, platform: 'neutral'});
const ep = (await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64')))[id];
const speakable = (t) => t.replace(/\s*ﷺ/g, ' সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম').replace(/\n/g, ' ');
const TAG = {excited: '[excited]', happy: '[cheerfully]', surprised: '[surprised]', thinking: '[thoughtful]', calm: '[softly]', sad: '[sad]'};

const only = opt('lines', '').split(',').filter(Boolean).map(Number);
const who = opt('who', '');
const jobs = ep.beats
  .map((b, i) => ({b, n: i + 1}))
  .filter(({b, n}) => b.speech && b.speech.who !== 'miu' && (!who || b.speech.who === who) && (!only.length || only.includes(n)))
  .map(({b, n}) => {
    const mood = b.speech.mood ?? b.characters?.find((c) => c.id === b.speech.who)?.mood;
    const tag = b.speech.who === 'narrator' && !b.speech.mood ? '[warmly]' : TAG[mood] ?? '';
    return {n, who: b.speech.who, text: `${tag} ${speakable(b.speech.text)}`.trim()};
  });
if (!jobs.length) throw new Error('No matching lines.');

const voice = await resolveVoice(opt('voice', 'Jane'));
const model = opt('model', 'eleven_v3');
const dir = opt('out', join('public', 'audio', id));
mkdirSync(dir, {recursive: true});
console.log(`Voice: ${voice.name} (${voice.id}), model: ${model}, ${jobs.length} line(s) -> ${dir}`);
for (const j of jobs) {
  const res = await api(`/v1/text-to-speech/${voice.id}?output_format=mp3_44100_128`, {
    method: 'POST',
    body: JSON.stringify({
      text: j.text,
      model_id: model,
      voice_settings: {stability: Number(opt('stability', '0.5')), similarity_boost: Number(opt('similarity', '0.75'))},
    }),
  });
  const file = join(dir, `${String(j.n).padStart(2, '0')}-${j.who}.mp3`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  console.log(`line ${j.n}: ${file}  "${j.text}"`);
}
