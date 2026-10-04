// Builds a voice-recording script (Markdown) from an episode's beat data,
// so line order, timing and file names always match the video.
// Usage: node scripts/voice-script.mjs ep01 > ../episodes/ep01-voice-script.md
import {build} from 'esbuild';

const id = process.argv[2] ?? 'ep01';
const out = await build({entryPoints: [`src/episodes/${id}.ts`], bundle: true, format: 'esm', write: false, platform: 'neutral'});
const mod = await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'));
const ep = mod[id];

const BN = '০১২৩৪৫৬৭৮৯';
const bn = (v) => String(v).replace(/\d/g, (d) => BN[d]);
const clock = (sec) => `${bn(Math.floor(sec / 60))}:${bn(String(Math.floor(sec % 60)).padStart(2, '0'))}`;

const VOICES = {
  umayer: 'উমায়ের',
  safa: 'সাফা',
  ammu: 'আম্মু',
  abbu: 'আব্বু',
  nanu: 'নানু',
  miu: 'মিউ (বিড়াল)',
  narrator: 'বর্ণনাকারী',
  everyone: 'সবাই',
  dua: 'দোয়ার কণ্ঠ',
};
const MOOD = {excited: 'উৎসাহী', happy: 'হাসিখুশি', surprised: 'অবাক', thinking: 'ভাবুক', calm: 'শান্ত', sad: 'মন খারাপ'};

const lines = [];
let t = 0;
ep.beats.forEach((b, i) => {
  const n = i + 1;
  const nn = String(n).padStart(2, '0');
  let who = null;
  let text = null;
  let tone = '';
  if (b.speech) {
    who = b.speech.who;
    text = b.speech.text.replace(/\n/g, ' ');
    const label = b.speech.label;
    const mood = b.characters?.find((c) => c.id === who)?.mood;
    tone = who === 'narrator' ? 'নরম, গল্প বলার মতো' : mood ? MOOD[mood] : '';
    if (label && who === 'everyone') tone = `${label} একসাথে`;
  } else if (b.dua && b.kind === 'learn') {
    who = 'dua';
    if (b.dua.mode === 'broken') {
      text = `${ep.dua.arabic} — ${ep.dua.parts.join('... ')} (ভেঙে ভেঙে, প্রতিটা অংশের পর একটু থেমে)`;
    } else {
      text = `${ep.dua.arabic} — ${ep.dua.parts.join('-')} (পুরোটা একবারে, ধীরে ও স্পষ্ট)`;
    }
    tone = 'ধীর, স্পষ্ট, সঠিক উচ্চারণে';
  }
  if (who) {
    lines.push({n, start: t, seconds: b.seconds, who, text, tone, file: `audio/${id}/${nn}-${who}.mp3`, shorts: !!b.shorts});
  }
  t += b.seconds;
});

const row = (l) =>
  `| ${bn(l.n)} | ${clock(l.start)} | ${VOICES[l.who]} | ${l.text} | ${l.tone} | ${bn(l.seconds)} সে. | \`${l.file}\` |`;

const md = [];
md.push(`# পর্ব ${bn(ep.number)}: ${ep.title} — কণ্ঠ রেকর্ডের স্ক্রিপ্ট`);
md.push('');
md.push('এই ফাইলটা ভিডিওর ডেটা থেকে স্বয়ংক্রিয়ভাবে তৈরি। দৃশ্যের লেখা বা সময় বদলালে আবার তৈরি করুন:');
md.push('');
md.push('```bash');
md.push(`cd video && node scripts/voice-script.mjs ${id} > ../episodes/${id}-voice-script.md`);
md.push('```');
md.push('');
md.push('## রেকর্ড করার নিয়ম');
md.push('');
md.push('1. শান্ত ঘরে রেকর্ড করুন। ফোনের ভয়েস রেকর্ডারই যথেষ্ট, মুখ থেকে এক বিঘত দূরে রাখুন।');
md.push('2. প্রতিটা লাইন আলাদা ফাইলে রাখুন। নিচের টেবিলের ফাইলের নাম হুবহু ব্যবহার করুন।');
md.push('3. ধীরে বলুন, স্বাভাবিক কথার চেয়ে একটু আস্তে। বাচ্চারা যেন প্রতিটা শব্দ বুঝতে পারে।');
md.push('4. প্রতিটা ফাইলের শুরু ও শেষে আধা সেকেন্ড নীরবতা রাখুন।');
md.push('5. "সর্বোচ্চ সময়" কলামটা শুধু ধারণার জন্য। লাইন একটু লম্বা হলে সমস্যা নেই, ভিডিওর সময় কণ্ঠ অনুযায়ী মিলিয়ে নেওয়া হবে।');
md.push('6. দোয়ার লাইনগুলো এমন কেউ রেকর্ড করবেন যার উচ্চারণ সঠিক। প্রকাশের আগে একজন আলেম বা ক্বারীকে শুনিয়ে নিন।');
md.push('7. "এবার তুমি বলো" অংশের নীরবতা রেকর্ড করতে হবে না, ভিডিওতে তা আগে থেকেই আছে।');
md.push('');
md.push('রেকর্ড শেষ হলে ফাইলগুলো `video/public/audio/' + id + '/` ফোল্ডারে রাখুন, অথবা আমাকে পাঠান। আমি ভিডিওর সাথে জুড়ে প্রতিটা দৃশ্যের সময় কণ্ঠ অনুযায়ী মিলিয়ে দেব।');
md.push('');
md.push('## ক্রম অনুযায়ী সব লাইন');
md.push('');
md.push('| # | ভিডিওতে সময় | কে বলবে | সংলাপ | ভঙ্গি | সর্বোচ্চ সময় | ফাইলের নাম |');
md.push('|---|---|---|---|---|---|---|');
lines.forEach((l) => md.push(row(l)));
md.push('');
md.push('## কণ্ঠ অনুযায়ী ভাগ করা');
md.push('');
md.push('যিনি যে চরিত্রের কণ্ঠ দেবেন, তিনি শুধু নিজের অংশটা দেখে রেকর্ড করতে পারবেন।');
const order = ['umayer', 'safa', 'ammu', 'narrator', 'everyone', 'dua', 'miu', 'abbu', 'nanu'];
const hints = {
  umayer: 'চার বছরের ছেলের কণ্ঠ, কৌতূহলী ও উৎসাহী। সত্যিকারের বাচ্চা হলে সবচেয়ে ভালো।',
  safa: 'আড়াই বছরের মেয়ের কণ্ঠ। "বিচমিল্লাহ" ইচ্ছা করেই একটু অস্পষ্ট, ছোট বাচ্চার মতো।',
  ammu: 'নরম, ধীর, মমতাময়। কখনো বিরক্তি বা রাগ নয়।',
  narrator: 'আম্মুর কণ্ঠেই গল্প বলা যায়, অথবা আলাদা একজন নরম কণ্ঠের মানুষ।',
  everyone: 'যারা আছে সবাই একসাথে বলবে। আলাদা আলাদা রেকর্ড করে পরে মেলানোও যায়।',
  dua: 'একজন সঠিক উচ্চারণ জানা মানুষ, ধীরে ও স্পষ্ট করে।',
  miu: 'যে কেউ ছোট্ট মিষ্টি "মিউ" শব্দ করতে পারেন, অথবা বিড়ালের আসল শব্দ।',
};
for (const who of order) {
  const mine = lines.filter((l) => l.who === who);
  if (!mine.length) continue;
  md.push('');
  md.push(`### ${VOICES[who]} (${bn(mine.length)}টি লাইন)`);
  md.push('');
  if (hints[who]) {
    md.push(hints[who]);
    md.push('');
  }
  md.push('| # | সংলাপ | ভঙ্গি | ফাইলের নাম |');
  md.push('|---|---|---|---|');
  mine.forEach((l) => md.push(`| ${bn(l.n)} | ${l.text} | ${l.tone} | \`${l.file}\` |`));
}
md.push('');
md.push('## শর্টসে যে লাইনগুলো আছে');
md.push('');
md.push(lines.filter((l) => l.shorts).map((l) => bn(l.n)).join(', ') + ' নম্বর লাইন। আলাদা রেকর্ড লাগবে না, একই ফাইল ব্যবহার হবে।');
md.push('');
process.stdout.write(md.join('\n'));
