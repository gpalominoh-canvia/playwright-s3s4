import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Clic } from '../interacciones/Clic';
import { Carrito } from '../ui/Carrito';
import { Catalogo } from '../ui/Catalogo';

/** Task: abrir el carrito desde la cabecera y, si se pide, pasar al checkout. */
export class IrAlCarrito implements Performable {
  private constructor(private readonly yPagar: boolean) {}

  static desdeLaCabecera(): IrAlCarrito {
    return new IrAlCarrito(false);
  }

  static yPasarAlCheckout(): IrAlCarrito {
    return new IrAlCarrito(true);
  }

  async realizadaPor(actor: Actor): Promise<void> {
    await actor.intenta(Clic.en(Catalogo.IR_AL_CARRITO));
    if (this.yPagar) await actor.intenta(Clic.en(Carrito.PAGAR));
  }
}