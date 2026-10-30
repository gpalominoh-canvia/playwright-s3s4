import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import type { Target } from '../core/Target';
import { NavegarLaWeb } from '../habilidades/NavegarLaWeb';

/** Interaction: seleccionar una opción de un control desplegable. */
export class SeleccionarOpcion implements Performable {
  private constructor(
    private readonly valor: string,
    private readonly target: Target,
  ) {}

  static elValor(valor: string) {
    return { en: (target: Target) => new SeleccionarOpcion(valor, target) };
  }

  async realizadaPor(actor: Actor): Promise<void> {
    await NavegarLaWeb.de(actor).localizar(this.target).selectOption(this.valor);
  }
}
