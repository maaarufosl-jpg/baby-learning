# পর্ব ১: Gemini (Veo) দিয়ে ভিডিও বানানোর প্রম্পট

Gemini-এর ভিডিও টুল (Veo) একবারে প্রায় ৮ সেকেন্ডের একটা ক্লিপ বানায়। তাই পুরো পর্বকে ১৫টা ছোট দৃশ্যে ভাগ করা হয়েছে। প্রম্পট ইংরেজিতে, কারণ Veo ইংরেজি নির্দেশ সবচেয়ে ভালো বোঝে। সংলাপ বাংলাতেই রাখা আছে।

## কীভাবে ব্যবহার করবেন

1. **আগে চরিত্রের ছবি বানান।** নিচের "ধাপ ১" এর প্রম্পট দিয়ে Gemini-তে উমায়ের, সাফা, আম্মু, মিউ আর রান্নাঘরের ছবি বানান। পছন্দের ছবিগুলো সেভ করে রাখুন।
2. **প্রতিটা দৃশ্যে ছবিগুলো সাথে দিন।** Gemini অ্যাপে ভিডিও বানানোর সময়, অথবা Google Flow-তে "Ingredients" হিসেবে, ওই দৃশ্যের চরিত্রদের ছবি আপলোড করুন। এতে প্রতিটা ক্লিপে চেহারা একই থাকবে।
3. **প্রতিটা দৃশ্যের প্রম্পটের শুরুতে "স্টাইল" অংশটা রাখুন।** নিচের প্রতিটা দৃশ্যের প্রম্পটে স্টাইল আগে থেকেই জুড়ে দেওয়া আছে, শুধু পুরো বক্সটা কপি করবেন।
4. **একেকটা দৃশ্য দুই-তিনবার বানিয়ে সবচেয়ে ভালোটা রাখুন।** ফাইলের নাম দিন `scene01.mp4`, `scene02.mp4` এভাবে।
5. **ক্লিপগুলো আমাকে পাঠান।** আমি জোড়া লাগাব। শুরুর লোগো, দোয়ার কার্ড (আরবি, উচ্চারণ, অর্থ, হাদিসের সূত্র) আর "এবার তুমি বলো" অংশ স্ক্রিনে বসিয়ে দেব। Veo বাংলা লেখা ঠিকমতো লিখতে পারে না, তাই প্রম্পটে ভিডিওর ভেতরে কোনো লেখা না রাখতে বলা হয়েছে।

## কণ্ঠ নিয়ে দুটো পথ

- **পথ ক: Veo-কেই বাংলা বলাতে দিন।** প্রম্পট যেমন আছে তেমনই ব্যবহার করুন। ঠোঁট নড়া কথার সাথে মিলবে। তবে Veo-র বাংলা উচ্চারণ সবসময় নিখুঁত হয় না, তাই প্রতিটা ক্লিপ শুনে দেখবেন।
- **পথ খ: কণ্ঠ পরে বসাবেন।** প্রম্পটের `Dialogue` লাইন মুছে দিয়ে শেষে লিখুন: `Characters move their mouths gently as if talking, but there is no spoken voice. Only soft natural room sounds.` পরে ElevenLabs বা রেকর্ড করা কণ্ঠ আমি বসিয়ে দেব।

**দোয়ার অংশ (দৃশ্য ৮ আর ১১):** এই দুই দৃশ্যে AI-এর উচ্চারণের ওপর ভরসা না করাই ভালো। পথ খ ব্যবহার করে সঠিক উচ্চারণ জানা মানুষের কণ্ঠ বসানো উচিত।

## ইসলামিক ও নিরাপত্তার নিয়ম (প্রম্পটে আগে থেকেই আছে)

- কোনো বাদ্যযন্ত্র বা ব্যাকগ্রাউন্ড মিউজিক নেই।
- নবী, সাহাবি বা ফেরেশতার কোনো ছবি বা চরিত্র নেই। নবীজি ﷺ এর কথা শুধু আম্মুর মুখে আসে।
- আম্মু আর সাফার হিজাব চুল, কান আর গলা ঢেকে রাখে। আম্মুর খিমার কোমর পর্যন্ত নামানো।
- ভয় দেখানো কিছু নেই।

---

## ধাপ ১: চরিত্র ও রান্নাঘরের ছবি (Gemini-তে ছবি বানানোর প্রম্পট)

প্রতিটা প্রম্পট আলাদাভাবে দিন। একই চরিত্রের কয়েকটা ছবি বানিয়ে সবচেয়ে মায়াবীটা রাখুন।

### উমায়ের

```
Character design sheet, high-quality 3D animated family film style, soft warm lighting, plain light cream background. A 4-year-old Bangladeshi boy named Umayer: round cheerful face, big warm brown eyes with long lashes, small nose, rosy cheeks, sweet friendly smile, short neat dark brown hair, a small white crocheted Islamic prayer cap (tupi) on his head. He wears a light sky-blue knee-length panjabi with small white buttons, white pajama trousers and small brown sandals. Full body, front view and three-quarter view, natural child proportions, five fingers on each hand, cute and lovable. No text.
```

### সাফা

```
Character design sheet, high-quality 3D animated family film style, soft warm lighting, plain light cream background. A 2-and-a-half-year-old Bangladeshi girl named Safa: very round chubby face, big sparkling brown eyes with long lashes, tiny nose, rosy cheeks, shy sweet smile. She wears a soft pastel-pink hijab that fully covers her hair, ears and neck, with a small white flower clip on the side, a light yellow frock with tiny white dots that reaches below her knees, white leggings and small pink shoes. Full body, front view and three-quarter view, natural toddler proportions, five fingers on each hand, adorable. No text.
```

### আম্মু

```
Character design sheet, high-quality 3D animated family film style, soft warm lighting, plain light cream background. A young Bangladeshi Muslim mother called Ammu: kind gentle face, warm brown eyes, soft loving smile. She wears a long flowing lavender-blue khimar hijab that covers her hair, ears, neck and chest and falls down to her waist with soft folds, over a loose sage-green abaya that reaches the floor. Very modest, graceful and calm. Full body, front view and three-quarter view, natural adult proportions, five fingers on each hand. No text.
```

### মিউ (বিড়ালছানা)

```
Character design sheet, high-quality 3D animated family film style, soft warm lighting, plain light cream background. A small fluffy orange tabby kitten named Miu with a white chest and belly, big round green eyes, tiny pink nose, soft whiskers and a fluffy tail. Cute, playful and expressive. Full body, front view and side view. No text.
```

### রান্নাঘর

```
Background design, high-quality 3D animated family film style, soft warm morning light. A cozy, clean Bangladeshi kitchen and dining room seen from the front: a wooden dining table with a blue-and-white gingham tablecloth, two wooden chairs behind the table, a white plate with rice and a fried egg, a small yellow bowl of lentils, glasses of water. Behind: mint-green kitchen cabinets with brass knobs, a white tiled wall, a blue cooking pot on a stove and a yellow kettle on the counter, a window with pink curtains tied to the sides and sunlight coming in, a small potted plant on the windowsill, and a small framed Arabic calligraphy of Bismillah on the wall. Every object clear and easy to recognise. No people, no other text.
```

---

## ধাপ ২: দৃশ্য অনুযায়ী ভিডিওর প্রম্পট (প্রতিটা প্রায় ৮ সেকেন্ড)

প্রতিটা বক্স পুরোটা কপি করুন। ওপরে লেখা আছে কোন দৃশ্যে কোন চরিত্রের ছবি সাথে দিতে হবে।

### দৃশ্য ১: শুরু (ছবি: উমায়ের, সাফা, মিউ)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: A sunny green hill with small white flowers and soft clouds. Umayer, a 4-year-old Bangladeshi boy in a white prayer cap and sky-blue panjabi, and his little sister Safa, a 2-year-old girl in a pink hijab and yellow frock, stand side by side, smiling and waving happily at the camera. Miu, a fluffy orange kitten, runs in from the right and sits next to them. Gentle breeze, birds chirping softly.
Dialogue: Umayer and Safa, cheerful, slowly, in Bengali: "আসসালামু আলাইকুম!"
Camera: slow push-in, eye level.
```

### দৃশ্য ২: খিদে পেয়েছে (ছবি: উমায়ের, রান্নাঘর)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: Inside the cozy Bangladeshi kitchen. Umayer, a 4-year-old boy in a white prayer cap and sky-blue panjabi, runs in happily from playing outside, a little out of breath, and climbs onto his wooden chair at the table. On his plate: steaming white rice and a fried egg. His eyes light up.
Dialogue: Umayer, excited, in Bengali: "ভাত! ডিম ভাজা! আমার প্রিয়!"
Camera: medium shot, slow pan following him to the table.
```

### দৃশ্য ৩: সাফা আর মিউ (ছবি: উমায়ের, সাফা, মিউ, রান্নাঘর)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: In the kitchen, little Safa in her pink hijab sits on the chair next to Umayer, bouncing with joy in front of her small bowl. Miu the orange kitten peeks out from beside the table and looks up at them.
Dialogue: Safa, tiny sweet voice, in Bengali: "ভাইয়া, খাবো!" Then Miu gives a soft cute meow.
Camera: medium shot of both children at the table, slight tilt down to the kitten.
```

### দৃশ্য ৪: ছোট্ট ভুল (ছবি: উমায়ের, মিউ, রান্নাঘর)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: Umayer, in a hurry, reaches with his LEFT hand toward the very middle of his plate of rice, in gentle slow motion. Miu the kitten, sitting on the floor beside the table, widens her eyes, lifts one front paw and softly shakes her head as if saying "wait!". The moment is funny and sweet, not scary.
Dialogue: none. Only a soft curious "hmm" sound from the kitten.
Camera: close-up on the hand and plate, then cut to the kitten's surprised face.
```

### দৃশ্য ৫: আম্মু আসেন (ছবি: আম্মু, উমায়ের, রান্নাঘর)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: Ammu, a kind young mother in a long lavender-blue khimar falling to her waist and a sage-green abaya, walks in from the kitchen counter with a warm smile, carrying a small bowl. She gently places her hand on Umayer's shoulder. She is calm and loving, never angry.
Dialogue: Ammu, soft and loving, slowly, in Bengali: "উমায়ের সোনা, একটু থামো তো। খাওয়ার আগে আমরা কী বলি?"
Camera: medium shot, slow push-in toward Ammu and Umayer.
```

### দৃশ্য ৬: উমায়ের ভুলে গেছে (ছবি: উমায়ের, আম্মু, রান্নাঘর)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: Umayer looks up at Ammu, scratches his head with a shy, thoughtful face, then smiles a little sheepishly. Ammu smiles back kindly.
Dialogue: Umayer, thoughtful, in Bengali: "উমম... ভুলে গেছি, আম্মু।"
Camera: close-up on Umayer's face, soft focus on Ammu behind.
```

### দৃশ্য ৭: আম্মু শেখান (ছবি: আম্মু, উমায়ের, রান্নাঘর)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: Ammu kneels down beside Umayer's chair so her face is at his level and speaks to him gently. Umayer listens carefully with big eyes. Warm sunlight from the window.
Dialogue: Ammu, soft and clear, slowly, in Bengali: "আমাদের নবীজি সাল্লাল্লাহু আলাইহি ওয়া সাল্লাম শিখিয়েছেন, খাওয়ার আগে বলতে হয়... বিসমিল্লাহ।"
Camera: two-shot at eye level, very slow push-in.
```

### দৃশ্য ৮: দোয়া (ছবি: আম্মু, উমায়ের, রান্নাঘর)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: Ammu and Umayer face each other. Ammu says each part slowly and Umayer repeats after her, nodding. With each part, a few soft golden sparkles float gently in the air around them. The background softly blurs to keep focus on them. Leave empty space in the upper part of the frame.
Dialogue: Ammu, very slowly and clearly, in Bengali: "বিস... মিল... লাহ।" Then Umayer, sweetly: "বিসমিল্লাহ!"
Camera: static two-shot, gentle.
```

### দৃশ্য ৯: ডান হাত (ছবি: আম্মু, উমায়ের, রান্নাঘর)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: Ammu gently touches Umayer's RIGHT hand. Umayer proudly lifts his RIGHT hand high in the air with a big smile.
Dialogue: Ammu, warm, in Bengali: "আর খাই কোন হাতে?" Umayer, excited: "ডান হাতে!"
Camera: medium shot, slight tilt up following his raised right hand.
```

### দৃশ্য ১০: নিজের সামনে থেকে (ছবি: আম্মু, উমায়ের, রান্নাঘর)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: Ammu points gently to the part of the rice nearest to Umayer on his plate, and a soft golden glow appears on that front part of the plate. Umayer nods happily.
Dialogue: Ammu, soft, in Bengali: "ঠিক! আর খাই নিজের সামনে থেকে। প্লেটের মাঝখান থেকে নয়।"
Camera: close-up on the plate, then up to Umayer's smiling face.
```

### দৃশ্য ১১: এবার তুমি বলো (ছবি: উমায়ের, সাফা)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: A soft pastel mint-green background with gently floating light circles. Umayer stands on the left side of the frame and looks directly at the camera, inviting the viewer to speak with him. Safa stands on the right side, smiling. After each part Umayer pauses for about two seconds with an encouraging smile and a small nod, waiting for the child watching. Keep the middle of the frame empty.
Dialogue: Umayer, cheerful and slow, in Bengali: "এবার তুমি বলো! বিস... (pause) মিল... (pause) লাহ!"
Camera: static wide shot.
```

### দৃশ্য ১২: সাফাও পেরেছে (ছবি: উমায়ের, সাফা)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: Same soft mint-green background. Little Safa claps her hands and tries to say the word in her sweet toddler way, slightly unclear. Umayer laughs happily, claps too, and looks at the camera.
Dialogue: Safa, tiny voice: "বিচমিল্লাহ!" Umayer, happy: "সাফাও পেরেছে! তুমিও পেরেছো!"
Camera: medium two-shot.
```

### দৃশ্য ১৩: ঠিকমতো খাওয়া (ছবি: উমায়ের, সাফা, আম্মু, রান্নাঘর)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: Back at the kitchen table. Umayer sits up straight, says the word, then eats rice with his RIGHT hand from the part of the plate in front of him, closing his eyes with delight. Safa eats from her small bowl with a spoon. Ammu watches, smiling proudly.
Dialogue: Umayer, clear: "বিসমিল্লাহ!" then after eating, happy: "মমম! আজকে ভাত আরও মজা লাগছে!"
Camera: medium shot of the table.
```

### দৃশ্য ১৪: মিউও (ছবি: উমায়ের, সাফা, মিউ, রান্নাঘর)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: Miu the kitten sits in front of her own small food bowl on the floor. Before eating she looks up for a moment, gives a soft meow, then starts eating. Umayer and Safa lean over from their chairs to watch and burst into happy giggles.
Dialogue: Umayer and Safa together, laughing, in Bengali: "মিউও বিসমিল্লাহ বলেছে!"
Camera: low angle on the kitten, then up to the laughing children.
```

### দৃশ্য ১৫: বিদায় (ছবি: আম্মু, উমায়ের, সাফা, মিউ)

```
Style: high-quality 3D animated family film for toddlers, soft warm pastel colors, gentle lighting, slow calm camera, cute and lovable characters with natural proportions and five fingers on each hand. No background music, no musical instruments, no text or subtitles on screen. Only soft natural sounds.

Scene: A soft pastel mint-green background. Ammu, Umayer, Safa and Miu stand together on the LEFT half of the frame, all smiling and waving goodbye at the camera. Keep the right half of the frame empty and calm.
Dialogue: Umayer, cheerful: "আজ খাওয়ার সময় তুমিও বলবে তো?" Then everyone together, warmly: "আসসালামু আলাইকুম! পরের পর্বে দেখা হবে!"
Camera: static wide shot, slow fade at the end.
```

---

## শর্টসের (খাড়া ৯:১৬) জন্য

প্রতিটা প্রম্পটের শেষে এই লাইনটা যোগ করুন, আর Veo-তে ৯:১৬ অনুপাত বেছে নিন:

```
Vertical 9:16 framing, characters centred in the lower half of the frame, empty space at the top.
```

শর্টসের জন্য দৃশ্য ৪, ৭, ৮, ১১, ১২ আর ১৫ যথেষ্ট। সব মিলিয়ে প্রায় ৫০ সেকেন্ড হবে।

## কিছু সমস্যা হলে

- **চেহারা বদলে যাচ্ছে:** চরিত্রের ছবি সাথে দিন, আর প্রম্পটে চরিত্রের বর্ণনা ছোট না করে পুরো রাখুন।
- **বাজনা চলে আসছে:** প্রম্পটের শেষে আবার লিখুন `Absolutely no music.`
- **হাতের আঙুল উল্টাপাল্টা:** আবার বানান। এটা AI ভিডিওর সাধারণ সমস্যা, দুই-তিনবারে ঠিক হয়।
- **হিজাব থেকে চুল দেখা যাচ্ছে:** লিখুন `Her hijab fully covers all of her hair, ears and neck.`
- **ভিডিওতে উল্টাপাল্টা লেখা আসছে:** লিখুন `No letters, words or writing anywhere in the frame.`
