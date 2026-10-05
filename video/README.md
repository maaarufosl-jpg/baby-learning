# ভিডিও রেন্ডার প্রজেক্ট (Remotion)

এপিসোডের স্ক্রিপ্ট ডেটা থেকে অ্যানিমেটেড ভিডিও তৈরি করে। চরিত্র, পটভূমি, দোয়ার প্যানেল সব কোডে আঁকা (SVG), তাই নতুন পর্বে শুধু ডেটা ফাইল লিখলেই হয়।

## ফোল্ডার

| পথ | কী আছে |
|---|---|
| `src/episodes/ep01.ts` | পর্ব ১ এর দৃশ্য-তালিকা (beats): কে কোথায়, কী বলছে, দোয়া কখন দেখাবে |
| `src/components/Characters.tsx` | উমায়ের, সাফা, মা, আব্বু, নানু, মিউ: মুখভঙ্গি, চোখ পিটপিট, হাত নাড়া, খাওয়ার ভঙ্গি |
| `src/components/Backgrounds.tsx` | রান্নাঘর, বাইরের মাঠ, সাধারণ পটভূমি |
| `src/components/Overlays.tsx` | কথার বাবল, দোয়ার প্যানেল ও কার্ড, "এবার তুমি বলো", তারা, প্রশ্নচিহ্ন, ডান হাত |
| `src/components/Episode.tsx` | সব জোড়া লাগিয়ে পূর্ণ পর্ব, শর্টস ও প্রিভিউ রিল |
| `public/fonts`, `public/sfx` | Hind Siliguri (বাংলা), Amiri (আরবি) ফন্ট; "টিং" ও "পপ" শব্দ (বাদ্যযন্ত্র নয়) |

## কম্পোজিশন

| আইডি | কী | আকার |
|---|---|---|
| `Ep01Preview` | মোশন দেখার জন্য বাছাই করা মুহূর্তের ছোট রিল | ১৯২০×১০৮০ |
| `Ep01` | পূর্ণ পর্ব | ১৯২০×১০৮০ |
| `Ep01Shorts` | ৬০ সেকেন্ডের শর্টস | ১০৮০×১৯২০ |

## চালানো

```bash
cd video
npm install
npm run studio            # ব্রাউজারে লাইভ প্রিভিউ ও এডিট
npx remotion render Ep01Preview out/ep01-preview.mp4 --scale=0.5   # কম রেজোলিউশনের মোশন প্রিভিউ
npm run render:ep01       # পূর্ণ পর্ব (অনুমোদনের পরে)
npm run render:ep01-shorts
```

Chrome ডাউনলোড না করে আগে থেকে থাকা ব্রাউজার ব্যবহার করতে চাইলে:

```bash
REMOTION_BROWSER_EXECUTABLE=/path/to/chrome npm run render:ep01
```

## ভয়েস যোগ করা

1. `episodes/ep01-voice-script.md` দেখে প্রতিটা লাইন আলাদা ফাইলে রেকর্ড করুন। ফোনের রেকর্ডিং (m4a, mp3, wav) সরাসরি চলবে।
2. ফাইলের নামের শুরুতে স্ক্রিপ্টের লাইন নম্বর রাখুন, যেমন `05-umayer.m4a`, `11-ammu.mp3`। বাকি নাম যা খুশি হতে পারে।
3. ফাইলগুলো `video/public/audio/ep01/` ফোল্ডারে রাখুন। GitHub-এ ব্রাঞ্চ খুলে "Add file → Upload files" দিয়েও রাখা যায়।
4. চালান:

```bash
cd video
npm run attach-audio:ep01   # নীরবতা কাটে, আওয়াজ সমান করে, দৃশ্যের সময় কণ্ঠ অনুযায়ী বাড়ায়
# বড়দের কণ্ঠকে বাচ্চার মতো করতে (সেমিটোন):
node scripts/attach-audio.mjs ep01 --pitch umayer=3,safa=5
npm run render:ep01
```

যে লাইনের ফাইল নেই, সেই দৃশ্য আগের মতো কণ্ঠ ছাড়াই থাকবে। তাই অল্প অল্প করেও কণ্ঠ যোগ করা যায়।

## ElevenLabs দিয়ে স্বয়ংক্রিয় কণ্ঠ

এর জন্য পরিবেশে দুটো জিনিস লাগবে: নেটওয়ার্কে `api.elevenlabs.io` খোলা, আর `ELEVENLABS_API_KEY` নামে key রাখা। key কখনো রিপোতে বা চ্যাটে রাখবেন না।

```bash
cd video
# পরীক্ষা: উমায়েরের দুটো লাইন
node scripts/elevenlabs-generate.mjs ep01 --voice "Jane" --who umayer --lines 5,13 --out out/voice-tests
# সব লাইন, তারপর বাচ্চার স্বর ও ভিডিওতে বসানো
node scripts/elevenlabs-generate.mjs ep01 --voice "Jane" --who umayer
node scripts/attach-audio.mjs ep01 --pitch umayer=4
```

## নতুন পর্ব

1. `src/episodes/ep01.ts` কপি করে `ep02.ts` বানান, দোয়া ও beats বদলান।
2. `src/Root.tsx` এ নতুন `Composition` যোগ করুন।
