import { getCurrencyFontSize, getPriceFontSize, getProductFontSize } from '../utils/textSizing.js';
import { getTemplateSizeClass, getTemplateStyle } from './templateHelpers.js';

export function OfertaClasica({ producto, precio, mensaje, logo, tamaño }) {
  return (
    <article className={`poster-page relative mx-auto w-full max-w-[794px] overflow-hidden bg-white ${getTemplateSizeClass(tamaño)}`} style={getTemplateStyle(tamaño)}>
      <div className="absolute inset-5 rounded-[1.6rem] border-[5px] border-red-600" />
      <div className="absolute left-0 top-[8%] z-10 max-w-[92%] bg-red-600 px-10 py-4 font-black uppercase leading-none tracking-[0.16em] text-white shadow-[0_12px_0_#991b1b]">OFERTA</div>
      <div data-editable-key="logo" className="absolute right-8 top-8 rounded-full border-4 border-red-600 bg-white px-5 py-3 text-lg font-black uppercase text-red-600 shadow-xl">{logo || 'El Rincón'}</div>
      <div className="relative flex h-full flex-col items-center justify-center px-[7%] pb-[12%] pt-[20%] text-center">
        <p data-editable-key="message" className="rounded-full bg-yellow-300 px-8 py-3 text-2xl font-black uppercase tracking-wide text-red-700 shadow-lg">{mensaje || '🔥 IMPERDIBLE'}</p>
        <div data-editable-key="price" className="mt-8 max-w-full leading-none tracking-tighter text-red-600">
          <span className="align-top font-black" style={{ fontSize: getCurrencyFontSize(precio) }}>$</span>
          <span className="break-all font-black" style={{ fontSize: getPriceFontSize(precio) }}>{precio || '0'}</span>
        </div>
        <h2 data-editable-key="product" className="mt-8 max-w-[92%] text-balance break-words font-black uppercase leading-[0.95] tracking-tight text-gray-950" style={{ fontSize: getProductFontSize(producto) }}>{producto || 'Nombre del producto'}</h2>
      </div>
    </article>
  );
}
