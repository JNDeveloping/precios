import { useMemo, useState } from 'react';
import { SIZES } from '../utils/posterOptions.js';
import { TEMPLATE_CATEGORIES, TEMPLATE_META } from '../templates/templateRegistry.js';

const thumbnailPoster = {
  productName: 'Yerba mate',
  price: '1.999',
  tagline: 'Oferta especial',
  logo: 'Market',
  size: 'A4',
};

export function TemplateSelector({ selectedTemplate, onSelect }) {
  const [category, setCategory] = useState('todos');
  const filteredTemplates = useMemo(() => (
    category === 'todos' ? TEMPLATE_META : TEMPLATE_META.filter((template) => template.categories.includes(category))
  ), [category]);

  return (
    <section className="mt-8 rounded-[2rem] border border-gray-100 bg-gray-50 p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-red-600">Diseño</p>
          <h2 className="text-xl font-black text-gray-950">Elegí una plantilla</h2>
        </div>
        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-gray-500 shadow-sm">{filteredTemplates.length} diseños</span>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
        {TEMPLATE_CATEGORIES.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`shrink-0 rounded-full px-3 py-2 text-xs font-black transition ${category === item.id ? 'bg-gray-950 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
            onClick={() => setCategory(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {filteredTemplates.map((template) => {
          const Template = template.component;
          const isSelected = selectedTemplate === template.id;
          return (
            <button
              key={template.id}
              type="button"
              className={`group rounded-3xl border bg-white p-2 text-left transition duration-300 hover:-translate-y-1 hover:shadow-xl ${isSelected ? 'border-red-600 ring-4 ring-red-100 shadow-xl' : 'border-gray-200'}`}
              onClick={() => onSelect(template.id)}
              aria-pressed={isSelected}
            >
              <div className="aspect-[210/297] overflow-hidden rounded-2xl bg-gray-100 shadow-inner">
                <div className="thumbnail-scale origin-top-left">
                  <Template producto={thumbnailPoster.productName} precio={thumbnailPoster.price} mensaje={thumbnailPoster.tagline} logo={thumbnailPoster.logo} tamaño={SIZES.A4} />
                </div>
              </div>
              <div className="px-2 pb-2 pt-3">
                <p className="truncate text-sm font-black text-gray-950">{template.name}</p>
                <p className="mt-1 truncate text-[11px] font-bold uppercase tracking-wide text-gray-400">{template.categories.map((tag) => `#${tag}`).join(' ')}</p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
