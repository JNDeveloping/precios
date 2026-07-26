import { Star } from 'lucide-react';
import { ProductCard } from './ProductCard.jsx';

export function FavoritesPanel({ products, onUseProduct }) {
  return (
    <section className="no-print mt-8 rounded-[2rem] bg-white p-5 shadow-[0_20px_70px_rgba(15,23,42,0.08)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-black text-gray-950"><Star className="mr-2 inline text-yellow-500" /> Favoritos</h2>
        <span className="rounded-full bg-yellow-50 px-3 py-1 text-xs font-black text-yellow-700">Top 20</span>
      </div>
      <div className="grid gap-3 xl:grid-cols-2">
        {products.map((product) => <ProductCard key={product.id} product={product} compact onUse={onUseProduct} />)}
        {!products.length && <p className="rounded-3xl bg-gray-50 p-5 text-sm font-bold text-gray-500">Los productos más usados aparecerán acá.</p>}
      </div>
    </section>
  );
}
