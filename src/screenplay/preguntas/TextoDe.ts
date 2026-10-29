import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import type { Target } from '../core/Target';
import { NavegarLaWeb } from '../habilidades/NavegarLaWeb';

/** Question: el texto visible de un elemento. Espera a que el elemento exista. */
export class TextoDe implements Question<string> {
  private constructor(private readonly target: Target) {}

  static el(target: Target): TextoDe {
    return new TextoDe(target);
  }

  async respondidaPor(actor: Actor): Promise<string> {
    return (await NavegarLaWeb.de(actor).localizar(this.target).innerText()).trim();
  }
}