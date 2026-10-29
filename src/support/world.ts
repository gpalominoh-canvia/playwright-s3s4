import { World, IWorldOptions, setWorldConstructor } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';
import { Actor } from '../screenplay/core/Actor';
// El World es el contexto que comparten los steps de un mismo escenario.
export class CustomWorld extends World {
  actor!: Actor;
  context!: BrowserContext;
  page!: Page;
  constructor(options: IWorldOptions) {
    super(options);
  }
}
setWorldConstructor(CustomWorld);