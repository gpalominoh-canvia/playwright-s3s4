import type { Actor } from './Actor';

/** Una pregunta al sistema: devuelve un valor de tipo T y nunca cambia el estado de la aplicación. */
export interface Question<T> {
  respondidaPor(actor: Actor): Promise<T>;
}