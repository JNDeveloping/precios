import { buildSearchText, normalizeBarcode, normalizeProduct, similarity } from '../utils/productNormalization.js';

const DB_NAME = 'precios-intelligent-products';
const DB_VERSION = 1;
const STORE = 'products';

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      const store = db.createObjectStore(STORE, { keyPath: 'id' });
      store.createIndex('barcode', 'barcode', { unique: false });
      store.createIndex('updatedAt', 'updatedAt', { unique: false });
      store.createIndex('usedCount', 'usedCount', { unique: false });
      store.createIndex('searchText', 'searchText', { unique: false });
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function tx(mode = 'readonly') {
  const db = await openDb();
  return db.transaction(STORE, mode).objectStore(STORE);
}

function promisify(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveProduct(product) {
  const store = await tx('readwrite');
  const normalized = normalizeProduct(product);
  const record = { ...normalized, id: normalized.id || normalized.barcode || crypto.randomUUID(), searchText: buildSearchText(normalized) };
  await promisify(store.put(record));
  return record;
}

export async function getProducts() {
  const store = await tx();
  return promisify(store.getAll());
}

export async function findByBarcode(barcode) {
  const clean = normalizeBarcode(barcode);
  if (!clean) return null;
  const store = await tx();
  const results = await promisify(store.index('barcode').getAll(clean));
  return results?.[0] ?? null;
}

export async function searchProducts(query) {
  const text = buildSearchText({ name: query });
  const products = await getProducts();
  return products
    .map((product) => ({ product, score: similarity(text, product.searchText || product.name) }))
    .filter((item) => item.score > 0.25 || productMatches(item.product, text))
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
}

function productText(product) {
  return product.searchText || buildSearchText(product);
}

function productMatches(product, query) {
  return query && productText(product).includes(query);
}

export async function deleteProduct(id) {
  const store = await tx('readwrite');
  await promisify(store.delete(id));
}

export async function markProductUsed(product, { price = '', templateId = 'clasica' } = {}) {
  return saveProduct({ ...product, usedCount: Number(product.usedCount || 0) + 1, lastPrice: price || product.lastPrice || '', lastTemplateId: templateId || product.lastTemplateId });
}

export async function getFavorites(limit = 20) {
  const products = await getProducts();
  return products.sort((a, b) => (b.usedCount || 0) - (a.usedCount || 0)).slice(0, limit);
}
