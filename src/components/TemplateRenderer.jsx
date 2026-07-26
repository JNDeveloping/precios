import { SIZES } from '../utils/posterOptions.js';
import { DEFAULT_TEMPLATE_ID, templates } from '../templates/templateRegistry.js';

export function TemplateRenderer({ templateId = DEFAULT_TEMPLATE_ID, poster, printRef }) {
  const Template = templates[templateId] ?? templates[DEFAULT_TEMPLATE_ID];
  const tamaño = SIZES[poster.size] ?? SIZES.A4;

  return (
    <div
      ref={printRef}
      id={printRef ? 'poster-print' : undefined}
      className="template-renderer"
      style={{ '--poster-width': `${tamaño.widthMm}mm`, '--poster-height': `${tamaño.heightMm}mm` }}
    >
      <Template producto={poster.productName} precio={poster.price} mensaje={poster.tagline} logo={poster.logo} tamaño={tamaño} />
    </div>
  );
}
