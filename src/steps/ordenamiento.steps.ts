import { When, Then, DataTable } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { OrdenarCatalogo } from '../screenplay/tareas/OrdenarCatalogo';
import { Precios } from '../screenplay/preguntas/Precios';
import { TextosDe } from '../screenplay/preguntas/TextosDe';
import { ValorSeleccionado } from '../screenplay/preguntas/ValorSeleccionado';
import { Catalogo } from '../screenplay/ui/Catalogo';

When('ordeno el catálogo por precio de menor a mayor', async function (this: CustomWorld) {
  await this.actor.intenta(OrdenarCatalogo.porPrecioDeMenorAMayor());
});

Then('el criterio de precio ascendente queda seleccionado', async function (this: CustomWorld) {
  expect(await this.actor.pregunta(ValorSeleccionado.de(Catalogo.ORDENAMIENTO))).toBe('lohi');
});

Then('los productos aparecen en este orden:', async function (this: CustomWorld, tabla: DataTable) {
  const productosEsperados = tabla.hashes();
  const nombres = await this.actor.pregunta(TextosDe.los(Catalogo.NOMBRES_PRODUCTO));
  const precios = await this.actor.pregunta(Precios.de(Catalogo.PRECIOS_PRODUCTO));

  expect(nombres).toEqual(productosEsperados.map((producto) => producto.nombre));
  expect(precios).toEqual(productosEsperados.map((producto) => Number(producto.precio)));
});

Then('se muestran {int} productos', async function (this: CustomWorld, cantidad: number) {
  const nombres = await this.actor.pregunta(TextosDe.los(Catalogo.NOMBRES_PRODUCTO));
  expect(nombres).toHaveLength(cantidad);
});
