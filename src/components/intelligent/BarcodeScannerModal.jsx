import { useEffect, useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';
import { findByBarcode } from '../../database/productDb.js';
import { scanBarcodeFromCamera } from '../../barcode/zxingScanner.js';

export function BarcodeScannerModal({ open, onClose, onFound, onNeedPhoto }) {
  const videoRef = useRef(null);
  const [message, setMessage] = useState('Preparando cámara...');

  useEffect(() => {
    if (!open || !videoRef.current) return undefined;
    let stop;
    scanBarcodeFromCamera(videoRef.current, async (barcode) => {
      setMessage(`📦 Código leído: ${barcode}`);
      const product = await findByBarcode(barcode);
      if (product) {
        onFound(product);
        onClose();
      } else {
        onNeedPhoto(barcode);
        setMessage('Código nuevo. Sacá una foto del producto para analizarlo con IA.');
      }
    }).then((stopper) => {
      stop = stopper;
      setMessage('Apuntá la cámara al EAN13 del producto.');
    }).catch((error) => setMessage(`⚠️ ${error.message}`));
    return () => stop?.();
  }, [open, onClose, onFound, onNeedPhoto]);

  if (!open) return null;
  return (
    <div className="no-print fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-2 sm:p-4">
      <div className="w-full max-w-xl rounded-[1.5rem] bg-white p-3 sm:rounded-[2rem] sm:p-4 shadow-2xl">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-black sm:text-xl text-gray-950"><Camera className="mr-2 inline" /> Escanear código</h2>
          <button type="button" onClick={onClose} className="rounded-full bg-gray-100 p-2"><X /></button>
        </div>
        <video ref={videoRef} className="aspect-video w-full rounded-3xl bg-gray-950 object-cover" muted playsInline />
        <p className="mt-3 rounded-2xl bg-gray-50 p-3 text-sm font-bold text-gray-600">{message}</p>
      </div>
    </div>
  );
}
