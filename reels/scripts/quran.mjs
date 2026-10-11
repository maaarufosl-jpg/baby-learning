// Fetches the Quran recitation for a reel: Mishary Rashid Alafasy (murattal), from quran.com's audio CDN.
// Uses quran.com's word timings to cut a whole ayah or only some of its words out of the surah recording,
// then fades the edges and matches loudness. No AI voice is ever used for Quran.
// Output: public/audio/<reel>/q<step>-<sound>.mp3, recorded in src/media.json.
// Usage: node scripts/quran.mjs reel01   (or "all")
import {execFileSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {duration, loadData, readMedia, writeMedia} from './lib.mjs';

const RECITER = 7; // Mishary Rashid Alafasy on quran.com
const {reels, soundKey, isQuran} = await loadData();
const which = process.argv[2];
const list = which === 'all' ? reels : reels.filter((r) => r.id === which || r.number === Number(which));
if (!list.length) {
  console.error('Which reel? e.g. "reel01", "1" or "all".');
  process.exit(1);
}

const chapterCache = {};
const chapter = async (n) => {
  if (chapterCache[n]) return chapterCache[n];
  const file = join('out', 'cache', `quran-${RECITER}-${n}.json`);
  if (!existsSync(file)) {
    mkdirSync(join('out', 'cache'), {recursive: true});
    const res = await fetch(`https://api.qurancdn.com/api/qdc/audio/reciters/${RECITER}/audio_files?chapter=${n}&segments=true`);
    if (!res.ok) throw new Error(`timings for surah ${n}: ${res.status}`);
    writeFileSync(file, await res.text());
  }
  return (chapterCache[n] = JSON.parse(readFileSync(file, 'utf8')).audio_files[0]);
};

/** Start and end (ms) of a whole ayah or of words [from, to]. The qari sometimes repeats words; the last full run is used. */
const span = (verse, words) => {
  if (!words) return [verse.timestamp_from, verse.timestamp_to];
  const segs = verse.segments.filter((s) => s.length >= 3);
  const endIdx = segs.map((s) => s[0]).lastIndexOf(words[1]);
  if (endIdx < 0) throw new Error(`${verse.verse_key}: word ${words[1]} not in timings`);
  let startIdx = -1;
  for (let i = endIdx; i >= 0; i--) if (segs[i][0] === words[0]) { startIdx = i; break; }
  if (startIdx < 0) throw new Error(`${verse.verse_key}: word ${words[0]} not in timings`);
  // keep the tail of the last word (madd and waqf) unless the next word follows immediately
  const next = segs[endIdx + 1];
  const end = next ? Math.min(segs[endIdx][2] + 250, next[1] + 60) : verse.timestamp_to;
  return [Math.max(verse.timestamp_from, segs[startIdx][1] - 60), end];
};

const media = readMedia();
for (const reel of list) {
  const entry = (media[reel.id] ??= {});
  entry.audio ??= {};
  const dir = join('public', 'audio', reel.id);
  mkdirSync(dir, {recursive: true});
  for (const [si, step] of reel.steps.entries()) {
    for (const [k, s] of step.say.entries()) {
      if (!isQuran(s)) continue;
      const [sura] = s.quran.split(':').map(Number);
      const ch = await chapter(sura);
      const verse = ch.verse_timings.find((v) => v.verse_key === s.quran);
      if (!verse) throw new Error(`${s.quran} not found`);
      const [from, to] = span(verse, s.words);
      const len = (to - from) / 1000;
      const out = join(dir, `q${si + 1}-${k + 1}.mp3`);
      execFileSync('ffmpeg', [
        '-loglevel', 'error', '-y', '-ss', String(from / 1000), '-t', String(len), '-i', ch.audio_url,
        '-af', `afade=t=in:d=0.04,afade=t=out:st=${Math.max(0, len - 0.18)}:d=0.18,loudnorm=I=-16:TP=-1.5:LRA=11`,
        '-ar', '44100', '-b:a', '160k', out,
      ]);
      entry.audio[soundKey(si, k)] = {file: out.replace(/^public\//, ''), seconds: duration(out)};
      console.log(`${reel.id} ${soundKey(si, k)}: ${s.quran}${s.words ? ` words ${s.words.join('-')}` : ''} -> ${entry.audio[soundKey(si, k)].seconds}s`);
    }
  }
}
writeMedia(media);
