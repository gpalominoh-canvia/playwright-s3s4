# Proyecto: pruebas E2E con Playwright + Screenplay + Cucumber (TypeScript)

Aplicación bajo prueba: SauceDemo (https://www.saucedemo.com). Usuarios: standard_user, problem_user; clave secret_sauce.

## Convenciones
- Todo en español: features, steps, clases, métodos y mensajes.
- Gherkin declarativo (`language: es`): qué hace el usuario, no cómo. Nada de selectores en los pasos.
- Patrón Screenplay en src/screenplay:
  - ui/: Targets (localizadores), uno por pantalla. Preferir `data-test`.
  - interacciones/: acciones atómicas (Clic, Escribir, Navegar, Anotar).
  - tareas/: lo que el usuario quiere lograr, compuesto de interacciones.
  - preguntas/: lo que el actor consulta para verificar.
- Los steps (src/steps) solo traducen la frase y llaman al actor: `actor.intenta(...)` y `actor.pregunta(...)`.
- No se usa Page Object nuevo. No se usa `waitForTimeout`.

## Etiquetas
- `@smoke`: lo mínimo en cada PR. `@regresion`: todo lo que ya funciona.
- `@bug`: describe lo correcto y hoy falla; no corre por defecto (perfil de cucumber.js).

## Antes de dar algo por terminado
- `npm run typecheck` y `npm test` en verde.