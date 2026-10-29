import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import type { Target } from '../core/Target';
import { TextosDe } from './TextosDe';

/** Convierte "$29.99" o "Item total: $29.99" en 29.99. */
export const aNumero = (texto: string): number => Number(texto.replace(/[^0-9.]/g, ''));

/** Question: los precios de una lista de elementos, ya convertidos a número. */
export class Precios implements Question<number[]> {
  private constructor(private readonly target: Target) {}

  static de(target: Target): Precios {
    return new Precios(target);
  }

  async respondidaPor(actor: Actor): Promise<number[]> {
    return (await actor.pregunta(TextosDe.los(this.target))).map(aNumero);
  }
}