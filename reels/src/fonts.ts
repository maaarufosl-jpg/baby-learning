import {loadFont} from '@remotion/fonts';
import {staticFile} from 'remotion';

export const BENGALI_FONT = 'Hind Siliguri';
export const ARABIC_FONT = 'Amiri';

const BENGALI_RANGE =
  'U+0951-0952, U+0964-0965, U+0980-09FE, U+1CD0, U+1CD2, U+1CD5-1CD6, U+1CD8, U+1CE1, U+1CEA, U+1CED, U+1CF2, U+1CF5-1CF7, U+200C-200D, U+20B9, U+25CC, U+A8F1';
const LATIN_RANGE =
  'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD';
const ARABIC_RANGE =
  'U+0600-06FF, U+0750-077F, U+0870-088E, U+0890-0891, U+0897-08E1, U+08E3-08FF, U+200C-200E, U+2010-2011, U+204F, U+2E41, U+FB50-FDFF, U+FE70-FE74, U+FE76-FEFC, U+102E0-102FB, U+10E60-10E7E, U+10EC2-10EC4, U+10EFC-10EFF, U+1EE00-1EE03, U+1EE05-1EE1F, U+1EE21-1EE22, U+1EE24, U+1EE27, U+1EE29-1EE32, U+1EE34-1EE37, U+1EE39, U+1EE3B, U+1EE42, U+1EE47, U+1EE49, U+1EE4B, U+1EE4D-1EE4F, U+1EE51-1EE52, U+1EE54, U+1EE57, U+1EE59, U+1EE5B, U+1EE5D, U+1EE5F, U+1EE61-1EE62, U+1EE64, U+1EE67-1EE6A, U+1EE6C-1EE72, U+1EE74-1EE77, U+1EE79-1EE7C, U+1EE7E, U+1EE80-1EE89, U+1EE8B-1EE9B, U+1EEA1-1EEA3, U+1EEA5-1EEA9, U+1EEAB-1EEBB, U+1EEF0-1EEF1';

const fontFiles: {family: string; file: string; weight: string; unicodeRange: string}[] = [
  {family: BENGALI_FONT, file: 'hind-siliguri-bengali-400-normal.woff2', weight: '400', unicodeRange: BENGALI_RANGE},
  {family: BENGALI_FONT, file: 'hind-siliguri-bengali-600-normal.woff2', weight: '600', unicodeRange: BENGALI_RANGE},
  {family: BENGALI_FONT, file: 'hind-siliguri-bengali-700-normal.woff2', weight: '700', unicodeRange: BENGALI_RANGE},
  {family: BENGALI_FONT, file: 'hind-siliguri-latin-400-normal.woff2', weight: '400', unicodeRange: LATIN_RANGE},
  {family: BENGALI_FONT, file: 'hind-siliguri-latin-700-normal.woff2', weight: '700', unicodeRange: LATIN_RANGE},
  {family: ARABIC_FONT, file: 'amiri-arabic-400-normal.woff2', weight: '400', unicodeRange: ARABIC_RANGE},
  {family: ARABIC_FONT, file: 'amiri-arabic-700-normal.woff2', weight: '700', unicodeRange: ARABIC_RANGE},
];

export const loadAllFonts = (): Promise<void[]> =>
  Promise.all(
    fontFiles.map((f) =>
      loadFont({
        family: f.family,
        url: staticFile(`fonts/${f.file}`),
        weight: f.weight,
        format: 'woff2',
        unicodeRange: f.unicodeRange,
      }),
    ),
  );
