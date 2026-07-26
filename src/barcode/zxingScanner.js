import { normalizeBarcode } from '../utils/productNormalization.js';

export async function readBarcodeFromImage(fileOrUrl) {
  const { BrowserMultiFormatReader } = await import(/* @vite-ignore */ '@zxing/browser');
  const reader = new BrowserMultiFormatReader();
  const url = typeof fileOrUrl === 'string' ? fileOrUrl : URL.createObjectURL(fileOrUrl);
  try {
    const result = await reader.decodeFromImageUrl(url);
    return normalizeBarcode(result.getText());
  } finally {
    if (typeof fileOrUrl !== 'string') URL.revokeObjectURL(url);
  }
}

export async function scanBarcodeFromCamera(videoElement, onResult) {
  const { BrowserMultiFormatReader } = await import(/* @vite-ignore */ '@zxing/browser');
  const reader = new BrowserMultiFormatReader();
  const controls = await reader.decodeFromVideoDevice(undefined, videoElement, (result) => {
    const code = normalizeBarcode(result?.getText?.() || '');
    if (code) onResult(code);
  });
  return () => controls.stop();
}
