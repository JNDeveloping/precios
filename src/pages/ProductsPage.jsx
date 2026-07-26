import { useState } from 'react';
import { Database, Search } from 'lucide-react';
import { ProductCard } from '../components/intelligent/ProductCard.jsx';
import { useProductsDb } from '../hooks/useProductsDb.js';

export function ProductsPage({ onUseProduct }) {
  const { products, query, search, remove, update } = useProductsDb();
  const [editing, setEditing] = useState(null);

  const changeEditing = (field, value) => setEditing((current) => ({ ...current, [field]: value }));

  return (
    <section className="no-print mt-8 rounded-[2rem] bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-indigo-600">Base local</p>
          <h2 className="text-2xl font-black text-gray-950"><Database className="mr-2 inline" /> Productos</h2>
        </div>
        <label className="flex min-w-[260px] items-center gap-2 rounded-2xl bg-gray-50 px-4 py-3">
          <Search size={18} className="text-gray-400" />
          <input value={query} onChange={(event) => search(event.target.value)} placeholder="Buscar producto, marca o código" className="w-full bg-transparent text-sm font-bold outline-none" />
        </label>
      </div>

      {editing && (
        <div className="mt-5 grid gap-3 rounded-3xl border border-indigo-100 bg-indigo-50 p-4 md:grid-cols-2">
          {['name', 'brand', 'category', 'barcode', 'content', 'unit'].map((field) => (
            <label key={field} className="text-xs font-black uppercase tracking-wide text-gray-600">{field}
              <input value={editing[field] || ''} onChange={(event) => changeEditing(field, event.target.value)} className="mt-2 w-full rounded-2xl border border-white bg-white px-4 py-3 text-sm normal-case outline-none" />
            </label>
          ))}
          <div className="md:col-span-2 flex gap-2">
            <button type="button" onClick={() => update(editing).then(() => setEditing(null))} className="rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-black text-white">Guardar cambios</button>
            <button type="button" onClick={() => setEditing(null)} className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-gray-700">Cancelar</button>
          </div>
        </div>
      )}

      <div className="mt-5 grid gap-3 xl:grid-cols-2">
        {products.map((product) => <ProductCard key={product.id} product={product} onUse={onUseProduct} onEdit={setEditing} onDelete={remove} />)}
        {!products.length && <p className="rounded-3xl bg-gray-50 p-5 text-sm font-bold text-gray-500">Todavía no hay productos reconocidos.</p>}
      </div>
    </section>
  );
}
