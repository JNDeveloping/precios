import { FLYER_SIZES } from '../utils/flyerOptions.js';

function ProductCard({ product, flyer }) {
  return (
    <article className={`relative flex min-h-0 flex-col overflow-hidden border-[3px] p-[3.2cqw] shadow-[0_1.2cqw_2.8cqw_rgba(15,23,42,.12)] ${product.featured ? 'ring-[1.2cqw]' : ''}`} style={{ background: flyer.card, borderColor: flyer.border, borderRadius: `${flyer.cardRadius}px`, '--tw-ring-color': flyer.accent }}>
      {flyer.showDiscount && product.discount && <div className="absolute left-[2.5cqw] top-[2.5cqw] z-10 flex aspect-square w-[11cqw] -rotate-6 items-center justify-center rounded-full text-center font-black leading-none shadow-lg" style={{ background: flyer.accent, color: flyer.header, fontSize: '3.3cqw' }}>-{product.discount.replace('-', '')}</div>}
      <div className="flex min-h-0 flex-1 items-center justify-center py-[1cqw]">
        {product.image ? <img src={product.image} alt="" className="h-full max-h-[24cqw] w-full object-contain drop-shadow-lg" /> : <div className="flex aspect-square w-[20cqw] items-center justify-center rounded-[4cqw] border-2 border-dashed text-center font-bold opacity-30" style={{ borderColor: flyer.text, color: flyer.text, fontSize: '2.5cqw' }}>IMAGEN<br />DEL PRODUCTO</div>}
      </div>
      <div className="shrink-0 text-center">
        <h3 className="line-clamp-2 font-black uppercase leading-[.95]" style={{ color: flyer.text, fontSize: '4cqw' }}>{product.name || 'Producto'}</h3>
        {flyer.showDescription && <p className="mt-[1cqw] truncate font-bold opacity-65" style={{ color: flyer.text, fontSize: '2.5cqw' }}>{product.description}</p>}
        <div className="mt-[1.2cqw] flex items-end justify-center gap-[1.5cqw]">
          {flyer.showOldPrice && product.oldPrice && <span className="pb-[1cqw] font-black line-through opacity-45" style={{ color: flyer.text, fontSize: '2.6cqw' }}>${product.oldPrice}</span>}
          <span className="font-black leading-none tracking-tighter" style={{ color: flyer.price, fontSize: product.price?.length > 7 ? '6.5cqw' : '8cqw' }}><small className="align-top" style={{ fontSize: '.45em' }}>$</small>{product.price || '0'}</span>
        </div>
      </div>
    </article>
  );
}

export function PrintableFlyer({ flyer, flyerRef }) {
  const size = FLYER_SIZES[flyer.size] || FLYER_SIZES.A4;
  const landscape = flyer.orientation === 'landscape';
  const ratio = landscape ? `${size.height}/${size.width}` : `${size.width}/${size.height}`;
  return (
    <article ref={flyerRef} id={flyerRef ? 'flyer-print' : undefined} className="flyer-page relative mx-auto flex w-full max-w-[794px] flex-col overflow-hidden" style={{ aspectRatio: ratio, containerType: 'inline-size', background: flyer.background, '--flyer-width': `${landscape ? size.height : size.width}mm`, '--flyer-height': `${landscape ? size.width : size.height}mm` }}>
      <header className="relative shrink-0 overflow-hidden px-[5cqw] py-[3.3cqw] text-center" style={{ background: flyer.header, color: flyer.headerText }}>
        {flyer.bannerImage && <img src={flyer.bannerImage} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: Number(flyer.bannerOpacity) / 100 }} />}
        <div className="relative flex items-center justify-center gap-[3cqw]">
          {flyer.logo && <img src={flyer.logo} alt="Logo" className="h-[10cqw] w-[10cqw] rounded-[2cqw] bg-white object-contain p-[1cqw]" />}
          <div><p className="font-black uppercase tracking-[.15em] opacity-90" style={{ fontSize: '2.6cqw' }}>{flyer.businessName}</p><h1 className="mt-[.7cqw] font-black uppercase leading-none tracking-tight" style={{ color: flyer.accent, fontSize: '7cqw', textShadow: '0 .8cqw 0 rgba(0,0,0,.18)' }}>{flyer.title}</h1><p className="mt-[1cqw] font-extrabold" style={{ fontSize: '2.6cqw' }}>{flyer.subtitle}</p></div>
        </div>
      </header>
      <div className="flex shrink-0 items-center justify-center px-[4cqw] py-[1.5cqw] font-black uppercase tracking-wide" style={{ background: flyer.accent, color: flyer.header, fontSize: '2.4cqw' }}>{flyer.validity}</div>
      <section className="grid min-h-0 flex-1 p-[3cqw]" style={{ gridTemplateColumns: `repeat(${flyer.columns}, minmax(0, 1fr))`, gap: `${flyer.cardGap}px` }}>
        {flyer.products.map((product, index) => <ProductCard key={product.id || index} product={product} flyer={flyer} />)}
      </section>
      <footer className="shrink-0 px-[4cqw] py-[1.5cqw] text-center font-bold" style={{ background: flyer.header, color: flyer.headerText, fontSize: '1.8cqw' }}>{flyer.footer}</footer>
    </article>
  );
}

export function FlyerPreview({ flyer, flyerRef }) {
  return <div className="flyer-preview-card flex w-full flex-col rounded-[2rem] bg-slate-900 p-4 shadow-2xl sm:p-6 lg:h-[calc(100vh-7rem)]"><div className="preview-title mb-4 flex shrink-0 items-center justify-between text-sm font-bold text-slate-300"><span>Vista previa del folleto</span><span>{flyer.size} · {flyer.orientation === 'portrait' ? 'Vertical' : 'Horizontal'}</span></div><div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden"><PrintableFlyer flyer={flyer} flyerRef={flyerRef} /></div></div>;
}
