import { useRef } from 'react';
import { SIZES } from '../utils/posterOptions.js';
import { DEFAULT_TEMPLATE_ID, templates } from '../templates/templateRegistry.js';

const editableKeys = ['logo', 'message', 'items', 'price', 'product'];

function getPositionVars(positions = {}) {
  return editableKeys.reduce((vars, key) => {
    vars[`--slot-${key}-x`] = `${positions[key]?.x ?? 0}px`;
    vars[`--slot-${key}-y`] = `${positions[key]?.y ?? 0}px`;
    return vars;
  }, {});
}

export function TemplateRenderer({ templateId = DEFAULT_TEMPLATE_ID, poster, printRef, animated = false, editable = false, onPositionChange }) {
  const Template = templates[templateId] ?? templates[DEFAULT_TEMPLATE_ID];
  const tamaño = SIZES[poster.size] ?? SIZES.A4;
  const dragRef = useRef(null);

  const startDrag = (event) => {
    if (!editable || event.button !== 0) return;
    const target = event.target.closest('[data-editable-key]');
    if (!target) return;
    const key = target.dataset.editableKey;
    const current = poster.positions?.[key] ?? { x: 0, y: 0 };
    dragRef.current = { key, startX: event.clientX, startY: event.clientY, originX: current.x, originY: current.y };
    event.preventDefault();
  };

  const moveDrag = (event) => {
    const drag = dragRef.current;
    if (!drag) return;
    onPositionChange?.(drag.key, {
      x: Math.round(drag.originX + event.clientX - drag.startX),
      y: Math.round(drag.originY + event.clientY - drag.startY),
    });
  };

  const stopDrag = () => {
    dragRef.current = null;
  };

  return (
    <div
      ref={printRef}
      id={printRef ? 'poster-print' : undefined}
      className={`${animated ? 'template-renderer template-renderer--animated' : 'template-renderer'} ${editable ? 'template-renderer--editable' : ''}`}
      style={{ '--poster-width': `${tamaño.widthMm}mm`, '--poster-height': `${tamaño.heightMm}mm`, ...getPositionVars(poster.positions) }}
      onMouseDown={startDrag}
      onMouseMove={moveDrag}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
    >
      <Template producto={poster.productName} precio={poster.price} mensaje={poster.tagline} logo={poster.logo} tamaño={tamaño} />
    </div>
  );
}
