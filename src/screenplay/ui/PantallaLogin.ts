import { Target } from '../core/Target';

/** Elementos de la pantalla de login. */
export const PantallaLogin = {
  USUARIO: Target.el('campo usuario').ubicadoPor('[data-test="username"]'),
  CLAVE: Target.el('campo clave').ubicadoPor('[data-test="password"]'),
  INGRESAR: Target.el('botón ingresar').ubicadoPor('[data-test="login-button"]'),
};