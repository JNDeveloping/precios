import { getCurrencyFontSize, getPriceFontSize, getProductFontSize } from '../utils/textSizing.js';
import { getTemplateSizeClass, getTemplateStyle } from './templateHelpers.js';

export function OfertaPremium({ producto, precio, mensaje, logo, tamaño }) {
  return (
    <article className={`poster-page relative mx-auto w-full max-w-[794px] overflow-hidden bg-[#fffdf7] ${getTemplateSizeClass(tamaño)}`} style={getTemplateStyle(tamaño)}>
      <div className="absolute inset-7 border border-amber-300" />
      <div className="absolute inset-10 border-4 border-black" />
      <div className="absolute left-1/2 top-10 -translate-x-1/2 rounded-full bg-black px-8 py-3 text-sm font-black uppercase tracking-[0.35em] text-amber-300">{logo || 'Selección premium'}</div>
      <div className="flex h-full flex-col items-center justify-center px-[9%] text-center font-serif">
        <p className="mb-10 border-y-2 border-amber-400 px-8 py-3 text-3xl font-black uppercase tracking-[0.2em] text-amber-700">{mensaje || 'Precio especial'}</p>
        <div className="leading-none text-black drop-shadow-sm">
          <span className="align-top font-black" style={{ fontSize: getCurrencyFontSize(precio) }}>$</span>
          <span className="break-all font-black" style={{ fontSize: getPriceFontSize(precio) }}>{precio || '0'}</span>
        </div>
        <h2 className="mt-10 max-w-[90%] break-words font-black uppercase leading-none tracking-tight text-neutral-900" style={{ fontSize: getProductFontSize(producto) }}>{producto || 'Nombre del producto'}</h2>
      </div>
    </article>
  );
}
