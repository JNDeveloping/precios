import { useRef } from 'react';
import { BORDER_COLORS, DEFAULT_POSITIONS, DEFAULT_POSTER, SIZES } from '../utils/posterOptions.js';
import { getCurrencyFontSize, getOfferFontSize, getPriceFontSize, getProductFontSize } from '../utils/textSizing.js';

const shapeClasses = {
  circle: 'rounded-full aspect-square min-h-32 justify-center',
  pill: 'rounded-full',
  burst: 'rounded-[35%_65%_45%_55%/55%_40%_60%_45%] rotate-[-4deg]',
};

// Guarda coordenadas porcentuales para que la composición sea idéntica en A4, A5 y PDF.
function DraggableElement({ id, position, enabled, onMove, className = '', children }) {
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

  return <div ref={itemRef} data-poster-object={id} onPointerDown={handlePointerDown} className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 ${enabled ? 'cursor-grab touch-none select-none hover:outline hover:outline-2 hover:outline-blue-400 active:cursor-grabbing' : ''} ${className}`} style={{ left: `${position.x}%`, top: `${position.y}%` }}>{children}</div>;
}

export function PrintablePoster({ poster, printRef, onPositionChange }) {
  const colors = { ...DEFAULT_POSTER, ...poster };
  const positions = { ...DEFAULT_POSITIONS, ...(poster.positions || {}) };
  const size = SIZES[poster.size];
  const border = poster.borderCustomColor || BORDER_COLORS[poster.borderColor]?.hex || DEFAULT_POSTER.borderCustomColor;
  const movable = Boolean(printRef && onPositionChange);

  return (
    <article id={printRef ? 'poster-print' : undefined} ref={printRef} className={`poster-page relative mx-auto w-full max-w-[794px] overflow-hidden ${size.previewClass}`} style={{ backgroundColor: colors.posterBackground, border: `5px solid ${border}`, '--poster-width': `${size.widthMm}mm`, '--poster-height': `${size.heightMm}mm` }}>
      <div className="absolute inset-5 rounded-[1.6rem] border-2" style={{ borderColor: colors.innerBorderColor }} />

      <DraggableElement id="business" position={positions.business} enabled={movable} onMove={onPositionChange} className="w-[82%] text-center">
        <div className="truncate font-black uppercase tracking-[0.18em]" style={{ color: colors.productTextColor, fontSize: 'clamp(12px, 2.2vw, 24px)' }}>{poster.businessName || 'El Rincon De Los Nietos'}</div>
      </DraggableElement>

      <DraggableElement id="offer" position={positions.offer} enabled={movable} onMove={onPositionChange} className="max-w-[92%]">
        <div className="break-words px-10 py-3 font-black uppercase leading-none tracking-[0.16em]" style={{ backgroundColor: colors.offerBackground, color: colors.offerTextColor, boxShadow: `0 12px 0 ${colors.offerShadowColor}`, fontSize: getOfferFontSize(poster.offerLabel), whiteSpace: 'nowrap' }}>{poster.offerLabel || 'OFERTA'}</div>
      </DraggableElement>

      <DraggableElement id="stamp" position={positions.stamp} enabled={movable} onMove={onPositionChange} className="max-w-[85%]">
        <div className="relative">
          <div className={`absolute -inset-3 opacity-70 blur-md ${shapeClasses[poster.stampShape]}`} style={{ backgroundColor: colors.stampBackdropColor }} />
          <div className={`relative flex items-center break-words text-center ${shapeClasses[poster.stampShape]} px-8 py-5 text-2xl font-black uppercase shadow-xl ring-8 ring-white sm:text-3xl`} style={{ background: `linear-gradient(135deg, ${colors.stampStartColor}, ${colors.stampEndColor})`, color: colors.stampTextColor }}>{poster.tagline}</div>
        </div>
      </DraggableElement>

      {poster.productImage && <DraggableElement id="image" position={positions.image} enabled={movable} onMove={onPositionChange} className="h-[18%] w-[45%]">
        <img src={poster.productImage} alt="Producto" className="h-full w-full object-contain drop-shadow-xl" style={{ transform: `scale(${(Number(poster.imageScale) || 100) / 100})` }} draggable="false" />
      </DraggableElement>}

      <DraggableElement id="price" position={positions.price} enabled={movable} onMove={onPositionChange} className="max-w-[94%] text-center leading-none tracking-tighter">
        <div style={{ color: colors.priceColor, whiteSpace: 'nowrap' }}><span className="align-top font-black" style={{ fontSize: getCurrencyFontSize(poster.price) }}>$</span><span className="font-black" style={{ fontSize: getPriceFontSize(poster.price) }}>{poster.price || '0'}</span></div>
      </DraggableElement>

      <DraggableElement id="product" position={positions.product} enabled={movable} onMove={onPositionChange} className="w-[86%] text-center">
        <h2 className="text-balance break-words font-black uppercase leading-[0.95] tracking-tight" style={{ color: colors.productTextColor, fontSize: getProductFontSize(poster.productName) }}>{poster.productName || 'Nombre del producto'}</h2>
      </DraggableElement>
    </article>
  );
}

export function OfferPoster({ poster, printRef, onPositionChange }) {
  const size = SIZES[poster.size];
  return <div className="preview-card w-full rounded-[2rem] bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-6"><div className="preview-title mb-4 flex items-center justify-between text-sm font-bold text-gray-500"><span>Vista previa · arrastrá los objetos para moverlos</span><span>{size.label} · {size.widthMm}×{size.heightMm} mm</span></div><PrintablePoster poster={poster} printRef={printRef} onPositionChange={onPositionChange} /></div>;
}
