import { STAMP_COLORS, SIZES } from '../utils/posterOptions.js';

// Cartel limpio de supermercado: datos mínimos, alto contraste y formato imprimible.
export function OfferPoster({ poster, printRef }) {
  const stamp = STAMP_COLORS[poster.stampColor];
  const size = SIZES[poster.size];

  return (
    <div className="w-full rounded-[2rem] bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-6">
      <div className="mb-4 flex items-center justify-between text-sm font-bold text-gray-500">
        <span>Vista previa en tiempo real</span>
        <span>{size.label} · {size.widthMm}×{size.heightMm} mm</span>
      </div>

      <article
        id="poster-print"
        ref={printRef}
        className={`relative mx-auto w-full max-w-[794px] overflow-hidden bg-white ${size.previewClass}`}
        style={{ border: '5px solid #dc2626', '--poster-width': `${size.widthMm}mm`, '--poster-height': `${size.heightMm}mm` }}
      >
        <div className="absolute inset-5 rounded-[1.6rem] border-2 border-red-100" />

        <div className="absolute left-0 top-[8%] z-10 bg-red-600 px-10 py-3 text-4xl font-black uppercase tracking-[0.16em] text-white shadow-[0_12px_0_#991b1b] sm:text-5xl">
          OFERTA
        </div>

        <div className="absolute left-1/2 top-[24%] h-40 w-40 -translate-x-1/2 rounded-full bg-yellow-300 blur-2xl opacity-70" />

        <div className="relative flex h-full flex-col items-center justify-center px-[7%] pb-[12%] pt-[18%] text-center">
          <div className={`mb-8 rounded-full bg-gradient-to-br ${stamp.className} px-8 py-5 text-2xl font-black uppercase shadow-xl ring-8 ring-white sm:text-3xl`}>
            {poster.tagline}
          </div>

          <div className="leading-none tracking-tighter text-red-600">
            <span className="align-top text-[clamp(3rem,10vw,5.8rem)] font-black">$</span>
            <span className="text-[clamp(5.5rem,18vw,11rem)] font-black">{poster.price || '0'}</span>
          </div>

          <h2 className="mt-8 max-w-[90%] text-balance text-[clamp(2rem,6vw,4.8rem)] font-black uppercase leading-[0.95] tracking-tight text-gray-950">
            {poster.productName || 'Nombre del producto'}
          </h2>
        </div>

        <footer className="absolute bottom-[3.5%] left-1/2 w-full -translate-x-1/2 px-8 text-center text-[clamp(0.85rem,2vw,1.4rem)] font-extrabold tracking-wide text-gray-700">
          Web Desarrollada por Tomas Victola
        </footer>
      </article>
    </div>
  );
}
