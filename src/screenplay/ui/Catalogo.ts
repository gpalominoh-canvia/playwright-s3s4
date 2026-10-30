import { Target } from '../core/Target';

const producto = '[data-test="inventory-item"]';

/** Elementos del catálogo (inventory.html) y de la cabecera común. */
export const Catalogo = {
  CONTADOR_CARRITO: Target.el('contador del carrito').ubicadoPor('[data-test="shopping-cart-badge"]'),
  IR_AL_CARRITO: Target.el('ícono del carrito').ubicadoPor('[data-test="shopping-cart-link"]'),
  ORDENAMIENTO: Target.el('selector de ordenamiento').ubicadoPor('[data-test="product-sort-container"]'),
  NOMBRES_PRODUCTO: Target.el('nombres de los productos').ubicadoPor('[data-test="inventory-item-name"]'),
  PRECIOS_PRODUCTO: Target.el('precios de los productos').ubicadoPor('[data-test="inventory-item-price"]'),

  /** Botón "Add to cart" de un producto, ubicado por su nombre visible y no por su id. */
  agregar: (nombre: string) =>
    Target.el(`botón agregar de ${nombre}`).ubicadoCon((page) =>
      page.locator(producto, { hasText: nombre }).getByRole('button', { name: 'Add to cart' })),

  /** Botón "Remove" de un producto ya agregado. */
  quitar: (nombre: string) =>
    Target.el(`botón quitar de ${nombre}`).ubicadoCon((page) =>
      page.locator(producto, { hasText: nombre }).getByRole('button', { name: 'Remove' })),
};