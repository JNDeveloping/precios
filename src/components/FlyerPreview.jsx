import { FLYER_SIZES, FLYER_TEMPLATES, getFlyerLayout } from '../utils/flyerOptions.js';

const DENSITY = {
  comfortable: { padding: '3.2cqw', badge: '11cqw', badgeText: '3.3cqw', image: '24cqw', name: '4cqw', description: '2.5cqw', oldPrice: '2.6cqw', price: '8cqw' },
  compact: { padding: '2.1cqw', badge: '8cqw', badgeText: '2.35cqw', image: '16cqw', name: '2.9cqw', description: '1.9cqw', oldPrice: '1.9cqw', price: '5.6cqw' },
  dense: { padding: '1.5cqw', badge: '6.6cqw', badgeText: '1.9cqw', image: '11cqw', name: '2.25cqw', description: '1.5cqw', oldPrice: '1.5cqw', price: '4.35cqw' },
};

function ProductCard({ product, flyer, layout, placement }) {
  const scale = DENSITY[layout.density];
  return (
    <article className={`relative flex min-h-0 flex-col overflow-hidden border-[3px] shadow-[0_1.2cqw_2.8cqw_rgba(15,23,42,.12)] ${product.featured ? 'ring-[.8cqw]' : ''}`} style={{ background: flyer.card, borderColor: flyer.border, borderRadius: `${Math.max(8, Number(flyer.cardRadius) - (layout.density === 'dense' ? 8 : 0))}px`, '--tw-ring-color': flyer.accent, padding: scale.padding, ...placement }}>
      {flyer.showDiscount && product.discount && <div className="absolute left-[1.5cqw] top-[1.5cqw] z-10 flex aspect-square -rotate-6 items-center justify-center rounded-full text-center font-black leading-none shadow-lg" style={{ background: flyer.accent, color: flyer.header, fontSize: scale.badgeText, width: scale.badge }}>-{product.discount.replace('-', '')}</div>}
      <div className="flex min-h-0 flex-1 items-center justify-center py-[1cqw]">
        {product.image ? <img src={product.image} alt="" className="h-full w-full object-contain drop-shadow-lg" style={{ maxHeight: scale.image }} /> : <div className="flex aspect-square items-center justify-center rounded-[3cqw] border-2 border-dashed text-center font-bold opacity-30" style={{ borderColor: flyer.text, color: flyer.text, fontSize: scale.description, width: scale.image }}>IMAGEN<br />DEL PRODUCTO</div>}
      </div>
      <div className="shrink-0 text-center">
        <h3 className="line-clamp-2 font-black uppercase leading-[.95]" style={{ color: flyer.text, fontSize: scale.name }}>{product.name || 'Producto'}</h3>
        {flyer.showDescription && <p className="mt-[.6cqw] truncate font-bold opacity-65" style={{ color: flyer.text, fontSize: scale.description }}>{product.description}</p>}
        <div className="mt-[.7cqw] flex items-end justify-center gap-[1cqw]">
          {flyer.showOldPrice && product.oldPrice && <span className="pb-[.5cqw] font-black line-through opacity-45" style={{ color: flyer.text, fontSize: scale.oldPrice }}>${product.oldPrice}</span>}
          <span className="font-black leading-none tracking-tighter" style={{ color: flyer.price, fontSize: product.price?.length > 7 ? `calc(${scale.price} * .82)` : scale.price }}><small className="align-top" style={{ fontSize: '.45em' }}>$</small>{product.price || '0'}</span>
        </div>
      </div>
    </article>
  );
}

export function PrintableFlyer({ flyer, flyerRef }) {
  const size = FLYER_SIZES[flyer.size] || FLYER_SIZES.A4;
  const landscape = flyer.orientation === 'landscape';
  const ratio = landscape ? `${size.height}/${size.width}` : `${size.width}/${size.height}`;
  const pattern = FLYER_TEMPLATES[flyer.template]?.pattern;
  const layout = getFlyerLayout(flyer.products.length, flyer.orientation, flyer.columns, flyer.automaticLayout);
  const lastRowCount = flyer.products.length % layout.columns || layout.columns;
  const firstLastRow = flyer.products.length - lastRowCount;
  const centeredStart = Math.floor((layout.columns - lastRowCount) / 2) + 1;
  return (
    <article ref={flyerRef} id={flyerRef ? 'flyer-print' : undefined} className="flyer-page relative mx-auto flex w-full max-w-[794px] flex-col overflow-hidden" style={{ aspectRatio: ratio, containerType: 'inline-size', background: flyer.background, '--flyer-width': `${landscape ? size.height : size.width}mm`, '--flyer-height': `${landscape ? size.width : size.height}mm` }}>
      <header className="relative shrink-0 overflow-hidden px-[7cqw] py-[3.3cqw] text-center" style={{ background: flyer.header, color: flyer.headerText }}>
        {flyer.bannerImage && <img src={flyer.bannerImage} alt="" className="absolute inset-0 h-full w-full object-cover" style={{ opacity: Number(flyer.bannerOpacity) / 100 }} />}
        {pattern === 'checker' && <><div className="flyer-checkers absolute inset-y-0 left-0 w-[5cqw]" style={{ '--checker-color': flyer.accent }} /><div className="flyer-checkers absolute inset-y-0 right-0 w-[5cqw]" style={{ '--checker-color': flyer.accent }} /></>}
        {pattern === 'waves' && <div className="absolute inset-x-0 bottom-0 h-[1.4cqw] opacity-80" style={{ background: `repeating-radial-gradient(circle at 1cqw 0, transparent 0 .65cqw, ${flyer.accent} .7cqw 1cqw)` }} />}
        <div className="relative flex items-center justify-center gap-[3cqw]">
          {flyer.logo && <img src={flyer.logo} alt="Logo" className="h-[10cqw] w-[10cqw] rounded-[2cqw] bg-white object-contain p-[1cqw]" />}
          <div><p className="font-black uppercase tracking-[.15em] opacity-90" style={{ fontSize: '2.6cqw' }}>{flyer.businessName}</p><h1 className="mt-[.7cqw] font-black uppercase leading-none tracking-tight" style={{ color: flyer.accent, fontSize: '7cqw', textShadow: '0 .8cqw 0 rgba(0,0,0,.18)' }}>{flyer.title}</h1><p className="mt-[1cqw] font-extrabold" style={{ fontSize: '2.6cqw' }}>{flyer.subtitle}</p></div>
        </div>
      </header>
      <div className="flex shrink-0 items-center justify-center px-[4cqw] py-[1.5cqw] font-black uppercase tracking-wide" style={{ background: flyer.accent, color: flyer.header, fontSize: '2.4cqw' }}>{flyer.validity}</div>
      <section className="grid min-h-0 flex-1 p-[3cqw]" style={{ gridTemplateColumns: `repeat(${layout.columns}, minmax(0, 1fr))`, gridTemplateRows: `repeat(${layout.rows}, minmax(0, 1fr))`, gap: `${Math.max(4, Number(flyer.cardGap) - (layout.density === 'dense' ? 5 : layout.density === 'compact' ? 2 : 0))}px` }}>
        {flyer.products.map((product, index) => <ProductCard key={product.id || index} product={product} flyer={flyer} layout={layout} placement={index === firstLastRow && lastRowCount < layout.columns ? { gridColumnStart: centeredStart } : undefined} />)}
      </section>
      <footer className="shrink-0 px-[4cqw] py-[1.5cqw] text-center font-bold" style={{ background: flyer.header, color: flyer.headerText, fontSize: '1.8cqw' }}>{flyer.footer}</footer>
    </article>
  );
}

export function FlyerPreview({ flyer, flyerRef }) {
  return <div className="flyer-preview-card flex w-full flex-col rounded-[2rem] border border-emerald-400/20 bg-[#07130d] p-4 shadow-[0_28px_80px_rgba(0,0,0,.35)] sm:p-6 lg:h-[calc(100vh-7rem)]"><div className="preview-title mb-4 flex shrink-0 items-center justify-between text-sm font-bold text-emerald-100/70"><span>Vista previa del folleto</span><span className="rounded-full bg-lime-400 px-3 py-1 text-xs font-black text-[#07130d]">{flyer.size} · {flyer.orientation === 'portrait' ? 'Vertical' : 'Horizontal'}</span></div><div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden"><PrintableFlyer flyer={flyer} flyerRef={flyerRef} /></div></div>;
}
