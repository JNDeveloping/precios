import { useRef, useState } from 'react';
import { Bot, Camera, FileImage, FolderOpen, Search, ScanBarcode, Zap } from 'lucide-react';
import { recognizeProductFromImage } from '../../services/intelligentLoadService.js';
import { searchProductsWithAiWeb } from '../../vision/productWebSearch.js';

export function SmartLoadPanel({ onProductDetected, onOpenScanner }) {
  const fileRef = useRef(null);
  const folderRef = useRef(null);
  const cameraRef = useRef(null);
  const [status, setStatus] = useState('Listo para reconocer productos.');
  const [busy, setBusy] = useState(false);
  const [suggestion, setSuggestion] = useState(null);
  const [nameQuery, setNameQuery] = useState('');
  const [nameResults, setNameResults] = useState([]);


  const handleNameSearch = async (event) => {
    event.preventDefault();
    const cleanQuery = nameQuery.trim();
    if (!cleanQuery) return;
    setBusy(true);
    setStatus('🌐 Buscando producto en la web con IA...');
    try {
      const results = await searchProductsWithAiWeb(cleanQuery);
      setNameResults(results.slice(0, 6));
      setStatus(results.length ? '✅ Producto encontrado en la web con IA.' : 'No encontré coincidencias web. Probá con una foto del envase.');
    } catch (error) {
      setStatus(`⚠️ ${error.message}`);
    } finally {
      setBusy(false);
    }
  };

  const handleFiles = async (files, batch = false) => {
    const list = [...files].filter((file) => file.type.startsWith('image/'));
    if (!list.length) return;
    setBusy(true);
    try {
      for (const file of list) {
        const result = await recognizeProductFromImage(file, { onStep: setStatus });
        if (result.status === 'cached') setStatus('✅ Producto encontrado. Usando información guardada.');
        if (result.candidates?.length) setSuggestion(result);
        else onProductDetected(result.product, result);
      }
      setStatus(batch ? '✅ Base creada/actualizada con imágenes importadas.' : '✅ Producto encontrado.');
    } catch (error) {
      setStatus(`⚠️ ${error.message}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="no-print mt-8 overflow-hidden rounded-[1.5rem] border border-indigo-100 bg-gradient-to-br from-indigo-950 via-slate-950 to-red-950 p-4 sm:rounded-[2rem] sm:p-5 text-white shadow-2xl">
      <div className="flex items-start gap-3">
        <div className="rounded-2xl bg-white/10 p-3"><Bot size={26} /></div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-indigo-200">Carga Inteligente IA</p>
          <h2 className="mt-1 text-xl font-black sm:text-2xl">🤖 Carga Inteligente</h2>
          <p className="mt-2 text-sm leading-6 text-white/70">Sacá una foto, subí imágenes, buscá en la web con IA o escaneá EAN13. La base local queda como cache para reutilizar resultados.</p>
        </div>
      </div>


      <form onSubmit={handleNameSearch} className="mt-5 rounded-3xl bg-white/10 p-3 ring-1 ring-white/10">
        <label className="text-xs font-black uppercase tracking-[0.2em] text-indigo-100">Buscar por nombre con IA / web</label>
        <div className="mt-2 flex flex-col gap-2 min-[420px]:flex-row">
          <input value={nameQuery} onChange={(event) => setNameQuery(event.target.value)} placeholder="Ej: Coca Cola 2.25" className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm font-bold text-slate-950 outline-none" />
          <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-500 px-4 py-3 text-sm font-black text-white transition hover:bg-indigo-600"><Search size={18} /> Buscar</button>
        </div>
        {nameResults.length > 0 && (
          <div className="mt-3 grid gap-2">
            {nameResults.map((product) => (
              <button key={product.id} type="button" onClick={() => onProductDetected(product)} className="rounded-2xl bg-white px-4 py-3 text-left text-sm font-black text-slate-950">
                {product.name} <span className="font-bold text-slate-500">· {product.brand || 'Sin marca'} · {product.category || 'sin categoría'}</span>
              </button>
            ))}
          </div>
        )}
      </form>

      <div className="mt-5 grid gap-3 min-[420px]:grid-cols-2">
        <button type="button" onClick={() => cameraRef.current?.click()} className="rounded-2xl bg-white px-4 py-3 font-black text-slate-950 transition hover:scale-[1.02]"><Camera className="mr-2 inline" size={18} /> Sacar foto</button>
        <button type="button" onClick={() => fileRef.current?.click()} className="rounded-2xl bg-white/10 px-4 py-3 font-black text-white ring-1 ring-white/15 transition hover:bg-white/15"><FileImage className="mr-2 inline" size={18} /> Subir imagen</button>
        <button type="button" onClick={onOpenScanner} className="rounded-2xl bg-orange-500 px-4 py-3 font-black text-white transition hover:bg-orange-600"><ScanBarcode className="mr-2 inline" size={18} /> Escanear código</button>
        <button type="button" onClick={() => folderRef.current?.click()} className="rounded-2xl bg-indigo-500 px-4 py-3 font-black text-white transition hover:bg-indigo-600"><FolderOpen className="mr-2 inline" size={18} /> Importar carpeta</button>
      </div>

      <button type="button" onClick={onOpenScanner} className="mt-3 w-full rounded-2xl bg-yellow-300 px-4 py-3 font-black text-slate-950 shadow-lg shadow-yellow-900/20 transition hover:bg-yellow-200"><Zap className="mr-2 inline" size={18} /> ⚡ Modo Express</button>
      <div className="mt-4 rounded-2xl bg-white/10 p-4 text-sm font-bold text-white/85">{busy ? <span className="animate-pulse">{status}</span> : status}</div>

      {suggestion && (
        <div className="mt-4 rounded-3xl bg-white p-4 text-slate-950">
          <p className="text-sm font-black">¿Quisiste decir este producto?</p>
          <div className="mt-3 grid gap-2">
            <button type="button" onClick={() => { onProductDetected(suggestion.product, suggestion); setSuggestion(null); }} className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-left text-sm font-black">Usar detectado: {suggestion.product.name}</button>
            {suggestion.candidates.map((candidate) => (
              <button key={candidate.id} type="button" onClick={() => { onProductDetected(candidate, suggestion); setSuggestion(null); }} className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-left text-sm font-black">Usar guardado: {candidate.name}</button>
            ))}
            <button type="button" onClick={() => setSuggestion(null)} className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white">Editar manualmente</button>
          </div>
        </div>
      )}

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(event) => handleFiles(event.target.files)} />
      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(event) => handleFiles(event.target.files)} />
      <input ref={folderRef} type="file" accept="image/*" multiple webkitdirectory="" className="hidden" onChange={(event) => handleFiles(event.target.files, true)} />
    </section>
  );
}
