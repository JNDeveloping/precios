export async function readTextWithTesseract(imageDataUrl) {
  const { createWorker } = await import(/* @vite-ignore */ 'tesseract.js');
  const worker = await createWorker('spa+eng');
  try {
    const { data } = await worker.recognize(imageDataUrl);
    return data.text || '';
  } finally {
    await worker.terminate();
  }
}
