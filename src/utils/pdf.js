import html2pdf from 'html2pdf.js';
import { SIZES } from './posterOptions.js';

// Exporta el nodo exacto del cartel con dimensiones ISO y sin márgenes.
export async function exportPosterPdf(element, sizeKey, productName) {
  const size = SIZES[sizeKey];
  const safeName = productName.trim().toLowerCase().replace(/[^a-z0-9áéíóúñ]+/gi, '-').replace(/^-|-$/g, '') || 'oferta';

  await html2pdf()
    .set({
      filename: `cartel-${safeName}-${sizeKey}.pdf`,
      margin: 0,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 4, useCORS: true, backgroundColor: '#ffffff' },
      jsPDF: { unit: 'mm', format: [size.widthMm, size.heightMm], orientation: 'portrait', compress: true },
      pagebreak: { mode: ['avoid-all'] },
    })
    .from(element)
    .save();
}
