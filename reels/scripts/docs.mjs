// Writes the Bengali plan for every reel (on-screen timeline, Gemini prompts, sources, scholar checklist)
// to docs/reelNN.md and the series list to docs/reels-list.md, all from src/data/reels.ts.
// Usage: node scripts/docs.mjs
import {mkdirSync, writeFileSync} from 'node:fs';
import {loadData, readMedia} from './lib.mjs';

const {reels, buildTimeline, CAPTIONS} = await loadData();
const media = readMedia();
const BN = '০১২৩৪৫৬৭৮৯';
const bn = (x) => String(x).replace(/\d/g, (d) => BN[d]);
const t = (s) => bn(`০:${String(Math.floor(s)).padStart(2, '0')}`);
const len = (s) => bn(String(Math.round(s)));
const KIND = {asma: 'আল্লাহর সুন্দর নাম', dua: 'ছোট দোয়া', ayah: 'ছোট আয়াত', hadith: 'ছোট হাদিস'};
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
  'বাংলা বর্ণনার (AI কণ্ঠ) প্রতিটি বাক্য শুনে ঠিক আছে, বিশেষ করে নামের বাংলা উচ্চারণ',
  'কুরআনের তিলাওয়াত (মিশারি রাশিদ আল-আফাসি) ঠিক জায়গা থেকে শুরু ও শেষ হয়েছে, কোনো শব্দ কাটা পড়েনি',
];

mkdirSync('docs', {recursive: true});
for (const r of reels) {
  const tl = buildTimeline(r, media[r.id]);
  const rows = [];
  for (const c of tl.cards) for (const l of c.lines) rows.push({at: l.at, what: l.text, kind: 'লেখা'});
  for (const x of tl.sounds) rows.push({at: x.at, what: x.quran ? `তিলাওয়াত (মিশারি রাশিদ আল-আফাসি): ${bn(x.text)}` : x.text, kind: x.quran ? 'কুরআন' : 'কণ্ঠ'});
  rows.push({at: tl.endAt, what: 'শেষ কার্ড: লোগো, সিরিজের নাম, "পরের রিল দেখতে ফলো করুন"', kind: 'লেখা'});
  rows.sort((a, b) => a.at - b.at);

  const md = [
    `# রিল ${bn(r.number)}: ${r.title}`,
    '',
    `ধরন: ${KIND[r.kind]} · দৈর্ঘ্য: প্রায় ${len(tl.total)} সেকেন্ড · খাড়া ১০৮০×১৯২০ · ${bn(r.scenes.length)}টি প্রকৃতির দৃশ্য`,
    '',
    '## পোস্টের ক্যাপশন (কপি করে রিলের বিবরণে দিন)',
    '',
    '```',
    CAPTIONS[r.id] ?? '',
    '```',
    '',
    ...(r.scenes.length === 1 && r.scenes[0].prompt
      ? [
          '## Gemini ভিডিও (একটাই, ১০–১৪ সেকেন্ড)',
          '',
          '1. নিচের প্রম্পট পুরোটা কপি করে Gemini-তে দিন। ভিডিও খাড়া (9:16) রাখুন।',
          `2. ভিডিও তৈরি হলে চ্যাটে পাঠান, লিখুন: "রিল ${bn(r.number)}"।`,
          '3. মানুষ, প্রাণী, পাখি, লেখা বা মিউজিক এলে ভিডিওটা বাদ দিয়ে আবার বানান।',
          '',
          '```',
          r.scenes[0].prompt,
          '```',
          '',
          `ভিডিও না আসা পর্যন্ত কোডে আঁকা দৃশ্য দেখানো হয়। রিলের লেখা ও কণ্ঠ শেষ হয় প্রায় ${len(tl.endAt)} সেকেন্ডে; ১০–১২ সেকেন্ডের ভিডিও হলে একটু ধীর করে মিলিয়ে নেওয়া হবে।`,
          '',
        ]
      : []),
    '## দৃশ্য (কোনো মানুষ বা প্রাণী নেই)',
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
  'চার ধরনের রিল পালা করে আসবে: সুন্দর নাম → ছোট দোয়া → আয়াত → হাদিস। প্রতিটির পুরো পরিকল্পনা `docs/reelNN.md` ফাইলে।',
  '',
  '| # | ধরন | বিষয় | সূত্র |',
  '|---|---|---|---|',
  ...reels.map((r) => `| ${bn(r.number)} | ${KIND[r.kind]} | ${r.title} | ${r.sources.map((s) => s.split(' — ')[0]).join('; ')} |`),
  '',
];
writeFileSync('docs/reels-list.md', list.join('\n'));
writeFileSync(
  'docs/captions.md',
  ['# পোস্টের ক্যাপশন', '', 'প্রতিটি রিলের সাথে কপি করে বিবরণে দিন।', '', ...reels.flatMap((r) => [`## রিল ${bn(r.number)}: ${r.title}`, '', '```', CAPTIONS[r.id] ?? '', '```', ''])].join('\n'),
);
console.log(`Wrote ${reels.length} reel plans and docs/reels-list.md`);
