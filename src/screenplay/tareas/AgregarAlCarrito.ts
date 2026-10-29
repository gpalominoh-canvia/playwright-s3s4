import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Clic } from '../interacciones/Clic';
import { Catalogo } from '../ui/Catalogo';

/** Nota donde el actor recuerda qué productos puso en el carrito. */
export const PRODUCTOS_ELEGIDOS = 'productos elegidos';

/** Task: agregar uno o varios productos al carrito, buscándolos por su nombre. */
export class AgregarAlCarrito implements Performable {
  private constructor(private readonly nombres: string[]) {}

  static losProductos(...nombres: string[]): AgregarAlCarrito {
    return new AgregarAlCarrito(nombres);
  }

  async realizadaPor(actor: Actor): Promise<void> {
    for (const nombre of this.nombres) {
      await actor.intenta(Clic.en(Catalogo.agregar(nombre)));
    }
    const previos = actor.tieneNota(PRODUCTOS_ELEGIDOS) ? actor.recuerda<string[]>(PRODUCTOS_ELEGIDOS) : [];
    actor.anota(PRODUCTOS_ELEGIDOS, [...previos, ...this.nombres]);
  }
}