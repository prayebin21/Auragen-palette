'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { generateScale, randomHex, ColorScale, SCALE_KEYS } from '@/lib/colorUtils';

interface ColorContextType {
  baseHex: string;
  scale: ColorScale;
  setBaseHex: (hex: string) => void;
  randomize: () => void;
}

const ColorContext = createContext<ColorContextType | null>(null);

export function ColorProvider({ children }: { children: ReactNode }) {
  const [baseHex, setBaseHexState] = useState('#3B82F6');
  const [scale, setScale] = useState<ColorScale>(() => generateScale('#3B82F6'));

  const setBaseHex = useCallback((hex: string) => {
    const clean = hex.toUpperCase();
    if (/^#[0-9A-F]{6}$/i.test(clean)) {
      setBaseHexState(clean);
      setScale(generateScale(clean));
    }
  }, []);

  const randomize = useCallback(() => {
    const hex = randomHex();
    setBaseHexState(hex);
    setScale(generateScale(hex));
  }, []);

  return (
    <ColorContext.Provider value={{ baseHex, scale, setBaseHex, randomize }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const ctx = useContext(ColorContext);
  if (!ctx) throw new Error('useColor must be used within ColorProvider');
  return ctx;
}
