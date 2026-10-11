// Renders one reel to out/<reel>.mp4. Warns when narration or recitation has not been made yet.
// Usage: node scripts/render.mjs reel01
import {execFileSync} from 'node:child_process';
import {readMedia, reelArg} from './lib.mjs';

const reel = await reelArg();
const audio = readMedia()[reel.id]?.audio ?? {};
const needed = reel.steps.reduce((n, s) => n + s.say.length, 0);
if (Object.keys(audio).length < needed) console.warn(`${reel.id}: audio missing; run "npm run narrate ${reel.id}" and "npm run quran ${reel.id}" first.`);
const out = `out/${reel.id}.mp4`;
execFileSync('npx', ['remotion', 'render', reel.id, out, '--codec=h264', '--crf=18', '--audio-codec=aac'], {stdio: 'inherit'});
console.log(`Done: ${out}`);
