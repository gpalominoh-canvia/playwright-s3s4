import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Anotar } from '../interacciones/Anotar';
import { Clic } from '../interacciones/Clic';
import { ResumenDeCompra } from '../preguntas/ResumenDeCompra';
import { Checkout } from '../ui/Checkout';
import { type Datos, IngresarDatosDeEnvio } from './IngresarDatosDeEnvio';
import { IrAlCarrito } from './IrAlCarrito';

/** Nota donde queda el resumen que vio el actor antes de confirmar. */
export const RESUMEN = 'resumen de compra';

/** Task compuesta: del carrito a la confirmación. Se lee como el flujo de negocio. */
export class CompletarCompra implements Performable {
  private constructor(private readonly datos: Datos) {}

  static con(datos: Datos): CompletarCompra {
    return new CompletarCompra(datos);
  }

  async realizadaPor(actor: Actor): Promise<void> {
    await actor.intenta(
      IrAlCarrito.yPasarAlCheckout(),
      IngresarDatosDeEnvio.con(this.datos),
      Clic.en(Checkout.CONTINUAR),
      Anotar.laRespuestaA(ResumenDeCompra.enPantalla()).como(RESUMEN),
      Clic.en(Checkout.FINALIZAR),
    );
  }
}