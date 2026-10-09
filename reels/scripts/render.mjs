// Renders one reel to out/<reel>.mp4. Warns when the Bengali narration has not been generated yet.
// Usage: node scripts/render.mjs reel01
import {execFileSync} from 'node:child_process';
import {readMedia, reelArg} from './lib.mjs';

const reel = await reelArg();
const voice = readMedia()[reel.id]?.voice ?? {};
if (Object.keys(voice).length < reel.narration.length) console.warn(`${reel.id}: narration missing; run "npm run narrate ${reel.id}" first for a voiced reel.`);
const out = `out/${reel.id}.mp4`;
execFileSync('npx', ['remotion', 'render', reel.id, out, '--codec=h264', '--crf=18', '--audio-codec=aac'], {stdio: 'inherit'});
console.log(`Done: ${out}`);
