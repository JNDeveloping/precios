import { OfertaClasica } from './OfertaClasica.jsx';
import { OfertaPremium } from './OfertaPremium.jsx';
import { Liquidacion } from './Liquidacion.jsx';
import { PrecioBajo } from './PrecioBajo.jsx';
import { NuevoIngreso } from './NuevoIngreso.jsx';
import { Combo } from './Combo.jsx';
import { BlackFriday } from './BlackFriday.jsx';
import { Mayorista } from './Mayorista.jsx';

export const TEMPLATE_CATEGORIES = [
  { id: 'todos', label: 'Todos' },
  { id: 'favoritos', label: '⭐ Favoritos' },
  { id: 'nuevos', label: '🆕 Nuevos' },
  { id: 'ofertas', label: '🔥 Ofertas' },
  { id: 'eventos', label: '🎉 Eventos' },
  { id: 'mayorista', label: '💰 Mayorista' },
];

export const TEMPLATE_META = [
  { id: 'clasica', name: 'Oferta Clásica', categories: ['favoritos', 'ofertas'], component: OfertaClasica },
  { id: 'premium', name: 'Oferta Premium', categories: ['favoritos'], component: OfertaPremium },
  { id: 'liquidacion', name: 'Liquidación', categories: ['ofertas', 'eventos'], component: Liquidacion },
  { id: 'precio-bajo', name: 'Precio Bajo', categories: ['ofertas'], component: PrecioBajo },
  { id: 'nuevo', name: 'Nuevo', categories: ['nuevos'], component: NuevoIngreso },
  { id: 'combo', name: 'Combo', categories: ['ofertas', 'eventos'], component: Combo },
  { id: 'black-friday', name: 'Black Friday', categories: ['eventos', 'ofertas'], component: BlackFriday },
  { id: 'mayorista', name: 'Mayorista', categories: ['mayorista', 'favoritos'], component: Mayorista },
];

export const templates = TEMPLATE_META.reduce((acc, template) => ({ ...acc, [template.id]: template.component }), {});
export const DEFAULT_TEMPLATE_ID = TEMPLATE_META[0].id;

export function getTemplateMeta(templateId) {
  return TEMPLATE_META.find((template) => template.id === templateId) ?? TEMPLATE_META[0];
}
