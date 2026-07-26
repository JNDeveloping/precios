import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ControlPanel } from '../components/ControlPanel.jsx';
import { OfferPoster, PrintablePoster } from '../components/OfferPoster.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { exportPosterPdf, expandCopies } from '../utils/pdf.js';
import { createId } from '../utils/id.js';
import { DEFAULT_POSTER } from '../utils/posterOptions.js';
import { SmartLoadPanel } from '../components/intelligent/SmartLoadPanel.jsx';
import { BarcodeScannerModal } from '../components/intelligent/BarcodeScannerModal.jsx';
import { FavoritesPanel } from '../components/intelligent/FavoritesPanel.jsx';
import { ProductsPage } from './ProductsPage.jsx';
import { useProductsDb } from '../hooks/useProductsDb.js';
import { useRecognizedProduct } from '../services/intelligentLoadService.js';

export default function App() {
  const [storedSize, setStoredSize] = useLocalStorage('last-poster-size', DEFAULT_POSTER.size);
  const [poster, setPoster] = useState({ ...DEFAULT_POSTER, size: storedSize });
  const [savedPosters, setSavedPosters] = useState([]);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [pendingBarcode, setPendingBarcode] = useState('');
  const { favorites, refresh: refreshProducts } = useProductsDb();
  const printRef = useRef(null);
  const batchRef = useRef(null);

  const updatePoster = (nextPoster) => {
    setPoster({ ...nextPoster, copies: Math.max(1, Number(nextPoster.copies) || 1) });
    setStoredSize(nextPoster.size);
  };

  const postersToExport = useMemo(() => (savedPosters.length ? savedPosters : [poster]), [poster, savedPosters]);
  const expandedPosters = useMemo(() => expandCopies(postersToExport), [postersToExport]);

  const handleSave = () => {
    setSavedPosters((current) => [...current, { ...poster, id: createId() }]);
  };

  const handleRemoveSaved = (id) => {
    setSavedPosters((current) => current.filter((item) => item.id !== id));
  };

  const handleExport = useCallback(async () => {
    if (!batchRef.current) return;
    await exportPosterPdf(batchRef.current, poster.size, postersToExport);
    setSavedPosters([]);
  }, [poster.size, postersToExport]);

  const handlePrint = useCallback(() => window.print(), []);

  const handlePositionChange = useCallback((key, position) => {
    setPoster((current) => ({
      ...current,
      positions: {
        ...(current.positions ?? {}),
        [key]: position,
      },
    }));
  }, []);

  const applyProductToPoster = useCallback(async (product) => {
    const usedProduct = await useRecognizedProduct(product, poster);
    setPoster((current) => ({
      ...current,
      productName: usedProduct.name,
      brand: usedProduct.brand,
      category: usedProduct.category,
      unit: usedProduct.unit,
      content: usedProduct.content,
      productImage: usedProduct.image,
      barcode: usedProduct.barcode || pendingBarcode,
      price: usedProduct.lastPrice || current.price,
      templateId: usedProduct.lastTemplateId || current.templateId,
    }));
    await refreshProducts();
  }, [pendingBarcode, poster, refreshProducts]);

  const handleProductDetected = useCallback((product) => {
    applyProductToPoster({ ...product, barcode: product.barcode || pendingBarcode });
  }, [applyProductToPoster, pendingBarcode]);

  const handleClear = () => updatePoster({ ...DEFAULT_POSTER, size: poster.size, templateId: poster.templateId, productName: '', price: '', copies: 1, brand: '', category: '', unit: '', content: '', productImage: '', barcode: '' });

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'p') {
        event.preventDefault();
        handlePrint();
      }
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        handleExport();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleExport, handlePrint]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f5f5] px-3 py-4 text-gray-900 sm:px-6 sm:py-6 lg:px-10">
      <div className="mx-auto grid w-full max-w-7xl gap-4 sm:gap-6 lg:grid-cols-[minmax(360px,460px)_minmax(0,1fr)] lg:items-start">
        <div>
          <ControlPanel poster={poster} savedPosters={savedPosters} onChange={updatePoster} onClear={handleClear} onExport={handleExport} onPrint={handlePrint} onSave={handleSave} onRemoveSaved={handleRemoveSaved} />
          <SmartLoadPanel onProductDetected={handleProductDetected} onOpenScanner={() => setScannerOpen(true)} />
        </div>
        <OfferPoster poster={poster} printRef={printRef} onPositionChange={handlePositionChange} />
      </div>

      <FavoritesPanel products={favorites} onUseProduct={applyProductToPoster} />
      <ProductsPage onUseProduct={applyProductToPoster} />

      <BarcodeScannerModal open={scannerOpen} onClose={() => setScannerOpen(false)} onFound={applyProductToPoster} onNeedPhoto={setPendingBarcode} />

      <footer className="no-print mx-auto mt-8 max-w-7xl rounded-3xl bg-white px-6 py-4 text-center text-sm font-extrabold tracking-wide text-gray-600 shadow-sm">
        Web Desarrollada por Tomas Victola
      </footer>

      <div className="export-batch pointer-events-none fixed -left-[9999px] top-0" aria-hidden="true">
        <div ref={batchRef}>
          {expandedPosters.map((item, index) => <PrintablePoster key={`${item.id ?? 'actual'}-${index}`} poster={item} />)}
        </div>
      </div>
    </main>
  );
}
