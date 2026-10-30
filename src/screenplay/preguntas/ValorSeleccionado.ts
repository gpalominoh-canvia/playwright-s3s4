import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import type { Target } from '../core/Target';
import { NavegarLaWeb } from '../habilidades/NavegarLaWeb';

/** Question: el valor seleccionado actualmente en un control desplegable. */
export class ValorSeleccionado implements Question<string> {
  private constructor(private readonly target: Target) {}

  static de(target: Target): ValorSeleccionado {
    return new ValorSeleccionado(target);
  }

  async respondidaPor(actor: Actor): Promise<string> {
    return NavegarLaWeb.de(actor).localizar(this.target).inputValue();
  }
}
