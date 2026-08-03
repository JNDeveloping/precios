import { useState } from 'react';
import { Download, ImagePlus, Move, Plus, Printer, RotateCcw, Save, Sparkles, Star, Trash2, X } from 'lucide-react';
import { BORDER_COLORS, DEFAULT_POSITIONS, DEFAULT_POSTER, SIZES, STAMP_COLORS, STAMP_SHAPES, TAGLINES, TEMPLATES } from '../utils/posterOptions.js';
import { removeFlatBackground } from '../utils/image.js';

// Panel de carga optimizado para operar rápido desde teclado o mouse.
export function ControlPanel({ poster, savedPosters, onChange, onClear, onExport, onPrint, onSave, onRemoveSaved }) {
  const [templateFilter, setTemplateFilter] = useState('all');
  const [processingImage, setProcessingImage] = useState(false);
  const update = (field) => (event) => onChange({ ...poster, [field]: event.target.value });
  const updateStampPreset = (event) => {
    const key = event.target.value;
    const color = STAMP_COLORS[key];
    onChange({ ...poster, stampColor: key, stampStartColor: color.startHex, stampEndColor: color.endHex, stampTextColor: color.textHex });
  };
  const updateBorderPreset = (event) => {
    const key = event.target.value;
    onChange({ ...poster, borderColor: key, borderCustomColor: BORDER_COLORS[key].hex });
  };
  const updateTemplate = (key) => {
    const template = TEMPLATES[key];
    onChange({ ...poster, template: key, ...(template.offerLabel && { offerLabel: template.offerLabel }), ...(template.tagline && { tagline: template.tagline }), ...(template.stampShape && { stampShape: template.stampShape }), ...template.colors });
  };
  const updateImage = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      const originalProductImage = reader.result;
      setProcessingImage(poster.removeImageBackground);
      const productImage = poster.removeImageBackground ? await removeFlatBackground(originalProductImage) : originalProductImage;
      onChange({ ...poster, originalProductImage, productImage });
      setProcessingImage(false);
    };
    reader.readAsDataURL(file);
  };
  const toggleBackgroundRemoval = async (event) => {
    const removeImageBackground = event.target.checked;
    const original = poster.originalProductImage || poster.productImage;
    if (!original) return onChange({ ...poster, removeImageBackground });
    setProcessingImage(true);
    const productImage = removeImageBackground ? await removeFlatBackground(original) : original;
    onChange({ ...poster, removeImageBackground, productImage });
    setProcessingImage(false);
  };
  const visibleTemplates = Object.entries(TEMPLATES).filter(([, template]) => templateFilter === 'all' || (templateFilter === 'favorites' ? template.favorite : template.category === templateFilter));
  const inputClass = 'mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100';
  const colorFields = [
    ['posterBackground', 'Fondo de la hoja'], ['innerBorderColor', 'Borde interior'],
    ['borderCustomColor', 'Borde exterior'], ['offerBackground', 'Fondo de OFERTA'],
    ['offerTextColor', 'Texto de OFERTA'], ['offerShadowColor', 'Sombra de OFERTA'],
    ['stampStartColor', 'Inicio del sello'], ['stampEndColor', 'Final del sello'],
    ['stampTextColor', 'Texto del sello'], ['stampBackdropColor', 'Fondo detrás del sello'],
    ['priceColor', 'Precio'], ['productTextColor', 'Nombre del producto'],
  ];

  return (
    <section className="no-print rounded-[2rem] bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] lg:p-8">
      <div className="mb-8 flex items-start gap-3">
        <div className="rounded-2xl bg-red-600 p-3 text-white shadow-lg shadow-red-200"><Sparkles size={24} /></div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-600">Carteles promo</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-gray-950">Generador de ofertas</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">Editá todos los textos del cartel, guardá productos y exportá copias en lote.</p>
        </div>
      </div>

      <div className="space-y-5">
        <label className="block"><span className="text-sm font-bold text-gray-700">Nombre del negocio</span><input className={inputClass} value={poster.businessName || ''} onChange={update('businessName')} placeholder="El Rincon De Los Nietos" /></label>
        <label className="block"><span className="text-sm font-bold text-gray-700">Texto del cartel rojo</span><input className={inputClass} value={poster.offerLabel} onChange={update('offerLabel')} placeholder="OFERTA" /></label>
        <label className="block"><span className="text-sm font-bold text-gray-700">Nombre del producto</span><input className={inputClass} value={poster.productName} onChange={update('productName')} placeholder="Ej: Café molido 500 g" /></label>
        <div className="rounded-3xl border border-gray-200 p-4"><span className="text-sm font-bold text-gray-700">Imagen del producto <span className="font-normal text-gray-400">(opcional)</span></span><label className="mt-2 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-4 py-4 font-bold text-gray-600 transition hover:border-red-300 hover:bg-red-50"><ImagePlus size={19} /> {processingImage ? 'Procesando…' : poster.productImage ? 'Cambiar imagen' : 'Agregar imagen'}<input className="sr-only" type="file" accept="image/png,image/jpeg,image/webp" onChange={updateImage} disabled={processingImage} /></label>
          <label className="mt-4 flex cursor-pointer items-center gap-3 rounded-2xl bg-gray-50 p-3 text-sm font-bold text-gray-700"><input type="checkbox" className="h-5 w-5 accent-red-600" checked={Boolean(poster.removeImageBackground)} onChange={toggleBackgroundRemoval} disabled={!poster.productImage || processingImage} /> Quitar fondo automáticamente</label>
          {poster.productImage && <><label className="mt-4 block"><span className="flex justify-between text-xs font-bold text-gray-600"><span>Tamaño de la imagen</span><span>{poster.imageScale || 100}%</span></span><input className="mt-2 w-full accent-red-600" type="range" min="30" max="180" step="5" value={poster.imageScale || 100} onChange={update('imageScale')} /></label><button type="button" onClick={() => onChange({ ...poster, productImage: '', originalProductImage: '', removeImageBackground: false })} className="mt-3 inline-flex items-center gap-1 text-xs font-black text-red-600"><X size={14} /> Quitar imagen</button></>}
          <p className="mt-3 text-xs leading-5 text-gray-400">La eliminación funciona mejor con fondos lisos y se procesa localmente.</p>
        </div>
        <label className="block"><span className="text-sm font-bold text-gray-700">Precio</span><input className={`${inputClass} text-2xl font-black`} value={poster.price} onChange={update('price')} placeholder="Ej: 2.499" /></label>

        <div>
          <span className="text-sm font-bold text-gray-700">Tamaño</span>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {Object.values(SIZES).map((size) => (
              <label key={size.label} className={`cursor-pointer rounded-2xl border p-4 text-center font-black transition ${poster.size === size.label ? 'border-red-600 bg-red-50 text-red-700 ring-4 ring-red-100' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>
                <input className="sr-only" type="radio" name="size" value={size.label} checked={poster.size === size.label} onChange={update('size')} />{size.label}
              </label>
            ))}
          </div>
        </div>

        <label className="block"><span className="text-sm font-bold text-gray-700">Texto llamativo</span><input className={inputClass} list="tagline-options" value={poster.tagline} onChange={update('tagline')} /><datalist id="tagline-options">{TAGLINES.map((tagline) => <option key={tagline} value={tagline} />)}</datalist></label>
        <label className="block"><span className="text-sm font-bold text-gray-700">Paleta rápida del sello</span><select className={inputClass} value={poster.stampColor} onChange={updateStampPreset}>{Object.entries(STAMP_COLORS).map(([key, color]) => <option key={key} value={key}>{color.label}</option>)}</select></label>
        <label className="block"><span className="text-sm font-bold text-gray-700">Forma del sello</span><select className={inputClass} value={poster.stampShape} onChange={update('stampShape')}>{Object.entries(STAMP_SHAPES).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
        <label className="block"><span className="text-sm font-bold text-gray-700">Paleta rápida del borde</span><select className={inputClass} value={poster.borderColor} onChange={updateBorderPreset}>{Object.entries(BORDER_COLORS).map(([key, color]) => <option key={key} value={key}>{color.label}</option>)}</select></label>
        <fieldset className="rounded-3xl border border-gray-200 p-4">
          <legend className="px-2 text-sm font-black text-gray-800">Colores personalizados</legend>
          <p className="mb-4 text-xs leading-5 text-gray-500">Elegí cualquier color para cada fondo, texto y accesorio del cartel.</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {colorFields.map(([field, label]) => (
              <label key={field} className="flex items-center gap-3 rounded-2xl bg-gray-50 p-3">
                <input aria-label={label} className="h-10 w-12 cursor-pointer rounded-lg border border-gray-200 bg-transparent p-1" type="color" value={poster[field] || DEFAULT_POSTER[field]} onChange={update(field)} />
                <span className="text-xs font-bold text-gray-700">{label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <div className="rounded-2xl bg-blue-50 p-4 text-sm leading-6 text-blue-900"><div className="flex items-center gap-2 font-black"><Move size={17} /> Objetos movibles</div>Arrastrá el negocio, textos, precio, sello e imagen directamente sobre la vista previa.<button type="button" className="mt-2 block font-black text-blue-700 underline" onClick={() => onChange({ ...poster, positions: DEFAULT_POSITIONS })}>Restablecer posiciones</button></div>
        <label className="block"><span className="text-sm font-bold text-gray-700">Copias del producto actual</span><input className={inputClass} min="1" type="number" value={poster.copies} onChange={update('copies')} /></label>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 font-black text-white shadow-lg shadow-red-200 transition hover:bg-red-700" onClick={onExport}><Download size={18} /> PDF</button>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 font-black text-white shadow-lg shadow-emerald-100 transition hover:bg-emerald-700" onClick={onSave}><Save size={18} /> Guardar</button>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-950 px-4 py-3 font-black text-white transition hover:bg-gray-800" onClick={onPrint}><Printer size={18} /> Imprimir</button>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 font-black text-gray-700 transition hover:bg-gray-50" onClick={onClear}><RotateCcw size={18} /> Limpiar</button>
      </div>

      <div className="mt-8 rounded-3xl border border-gray-100 bg-gray-50 p-4">
        <div className="mb-3 flex items-center gap-2 font-black text-gray-800"><Plus size={18} /> Productos guardados ({savedPosters.length})</div>
        <div className="space-y-2">
          {savedPosters.length === 0 && <p className="text-sm text-gray-500">Guardá uno o más productos para generar un PDF multipágina.</p>}
          {savedPosters.map((item) => (
            <div key={item.id} className="flex items-center justify-between gap-3 rounded-2xl bg-white px-3 py-2 text-sm shadow-sm">
              <span className="truncate font-bold">{item.productName || 'Sin nombre'} · ${item.price || '0'} · x{item.copies || 1}</span>
              <button className="rounded-xl p-2 text-red-600 hover:bg-red-50" onClick={() => onRemoveSaved(item.id)} aria-label="Eliminar producto guardado"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 border-t border-gray-100 pt-8">
        <div className="mb-4 flex items-center justify-between"><div><h2 className="text-xl font-black text-gray-950">Elegí una plantilla</h2><p className="mt-1 text-xs text-gray-500">Aplicá un diseño completo al terminar de cargar el producto.</p></div><span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-bold text-gray-500">{Object.keys(TEMPLATES).length} diseños</span></div>
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {[['all', 'Todos'], ['favorites', '★ Favoritos'], ['new', '▣ Nuevas'], ['offers', '● Ofertas']].map(([key, label]) => <button type="button" key={key} onClick={() => setTemplateFilter(key)} className={`whitespace-nowrap rounded-full px-3 py-2 text-xs font-black transition ${templateFilter === key ? 'bg-gray-950 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{label}</button>)}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {visibleTemplates.map(([key, template], index) => <button type="button" key={key} onClick={() => updateTemplate(key)} className={`group text-left ${poster.template === key ? 'text-red-600' : 'text-gray-700'}`}>
            <div className={`relative aspect-[3/4] overflow-hidden rounded-[1.25rem] border-2 shadow-sm transition group-hover:-translate-y-1 group-hover:shadow-lg ${poster.template === key ? 'border-red-500 ring-4 ring-red-100' : 'border-gray-200'}`} style={{ backgroundColor: template.colors.posterBackground }}>
              {template.favorite && <Star size={14} className="absolute right-2 top-2 z-20 fill-yellow-400 text-yellow-500" />}
              <div className={`absolute h-2/5 w-full ${index % 2 ? 'top-0 -skew-y-6' : 'bottom-0 skew-y-6'}`} style={{ backgroundColor: template.colors.innerBorderColor }} />
              <div className="absolute left-0 top-[12%] h-4 w-4/5" style={{ backgroundColor: template.colors.offerBackground }} />
              <div className="absolute left-1/2 top-[38%] h-10 w-20 -translate-x-1/2 rounded-full" style={{ background: `linear-gradient(135deg, ${template.colors.stampStartColor}, ${template.colors.stampEndColor})` }} />
              <div className="absolute left-1/2 top-[64%] h-5 w-3/4 -translate-x-1/2 rounded" style={{ backgroundColor: template.colors.priceColor }} />
              <div className="absolute bottom-[12%] left-1/2 h-2 w-2/3 -translate-x-1/2 rounded bg-gray-800" />
            </div><span className="mt-2 block truncate text-xs font-black">{template.label}</span><span className="block truncate text-[10px] text-gray-400">{template.description}</span>
          </button>)}
        </div>
      </div>
    </section>
  );
}
