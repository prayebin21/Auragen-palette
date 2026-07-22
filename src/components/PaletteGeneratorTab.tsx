'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Lock, Unlock, Copy, Check, RefreshCw, SlidersHorizontal, Sparkles, Image as ImageIcon, Loader2, Sun, Moon, ArrowUpRight, Flame, Search, X } from 'lucide-react';
import { hexToRgb, getContrastColor } from '@/lib/colorUtils';
import { downloadElementAsPng, getExportFileName } from '@/lib/exportUtils';
import { useColor } from '@/context/ColorContext';

interface PaletteColor {
  hex: string;
  locked: boolean;
}

type ColorMode = 'harmony' | 'warm' | 'vivid' | 'pastel' | 'cool';

interface TrendingPalette {
  name: string;
  category: 'Warm' | 'Cool' | 'Pastel' | 'Vivid' | 'Dark' | 'Earth' | 'Retro' | 'Neon';
  colors: string[];
}

const TRENDING_PALETTES: TrendingPalette[] = [
  // --- WARM (25 Palettes) ---
  { name: 'Espresso Roast', category: 'Warm', colors: ['#2B1B17', '#4A2C2A', '#8C4A32', '#C68B59', '#E7D4C0'] },
  { name: 'Sunset Glow', category: 'Warm', colors: ['#2B2D42', '#8D99AE', '#EDF2F4', '#EF233C', '#D90429'] },
  { name: 'Forest Autumn', category: 'Warm', colors: ['#1C3144', '#D00000', '#FFBA08', '#3F88C5', '#032B43'] },
  { name: 'Terracotta Clay', category: 'Warm', colors: ['#9A031E', '#FB8B24', '#E36414', '#0F4C5C', '#5C0440'] },
  { name: 'Amber Honey', category: 'Warm', colors: ['#780000', '#C1121F', '#FDF0D5', '#003049', '#669BBC'] },
  { name: 'Warm Cinnamon', category: 'Warm', colors: ['#582F0E', '#7F4F24', '#936639', '#A68A64', '#B6AD90'] },
  { name: 'Tuscan Sun', category: 'Warm', colors: ['#D62828', '#F77F00', '#FCBF49', '#EAE2B7', '#003049'] },
  { name: 'Spiced Pumpkin', category: 'Warm', colors: ['#461220', '#8C2F39', '#B23A48', '#FED0BB', '#E09F67'] },
  { name: 'Copper Rust', category: 'Warm', colors: ['#264653', '#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'] },
  { name: 'Burnt Sienna', category: 'Warm', colors: ['#3A1211', '#5C1D18', '#8A2B20', '#C95A49', '#F4A89A'] },
  { name: 'ColorHunt - Sunburst Orange', category: 'Warm', colors: ['#330000', '#780000', '#D83A00', '#FF7700', '#FFB703'] },
  { name: 'ColorHunt - Golden Hour', category: 'Warm', colors: ['#2D1E2F', '#593A5C', '#9A6088', '#E68A8A', '#FCD5CE'] },
  { name: 'ColorHunt - Coral Dusk', category: 'Warm', colors: ['#3D1308', '#73200D', '#C4491D', '#F27A45', '#FFCBB3'] },
  { name: 'Autumn Spice', category: 'Warm', colors: ['#541212', '#8B0000', '#C40000', '#FF7A00', '#FFD000'] },
  { name: 'Desert Sunset', category: 'Warm', colors: ['#26115B', '#4D1B7B', '#8C1F78', '#D6346A', '#FF7657'] },
  { name: 'Peach Apricot', category: 'Warm', colors: ['#5C2018', '#993D2C', '#D9654C', '#F2A07E', '#FCE3D7'] },
  { name: 'Honey Mustard', category: 'Warm', colors: ['#3B2404', '#6E450A', '#A87116', '#E6A825', '#FCE9A2'] },
  { name: 'Volcanic Lava', category: 'Warm', colors: ['#1A0000', '#500000', '#8D0801', '#BF0603', '#FF4D00'] },
  { name: 'Crimson Rose', category: 'Warm', colors: ['#4A0404', '#7A0C0C', '#B81D1D', '#E24A4A', '#F99F9F'] },
  { name: 'Mango Passion', category: 'Warm', colors: ['#6B0504', '#A31621', '#E04724', '#F48C06', '#FFBA08'] },
  { name: 'Marigold Spark', category: 'Warm', colors: ['#421A00', '#7A3300', '#B85200', '#F28500', '#FFC04D'] },
  { name: 'Rustic Brick', category: 'Warm', colors: ['#361614', '#592522', '#873B36', '#BD5D56', '#EBB0AA'] },
  { name: 'Golden Harvest', category: 'Warm', colors: ['#3D2C04', '#6E510B', '#A87E17', '#E6B227', '#FCE79E'] },
  { name: 'Warm Terracotta Glow', category: 'Warm', colors: ['#421815', '#6B2C27', '#A14A43', '#D6766F', '#F5C6C2'] },
  { name: 'Flame Ember', category: 'Warm', colors: ['#240505', '#570B0B', '#991A1A', '#DC3535', '#FF8E8E'] },

  // --- COOL (25 Palettes) ---
  { name: 'Oceanic Breeze', category: 'Cool', colors: ['#0B2545', '#134074', '#8DA9C4', '#EEF4F8', '#EE6C4D'] },
  { name: 'Emerald Luxe', category: 'Cool', colors: ['#064E3B', '#047857', '#10B981', '#6EE7B7', '#D1FAE5'] },
  { name: 'Nordic Clean', category: 'Cool', colors: ['#2B2D42', '#8D99AE', '#EDF2F4', '#2A9D8F', '#E76F51'] },
  { name: 'Deep Arctic', category: 'Cool', colors: ['#03045E', '#023E8A', '#0077B6', '#0096C7', '#00B4D8'] },
  { name: 'Teal Lagoon', category: 'Cool', colors: ['#006D77', '#83C5BE', '#EDF6F9', '#FFDDD2', '#E29578'] },
  { name: 'Glacier Peak', category: 'Cool', colors: ['#1D3557', '#457B9D', '#A8DADC', '#F1FAEE', '#E63946'] },
  { name: 'Sapphire Night', category: 'Cool', colors: ['#050C1A', '#0A192F', '#172A45', '#303C55', '#64FFDA'] },
  { name: 'Polar Aurora', category: 'Cool', colors: ['#051923', '#003554', '#006494', '#0582CA', '#00A6FB'] },
  { name: 'Pacific Blue', category: 'Cool', colors: ['#03045E', '#0077B6', '#00B4D8', '#90E0EF', '#CAF0F8'] },
  { name: 'Alpine Frost', category: 'Cool', colors: ['#2B3A42', '#3F5A69', '#5B7B88', '#9DB2BF', '#DDE6ED'] },
  { name: 'ColorHunt - Ocean Abyss', category: 'Cool', colors: ['#001219', '#005F73', '#0A9396', '#94D2BD', '#E9D8A6'] },
  { name: 'ColorHunt - Cyber Emerald', category: 'Cool', colors: ['#002B49', '#005C53', '#9FC131', '#DBF227', '#D6D58E'] },
  { name: 'ColorHunt - Cool Iceberg', category: 'Cool', colors: ['#03045E', '#0077B6', '#00B4D8', '#90E0EF', '#E0F7FA'] },
  { name: 'Mint Seaweed', category: 'Cool', colors: ['#0A2E23', '#155D46', '#259672', '#41CBB1', '#85E3D2'] },
  { name: 'Cobalt Depth', category: 'Cool', colors: ['#0A1128', '#1C2541', '#3A506B', '#5BC0BE', '#6FFFE9'] },
  { name: 'Steel Sky', category: 'Cool', colors: ['#1A2536', '#2C3E55', '#46607F', '#6C8EA4', '#A4C3D2'] },
  { name: 'Cyan Frost', category: 'Cool', colors: ['#052026', '#0D4855', '#1B7E93', '#32B5D1', '#80E2F4'] },
  { name: 'Midnight Cyan', category: 'Cool', colors: ['#021B2B', '#063959', '#0E6290', '#1C96CF', '#60CEF0'] },
  { name: 'Jade Forest', category: 'Cool', colors: ['#05241C', '#0E4939', '#1A7A60', '#2CB18C', '#6DE8C4'] },
  { name: 'Aqua Splash', category: 'Cool', colors: ['#042A2B', '#105B5C', '#209395', '#3AC6C9', '#86EFF1'] },
  { name: 'Deep Ocean Trench', category: 'Cool', colors: ['#010C1E', '#042247', '#0A427D', '#1669BD', '#4FA8FF'] },
  { name: 'Sky High Blue', category: 'Cool', colors: ['#0C2340', '#1D4570', '#3270A6', '#59A5D8', '#9BCEF0'] },
  { name: 'Frozen Tundra', category: 'Cool', colors: ['#1B2A38', '#324A5E', '#50718A', '#7A9EBA', '#B5D5EC'] },
  { name: 'Winter Pine', category: 'Cool', colors: ['#0A1D1A', '#163B35', '#286157', '#409284', '#7EC7BC'] },
  { name: 'Arctic Wave', category: 'Cool', colors: ['#02131D', '#083248', '#135C80', '#258EB8', '#6BC3E8'] },

  // --- PASTEL (25 Palettes) ---
  { name: 'Minimal Pastel', category: 'Pastel', colors: ['#FBF8CC', '#FDE4CF', '#FFCFD2', '#F1C0E8', '#CFBAF0'] },
  { name: 'Cotton Candy', category: 'Pastel', colors: ['#FFC8DD', '#FFAFCC', '#BDE0FE', '#A2D2FF', '#CDB4DB'] },
  { name: 'Latte Cream', category: 'Pastel', colors: ['#EDE0D4', '#E63946', '#F1FAEE', '#A8DADC', '#457B9D'] },
  { name: 'Peach Blossom', category: 'Pastel', colors: ['#F7D6C8', '#F5B099', '#F08080', '#F4A261', '#E76F51'] },
  { name: 'Soft Mint & Rose', category: 'Pastel', colors: ['#E8AEB7', '#B8E0D2', '#D6E2E9', '#F1E3D3', '#99C1B9'] },
  { name: 'Lilac Mist', category: 'Pastel', colors: ['#D8E2DC', '#FFE5D9', '#FFCAD4', '#F4ACB7', '#9D8189'] },
  { name: 'Lavender Dream', category: 'Pastel', colors: ['#E2ECE9', '#BEE1E6', '#F0E6EF', '#FCD5CE', '#F8EDEB'] },
  { name: 'Baby Blue & Butter', category: 'Pastel', colors: ['#FFF1E6', '#FDE2E4', '#FAD2E1', '#E2ECE9', '#BEE1E6'] },
  { name: 'Pastel Sherbet', category: 'Pastel', colors: ['#FF9AA2', '#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7'] },
  { name: 'Sweet Macaron', category: 'Pastel', colors: ['#F3C4FB', '#ECBCFD', '#E5B3FE', '#E2AFDE', '#BBC1F8'] },
  { name: 'ColorHunt - Cherry Blossom', category: 'Pastel', colors: ['#2B1055', '#59287B', '#8C52FF', '#FF66C4', '#FFDEE9'] },
  { name: 'ColorHunt - Soft Sorbet', category: 'Pastel', colors: ['#FFF5E4', '#FFE3E1', '#FFD1D1', '#FF9494', '#FFF5E4'] },
  { name: 'ColorHunt - Sweet Matcha', category: 'Pastel', colors: ['#E4F0E8', '#A8D5BA', '#6EA076', '#3E6B48', '#1C3829'] },
  { name: 'Bubblegum Pastel', category: 'Pastel', colors: ['#FFC2D1', '#FFE5EC', '#FB6F92', '#FFB3C6', '#FF8FAB'] },
  { name: 'Pastel Cloud', category: 'Pastel', colors: ['#D0F4DE', '#A9DEF9', '#E4C1F9', '#FCF6BD', '#FF99C8'] },
  { name: 'Vanilla Cream', category: 'Pastel', colors: ['#FDFBF7', '#F7F0E5', '#EADBC8', '#DAC0A3', '#0F2C59'] },
  { name: 'Strawberry Milkshake', category: 'Pastel', colors: ['#FFF5F5', '#FED7D7', '#FEB2B2', '#FC8181', '#E53E3E'] },
  { name: 'Muted Sage', category: 'Pastel', colors: ['#E2E8F0', '#CBD5E1', '#94A3B8', '#64748B', '#475569'] },
  { name: 'Soft Sunshine', category: 'Pastel', colors: ['#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58', '#FFEB3B'] },
  { name: 'Blush Pink', category: 'Pastel', colors: ['#FFF0F5', '#FFE4E1', '#FFC0CB', '#FFB6C1', '#FF69B4'] },
  { name: 'Pastel Pistachio', category: 'Pastel', colors: ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A'] },
  { name: 'Powder Blue', category: 'Pastel', colors: ['#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA'] },
  { name: 'Soft Mauve', category: 'Pastel', colors: ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#AB47BC'] },
  { name: 'Pastel Coral Sky', category: 'Pastel', colors: ['#FFEBEE', '#FFCDD2', '#EF9A9A', '#E57373', '#EF5350'] },
];

export default function PaletteGeneratorTab() {
  const { setBaseHex, isDarkMode, setDarkMode } = useColor();
  const [colors, setColors] = useState<PaletteColor[]>([
    { hex: '#3B82F6', locked: false },
    { hex: '#6366F1', locked: false },
    { hex: '#8B5CF6', locked: false },
    { hex: '#EC4899', locked: false },
    { hex: '#F43F5E', locked: false },
  ]);
  const [mode, setMode] = useState<ColorMode>('harmony');
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // Recommended Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trendingCategory, setTrendingCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const gridRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  // Close modal on Esc key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  const generateRandomHex = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
  };

  const generatePalette = useCallback(() => {
    setColors(prev => {
      const base = prev.find(c => c.locked)?.hex || generateRandomHex();
      const newColors = prev.map(c => {
        if (c.locked) return c;
        return { hex: generateRandomHex(), locked: false };
      });
      const firstUnlockedIndex = newColors.findIndex(c => !c.locked);
      if (firstUnlockedIndex !== -1) {
        setBaseHex(newColors[firstUnlockedIndex].hex);
      } else {
        setBaseHex(base);
      }
      return newColors;
    });
  }, [setBaseHex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body && !isModalOpen) {
        e.preventDefault();
        generatePalette();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generatePalette, isModalOpen]);

  const toggleLock = (index: number) => {
    setColors(prev => prev.map((c, i) => i === index ? { ...c, locked: !c.locked } : c));
  };

  const updateColor = (index: number, newHex: string) => {
    const clean = newHex.toUpperCase();
    setColors(prev => prev.map((c, i) => i === index ? { ...c, hex: clean } : c));
    if (index === 0) setBaseHex(clean);
  };

  const copyHex = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const copyAll = async () => {
    const text = colors.map(c => `${c.hex} (RGB: ${hexToRgb(c.hex)})`).join('\n');
    await navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const exportPng = async () => {
    if (!gridRef.current) return;
    setIsExporting(true);
    const filename = getExportFileName('palgen', 'palette');
    await downloadElementAsPng(gridRef.current, filename);
    setIsExporting(false);
  };

  const applyTrendingPalette = (p: TrendingPalette) => {
    setColors(p.colors.map(hex => ({ hex, locked: false })));
    setBaseHex(p.colors[0]);
    setIsModalOpen(false);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const modes: { id: ColorMode; label: string }[] = [
    { id: 'harmony', label: '✦ Harmony' },
    { id: 'warm', label: '🔥 Warm' },
    { id: 'vivid', label: '⚡ Vivid' },
    { id: 'pastel', label: '🌸 Pastel' },
    { id: 'cool', label: '❄️ Cool' },
  ];

  const categoriesList = ['All', 'Warm', 'Cool', 'Pastel', 'Vivid', 'Dark', 'Earth', 'Retro', 'Neon'];

  const filteredTrending = TRENDING_PALETTES.filter(p => {
    const matchesCategory = trendingCategory === 'All' || p.category === trendingCategory;
    const matchesSearch = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.colors.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div ref={topRef} className="flex flex-col gap-6">
      {/* Control Bar - Mobile Responsive Grid & Wrap */}
      <div className={`border p-4 sm:p-5 rounded-3xl shadow-sm flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4 transition-colors ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200/80 text-slate-900'
      }`}>
        {/* Mode Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 max-w-full flex-shrink-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1 flex-shrink-0">
            <SlidersHorizontal size={13} /> Mode:
          </span>
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 whitespace-nowrap ${
                mode === m.id
                  ? isDarkMode ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-900 text-white shadow-sm'
                  : isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Action Buttons - Fully Responsive Mobile Wrap & Grid */}
        <div className="flex flex-wrap items-center gap-2.5 w-full xl:w-auto">
          {/* Light / Dark Mode Toggle */}
          <div className={`flex gap-1 text-xs font-semibold p-1 rounded-xl border flex-shrink-0 ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setDarkMode(false)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                !isDarkMode
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sun size={12} />
              <span>Light</span>
            </button>
            <button
              onClick={() => setDarkMode(true)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
                isDarkMode
                  ? 'bg-slate-700 text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Moon size={12} />
              <span>Dark</span>
            </button>
          </div>

          {/* Recommended Palettes Button */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all shadow-md shadow-amber-500/20 active:scale-95 whitespace-nowrap"
          >
            <Flame size={15} className="flex-shrink-0" />
            <span>Recommended ({TRENDING_PALETTES.length})</span>
          </button>

          <button
            onClick={copyAll}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-1.5 font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-colors whitespace-nowrap ${
              isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {copiedAll ? <Check size={14} className="text-green-500 flex-shrink-0" /> : <Copy size={14} className="flex-shrink-0" />}
            <span>{copiedAll ? 'Copied All!' : 'Copy Codes'}</span>
          </button>

          <button
            onClick={exportPng}
            disabled={isExporting}
            className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-3.5 py-2 rounded-xl transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 active:scale-95 whitespace-nowrap"
          >
            {isExporting ? <Loader2 size={14} className="animate-spin flex-shrink-0" /> : <ImageIcon size={14} className="flex-shrink-0" />}
            <span>{isExporting ? 'Exporting...' : 'Export PNG'}</span>
          </button>
        </div>
      </div>

      {/* 5 Big Color Columns Grid (Stacked Vertically into Rounded Palette Card on Mobile) */}
      <div ref={gridRef} className={`rounded-3xl p-3 md:p-4 border shadow-sm transition-colors overflow-hidden ${
        isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-amber-900/10'
      }`}>
        <div className="flex flex-col md:grid md:grid-cols-5 gap-2 md:gap-4 h-[440px] md:h-auto md:min-h-[500px]">
          {colors.map((color, index) => {
            const contrast = getContrastColor(color.hex);
            const isCopied = copiedHex === color.hex;
            const rgbString = hexToRgb(color.hex);

            return (
              <div
                key={index}
                className="flex-1 rounded-2xl md:rounded-3xl p-3 md:p-6 flex flex-row md:flex-col items-center md:items-stretch justify-between relative group transition-all duration-300 shadow-sm border border-black/5 overflow-hidden"
                style={{ backgroundColor: color.hex, color: contrast }}
              >
                {/* Lock & Color Picker Controls */}
                <div className="flex items-center gap-2 md:justify-between z-10 export-hide">
                  <button
                    onClick={() => toggleLock(index)}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-md transition-all hover:scale-105"
                    style={{
                      backgroundColor: color.locked ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.25)',
                      color: color.locked ? '#fff' : contrast,
                    }}
                    title={color.locked ? 'Click to Unlock' : 'Click to Lock'}
                  >
                    {color.locked ? <Lock size={15} /> : <Unlock size={15} />}
                  </button>

                  <label className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center backdrop-blur-md cursor-pointer transition-transform hover:scale-105" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
                    <input
                      type="color"
                      value={color.hex}
                      onChange={e => updateColor(index, e.target.value)}
                      className="opacity-0 w-0 h-0 absolute"
                    />
                    <Sparkles size={14} />
                  </label>
                </div>

                {/* Center Codes on Mobile / Bottom Codes on Desktop */}
                <div className="flex flex-row md:flex-col items-center gap-2 md:gap-1.5 z-10 md:mt-auto">
                  <span className="font-mono text-sm md:text-2xl font-black tracking-wider uppercase leading-none">
                    {color.hex}
                  </span>
                  <span className="font-mono text-[10px] md:text-xs font-bold opacity-80 leading-none hidden sm:inline">
                    {rgbString}
                  </span>
                </div>

                {/* Copy HEX Button */}
                <div className="z-10 export-hide">
                  <button
                    onClick={() => copyHex(color.hex)}
                    className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1.5 md:px-3.5 md:py-1.5 rounded-xl transition-all backdrop-blur-md hover:scale-105"
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.3)',
                      color: contrast,
                    }}
                  >
                    {isCopied ? <Check size={12} /> : <Copy size={12} />}
                    <span className="hidden sm:inline">{isCopied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* BIG PROMINENT GENERATE ACTION BAR BELOW COLOR GRID */}
      <div className={`p-4 sm:p-5 rounded-3xl border shadow-sm flex flex-wrap items-center justify-between gap-4 transition-colors ${
        isDarkMode ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white border-slate-200/80 text-slate-900'
      }`}>
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-500 flex-shrink-0" size={18} />
          <span className={`text-xs font-bold ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Press <kbd className={`px-2.5 py-1 border rounded-lg font-mono text-xs font-bold shadow-sm ${
              isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'
            }`}>Spacebar</kbd> or click button to randomize palette
          </span>
        </div>

        <button
          onClick={generatePalette}
          className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-base px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-blue-500/25 active:scale-95 group"
        >
          <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
          <span>Generate New Palette</span>
        </button>
      </div>

      {/* 160+ RECOMMENDED PALETTES MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={`w-full max-w-5xl max-h-[85vh] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-all ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shadow-md">
                    <Flame size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-none">
                      Recommended Palettes
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                      Explore {TRENDING_PALETTES.length}+ handpicked color combinations
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-300 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Search Bar & Category Chips */}
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                <div className="relative flex-1">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search color name or HEX..."
                    className={`w-full pl-10 pr-4 py-2 rounded-xl text-sm font-semibold border outline-none transition-all ${
                      isDarkMode
                        ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500 focus:border-amber-500'
                        : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-amber-500'
                    }`}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Category Chips */}
                <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
                  {categoriesList.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setTrendingCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        trendingCategory === cat
                          ? 'bg-amber-500 text-white shadow-sm'
                          : isDarkMode
                          ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Body: Palette Grid */}
            <div className="p-4 sm:p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTrending.length === 0 ? (
                <div className="col-span-full py-12 text-center text-slate-400 text-sm font-bold">
                  No palettes found matching "{searchQuery}"
                </div>
              ) : (
                filteredTrending.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => applyTrendingPalette(p)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer group hover:-translate-y-1 hover:shadow-lg ${
                      isDarkMode
                        ? 'bg-slate-800/60 border-slate-700 hover:border-amber-500/50'
                        : 'bg-white border-slate-200/80 hover:border-amber-500/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs font-extrabold truncate pr-2">{p.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isDarkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {p.category}
                      </span>
                    </div>

                    <div className="flex h-12 rounded-xl overflow-hidden shadow-inner">
                      {p.colors.map((c, i) => (
                        <div
                          key={i}
                          className="flex-1 h-full transition-transform group-hover:scale-105"
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                      <span>5 Colors</span>
                      <span className="text-amber-500 font-bold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        Apply <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
