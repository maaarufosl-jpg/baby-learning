// Prepares AI-generated scene clips (e.g. from Gemini / Veo) for an episode.
// Put clips in public/clips/<ep>/ named scene01.mp4, scene02.mp4, ... (mp4, mov or webm; only the number matters).
// Each clip is converted to 1920x1080, 30 fps H.264 with loudness-matched AAC audio in public/clips/<ep>/_ready/,
// and src/episodes/<ep>.clips.json is written with each scene's file and length.
// Usage: node scripts/attach-clips.mjs ep01
import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, readdirSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';

const id = process.argv[2] ?? 'ep01';
const srcDir = join('public', 'clips', id);
const readyDir = join(srcDir, '_ready');
const map = {};

if (existsSync(srcDir)) {
  mkdirSync(readyDir, {recursive: true});
  for (const name of readdirSync(srcDir).sort()) {
    const m = name.match(/(\d+)/);
    if (!m || name.startsWith('_') || !/\.(mp4|mov|webm|mkv|m4v)$/i.test(name)) continue;
    const n = Number(m[1]);
    const nn = String(n).padStart(2, '0');
    const out = join(readyDir, `scene${nn}.mp4`);
    const hasAudio = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=index', '-of', 'csv=p=0', join(srcDir, name)]).toString().trim() !== '';
    const args = ['-loglevel', 'error', '-y', '-i', join(srcDir, name)];
    if (!hasAudio) args.push('-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo');
    args.push(
      '-vf', 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,fps=30,format=yuv420p',
      ...(hasAudio ? ['-af', 'loudnorm=I=-16:TP=-1.5:LRA=11'] : ['-shortest']),
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', out,
    );
    execFileSync('ffmpeg', args);
    const seconds = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out]).toString().trim());
    map[n] = {file: `clips/${id}/_ready/scene${nn}.mp4`, seconds: Math.round(seconds * 100) / 100};
    console.log(`scene ${n}: ${name} -> ${seconds.toFixed(2)}s${hasAudio ? '' : ' (no audio)'}`);
  }
}
writeFileSync(join('src', 'episodes', `${id}.clips.json`), JSON.stringify(map, null, 2) + '\n');
console.log(`${Object.keys(map).length} scene clip(s) ready for ${id}.`);
