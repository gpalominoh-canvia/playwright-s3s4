import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { SeleccionarOpcion } from '../interacciones/SeleccionarOpcion';
import { Catalogo } from '../ui/Catalogo';

/** Task: ordenar el catálogo por precio ascendente. */
export class OrdenarCatalogo implements Performable {
  private constructor() {}

  static porPrecioDeMenorAMayor(): OrdenarCatalogo {
    return new OrdenarCatalogo();
  }

  async realizadaPor(actor: Actor): Promise<void> {
    await actor.intenta(SeleccionarOpcion.elValor('lohi').en(Catalogo.ORDENAMIENTO));
  }
}
