import { BORDER_COLORS, DEFAULT_POSTER, SIZES } from '../utils/posterOptions.js';
import { getCurrencyFontSize, getOfferFontSize, getPriceFontSize, getProductFontSize } from '../utils/textSizing.js';

const shapeClasses = {
  circle: 'rounded-full aspect-square min-h-32 justify-center',
  pill: 'rounded-full',
  burst: 'rounded-[35%_65%_45%_55%/55%_40%_60%_45%] rotate-[-4deg]',
};

// Cartel limpio de supermercado: datos mínimos, alto contraste y formato imprimible.
export function PrintablePoster({ poster, printRef }) {
  const colors = { ...DEFAULT_POSTER, ...poster };
  const size = SIZES[poster.size];
  const border = poster.borderCustomColor || BORDER_COLORS[poster.borderColor]?.hex || DEFAULT_POSTER.borderCustomColor;

  return (
    <article
      id={printRef ? 'poster-print' : undefined}
      ref={printRef}
      className={`poster-page relative mx-auto w-full max-w-[794px] overflow-hidden ${size.previewClass}`}
      style={{ backgroundColor: colors.posterBackground, border: `5px solid ${border}`, '--poster-width': `${size.widthMm}mm`, '--poster-height': `${size.heightMm}mm` }}
    >
      <div className="absolute inset-5 rounded-[1.6rem] border-2" style={{ borderColor: colors.innerBorderColor }} />

      <div className="absolute left-0 top-[8%] z-10 max-w-[92%] break-words px-10 py-3 font-black uppercase leading-none tracking-[0.16em]" style={{ backgroundColor: colors.offerBackground, color: colors.offerTextColor, boxShadow: `0 12px 0 ${colors.offerShadowColor}`, fontSize: getOfferFontSize(poster.offerLabel) }}>
        {poster.offerLabel || 'OFERTA'}
      </div>

      <div className="relative flex h-full flex-col items-center justify-center px-[7%] pb-[12%] pt-[18%] text-center">
        <div className="relative mb-8 max-w-[92%]">
          <div className={`absolute -inset-3 opacity-70 blur-md ${shapeClasses[poster.stampShape]}`} style={{ backgroundColor: colors.stampBackdropColor }} />
          <div className={`relative flex items-center break-words ${shapeClasses[poster.stampShape]} px-8 py-5 text-2xl font-black uppercase shadow-xl ring-8 ring-white sm:text-3xl`} style={{ background: `linear-gradient(135deg, ${colors.stampStartColor}, ${colors.stampEndColor})`, color: colors.stampTextColor }}>
            {poster.tagline}
          </div>
        </div>

        <div className="max-w-full leading-none tracking-tighter" style={{ color: colors.priceColor }}>
          <span className="align-top font-black" style={{ fontSize: getCurrencyFontSize(poster.price) }}>$</span>
          <span className="break-all font-black" style={{ fontSize: getPriceFontSize(poster.price) }}>{poster.price || '0'}</span>
        </div>

        <h2 className="mt-8 max-w-[92%] text-balance break-words font-black uppercase leading-[0.95] tracking-tight" style={{ color: colors.productTextColor, fontSize: getProductFontSize(poster.productName) }}>
          {poster.productName || 'Nombre del producto'}
        </h2>
      </div>
    </article>
  );
}

export function OfferPoster({ poster, printRef }) {
  const size = SIZES[poster.size];

  return (
    <div className="preview-card w-full rounded-[2rem] bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-6">
      <div className="preview-title mb-4 flex items-center justify-between text-sm font-bold text-gray-500">
        <span>Vista previa en tiempo real</span>
        <span>{size.label} · {size.widthMm}×{size.heightMm} mm</span>
      </div>
      <PrintablePoster poster={poster} printRef={printRef} />
    </div>
  );
}
