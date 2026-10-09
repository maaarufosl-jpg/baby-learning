// Shared helpers for the reels scripts: load the TypeScript reel data and read/write src/media.json.
import {build} from 'esbuild';
import {execFileSync} from 'node:child_process';
import {existsSync, readFileSync, writeFileSync} from 'node:fs';

export const loadReels = async () => {
  const out = await build({entryPoints: ['src/data/reels.ts'], bundle: true, format: 'esm', write: false, platform: 'neutral'});
  return (await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'))).reels;
};

export const reelArg = async () => {
  const id = process.argv[2];
  const reels = await loadReels();
  const reel = reels.find((r) => r.id === id || r.number === Number(id));
  if (!reel) {
    console.error(`Which reel? e.g. "reel01" or "1". Known: ${reels.map((r) => r.id).join(', ')}`);
    process.exit(1);
  }
  return reel;
};

const MEDIA = 'src/media.json';
export const readMedia = () => (existsSync(MEDIA) ? JSON.parse(readFileSync(MEDIA, 'utf8')) : {});
export const writeMedia = (m) => writeFileSync(MEDIA, JSON.stringify(m, null, 2) + '\n');

export const duration = (file) =>
  Math.round(Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', file]).toString().trim()) * 100) / 100;
