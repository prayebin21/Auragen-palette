const generateBtn = document.getElementById('generate-btn');
const colorCols   = document.querySelectorAll('.color-col');
const toast       = document.getElementById('toast');
const themeToggle = document.getElementById('theme-toggle');
const modeButtons = document.querySelectorAll('.mode-btn');

let currentMode = 'harmony';

/* ─── Color Engine ─── */
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const c = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * c).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function rand(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

/* ─── Palette Generators by Mode ─── */
const generators = {

    harmony() {
        const baseHue = rand(0, 359);
        const sat = rand(45, 90);
        const types = ['analogous', 'monochromatic', 'triadic', 'complementary', 'split'];
        const type = types[rand(0, types.length - 1)];
        return Array.from({ length: 5 }, (_, i) => {
            let h = baseHue;
            const l = 22 + i * 13;
            if      (type === 'analogous')     h = (baseHue + i * 25) % 360;
            else if (type === 'triadic')       h = (baseHue + i * 120) % 360;
            else if (type === 'complementary') h = i % 2 === 0 ? baseHue : (baseHue + 180) % 360;
            else if (type === 'split')         h = (baseHue + [0, 150, 210, 30, 330][i]) % 360;
            return hslToHex(h, sat, l);
        });
    },

    warm() {
        // Hue 0–60 = reds, oranges, yellows + warm browns
        const baseHue = rand(0, 55);
        return Array.from({ length: 5 }, (_, i) => {
            const h = (baseHue + i * rand(5, 14)) % 60;
            const s = rand(65, 95);
            const l = 25 + i * 12;
            return hslToHex(h, s, l);
        });
    },

    vivid() {
        // Full hue range, ultra-high saturation, mid lightness
        const baseHue = rand(0, 359);
        const types = ['analogous', 'triadic', 'split'];
        const type  = types[rand(0, 2)];
        return Array.from({ length: 5 }, (_, i) => {
            let h = baseHue;
            const s = rand(85, 100);
            const l = rand(40, 62);
            if      (type === 'analogous') h = (baseHue + i * 20) % 360;
            else if (type === 'triadic')   h = (baseHue + i * 120) % 360;
            else if (type === 'split')     h = (baseHue + [0, 150, 210, 30, 330][i]) % 360;
            return hslToHex(h, s, l);
        });
    },

    pastel() {
        // High lightness, low-mid saturation = soft, airy pastels
        const baseHue = rand(0, 359);
        return Array.from({ length: 5 }, (_, i) => {
            const h = (baseHue + i * rand(20, 45)) % 360;
            const s = rand(30, 60);
            const l = rand(72, 88);
            return hslToHex(h, s, l);
        });
    },

    cool() {
        // Hue 180–280 = cyans, blues, purples
        const baseHue = rand(180, 275);
        return Array.from({ length: 5 }, (_, i) => {
            const h = (baseHue + i * rand(8, 18)) % 360;
            const s = rand(50, 85);
            const l = 22 + i * 13;
            return hslToHex(h, s, l);
        });
    }
};

/* ─── Generate ─── */
function generatePalette() {
    const newColors = generators[currentMode]();
    colorCols.forEach((col, i) => {
        if (col.dataset.locked === 'true') return;
        setTimeout(() => applyColor(col, newColors[i]), i * 45);
    });
}

function applyColor(col, hex) {
    col.querySelector('.color-fill').style.backgroundColor = hex;
    col.querySelector('.hex-value').textContent = hex;
    const input = col.querySelector('.color-input');
    if (input) input.value = hex;
}

/* ─── Mode Buttons ─── */
modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.dataset.mode;
        generatePalette();
    });
});

/* ─── Setup columns ─── */
colorCols.forEach(col => {
    const lockBtn  = col.querySelector('.lock-btn');
    const copyBtn  = col.querySelector('.copy-btn');
    const hexLabel = col.querySelector('.hex-value');
    const input    = col.querySelector('.color-input');

    // Lock toggle
    lockBtn.addEventListener('click', e => {
        e.stopPropagation();
        const locked = col.dataset.locked === 'true';
        col.dataset.locked = !locked;
        const useEl = lockBtn.querySelector('use');
        useEl.setAttribute('href', locked ? '#icon-lock-open' : '#icon-lock');
    });

    // Copy
    copyBtn.addEventListener('click', e => {
        e.stopPropagation();
        navigator.clipboard.writeText(hexLabel.textContent).then(() => {
            showToast(`Copied ${hexLabel.textContent}`);
        });
    });

    // Manual picker — auto-lock
    input.addEventListener('input', e => {
        const hex = e.target.value.toUpperCase();
        col.querySelector('.color-fill').style.backgroundColor = hex;
        hexLabel.textContent = hex;
        col.dataset.locked = 'true';
        lockBtn.querySelector('use').setAttribute('href', '#icon-lock');
    });
});

/* ─── Toast ─── */
function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

/* ─── Theme toggle ─── */
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const useEl = themeToggle.querySelector('use');
    useEl.setAttribute('href',
        document.body.classList.contains('light-mode') ? '#icon-sun' : '#icon-moon'
    );
});

/* ─── Keyboard ─── */
document.addEventListener('keydown', e => {
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        generatePalette();
    }
});

generateBtn.addEventListener('click', generatePalette);
window.onload = generatePalette;
