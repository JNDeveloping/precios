import { PlusCircle } from 'lucide-react';
import { getCurrencyFontSize, getPriceFontSize, getProductFontSize } from '../utils/textSizing.js';
import { getTemplateSizeClass, getTemplateStyle, splitComboProducts } from './templateHelpers.js';

export function Combo({ producto, precio, mensaje, logo, tamaño }) {
  const [firstProduct, secondProduct] = splitComboProducts(producto);

  return (
    <article className={`poster-page relative mx-auto w-full max-w-[794px] overflow-hidden bg-orange-500 ${getTemplateSizeClass(tamaño)}`} style={getTemplateStyle(tamaño)}>
      <div className="absolute inset-5 rounded-[2rem] border-8 border-white" />
      <div className="absolute left-1/2 top-8 -translate-x-1/2 rounded-full bg-white px-10 py-3 text-4xl font-black uppercase tracking-widest text-orange-600 shadow-xl">Combo</div>
      <div className="relative flex h-full flex-col items-center justify-center px-[8%] pt-[14%] text-center text-white">
        <p className="mb-8 rounded-2xl bg-red-600 px-8 py-3 text-2xl font-black uppercase shadow-lg">{mensaje || 'Llevando ambos'}</p>
        <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-4">
          {[firstProduct, secondProduct].map((item) => (
            <div key={item} className="flex min-h-48 items-center justify-center rounded-[2rem] bg-white p-6 text-3xl font-black uppercase leading-tight text-orange-700 shadow-2xl">{item}</div>
          ))}
          <PlusCircle className="h-16 w-16 text-white drop-shadow-xl" />
        </div>
        <div className="mt-9 leading-none text-yellow-200 [text-shadow:5px_5px_0_#991b1b]">
          <span className="align-top font-black" style={{ fontSize: getCurrencyFontSize(precio) }}>$</span>
          <span className="break-all font-black" style={{ fontSize: getPriceFontSize(precio) }}>{precio || '0'}</span>
        </div>
        <h2 className="mt-4 max-w-[92%] break-words font-black uppercase leading-none" style={{ fontSize: getProductFontSize('Precio especial') }}>Precio especial</h2>
        <p className="mt-5 text-lg font-black uppercase tracking-[0.35em]">{logo || 'Pack ahorro'}</p>
      </div>
    </article>
  );
}
