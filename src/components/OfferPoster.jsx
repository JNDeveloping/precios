import { SIZES } from '../utils/posterOptions.js';
import { TemplateRenderer } from './TemplateRenderer.jsx';
import { getTemplateMeta } from '../templates/templateRegistry.js';

export function PrintablePoster({ poster, printRef, animated = false, editable = false, onPositionChange }) {
  return <TemplateRenderer templateId={poster.templateId} poster={poster} printRef={printRef} animated={animated} editable={editable} onPositionChange={onPositionChange} />;
}

export function OfferPoster({ poster, printRef, onPositionChange }) {
  const size = SIZES[poster.size];
  const template = getTemplateMeta(poster.templateId);

  return (
    <div className="preview-card w-full rounded-[1.5rem] bg-white p-3 shadow-[0_20px_70px_rgba(15,23,42,0.10)] transition-all duration-300 sm:rounded-[2rem] sm:p-6">
      <div className="preview-title mb-4 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-gray-500 sm:gap-3 sm:text-sm">
        <span>Vista previa en tiempo real · {template.name}</span>
        <span className="hidden rounded-full bg-red-50 px-3 py-1 text-xs font-black text-red-600 sm:inline">Arrastrá textos y precio para acomodarlos</span>
        <span>{size.label} · {size.widthMm}×{size.heightMm} mm</span>
      </div>
      <PrintablePoster poster={poster} printRef={printRef} animated editable onPositionChange={onPositionChange} />
    </div>
  );
}
