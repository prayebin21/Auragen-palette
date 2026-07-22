'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { Lock, Unlock, Copy, Check, RefreshCw, SlidersHorizontal, Sparkles, Image as ImageIcon, Loader2, Sun, Moon, ArrowUpRight, Flame, Search, X } from 'lucide-react';
import { hexToRgb } from '@/lib/colorUtils';
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
  { name: 'Buttercup Yellow', category: 'Pastel', colors: ['#FFFDE7', '#FFF9C4', '#FFF59D', '#FFF176', '#FFEE58'] },

  // --- VIVID (25 Palettes) ---
  { name: 'Cyberpunk Neon', category: 'Vivid', colors: ['#0D0221', '#020887', '#38369A', '#8963B4', '#F72585'] },
  { name: 'Retro Vaporwave', category: 'Vivid', colors: ['#240046', '#3C096C', '#5A189A', '#7B2CBF', '#9D4EDD'] },
  { name: 'Electric Berry', category: 'Vivid', colors: ['#7209B7', '#560BAD', '#480CA8', '#3A0CA3', '#4CC9F0'] },
  { name: 'Solar Flare', category: 'Vivid', colors: ['#FF007F', '#FF5400', '#FF8500', '#FF9E00', '#FFB703'] },
  { name: 'Tropical Punch', category: 'Vivid', colors: ['#FF5964', '#FFE74C', '#FFFFFF', '#6BF178', '#35A7FF'] },
  { name: 'Ultra Violet', category: 'Vivid', colors: ['#3A86FF', '#8338EC', '#FF006E', '#FB5607', '#FFBE0B'] },
  { name: 'Acid Splash', category: 'Vivid', colors: ['#D8F3DC', '#B7E4C7', '#95D5B2', '#74C69D', '#52B788'] },
  { name: 'Neon Coral', category: 'Vivid', colors: ['#FF0054', '#FF5400', '#FFBD00', '#090909', '#7000FF'] },
  { name: 'Electric Lime', category: 'Vivid', colors: ['#CCFF00', '#00FF66', '#00FFFF', '#FF00FF', '#FF0066'] },
  { name: 'Hyper Pop', category: 'Vivid', colors: ['#F72585', '#7209B7', '#3F37C9', '#4361EE', '#4CC9F0'] },
  { name: 'ColorHunt - Sunset Lavender', category: 'Vivid', colors: ['#22092C', '#872341', '#E9B824', '#F2ECBE', '#FFF5E0'] },
  { name: 'ColorHunt - Neon Cyberpunk', category: 'Vivid', colors: ['#0D0628', '#38040E', '#6A040F', '#9D0208', '#F72585'] },
  { name: 'Vivid Magenta', category: 'Vivid', colors: ['#2B001E', '#660047', '#B3007B', '#FF00AF', '#FF66CF'] },
  { name: 'Electric Cyan Burst', category: 'Vivid', colors: ['#002129', '#00586D', '#009EB8', '#00E5FF', '#66F2FF'] },
  { name: 'Sizzling Fire', category: 'Vivid', colors: ['#3D0000', '#850000', '#D60000', '#FF4D00', '#FF9900'] },
  { name: 'Vivid Indigo', category: 'Vivid', colors: ['#12002B', '#330066', '#5C0099', '#8A00CC', '#B833FF'] },
  { name: 'Radioactive Neon', category: 'Vivid', colors: ['#0B1A00', '#275200', '#4A9400', '#76E000', '#ACFF33'] },
  { name: 'Electric Tangerine', category: 'Vivid', colors: ['#380E00', '#782300', '#C44100', '#FF6600', '#FF994D'] },
  { name: 'Vivid Violet Glow', category: 'Vivid', colors: ['#1A0033', '#47007A', '#7A00C9', '#B01EFF', '#D575FF'] },
  { name: 'Neon Peacock', category: 'Vivid', colors: ['#001B2E', '#004B6E', '#008BAC', '#00D4E0', '#5CE6EC'] },
  { name: 'Vivid Sunburst', category: 'Vivid', colors: ['#4A0000', '#990000', '#E62E00', '#FF6A00', '#FFAA00'] },
  { name: 'Cosmic Laser', category: 'Vivid', colors: ['#1B003A', '#4A008A', '#8500E6', '#BD33FF', '#E080FF'] },
  { name: 'Vivid Emerald Fire', category: 'Vivid', colors: ['#002B19', '#00663B', '#00B368', '#00FF95', '#66FFAF'] },
  { name: 'Fluorescent Yellow', category: 'Vivid', colors: ['#2E2900', '#665C00', '#B8A600', '#FFE600', '#FFF266'] },
  { name: 'Vivid Ultra Magenta', category: 'Vivid', colors: ['#380025', '#7A0052', '#C20083', '#FF1AC6', '#FF70DB'] },

  // --- DARK (25 Palettes) ---
  { name: 'Midnight Violet', category: 'Dark', colors: ['#0F172A', '#1E1B4B', '#312E81', '#4C1D95', '#7C3AED'] },
  { name: 'Obsidian Gold', category: 'Dark', colors: ['#0A0A0A', '#1F1F1F', '#D4AF37', '#E5E5E5', '#FFFFFF'] },
  { name: 'Cyber Matrix', category: 'Dark', colors: ['#0D1117', '#161B22', '#21262D', '#30363D', '#2EA043'] },
  { name: 'Charcoal Minimal', category: 'Dark', colors: ['#121212', '#282828', '#3F3F3F', '#575757', '#FFFFFF'] },
  { name: 'Gothic Plum', category: 'Dark', colors: ['#1A0B2E', '#2B1055', '#4C1C70', '#752A97', '#A03CB6'] },
  { name: 'Deep Space', category: 'Dark', colors: ['#0B0C10', '#1F2833', '#C5C6C7', '#66FCF1', '#45A29E'] },
  { name: 'Vampire Blood', category: 'Dark', colors: ['#03071E', '#370617', '#6A040F', '#9D0208', '#D00000'] },
  { name: 'Dark Mode UI', category: 'Dark', colors: ['#18181B', '#27272A', '#3F3F46', '#52525B', '#A1A1AA'] },
  { name: 'Black Velvet', category: 'Dark', colors: ['#101010', '#1A1A1A', '#242424', '#2E2E2E', '#F5F5F5'] },
  { name: 'Midnight Emerald', category: 'Dark', colors: ['#021814', '#052E25', '#0B4F41', '#147561', '#20A387'] },
  { name: 'ColorHunt - Midnight Noir', category: 'Dark', colors: ['#050505', '#1B1B1B', '#2C2C2C', '#444444', '#FFD700'] },
  { name: 'Dark Slate Carbon', category: 'Dark', colors: ['#0F172A', '#1E293B', '#334155', '#475569', '#94A3B8'] },
  { name: 'Shadow Obsidian', category: 'Dark', colors: ['#09090B', '#18181B', '#27272A', '#3F3F46', '#71717A'] },
  { name: 'Abyssal Blue', category: 'Dark', colors: ['#030712', '#0B1528', '#112240', '#1D3557', '#457B9D'] },
  { name: 'Dark Wine Red', category: 'Dark', colors: ['#140205', '#2E050C', '#520A16', '#7F1022', '#B51B33'] },
  { name: 'Dark Forest Night', category: 'Dark', colors: ['#03120E', '#0A2920', '#134739', '#1E6B56', '#2D967B'] },
  { name: 'Dark Purple Eclipse', category: 'Dark', colors: ['#0C0314', '#1E0830', '#351052', '#521A7C', '#782BAE'] },
  { name: 'Dark Mocha', category: 'Dark', colors: ['#140D07', '#2A1C11', '#473120', '#6B4C33', '#946D4D'] },
  { name: 'Dark Teal Shadow', category: 'Dark', colors: ['#021417', '#072E34', '#0F4D57', '#1A7382', '#2AA0B3'] },
  { name: 'Midnight Steel', category: 'Dark', colors: ['#0F1419', '#1C252E', '#2B3744', '#3E4F61', '#5B7088'] },
  { name: 'Dark Charcoal Gold', category: 'Dark', colors: ['#141414', '#242424', '#383838', '#C5A059', '#E6C687'] },
  { name: 'Dark Neon Cyan', category: 'Dark', colors: ['#051114', '#0A2328', '#103942', '#1B5B69', '#00F0FF'] },
  { name: 'Dark Violet Velvet', category: 'Dark', colors: ['#110419', '#250B33', '#401554', '#622280', '#8D36B5'] },
  { name: 'Dark Copper Ember', category: 'Dark', colors: ['#170A06', '#30160D', '#522718', '#7D3E28', '#B05C3F'] },
  { name: 'Dark Midnight Gold', category: 'Dark', colors: ['#08080A', '#131318', '#202029', '#D4AF37', '#F3E5AB'] },

  // --- EARTH (20 Palettes) ---
  { name: 'Sage & Olive', category: 'Earth', colors: ['#283618', '#606C38', '#FEFAE0', '#DDA15E', '#BC6C25'] },
  { name: 'Desert Dune', category: 'Earth', colors: ['#E07A5F', '#3D405B', '#81B29A', '#F2CC8F', '#F4F1DE'] },
  { name: 'Earthy Clay', category: 'Earth', colors: ['#4A3B32', '#6F5643', '#9E7B66', '#C8A996', '#E9DBCE'] },
  { name: 'Bamboo Forest', category: 'Earth', colors: ['#1B4332', '#2D6A4F', '#40916C', '#52B788', '#74C69D'] },
  { name: 'Volcanic Ash', category: 'Earth', colors: ['#2F3E46', '#354F52', '#52796F', '#84A98C', '#CAD2C5'] },
  { name: 'Warm Terracotta', category: 'Earth', colors: ['#6B2D5C', '#E05A47', '#E89B66', '#F5CDA7', '#4E6151'] },
  { name: 'Mocha Wood', category: 'Earth', colors: ['#3D2612', '#523A28', '#8C6849', '#BF9E7B', '#E6D3B8'] },
  { name: 'Moss & Pine', category: 'Earth', colors: ['#14281D', '#355834', '#6E9075', '#94B097', '#CBE3DB'] },
  { name: 'Savannah Sunset', category: 'Earth', colors: ['#5F0F40', '#9A031E', '#FB8B24', '#E36414', '#0F4C5C'] },
  { name: 'Wild Stone', category: 'Earth', colors: ['#495057', '#6C757D', '#ADB5BD', '#CED4DA', '#E9ECEF'] },
  { name: 'ColorHunt - Vintage Coffee', category: 'Earth', colors: ['#2C1D11', '#4A3525', '#7D5A44', '#B5947F', '#F4EAE1'] },
  { name: 'ColorHunt - Deep Forest', category: 'Earth', colors: ['#0A1C14', '#1B4332', '#2D6A4F', '#52B788', '#B7E4C7'] },
  { name: 'Earthy Sandstorm', category: 'Earth', colors: ['#38291A', '#5C442D', '#8A6847', '#B89269', '#E0C5A4'] },
  { name: 'Autumn Redwood', category: 'Earth', colors: ['#3B140B', '#612314', '#913922', '#C25638', '#E68163'] },
  { name: 'River Pebble', category: 'Earth', colors: ['#252C2D', '#3F494A', '#606D6E', '#8B9A9B', '#C2CFD0'] },
  { name: 'Earthy Pinecone', category: 'Earth', colors: ['#2B1E17', '#473328', '#6E5141', '#9C7863', '#C7A791'] },
  { name: 'Olive Grove', category: 'Earth', colors: ['#1A2412', '#314224', '#4D663B', '#72945B', '#A1C788'] },
  { name: 'Desert Cactus', category: 'Earth', colors: ['#2B382B', '#485C48', '#6F8C6F', '#9CC29C', '#CEE6CE'] },
  { name: 'Earthy Clay Stone', category: 'Earth', colors: ['#36251E', '#573D33', '#805B4D', '#AD806F', '#D9AF9E'] },
  { name: 'Dry Savannah', category: 'Earth', colors: ['#3D3520', '#635736', '#948354', '#C4B177', '#EAD9A4'] },

  // --- RETRO (15 Palettes) ---
  { name: '70s Disco', category: 'Retro', colors: ['#E76F51', '#F4A261', '#E9C46A', '#2A9D8F', '#264653'] },
  { name: '80s Synthwave', category: 'Retro', colors: ['#1A1C20', '#2E0249', '#570A57', '#A91079', '#F806CC'] },
  { name: '90s Arcade', category: 'Retro', colors: ['#000000', '#FF0055', '#00E5FF', '#FFE600', '#00FF66'] },
  { name: 'Vintage Diner', category: 'Retro', colors: ['#D62828', '#003049', '#F77F00', '#FCBF49', '#EAE2B7'] },
  { name: 'Classic Mustard', category: 'Retro', colors: ['#E63946', '#F1FAEE', '#A8DADC', '#457B9D', '#1D3557'] },
  { name: 'Retro Sunset', category: 'Retro', colors: ['#3D5A80', '#98C1D9', '#E0FBFC', '#EE6C4D', '#293241'] },
  { name: 'ColorHunt - Vintage Mustard', category: 'Retro', colors: ['#1D2D44', '#3E5C76', '#748CAB', '#F0E6D2', '#E0A96D'] },
  { name: 'Retro Pop 80s', category: 'Retro', colors: ['#3F0071', '#150050', '#000000', '#FB2576', '#330066'] },
  { name: 'Vintage Postcard', category: 'Retro', colors: ['#2C3531', '#116466', '#D9B08C', '#FFCB9A', '#D1E8E2'] },
  { name: 'Retro Orange Teal', category: 'Retro', colors: ['#1B4965', '#62B6CB', '#BEE9E8', '#606C38', '#DDA15E'] },
  { name: 'Retro Vinyl', category: 'Retro', colors: ['#1D1E2C', '#593C47', '#F26419', '#F6AE2D', '#33658A'] },
  { name: 'Retro Cassette Tape', category: 'Retro', colors: ['#2B2D42', '#8D99AE', '#EDF2F4', '#EF233C', '#D90429'] },
  { name: 'Retro Polaroid', category: 'Retro', colors: ['#222222', '#00A896', '#028090', '#F0F3F4', '#F26419'] },
  { name: 'Vintage Newspaper', category: 'Retro', colors: ['#1F1F1F', '#4A4A4A', '#858585', '#D6D6D6', '#F5F5F0'] },
  { name: 'Retro Bowling Alley', category: 'Retro', colors: ['#0B132B', '#1C2541', '#3A506B', '#FFC857', '#E9724C'] },

  // --- NEON (15 Palettes) ---
  { name: 'Matrix Green', category: 'Neon', colors: ['#000000', '#003B00', '#008F11', '#00FF41', '#FFFFFF'] },
  { name: 'Cyberpunk Red', category: 'Neon', colors: ['#0A0A0C', '#1A000A', '#800020', '#FF003C', '#00F0FF'] },
  { name: 'Neon Tokyo', category: 'Neon', colors: ['#120078', '#9D0191', '#FD3A69', '#FECD1A', '#00FFF0'] },
  { name: 'Laser Tag', category: 'Neon', colors: ['#0D00A4', '#F000FF', '#00FFFF', '#39FF14', '#FF007F'] },
  { name: 'Glowing Violet', category: 'Neon', colors: ['#0A0518', '#200B46', '#591282', '#A626D3', '#F64BFF'] },
  { name: 'Electrified Pink', category: 'Neon', colors: ['#050014', '#3A005C', '#8E008D', '#E4007C', '#FF55B0'] },
  { name: 'Neon Electric Blue', category: 'Neon', colors: ['#03001C', '#301E67', '#5B8FB9', '#B6E388', '#00FFF0'] },
  { name: 'Neon Nightclub', category: 'Neon', colors: ['#10002B', '#240046', '#3C096C', '#5A189A', '#7B2CBF'] },
  { name: 'Neon Cyber Blue', category: 'Neon', colors: ['#000511', '#001D4A', '#0069A5', '#00A8E8', '#00FFFF'] },
  { name: 'Neon Acid Green', category: 'Neon', colors: ['#051A00', '#104D00', '#1F9900', '#33FF00', '#99FF66'] },
  { name: 'Neon Hotline Miami', category: 'Neon', colors: ['#000000', '#FF007F', '#00F0FF', '#FFE600', '#7000FF'] },
  { name: 'Neon Ultra Pink', category: 'Neon', colors: ['#1B0012', '#4D0033', '#990066', '#E60099', '#FF33CC'] },
  { name: 'Neon Cyber City', category: 'Neon', colors: ['#080014', '#1E0045', '#41008A', '#7A00F5', '#00FFCC'] },
  { name: 'Neon Future Green', category: 'Neon', colors: ['#00140A', '#004522', '#008A44', '#00F578', '#66FFB2'] },
  { name: 'Neon Sunrise Grid', category: 'Neon', colors: ['#0A0017', '#330047', '#73006B', '#D10078', '#FF6600'] },
];

function randomHsl(mode: ColorMode): [number, number, number] {
  let h = Math.floor(Math.random() * 360);
  let s = Math.floor(Math.random() * 40) + 60;
  let l = Math.floor(Math.random() * 40) + 40;

  if (mode === 'warm') {
    h = (Math.random() > 0.3) ? Math.floor(Math.random() * 55) : Math.floor(Math.random() * 30) + 330;
    s = Math.floor(Math.random() * 30) + 70;
    l = Math.floor(Math.random() * 25) + 45;
  } else if (mode === 'cool') {
    h = Math.floor(Math.random() * 140) + 140;
    s = Math.floor(Math.random() * 30) + 60;
    l = Math.floor(Math.random() * 30) + 40;
  } else if (mode === 'vivid') {
    s = Math.floor(Math.random() * 15) + 85;
    l = Math.floor(Math.random() * 20) + 45;
  } else if (mode === 'pastel') {
    s = Math.floor(Math.random() * 30) + 35;
    l = Math.floor(Math.random() * 15) + 75;
  }

  return [h, s, l];
}

function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * c).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function getContrastColor(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.55 ? '#0f172a' : '#ffffff';
}

export default function PaletteGeneratorTab() {
  const { isDarkMode, setDarkMode } = useColor();
  const [mode, setMode] = useState<ColorMode>('harmony');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trendingCategory, setTrendingCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [colors, setColors] = useState<PaletteColor[]>(() => [
    { hex: '#3B82F6', locked: false },
    { hex: '#6366F1', locked: false },
    { hex: '#8B5CF6', locked: false },
    { hex: '#EC4899', locked: false },
    { hex: '#F43F5E', locked: false },
  ]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);

  const generatePalette = useCallback(() => {
    setColors(prev =>
      prev.map(c => {
        if (c.locked) return c;
        const [h, s, l] = randomHsl(mode);
        return { ...c, hex: hslToHex(h, s, l) };
      })
    );
  }, [mode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && e.target === document.body && !isModalOpen) {
        e.preventDefault();
        generatePalette();
      } else if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [generatePalette, isModalOpen]);

  const toggleLock = (index: number) => {
    setColors(prev =>
      prev.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
    );
  };

  const updateColor = (index: number, newHex: string) => {
    if (/^#[0-9A-F]{6}$/i.test(newHex)) {
      setColors(prev =>
        prev.map((c, i) => (i === index ? { ...c, hex: newHex.toUpperCase() } : c))
      );
    }
  };

  const loadTrendingPalette = (paletteColors: string[]) => {
    setColors(paletteColors.map((hex, idx) => ({
      hex,
      locked: colors[idx]?.locked || false
    })));
    setIsModalOpen(false);
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyHex = async (hex: string) => {
    await navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const copyAll = async () => {
    const allHex = colors.map(c => `${c.hex} (${hexToRgb(c.hex)})`).join(', ');
    await navigator.clipboard.writeText(allHex);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const exportPng = async () => {
    if (!gridRef.current) return;
    setIsExporting(true);
    const filename = getExportFileName('palgen');
    await downloadElementAsPng(gridRef.current, filename);
    setIsExporting(false);
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
      {/* Control Bar */}
      <div className={`border p-4 rounded-3xl shadow-sm flex flex-wrap items-center justify-between gap-4 transition-colors ${
        isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200/80 text-slate-900'
      }`}>
        {/* Mode Selector Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
            <SlidersHorizontal size={13} /> Mode:
          </span>
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                mode === m.id
                  ? isDarkMode ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-900 text-white shadow-sm'
                  : isDarkMode ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {/* Light / Dark Mode Toggle */}
          <div className={`flex gap-1 text-xs font-semibold p-1 rounded-xl border ${
            isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-100 border-slate-200'
          }`}>
            <button
              onClick={() => setDarkMode(false)}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${
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
              className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-all ${
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
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-sm px-4 py-2 rounded-xl transition-all shadow-md shadow-amber-500/20 active:scale-95"
          >
            <Flame size={16} />
            <span>Recommended Palettes ({TRENDING_PALETTES.length})</span>
          </button>

          <button
            onClick={copyAll}
            className={`flex items-center gap-1.5 font-bold text-sm px-4 py-2 rounded-xl transition-colors ${
              isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            {copiedAll ? <Check size={15} className="text-green-500" /> : <Copy size={15} />}
            {copiedAll ? 'Copied All!' : 'Copy HEX & RGB'}
          </button>
          <button
            onClick={exportPng}
            disabled={isExporting}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-4 py-2 rounded-xl transition-all shadow-md shadow-emerald-500/20 disabled:opacity-50 active:scale-95"
          >
            {isExporting ? <Loader2 size={15} className="animate-spin" /> : <ImageIcon size={15} />}
            {isExporting ? 'Exporting...' : 'Export PNG'}
          </button>
        </div>
      </div>

      {/* 5 Big Color Columns Grid */}
      <div ref={gridRef} className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 min-h-[500px] p-4 rounded-3xl relative transition-colors ${
        isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white'
      }`}>
        {colors.map((color, index) => {
          const contrast = getContrastColor(color.hex);
          const isCopied = copiedHex === color.hex;
          const rgbString = hexToRgb(color.hex);

          return (
            <div
              key={index}
              className="rounded-3xl p-6 flex flex-col justify-between relative group transition-all duration-300 shadow-sm border border-black/5 min-h-[420px]"
              style={{ backgroundColor: color.hex, color: contrast }}
            >
              {/* Top Controls (Hidden in exported image) */}
              <div className="flex items-center justify-between z-10 export-hide">
                <button
                  onClick={() => toggleLock(index)}
                  className="w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur-md transition-all hover:scale-105"
                  style={{
                    backgroundColor: color.locked ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.25)',
                    color: color.locked ? '#fff' : contrast,
                  }}
                  title={color.locked ? 'Click to Unlock' : 'Click to Lock'}
                >
                  {color.locked ? <Lock size={18} /> : <Unlock size={18} />}
                </button>

                <label className="w-10 h-10 rounded-2xl flex items-center justify-center backdrop-blur-md cursor-pointer transition-transform hover:scale-105" style={{ backgroundColor: 'rgba(255,255,255,0.25)' }}>
                  <input
                    type="color"
                    value={color.hex}
                    onChange={e => updateColor(index, e.target.value)}
                    className="opacity-0 w-0 h-0 absolute"
                  />
                  <Sparkles size={16} />
                </label>
              </div>

              {/* Center Lock Status Badge (Hidden in exported image) */}
              <div className="my-auto text-center py-6 export-hide">
                {color.locked && (
                  <span
                    className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm"
                    style={{ backgroundColor: 'rgba(0,0,0,0.4)', color: '#fff' }}
                  >
                    LOCKED
                  </span>
                )}
              </div>

              {/* Bottom Codes */}
              <div className="flex flex-col items-center gap-1.5 z-10 mt-auto">
                <span className="font-mono text-2xl font-black tracking-wider uppercase leading-none">
                  {color.hex}
                </span>
                <span className="font-mono text-xs font-bold opacity-80 leading-none">
                  {rgbString}
                </span>

                <button
                  onClick={() => copyHex(color.hex)}
                  className="export-hide mt-3 flex items-center gap-1.5 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all backdrop-blur-md hover:scale-105"
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    color: contrast,
                  }}
                >
                  {isCopied ? <Check size={13} /> : <Copy size={13} />}
                  <span>{isCopied ? 'Copied' : 'Copy HEX'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* BIG PROMINENT GENERATE ACTION BAR BELOW COLOR GRID */}
      <div className={`p-4 sm:p-5 rounded-3xl border shadow-sm flex flex-wrap items-center justify-between gap-4 transition-colors ${
        isDarkMode ? 'bg-slate-900/80 border-slate-800 text-white' : 'bg-white border-slate-200/80 text-slate-900'
      }`}>
        <div className="flex items-center gap-2">
          <Sparkles className="text-blue-500" size={18} />
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

      {/* RECOMMENDED PALETTES MODAL DIALOG (FIXED HEIGHT CONTAINER) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-200">
          <div className={`w-full max-w-6xl h-[82vh] max-h-[720px] min-h-[520px] rounded-3xl border shadow-2xl flex flex-col overflow-hidden transition-colors ${
            isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            {/* Modal Header */}
            <div className={`p-6 border-b flex items-center justify-between flex-shrink-0 ${
              isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-100 bg-white'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Flame size={22} />
                </div>
                <div>
                  <h3 className="text-xl font-black tracking-tight flex items-center gap-2">
                    <span>Recommended Palettes</span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/20">
                      {filteredTrending.length} / {TRENDING_PALETTES.length} Palettes
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400">Curated trending color schemes inspired by Coolors &amp; Color Hunt. Click any palette to apply instantly.</p>
                </div>
              </div>

              <button
                onClick={() => setIsModalOpen(false)}
                className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Controls (Search & Category Filters) */}
            <div className={`px-6 py-3.5 border-b flex flex-wrap items-center justify-between gap-4 flex-shrink-0 ${
              isDarkMode ? 'border-slate-800 bg-slate-900/50' : 'border-slate-100 bg-slate-50/50'
            }`}>
              {/* Search Bar */}
              <div className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs font-medium w-full sm:w-72 ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
              }`}>
                <Search size={15} className="text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search 160+ palettes or HEX..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none outline-none text-xs w-full"
                />
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
                {categoriesList.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setTrendingCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      trendingCategory === cat
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isDarkMode ? 'bg-slate-800 text-slate-400 hover:text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal Fixed Scrollable Grid Area */}
            <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 align-content-start">
              {filteredTrending.length === 0 ? (
                <div className="col-span-full py-16 flex flex-col items-center justify-center text-center text-slate-400">
                  <Search size={32} className="mb-2 opacity-50" />
                  <p className="font-bold text-sm">No palettes found</p>
                  <p className="text-xs">Try searching for a different color name or HEX code.</p>
                </div>
              ) : (
                filteredTrending.map((p, idx) => (
                  <div
                    key={idx}
                    onClick={() => loadTrendingPalette(p.colors)}
                    className={`p-4 rounded-2xl border transition-all duration-200 hover:shadow-lg cursor-pointer group flex flex-col justify-between gap-3 h-[130px] ${
                      isDarkMode
                        ? 'bg-slate-800/80 border-slate-700/80 hover:border-blue-500'
                        : 'bg-white border-slate-200/80 hover:border-blue-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold truncate">{p.name}</span>
                      <span className="flex items-center gap-1 text-[11px] font-bold text-blue-500 group-hover:translate-x-0.5 transition-transform">
                        <span>Apply</span>
                        <ArrowUpRight size={13} />
                      </span>
                    </div>

                    {/* 5 Color Strip */}
                    <div className="flex h-14 rounded-xl overflow-hidden shadow-inner border border-black/5">
                      {p.colors.map((hex, ci) => (
                        <div
                          key={ci}
                          className="flex-1 h-full hover:flex-[1.4] transition-all relative group/hex"
                          style={{ backgroundColor: hex }}
                          title={hex}
                          onClick={(e) => {
                            e.stopPropagation();
                            copyHex(hex);
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/hex:opacity-100 bg-black/30 text-[9px] font-mono font-bold text-white transition-opacity">
                            {hex}
                          </div>
                        </div>
                      ))}
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
