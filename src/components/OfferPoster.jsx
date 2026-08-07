import { useRef } from 'react';
import { BORDER_COLORS, DEFAULT_POSITIONS, DEFAULT_POSTER, SIZES } from '../utils/posterOptions.js';
import { getCurrencyFontSize, getOfferFontSize, getPriceFontSize, getProductFontSize } from '../utils/textSizing.js';

const shapeClasses = {
  circle: 'rounded-full aspect-square justify-center',
  pill: 'rounded-full',
  burst: 'rounded-[35%_65%_45%_55%/55%_40%_60%_45%] rotate-[-4deg]',
};

function TemplateDecorations({ template, colors }) {
  if (template === 'rincon') return <><div className="flyer-checkers absolute inset-y-0 left-0 w-[6%]" style={{ '--checker-color': colors.stampStartColor }} /><div className="flyer-checkers absolute inset-y-0 right-0 w-[6%]" style={{ '--checker-color': colors.stampStartColor }} /><div className="absolute inset-x-[6%] bottom-[3%] h-[1.2%] rounded-full" style={{ backgroundColor: colors.stampStartColor }} /></>;
  if (template === 'clearance') return <><div className="absolute -right-[18%] top-[7%] h-[20%] w-[80%] -rotate-6 bg-gray-950" /><div className="absolute -bottom-[8%] -left-[15%] h-[22%] w-[90%] rotate-6 bg-red-200" /></>;
  if (template === 'twoForOne') return <><div className="absolute -right-[20%] -top-[4%] h-[34%] w-[90%] -rotate-12 bg-yellow-300 opacity-70" /><div className="absolute bottom-0 left-0 h-[15%] w-full bg-orange-100" /></>;
  if (template === 'combo') return <><div className="absolute -left-[25%] top-[20%] h-[22%] w-[85%] rotate-12 bg-emerald-100" /><div className="absolute -right-[20%] bottom-[5%] h-[25%] w-[85%] -rotate-12 bg-green-200" /></>;
  if (template === 'wholesale') return <><div className="absolute inset-x-0 top-0 h-[18%] bg-blue-100" /><div className="absolute inset-x-0 bottom-0 h-[16%] bg-blue-200" /></>;
  if (template === 'neon') return <><div className="absolute -right-[15%] top-[4%] h-[28%] w-[65%] rotate-12 rounded-[30%] bg-yellow-300" /><div className="absolute -bottom-[10%] -left-[20%] h-[30%] w-[90%] -rotate-6 bg-pink-200" /></>;
  if (template === 'fresh') return <><div className="absolute -left-[15%] top-[22%] h-[23%] w-[55%] rotate-12 rounded-full bg-lime-200" /><div className="absolute -right-[20%] bottom-[5%] h-[28%] w-[70%] -rotate-12 rounded-full bg-emerald-200" /></>;
  if (template === 'weekend') return <><div className="absolute inset-x-0 top-0 h-[22%] -skew-y-6 bg-blue-200" /><div className="absolute inset-x-0 bottom-0 h-[19%] skew-y-6 bg-rose-200" /></>;
  if (template === 'blackFriday') return <><div className="absolute left-0 top-[22%] h-2 w-full rotate-3 bg-yellow-400" /><div className="absolute bottom-[12%] left-0 h-3 w-full -rotate-3 bg-red-600" /></>;
  if (template === 'clean') return <><div className="absolute right-0 top-0 h-full w-[8%] bg-slate-900" /><div className="absolute bottom-0 left-0 h-[10%] w-[65%] bg-rose-500" /></>;
  return <div className="absolute bottom-0 left-0 h-[10%] w-full opacity-30" style={{ backgroundColor: colors.innerBorderColor }} />;
}

// Guarda coordenadas porcentuales para que la composición sea idéntica en A4, A5 y PDF.
function DraggableElement({ id, position, enabled, onMove, className = '', style, children }) {
  const itemRef = useRef(null);

  const handlePointerDown = (event) => {
    if (!enabled || !onMove) return;
    event.preventDefault();
    const item = itemRef.current;
    const page = item.closest('.poster-page');
    item.setPointerCapture(event.pointerId);

    const move = (moveEvent) => {
      const bounds = page.getBoundingClientRect();
      const x = Math.min(96, Math.max(4, ((moveEvent.clientX - bounds.left) / bounds.width) * 100));
      const y = Math.min(96, Math.max(4, ((moveEvent.clientY - bounds.top) / bounds.height) * 100));
      onMove(id, { x, y });
    };
    const stop = () => {
      item.removeEventListener('pointermove', move);
      item.removeEventListener('pointerup', stop);
      item.removeEventListener('pointercancel', stop);
    };
    item.addEventListener('pointermove', move);
    item.addEventListener('pointerup', stop);
    item.addEventListener('pointercancel', stop);
  };

  return <div ref={itemRef} data-poster-object={id} onPointerDown={handlePointerDown} className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${enabled ? 'cursor-grab touch-none select-none hover:outline hover:outline-2 hover:outline-blue-400 active:cursor-grabbing' : ''} ${className}`} style={{ left: `${position.x}%`, top: `${position.y}%`, ...style }}>{children}</div>;
}

export function PrintablePoster({ poster, printRef, onPositionChange }) {
  const colors = { ...DEFAULT_POSTER, ...poster };
  const positions = { ...DEFAULT_POSITIONS, ...(poster.positions || {}) };
  const size = SIZES[poster.size];
  const border = poster.borderCustomColor || BORDER_COLORS[poster.borderColor]?.hex || DEFAULT_POSTER.borderCustomColor;
  const movable = Boolean(printRef && onPositionChange);

  return (
    <article id={printRef ? 'poster-print' : undefined} ref={printRef} className={`poster-page relative mx-auto w-full max-w-[794px] overflow-hidden ${printRef ? 'lg:h-[calc(100vh-8rem)] lg:w-auto lg:max-w-full' : ''} ${size.previewClass}`} style={{ containerType: 'inline-size', backgroundColor: colors.posterBackground, border: `5px solid ${border}`, '--poster-width': `${size.widthMm}mm`, '--poster-height': `${size.heightMm}mm` }}>
      <TemplateDecorations template={poster.template} colors={colors} />
      <div className="absolute inset-5 rounded-[1.6rem] border-2" style={{ borderColor: colors.innerBorderColor }} />

      <DraggableElement id="business" position={positions.business} enabled={movable} onMove={onPositionChange} className="w-[82%] text-center">
        <div className="truncate font-black uppercase tracking-[0.18em]" style={{ color: colors.productTextColor, fontSize: '3cqw' }}>{poster.businessName || 'El Rincon De Los Nietos'}</div>
      </DraggableElement>

      <DraggableElement id="offer" position={positions.offer} enabled={movable} onMove={onPositionChange} className="max-w-[92%]">
        <div className="break-words font-black uppercase leading-none tracking-[0.16em]" style={{ backgroundColor: colors.offerBackground, color: colors.offerTextColor, boxShadow: `0 1.5cqw 0 ${colors.offerShadowColor}`, fontSize: getOfferFontSize(poster.offerLabel), padding: '1.5cqw 5cqw', whiteSpace: 'nowrap' }}>{poster.offerLabel || 'OFERTA'}</div>
      </DraggableElement>

      <DraggableElement id="stamp" position={positions.stamp} enabled={movable} onMove={onPositionChange} className="max-w-[85%]">
        <div className="relative">
          <div className={`absolute -inset-3 opacity-70 blur-md ${shapeClasses[poster.stampShape]}`} style={{ backgroundColor: colors.stampBackdropColor }} />
          <div className={`relative flex items-center break-words text-center ${shapeClasses[poster.stampShape]} font-black uppercase shadow-xl ring-8 ring-white`} style={{ background: `linear-gradient(135deg, ${colors.stampStartColor}, ${colors.stampEndColor})`, color: colors.stampTextColor, fontSize: '3.5cqw', minHeight: '16cqw', padding: '2.5cqw 4cqw' }}>{poster.tagline}</div>
        </div>
      </DraggableElement>

      {poster.productImage && <DraggableElement id="image" position={positions.image} enabled={movable} onMove={onPositionChange} style={{ height: `${18 * ((Number(poster.imageScale) || 100) / 100)}%`, width: `${45 * ((Number(poster.imageScale) || 100) / 100)}%` }}>
        <img src={poster.productImage} alt="Producto" className="h-full w-full object-contain drop-shadow-xl" draggable="false" />
      </DraggableElement>}

      <DraggableElement id="price" position={positions.price} enabled={movable} onMove={onPositionChange} className="max-w-[94%] text-center leading-none tracking-tighter">
        <div style={{ color: colors.priceColor, whiteSpace: 'nowrap' }}><span className="align-top font-black" style={{ fontSize: getCurrencyFontSize(poster.price) }}>$</span><span className="font-black" style={{ fontSize: getPriceFontSize(poster.price) }}>{poster.price || '0'}</span></div>
      </DraggableElement>

      <DraggableElement id="product" position={positions.product} enabled={movable} onMove={onPositionChange} className="w-[86%] text-center">
        <h2 className="text-balance break-words font-black uppercase leading-[0.95] tracking-tight" style={{ color: colors.productTextColor, fontSize: getProductFontSize([poster.productName, ...(poster.additionalProducts || [])].join(' + ')) }}>
          <span>{poster.productName || 'Nombre del producto'}</span>
          {(poster.additionalProducts || []).filter(Boolean).map((product, index) => <span key={`${product}-${index}`} className="mt-2 block"><span style={{ color: colors.priceColor }}>{poster.template === 'twoForOne' ? ' + ' : '• '}</span>{product}</span>)}
        </h2>
      </DraggableElement>
    </article>
  );
}

export function OfferPoster({ poster, printRef, onPositionChange }) {
  const size = SIZES[poster.size];
  return <div className="preview-card flex w-full flex-col rounded-[2rem] bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-6 lg:h-[calc(100vh-3rem)]"><div className="preview-title mb-4 flex shrink-0 items-center justify-between text-sm font-bold text-gray-500"><span>Vista previa · arrastrá los objetos para moverlos</span><span>{size.label} · {size.widthMm}×{size.heightMm} mm</span></div><div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden"><PrintablePoster poster={poster} printRef={printRef} onPositionChange={onPositionChange} /></div></div>;
}
