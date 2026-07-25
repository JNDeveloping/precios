// Opciones visibles del formulario y medidas exactas para exportar/imprimir.
export const SIZES = {
  A4: { label: 'A4', widthMm: 210, heightMm: 297, previewClass: 'aspect-[210/297]' },
  A5: { label: 'A5', widthMm: 148, heightMm: 210, previewClass: 'aspect-[148/210]' },
};

export const TAGLINES = ['🔥 IMPERDIBLE', '💥 PRECIO ESPECIAL', '⭐ SUPER OFERTA', '🛒 APROVECHÁ'];

export const STAMP_COLORS = {
  red: { label: 'Rojo', className: 'from-red-500 to-red-700 text-white' },
  orange: { label: 'Naranja', className: 'from-orange-400 to-orange-600 text-white' },
  yellow: { label: 'Amarillo', className: 'from-yellow-300 to-yellow-500 text-red-950' },
  green: { label: 'Verde', className: 'from-emerald-400 to-emerald-600 text-white' },
};

export const DEFAULT_POSTER = {
  productName: 'Yerba mate tradicional',
  price: '1.999',
  size: 'A4',
  tagline: TAGLINES[0],
  stampColor: 'red',
};
