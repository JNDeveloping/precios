import { Download, Plus, Printer, RotateCcw, Save, Sparkles, Trash2, X } from 'lucide-react';
import { TemplateSelector } from './TemplateSelector.jsx';
import { BORDER_COLORS, SIZES, STAMP_COLORS, STAMP_SHAPES, TAGLINES } from '../utils/posterOptions.js';

// Panel de carga optimizado para operar rápido desde teclado o mouse.
export function ControlPanel({ poster, savedPosters, onChange, onClear, onExport, onPrint, onSave, onRemoveSaved }) {
  const update = (field) => (event) => onChange({ ...poster, [field]: event.target.value });
  const isCombo = poster.templateId === 'combo';
  const comboProducts = poster.comboProducts?.length ? poster.comboProducts : [''];
  const productLabel = isCombo ? 'Producto principal del combo' : 'Nombre del producto';
  const productPlaceholder = isCombo ? 'Ej: Combo para la merienda' : 'Ej: Café molido 500 g';
  const inputClass = 'mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100';
  const updateComboProduct = (index, value) => onChange({ ...poster, comboProducts: comboProducts.map((item, itemIndex) => (itemIndex === index ? value : item)) });
  const addComboProduct = () => onChange({ ...poster, comboProducts: [...comboProducts, ''] });
  const removeComboProduct = (index) => onChange({ ...poster, comboProducts: comboProducts.filter((_, itemIndex) => itemIndex !== index) });

  return (
    <section className="no-print rounded-[1.5rem] bg-white p-4 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:rounded-[2rem] sm:p-6 lg:p-8">
      <div className="mb-8 flex items-start gap-3">
        <div className="rounded-2xl bg-red-600 p-3 text-white shadow-lg shadow-red-200"><Sparkles size={24} /></div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-600">Carteles promo</p>
          <h1 className="mt-1 text-2xl font-black tracking-tight text-gray-950 sm:text-3xl">Generador de ofertas</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">Editá textos, elegí un diseño de almacén y mové elementos en la previsualización con el mouse.</p>
        </div>
      </div>

      <div className="space-y-5">
        <label className="block"><span className="text-sm font-bold text-gray-700">Texto del cartel rojo</span><input className={inputClass} value={poster.offerLabel} onChange={update('offerLabel')} placeholder="OFERTA" /></label>
        <label className="block"><span className="text-sm font-bold text-gray-700">{productLabel}</span><input className={inputClass} value={poster.productName} onChange={update('productName')} placeholder={productPlaceholder} /></label>
        {isCombo && (
          <div className="rounded-3xl border border-orange-100 bg-orange-50 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <span className="text-sm font-black uppercase tracking-wide text-orange-700">Productos del combo</span>
              <button type="button" className="inline-flex items-center gap-1 rounded-full bg-orange-600 px-3 py-2 text-xs font-black text-white shadow-sm transition hover:bg-orange-700" onClick={addComboProduct}><Plus size={14} /> Agregar</button>
            </div>
            <div className="space-y-2">
              {comboProducts.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input className={inputClass} value={item} onChange={(event) => updateComboProduct(index, event.target.value)} placeholder={`Producto ${index + 1}`} />
                  {comboProducts.length > 1 && <button type="button" className="mt-2 rounded-2xl bg-white p-3 text-red-600 shadow-sm transition hover:bg-red-50" onClick={() => removeComboProduct(index)} aria-label="Quitar producto del combo"><X size={18} /></button>}
                </div>
              ))}
            </div>
          </div>
        )}
        <label className="block"><span className="text-sm font-bold text-gray-700">Precio</span><input className={`${inputClass} text-2xl font-black`} value={poster.price} onChange={update('price')} placeholder="Ej: 2.499" /></label>
        <label className="block"><span className="text-sm font-bold text-gray-700">Logo / marca</span><input className={inputClass} value={poster.logo || ''} onChange={update('logo')} placeholder="Ej: El Rincon De Los Nietos" /></label>

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

        <label className="block"><span className="text-sm font-bold text-gray-700">Texto llamativo</span><select className={inputClass} value={poster.tagline} onChange={update('tagline')}>{TAGLINES.map((tagline) => <option key={tagline}>{tagline}</option>)}</select></label>
        <label className="block"><span className="text-sm font-bold text-gray-700">Color del sello</span><select className={inputClass} value={poster.stampColor} onChange={update('stampColor')}>{Object.entries(STAMP_COLORS).map(([key, color]) => <option key={key} value={key}>{color.label}</option>)}</select></label>
        <label className="block"><span className="text-sm font-bold text-gray-700">Forma del sello</span><select className={inputClass} value={poster.stampShape} onChange={update('stampShape')}>{Object.entries(STAMP_SHAPES).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
        <label className="block"><span className="text-sm font-bold text-gray-700">Color del borde</span><select className={inputClass} value={poster.borderColor} onChange={update('borderColor')}>{Object.entries(BORDER_COLORS).map(([key, color]) => <option key={key} value={key}>{color.label}</option>)}</select></label>
        <label className="block"><span className="text-sm font-bold text-gray-700">Copias del producto actual</span><input className={inputClass} min="1" type="number" value={poster.copies} onChange={update('copies')} /></label>
      </div>

      <TemplateSelector selectedTemplate={poster.templateId} onSelect={(templateId) => onChange({ ...poster, templateId })} />

      <div className="mt-8 grid gap-3 min-[420px]:grid-cols-2">
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
    </section>
  );
}
