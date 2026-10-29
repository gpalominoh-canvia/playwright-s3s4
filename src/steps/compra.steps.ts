import { When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { CompletarCompra, RESUMEN } from '../screenplay/tareas/CompletarCompra';
import type { Datos } from '../screenplay/tareas/IngresarDatosDeEnvio';
import type { Resumen } from '../screenplay/preguntas/ResumenDeCompra';
import { TextoDe } from '../screenplay/preguntas/TextoDe';
import { Checkout } from '../screenplay/ui/Checkout';

// Tabla de dos columnas (clave | valor): rowsHash() la convierte en un objeto.
const datosDe = (tabla: DataTable) => tabla.rowsHash() as unknown as Datos;

When('completo la compra con los datos:', async function (this: CustomWorld, tabla: DataTable) {
  await this.actor.intenta(CompletarCompra.con(datosDe(tabla)));
});

Then('el resumen muestra subtotal, impuesto y total correctos', async function (this: CustomWorld) {
  const { precios, subtotal, impuesto, total } = this.actor.recuerda<Resumen>(RESUMEN);
  const sumaDePrecios = precios.reduce((suma, precio) => suma + precio, 0);
  expect(subtotal, 'subtotal = suma de los precios').toBeCloseTo(sumaDePrecios, 2);
  expect(impuesto, 'impuesto = 8 % del subtotal').toBeCloseTo(Math.round(subtotal * 8) / 100, 2);
  expect(total, 'total = subtotal + impuesto').toBeCloseTo(subtotal + impuesto, 2);
});

Then('veo la confirmación {string}', async function (this: CustomWorld, mensaje: string) {
  expect(await this.actor.pregunta(TextoDe.el(Checkout.CONFIRMACION))).toBe(mensaje);
});