import { Target } from '../core/Target';

/** Elementos que comparten todas las pantallas de SauceDemo. */
export const Pantalla = {
  TITULO: Target.el('título de la pantalla').ubicadoPor('[data-test="title"]'),
  ERROR: Target.el('mensaje de error').ubicadoPor('[data-test="error"]'),
};