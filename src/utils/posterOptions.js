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

export const DEFAULT_POSTER = {
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
  copies: 1,
};
