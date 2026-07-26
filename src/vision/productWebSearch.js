import { saveProduct } from '../database/productDb.js';
import { normalizeProduct } from '../utils/productNormalization.js';

const OPEN_FOOD_FACTS_SEARCH_URL = 'https://world.openfoodfacts.org/cgi/search.pl';

function getFirstCategory(categories = '') {
  return String(categories)
    .split(',')
    .map((category) => category.replace(/^\w+:/, '').trim())
    .filter(Boolean)
    .at(-1) || 'Sin categoría';
}

function normalizeOpenFoodFactsProduct(product) {
  const name = product.product_name || product.generic_name || '';
  return normalizeProduct({
    name,
    brand: String(product.brands || '').split(',')[0]?.trim() || '',
    variant: '',
    flavor: '',
    content: product.quantity || '',
    unit: '',
    category: getFirstCategory(product.categories),
    barcode: product.code || '',
    image: product.image_front_url || product.image_url || '',
    sourceUrl: product.url || '',
  });
}

export async function searchProductsFreeWeb(query) {
  const cleanQuery = query.trim();
  if (!cleanQuery) return [];

  const params = new URLSearchParams({
    search_terms: cleanQuery,
    search_simple: '1',
    action: 'process',
    json: '1',
    page_size: '8',
    fields: 'code,product_name,generic_name,brands,quantity,categories,image_front_url,image_url,url',
  });

  const response = await fetch(`${OPEN_FOOD_FACTS_SEARCH_URL}?${params.toString()}`, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) throw new Error(`La búsqueda gratuita no respondió correctamente (${response.status}).`);
  const data = await response.json();
  const products = Array.isArray(data.products) ? data.products : [];
  const normalizedProducts = products
    .map(normalizeOpenFoodFactsProduct)
    .filter((product) => product.name && product.name !== 'Producto sin nombre');

  const savedProducts = [];
  for (const product of normalizedProducts) {
    savedProducts.push(await saveProduct(product));
  }
  return savedProducts;
}

export { searchProductsFreeWeb as searchProductsWithAiWeb };
