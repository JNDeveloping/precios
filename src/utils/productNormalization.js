const NOISE_WORDS = [
  'nuevo', 'nueva', 'promo', 'promocion', 'promoción', 'gratis', 'edicion limitada', 'edición limitada',
  'pack ahorro', 'oferta', 'super oferta', 'imperdible', 'envase retornable', 'sin cargo', 'bonificado',
];

export function titleCase(value = '') {
  return String(value)
    .toLowerCase()
    .replace(/(^|[\s-])([\p{L}])/gu, (_, prefix, letter) => `${prefix}${letter.toUpperCase()}`)
    .replace(/\bCoca Cola\b/gi, 'Coca-Cola')
    .replace(/\bMl\b/g, 'ml')
    .replace(/\bKg\b/g, 'kg')
    .replace(/\bGr\b/g, 'g')
    .replace(/\bL\b/g, 'L');
}

export function normalizeProductName(value = '') {
  let normalized = String(value).replace(/\s+/g, ' ').trim();
  NOISE_WORDS.forEach((word) => {
    normalized = normalized.replace(new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi'), ' ');
  });
  normalized = normalized
    .replace(/\+\s*\d+\s*%/gi, ' ')
    .replace(/\b\d+\s*%\s*(gratis|extra|bonificado)?\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return titleCase(normalized);
}

export function normalizeBarcode(value = '') {
  return String(value).replace(/\D/g, '').slice(0, 14);
}

export function buildSearchText(product = {}) {
  return [product.name, product.brand, product.variant, product.flavor, product.content, product.unit, product.category, product.barcode]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

export function normalizeProduct(raw = {}) {
  const nameBase = normalizeProductName(raw.name || raw.productName || '');
  const content = String(raw.content || '').trim();
  const unit = String(raw.unit || '').trim();
  const name = [nameBase, content && !nameBase.toLowerCase().includes(content.toLowerCase()) ? content : '']
    .filter(Boolean)
    .join(' ')
    .trim();

  return {
    id: raw.id,
    name: name || 'Producto sin nombre',
    brand: titleCase(raw.brand || ''),
    variant: titleCase(raw.variant || ''),
    flavor: titleCase(raw.flavor || ''),
    content,
    unit: unit || inferUnit(content),
    category: titleCase(raw.category || 'Sin categoría'),
    image: raw.image || '',
    barcode: normalizeBarcode(raw.barcode),
    lastPrice: raw.lastPrice || '',
    lastTemplateId: raw.lastTemplateId || 'clasica',
    usedCount: Number(raw.usedCount || 0),
    createdAt: raw.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function inferUnit(content = '') {
  const text = String(content).toLowerCase();
  if (/\b(l|lt|litro|litros)\b/.test(text)) return 'Litros';
  if (/\b(ml|cc)\b/.test(text)) return 'Mililitros';
  if (/\b(kg|kilo|kilos)\b/.test(text)) return 'Kilos';
  if (/\b(g|gr|gramo|gramos)\b/.test(text)) return 'Gramos';
  if (/\b(un|u|unidad|unidades)\b/.test(text)) return 'Unidades';
  return '';
}

export function similarity(a = '', b = '') {
  const left = new Set(buildSearchText({ name: a }).split(' ').filter(Boolean));
  const right = new Set(buildSearchText({ name: b }).split(' ').filter(Boolean));
  if (!left.size || !right.size) return 0;
  const intersection = [...left].filter((token) => right.has(token)).length;
  return intersection / Math.max(left.size, right.size);
}
