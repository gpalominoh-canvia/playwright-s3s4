import { Target } from '../core/Target';

/** Pantalla del carrito (cart.html). */
export const Carrito = {
  NOMBRES: Target.el('productos del carrito').ubicadoPor('[data-test="inventory-item-name"]'),
  PAGAR: Target.el('botón checkout').ubicadoPor('[data-test="checkout"]'),
};