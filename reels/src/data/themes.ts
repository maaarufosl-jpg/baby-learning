/**
 * Per-reel colour themes, so neighbouring reels do not look alike.
 * accent: Arabic text, labels, source pill · soft: small notes · shade: r,g,b of the dark layer over the scene.
 */
export type Theme = {accent: string; soft: string; shade: string};

export const THEMES = {
  gold: {accent: '#E6BE6A', soft: '#D9E4DA', shade: '6,16,12'},
  sky: {accent: '#9FD4F2', soft: '#D6E6F2', shade: '6,14,28'},
  rose: {accent: '#F4B8C8', soft: '#F1DCE3', shade: '24,10,18'},
  mint: {accent: '#A6E3C8', soft: '#D3EEE3', shade: '5,20,18'},
  orange: {accent: '#F6B27A', soft: '#F2E0D2', shade: '26,14,8'},
  violet: {accent: '#C9B5F2', soft: '#E2DBF4', shade: '16,10,30'},
  lime: {accent: '#D8E68A', soft: '#E6EDCC', shade: '14,20,6'},
  coral: {accent: '#F49C8E', soft: '#F3D9D4', shade: '28,10,10'},
  teal: {accent: '#7FD6D0', soft: '#D2EEEC', shade: '4,18,22'},
  peach: {accent: '#F7C9A0', soft: '#F5E6D8', shade: '24,14,10'},
} satisfies Record<string, Theme>;

export type ThemeName = keyof typeof THEMES;
