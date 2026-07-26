import { useCallback, useEffect, useState } from 'react';
import { deleteProduct, getFavorites, getProducts, saveProduct, searchProducts } from '../database/productDb.js';

export function useProductsDb() {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [query, setQuery] = useState('');

  const refresh = useCallback(async () => {
    setProducts(await getProducts());
    setFavorites(await getFavorites(20));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const search = useCallback(async (nextQuery) => {
    setQuery(nextQuery);
    setProducts(nextQuery ? await searchProducts(nextQuery) : await getProducts());
  }, []);

  const remove = useCallback(async (id) => {
    await deleteProduct(id);
    await refresh();
  }, [refresh]);

  const update = useCallback(async (product) => {
    await saveProduct(product);
    await refresh();
  }, [refresh]);

  return { products, favorites, query, search, refresh, remove, update };
}
