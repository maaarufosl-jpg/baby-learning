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
const COMMON = [
  'তিনটি ভিডিওতে কোনো মানুষ, প্রাণী, পাখি, মুখ, হাত, লেখা বা লোগো নেই',
  'ভিডিওর শব্দে কোনো বাদ্যযন্ত্র বা গান নেই, শুধু প্রকৃতির শব্দ',
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
    `ধরন: ${KIND[r.kind]} · দৈর্ঘ্য: প্রায় ২৪ সেকেন্ড · খাড়া ১০৮০×১৯২০ · তিনটি ৮ সেকেন্ডের প্রকৃতির ভিডিও`,
    '',
    '## আপনার কাজ',
    '',
    '1. নিচের "দৃশ্য ১" এর প্রম্পট পুরোটা কপি করে Gemini-তে পেস্ট করুন। ভিডিও খাড়া (9:16) রাখুন।',
    `2. ভিডিও তৈরি হলে চ্যাটে পাঠান, সাথে লিখুন: "রিল ${bn(r.number)}, দৃশ্য ১"।`,
    '3. একইভাবে দৃশ্য ২ ও দৃশ্য ৩।',
    '4. মানুষ, প্রাণী, পাখি বা লেখা চলে এলে ভিডিওটা বাদ দিয়ে আবার বানান (অথবা পাঠিয়ে দিন, আমি দেখে বলব)।',
    '',
    '## Gemini প্রম্পট (একটা একটা করে কপি করুন)',
    '',
    ...r.scenes.flatMap((s, i) => [`### দৃশ্য ${bn(i + 1)}: ${s.look}`, '', '```', s.prompt, '```', '']),
    '## পর্দায় ও কণ্ঠে যা থাকবে',
    '',
    '| সময় | কী | বিষয় |',
    '|---|---|---|',
    ...rows.map((x) => `| ${t(x.at)} | ${x.kind} | ${x.what} |`),
    '',
    'পুরো সময় ভিডিওর ওপর নরম অন্ধকার স্তর থাকবে, ওপরে ছোট লোগো। ভিডিওর প্রকৃতির শব্দ বাজবে, কণ্ঠের সময় একটু কমে যাবে।',
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
