import { SIZES } from '../utils/posterOptions.js';
import { TemplateRenderer } from './TemplateRenderer.jsx';
import { getTemplateMeta } from '../templates/templateRegistry.js';

export function PrintablePoster({ poster, printRef, animated = false }) {
  return <TemplateRenderer templateId={poster.templateId} poster={poster} printRef={printRef} animated={animated} />;
}

export function OfferPoster({ poster, printRef }) {
  const size = SIZES[poster.size];
  const template = getTemplateMeta(poster.templateId);

  return (
    <div className="preview-card w-full rounded-[2rem] bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.10)] transition-all duration-300 sm:p-6">
      <div className="preview-title mb-4 flex items-center justify-between gap-3 text-sm font-bold text-gray-500">
        <span>Vista previa en tiempo real · {template.name}</span>
        <span>{size.label} · {size.widthMm}×{size.heightMm} mm</span>
      </div>
      <PrintablePoster poster={poster} printRef={printRef} animated />
    </div>
  );
}
