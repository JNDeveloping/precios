import { BadgeDollarSign, PanelsTopLeft } from 'lucide-react';

export function AppNavigation({ section, onChange }) {
  return (
    <nav className="no-print sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 px-4 py-3 shadow-sm backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
        <div className="hidden sm:block"><p className="text-xs font-black uppercase tracking-[.22em] text-red-600">El Rincón de los Nietos</p><p className="font-black text-slate-950">Estudio de promociones</p></div>
        <div className="flex w-full rounded-2xl bg-slate-100 p-1.5 sm:w-auto">
          <button onClick={() => onChange('posters')} className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black transition sm:flex-none ${section === 'posters' ? 'bg-white text-red-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}><BadgeDollarSign size={19} /> Carteles de precio</button>
          <button onClick={() => onChange('flyers')} className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black transition sm:flex-none ${section === 'flyers' ? 'bg-red-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}><PanelsTopLeft size={19} /> Folletos</button>
        </div>
      </div>
    </nav>
  );
}
