import type { Actor } from '../core/Actor';
import type { Question } from '../core/Question';
import { Checkout } from '../ui/Checkout';
import { aNumero, Precios } from './Precios';
import { TextoDe } from './TextoDe';

export interface Resumen {
  precios: number[];
  subtotal: number;
  impuesto: number;
  total: number;
}

/** Question: los montos de la pantalla de resumen (checkout-step-two.html). */
export class ResumenDeCompra implements Question<Resumen> {
  static enPantalla(): ResumenDeCompra {
    return new ResumenDeCompra();
  }

  async respondidaPor(actor: Actor): Promise<Resumen> {
    return {
      subtotal: aNumero(await actor.pregunta(TextoDe.el(Checkout.SUBTOTAL))),
      impuesto: aNumero(await actor.pregunta(TextoDe.el(Checkout.IMPUESTO))),
      total: aNumero(await actor.pregunta(TextoDe.el(Checkout.TOTAL))),
      precios: await actor.pregunta(Precios.de(Checkout.PRECIOS)),
    };
  }
}