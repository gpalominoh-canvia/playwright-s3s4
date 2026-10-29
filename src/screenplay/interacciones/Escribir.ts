import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import type { Target } from '../core/Target';
import { NavegarLaWeb } from '../habilidades/NavegarLaWeb';

/** Interaction: escribir un valor en un campo.  Escribir.elValor('Ana').en(PantallaLogin.USUARIO) */
export class Escribir implements Performable {
  private constructor(
    private readonly valor: string,
    private readonly target: Target,
  ) {}

  static elValor(valor: string) {
    return { en: (target: Target) => new Escribir(valor, target) };
  }

  async realizadaPor(actor: Actor): Promise<void> {
    await NavegarLaWeb.de(actor).localizar(this.target).fill(this.valor);
  }
}