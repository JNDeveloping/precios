import { readBarcodeFromImage } from '../barcode/zxingScanner.js';
import { findByBarcode, markProductUsed, saveProduct, searchProducts } from '../database/productDb.js';
import { readTextWithTesseract } from '../ocr/tesseractOcr.js';
import { analyzeProductImageWithVision } from '../vision/openAiVision.js';
import { fileToDataUrl } from './imageFile.js';

export const RECOGNITION_STEPS = [
  '📷 Analizando imagen...',
  '🤖 Reconociendo producto...',
  '🏷 Detectando marca...',
  '📦 Leyendo código...',
];

export async function recognizeProductFromImage(file, { onStep } = {}) {
  onStep?.(RECOGNITION_STEPS[0]);
  const image = await fileToDataUrl(file);

  let barcode = '';
  try {
    onStep?.(RECOGNITION_STEPS[3]);
    barcode = await readBarcodeFromImage(file);
  } catch {
    barcode = '';
  }

  if (barcode) {
    const cached = await findByBarcode(barcode);
    if (cached) return { status: 'cached', product: cached, candidates: [] };
  }

  onStep?.(RECOGNITION_STEPS[1]);
  let product;
  try {
    product = await analyzeProductImageWithVision(image);
  } catch (visionError) {
    onStep?.('🔎 Aplicando OCR de respaldo...');
    const text = await readTextWithTesseract(image);
    product = { name: text.split('\n').find(Boolean) || 'Producto reconocido', brand: '', category: 'Sin categoría', image, barcode };
  }

  const enriched = await saveProduct({ ...product, image, barcode: product.barcode || barcode });
  const candidates = await searchProducts(enriched.name);
  return { status: 'recognized', product: enriched, candidates: candidates.filter((item) => item.id !== enriched.id).slice(0, 3) };
}

export async function useRecognizedProduct(product, poster) {
  return markProductUsed(product, { price: poster.price, templateId: poster.templateId });
}
