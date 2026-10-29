import type { Locator, Page } from '@playwright/test';
import { Ability } from '../core/Ability';
import type { Actor } from '../core/Actor';
import type { Target } from '../core/Target';

/** Habilidad de usar un navegador: envuelve la Page de Playwright. */
export class NavegarLaWeb extends Ability {
  private constructor(readonly page: Page) {
    super();
  }

  static con(page: Page): NavegarLaWeb {
    return new NavegarLaWeb(page);
  }

  /** Atajo para interacciones y preguntas: la habilidad del actor. */
  static de(actor: Actor): NavegarLaWeb {
    return actor.usar(NavegarLaWeb);
  }

  localizar(target: Target): Locator {
    return target.localizarEn(this.page);
  }
}