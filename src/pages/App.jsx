import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ControlPanel } from '../components/ControlPanel.jsx';
import { OfferPoster, PrintablePoster } from '../components/OfferPoster.jsx';
import { AppNavigation } from '../components/AppNavigation.jsx';
import { FlyerEditor } from '../components/FlyerEditor.jsx';
import { FlyerPreview } from '../components/FlyerPreview.jsx';
import { useLocalStorage } from '../hooks/useLocalStorage.js';
import { exportPosterPdf, expandCopies } from '../utils/pdf.js';
import { exportFlyerPdf } from '../utils/flyerPdf.js';
import { createId } from '../utils/id.js';
import { DEFAULT_FLYER } from '../utils/flyerOptions.js';
import { DEFAULT_POSTER } from '../utils/posterOptions.js';

export default function App() {
  const [section, setSection] = useState(() => new URLSearchParams(window.location.search).get('studio') === 'folletos' ? 'flyers' : 'posters');
  const [storedSize, setStoredSize] = useLocalStorage('last-poster-size', DEFAULT_POSTER.size);
  const [poster, setPoster] = useState({ ...DEFAULT_POSTER, size: storedSize });
  const [flyer, setFlyer] = useState(DEFAULT_FLYER);
  const [savedPosters, setSavedPosters] = useState([]);
  const printRef = useRef(null);
  const batchRef = useRef(null);
  const flyerRef = useRef(null);

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
  const handleFlyerExport = useCallback(() => exportFlyerPdf(flyerRef.current, flyer), [flyer]);

  const handlePositionChange = useCallback((element, position) => {
    setPoster((current) => ({ ...current, positions: { ...(current.positions || {}), [element]: position } }));
  }, []);

  const handleClear = () => updatePoster({ ...DEFAULT_POSTER, size: poster.size, productName: '', price: '', copies: 1 });

  const handleSectionChange = (nextSection) => {
    setSection(nextSection);
    const url = new URL(window.location.href);
    nextSection === 'flyers' ? url.searchParams.set('studio', 'folletos') : url.searchParams.delete('studio');
    window.history.replaceState({}, '', url);
  };

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'p') {
        event.preventDefault();
        handlePrint();
      }
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        section === 'flyers' ? handleFlyerExport() : handleExport();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleExport, handleFlyerExport, handlePrint, section]);

  return (
    <div className={`app-shell brand-shell ${section === 'flyers' ? 'flyer-mode' : 'poster-mode'} min-h-screen text-gray-900`}>
      <AppNavigation section={section} onChange={handleSectionChange} />
      <main className="px-4 py-6 sm:px-6 lg:px-10">
        {section === 'posters' ? <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[460px_1fr] lg:items-start">
          <ControlPanel poster={poster} savedPosters={savedPosters} onChange={updatePoster} onClear={handleClear} onExport={handleExport} onPrint={handlePrint} onSave={handleSave} onRemoveSaved={handleRemoveSaved} />
          <div className="lg:sticky lg:top-24"><OfferPoster poster={poster} printRef={printRef} onPositionChange={handlePositionChange} /></div>
        </div> : <div className="mx-auto grid max-w-[1500px] gap-6 xl:grid-cols-[560px_1fr] xl:items-start">
          <FlyerEditor flyer={flyer} onChange={setFlyer} onExport={handleFlyerExport} onPrint={handlePrint} onReset={() => setFlyer(DEFAULT_FLYER)} />
          <div className="xl:sticky xl:top-24"><FlyerPreview flyer={flyer} flyerRef={flyerRef} /></div>
        </div>}

        <footer className="brand-footer no-print mx-auto mt-8 flex max-w-7xl items-center justify-center gap-2 rounded-3xl border border-emerald-400/20 bg-[#07130d] px-6 py-4 text-center text-sm font-extrabold tracking-wide text-emerald-100 shadow-xl"><span className="h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_12px_#a3e635]" /> Web Desarrollada por Tomas Victola</footer>

        <div className="export-batch pointer-events-none fixed -left-[9999px] top-0" aria-hidden="true">
          <div ref={batchRef}>{expandedPosters.map((item, index) => <PrintablePoster key={`${item.id ?? 'actual'}-${index}`} poster={item} />)}</div>
        </div>
      </main>
    </div>
  );
}
