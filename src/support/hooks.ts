import { After, AfterAll, Before, BeforeAll, Status, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, chromium } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { Actor } from '../screenplay/core/Actor';
import { NavegarLaWeb } from '../screenplay/habilidades/NavegarLaWeb';
import { CustomWorld } from './world';

setDefaultTimeout(30_000);

const BASE_URL = process.env.BASE_URL ?? 'https://www.saucedemo.com';
let browser: Browser;

// "Login exitoso" -> "login-exitoso"
const aArchivo = (texto: string) =>
  texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '').toLowerCase();

BeforeAll(async () => {
  browser = await chromium.launch({ headless: process.env.HEADED !== '1' });
});

AfterAll(async () => {
  await browser.close();
});

// Contexto y página nuevos por escenario, la traza grabando y un actor que usa esa página.
Before(async function (this: CustomWorld) {
  this.context = await browser.newContext({ baseURL: BASE_URL });
  await this.context.tracing.start({ screenshots: true, snapshots: true });
  this.page = await this.context.newPage();
  this.actor = Actor.llamado('Comprador').puede(NavegarLaWeb.con(this.page));
});

// Evidencia solo cuando falla: captura + traza en reports/ y adjuntas al reporte de Cucumber.
After(async function (this: CustomWorld, { pickle, result }) {
  if (!this.context) return;
  if (result?.status === Status.FAILED) {
    const nombre = `${aArchivo(pickle.name)}-${pickle.id.slice(0, 8)}`;
    const captura = await this.page.screenshot({ path: `reports/capturas/${nombre}.png`, fullPage: true });
    this.attach(captura, { mediaType: 'image/png', fileName: `${nombre}.png` });

    const traza = `reports/trazas/${nombre}.zip`;
    await this.context.tracing.stop({ path: traza });
    this.attach(await readFile(traza), { mediaType: 'application/zip', fileName: `${nombre}.zip` });
    this.attach(`Para ver la traza: npx playwright show-trace ${traza}`, 'text/plain');
  } else {
    await this.context.tracing.stop();
  }
  await this.context.close();
});