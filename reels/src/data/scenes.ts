import type {NatureScene} from '../components/Nature';

/** Drawn nature scenes used by the reels. Keys are referenced from reels.ts (scene.art). */
export const SCENES: Record<string, NatureScene> = {
  'sunrise-hills': {
    layers: [
      {type: 'sky', colors: ['#2E3F66', '#D98A6A', '#F6C77E'], to: ['#6C8FC0', '#F2B07C', '#FBE3A6']},
      {type: 'sun', x: 0.5, y: 0.47, r: 70, color: '#FFE3A0', rise: 0.06, glow: 7},
      {type: 'clouds', count: 4, y: [0.12, 0.3], color: '#F7C7A2', opacity: 0.55, speed: 10},
      {type: 'ridge', kind: 'hills', y: 0.56, amp: 0.08, color: '#7E8F8A', seed: 1, drift: 4},
      {type: 'mist', y: 0.56, color: '#F4DCC4', opacity: 0.6},
      {type: 'ridge', kind: 'hills', y: 0.66, amp: 0.1, color: '#4E6F5C', seed: 2, drift: 7},
      {type: 'mist', y: 0.67, color: '#EBD9C6', opacity: 0.45},
      {type: 'ridge', kind: 'forest', y: 0.8, amp: 0.1, color: '#2D4C3B', seed: 3, drift: 11},
      {type: 'ridge', kind: 'hills', y: 0.93, amp: 0.08, color: '#1C3326', seed: 4, drift: 16},
    ],
  },
  'forest-stream': {
    layers: [
      {type: 'sky', colors: ['#D9E8B8', '#9CC08A', '#4F7A52']},
      {type: 'rays', x: 0.7, y: -0.05, color: '#FFF4C8', opacity: 0.55},
      {type: 'ridge', kind: 'forest', y: 0.45, amp: 0.2, color: '#6E9466', seed: 11, drift: 3},
      {type: 'ridge', kind: 'forest', y: 0.55, amp: 0.22, color: '#3F6A45', seed: 12, drift: 6},
      {type: 'ridge', kind: 'hills', y: 0.62, amp: 0.04, color: '#355C3A', seed: 13},
      {type: 'river', color: '#8DC3C4', shimmer: '#F4FFF8', from: 0.58, width: 1.1, seed: 2},
      {type: 'stones', y: 0.66, colors: ['#8D8A7E', '#A7A391', '#6F6C62'], count: 26},
      {type: 'sparkle', count: 30, color: '#FFF6C9', y: [0.1, 0.6]},
      {type: 'grass', y: 0.97, color: '#24402A', height: 0.08, count: 60, tip: '#3E6B40'},
    ],
  },
  'rain-field-clear': {
    layers: [
      {type: 'sky', colors: ['#7E8C93', '#A9B5B3', '#CBD3C7'], to: ['#8FB4D6', '#E7D6A4', '#F4E7B8']},
      {type: 'sun', x: 0.62, y: 0.22, r: 55, color: '#FFF0C0', glow: 6},
      {type: 'clouds', count: 7, y: [0.08, 0.32], color: '#8D979C', opacity: 0.9, speed: 6, size: 1.4, part: true},
      {type: 'ridge', kind: 'hills', y: 0.5, amp: 0.05, color: '#6F8B7B', seed: 21},
      {type: 'field', y: 0.52, colors: ['#7FA65E', '#3E6B32'], rows: 22, stalk: '#5E8F43'},
      {type: 'rain', count: 140, opacity: 0.55},
      {type: 'rays', x: 0.62, y: 0.2, color: '#FFF1C2', opacity: 0.35},
    ],
  },
  'dawn-river': {
    layers: [
      {type: 'sky', colors: ['#4C5D88', '#C99BA0', '#F2D3A8']},
      {type: 'sun', x: 0.42, y: 0.5, r: 48, color: '#FFE9C2', glow: 8, rise: 0.03},
      {type: 'ridge', kind: 'forest', y: 0.55, amp: 0.05, color: '#3E4E5C', seed: 31, drift: 3},
      {type: 'water', y: 0.55, colors: ['#D8B7A8', '#4B6278'], shimmer: '#FFF0DA', sunX: 0.42},
      {type: 'mist', y: 0.57, color: '#F3E1D3', opacity: 0.55},
    ],
  },
  waterfall: {
    layers: [
      {type: 'sky', colors: ['#CFE7DD', '#8FBFA5', '#3F6E55']},
      {type: 'ridge', kind: 'forest', y: 0.3, amp: 0.15, color: '#5D8C68', seed: 41},
      {type: 'ridge', kind: 'mountains', y: 0.75, amp: 0.55, color: '#4F6658', seed: 42},
      {type: 'waterfall', x: 0.5, w: 0.2, top: 0.28, bottom: 0.72, color: '#CFEDEE'},
      {type: 'water', y: 0.72, colors: ['#9ED6D2', '#2F6B68'], shimmer: '#FFFFFF', ripples: true},
      {type: 'ridge', kind: 'forest', y: 0.98, amp: 0.12, color: '#234A35', seed: 43},
    ],
  },
  'golden-meadow': {
    layers: [
      {type: 'sky', colors: ['#8DB2D2', '#F1D3A1', '#F6B978']},
      {type: 'sun', x: 0.75, y: 0.5, r: 60, color: '#FFE2A0', glow: 8},
      {type: 'ridge', kind: 'hills', y: 0.55, amp: 0.06, color: '#A39367', seed: 51, drift: 3},
      {type: 'grass', y: 0.55, color: '#B89B55', height: 0.18, count: 260, tip: '#F2D58C', seed: 2},
    ],
  },
  'storm-mountains': {
    zoom: 0.04,
    layers: [
      {type: 'sky', colors: ['#3D4650', '#5F6B74', '#7E8890']},
      {type: 'clouds', count: 9, y: [0.05, 0.38], color: '#4A535C', opacity: 0.95, speed: 9, size: 1.6},
      {type: 'ridge', kind: 'mountains', y: 0.6, amp: 0.2, color: '#4C5A5E', seed: 61, drift: 2},
      {type: 'mist', y: 0.55, color: '#8C969B', opacity: 0.5},
      {type: 'ridge', kind: 'mountains', y: 0.75, amp: 0.18, color: '#33423F', seed: 62, drift: 4},
      {type: 'ridge', kind: 'forest', y: 0.92, amp: 0.1, color: '#1F2B28', seed: 63, drift: 7},
    ],
  },
  'clouds-part': {
    layers: [
      {type: 'sky', colors: ['#56636D', '#9AA7A6', '#CFD5C8'], to: ['#6E9BC6', '#D5DEC8', '#F2E8C2']},
      {type: 'sun', x: 0.5, y: 0.2, r: 50, color: '#FFF4CF', glow: 9},
      {type: 'clouds', count: 10, y: [0.08, 0.36], color: '#6B757C', opacity: 0.9, speed: 4, size: 1.5, part: true},
      {type: 'rays', x: 0.5, y: 0.2, color: '#FFF2C4', opacity: 0.5},
      {type: 'ridge', kind: 'mountains', y: 0.68, amp: 0.2, color: '#5F7B6A', seed: 71},
      {type: 'ridge', kind: 'hills', y: 0.86, amp: 0.1, color: '#3B5E45', seed: 72, drift: 5},
    ],
  },
  'rainbow-valley': {
    layers: [
      {type: 'sky', colors: ['#7FA9D6', '#BFD9E6', '#E9F0E4']},
      {type: 'clouds', count: 4, y: [0.1, 0.25], color: '#FFFFFF', opacity: 0.7, speed: 8},
      {type: 'rainbow', cx: 0.5, cy: 0.62, r: 0.62, opacity: 0.55},
      {type: 'ridge', kind: 'hills', y: 0.62, amp: 0.08, color: '#6E9C72', seed: 81, drift: 3},
      {type: 'ridge', kind: 'hills', y: 0.76, amp: 0.1, color: '#4C8357', seed: 82, drift: 6},
      {type: 'grass', y: 0.88, color: '#36693F', height: 0.05, count: 120, tip: '#5E9A5E'},
      {type: 'sparkle', count: 24, color: '#FFFFFF', y: [0.85, 1]},
    ],
  },
  'clear-stream': {
    layers: [
      {type: 'sky', colors: ['#BFE0DF', '#7DB8B7', '#3A7173']},
      {type: 'ridge', kind: 'forest', y: 0.32, amp: 0.15, color: '#5B8C77', seed: 91},
      {type: 'river', color: '#93D2D0', shimmer: '#FFFFFF', from: 0.3, width: 1.4, seed: 4},
      {type: 'stones', y: 0.4, colors: ['#9C9787', '#7B776A', '#B5AE98'], count: 40},
      {type: 'sparkle', count: 40, color: '#FFFFFF', y: [0.4, 1]},
    ],
  },
  'dew-leaves': {
    zoom: 0.08,
    layers: [
      {type: 'sky', colors: ['#E8F2D4', '#A8CC8C', '#5B8B54']},
      {type: 'sun', x: 0.75, y: 0.15, r: 80, color: '#FFF7D6', glow: 5},
      {type: 'leaves', colors: ['#5E9C49', '#4A873E', '#6DAD52', '#3F7636'], dew: true},
      {type: 'sparkle', count: 20, color: '#FFFFFF', y: [0.1, 0.9]},
    ],
  },
  'rain-lake': {
    layers: [
      {type: 'sky', colors: ['#8C9AA2', '#B5C0C2', '#C9D1CD']},
      {type: 'ridge', kind: 'forest', y: 0.44, amp: 0.08, color: '#5B726A', seed: 101},
      {type: 'mist', y: 0.43, color: '#D3DAD6', opacity: 0.7},
      {type: 'water', y: 0.45, colors: ['#9DAEB0', '#3D5558'], shimmer: '#E8F1F1', ripples: true},
      {type: 'rain', count: 110, opacity: 0.45},
    ],
  },
  'snow-peaks': {
    layers: [
      {type: 'sky', colors: ['#3A4C78', '#C79BAE', '#F3C9A8']},
      {type: 'ridge', kind: 'mountains', y: 0.62, amp: 0.32, color: '#8A88A8', seed: 111, snow: '#F6E1E0'},
      {type: 'clouds', count: 4, y: [0.5, 0.58], color: '#F1D9D6', opacity: 0.6, speed: 12},
      {type: 'ridge', kind: 'mountains', y: 0.8, amp: 0.2, color: '#4C5772', seed: 112, drift: 3},
      {type: 'ridge', kind: 'forest', y: 0.95, amp: 0.1, color: '#25304A', seed: 113, drift: 6},
    ],
  },
  wildflowers: {
    layers: [
      {type: 'sky', colors: ['#78ADE0', '#B7D8EE', '#E6F1EA']},
      {type: 'clouds', count: 4, y: [0.08, 0.28], color: '#FFFFFF', opacity: 0.8, speed: 10},
      {type: 'ridge', kind: 'hills', y: 0.5, amp: 0.06, color: '#7FAE6E', seed: 121, drift: 3},
      {type: 'grass', y: 0.5, color: '#5E9550', height: 0.05, count: 140, tip: '#86B86A'},
      {type: 'flowers', y: 0.52, colors: ['#F2A7C3', '#FFFFFF', '#F7D46A', '#B79BE0', '#F28C7A'], count: 130, size: 26},
    ],
  },
  'starry-hills': {
    zoom: 0.03,
    layers: [
      {type: 'sky', colors: ['#070B1E', '#141E45', '#263A6B']},
      {type: 'stars', count: 260, milky: true, bottom: 0.72},
      {type: 'ridge', kind: 'hills', y: 0.78, amp: 0.1, color: '#0D1428', seed: 131},
      {type: 'ridge', kind: 'forest', y: 0.92, amp: 0.1, color: '#060A16', seed: 132},
    ],
  },
  'rose-garden': {
    layers: [
      {type: 'sky', colors: ['#F7E7D0', '#D6E6C3', '#7EA36E']},
      {type: 'sun', x: 0.2, y: 0.12, r: 70, color: '#FFF4D6', glow: 6},
      {type: 'ridge', kind: 'forest', y: 0.42, amp: 0.12, color: '#8DB17C', seed: 141},
      {type: 'grass', y: 0.42, color: '#5F8D52', height: 0.04, count: 80},
      {type: 'flowers', y: 0.42, colors: ['#F4B6C6', '#FFFFFF', '#F7C9D4', '#E98AA6'], count: 120, size: 34, seed: 3},
      {type: 'sparkle', count: 20, color: '#FFFFFF', y: [0.4, 0.9]},
    ],
  },
  'lotus-pond': {
    layers: [
      {type: 'sky', colors: ['#F6DCCB', '#E7E1D2', '#B9D3C9']},
      {type: 'ridge', kind: 'forest', y: 0.34, amp: 0.08, color: '#7FA493', seed: 151},
      {type: 'water', y: 0.34, colors: ['#B8D6D0', '#3E6E69'], shimmer: '#FFFFFF', ripples: true},
      {type: 'lotus', y: 0.38, count: 18, pad: '#4E8A57', petal: '#F3A8C0'},
    ],
  },
  'white-blossom': {
    layers: [
      {type: 'sky', colors: ['#5D97D6', '#9CC6EC', '#DCEBF7']},
      {type: 'clouds', count: 3, y: [0.55, 0.8], color: '#FFFFFF', opacity: 0.8, speed: 10},
      {type: 'branch', side: 'left', y: 0.32, wood: '#5A4636', blossom: '#FFFFFF'},
      {type: 'branch', side: 'right', y: 0.62, wood: '#4F3D30', blossom: '#FCEFF3'},
      {type: 'petals', count: 26, color: '#FFFFFF'},
    ],
  },
  'bluehour-lake': {
    layers: [
      {type: 'sky', colors: ['#1E2C55', '#4A5F92', '#9AAFD3']},
      {type: 'stars', count: 40, bottom: 0.25},
      {type: 'ridge', kind: 'mountains', y: 0.5, amp: 0.18, color: '#2E3B5E', seed: 161},
      {type: 'water', y: 0.5, colors: ['#8EA3C8', '#1C2747'], shimmer: '#D9E3F7', mirror: '#2E3B5E'},
    ],
  },
  'misty-lake': {
    layers: [
      {type: 'sky', colors: ['#C8D2CF', '#DCE2DA', '#EDEDE2']},
      {type: 'sun', x: 0.65, y: 0.3, r: 45, color: '#FFF6DF', glow: 8},
      {type: 'ridge', kind: 'forest', y: 0.48, amp: 0.14, color: '#7E918A', seed: 171},
      {type: 'ridge', kind: 'forest', y: 0.52, amp: 0.1, color: '#56695F', seed: 172},
      {type: 'water', y: 0.52, colors: ['#C9D3CD', '#5F7670'], shimmer: '#FFFFFF', sunX: 0.65},
      {type: 'mist', y: 0.52, color: '#F2F3EC', opacity: 0.75, count: 7},
    ],
  },
  'clouds-valley': {
    layers: [
      {type: 'sky', colors: ['#5B95CF', '#A6CBEA', '#E1EEF5']},
      {type: 'clouds', count: 7, y: [0.08, 0.4], color: '#FFFFFF', opacity: 0.9, speed: 26, size: 1.2},
      {type: 'ridge', kind: 'hills', y: 0.6, amp: 0.1, color: '#76A57A', seed: 181, drift: 4},
      {type: 'ridge', kind: 'hills', y: 0.75, amp: 0.1, color: '#4F8A5C', seed: 182, drift: 7},
      {type: 'ridge', kind: 'hills', y: 0.92, amp: 0.1, color: '#2F6440', seed: 183, drift: 10},
    ],
  },
  'lone-tree': {
    layers: [
      {type: 'sky', colors: ['#7EB3E3', '#BFDDF0', '#EAF3E6']},
      {type: 'clouds', count: 4, y: [0.08, 0.25], color: '#FFFFFF', opacity: 0.85, speed: 10},
      {type: 'ridge', kind: 'hills', y: 0.68, amp: 0.05, color: '#8CBB74', seed: 191},
      {type: 'tree', x: 0.5, y: 0.7, scale: 1.05, leaf: '#3F7A3E', trunk: '#5A4433', seed: 1},
      {type: 'grass', y: 0.7, color: '#6FA55A', height: 0.05, count: 160, tip: '#93C474'},
    ],
  },
  canopy: {
    zoom: 0.05,
    originY: 0.5,
    layers: [
      {type: 'sky', colors: ['#9ED0F2', '#D6EEF9', '#9ED0F2']},
      {type: 'sun', x: 0.55, y: 0.45, r: 50, color: '#FFFBE6', glow: 7},
      {type: 'canopy', color: '#2F6A35', light: '#E9F7B8'},
    ],
  },
  'orange-tree': {
    layers: [
      {type: 'sky', colors: ['#9CC8E8', '#E7E3C3', '#F2D49B']},
      {type: 'sun', x: 0.8, y: 0.2, r: 60, color: '#FFF0C8', glow: 6},
      {type: 'branch', side: 'left', y: 0.3, wood: '#4E3B2C', leaf: '#3E7A3A', fruit: '#F39A2F'},
      {type: 'branch', side: 'right', y: 0.6, wood: '#4A372A', leaf: '#4A8A44', fruit: '#F4A63C'},
    ],
  },
  'rain-paddy': {
    layers: [
      {type: 'sky', colors: ['#97A6A6', '#B9C6BD', '#CDD8C6']},
      {type: 'ridge', kind: 'hills', y: 0.42, amp: 0.06, color: '#8BA294', seed: 201},
      {type: 'mist', y: 0.42, color: '#DDE4DC', opacity: 0.7},
      {type: 'field', y: 0.44, colors: ['#9BC77A', '#4E8A3C'], rows: 26, stalk: '#6FAA4E'},
      {type: 'rain', count: 130, opacity: 0.5},
    ],
  },
  'golden-rice': {
    layers: [
      {type: 'sky', colors: ['#E6A36E', '#F2C987', '#F7DFA6']},
      {type: 'sun', x: 0.3, y: 0.4, r: 70, color: '#FFE6A8', glow: 7},
      {type: 'ridge', kind: 'forest', y: 0.45, amp: 0.05, color: '#8E6E45', seed: 211},
      {type: 'field', y: 0.46, colors: ['#D9B25F', '#9C7A33'], rows: 24, stalk: '#B8923F', grain: '#E7C46C'},
    ],
  },
  'mango-tree': {
    layers: [
      {type: 'sky', colors: ['#9ACBE6', '#D9EBD8', '#E9E6C2']},
      {type: 'sparkle', count: 24, color: '#FFF6C0', y: [0.1, 0.9]},
      {type: 'branch', side: 'right', y: 0.28, wood: '#4A3828', leaf: '#2F6E33', fruit: '#E9C33C', fruitShape: 'mango'},
      {type: 'branch', side: 'left', y: 0.6, wood: '#4E3B2B', leaf: '#3A7C3B', fruit: '#D9B83A', fruitShape: 'mango'},
    ],
  },
  'turquoise-falls': {
    layers: [
      {type: 'sky', colors: ['#D5EFE6', '#9FD3C2', '#4E9183']},
      {type: 'ridge', kind: 'forest', y: 0.22, amp: 0.1, color: '#6BA88A', seed: 221},
      {type: 'ridge', kind: 'mountains', y: 0.7, amp: 0.55, color: '#4C7A6A', seed: 222},
      {type: 'waterfall', x: 0.5, w: 0.28, top: 0.18, bottom: 0.66, color: '#D9F4F2'},
      {type: 'water', y: 0.66, colors: ['#6FD0C9', '#1F6B6B'], shimmer: '#FFFFFF', ripples: true},
      {type: 'grass', y: 0.97, color: '#215A41', height: 0.08, count: 70, tip: '#3E8A5C'},
    ],
  },
  'river-valley': {
    layers: [
      {type: 'sky', colors: ['#8FC1E6', '#CDE4EE', '#EEF4E6']},
      {type: 'ridge', kind: 'mountains', y: 0.36, amp: 0.12, color: '#8FAE9E', seed: 231},
      {type: 'ridge', kind: 'hills', y: 0.42, amp: 0.06, color: '#6E9E73', seed: 232},
      {type: 'grass', y: 0.42, color: '#5B9259', height: 0.02, count: 60},
      {type: 'river', color: '#9FD6E0', shimmer: '#FFFFFF', from: 0.4, width: 0.9, seed: 1},
    ],
  },
  'spring-ferns': {
    zoom: 0.07,
    layers: [
      {type: 'sky', colors: ['#B9D8A8', '#7FAE73', '#3E6B45']},
      {type: 'rays', x: 0.3, y: -0.05, color: '#F7F8D0', opacity: 0.4},
      {type: 'stones', y: 0.4, colors: ['#6E7A62', '#8A9478', '#55604C'], count: 30},
      {type: 'river', color: '#A8DDD8', shimmer: '#FFFFFF', from: 0.42, width: 0.6, seed: 3},
      {type: 'grass', y: 0.9, color: '#2F5A33', height: 0.16, count: 90, tip: '#5E9A55', seed: 4},
      {type: 'sparkle', count: 30, color: '#FFFFFF', y: [0.4, 0.95]},
    ],
  },
  'starry-lake': {
    zoom: 0.03,
    layers: [
      {type: 'sky', colors: ['#060A1C', '#121B40', '#223463']},
      {type: 'stars', count: 220, milky: true, bottom: 0.5},
      {type: 'ridge', kind: 'mountains', y: 0.52, amp: 0.12, color: '#0B1229', seed: 241},
      {type: 'water', y: 0.52, colors: ['#1C2B57', '#050816'], shimmer: '#C8D4FF', mirror: '#2A3B70'},
    ],
  },
  'moon-clouds': {
    layers: [
      {type: 'sky', colors: ['#0D1430', '#1F2C5A', '#34477D']},
      {type: 'stars', count: 90, bottom: 0.8},
      {type: 'moon', x: 0.55, y: 0.35, r: 80},
      {type: 'clouds', count: 7, y: [0.25, 0.55], color: '#5A6A98', opacity: 0.75, speed: 18},
      {type: 'ridge', kind: 'hills', y: 0.9, amp: 0.08, color: '#0A1024', seed: 251},
    ],
  },
  'fajr-horizon': {
    layers: [
      {type: 'sky', colors: ['#0E1636', '#2C3A6E', '#7C6D97', '#E79D7D'], to: ['#1D2B5A', '#4B5E96', '#C38FA0', '#F6BE8C']},
      {type: 'stars', count: 70, bottom: 0.4},
      {type: 'ridge', kind: 'hills', y: 0.66, amp: 0.06, color: '#2B2F4E', seed: 261},
      {type: 'ridge', kind: 'hills', y: 0.8, amp: 0.08, color: '#1A1D34', seed: 262},
      {type: 'ridge', kind: 'forest', y: 0.95, amp: 0.08, color: '#0D0F1E', seed: 263},
    ],
  },
  'sunset-beach': {
    layers: [
      {type: 'sky', colors: ['#5B5C8E', '#E6907A', '#F8C68A']},
      {type: 'clouds', count: 4, y: [0.12, 0.3], color: '#F2A88D', opacity: 0.6, speed: 9},
      {type: 'sun', x: 0.5, y: 0.47, r: 70, color: '#FFE0A6', glow: 7, rise: -0.03},
      {type: 'water', y: 0.5, colors: ['#E7A386', '#465C7E'], shimmer: '#FFE7C4', sunX: 0.5},
      {type: 'waves', y: 0.7, sea: '#7C8FA8', foam: '#FFF4E4', sand: '#D9B48E'},
    ],
  },
  'streams-join': {
    layers: [
      {type: 'sky', colors: ['#BFE0C5', '#86BC8F', '#3F7550']},
      {type: 'ridge', kind: 'forest', y: 0.3, amp: 0.12, color: '#5E9467', seed: 271},
      {type: 'grass', y: 0.3, color: '#4E8655', height: 0.03, count: 80},
      {type: 'river', color: '#9FD3D6', shimmer: '#FFFFFF', from: 0.3, width: 0.75, seed: 0.5, fork: true},
      {type: 'sparkle', count: 20, color: '#FFFFFF', y: [0.4, 1]},
    ],
  },
  'two-trees-sunset': {
    layers: [
      {type: 'sky', colors: ['#5C5E91', '#E09A7E', '#F6C487']},
      {type: 'sun', x: 0.5, y: 0.6, r: 75, color: '#FFDFA0', glow: 7, rise: -0.02},
      {type: 'ridge', kind: 'hills', y: 0.7, amp: 0.06, color: '#6B5A63', seed: 281},
      {type: 'tree', x: 0.32, y: 0.74, scale: 0.75, leaf: '#3B3A44', trunk: '#2E2B33', seed: 2},
      {type: 'tree', x: 0.7, y: 0.75, scale: 0.68, leaf: '#3B3A44', trunk: '#2E2B33', seed: 3},
      {type: 'grass', y: 0.74, color: '#2C2A33', height: 0.04, count: 140, tip: '#4A4452'},
    ],
  },
};
