import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import type { Question } from '../core/Question';

/**
 * Interaction: el actor anota la respuesta a una pregunta para revisarla después.
 * Sirve cuando la pantalla que la muestra desaparece antes del "Entonces".
 */
export class Anotar<T> implements Performable {
  private constructor(
    private readonly pregunta: Question<T>,
    private readonly clave: string,
  ) {}

  static laRespuestaA<T>(pregunta: Question<T>) {
    return { como: (clave: string) => new Anotar(pregunta, clave) };
  }

  async realizadaPor(actor: Actor): Promise<void> {
    actor.anota(this.clave, await actor.pregunta(this.pregunta));
  }
}