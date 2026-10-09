/** Series identity. Three proposals; ACTIVE_BRAND is the one every reel uses. */
export type BrandId = 'nidarshan' | 'bhorer-alo' | 'sobuj-tasbih';

export type Brand = {
  id: BrandId;
  name: string;
  tagline: string;
  colors: {
    /** Deep base colour: end card, placeholder backgrounds, logo badge. */
    deep: string;
    /** Highlight: logo line, Arabic text, thin rules. */
    accent: string;
    /** Main text colour over video. */
    text: string;
    /** Secondary text (sources, small labels). */
    soft: string;
  };
};

export const BRANDS: Record<BrandId, Brand> = {
  nidarshan: {
    id: 'nidarshan',
    name: 'নিদর্শন',
    tagline: 'প্রকৃতির মাঝে আল্লাহর কথা',
    colors: {deep: '#163A2E', accent: '#E6BE6A', text: '#FBF7EC', soft: '#D9E4DA'},
  },
  'bhorer-alo': {
    id: 'bhorer-alo',
    name: 'ভোরের আলো',
    tagline: 'প্রতিদিন একটু নূর',
    colors: {deep: '#1D2645', accent: '#F2B279', text: '#FFF8F0', soft: '#D8DCEB'},
  },
  'sobuj-tasbih': {
    id: 'sobuj-tasbih',
    name: 'সবুজ তাসবিহ',
    tagline: 'সবকিছু তাঁরই প্রশংসা করে',
    colors: {deep: '#12403F', accent: '#9FD8C2', text: '#F4FBF8', soft: '#CFE6DF'},
  },
};

export const ACTIVE_BRAND: Brand = BRANDS.nidarshan;

const BN_DIGITS = '০১২৩৪৫৬৭৮৯';
export const toBn = (n: number | string) => String(n).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
