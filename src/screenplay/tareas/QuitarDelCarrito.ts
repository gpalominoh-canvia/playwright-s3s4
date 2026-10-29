import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Clic } from '../interacciones/Clic';
import { Catalogo } from '../ui/Catalogo';
import { PRODUCTOS_ELEGIDOS } from './AgregarAlCarrito';

/** Task: quitar un producto del carrito (funciona en el catálogo y en el carrito). */
export class QuitarDelCarrito implements Performable {
  private constructor(private readonly nombre: string) {}

  static elProducto(nombre: string): QuitarDelCarrito {
    return new QuitarDelCarrito(nombre);
  }

  async realizadaPor(actor: Actor): Promise<void> {
    await actor.intenta(Clic.en(Catalogo.quitar(this.nombre)));
    const elegidos = actor.recuerda<string[]>(PRODUCTOS_ELEGIDOS);
    actor.anota(PRODUCTOS_ELEGIDOS, elegidos.filter((nombre) => nombre !== this.nombre));
  }
}