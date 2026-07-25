import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ControlPanel } from '../components/ControlPanel.jsx';
import { OfferPoster, PrintablePoster } from '../components/OfferPoster.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { exportPosterPdf, expandCopies } from '../utils/pdf.js';
import { createId } from '../utils/id.js';
import { DEFAULT_POSTER } from '../utils/posterOptions.js';

export default function App() {
  const [storedSize, setStoredSize] = useLocalStorage('last-poster-size', DEFAULT_POSTER.size);
  const [poster, setPoster] = useState({ ...DEFAULT_POSTER, size: storedSize });
  const [savedPosters, setSavedPosters] = useState([]);
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

  const handleExport = useCallback(() => {
    if (batchRef.current) exportPosterPdf(batchRef.current, poster.size, postersToExport);
  }, [poster.size, postersToExport]);

  const handlePrint = useCallback(() => window.print(), []);

  const handleClear = () => updatePoster({ ...DEFAULT_POSTER, size: poster.size, productName: '', price: '', copies: 1 });

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
    <main className="min-h-screen bg-[#f5f5f5] px-4 py-6 text-gray-900 sm:px-6 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[460px_1fr] lg:items-start">
        <ControlPanel poster={poster} savedPosters={savedPosters} onChange={updatePoster} onClear={handleClear} onExport={handleExport} onPrint={handlePrint} onSave={handleSave} onRemoveSaved={handleRemoveSaved} />
        <OfferPoster poster={poster} printRef={printRef} />
      </div>

      <footer className="mx-auto mt-8 max-w-7xl rounded-3xl bg-white px-6 py-4 text-center text-sm font-extrabold tracking-wide text-gray-600 shadow-sm">
        Web Desarrollada por Tomas Victola
      </footer>

      <div className="pointer-events-none fixed -left-[9999px] top-0" aria-hidden="true">
        <div ref={batchRef}>
          {expandedPosters.map((item, index) => <PrintablePoster key={`${item.id ?? 'actual'}-${index}`} poster={item} />)}
        </div>
      </div>
    </main>
  );
}
