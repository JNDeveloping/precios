import { Sparkles } from 'lucide-react';
import { getCurrencyFontSize, getPriceFontSize, getProductFontSize } from '../utils/textSizing.js';
import { getTemplateSizeClass, getTemplateStyle } from './templateHelpers.js';

export function NuevoIngreso({ producto, precio, mensaje, logo, tamaño }) {
  return (
    <article className={`poster-page relative mx-auto w-full max-w-[794px] overflow-hidden bg-sky-600 text-white ${getTemplateSizeClass(tamaño)}`} style={getTemplateStyle(tamaño)}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.45),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.9),_transparent_40%)]" />
      <div className="absolute left-8 top-8 rounded-3xl bg-white px-8 py-4 text-5xl font-black uppercase text-sky-700 shadow-2xl">Nuevo</div>
      <div className="absolute right-10 top-12 flex h-28 w-28 items-center justify-center rounded-full bg-yellow-300 text-sky-900 shadow-xl"><Sparkles size={58} /></div>
      <div className="relative flex h-full flex-col items-center justify-center px-[8%] pt-[16%] text-center">
        <p data-editable-key="message" className="rounded-2xl bg-sky-950/80 px-8 py-4 text-2xl font-black uppercase tracking-wider">{mensaje || 'Nuevo ingreso'}</p>
        <div data-editable-key="price" className="mt-9 leading-none text-yellow-200 [text-shadow:5px_5px_0_#075985]">
          <span className="align-top font-black" style={{ fontSize: getCurrencyFontSize(precio) }}>$</span>
          <span className="break-all font-black" style={{ fontSize: getPriceFontSize(precio) }}>{precio || '0'}</span>
        </div>
        <h2 data-editable-key="product" className="mt-8 max-w-[92%] break-words font-black uppercase leading-[0.92]" style={{ fontSize: getProductFontSize(producto) }}>{producto || 'Nombre del producto'}</h2>
        <p data-editable-key="logo" className="mt-8 text-xl font-black uppercase tracking-[0.3em] text-sky-100">{logo || 'Nuevo en almacén'}</p>
      </div>
    </article>
  );
}
