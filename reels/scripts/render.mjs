// Renders one finished reel to out/<reel>.mp4. Refuses while a scene clip is missing.
// Usage: node scripts/render.mjs reel01 [--draft]   (--draft renders with placeholders for a preview)
import {execFileSync} from 'node:child_process';
import {readMedia, reelArg} from './lib.mjs';

const reel = await reelArg();
const draft = process.argv.includes('--draft');
const clips = readMedia()[reel.id]?.clips ?? {};
const missing = reel.scenes.map((_, i) => i + 1).filter((n) => !clips[n]);
if (missing.length && !draft) {
  console.error(`${reel.id}: scene ${missing.join(', ')} not attached yet. Run "npm run attach ${reel.id}" or use --draft.`);
  process.exit(1);
}
const out = `out/${reel.id}${draft ? '-draft' : ''}.mp4`;
execFileSync('npx', ['remotion', 'render', reel.id, out, '--codec=h264', '--crf=18', '--audio-codec=aac'], {stdio: 'inherit'});
console.log(`Done: ${out}`);
