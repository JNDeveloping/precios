import html2pdf from 'html2pdf.js';
import { SIZES } from './posterOptions.js';

function getSafeName(name) {
  return name.trim().toLowerCase().replace(/[^a-z0-9áéíóúñ]+/gi, '-').replace(/^-|-$/g, '') || 'ofertas';
}

function expandCopies(posters) {
  return posters.flatMap((poster) => Array.from({ length: Math.max(1, Number(poster.copies) || 1) }, () => poster));
}

// Exporta uno o varios carteles con dimensiones ISO y una página completa por copia.
export async function exportPosterPdf(element, sizeKey, posters) {
  const size = SIZES[sizeKey];
  const posterList = expandCopies(posters);
  const safeName = getSafeName(posterList[0]?.productName || 'ofertas');
  const previousWidth = element.style.width;
  const previousMaxWidth = element.style.maxWidth;

  element.style.width = `${size.widthMm}mm`;
  element.style.maxWidth = 'none';

  try {
    await html2pdf()
      .set({
        filename: `cartel-${safeName}-${posterList.length}-copias-${sizeKey}.pdf`,
        margin: 0,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { scale: 4, useCORS: true, backgroundColor: '#ffffff' },
        jsPDF: { unit: 'mm', format: [size.widthMm, size.heightMm], orientation: 'portrait', compress: true },
        pagebreak: { mode: ['css', 'avoid-all'] },
      })
      .from(element)
      .save();
  } finally {
    element.style.width = previousWidth;
    element.style.maxWidth = previousMaxWidth;
  }
}

export { expandCopies };
