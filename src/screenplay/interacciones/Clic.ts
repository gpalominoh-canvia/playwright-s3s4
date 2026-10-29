import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import type { Target } from '../core/Target';
import { NavegarLaWeb } from '../habilidades/NavegarLaWeb';

/** Interaction: hacer clic en un elemento (Playwright espera a que sea clicable). */
export class Clic implements Performable {
  private constructor(private readonly target: Target) {}

  static en(target: Target): Clic {
    return new Clic(target);
  }

  async realizadaPor(actor: Actor): Promise<void> {
    await NavegarLaWeb.de(actor).localizar(this.target).click();
  }
}