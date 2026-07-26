import { Calendar, ImageIcon, PackageCheck, Star } from 'lucide-react';

export function ProductCard({ product, onUse, onEdit, onDelete, compact = false }) {
  return (
    <article className="flex gap-3 rounded-3xl border border-gray-100 bg-white p-3 shadow-sm">
      <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-gray-100">
        {product.image ? <img src={product.image} alt={product.name} className="h-full w-full object-cover" /> : <ImageIcon className="text-gray-400" />}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-black text-gray-950">{product.name}</h3>
        <p className="truncate text-xs font-bold text-gray-500">{product.brand || 'Sin marca'} · {product.category || 'Sin categoría'}</p>
        <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-black text-gray-500">
          {product.content && <span className="rounded-full bg-gray-100 px-2 py-1">{product.content}</span>}
          {product.barcode && <span className="rounded-full bg-gray-100 px-2 py-1">{product.barcode}</span>}
          <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2 py-1 text-yellow-700"><Star size={12} /> {product.usedCount || 0}</span>
          {!compact && product.updatedAt && <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-blue-700"><Calendar size={12} /> {new Date(product.updatedAt).toLocaleDateString()}</span>}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" onClick={() => onUse(product)} className="inline-flex items-center gap-1 rounded-xl bg-emerald-600 px-3 py-2 text-xs font-black text-white"><PackageCheck size={14} /> Usar nuevamente</button>
          {onEdit && <button type="button" onClick={() => onEdit(product)} className="rounded-xl bg-gray-100 px-3 py-2 text-xs font-black text-gray-700">Editar</button>}
          {onDelete && <button type="button" onClick={() => onDelete(product.id)} className="rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-600">Eliminar</button>}
        </div>
      </div>
    </article>
  );
}
