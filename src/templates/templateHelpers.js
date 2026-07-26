export function getTemplateSizeClass(tamaño) {
  return tamaño?.previewClass ?? 'aspect-[210/297]';
}

export function getTemplateStyle(tamaño, extra = {}) {
  return {
    '--poster-width': `${tamaño?.widthMm ?? 210}mm`,
    '--poster-height': `${tamaño?.heightMm ?? 297}mm`,
    ...extra,
  };
}

export function splitComboProducts(producto) {
  const parts = String(producto || '')
    .split(/\s*(?:\+|,|&|\by\b)\s*/i)
    .map((part) => part.trim())
    .filter(Boolean);

  if (parts.length) return parts;
  return ['Producto 1', 'Producto 2'];
}
