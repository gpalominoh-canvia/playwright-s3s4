import type { Actor } from './Actor';

/**
 * Algo que el actor puede realizar. Lo implementan:
 * - las Interactions: una sola acción sobre la interfaz (clic, escribir, navegar);
 * - las Tasks: una meta de negocio compuesta por interacciones u otras tareas.
 */
export interface Performable {
  realizadaPor(actor: Actor): Promise<void>;
}