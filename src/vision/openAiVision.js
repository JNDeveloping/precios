import { normalizeProduct } from '../utils/productNormalization.js';

const VISION_PROMPT = `Analizá el envase completo y devolvé SOLO JSON válido con: name, brand, variant, flavor, content, unit, category, barcode. No incluyas slogans ni palabras promocionales como NUEVO, PROMO, GRATIS, +20%, edición limitada o pack ahorro. Normalizá el nombre comercial en español de góndola.`;

export async function analyzeProductImageWithVision(imageDataUrl, { apiKey = import.meta.env.VITE_OPENAI_API_KEY } = {}) {
  if (!apiKey) throw new Error('Falta configurar VITE_OPENAI_API_KEY para usar OpenAI Vision API.');

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: import.meta.env.VITE_OPENAI_VISION_MODEL || 'gpt-4.1-mini',
      input: [{ role: 'user', content: [{ type: 'input_text', text: VISION_PROMPT }, { type: 'input_image', image_url: imageDataUrl }] }],
      text: { format: { type: 'json_object' } },
    }),
  });

  if (!response.ok) throw new Error(`OpenAI Vision no respondió correctamente (${response.status}).`);
  const data = await response.json();
  const text = data.output_text || data.output?.flatMap((item) => item.content || []).find((part) => part.text)?.text || '{}';
  return normalizeProduct({ ...JSON.parse(text), image: imageDataUrl });
}
