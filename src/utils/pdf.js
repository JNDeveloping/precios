import html2pdf from 'html2pdf.js';
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

function getBaseOptions(size) {
  return {
    margin: 0,
    image: { type: 'jpeg', quality: 1 },
    html2canvas: { scale: 4, useCORS: true, backgroundColor: '#ffffff', scrollX: 0, scrollY: 0 },
    jsPDF: { unit: 'mm', format: [size.widthMm, size.heightMm], orientation: 'portrait', compress: true },
  };
}

async function renderPageToCanvas(page, size) {
  return html2pdf().set(getBaseOptions(size)).from(page).toCanvas().get('canvas');
}

// Exporta uno o varios carteles renderizando cada hoja por separado para evitar páginas blancas.
export async function exportPosterPdf(element, sizeKey, posters) {
  const size = SIZES[sizeKey];
  const posterList = expandCopies(posters);
  const pages = [...element.querySelectorAll('.poster-page')];
  if (!pages.length) return;

  const safeName = getSafeName(posterList[0]?.productName || 'ofertas');
  const restorePages = forcePageSizes(pages, size);

  try {
    const firstWorker = html2pdf()
      .set({ ...getBaseOptions(size), filename: `cartel-${safeName}-${posterList.length}-copias-${sizeKey}.pdf` })
      .from(pages[0])
      .toPdf();
    const pdf = await firstWorker.get('pdf');

    for (const page of pages.slice(1)) {
      const canvas = await renderPageToCanvas(page, size);
      pdf.addPage([size.widthMm, size.heightMm], 'portrait');
      pdf.addImage(canvas.toDataURL('image/jpeg', 1), 'JPEG', 0, 0, size.widthMm, size.heightMm);
    }

    pdf.save(`cartel-${safeName}-${posterList.length}-copias-${sizeKey}.pdf`);
  } finally {
    restorePages.forEach((restore) => restore());
  }
}

export { expandCopies };
