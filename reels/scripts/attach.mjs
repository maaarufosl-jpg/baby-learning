// Prepares the Gemini (Veo) clips and an optional recorded Arabic voice for one reel.
//   Clips:  public/clips/<reel>/scene1.mp4, scene2.mp4, scene3.mp4 (mp4/mov/webm; only the number matters)
//   Arabic: public/audio/<reel>/arabic.m4a (or .mp3/.wav/.ogg/.opus/.aac) — a person's recording, never AI
// Clips become 1080x1920, 30 fps H.264, at most 8 s, with loudness-matched natural sound in _ready/.
// Usage: node scripts/attach.mjs reel01
import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, readdirSync} from 'node:fs';
import {join} from 'node:path';
import {duration, readMedia, reelArg, writeMedia} from './lib.mjs';

const reel = await reelArg();
const media = readMedia();
const entry = (media[reel.id] ??= {});
entry.clips = {};

const clipDir = join('public', 'clips', reel.id);
if (existsSync(clipDir)) {
  const ready = join(clipDir, '_ready');
  mkdirSync(ready, {recursive: true});
  for (const name of readdirSync(clipDir).sort()) {
    const m = name.match(/(\d+)/);
    if (!m || name.startsWith('_') || !/\.(mp4|mov|webm|mkv|m4v)$/i.test(name)) continue;
    const n = Number(m[1]);
    const src = join(clipDir, name);
    const out = join(ready, `scene${n}.mp4`);
    const hasAudio = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'a', '-show_entries', 'stream=index', '-of', 'csv=p=0', src]).toString().trim() !== '';
    const args = ['-loglevel', 'error', '-y', '-i', src];
    if (!hasAudio) args.push('-f', 'lavfi', '-i', 'anullsrc=r=48000:cl=stereo');
    args.push(
      '-t', '8',
      '-vf', 'scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,fps=30,format=yuv420p',
      ...(hasAudio ? ['-af', 'loudnorm=I=-20:TP=-2:LRA=11'] : ['-shortest']),
      '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', out,
    );
    execFileSync('ffmpeg', args);
    entry.clips[n] = {file: `clips/${reel.id}/_ready/scene${n}.mp4`, seconds: duration(out)};
    console.log(`scene ${n}: ${name} -> ${entry.clips[n].seconds}s${hasAudio ? '' : ' (no sound in clip)'}`);
  }
}

const audioDir = join('public', 'audio', reel.id);
const arabic = existsSync(audioDir) && readdirSync(audioDir).find((f) => /^arabic\.(m4a|mp3|wav|ogg|opus|aac)$/i.test(f));
if (arabic) {
  const out = join(audioDir, 'arabic-ready.wav');
  // trim silence at the start, match loudness to the narration
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-i', join(audioDir, arabic), '-af', 'silenceremove=start_periods=1:start_threshold=-45dB,loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '48000', out]);
  entry.arabic = {file: `audio/${reel.id}/arabic-ready.wav`, seconds: duration(out)};
  console.log(`arabic voice: ${arabic} -> ${entry.arabic.seconds}s`);
} else {
  delete entry.arabic;
}

writeMedia(media);
const missing = reel.scenes.map((_, i) => i + 1).filter((n) => !entry.clips[n]);
console.log(missing.length ? `${reel.id}: still waiting for scene ${missing.join(', ')}.` : `${reel.id}: all 3 scenes ready.`);
