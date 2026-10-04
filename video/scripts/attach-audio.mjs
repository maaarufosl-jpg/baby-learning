// Attaches recorded voice lines to an episode.
// Put recordings in public/audio/<ep>/ named like the voice script ("05-umayer.m4a", "11-ammu.mp3", ...).
// Only the leading number matters. Any format ffmpeg reads works (mp3, m4a, wav, ogg, aac, opus).
// Usage: node scripts/attach-audio.mjs ep01 [--pitch umayer=3,safa=5]
//   --pitch raises the pitch (in semitones) of files whose name contains "-<voice>",
//   e.g. to make a young adult voice sound like a child. Speed stays the same.
import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, readdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith('--') && !a.includes('=')) ?? 'ep01';
const pitchArg = args.includes('--pitch') ? args[args.indexOf('--pitch') + 1] ?? '' : '';
const pitch = Object.fromEntries(
  pitchArg
    .split(',')
    .filter(Boolean)
    .map((kv) => kv.split('='))
    .map(([k, v]) => [k.trim(), Number(v)]),
);
const pitchFor = (name) => {
  const hit = Object.keys(pitch).find((voice) => name.includes(`-${voice}`));
  return hit ? pitch[hit] : 0;
};
const srcDir = join('public', 'audio', id);
const readyDir = join(srcDir, '_ready');
const map = {};

if (existsSync(srcDir)) {
  mkdirSync(readyDir, {recursive: true});
  // Group files by their leading line number; several files for one line (e.g. "everyone") are mixed together.
  const groups = new Map();
  for (const name of readdirSync(srcDir).sort()) {
    const m = name.match(/^(\d+)[-_ .]/);
    if (!m || name.startsWith('_')) continue;
    const beat = Number(m[1]);
    groups.set(beat, [...(groups.get(beat) ?? []), name]);
  }
  for (const [beat, names] of [...groups.entries()].sort((x, y) => x[0] - y[0])) {
    const nn = String(beat).padStart(2, '0');
    const out = join(readyDir, `${nn}.wav`);
    // Trim leading/trailing silence, even out loudness, and convert to 48 kHz mono WAV.
    const clean = 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,loudnorm=I=-16:TP=-1.5:LRA=11,adelay=150|150';
    const inputs = names.flatMap((n) => ['-i', join(srcDir, n)]);
    // Optional per-voice pitch shift before mixing.
    const shifted = names.map((n, i) => {
      const st = pitchFor(n);
      return st ? `[${i}:a]rubberband=pitch=${Math.pow(2, st / 12).toFixed(4)}:formant=shifted:pitchq=quality,highpass=f=90,equalizer=f=3000:t=q:w=1:g=2[p${i}]` : `[${i}:a]anull[p${i}]`;
    });
    const mixed = names.length > 1 ? `${names.map((_, i) => `[p${i}]`).join('')}amix=inputs=${names.length}:duration=longest:normalize=0,` : '[p0]';
    const filter = names.length > 1 ? `${shifted.join(';')};${mixed}${clean}` : `${shifted[0]};[p0]${clean}`;
    execFileSync('ffmpeg', ['-loglevel', 'error', '-y', ...inputs, '-filter_complex', filter, '-ar', '48000', '-ac', '1', out]);
    const seconds = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out]).toString().trim());
    map[beat] = {file: `audio/${id}/_ready/${nn}.wav`, seconds: Math.round(seconds * 100) / 100};
    const shiftNote = names.some((n) => pitchFor(n)) ? ' (pitch raised)' : '';
    console.log(`line ${beat}: ${names.join(' + ')} -> ${seconds.toFixed(2)}s${shiftNote}`);
  }
}
writeFileSync(join('src', 'episodes', `${id}.audio.json`), JSON.stringify(map, null, 2) + '\n');
console.log(`${Object.keys(map).length} voice line(s) attached to ${id}.`);
