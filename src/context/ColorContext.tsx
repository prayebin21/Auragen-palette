'use client';
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { generateScale, randomHex, ColorScale } from '@/lib/colorUtils';

interface ColorContextType {
  baseHex: string;
  scale: ColorScale;
  isDarkMode: boolean;
  setBaseHex: (hex: string) => void;
  randomize: () => void;
  toggleDarkMode: () => void;
  setDarkMode: (val: boolean) => void;
}

const ColorContext = createContext<ColorContextType | null>(null);

export function ColorProvider({ children }: { children: ReactNode }) {
  const [baseHex, setBaseHexState] = useState('#3B82F6');
  const [scale, setScale] = useState<ColorScale>(() => generateScale('#3B82F6'));
  const [isDarkMode, setIsDarkMode] = useState(false);

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

  const toggleDarkMode = useCallback(() => {
    setIsDarkMode(prev => !prev);
  }, []);

  const setDarkMode = useCallback((val: boolean) => {
    setIsDarkMode(val);
  }, []);

  return (
    <ColorContext.Provider value={{ baseHex, scale, isDarkMode, setBaseHex, randomize, toggleDarkMode, setDarkMode }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const ctx = useContext(ColorContext);
  if (!ctx) throw new Error('useColor must be used within ColorProvider');
  return ctx;
}
