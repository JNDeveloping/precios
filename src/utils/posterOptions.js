// Opciones visibles del formulario y medidas exactas para exportar/imprimir.
export const SIZES = {
  A4: { label: 'A4', widthMm: 210, heightMm: 297, previewClass: 'aspect-[210/297]' },
  A5: { label: 'A5', widthMm: 148, heightMm: 210, previewClass: 'aspect-[148/210]' },
};

export const TAGLINES = ['🔥 IMPERDIBLE', '💥 PRECIO ESPECIAL', '⭐ SUPER OFERTA', '🛒 APROVECHÁ'];

export const STAMP_COLORS = {
  red: { label: 'Rojo', startHex: '#ef4444', endHex: '#b91c1c', textHex: '#ffffff' },
  orange: { label: 'Naranja', startHex: '#fb923c', endHex: '#ea580c', textHex: '#ffffff' },
  yellow: { label: 'Amarillo', startHex: '#fde047', endHex: '#eab308', textHex: '#450a0a' },
  green: { label: 'Verde', startHex: '#34d399', endHex: '#059669', textHex: '#ffffff' },
};

export const BORDER_COLORS = {
  red: { label: 'Rojo elegante', hex: '#dc2626' },
  black: { label: 'Negro premium', hex: '#111827' },
  green: { label: 'Verde fresco', hex: '#059669' },
  orange: { label: 'Naranja promo', hex: '#ea580c' },
};

export const STAMP_SHAPES = {
  circle: 'Sello circular',
  pill: 'Pastilla redondeada',
  burst: 'Explosión amarilla',
};

const CLASSIC_COLORS = { posterBackground: '#ffffff', borderCustomColor: '#dc2626', innerBorderColor: '#fee2e2', offerBackground: '#dc2626', offerTextColor: '#ffffff', offerShadowColor: '#991b1b', stampStartColor: '#ef4444', stampEndColor: '#b91c1c', stampTextColor: '#ffffff', stampBackdropColor: '#fde047', priceColor: '#dc2626', productTextColor: '#030712' };

export const TEMPLATES = {
  classic: { label: 'Oferta clásica', description: 'Cartel tradicional de almacén', offerLabel: 'OFERTA', tagline: TAGLINES[0], stampShape: 'circle', colors: CLASSIC_COLORS },
  twoForOne: { label: 'Promoción 2×1', description: 'Ideal para dos unidades al precio de una', offerLabel: '2×1', tagline: 'LLEVÁS 2 · PAGÁS 1', stampShape: 'burst', colors: { posterBackground: '#fff7ed', borderCustomColor: '#f97316', innerBorderColor: '#fdba74', offerBackground: '#f97316', offerShadowColor: '#c2410c', stampStartColor: '#fde047', stampEndColor: '#facc15', stampTextColor: '#7c2d12', stampBackdropColor: '#fb923c', priceColor: '#c2410c' } },
  combo: { label: 'Combo especial', description: 'Para packs de varios productos', offerLabel: 'COMBO', tagline: 'TODO JUNTO A PRECIO ESPECIAL', stampShape: 'pill', colors: { posterBackground: '#f0fdf4', borderCustomColor: '#16a34a', innerBorderColor: '#86efac', offerBackground: '#16a34a', offerShadowColor: '#166534', stampStartColor: '#22c55e', stampEndColor: '#15803d', stampTextColor: '#ffffff', stampBackdropColor: '#bbf7d0', priceColor: '#15803d' } },
  wholesale: { label: 'Precio mayorista', description: 'Para ofertas por cantidad', offerLabel: 'MAYORISTA', tagline: 'LLEVANDO MÁS, PAGÁS MENOS', stampShape: 'pill', colors: { posterBackground: '#eff6ff', borderCustomColor: '#2563eb', innerBorderColor: '#93c5fd', offerBackground: '#2563eb', offerShadowColor: '#1e3a8a', stampStartColor: '#60a5fa', stampEndColor: '#1d4ed8', stampTextColor: '#ffffff', stampBackdropColor: '#bfdbfe', priceColor: '#1d4ed8' } },
  clearance: { label: 'Liquidación', description: 'Alto impacto para últimas unidades', offerLabel: 'LIQUIDACIÓN', tagline: 'ÚLTIMAS UNIDADES', stampShape: 'burst', colors: { posterBackground: '#fef2f2', borderCustomColor: '#111827', innerBorderColor: '#fca5a5', offerBackground: '#111827', offerShadowColor: '#dc2626', stampStartColor: '#ef4444', stampEndColor: '#991b1b', stampTextColor: '#ffffff', stampBackdropColor: '#fde047', priceColor: '#dc2626' } },
};

export const DEFAULT_POSITIONS = {
  offer: { x: 24, y: 12 }, stamp: { x: 50, y: 34 }, price: { x: 50, y: 58 }, product: { x: 50, y: 77 },
};

export const DEFAULT_POSTER = {
  template: 'classic',
  productName: 'Yerba mate tradicional',
  price: '1.999',
  size: 'A4',
  offerLabel: 'OFERTA',
  tagline: TAGLINES[0],
  stampColor: 'red',
  stampShape: 'circle',
  borderColor: 'red',
  // Paleta libre: cada superficie y accesorio puede personalizarse.
  posterBackground: '#ffffff',
  innerBorderColor: '#fee2e2',
  borderCustomColor: '#dc2626',
  offerBackground: '#dc2626',
  offerTextColor: '#ffffff',
  offerShadowColor: '#991b1b',
  stampStartColor: '#ef4444',
  stampEndColor: '#b91c1c',
  stampTextColor: '#ffffff',
  stampBackdropColor: '#fde047',
  priceColor: '#dc2626',
  productTextColor: '#030712',
  positions: DEFAULT_POSITIONS,
  copies: 1,
};
