import { toPng } from 'html-to-image';

export function getExportFileName(prefix: 'palgen' | 'twgen', suffix?: string): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const dateStr = `${year}-${month}-${day}`;

  if (suffix) {
    return `auragen-${prefix}-${suffix}-${dateStr}`;
  }
  return `auragen-${prefix}-${dateStr}`;
}

export async function downloadElementAsPng(
  element: HTMLElement,
  fileName: string,
  addWatermark = true
) {
  try {
    const rawDataUrl = await toPng(element, {
      cacheBust: false,
      skipFonts: true,
      pixelRatio: 2,
      backgroundColor: '#f0f2f5',
      filter: (node: HTMLElement) => {
        if (node.classList && node.classList.contains('export-hide')) {
          return false;
        }
        return true;
      },
    });

    if (!addWatermark) {
      triggerDownload(rawDataUrl, fileName);
      return true;
    }

    // Draw watermark onto offscreen canvas (never touches live webpage!)
    const image = new Image();
    await new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = rawDataUrl;
    });

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      triggerDownload(rawDataUrl, fileName);
      return true;
    }

    // Draw captured image
    ctx.drawImage(image, 0, 0);

    // Draw watermark badge in top-right corner
    const paddingRight = 32;
    const paddingTop = 28;
    const badgeWidth = 140;
    const badgeHeight = 38;
    const badgeX = canvas.width - badgeWidth - paddingRight;
    const badgeY = paddingTop;

    // Badge Shadow & Background
    ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 10);
    ctx.fill();

    // Reset shadow
    ctx.shadowColor = 'transparent';

    // Badge Border
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Text: ✦ AuraGen
    ctx.font = 'bold 16px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#2563eb'; // Blue star
    ctx.fillText('✦', badgeX + 14, badgeY + 24);

    ctx.fillStyle = '#0f172a'; // Dark text
    ctx.fillText('AuraGen', badgeX + 34, badgeY + 24);

    const watermarkedDataUrl = canvas.toDataURL('image/png');
    triggerDownload(watermarkedDataUrl, fileName);
    return true;

  } catch (err) {
    console.error('Export PNG Error:', err);
    alert('Export error: please try again or copy code.');
    return false;
  }
}

function triggerDownload(dataUrl: string, fileName: string) {
  const link = document.createElement('a');
  link.download = `${fileName}.png`;
  link.href = dataUrl;
  link.click();
}
