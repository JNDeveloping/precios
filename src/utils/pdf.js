import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { SIZES } from './posterOptions.js';

function getSafeName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9áéíóúñ]+/gi, '-').replace(/^-|-$/g, '') || 'ofertas';
}

function expandCopies(posters) {
  return posters.flatMap((poster) => Array.from({ length: Math.max(1, Number(poster.copies) || 1) }, () => poster));
}

function forcePageSizes(pages, size) {
  return pages.map((page) => {
    const previous = { width: page.style.width, height: page.style.height, maxWidth: page.style.maxWidth };
    page.style.width = `${size.widthMm}mm`;
    page.style.height = `${size.heightMm}mm`;
    page.style.maxWidth = 'none';
    return () => {
      page.style.width = previous.width;
      page.style.height = previous.height;
      page.style.maxWidth = previous.maxWidth;
    };
  });
}

async function renderPage(page) {
  return html2canvas(page, {
    scale: 4,
    useCORS: true,
    backgroundColor: '#ffffff',
    scrollX: 0,
    scrollY: 0,
    windowWidth: page.scrollWidth,
    windowHeight: page.scrollHeight,
  });
}

// Exporta cada cartel como imagen exacta dentro de jsPDF para impedir páginas blancas extras.
export async function exportPosterPdf(element, sizeKey, posters) {
  const size = SIZES[sizeKey];
  const posterList = expandCopies(posters);
  const pages = [...element.querySelectorAll('.poster-page')];
  if (!pages.length) return;

  const fileName = `cartel-${getSafeName(posterList[0]?.productName || 'ofertas')}-${posterList.length}-copias-${sizeKey}.pdf`;
  const pdf = new jsPDF({ unit: 'mm', format: [size.widthMm, size.heightMm], orientation: 'portrait', compress: true });
  const restorePages = forcePageSizes(pages, size);

  try {
    for (const [index, page] of pages.entries()) {
      const canvas = await renderPage(page);
      if (index > 0) pdf.addPage([size.widthMm, size.heightMm], 'portrait');
      pdf.addImage(canvas.toDataURL('image/jpeg', 1), 'JPEG', 0, 0, size.widthMm, size.heightMm, undefined, 'FAST');
    }

    pdf.save(fileName);
  } finally {
    restorePages.forEach((restore) => restore());
  }
}

export { expandCopies };
