// Opciones visibles del formulario y medidas exactas para exportar/imprimir.
export const SIZES = {
  A4: { label: 'A4', widthMm: 210, heightMm: 297, previewClass: 'aspect-[210/297]' },
  A5: { label: 'A5', widthMm: 148, heightMm: 210, previewClass: 'aspect-[148/210]' },
};

export const TAGLINES = ['🔥 IMPERDIBLE', '💥 PRECIO ESPECIAL', '⭐ SUPER OFERTA', '🛒 APROVECHÁ'];

export const STAMP_COLORS = {
  red: { label: 'Rojo', className: 'from-red-500 to-red-700 text-white', hex: '#dc2626' },
  orange: { label: 'Naranja', className: 'from-orange-400 to-orange-600 text-white', hex: '#ea580c' },
  yellow: { label: 'Amarillo', className: 'from-yellow-300 to-yellow-500 text-red-950', hex: '#facc15' },
  green: { label: 'Verde', className: 'from-emerald-400 to-emerald-600 text-white', hex: '#059669' },
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
  copies: 1,
};
