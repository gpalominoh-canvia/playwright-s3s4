import type { Actor } from '../core/Actor';
import type { Performable } from '../core/Performable';
import { Navegar } from '../interacciones/Navegar';
import { IngresarCredenciales } from './IngresarCredenciales';

/** Clave que SauceDemo usa para todos sus usuarios de prueba. */
export const CLAVE_DEMO = 'secret_sauce';

/** Task: iniciar sesión desde cero. Compone otra tarea: abre el login y reutiliza IngresarCredenciales. */
export class IniciarSesion implements Performable {
  private constructor(
    private readonly usuario: string,
    private readonly clave: string,
  ) {}

  static como(usuario: string, clave = CLAVE_DEMO): IniciarSesion {
    return new IniciarSesion(usuario, clave);
  }

  async realizadaPor(actor: Actor): Promise<void> {
    await actor.intenta(
      Navegar.a('/'),
      IngresarCredenciales.de(this.usuario, this.clave),
    );
  }
}