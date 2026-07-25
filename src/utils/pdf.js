import html2pdf from 'html2pdf.js';
import { SIZES } from './posterOptions.js';

function getSafeName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9áéíóúñ]+/gi, '-').replace(/^-|-$/g, '') || 'ofertas';
}

function expandCopies(posters) {
  return posters.flatMap((poster) => Array.from({ length: Math.max(1, Number(poster.copies) || 1) }, () => poster));
}

function forcePageSizes(element, size) {
  const pages = [...element.querySelectorAll('.poster-page')];
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

// Exporta uno o varios carteles con dimensiones ISO y una página completa por copia.
export async function exportPosterPdf(element, sizeKey, posters) {
  const size = SIZES[sizeKey];
  const posterList = expandCopies(posters);
  const safeName = getSafeName(posterList[0]?.productName || 'ofertas');
  const previousWidth = element.style.width;
  const previousMaxWidth = element.style.maxWidth;
  const restorePages = forcePageSizes(element, size);

  element.style.width = `${size.widthMm}mm`;
  element.style.maxWidth = 'none';

  try {
    await html2pdf()
      .set({
        filename: `cartel-${safeName}-${posterList.length}-copias-${sizeKey}.pdf`,
        margin: 0,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 4, useCORS: true, backgroundColor: '#ffffff', scrollX: 0, scrollY: 0 },
        jsPDF: { unit: 'mm', format: [size.widthMm, size.heightMm], orientation: 'portrait', compress: true },
        pagebreak: { mode: ['css'] },
      })
      .from(element)
      .save();
  } finally {
    element.style.width = previousWidth;
    element.style.maxWidth = previousMaxWidth;
    restorePages.forEach((restore) => restore());
  }
}

export { expandCopies };
