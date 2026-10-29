import type { Locator, Page } from '@playwright/test';

/**
 * Un elemento de la pantalla con un nombre legible y la forma de encontrarlo.
 * Los selectores viven solo en los Targets (carpeta ui/).
 */
export class Target {
  private constructor(
    readonly nombre: string,
    private readonly ubicar: (page: Page) => Locator,
  ) {}

  static el(nombre: string) {
    return {
      /** Con un selector de Playwright (CSS o data-test). */
      ubicadoPor: (selector: string) => new Target(nombre, (page) => page.locator(selector)),
      /** Con cualquier localizador de Playwright: getByRole, filter, etc. */
      ubicadoCon: (ubicar: (page: Page) => Locator) => new Target(nombre, ubicar),
    };
  }

  localizarEn(page: Page): Locator {
    return this.ubicar(page);
  }

  toString(): string {
    return this.nombre;
  }
}