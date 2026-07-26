import { saveProduct } from '../database/productDb.js';
import { normalizeProduct } from '../utils/productNormalization.js';

const PRODUCT_SEARCH_PROMPT = `Buscá en la web información comercial del producto indicado para supermercado en Argentina o LATAM cuando sea posible.
Devolvé SOLO JSON válido con esta forma exacta:
{
  "products": [
    {
      "name": "Nombre comercial limpio con contenido si se conoce",
      "brand": "Marca",
      "variant": "Variante",
      "flavor": "Sabor",
      "content": "Contenido, ej: 2.25 L",
      "unit": "Litros | Mililitros | Kilos | Gramos | Unidades |",
      "category": "Categoría de góndola",
      "barcode": "EAN si aparece, solo números",
      "image": "URL pública de imagen si aparece",
      "sourceUrl": "URL consultada más útil"
    }
  ]
}
No devuelvas slogans ni promociones. Eliminá palabras como NUEVO, PROMO, GRATIS, +20%, edición limitada y pack ahorro.`;

function extractOutputText(data) {
  return data.output_text || data.output?.flatMap((item) => item.content || []).find((part) => part.text || part.type === 'output_text')?.text || '{}';
}

function parseProductSearchJson(text) {
  const cleanText = String(text || '{}').trim().replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
  const firstBrace = cleanText.indexOf('{');
  const lastBrace = cleanText.lastIndexOf('}');
  const jsonText = firstBrace >= 0 && lastBrace > firstBrace ? cleanText.slice(firstBrace, lastBrace + 1) : cleanText;
  return JSON.parse(jsonText);
}

export async function searchProductsWithAiWeb(query, { apiKey = import.meta.env.VITE_OPENAI_API_KEY } = {}) {
  const cleanQuery = query.trim();
  if (!cleanQuery) return [];
  if (!apiKey) throw new Error('Falta configurar VITE_OPENAI_API_KEY para buscar productos con IA en la web.');

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: import.meta.env.VITE_OPENAI_SEARCH_MODEL || import.meta.env.VITE_OPENAI_VISION_MODEL || 'gpt-4.1-mini',
      tools: [{ type: 'web_search' }],
      tool_choice: 'required',
      input: `${PRODUCT_SEARCH_PROMPT}\n\nProducto a buscar: ${cleanQuery}`,
      max_output_tokens: 1200,
    }),
  });

  if (!response.ok) {
    let detail = '';
    try {
      const errorData = await response.json();
      detail = errorData.error?.message ? `: ${errorData.error.message}` : '';
    } catch {
      detail = '';
    }
    throw new Error(`La búsqueda web con IA no respondió correctamente (${response.status})${detail}.`);
  }
  const parsed = parseProductSearchJson(extractOutputText(await response.json()));
  const products = Array.isArray(parsed.products) ? parsed.products : [];
  const normalizedProducts = products.map((product) => normalizeProduct(product));

  const savedProducts = [];
  for (const product of normalizedProducts) {
    savedProducts.push(await saveProduct(product));
  }
  return savedProducts;
}
