import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Clic } from '../interacciones/Clic';
import { Escribir } from '../interacciones/Escribir';
import { PantallaLogin } from '../ui/PantallaLogin';

/** Task: escribir usuario y clave en la pantalla de login y entrar. */
export class IngresarCredenciales implements Performable {
  private constructor(
    private readonly usuario: string,
    private readonly clave: string,
  ) {}

  static de(usuario: string, clave: string): IngresarCredenciales {
    return new IngresarCredenciales(usuario, clave);
  }

  async realizadaPor(actor: Actor): Promise<void> {
    await actor.intenta(
      Escribir.elValor(this.usuario).en(PantallaLogin.USUARIO),
      Escribir.elValor(this.clave).en(PantallaLogin.CLAVE),
      Clic.en(PantallaLogin.INGRESAR),
    );
  }
}