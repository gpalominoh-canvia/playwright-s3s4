import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import type { Target } from '../core/Target';
import { NavegarLaWeb } from '../habilidades/NavegarLaWeb';

/** Question: los textos de todos los elementos que coinciden con el Target, en orden. */
export class TextosDe implements Question<string[]> {
  private constructor(private readonly target: Target) {}

  static los(target: Target): TextosDe {
    return new TextosDe(target);
  }

  async respondidaPor(actor: Actor): Promise<string[]> {
    const textos = await NavegarLaWeb.de(actor).localizar(this.target).allInnerTexts();
    return textos.map((texto) => texto.trim());
  }
}