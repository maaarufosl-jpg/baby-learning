// Attaches recorded voice lines to an episode.
// Put recordings in public/audio/<ep>/ named like the voice script ("05-umayer.m4a", "11-ammu.mp3", ...).
// Only the leading number matters. Any format ffmpeg reads works (mp3, m4a, wav, ogg, aac, opus).
// Usage: node scripts/attach-audio.mjs ep01
import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, readdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const id = process.argv[2] ?? 'ep01';
const srcDir = join('public', 'audio', id);
const readyDir = join(srcDir, '_ready');
const map = {};

if (existsSync(srcDir)) {
  mkdirSync(readyDir, {recursive: true});
  for (const name of readdirSync(srcDir).sort()) {
    const m = name.match(/^(\d+)[-_ .]/);
    if (!m || name.startsWith('_')) continue;
    const beat = Number(m[1]);
    const out = join(readyDir, `${String(beat).padStart(2, '0')}.wav`);
    // Trim leading/trailing silence, even out loudness, and convert to 48 kHz WAV.
    execFileSync('ffmpeg', [
      '-loglevel', 'error', '-y', '-i', join(srcDir, name),
      '-af', 'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,loudnorm=I=-16:TP=-1.5:LRA=11,adelay=150|150',
      '-ar', '48000', '-ac', '1', out,
    ]);
    const seconds = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out]).toString().trim());
    map[beat] = {file: `audio/${id}/_ready/${String(beat).padStart(2, '0')}.wav`, seconds: Math.round(seconds * 100) / 100};
    console.log(`line ${beat}: ${name} -> ${seconds.toFixed(2)}s`);
  }
}
writeFileSync(join('src', 'episodes', `${id}.audio.json`), JSON.stringify(map, null, 2) + '\n');
console.log(`${Object.keys(map).length} voice line(s) attached to ${id}.`);
