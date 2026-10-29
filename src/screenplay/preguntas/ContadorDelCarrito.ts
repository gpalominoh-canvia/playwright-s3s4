import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { NavegarLaWeb } from '../habilidades/NavegarLaWeb';
import { Catalogo } from '../ui/Catalogo';

/** Question: el número que muestra el ícono del carrito (0 si no se muestra). */
export class ContadorDelCarrito implements Question<number> {
  static enLaCabecera(): ContadorDelCarrito {
    return new ContadorDelCarrito();
  }

  async respondidaPor(actor: Actor): Promise<number> {
    const contador = NavegarLaWeb.de(actor).localizar(Catalogo.CONTADOR_CARRITO);
    if (!(await contador.isVisible())) return 0;
    return Number(await contador.innerText());
  }
}