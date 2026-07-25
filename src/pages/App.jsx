import { useCallback, useEffect, useRef, useState } from 'react';
import { ControlPanel } from '../components/ControlPanel.jsx';
import { OfferPoster } from '../components/OfferPoster.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { exportPosterPdf } from '../utils/pdf.js';
import { DEFAULT_POSTER } from '../utils/posterOptions.js';

export default function App() {
  const [storedSize, setStoredSize] = useLocalStorage('last-poster-size', DEFAULT_POSTER.size);
  const [poster, setPoster] = useState({ ...DEFAULT_POSTER, size: storedSize });
  const printRef = useRef(null);

  const updatePoster = (nextPoster) => {
    setPoster(nextPoster);
    setStoredSize(nextPoster.size);
  };

  const handleExport = useCallback(() => {
    if (printRef.current) exportPosterPdf(printRef.current, poster.size, poster.productName);
  }, [poster.productName, poster.size]);

  const handlePrint = useCallback(() => window.print(), []);

  const handleClear = () => updatePoster({ ...DEFAULT_POSTER, size: poster.size, productName: '', price: '' });

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
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[420px_1fr] lg:items-start">
        <ControlPanel poster={poster} onChange={updatePoster} onClear={handleClear} onExport={handleExport} onPrint={handlePrint} />
        <OfferPoster poster={poster} printRef={printRef} />
      </div>
    </main>
  );
}
