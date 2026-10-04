# ভিডিও রেন্ডার প্রজেক্ট (Remotion)

এপিসোডের স্ক্রিপ্ট ডেটা থেকে অ্যানিমেটেড ভিডিও তৈরি করে। চরিত্র, পটভূমি, দোয়ার প্যানেল সব কোডে আঁকা (SVG), তাই নতুন পর্বে শুধু ডেটা ফাইল লিখলেই হয়।

## ফোল্ডার

| পথ | কী আছে |
|---|---|
| `src/episodes/ep01.ts` | পর্ব ১ এর দৃশ্য-তালিকা (beats): কে কোথায়, কী বলছে, দোয়া কখন দেখাবে |
| `src/components/Characters.tsx` | উমায়ের, সাফা, আম্মু, আব্বু, নানু, মিউ: মুখভঙ্গি, চোখ পিটপিট, হাত নাড়া, খাওয়ার ভঙ্গি |
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

1. প্রতিটি সংলাপ আলাদা ফাইলে রেকর্ড করুন, যেমন `public/audio/ep01/04-ammu.mp3`।
2. `src/episodes/ep01.ts` এ সংশ্লিষ্ট beat এ `audio: 'audio/ep01/04-ammu.mp3'` লিখুন।
3. সেই beat এর `seconds` অডিওর দৈর্ঘ্যের সমান বা একটু বেশি করুন।

## নতুন পর্ব

1. `src/episodes/ep01.ts` কপি করে `ep02.ts` বানান, দোয়া ও beats বদলান।
2. `src/Root.tsx` এ নতুন `Composition` যোগ করুন।
