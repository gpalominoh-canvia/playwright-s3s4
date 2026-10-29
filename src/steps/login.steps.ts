import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { LoginPage } from '../pages/LoginPage';
import { Navegar } from '../screenplay/interacciones/Navegar';
import { IngresarCredenciales } from '../screenplay/tareas/IngresarCredenciales';
import { IniciarSesion } from '../screenplay/tareas/IniciarSesion';
import { TextoDe } from '../screenplay/preguntas/TextoDe';
import { Pantalla } from '../screenplay/ui/Pantalla';

Given('que estoy en la página de login', async function (this: CustomWorld) {
    await this.actor.intenta(Navegar.a('/'));
});

Given('que inicié sesión como {string}', async function (this: CustomWorld, usuario: string) {
  await this.actor.intenta(IniciarSesion.como(usuario));
});

When('ingreso con el usuario {string} y la clave {string}', async function (this: CustomWorld, usuario: string, clave: string) {
  await this.actor.intenta(IngresarCredenciales.de(usuario, clave));
});

Then('veo el catálogo de productos', async function (this: CustomWorld) {
  expect(await this.actor.pregunta(TextoDe.el(Pantalla.TITULO))).toBe('Products');
});

Then('veo el mensaje de error {string}', async function (this: CustomWorld, mensaje: string) {
  expect(await this.actor.pregunta(TextoDe.el(Pantalla.ERROR))).toContain(mensaje);
});