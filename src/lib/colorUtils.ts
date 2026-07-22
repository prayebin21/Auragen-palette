export const SCALE_KEYS = [50,100,200,300,400,500,600,700,800,900,950] as const;
export type ScaleKey = typeof SCALE_KEYS[number];
export type ColorScale = Record<ScaleKey, string>;

function hexToHsl(hex: string): [number, number, number] {
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

function hslToHex(h: number, s: number, l: number): string {
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
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  const luminance = (0.299*r + 0.587*g + 0.114*b) / 255;
  return luminance > 0.55 ? '#0f172a' : '#ffffff';
}

export function randomHex(): string {
  return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6,'0').toUpperCase();
}
