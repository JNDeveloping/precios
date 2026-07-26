import { getCurrencyFontSize, getPriceFontSize, getProductFontSize } from '../utils/textSizing.js';
import { getTemplateSizeClass, getTemplateStyle } from './templateHelpers.js';

export function Liquidacion({ producto, precio, mensaje, logo, tamaño }) {
  return (
    <article className={`poster-page relative mx-auto w-full max-w-[794px] overflow-hidden bg-yellow-300 ${getTemplateSizeClass(tamaño)}`} style={getTemplateStyle(tamaño)}>
      <div className="absolute -left-16 top-16 h-32 w-[120%] -rotate-6 bg-black" />
      <div className="absolute left-6 top-8 rotate-[-8deg] bg-red-600 px-7 py-4 text-4xl font-black uppercase text-white shadow-2xl">Liquidación</div>
      <div className="absolute right-8 top-20 flex h-40 w-40 rotate-12 items-center justify-center rounded-full bg-black p-4 text-center text-xl font-black uppercase leading-tight text-yellow-300 ring-8 ring-white">Últimas unidades</div>
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-[7%] pt-[18%] text-center">
        <p data-editable-key="message" className="mb-7 rounded-xl bg-black px-7 py-3 text-2xl font-black uppercase tracking-widest text-white">{mensaje || 'Todo debe irse'}</p>
        <div data-editable-key="price" className="leading-none text-red-700 [text-shadow:5px_5px_0_#111827]">
          <span className="align-top font-black" style={{ fontSize: getCurrencyFontSize(precio) }}>$</span>
          <span className="break-all font-black" style={{ fontSize: getPriceFontSize(precio) }}>{precio || '0'}</span>
        </div>
        <h2 data-editable-key="product" className="mt-8 max-w-[90%] break-words font-black uppercase leading-[0.9] text-black" style={{ fontSize: getProductFontSize(producto) }}>{producto || 'Nombre del producto'}</h2>
        <p data-editable-key="logo" className="mt-6 text-xl font-black uppercase tracking-[0.3em] text-black">{logo || 'Almacén familiar'}</p>
      </div>
    </article>
  );
}
