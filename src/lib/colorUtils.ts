export const SCALE_KEYS = [50,100,200,300,400,500,600,700,800,900,950] as const;
export type ScaleKey = typeof SCALE_KEYS[number];
export type ColorScale = Record<ScaleKey, string>;

export type ColorMode = 'harmony' | 'warm' | 'vivid' | 'pastel' | 'cool';

export function hexToHsl(hex: string): [number, number, number] {
  hex = hex.replace(/^#/, '');
  if (hex.length === 3) hex = hex.split('').map(x => x+x).join('');
  const r = parseInt(hex.slice(0,2),16)/255;
  const g = parseInt(hex.slice(2,4),16)/255;
  const b = parseInt(hex.slice(4,6),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h=0, s=0;
  const l = (max+min)/2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d/(2-max-min) : d/(max+min);
    switch (max) {
      case r: h = (g-b)/d + (g<b ? 6 : 0); break;
      case g: h = (b-r)/d + 2; break;
      case b: h = (r-g)/d + 4; break;
    }
    h /= 6;
  }
  return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
}

export function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1-l) / 100;
  const f = (n: number) => {
    const k = (n + h/30) % 12;
    const c = l - a * Math.max(Math.min(k-3, 9-k, 1), -1);
    return Math.round(255*c).toString(16).padStart(2,'0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

export function hexToRgb(hex: string): string {
  const clean = hex.replace(/^#/, '');
  if (clean.length !== 6) return 'RGB(0, 0, 0)';
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `RGB(${r}, ${g}, ${b})`;
}

export function generateScale(baseHex: string): ColorScale {
  const [h, s, baseL] = hexToHsl(baseHex);
  const scale = {} as ColorScale;
  SCALE_KEYS.forEach(key => {
    let l: number, newS = s;
    if (key === 500) { l = baseL; }
    else if (key < 500) {
      const w = (500 - key) / 450;
      l = baseL + (97 - baseL) * w;
      newS = s - s * 0.3 * w;
    } else {
      const w = (key - 500) / 450;
      l = baseL - (baseL - 6) * Math.pow(w, 0.8);
      newS = s - s * 0.1 * w;
    }
    scale[key] = hslToHex(h, Math.max(0, Math.min(100, newS)), Math.max(0, Math.min(100, l)));
  });
  return scale;
}

export function getContrastColor(hex: string): string {
  const ratioWhite = getContrastRatio(hex, '#FFFFFF');
  const ratioBlack = getContrastRatio(hex, '#0F172A');
  return ratioWhite >= ratioBlack ? '#FFFFFF' : '#0F172A';
}

export function randomHex(): string {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0').toUpperCase();
}

/**
 * WCAG 2.1 Relative Luminance Calculation
 */
export function getRelativeLuminance(hex: string): number {
  const clean = hex.replace(/^#/, '');
  if (clean.length !== 6) return 0;
  const r = parseInt(clean.slice(0, 2), 16) / 255;
  const g = parseInt(clean.slice(2, 4), 16) / 255;
  const b = parseInt(clean.slice(4, 6), 16) / 255;

  const cal = (c: number) => c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * cal(r) + 0.7152 * cal(g) + 0.0722 * cal(b);
}

/**
 * WCAG 2.1 Contrast Ratio Calculation (1.0 : 1 to 21.0 : 1)
 */
export function getContrastRatio(hex1: string, hex2: string): number {
  const lum1 = getRelativeLuminance(hex1);
  const lum2 = getRelativeLuminance(hex2);
  const max = Math.max(lum1, lum2);
  const min = Math.min(lum1, lum2);
  const ratio = (max + 0.05) / (min + 0.05);
  return Math.round(ratio * 100) / 100;
}

/**
 * Generate mode-specific color math (Harmony, Warm, Vivid, Pastel, Cool)
 */
export function generateModeHex(mode: ColorMode, index: number, baseH?: number): string {
  let h = 0, s = 0, l = 0;
  const base = baseH ?? Math.floor(Math.random() * 360);

  switch (mode) {
    case 'warm':
      h = Math.random() > 0.2 ? Math.floor(Math.random() * 50) : 345 + Math.floor(Math.random() * 15);
      s = 75 + Math.floor(Math.random() * 20);
      l = 45 + Math.floor(Math.random() * 25);
      break;

    case 'cool':
      h = 160 + Math.floor(Math.random() * 100);
      s = 70 + Math.floor(Math.random() * 25);
      l = 40 + Math.floor(Math.random() * 30);
      break;

    case 'pastel':
      h = Math.floor(Math.random() * 360);
      s = 45 + Math.floor(Math.random() * 25);
      l = 80 + Math.floor(Math.random() * 12);
      break;

    case 'vivid':
      h = Math.floor(Math.random() * 360);
      s = 85 + Math.floor(Math.random() * 15);
      l = 50 + Math.floor(Math.random() * 15);
      break;

    case 'harmony':
    default:
      const offsets = [0, 30, 60, 180, 210];
      h = (base + offsets[index % 5] + Math.floor(Math.random() * 10 - 5) + 360) % 360;
      s = 65 + Math.floor(Math.random() * 25);
      l = 45 + Math.floor(Math.random() * 25);
      break;
  }

  return hslToHex(h, s, l);
}
