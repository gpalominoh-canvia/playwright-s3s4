import { Target } from '../core/Target';

/** Checkout: datos de envío (paso 1), resumen (paso 2) y confirmación. */
export const Checkout = {
  NOMBRE: Target.el('campo nombre').ubicadoPor('[data-test="firstName"]'),
  APELLIDO: Target.el('campo apellido').ubicadoPor('[data-test="lastName"]'),
  CODIGO_POSTAL: Target.el('campo código postal').ubicadoPor('[data-test="postalCode"]'),
  CONTINUAR: Target.el('botón continuar').ubicadoPor('[data-test="continue"]'),
  PRECIOS: Target.el('precios del resumen').ubicadoPor('[data-test="inventory-item-price"]'),
  SUBTOTAL: Target.el('subtotal').ubicadoPor('[data-test="subtotal-label"]'),
  IMPUESTO: Target.el('impuesto').ubicadoPor('[data-test="tax-label"]'),
  TOTAL: Target.el('total').ubicadoPor('[data-test="total-label"]'),
  FINALIZAR: Target.el('botón finalizar').ubicadoPor('[data-test="finish"]'),
  CONFIRMACION: Target.el('mensaje de confirmación').ubicadoPor('[data-test="complete-header"]'),
};