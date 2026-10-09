// Writes the Bengali plan for every reel (on-screen timeline, Gemini prompts, sources, scholar checklist)
// to docs/reelNN.md and the series list to docs/reels-list.md, all from src/data/reels.ts.
// Usage: node scripts/docs.mjs
import {mkdirSync, writeFileSync} from 'node:fs';
import {loadReels} from './lib.mjs';

const reels = await loadReels();
const BN = '০১২৩৪৫৬৭৮৯';
const bn = (x) => String(x).replace(/\d/g, (d) => BN[d]);
const t = (s) => bn(`০:${String(Math.floor(s)).padStart(2, '0')}`);
const KIND = {asma: 'আল্লাহর সুন্দর নাম', names: 'ইসলামিক নাম', ayah: 'ছোট আয়াত', hadith: 'ছোট হাদিস'};
const SOUND = {
  'morning-birds': 'ভোরের হালকা বাতাস, দূরে পাখির ডাক',
  stream: 'ছোট নদীর পানির শব্দ',
  rain: 'নরম বৃষ্টি',
  'rain-water': 'পানিতে বৃষ্টির ফোঁটা',
  waterfall: 'ঝরনার পানি',
  wind: 'ঘাসের ওপর বাতাস',
  'mountain-wind': 'পাহাড়ি বাতাস, দূরে একবার হালকা মেঘের গর্জন',
  leaves: 'গাছের পাতার মৃদু শব্দ',
  night: 'শান্ত রাতের বাতাস',
  waves: 'সৈকতে ছোট ঢেউ',
};
const COMMON = [
  'দৃশ্যে কোনো মানুষ, প্রাণী বা পাখি নেই (দৃশ্যগুলো কোডে আঁকা)',
  'প্রকৃতির শব্দে (AI দিয়ে তৈরি) কোনো বাদ্যযন্ত্র বা গানের মতো সুর নেই',
  'বাংলা বর্ণনার (AI কণ্ঠ) প্রতিটি বাক্য শুনে ঠিক আছে',
  'আরবি কণ্ঠ থাকলে উচ্চারণ ও তাজবিদ ঠিক আছে',
];

mkdirSync('docs', {recursive: true});
for (const r of reels) {
  const rows = [];
  for (const c of r.cards) {
    for (const l of c.lines) rows.push({at: l.at ?? c.from, what: l.text, kind: 'লেখা'});
  }
  for (const n of r.narration) rows.push({at: n.at, what: n.text, kind: 'কণ্ঠ'});
  if (r.arabicVoice) rows.push({at: r.arabicVoice.at, what: `${r.arabicVoice.text} (মানুষের রেকর্ড, না থাকলে শুধু লেখা)`, kind: 'আরবি কণ্ঠ'});
  rows.push({at: 21.8, what: 'শেষ কার্ড: লোগো, সিরিজের নাম, "পরের রিল দেখতে ফলো করুন"', kind: 'লেখা'});
  rows.sort((a, b) => a.at - b.at);

  const md = [
    `# রিল ${bn(r.number)}: ${r.title}`,
    '',
    `ধরন: ${KIND[r.kind]} · দৈর্ঘ্য: প্রায় ২৪ সেকেন্ড · খাড়া ১০৮০×১৯২০ · তিনটি ৮ সেকেন্ডের প্রকৃতির দৃশ্য`,
    '',
    '## দৃশ্য (কোডে আঁকা প্রকৃতি, কোনো মানুষ বা প্রাণী নেই)',
    '',
    '| দৃশ্য | কী দেখা যাবে | শব্দ |',
    '|---|---|---|',
    ...r.scenes.map((s, i) => `| ${bn(i + 1)} | ${s.look} | ${SOUND[s.sound] ?? s.sound} |`),
    '',
    '## পর্দায় ও কণ্ঠে যা থাকবে',
    '',
    '| সময় | কী | বিষয় |',
    '|---|---|---|',
    ...rows.map((x) => `| ${t(x.at)} | ${x.kind} | ${x.what} |`),
    '',
    'পুরো সময় দৃশ্যের ওপর নরম অন্ধকার স্তর থাকবে, ওপরে ছোট লোগো। প্রকৃতির শব্দ বাজবে, কণ্ঠের সময় একটু কমে যাবে।',
    '',
    '## সূত্র',
    '',
    ...r.sources.map((s) => `- ${s}`),
    '',
    '## আলেমের যাচাই-তালিকা',
    '',
    ...[...r.checklist, ...COMMON].map((c) => `- [ ] ${c}`),
    '',
    '## যেখানে আমি পুরো নিশ্চিত নই',
    '',
    ...(r.unsure.length ? r.unsure.map((u) => `- ${u}`) : ['- বিশেষ কোনো অনিশ্চয়তা নেই, তবুও উপরের তালিকা ধরে যাচাই করুন।']),
    '',
  ].join('\n');
  writeFileSync(`docs/${r.id}.md`, md);
}

const list = [
  '# প্রথম ১২টি রিল',
  '',
  'চার ধরনের রিল পালা করে আসবে: সুন্দর নাম → বাচ্চাদের নাম → আয়াত → হাদিস। প্রতিটির পুরো পরিকল্পনা `docs/reelNN.md` ফাইলে।',
  '',
  '| # | ধরন | বিষয় | সূত্র |',
  '|---|---|---|---|',
  ...reels.map((r) => `| ${bn(r.number)} | ${KIND[r.kind]} | ${r.title} | ${r.sources.map((s) => s.split(' — ')[0]).join('; ')} |`),
  '',
];
writeFileSync('docs/reels-list.md', list.join('\n'));
console.log(`Wrote ${reels.length} reel plans and docs/reels-list.md`);
