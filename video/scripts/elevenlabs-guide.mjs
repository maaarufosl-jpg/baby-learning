// Writes an ElevenLabs guide (Markdown) for an episode: voice-design prompts,
// settings, and every line grouped by voice, ready to paste with v3 audio tags.
// Usage: node scripts/elevenlabs-guide.mjs ep01 > ../episodes/ep01-elevenlabs.md
import {build} from 'esbuild';

const id = process.argv[2] ?? 'ep01';
const out = await build({entryPoints: [`src/episodes/${id}.ts`], bundle: true, format: 'esm', write: false, platform: 'neutral'});
const mod = await import('data:text/javascript;base64,' + Buffer.from(out.outputFiles[0].text).toString('base64'));
const ep = mod[id];

const BN = '০১২৩৪৫৬৭৮৯';
const bn = (v) => String(v).replace(/\d/g, (d) => BN[d]);
// TTS cannot read the ﷺ ligature; spell it out.
const speakable = (t) => t.replace(/\s*ﷺ/g, ' সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম').replace(/\n/g, ' ');
const TAG = {excited: '[excited]', happy: '[cheerfully]', surprised: '[surprised]', thinking: '[thoughtful]', calm: '[softly]', sad: '[sad]'};

const VOICE = {
  umayer: {
    name: 'উমায়ের',
    save: 'Umayer',
    prompt:
      'A bright, playful and very friendly animated cartoon voice with a light, soft and high tone. Cheerful, curious and full of wonder, like the hero of a gentle family cartoon. Speaks Bengali clearly and a little slowly with a soft Bangladeshi accent. Warm and sweet, never loud.',
    preview: 'আসসালামু আলাইকুম! আমি উমায়ের। আজ আমরা একসাথে একটা সুন্দর দোয়া শিখব। তুমিও আমার সাথে বলবে তো?',
  },
  safa: {
    name: 'সাফা',
    save: 'Safa',
    prompt:
      'A very soft, sweet, airy and high cartoon voice, like a tiny cute animated sidekick. Giggly, gentle and playful, says short Bengali words softly with a slight lisp. Light, bubbly and calm.',
    preview: 'ভাইয়া! খাবো! বিচমিল্লাহ! আমিও পারি! আম্মু, দেখো!',
  },
  ammu: {
    name: 'আম্মু ও বর্ণনাকারী',
    save: 'Ammu',
    prompt:
      'A warm, gentle Bangladeshi mother in her early thirties. Soft, loving and patient voice, speaks standard Bengali slowly and very clearly, like telling a bedtime story to her little children. Calm and kind, never stern.',
    preview: 'উমায়ের সোনা, একটু থামো তো। খাওয়ার আগে আমরা কী বলি? আমরা বলি বিসমিল্লাহ। আল্লাহর নাম নিলে খাবারে বরকত হয়।',
  },
};

const lines = [];
ep.beats.forEach((b, i) => {
  if (!b.speech) return;
  const n = i + 1;
  const who = b.speech.who;
  const mood = b.characters?.find((c) => c.id === who)?.mood;
  const tag = who === 'narrator' ? '[warmly]' : TAG[mood] ?? '';
  lines.push({n, who, text: speakable(b.speech.text), tag, label: b.speech.label, file: `${String(n).padStart(2, '0')}-${who}.mp3`});
});
const duaBeats = ep.beats.map((b, i) => ({b, n: i + 1})).filter(({b}) => !b.speech && b.dua && b.kind === 'learn');

const voiceFor = (who) => (who === 'narrator' ? 'ammu' : who);
const md = [];
const p = (s = '') => md.push(s);

p(`# পর্ব ${bn(ep.number)}: ElevenLabs দিয়ে কণ্ঠ বানানোর গাইড`);
p();
p('এই ফাইলটা ভিডিওর ডেটা থেকে তৈরি। লাইনের নম্বর আর ফাইলের নাম ভিডিওর সাথে মেলে। দৃশ্য বদলালে আবার তৈরি করুন:');
p();
p('```bash');
p(`cd video && node scripts/elevenlabs-guide.mjs ${id} > ../episodes/${id}-elevenlabs.md`);
p('```');
p();
p('## ধাপ ১: অ্যাকাউন্ট ও মডেল');
p();
p('1. elevenlabs.io এ অ্যাকাউন্ট খুলুন।');
p('2. Text to Speech পাতায় মডেল হিসেবে **Eleven v3** বেছে নিন। আমার জানা মতে বাংলা শুধু v3 মডেলেই আছে। পুরনো Multilingual v2 মডেলে বাংলা নেই।');
p('3. লাইনের শুরুতে ইংরেজিতে বন্ধনীর ভেতরের শব্দ, যেমন `[cheerfully]`, হলো v3 এর "audio tag"। এগুলো পড়া হয় না, শুধু বলার ভঙ্গি ঠিক করে। ভালো না লাগলে মুছে দিতে পারেন।');
const chars = lines.reduce((s, l) => s + l.text.length, 0);
p(`4. পুরো পর্বে মোট প্রায় ${bn(chars)} অক্ষর। কয়েকবার করে বানালেও বিনামূল্যের মাসিক সীমায় সাধারণত হয়ে যায়। তবে দাম ও সীমা বদলাতে পারে, অ্যাকাউন্টে দেখে নিন।`);
p();
p('## ধাপ ২: তিনটা কণ্ঠ বানান (Voice Design)');
p();
p('Voices পাতায় "Create a voice" থেকে **Voice Design** খুলুন। নিচের বর্ণনা ইংরেজিতেই পেস্ট করুন, কারণ ইংরেজি বর্ণনায় এটা ভালো কাজ করে। পরীক্ষার লেখা হিসেবে বাংলা লাইনটা দিন। কয়েকটা নমুনা থেকে সবচেয়ে মিষ্টিটা বেছে নির্দেশিত নামে সেভ করুন।');
for (const key of ['umayer', 'safa', 'ammu']) {
  const v = VOICE[key];
  p();
  p(`### ${v.name} (সেভ করার নাম: ${v.save})`);
  p();
  p('বর্ণনা:');
  p();
  p('```');
  p(v.prompt);
  p('```');
  p();
  p('পরীক্ষার লেখা:');
  p();
  p('```');
  p(v.preview);
  p('```');
}
p();
p('**খেয়াল রাখুন:** ElevenLabs বর্ণনায় বয়স বা "শিশু" জাতীয় শব্দ থাকলে প্রম্পট আটকে দেয়। তাই ওপরের বর্ণনায় শুধু "কার্টুন চরিত্রের কণ্ঠ" লেখা আছে। নিজে বদলালে boy, girl, child, kid, toddler বা বয়সের সংখ্যা লিখবেন না।');
p();
p('তবুও আটকে গেলে Voice Library-তে "cartoon", "animated" বা "playful" লিখে খুঁজুন, আর একটা মিষ্টি তরুণী নারী কণ্ঠ বেছে নিন। কণ্ঠটা একটু বড়দের মতো শোনালেও চলবে। ফাইল পাঠানোর সময় জানিয়ে দেবেন, আমি উমায়ের আর সাফার কণ্ঠের স্বর উঁচু করে বাচ্চার মতো করে দেব। গতি একই থাকবে।');
p();
p('## ধাপ ৩: সেটিং');
p();
p('- **Stability:** Natural। একঘেয়ে লাগলে Creative, উল্টাপাল্টা লাগলে Robust।');
p('- **Speed:** একটু ধীরে, প্রায় ০.৯। বাচ্চারা যেন প্রতিটা শব্দ বোঝে।');
p('- **Output:** MP3।');
p();
p('## ধাপ ৪: লাইনগুলো বানান ও নামিয়ে নিন');
p();
p('প্রতিটা লাইন আলাদা করে বানান। নামানোর পর ফাইলের নাম বদলে নিচের নামটা দিন। শুধু শুরুর নম্বরটা ঠিক থাকলেই চলবে। একটা লাইন দুই-তিনবার বানিয়ে সবচেয়ে ভালোটা রাখুন।');
for (const key of ['umayer', 'safa', 'ammu']) {
  const mine = lines.filter((l) => voiceFor(l.who) === key);
  if (!mine.length) continue;
  p();
  p(`### ${VOICE[key].name}: ${VOICE[key].save} কণ্ঠে (${bn(mine.length)}টি লাইন)`);
  for (const l of mine) {
    p();
    p(`**লাইন ${bn(l.n)}** → \`${l.file}\`${l.who === 'narrator' ? ' (বর্ণনাকারী)' : ''}`);
    p();
    p('```');
    p(`${l.tag} ${l.text}`.trim());
    p('```');
  }
}
const group = lines.filter((l) => l.who === 'everyone');
if (group.length) {
  p();
  p(`### একসাথে বলা লাইন (${bn(group.length)}টি)`);
  p();
  p('প্রতিটা লাইন যাদের কণ্ঠে দরকার তাদের কণ্ঠে আলাদা করে বানান, যেমন `01-everyone-umayer.mp3`, `01-everyone-safa.mp3`। একই নম্বরের ফাইলগুলো আমি মিলিয়ে একসাথে বাজিয়ে দেব। সময় কম থাকলে শুধু আম্মুর কণ্ঠে একটা ফাইলই যথেষ্ট।');
  for (const l of group) {
    p();
    p(`**লাইন ${bn(l.n)}**${l.label ? ` (${l.label})` : ''} → \`${l.file}\``);
    p();
    p('```');
    p(`[cheerfully] ${l.text}`);
    p('```');
  }
}
const miu = lines.filter((l) => l.who === 'miu');
if (miu.length) {
  p();
  p(`### মিউ (${bn(miu.length)}টি লাইন)`);
  p();
  p(`ElevenLabs-এর **Sound Effects** পাতায় \`cute small kitten meow, short and soft\` লিখে বানান। লাইন নম্বর: ${miu.map((l) => `${bn(l.n)} → \`${l.file}\``).join(', ')}।`);
}
if (duaBeats.length) {
  p();
  p('### দোয়ার লাইন: AI দিয়ে নয়');
  p();
  p(`লাইন ${duaBeats.map(({n}) => bn(n)).join(', ')} হলো দোয়া "${ep.dua.arabic}"। এগুলো সঠিক উচ্চারণ জানা একজন মানুষ ফোনে রেকর্ড করবেন, ধীরে আর স্পষ্ট করে। ফাইলের নাম: ${duaBeats.map(({n}) => `\`${String(n).padStart(2, '0')}-dua.mp3\``).join(', ')}। এই লাইনগুলো না দিলেও চলবে, তখন দোয়ার দৃশ্যে শুধু লেখা দেখাবে।`);
}
p();
p('## ধাপ ৫: ফাইলগুলো পাঠান');
p();
p('সব ফাইল চ্যাটে পাঠান, অথবা GitHub-এ ব্রাঞ্চের `video/public/audio/' + id + '/` ফোল্ডারে "Add file → Upload files" দিয়ে রাখুন। তারপর আমাকে জানালে আমি সব কণ্ঠ ভিডিওতে বসিয়ে, দৃশ্যের সময় মিলিয়ে, আবার রেন্ডার করে দেব।');
p();
process.stdout.write(md.join('\n'));
