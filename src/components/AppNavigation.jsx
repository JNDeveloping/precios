import { Asterisk, BadgeDollarSign, PanelsTopLeft, ShoppingBasket } from 'lucide-react';

export function AppNavigation({ section, onChange }) {
  return (
    <nav className="brand-nav no-print sticky top-0 z-50 border-b border-emerald-400/20 bg-[#07130d]/95 px-4 py-3 text-white shadow-[0_12px_40px_rgba(0,0,0,.28)] backdrop-blur sm:px-6">
      <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
        <div className="hidden items-center gap-3 sm:flex"><div className="grid h-11 w-11 place-items-center rounded-xl border border-lime-300/50 bg-lime-400 text-[#07130d] shadow-[0_0_24px_rgba(163,230,53,.3)]"><ShoppingBasket size={24} strokeWidth={2.7} /></div><div><p className="flex items-center gap-1 text-[11px] font-black uppercase tracking-[.24em] text-lime-400"><Asterisk size={13} /> El Rincón de los Nietos</p><p className="font-extrabold text-white">Estudio de promociones</p></div></div>
        <div className="flex w-full rounded-2xl border border-white/10 bg-white/[.06] p-1.5 sm:w-auto">
          <button onClick={() => onChange('posters')} className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black transition sm:flex-none ${section === 'posters' ? 'bg-lime-400 text-[#07130d] shadow-[0_8px_25px_rgba(163,230,53,.22)]' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}><BadgeDollarSign size={19} /> Carteles de precio</button>
          <button onClick={() => onChange('flyers')} className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black transition sm:flex-none ${section === 'flyers' ? 'bg-lime-400 text-[#07130d] shadow-[0_8px_25px_rgba(163,230,53,.22)]' : 'text-slate-300 hover:bg-white/10 hover:text-white'}`}><PanelsTopLeft size={19} /> Folletos</button>
        </div>
      </div>
    </nav>
  );
}
