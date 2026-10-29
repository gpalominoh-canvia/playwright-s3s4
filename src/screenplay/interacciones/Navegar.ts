import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { NavegarLaWeb } from '../habilidades/NavegarLaWeb';

/** Interaction: abrir una ruta relativa a la baseURL. */
export class Navegar implements Performable {
  private constructor(private readonly ruta: string) {}

  static a(ruta: string): Navegar {
    return new Navegar(ruta);
  }

  async realizadaPor(actor: Actor): Promise<void> {
    await NavegarLaWeb.de(actor).page.goto(this.ruta);
  }
}