import { Download, Printer, RotateCcw, Sparkles } from 'lucide-react';
import { SIZES, STAMP_COLORS, TAGLINES } from '../utils/posterOptions.js';

// Panel de carga optimizado para operar rápido desde teclado o mouse.
export function ControlPanel({ poster, onChange, onClear, onExport, onPrint }) {
  const update = (field) => (event) => onChange({ ...poster, [field]: event.target.value });

  return (
    <section className="rounded-[2rem] bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] lg:p-8">
      <div className="mb-8 flex items-start gap-3">
        <div className="rounded-2xl bg-red-600 p-3 text-white shadow-lg shadow-red-200">
          <Sparkles size={24} />
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-red-600">Carteles promo</p>
          <h1 className="mt-1 text-3xl font-black tracking-tight text-gray-950">Generador de ofertas</h1>
          <p className="mt-2 text-sm leading-6 text-gray-500">Completá los datos y exportá un cartel A4 o A5 listo para imprimir.</p>
        </div>
      </div>

      <div className="space-y-5">
        <label className="block">
          <span className="text-sm font-bold text-gray-700">Nombre del producto</span>
          <input className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100" value={poster.productName} onChange={update('productName')} placeholder="Ej: Café molido 500 g" />
        </label>

        <label className="block">
          <span className="text-sm font-bold text-gray-700">Precio</span>
          <input className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-2xl font-black outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100" value={poster.price} onChange={update('price')} placeholder="Ej: 2.499" />
        </label>

        <div>
          <span className="text-sm font-bold text-gray-700">Tamaño</span>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {Object.values(SIZES).map((size) => (
              <label key={size.label} className={`cursor-pointer rounded-2xl border p-4 text-center font-black transition ${poster.size === size.label ? 'border-red-600 bg-red-50 text-red-700 ring-4 ring-red-100' : 'border-gray-200 bg-gray-50 text-gray-600'}`}>
                <input className="sr-only" type="radio" name="size" value={size.label} checked={poster.size === size.label} onChange={update('size')} />
                {size.label}
              </label>
            ))}
          </div>
        </div>

        <label className="block">
          <span className="text-sm font-bold text-gray-700">Texto llamativo</span>
          <select className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100" value={poster.tagline} onChange={update('tagline')}>
            {TAGLINES.map((tagline) => <option key={tagline}>{tagline}</option>)}
          </select>
        </label>

        <label className="block">
          <span className="text-sm font-bold text-gray-700">Color del sello</span>
          <select className="mt-2 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-100" value={poster.stampColor} onChange={update('stampColor')}>
            {Object.entries(STAMP_COLORS).map(([key, color]) => <option key={key} value={key}>{color.label}</option>)}
          </select>
        </label>
      </div>

      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-4 py-3 font-black text-white shadow-lg shadow-red-200 transition hover:bg-red-700" onClick={onExport}><Download size={18} /> PDF</button>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gray-950 px-4 py-3 font-black text-white transition hover:bg-gray-800" onClick={onPrint}><Printer size={18} /> Imprimir</button>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 font-black text-gray-700 transition hover:bg-gray-50" onClick={onClear}><RotateCcw size={18} /> Limpiar</button>
      </div>
    </section>
  );
}
