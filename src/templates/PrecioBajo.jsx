import { ArrowDownCircle } from 'lucide-react';
import { getCurrencyFontSize, getPriceFontSize, getProductFontSize } from '../utils/textSizing.js';
import { getTemplateSizeClass, getTemplateStyle } from './templateHelpers.js';

export function PrecioBajo({ producto, precio, mensaje, logo, tamaño }) {
  return (
    <article className={`poster-page relative mx-auto w-full max-w-[794px] overflow-hidden bg-emerald-600 text-white ${getTemplateSizeClass(tamaño)}`} style={getTemplateStyle(tamaño)}>
      <div className="absolute inset-6 rounded-[2rem] border-8 border-white/90" />
      <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-300/30" />
      <div className="absolute bottom-0 left-0 h-36 w-full bg-emerald-900" />
      <div className="relative flex h-full flex-col items-center justify-center px-[8%] text-center">
        <ArrowDownCircle className="mb-5 h-28 w-28 drop-shadow-2xl" strokeWidth={2.8} />
        <p className="rounded-full bg-white px-8 py-3 text-2xl font-black uppercase tracking-wide text-emerald-700">{mensaje || 'Precio bajo todos los días'}</p>
        <div className="mt-8 leading-none text-white [text-shadow:6px_6px_0_#064e3b]">
          <span className="align-top font-black" style={{ fontSize: getCurrencyFontSize(precio) }}>$</span>
          <span className="break-all font-black" style={{ fontSize: getPriceFontSize(precio) }}>{precio || '0'}</span>
        </div>
        <h2 className="mt-8 max-w-[90%] break-words font-black uppercase leading-[0.92]" style={{ fontSize: getProductFontSize(producto) }}>{producto || 'Nombre del producto'}</h2>
        <p className="absolute bottom-10 text-lg font-black uppercase tracking-[0.35em] text-emerald-100">{logo || 'Ahorro real'}</p>
      </div>
    </article>
  );
}
