import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Escribir } from '../interacciones/Escribir';
import { Checkout } from '../ui/Checkout';

/** Los datos del formulario de envío (llegan de una tabla del .feature). */
export interface Datos {
  nombre: string;
  apellido: string;
  codigoPostal: string;
}

/** Task: llenar el formulario de envío del checkout (sin continuar). */
export class IngresarDatosDeEnvio implements Performable {
  private constructor(private readonly datos: Datos) {}

  static con(datos: Datos): IngresarDatosDeEnvio {
    return new IngresarDatosDeEnvio(datos);
  }

  async realizadaPor(actor: Actor): Promise<void> {
    await actor.intenta(
      Escribir.elValor(this.datos.nombre).en(Checkout.NOMBRE),
      Escribir.elValor(this.datos.apellido).en(Checkout.APELLIDO),
      Escribir.elValor(this.datos.codigoPostal).en(Checkout.CODIGO_POSTAL),
    );
  }
}