import {asmaReel, duaReel, textReel} from './builders';
import {veo} from './prompt';
import type {Reel} from './types';

const HADITH_NUMBERING =
  'হাদিস নম্বর আন্তর্জাতিকভাবে প্রচলিত গণনা অনুযায়ী (বুখারি: ফাতহুল বারি; মুসলিম: মুহাম্মাদ ফুয়াদ আব্দুল বাকি)। বাংলাদেশের ইসলামিক ফাউন্ডেশন বা অন্য বাংলা সংস্করণে নম্বর আলাদা হতে পারে।';

export const reels: Reel[] = [
  asmaReel({
    id: 'reel01',
    theme: 'gold',
    number: 1,
    title: 'আর-রহমান: পরম দয়াময়',
    count: '১',
    arabic: 'الرَّحْمٰنُ',
    bangla: 'আর-রহমান',
    meaning: 'পরম দয়াময়',
    explain: 'তাঁর দয়া সবকিছুকে ঘিরে আছে',
    ayah: {
      arabic: 'الرَّحْمٰنِ الرَّحِيمِ',
      meaning: 'যিনি পরম দয়াময়, অতি দয়ালু',
      source: 'সূরা আল-ফাতিহা, আয়াত ২',
      note: 'নামাজে সূরা ফাতিহায় আমরা এই আয়াত পড়ি, এখানেই আছে আর-রহমান নাম',
      // quran.com counts the basmala as 1:1, so this ayah is 1:3 there
      quran: {ref: '1:3'},
    },
    nameAyah: {ref: '55:1', source: 'সূরা আর-রহমান, আয়াত ১ (৫৫:১)'},
    narration: {
      intro: 'আল্লাহর সুন্দর নামগুলোর একটি।',
      meaning: 'এর অর্থ, পরম দয়াময়।',
      ayah: 'নামাজে সূরা ফাতিহায় আমরা এই আয়াত পড়ি, এখানেই আছে আর-রহমান নাম।',
    },
    scenes: [
      {
        art: 'sunrise-hills',
        sound: 'morning-birds',
        look: 'কুয়াশা ঢাকা সবুজ পাহাড়ের ওপারে সূর্যোদয়, সোনালি আলো ধীরে ধীরে ছড়িয়ে পড়ছে',
        prompt: veo(
          'A golden sunrise over layers of misty green hills. The sun slowly rises from behind the far hill and warm light spreads across the valley, soft fog drifting between the hills.',
          'a soft morning breeze and faint distant birdsong',
        ),
        tint: ['#F3C77B', '#2F5D47'],
      },
      {
        art: 'forest-stream',
        sound: 'stream',
        look: 'বনের সবুজ পাতার ফাঁক দিয়ে নরম রোদ, সামনে পাথরের ওপর দিয়ে বয়ে যাওয়া স্বচ্ছ ছোট নদী',
        prompt: veo(
          'Warm sunbeams streaming through the green leaves of a quiet forest. In the foreground a small clear stream flows gently over smooth round stones, sparkling in the light.',
          'gently flowing stream water and leaves rustling in a light breeze',
        ),
        tint: ['#B9D98F', '#1F4D3A'],
      },
      {
        art: 'rain-field-clear',
        sound: 'rain',
        look: 'বিস্তীর্ণ সবুজ ধানক্ষেতে হালকা বৃষ্টি, তারপর মেঘ সরে উষ্ণ আলো',
        prompt: veo(
          'Light gentle rain falling over a wide green rice field. Soft grey clouds slowly part and warm sunlight begins to shine through, making the wet rice leaves glow.',
          'soft steady rain and light wind',
        ),
        tint: ['#A9BDB3', '#2E5A3E'],
      },
    ],
    sources: [
      'নাম الرَّحْمٰنُ: সূরা আল-ফাতিহা আয়াত ২ (বিসমিল্লাহ ছাড়া গণনায়; মদিনার মুসহাফে ১:৩), সূরা আর-রহমান ৫৫:১ (আরও বহু জায়গায়)',
      'ব্যাখ্যার ভিত্তি "তাঁর দয়া সবকিছুকে ঘিরে আছে": সূরা আল-আ\'রাফ ৭:১৫৬ — وَرَحْمَتِي وَسِعَتْ كُلَّ شَيْءٍ',
    ],
    checklist: [
      'নামের আরবি বানান ও হরকত: الرَّحْمٰنُ',
      'আয়াতের আরবি মুসহাফের সাথে মিলানো: الرَّحْمٰنِ الرَّحِيمِ (আল-ফাতিহা আয়াত ২)',
      'বাংলা উচ্চারণ: আর-রহমান',
      'অর্থ: পরম দয়াময় · আয়াতের অর্থ: যিনি পরম দয়াময়, অতি দয়ালু',
      'ব্যাখ্যা "তাঁর দয়া সবকিছুকে ঘিরে আছে" (৭:১৫৬ এর আলোকে) ঠিক আছে কি না',
    ],
    unsure: [
      'আল-ফাতিহার আয়াত নম্বর: বাংলাদেশে প্রচলিত গণনায় বিসমিল্লাহ আলাদা, তাই এটা আয়াত ২ (রিলে এটাই লেখা)। মদিনার মুসহাফে বিসমিল্লাহ আয়াত ১ ধরা হয়, সেখানে এটা ১:৩।',
    ],
  }),

  duaReel({
    id: 'reel02',
    theme: 'gold',
    number: 2,
    title: 'জ্ঞান বাড়ানোর দোয়া',
    count: '১',
    arabic: 'رَبِّ زِدْنِي عِلْمًا',
    bangla: 'রাব্বি যিদনি ইলমা',
    meaning: 'হে আমার রব, আমার জ্ঞান বাড়িয়ে দাও',
    source: 'সূরা ত্ব-হা, আয়াত ১১৪',
    // the last three words of 20:114, where the ayah ends
    quran: {ref: '20:114', words: [15, 17]},
    narration: {
      meaning: 'এর অর্থ, হে আমার রব, আমার জ্ঞান বাড়িয়ে দাও।',
      closing: 'পড়তে বসার আগে এই দোয়াটা পড়বে।',
    },
    scenes: [
      {
        art: 'golden-meadow',
        sound: 'wind',
        look: 'সোনালি বিকেলে বাতাসে দোল খাওয়া লম্বা ঘাসের মাঠ',
        prompt: veo('A wide meadow of tall grass swaying gently in the wind at golden hour, warm low sunlight shining through the grass tips.', 'wind moving through the grass'),
        tint: ['#F0C987', '#5B6B3A'],
      },
      {
        art: 'rose-garden',
        sound: 'morning-birds',
        look: 'সকালের আলোয় শিশিরভেজা গোলাপি আর সাদা ফুলের বাগান',
        prompt: veo('A garden of soft pink and white roses covered in morning dew, petals moving very slightly in the breeze, warm morning light.', 'light breeze and faint distant birdsong'),
        tint: ['#F6D5DC', '#4F6A4A'],
      },
    ],
    sources: [
      'সূরা ত্ব-হা ২০:১১৪ — ... وَقُل رَّبِّ زِدْنِي عِلْمًا ("আর বলুন, হে আমার রব, আমার জ্ঞান বাড়িয়ে দিন")',
    ],
    checklist: [
      'আরবি ও হরকত: رَبِّ زِدْنِي عِلْمًا (আয়াতে আগে وَقُل আছে, রিলে শুধু দোয়ার অংশ)',
      'বাংলা উচ্চারণ: রাব্বি যিদনি ইলমা',
      'অর্থ: হে আমার রব, আমার জ্ঞান বাড়িয়ে দাও',
      'সূত্র: সূরা ত্ব-হা, আয়াত ১১৪',
      'তিলাওয়াত (শব্দ ১৫–১৭) ঠিক জায়গা থেকে শুরু হয়েছে কি না',
    ],
    unsure: [
      'আয়াতে আল্লাহ নবীজিকে ﷺ বলতে বলেছেন "বলুন, হে আমার রব…"; এখানে বাচ্চাদের জন্য সরাসরি দোয়া হিসেবে দেওয়া হয়েছে, যেভাবে সাধারণত শেখানো হয়।',
      'কারি "ওয়া কুর-রাব্বি" টানা পড়েন; তিলাওয়াত "রাব্বি" থেকে কাটা, শুরুটা একটু হঠাৎ লাগতে পারে।',
    ],
  }),

  textReel({
    id: 'reel03',
    theme: 'sky',
    number: 3,
    kind: 'ayah',
    title: 'কষ্টের সাথেই স্বস্তি',
    kicker: 'ছোট আয়াত · ১',
    arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
    meaning: 'নিশ্চয়ই কষ্টের সাথেই আছে স্বস্তি।',
    source: 'সূরা আশ-শারহ, আয়াত ৬ (৯৪:৬)',
    quran: {ref: '94:6'},
    note: 'ঠিক আগের আয়াতেও (৯৪:৫) একই কথা এসেছে',
    narration: {intro: 'কঠিন সময়ে, মনে রাখার মতো একটি আয়াত।', meaning: 'নিশ্চয়ই, কষ্টের সাথেই আছে স্বস্তি।', source: 'সূরা আশ-শারহ, ছয় নম্বর আয়াত।', note: 'আল্লাহ এই কথাটি, পরপর দুবার বলেছেন।'},
    scenes: [
      {
        art: 'storm-mountains',
        sound: 'mountain-wind',
        look: 'পাহাড়ের ওপর ঘন ধূসর মেঘ, ধীরে চলছে',
        prompt: veo('Heavy dark grey clouds slowly moving over a quiet mountain range, the light dim and moody, calm and not frightening.', 'low wind and a very distant soft rumble of thunder'),
        tint: ['#6F7C86', '#2C3A44'],
      },
      {
        art: 'clouds-part',
        sound: 'wind',
        look: 'মেঘ সরে যাচ্ছে, ফাঁক দিয়ে সূর্যের আলোর রেখা নামছে',
        prompt: veo('The dark clouds slowly part over green mountains and bright rays of sunlight beam down through the gap, lighting up the valley.', 'gentle wind'),
        tint: ['#D9D2B8', '#3A5A4C'],
      },
      {
        art: 'rainbow-valley',
        sound: 'morning-birds',
        look: 'বৃষ্টির পর সবুজ উপত্যকার ওপর রংধনু',
        prompt: veo('A soft rainbow over a fresh green valley right after rain, drops glistening on the grass, clear blue sky returning.', 'dripping water and soft breeze'),
        tint: ['#BFDCEB', '#3F7051'],
      },
    ],
    sources: ['সূরা আশ-শারহ (আল-ইনশিরাহ) ৯৪:৬; আগের আয়াত ৯৪:৫ — فَإِنَّ مَعَ الْعُسْرِ يُسْرًا'],
    checklist: ['আয়াতের আরবি ও হরকত মুসহাফের সাথে মিলানো: إِنَّ مَعَ الْعُسْرِ يُسْرًا', 'বাংলা অর্থ', 'সূরার নাম ও আয়াত নম্বর ৯৪:৬', 'নোট "আগের আয়াতেও একই কথা" ঠিক আছে কি না'],
  }),

  duaReel({
    id: 'reel04',
    theme: 'orange',
    number: 4,
    title: 'বাবা-মায়ের জন্য দোয়া',
    count: '২',
    arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    bangla: 'রাব্বির হামহুমা কামা রাব্বাইয়ানি সাগিরা',
    meaning: 'হে আমার রব, তাঁদের প্রতি দয়া করো, যেমন তাঁরা ছোটবেলায় আমাকে লালন-পালন করেছেন',
    source: 'সূরা আল-ইসরা (বনি ইসরাইল), আয়াত ২৪',
    // the last five words of 17:24, where the ayah ends
    quran: {ref: '17:24', words: [8, 12]},
    narration: {
      meaning: 'এর অর্থ, হে আমার রব, তাঁদের প্রতি দয়া করো, যেমন তাঁরা ছোটবেলায় আমাকে লালন-পালন করেছেন।',
      closing: 'প্রতিদিন বাবা-মায়ের জন্য এই দোয়াটা পড়বে।',
    },
    scenes: [
      {
        art: 'clear-stream',
        sound: 'stream',
        look: 'পাহাড়ি ছড়ায় পাথরের ওপর দিয়ে স্বচ্ছ পানি বয়ে যাচ্ছে',
        prompt: veo('Crystal clear water flowing over smooth stones in a shallow mountain stream, sunlight sparkling on the surface, close and calm.', 'clear flowing water'),
        tint: ['#CDE7EA', '#2F5B5E'],
      },
      {
        art: 'dew-leaves',
        sound: 'morning-birds',
        look: 'ভোরে সবুজ পাতার ওপর শিশিরবিন্দু, ধীরে গড়িয়ে পড়ছে',
        prompt: veo('Macro shot of fresh dew drops on bright green leaves at early morning, one drop slowly rolling down the leaf, soft sunlight behind.', 'quiet morning air and faint distant birdsong'),
        tint: ['#D8EBC4', '#2D5A3A'],
      },
      {
        art: 'rain-lake',
        sound: 'rain-water',
        look: 'শান্ত হ্রদের পানিতে বৃষ্টির ফোঁটা, ছোট ছোট বৃত্ত',
        prompt: veo('Soft rain falling on the still surface of a calm lake, gentle rings spreading on the water, misty green shore in the background.', 'soft rain on water'),
        tint: ['#B8CBD0', '#2C4A4F'],
      },
    ],
    sources: [
      'সূরা আল-ইসরা ১৭:২৪ — وَاخْفِضْ لَهُمَا جَنَاحَ الذُّلِّ مِنَ الرَّحْمَةِ وَقُل رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    ],
    checklist: [
      'আরবি ও হরকত: رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا (আয়াতে আগে وَقُل আছে, রিলে শুধু দোয়ার অংশ)',
      'বাংলা উচ্চারণ: রাব্বির হামহুমা কামা রাব্বাইয়ানি সাগিরা',
      'অর্থ: হে আমার রব, তাঁদের প্রতি দয়া করো, যেমন তাঁরা ছোটবেলায় আমাকে লালন-পালন করেছেন',
      'সূত্র: সূরা আল-ইসরা, আয়াত ২৪',
      'তিলাওয়াত (শব্দ ৮–১২) ঠিক জায়গা থেকে শুরু হয়েছে কি না',
    ],
    unsure: [
      'কারি "ওয়া কুর-রাব্বি" টানা পড়েন; তিলাওয়াত "রাব্বি" থেকে কাটা, শুরুটা একটু হঠাৎ লাগতে পারে।',
    ],
  }),

  asmaReel({
    id: 'reel05',
    theme: 'rose',
    number: 5,
    title: 'আল-খালিক: সৃষ্টিকর্তা',
    count: '২',
    arabic: 'الْخَالِقُ',
    bangla: 'আল-খালিক',
    meaning: 'সৃষ্টিকর্তা',
    explain: 'যিনি সবকিছু অস্তিত্বে এনেছেন',
    ayah: {arabic: 'هُوَ اللّٰهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ', meaning: 'তিনিই আল্লাহ, সৃষ্টিকর্তা, উদ্ভাবক, রূপদাতা', source: 'সূরা আল-হাশর ৫৯:২৪ (আয়াতের অংশ)', quran: {ref: '59:24', words: [1, 5]}},
    narration: {intro: 'আল্লাহর সুন্দর নামগুলোর একটি।', meaning: 'এর অর্থ, সৃষ্টিকর্তা।', ayah: 'সূরা আল-হাশর, চব্বিশ নম্বর আয়াত।'},
    scenes: [
      {
        art: 'snow-peaks',
        sound: 'mountain-wind',
        look: 'ভোরের আলোয় বরফঢাকা পাহাড়চূড়া',
        prompt: veo('Snow-capped mountain peaks glowing pink and gold in the first light of dawn, thin clouds drifting below the peaks.', 'cold mountain wind'),
        tint: ['#F2C6B4', '#34465E'],
      },
      {
        art: 'wildflowers',
        sound: 'wind',
        look: 'বাতাসে দোলা রঙিন বুনো ফুলের মাঠ',
        prompt: veo('A field of colourful wildflowers swaying softly in the breeze on a sunny hillside, shallow depth of field, blue sky above.', 'light breeze through flowers'),
        tint: ['#F4D9E4', '#4E6B3C'],
      },
      {
        art: 'starry-hills',
        sound: 'night',
        look: 'পাহাড়ের ওপর তারাভরা রাতের আকাশ, ছায়াপথ ধীরে ঘুরছে',
        prompt: veo('A clear starry night sky with the Milky Way slowly turning above the dark silhouette of hills, time-lapse, deep blue tones.', 'quiet night air and soft crickets'),
        tint: ['#2B3A67', '#0E1530'],
      },
    ],
    sources: ['সূরা আল-হাশর ৫৯:২৪ — هُوَ اللّٰهُ الْخَالِقُ الْبَارِئُ الْمُصَوِّرُ لَهُ الْأَسْمَاءُ الْحُسْنٰى'],
    checklist: ['নামের আরবি ও হরকত: الْخَالِقُ', 'আয়াতাংশের আরবি মুসহাফের সাথে মিলানো', 'অর্থ: সৃষ্টিকর্তা · আল-বারি = উদ্ভাবক · আল-মুসাওয়ির = রূপদাতা', 'সূত্র ৫৯:২৪'],
    unsure: ['শব্দে ঝিঁঝিঁর ডাক রেখেছি (কীটপতঙ্গ দেখা যাবে না)। না চাইলে প্রম্পট থেকে "soft crickets" মুছে দেবো।'],
  }),

  duaReel({
    id: 'reel06',
    theme: 'violet',
    number: 6,
    title: 'কঠিন কাজের আগের দোয়া',
    count: '৩',
    arabic: 'رَبِّ اشْرَحْ لِي صَدْرِي',
    bangla: 'রাব্বিশ রাহলি সাদরি',
    meaning: 'হে আমার রব, আমার বুক প্রশস্ত করে দাও (মন খুলে দাও)',
    source: 'সূরা ত্ব-হা, আয়াত ২৫',
    // words 2-5 of 20:25 ("qala" left out), where the ayah ends
    quran: {ref: '20:25', words: [2, 5]},
    narration: {
      meaning: 'এর অর্থ, হে আমার রব, আমার মন খুলে দাও।',
      closing: 'ভয় লাগলে বা কঠিন কাজের আগে, এই দোয়াটা পড়বে।',
    },
    scenes: [
      {
        art: 'dusk-lake',
        sound: 'night',
        look: 'সন্ধ্যায় শান্ত হ্রদে ডুবন্ত সূর্যের আলো',
        prompt: veo('A calm lake at dusk, the setting sun glowing softly on the water, purple and orange sky slowly darkening.', 'quiet evening air and soft lapping water'),
        tint: ['#B07A8C', '#2E3358'],
      },
      {
        art: 'moon-clouds',
        sound: 'night',
        look: 'চাঁদের আলোয় ধীরে ভেসে যাওয়া মেঘ',
        prompt: veo('Soft clouds drifting slowly across a bright full moon in a dark blue night sky, silver light on the cloud edges.', 'gentle night wind'),
        tint: ['#4B5C8C', '#121A38'],
      },
      {
        art: 'night-river',
        sound: 'stream',
        look: 'চাঁদের আলোয় বনের মাঝ দিয়ে বয়ে যাওয়া নদী',
        prompt: veo('A quiet river winding through a dark forest under a bright moon and stars, moonlight shimmering on the water.', 'softly flowing water at night'),
        tint: ['#2E4078', '#0B1230'],
      },
    ],
    sources: [
      'সূরা ত্ব-হা ২০:২৫ — قَالَ رَبِّ اشْرَحْ لِي صَدْرِي; ফিরআউনের কাছে যাওয়ার আগে মূসা (আ.) এই দোয়া করেছিলেন',
    ],
    checklist: [
      'আরবি ও হরকত: رَبِّ اشْرَحْ لِي صَدْرِي (আয়াতে আগে قَالَ আছে, রিলে শুধু দোয়ার অংশ)',
      'বাংলা উচ্চারণ: রাব্বিশ রাহলি সাদরি',
      'অর্থ: হে আমার রব, আমার বুক প্রশস্ত করে দাও (মন খুলে দাও)',
      'সূত্র: সূরা ত্ব-হা, আয়াত ২৫',
      'বাচ্চাদের জন্য "ভয় লাগলে বা কঠিন কাজের আগে" পড়ার কথা বলা ঠিক আছে কি না',
    ],
    unsure: [
      'কারি "কালা রাব্বি" টানা পড়েন; তিলাওয়াত "রাব্বি" থেকে কাটা, শুরুটা একটু হঠাৎ লাগতে পারে।',
    ],
  }),

  textReel({
    id: 'reel07',
    theme: 'teal',
    number: 7,
    kind: 'ayah',
    title: 'আল্লাহর স্মরণে অন্তরের প্রশান্তি',
    kicker: 'ছোট আয়াত · ২',
    arabic: 'أَلَا بِذِكْرِ اللّٰهِ تَطْمَئِنُّ الْقُلُوبُ',
    meaning: 'জেনে রাখো, আল্লাহর স্মরণেই অন্তর প্রশান্ত হয়।',
    source: 'সূরা আর-রা\'দ ১৩:২৮ (আয়াতের শেষ অংশ)',
    note: 'সহজ কথায়: আল্লাহকে মনে করলে মন শান্ত হয়',
    quran: {ref: '13:28', words: [7, 11]},
    narration: {intro: 'মন খারাপ লাগলে বা ভয় পেলে, এই আয়াতটা মনে রাখবে।', meaning: 'এর মানে, আল্লাহকে মনে করলে, মন শান্ত হয়ে যায়।', source: 'সূরা আর-রা\'দ, আটাশ নম্বর আয়াত।'},
    scenes: [
      {
        art: 'bluehour-lake',
        sound: 'night',
        look: 'নীলাভ সন্ধ্যায় স্থির হ্রদে পাহাড়ের প্রতিচ্ছবি',
        prompt: veo('A perfectly still mountain lake at blue hour, the mountains mirrored on the glassy water, very calm.', 'near silence with very soft water lapping'),
        tint: ['#9FB5D3', '#25344F'],
      },
      {
        art: 'misty-lake',
        sound: 'morning-birds',
        look: 'ভোরে বনের মাঝে হ্রদের ওপর কুয়াশা ভাসছে',
        prompt: veo('Morning mist floating slowly over a quiet forest lake at dawn, pine trees on the shore, soft pale light.', 'quiet morning air and faint distant birdsong'),
        tint: ['#D5DDD6', '#3D5649'],
      },
      {
        art: 'clouds-valley',
        sound: 'wind',
        look: 'উপত্যকার ওপর দিয়ে ধীরে ভেসে যাওয়া সাদা মেঘ',
        prompt: veo('White fluffy clouds drifting slowly over a wide green valley, time-lapse, cloud shadows moving gently across the land.', 'soft wind'),
        tint: ['#CFE1EF', '#4B6E4F'],
      },
    ],
    sources: ['সূরা আর-রা\'দ ১৩:২৮ — الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُمْ بِذِكْرِ اللّٰهِ ۗ أَلَا بِذِكْرِ اللّٰهِ تَطْمَئِنُّ الْقُلُوبُ'],
    checklist: ['আয়াতাংশের আরবি ও হরকত মুসহাফের সাথে মিলানো', 'বাংলা অর্থ', 'সূত্র ১৩:২৮ (শেষ অংশ)'],
  }),

  textReel({
    id: 'reel08',
    theme: 'peach',
    number: 8,
    kind: 'ayah',
    title: 'আল্লাহ কাদের ভালোবাসেন',
    kicker: 'ছোট আয়াত · ৩',
    arabic: 'وَاللّٰهُ يُحِبُّ الْمُحْسِنِينَ',
    meaning: 'আর আল্লাহ সৎকর্মশীলদের ভালোবাসেন।',
    source: 'সূরা আলে ইমরান, আয়াত ১৩৪',
    note: 'তাই আমরাও সবসময় ভালো কাজ করবো',
    // the qari pauses after "ani-n-nas" (waqf mark), so the cut starts cleanly; the ayah ends here
    quran: {ref: '3:134', words: [11, 13]},
    narration: {
      intro: 'আল্লাহ কাদের ভালোবাসেন, জানো?',
      meaning: 'যারা ভালো কাজ করে, আল্লাহ তাদের ভালোবাসেন।',
      source: 'সূরা আলে ইমরান, একশো চৌত্রিশ নম্বর আয়াত।',
      note: 'তাই আমরাও, সবসময় ভালো কাজ করবো।',
    },
    scenes: [
      {
        art: 'lone-tree',
        sound: 'leaves',
        look: 'সবুজ মাঠের মাঝে একা দাঁড়িয়ে থাকা বড় ছায়াঘেরা গাছ',
        prompt: veo('A single large leafy tree standing in a green meadow on a sunny morning, its branches moving gently in the breeze.', 'wind in the leaves and faint distant birdsong'),
        tint: ['#CBE3B6', '#35603C'],
      },
      {
        art: 'canopy',
        sound: 'leaves',
        look: 'নিচ থেকে গাছের ডালপালা আর পাতার ফাঁকে আকাশ',
        prompt: veo('Looking straight up into the green canopy of a tall tree, sunlight flickering through the moving leaves against a blue sky.', 'leaves rustling'),
        tint: ['#BFE0A8', '#2C5434'],
      },
      {
        art: 'orange-tree',
        sound: 'morning-birds',
        look: 'পাকা ফলে ভরা গাছের ডাল, হালকা রোদ',
        prompt: veo('Branches of a fruit tree heavy with ripe oranges glowing in soft afternoon sunlight, leaves moving slightly in the wind.', 'gentle breeze'),
        tint: ['#F4D29A', '#3E5E34'],
      },
    ],
    sources: ['সূরা আলে ইমরান ৩:১৩৪ — ... وَالْعَافِينَ عَنِ النَّاسِ ۗ وَاللّٰهُ يُحِبُّ الْمُحْسِنِينَ'],
    checklist: [
      'আয়াতাংশের আরবি ও হরকত মুসহাফের সাথে মিলানো: وَاللّٰهُ يُحِبُّ الْمُحْسِنِينَ',
      'অনুবাদ: আর আল্লাহ সৎকর্মশীলদের ভালোবাসেন',
      'বাচ্চাদের জন্য সহজ কথা: "যারা ভালো কাজ করে, আল্লাহ তাদের ভালোবাসেন" ঠিক আছে কি না',
      'সূত্র: সূরা আলে ইমরান, আয়াত ১৩৪ (শেষ অংশ)',
    ],
    unsure: ['"মুহসিনীন" শব্দের অর্থ সৎকর্মশীল / যারা সুন্দরভাবে ভালো কাজ করে; বাচ্চাদের জন্য সহজ করে "যারা ভালো কাজ করে" বলা হয়েছে।'],
  }),

  asmaReel({
    id: 'reel09',
    theme: 'lime',
    number: 9,
    title: 'আর-রাযযাক: রিজিকদাতা',
    count: '৩',
    arabic: 'الرَّزَّاقُ',
    bangla: 'আর-রাযযাক',
    meaning: 'রিজিকদাতা',
    explain: 'যিনি সবাইকে খাবার আর সবকিছু দেন',
    ayah: {arabic: 'إِنَّ اللّٰهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ', meaning: 'নিশ্চয়ই আল্লাহই রিজিকদাতা, প্রবল শক্তির অধিকারী, পরাক্রমশালী।', source: 'সূরা আয-যারিয়াত, আয়াত ৫৮', note: 'আমাদের খাবার, পানি, সবকিছু আল্লাহই দেন', quran: {ref: '51:58'}, spokenMeaning: false},
    narration: {intro: 'আল্লাহর সুন্দর নামগুলোর একটি।', meaning: 'এর অর্থ, রিজিকদাতা।', ayah: 'আমাদের খাবার, পানি, সবকিছু, আল্লাহই দেন।'},
    scenes: [
      {
        art: 'rain-paddy',
        sound: 'rain',
        look: 'সবুজ ধানক্ষেতে নরম বৃষ্টি',
        prompt: veo('Soft rain falling on bright green rice paddies, drops landing on the young rice leaves, misty hills far away.', 'gentle rain'),
        tint: ['#BFD7B0', '#2E5A3A'],
      },
      {
        art: 'golden-rice',
        sound: 'wind',
        look: 'সোনালি পাকা ধানের শিষ বাতাসে দুলছে',
        prompt: veo('Golden ripe rice stalks heavy with grain swaying in the wind at sunset, warm light, close shot.', 'wind through the rice field'),
        tint: ['#F2CF83', '#7A6230'],
      },
      {
        art: 'mango-tree',
        sound: 'leaves',
        look: 'পাকা আমে ভরা গাছের ডাল, পাতার ফাঁকে রোদ',
        prompt: veo('Ripe mangoes hanging from a leafy mango tree branch, sunlight filtering through the leaves, gentle movement in the breeze.', 'soft breeze and faint distant birdsong'),
        tint: ['#E9D58E', '#3C5C2F'],
      },
    ],
    sources: ['সূরা আয-যারিয়াত ৫১:৫৮ — إِنَّ اللّٰهَ هُوَ الرَّزَّاقُ ذُو الْقُوَّةِ الْمَتِينُ'],
    checklist: ['নামের আরবি ও হরকত: الرَّزَّاقُ', 'আয়াতের আরবি মুসহাফের সাথে মিলানো', 'বাংলা উচ্চারণ: আর-রাযযাক', 'অর্থ ও আয়াতের অনুবাদ', 'সূত্র ৫১:৫৮'],
  }),

  textReel({
    id: 'reel10',
    theme: 'mint',
    number: 10,
    kind: 'ayah',
    title: 'পানি থেকে সব প্রাণ',
    kicker: 'ছোট আয়াত · ৪',
    arabic: 'وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ',
    meaning: 'আর আমি পানি থেকে প্রত্যেক জীবন্ত জিনিস সৃষ্টি করেছি।',
    source: 'সূরা আল-আম্বিয়া, আয়াত ৩০',
    note: 'তাই আমরা পানি নষ্ট করবো না',
    // between two waqf marks; the qari pauses before it
    quran: {ref: '21:30', words: [11, 16]},
    narration: {
      intro: 'বৃষ্টির পানি কত দামি, জানো?',
      meaning: 'আল্লাহ পানি থেকে, সব জীবন্ত জিনিস বানিয়েছেন।',
      source: 'সূরা আল-আম্বিয়া, ত্রিশ নম্বর আয়াত।',
      note: 'তাই আমরা, পানি নষ্ট করবো না।',
    },
    scenes: [
      {
        art: 'rain-forest',
        sound: 'rain',
        look: 'কুয়াশা ঢাকা পাহাড়ি বনে নরম বৃষ্টি',
        prompt: veo('Gentle rain falling over a misty green hill forest, layers of trees fading into soft fog.', 'soft steady rain on leaves'),
        tint: ['#A2B2AA', '#22402F'],
      },
      {
        art: 'rain-river',
        sound: 'rain-water',
        look: 'সবুজ মাঠের মাঝ দিয়ে বয়ে যাওয়া নদীতে বৃষ্টি',
        prompt: veo('Light rain falling on a calm river winding through green fields, rings spreading on the water, soft grey sky.', 'rain falling on water'),
        tint: ['#AEBBBE', '#5D8A60'],
      },
      {
        art: 'rain-meadow',
        sound: 'rain',
        look: 'ফুলের মাঠে বৃষ্টি, তারপর মেঘ সরে আলো',
        prompt: veo('Soft rain over a green meadow dotted with small white and yellow flowers, clouds slowly parting and warm light returning.', 'gentle rain and a light breeze'),
        tint: ['#C3CBC6', '#5F9358'],
      },
    ],
    sources: ['সূরা আল-আম্বিয়া ২১:৩০ — ... فَفَتَقْنَاهُمَا ۖ وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ ۖ أَفَلَا يُؤْمِنُونَ'],
    checklist: [
      'আয়াতাংশের আরবি ও হরকত মুসহাফের সাথে মিলানো: وَجَعَلْنَا مِنَ الْمَاءِ كُلَّ شَيْءٍ حَيٍّ',
      'অনুবাদ: আর আমি পানি থেকে প্রত্যেক জীবন্ত জিনিস সৃষ্টি করেছি',
      'বাচ্চাদের জন্য সহজ কথা ও শিক্ষা ("পানি নষ্ট করবো না") ঠিক আছে কি না',
      'সূত্র: সূরা আল-আম্বিয়া, আয়াত ৩০ (আয়াতের অংশ)',
    ],
    unsure: ['তিলাওয়াত আয়াতের মাঝখান থেকে (শব্দ ১১–১৬); শুরুতে কারি থামেন, শেষে টানা পড়েন, তাই শেষে আওয়াজ নরমভাবে মিলিয়ে দেওয়া হয়েছে।'],
  }),

  textReel({
    id: 'reel11',
    theme: 'coral',
    number: 11,
    kind: 'ayah',
    title: 'আমাকে স্মরণ করো',
    kicker: 'ছোট আয়াত · ৫',
    arabic: 'فَاذْكُرُونِي أَذْكُرْكُمْ',
    meaning: 'সুতরাং তোমরা আমাকে স্মরণ করো, আমিও তোমাদের স্মরণ করব।',
    source: 'সূরা আল-বাকারা, আয়াত ১৫২',
    note: 'তাই আমরা সবসময় আল্লাহকে মনে করবো',
    quran: {ref: '2:152', words: [1, 2]},
    narration: {intro: 'আল্লাহ আমাদের, একটা সুন্দর কথা বলেছেন।', meaning: 'তোমরা আমাকে মনে করো, আমিও তোমাদের মনে রাখবো।', source: 'সূরা আল-বাকারা, একশো বাহান্ন নম্বর আয়াত।', note: 'তাই আমরা, সবসময় আল্লাহকে মনে করবো।'},
    scenes: [
      {
        art: 'starry-lake',
        sound: 'night',
        look: 'পাহাড়ি হ্রদের ওপর তারাভরা রাতের আকাশ',
        prompt: veo('A deep starry night sky over a calm mountain lake, stars reflected on the water, slow time-lapse of the stars moving.', 'quiet night with soft water'),
        tint: ['#2A3765', '#0B1229'],
      },
      {
        art: 'desert-night',
        sound: 'night',
        look: 'তারাভরা আকাশের নিচে মরুভূমির বালিয়াড়ি',
        prompt: veo('Gentle sand dunes under a vast starry night sky with a thin moon, the Milky Way glowing above, very still.', 'very soft desert night wind'),
        tint: ['#18224A', '#2A2232'],
      },
      {
        art: 'fajr-horizon',
        sound: 'morning-birds',
        look: 'ভোরের আগে দিগন্তে প্রথম আলো (ফজরের সময়)',
        prompt: veo('The first light of dawn appearing on the horizon over quiet hills, deep blue sky slowly turning orange and pink, a few stars fading.', 'still early morning air and very faint distant birdsong'),
        tint: ['#F0B48A', '#2A3456'],
      },
    ],
    sources: ['সূরা আল-বাকারা ২:১৫২ — فَاذْكُرُونِي أَذْكُرْكُمْ وَاشْكُرُوا لِي وَلَا تَكْفُرُونِ'],
    checklist: ['আয়াতাংশের আরবি ও হরকত মুসহাফের সাথে মিলানো', 'বাংলা অর্থ', 'সূত্র ২:১৫২ (আয়াতের প্রথম অংশ)'],
  }),

  textReel({
    id: 'reel12',
    theme: 'sky',
    number: 12,
    kind: 'ayah',
    title: 'মুমিনরা সবাই ভাই ভাই',
    kicker: 'ছোট আয়াত · ৬',
    arabic: 'إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ',
    meaning: 'নিশ্চয়ই মুমিনরা পরস্পর ভাই ভাই।',
    source: 'সূরা আল-হুজুরাত, আয়াত ১০',
    note: 'তাই আমরা ঝগড়া না করে মিলেমিশে থাকবো',
    // from the start of 49:10; the qari reads on, so the end fades
    quran: {ref: '49:10', words: [1, 3]},
    narration: {
      intro: 'বন্ধুদের সাথে, কেমন থাকবো জানো?',
      meaning: 'মুমিনরা সবাই, ভাই ভাই।',
      source: 'সূরা আল-হুজুরাত, দশ নম্বর আয়াত।',
      note: 'তাই আমরা, ঝগড়া না করে মিলেমিশে থাকবো।',
    },
    scenes: [
      {
        art: 'sunset-beach',
        sound: 'waves',
        look: 'সূর্যাস্তে শান্ত সমুদ্রের ঢেউ তীরে আসছে',
        prompt: veo('Gentle waves rolling onto an empty sandy beach at sunset, warm golden light on the wet sand, calm sea.', 'soft waves on the shore'),
        tint: ['#F3C08F', '#3B4F6B'],
      },
      {
        art: 'streams-join',
        sound: 'stream',
        look: 'দুটি ছোট নদী মিলে একটি নদী হয়ে বয়ে যাচ্ছে',
        prompt: veo('Two small clear streams meeting and joining into one river in a green forest, slow aerial view, soft light.', 'flowing water'),
        tint: ['#C5E3D3', '#2A5244'],
      },
      {
        art: 'two-trees-sunset',
        sound: 'wind',
        look: 'পাশাপাশি দুটি গাছ, পেছনে সোনালি সূর্যাস্ত',
        prompt: veo('Two trees standing side by side on a gentle hill against a golden sunset sky, grass moving softly in the wind.', 'evening breeze'),
        tint: ['#F1BE7E', '#4A4E3A'],
      },
    ],
    sources: ['সূরা আল-হুজুরাত ৪৯:১০ — إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ فَأَصْلِحُوا بَيْنَ أَخَوَيْكُمْ ...'],
    checklist: [
      'আয়াতাংশের আরবি ও হরকত মুসহাফের সাথে মিলানো: إِنَّمَا الْمُؤْمِنُونَ إِخْوَةٌ',
      'অনুবাদ: নিশ্চয়ই মুমিনরা পরস্পর ভাই ভাই',
      'বাচ্চাদের জন্য শিক্ষা ("ঝগড়া না করে মিলেমিশে থাকবো") ঠিক আছে কি না',
      'সূত্র: সূরা আল-হুজুরাত, আয়াত ১০ (আয়াতের প্রথম অংশ)',
    ],
    unsure: ['কারি "ইখওয়াহ" এর পরে না থেমে পড়েন; তিলাওয়াতের শেষে আওয়াজ নরমভাবে মিলিয়ে দেওয়া হয়েছে।'],
  }),

  asmaReel({
    id: 'reel13',
    theme: 'rose',
    number: 13,
    title: 'আর-রহিম: অতি দয়ালু',
    count: '৪',
    arabic: 'الرَّحِيمُ',
    bangla: 'আর-রহিম',
    meaning: 'অতি দয়ালু',
    explain: 'যিনি বারবার দয়া করেন',
    ayah: {
      arabic: 'الرَّحْمٰنِ الرَّحِيمِ',
      meaning: 'যিনি পরম দয়াময়, অতি দয়ালু',
      source: 'সূরা আল-ফাতিহা, আয়াত ২',
      note: 'সূরা ফাতিহায় আর-রহমানের ঠিক পরেই আছে আর-রহিম',
      // quran.com counts the basmala as 1:1, so this ayah is 1:3 there
      quran: {ref: '1:3'},
    },
    narration: {
      intro: 'আল্লাহর সুন্দর নামগুলোর আরেকটি।',
      meaning: 'এর অর্থ, অতি দয়ালু।',
      ayah: 'সূরা ফাতিহায় আর-রহমানের ঠিক পরেই আছে আর-রহিম নাম।',
    },
    scenes: [
      {
        art: 'dawn-river',
        sound: 'morning-birds',
        look: 'ভোরে শান্ত চওড়া নদী, পানিতে আকাশের নরম রং',
        prompt: veo('A wide calm river at dawn with light mist on the water. The soft pastel sky is reflected on the smooth surface, gentle ripples.', 'quiet lapping water and faint distant birdsong'),
        tint: ['#F1D3A8', '#3B6E73'],
      },
      {
        art: 'white-blossom',
        sound: 'leaves',
        look: 'নীল আকাশের নিচে ডালে ফুটে থাকা সাদা ফুল, পাপড়ি ভেসে যাচ্ছে',
        prompt: veo('Branches full of white blossoms against a clear blue sky, a few petals drifting slowly through the air.', 'soft breeze through branches'),
        tint: ['#E9EEF7', '#5A7898'],
      },
      {
        art: 'waterfall',
        sound: 'waterfall',
        look: 'সবুজ পাহাড়ি ঝরনা, পাথরের ওপর দিয়ে সাদা পানি নামছে',
        prompt: veo('A clear waterfall flowing down mossy rocks in a lush green mountain forest, white water falling into a small clear pool.', 'the steady sound of falling water'),
        tint: ['#CFE3D2', '#24513F'],
      },
    ],
    sources: [
      'নাম الرَّحِيمُ: সূরা আল-ফাতিহা আয়াত ২ (বিসমিল্লাহ ছাড়া গণনায়; মদিনার মুসহাফে ১:৩), আরও বহু আয়াতে, যেমন সূরা আল-বাকারা ২:১৬৩',
    ],
    checklist: [
      'নামের আরবি বানান ও হরকত: الرَّحِيمُ',
      'আয়াতের আরবি মুসহাফের সাথে মিলানো: الرَّحْمٰنِ الرَّحِيمِ (আল-ফাতিহা আয়াত ২)',
      'বাংলা উচ্চারণ: আর-রহিম',
      'অর্থ: অতি দয়ালু · ব্যাখ্যা "যিনি বারবার দয়া করেন" ঠিক আছে কি না',
    ],
    unsure: [
      'আর-রহমান ও আর-রহিমের পার্থক্য নিয়ে আলেমদের ব্যাখ্যা আছে (অনেকে বলেন আর-রহিম বিশেষ করে মুমিনদের প্রতি দয়া)। বাচ্চাদের জন্য সহজ ব্যাখ্যা "যিনি বারবার দয়া করেন" দেওয়া হয়েছে; আলেমের মত নিন।',
      'আল-ফাতিহার আয়াত নম্বর: বাংলাদেশে প্রচলিত গণনায় এটা আয়াত ২ (রিলে এটাই লেখা); মদিনার মুসহাফে ১:৩।',
    ],
  }),
  asmaReel({
    id: 'reel14',
    theme: 'violet',
    number: 14,
    title: 'আস-সালাম: শান্তিদাতা',
    count: '৫',
    arabic: 'السَّلَامُ',
    bangla: 'আস-সালাম',
    meaning: 'শান্তিদাতা',
    explain: 'যিনি শান্তি দেন, যাঁর মধ্যে কোনো দোষ নেই',
    ayah: {
      arabic: 'الْمَلِكُ الْقُدُّوسُ السَّلَامُ',
      meaning: 'অধিপতি, মহাপবিত্র, শান্তিদাতা',
      source: 'সূরা আল-হাশর ৫৯:২৩ (আয়াতের অংশ)',
      note: 'সালাম দিয়ে আমরা একে অপরের জন্য শান্তি চাই',
      quran: {ref: '59:23', words: [8, 10]},
    },
    narration: {
      intro: 'আল্লাহর সুন্দর নামগুলোর আরেকটি।',
      meaning: 'এর অর্থ, শান্তিদাতা।',
      ayah: 'আমরা যখন সালাম দিই, তখন একে অপরের জন্য শান্তি চাই।',
    },
    scenes: [
      {
        art: 'lotus-pond',
        sound: 'morning-birds',
        look: 'শান্ত পুকুরে ফুটে থাকা পদ্ম আর শাপলা',
        prompt: veo('Pink lotus flowers and water lilies floating on a calm pond, gentle ripples, soft morning light reflecting on the water.', 'quiet water and soft wind'),
        tint: ['#F3D2DD', '#2F5D58'],
      },
      {
        art: 'turquoise-falls',
        sound: 'waterfall',
        look: 'সবুজ পাহাড় থেকে নেমে আসা ঝরনা, নিচে স্বচ্ছ নীলচে জলাশয়',
        prompt: veo('A tall graceful waterfall pouring into a clear turquoise pool surrounded by lush green plants, soft mist in the air.', 'falling water'),
        tint: ['#BFE6E2', '#21504C'],
      },
      {
        art: 'river-valley',
        sound: 'stream',
        look: 'সবুজ উপত্যকার মাঝ দিয়ে এঁকেবেঁকে যাওয়া স্বচ্ছ নদী',
        prompt: veo('A crystal clear river winding through a lush green valley in soft sunlight, slow aerial view gliding along the river.', 'flowing river and soft wind'),
        tint: ['#CDE8D6', '#2C5D47'],
      },
    ],
    sources: [
      'সূরা আল-হাশর ৫৯:২৩ — هُوَ اللّٰهُ الَّذِي لَا إِلٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ ...',
      'নবীজি ﷺ বলেছেন, إِنَّ اللّٰهَ هُوَ السَّلَامُ (নিশ্চয়ই আল্লাহই আস-সালাম) — সহিহ বুখারি ৮৩১ (তাশাহহুদের হাদিস, ইবনে মাসউদ রা. থেকে)',
    ],
    checklist: [
      'নামের আরবি বানান ও হরকত: السَّلَامُ',
      'আয়াতাংশের আরবি মুসহাফের সাথে মিলানো: الْمَلِكُ الْقُدُّوسُ السَّلَامُ (৫৯:২৩, শব্দ ৮–১০)',
      'বাংলা উচ্চারণ: আস-সালাম',
      'অর্থ: শান্তিদাতা · ব্যাখ্যা "যিনি শান্তি দেন, যাঁর মধ্যে কোনো দোষ নেই"',
      'আয়াতাংশের অনুবাদ: অধিপতি, মহাপবিত্র, শান্তিদাতা',
      'সালামের সাথে নামটির সম্পর্ক যেভাবে বলা হয়েছে ("সালাম দিয়ে একে অপরের জন্য শান্তি চাই") ঠিক আছে কি না',
    ],
    unsure: [
      'তিলাওয়াত আয়াতের মাঝখান থেকে (শব্দ ৮–১০) কাটা; কারি টানা পড়েন, তাই শেষটা একটু হঠাৎ থামতে পারে। শুনে দেখবেন।',
      HADITH_NUMBERING,
    ],
  }),
  asmaReel({
    id: 'reel15',
    theme: 'mint',
    number: 15,
    title: 'আল-মুহাইমিন: রক্ষণাবেক্ষণকারী',
    count: '৬',
    arabic: 'الْمُهَيْمِنُ',
    bangla: 'আল-মুহাইমিন',
    meaning: 'রক্ষণাবেক্ষণকারী',
    explain: 'যিনি সবকিছু দেখে রাখেন আর হেফাজত করেন',
    ayah: {
      arabic: 'هُوَ اللّٰهُ الَّذِي لَا إِلٰهَ إِلَّا هُوَ الْمَلِكُ الْقُدُّوسُ السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ',
      meaning: 'তিনিই আল্লাহ, যিনি ছাড়া কোনো ইলাহ নেই; অধিপতি, মহাপবিত্র, শান্তিদাতা, নিরাপত্তাদাতা, রক্ষণাবেক্ষণকারী',
      source: 'সূরা আল-হাশর ৫৯:২৩ (আয়াতের অংশ)',
      note: 'আব্দুল মুহাইমিন নামের অর্থ: রক্ষণাবেক্ষণকারীর বান্দা',
      // from the start of the ayah (the qari reads it without a pause), so the recitation starts cleanly
      quran: {ref: '59:23', words: [1, 12]},
      spokenMeaning: false,
    },
    narration: {
      intro: 'আল্লাহর সুন্দর নামগুলোর আরেকটি।',
      meaning: 'এর অর্থ, রক্ষণাবেক্ষণকারী।',
      ayah: 'আব্দুল মুহাইমিন নামের অর্থ, রক্ষণাবেক্ষণকারীর বান্দা।',
    },
    scenes: [
      {
        art: 'valley-lake',
        sound: 'mountain-wind',
        look: 'চারদিকে পাহাড়ে ঘেরা শান্ত হ্রদ',
        prompt: veo('A calm lake in a green valley surrounded by tall protective mountains, the peaks reflected on the still water, soft daylight.', 'gentle mountain wind and quiet water'),
        tint: ['#B9D6E6', '#24504F'],
      },
      {
        art: 'snowy-pines',
        sound: 'night',
        look: 'নরম তুষারপাতে পাইন গাছের বন',
        prompt: veo('Soft snow falling slowly over a quiet pine forest, layers of snowy trees fading into pale mist.', 'very quiet still air'),
        tint: ['#D3DEE6', '#2E4650'],
      },
      {
        art: 'spring-ferns',
        sound: 'stream',
        look: 'ফার্ন আর শ্যাওলার মাঝে পাথর থেকে উঠে আসা ছোট ঝরনাধারা',
        prompt: veo('A small natural spring bubbling up between mossy rocks and green ferns, clear water spilling over the stones, dappled light.', 'bubbling spring water'),
        tint: ['#D3EBC9', '#2A4E36'],
      },
    ],
    sources: [
      'সূরা আল-হাশর ৫৯:২৩ — ... الْمَلِكُ الْقُدُّوسُ السَّلَامُ الْمُؤْمِنُ الْمُهَيْمِنُ الْعَزِيزُ الْجَبَّارُ الْمُتَكَبِّرُ ...',
    ],
    checklist: [
      'নামের আরবি বানান ও হরকত: الْمُهَيْمِنُ',
      'আয়াতাংশের আরবি মুসহাফের সাথে মিলানো: هُوَ اللّٰهُ الَّذِي لَا إِلٰهَ إِلَّا هُوَ ... الْمُهَيْمِنُ (৫৯:২৩, শব্দ ১–১২)',
      'বাংলা উচ্চারণ: আল-মুহাইমিন',
      'অর্থ: রক্ষণাবেক্ষণকারী · ব্যাখ্যা "যিনি সবকিছু দেখে রাখেন আর হেফাজত করেন"',
      'আয়াতাংশের অনুবাদ: তিনিই আল্লাহ, যিনি ছাড়া কোনো ইলাহ নেই; অধিপতি, মহাপবিত্র, শান্তিদাতা, নিরাপত্তাদাতা, রক্ষণাবেক্ষণকারী',
      '"আব্দুল মুহাইমিন নামের অর্থ: রক্ষণাবেক্ষণকারীর বান্দা" ঠিক আছে কি না',
    ],
    unsure: [
      'কারি পুরো আয়াত না থেমে পড়েন; তিলাওয়াত আয়াতের শুরু থেকে আল-মুহাইমিন পর্যন্ত নেওয়া, শেষে নরমভাবে মিলিয়ে দেওয়া হয়েছে।',
      'আল-মুহাইমিনের অর্থ নিয়ে একাধিক ব্যাখ্যা আছে (সাক্ষী, তত্ত্বাবধায়ক, রক্ষক); বাচ্চাদের জন্য "রক্ষণাবেক্ষণকারী" দেওয়া হয়েছে।',
    ],
  }),
];

// every drawn scene belongs to one reel only, so no two reels look alike
const seen = new Map<string, string>();
for (const r of reels) {
  for (const sc of r.scenes) {
    if (seen.has(sc.art)) throw new Error(`Scene "${sc.art}" is used in both ${seen.get(sc.art)} and ${r.id}; give each reel its own scenes.`);
    seen.set(sc.art, r.id);
  }
}

export const reelById = (id: string) => {
  const r = reels.find((x) => x.id === id);
  if (!r) throw new Error(`Unknown reel ${id}`);
  return r;
};
