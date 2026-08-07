import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { FLYER_SIZES } from './flyerOptions.js';

export async function exportFlyerPdf(page, flyer) {
  if (!page) return;
  const base = FLYER_SIZES[flyer.size] || FLYER_SIZES.A4;
  const landscape = flyer.orientation === 'landscape';
  const width = landscape ? base.height : base.width;
  const height = landscape ? base.width : base.height;
  const previous = { width: page.style.width, height: page.style.height, maxWidth: page.style.maxWidth };
  page.style.width = `${width}mm`;
  page.style.height = `${height}mm`;
  page.style.maxWidth = 'none';

  try {
    await document.fonts?.ready;
    const canvas = await html2canvas(page, { scale: 3, useCORS: true, backgroundColor: flyer.background, scrollX: 0, scrollY: 0, logging: false });
    const pdf = new jsPDF({ unit: 'mm', format: [width, height], orientation: landscape ? 'landscape' : 'portrait', compress: true });
    pdf.addImage(canvas.toDataURL('image/jpeg', 0.96), 'JPEG', 0, 0, width, height, undefined, 'FAST');
    pdf.save(`folleto-${flyer.businessName.toLowerCase().replace(/[^a-z0-9]+/gi, '-') || 'ofertas'}.pdf`);
  } finally {
    Object.assign(page.style, previous);
  }
}
