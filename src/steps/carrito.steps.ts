import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { AgregarAlCarrito } from '../screenplay/tareas/AgregarAlCarrito';
import { QuitarDelCarrito } from '../screenplay/tareas/QuitarDelCarrito';
import { ContadorDelCarrito } from '../screenplay/preguntas/ContadorDelCarrito';

Given('que agregué al carrito {string}', async function (this: CustomWorld, producto: string) {
  await this.actor.intenta(AgregarAlCarrito.losProductos(producto));
});

Given('que agregué al carrito {string} y {string}', async function (this: CustomWorld, uno: string, otro: string) {
  await this.actor.intenta(AgregarAlCarrito.losProductos(uno, otro));
});

// Tabla de una columna: raw() devuelve [['Sauce Labs Backpack'], ['Sauce Labs Bike Light'], ...]
When('agrego al carrito los productos:', async function (this: CustomWorld, tabla: DataTable) {
  await this.actor.intenta(AgregarAlCarrito.losProductos(...tabla.raw().flat()));
});

When('quito {string} del carrito', async function (this: CustomWorld, producto: string) {
  await this.actor.intenta(QuitarDelCarrito.elProducto(producto));
});

// expect.poll repite la pregunta hasta que la respuesta cumple (o vencen 5 s).
Then('el carrito indica {int} producto(s)', async function (this: CustomWorld, cantidad: number) {
  await expect.poll(() => this.actor.pregunta(ContadorDelCarrito.enLaCabecera())).toBe(cantidad);
});