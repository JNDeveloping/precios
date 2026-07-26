import { Zap } from 'lucide-react';
import { getCurrencyFontSize, getPriceFontSize, getProductFontSize } from '../utils/textSizing.js';
import { getTemplateSizeClass, getTemplateStyle } from './templateHelpers.js';

export function BlackFriday({ producto, precio, mensaje, logo, tamaño }) {
  return (
    <article className={`poster-page relative mx-auto w-full max-w-[794px] overflow-hidden bg-black text-white ${getTemplateSizeClass(tamaño)}`} style={getTemplateStyle(tamaño)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.35),_transparent_45%)]" />
      <div className="absolute inset-x-0 top-0 h-24 bg-red-700" />
      <div className="absolute left-8 top-8 flex items-center gap-3 text-4xl font-black uppercase tracking-tight text-yellow-300"><Zap /> Black Friday</div>
      <div data-editable-key="logo" className="absolute right-8 top-8 rounded-full border-4 border-yellow-300 px-6 py-3 text-lg font-black uppercase text-yellow-300">{logo || 'Almacén sale'}</div>
      <div className="relative flex h-full flex-col items-center justify-center px-[8%] pt-[15%] text-center">
        <p data-editable-key="message" className="rotate-[-2deg] bg-yellow-300 px-9 py-4 text-3xl font-black uppercase tracking-wider text-black shadow-[8px_8px_0_#dc2626]">{mensaje || 'Oferta explosiva'}</p>
        <div data-editable-key="price" className="mt-10 leading-none text-yellow-300 [text-shadow:7px_7px_0_#dc2626]">
          <span className="align-top font-black" style={{ fontSize: getCurrencyFontSize(precio) }}>$</span>
          <span className="break-all font-black" style={{ fontSize: getPriceFontSize(precio) }}>{precio || '0'}</span>
        </div>
        <h2 data-editable-key="product" className="mt-10 max-w-[90%] break-words font-black uppercase leading-[0.9]" style={{ fontSize: getProductFontSize(producto) }}>{producto || 'Nombre del producto'}</h2>
      </div>
    </article>
  );
}
