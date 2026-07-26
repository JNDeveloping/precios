import { getCurrencyFontSize, getPriceFontSize, getProductFontSize } from '../utils/textSizing.js';
import { getTemplateSizeClass, getTemplateStyle } from './templateHelpers.js';

export function Mayorista({ producto, precio, mensaje, logo, tamaño }) {
  return (
    <article className={`poster-page relative mx-auto w-full max-w-[794px] overflow-hidden bg-white ${getTemplateSizeClass(tamaño)}`} style={getTemplateStyle(tamaño)}>
      <div className="absolute inset-0 border-[10px] border-gray-950" />
      <div className="flex h-full flex-col justify-between px-[8%] py-[10%] text-gray-950">
        <header className="flex items-start justify-between gap-6 border-b-4 border-gray-950 pb-8">
          <div>
            <p className="text-2xl font-black uppercase tracking-[0.35em] text-gray-500">Mayorista</p>
            <h1 className="mt-3 text-5xl font-black uppercase leading-none">{mensaje || 'Precio por volumen'}</h1>
          </div>
          <p className="rounded-full border-4 border-gray-950 px-6 py-3 text-lg font-black uppercase">{logo || 'Stock'}</p>
        </header>
        <section className="text-center">
          <div className="leading-none text-gray-950">
            <span className="align-top font-black" style={{ fontSize: getCurrencyFontSize(precio) }}>$</span>
            <span className="break-all font-black" style={{ fontSize: getPriceFontSize(precio) }}>{precio || '0'}</span>
          </div>
          <h2 className="mx-auto mt-10 max-w-[92%] break-words font-black uppercase leading-[0.9]" style={{ fontSize: getProductFontSize(producto) }}>{producto || 'Nombre del producto'}</h2>
        </section>
        <footer className="border-t-4 border-gray-950 pt-6 text-center text-xl font-black uppercase tracking-[0.4em]">Ideal para imprimir</footer>
      </div>
    </article>
  );
}
