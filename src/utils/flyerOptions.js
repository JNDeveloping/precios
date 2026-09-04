export const FLYER_TEMPLATES = {
  rincon: {
    label: 'Rincón identidad', description: 'Negro y verde institucional', category: 'Marca', pattern: 'checker',
    colors: { background: '#f3f8f2', header: '#062719', headerText: '#ffffff', accent: '#38f21a', card: '#ffffff', price: '#087a3e', text: '#082116', border: '#20c55a' },
  },
  rinconNight: {
    label: 'Rincón nocturno', description: 'Negro profundo y verde neón', category: 'Marca', pattern: 'checker',
    colors: { background: '#07130d', header: '#020806', headerText: '#ffffff', accent: '#83f52c', card: '#10231a', price: '#83f52c', text: '#ffffff', border: '#35d468' },
  },
  rinconFresh: {
    label: 'Rincón fresco', description: 'Verde brillante y crema', category: 'Marca', pattern: 'waves',
    colors: { background: '#ecf8e8', header: '#0b3b24', headerText: '#ffffff', accent: '#a3e635', card: '#ffffff', price: '#166534', text: '#102a1b', border: '#4ade80' },
  },
  supermarket: {
    label: 'Súper ofertas', description: 'Rojo, blanco y amarillo', category: 'Ofertas',
    colors: { background: '#fff7ed', header: '#e30613', headerText: '#ffffff', accent: '#ffe600', card: '#ffffff', price: '#e30613', text: '#172033', border: '#e30613' },
  },
  neighborhood: {
    label: 'Almacén del barrio', description: 'Cálida y cercana', category: 'Almacén',
    colors: { background: '#fff7df', header: '#7c2d12', headerText: '#fff7ed', accent: '#f59e0b', card: '#fffbeb', price: '#b91c1c', text: '#451a03', border: '#d97706' },
  },
  fresh: {
    label: 'Frescos del día', description: 'Ideal para frutas y verduras', category: 'Frescos',
    colors: { background: '#ecfdf5', header: '#047857', headerText: '#ffffff', accent: '#bef264', card: '#ffffff', price: '#047857', text: '#064e3b', border: '#10b981' },
  },
  wholesale: {
    label: 'Mayorista', description: 'Azul intenso y alto contraste', category: 'Mayorista',
    colors: { background: '#eff6ff', header: '#1d4ed8', headerText: '#ffffff', accent: '#facc15', card: '#ffffff', price: '#1d4ed8', text: '#172554', border: '#60a5fa' },
  },
  dark: {
    label: 'Black ofertas', description: 'Negro premium con dorado', category: 'Ofertas',
    colors: { background: '#09090b', header: '#18181b', headerText: '#facc15', accent: '#facc15', card: '#18181b', price: '#facc15', text: '#ffffff', border: '#facc15' },
  },
  candy: {
    label: 'Promo pop', description: 'Fucsia y celeste llamativos', category: 'Nuevas',
    colors: { background: '#fdf2f8', header: '#db2777', headerText: '#ffffff', accent: '#67e8f9', card: '#ffffff', price: '#db2777', text: '#500724', border: '#f472b6' },
  },
};

export const DEFAULT_FLYER_PRODUCT = {
  name: 'Producto destacado', description: 'Presentación 500 g', price: '1.999', oldPrice: '', discount: '30%', image: '', featured: false,
};

export const DEFAULT_FLYER = {
  template: 'rincon', size: 'A4', orientation: 'portrait',
  businessName: 'El Rincon De Los Nietos', title: '¡SÚPER OFERTAS!', subtitle: 'Precios increíbles por tiempo limitado', validity: 'Válido hasta agotar stock', footer: 'Las imágenes son ilustrativas. Consultá disponibilidad.',
  columns: 2, automaticLayout: true, cardRadius: 22, cardGap: 12, showDiscount: true, showOldPrice: true, showDescription: true,
  logo: '', bannerImage: '', bannerOpacity: 28,
  ...FLYER_TEMPLATES.rincon.colors,
  products: [
    { ...DEFAULT_FLYER_PRODUCT, name: 'Yerba mate', description: 'Paquete 1 kg', price: '3.990', oldPrice: '5.700', discount: '30%' },
    { ...DEFAULT_FLYER_PRODUCT, name: 'Galletitas', description: 'Variedades 400 g', price: '1.890', oldPrice: '2.700', discount: '30%' },
    { ...DEFAULT_FLYER_PRODUCT, name: 'Fideos secos', description: 'Paquete 500 g', price: '990', oldPrice: '1.320', discount: '25%' },
    { ...DEFAULT_FLYER_PRODUCT, name: 'Café instantáneo', description: 'Frasco 170 g', price: '4.290', oldPrice: '6.130', discount: '30%' },
  ],
};

// El modo automático aumenta columnas y compacta las tarjetas para que todos los
// productos mantengan una jerarquía visual equilibrada dentro de una sola hoja.
export function getFlyerLayout(productCount, orientation, preferredColumns, automaticLayout = true) {
  const count = Math.max(1, productCount);
  let columns = Math.max(2, Math.min(4, Number(preferredColumns) || 2));

  if (automaticLayout) {
    if (orientation === 'landscape') columns = count <= 3 ? count : count <= 8 ? 4 : 5;
    else columns = count <= 4 ? 2 : count <= 9 ? 3 : 4;
  }

  columns = Math.max(1, Math.min(columns, count));
  const rows = Math.ceil(count / columns);
  const density = rows >= 4 || count > 12 ? 'dense' : rows >= 3 || count > 6 ? 'compact' : 'comfortable';
  return { columns, rows, density };
}

export const FLYER_SIZES = {
  A4: { width: 210, height: 297 },
  A5: { width: 148, height: 210 },
};
