import type { Ability } from './Ability';
import type { Performable } from './Performable';
import type { Question } from './Question';

/** La clase de una habilidad, usada como llave para buscarla. */
type ClaseDeHabilidad<T extends Ability> = { prototype: T; name: string };

/** Una persona con habilidades que intenta realizar tareas y hace preguntas sobre lo que ve. */
export class Actor {
  private readonly habilidades = new Map<object, Ability>();
  private readonly notas = new Map<string, unknown>();

  private constructor(readonly nombre: string) {}

  static llamado(nombre: string): Actor {
    return new Actor(nombre);
  }

  /** Le da al actor una o más habilidades. */
  puede(...habilidades: Ability[]): this {
    for (const habilidad of habilidades) {
      this.habilidades.set(habilidad.constructor, habilidad);
    }
    return this;
  }

  /** Devuelve una habilidad del actor, o falla con un mensaje claro si no la tiene. */
  usar<T extends Ability>(clase: ClaseDeHabilidad<T>): T {
    const habilidad = this.habilidades.get(clase);
    if (!habilidad) throw new Error(`${this.nombre} no tiene la habilidad ${clase.name}`);
    return habilidad as T;
  }

  /** Realiza, en orden, las tareas o interacciones indicadas. */
  async intenta(...actividades: Performable[]): Promise<void> {
    for (const actividad of actividades) await actividad.realizadaPor(this);
  }

  /** Hace una pregunta y devuelve la respuesta. */
  pregunta<T>(pregunta: Question<T>): Promise<T> {
    return pregunta.respondidaPor(this);
  }
  
  /** Anota un dato para usarlo más adelante en el mismo escenario. */
  anota<T>(clave: string, valor: T): void {
    this.notas.set(clave, valor);
  }

  /** ¿Anotó algo con esta clave? */
  tieneNota(clave: string): boolean {
    return this.notas.has(clave);
  }

  /** Recupera un dato anotado antes. */
  recuerda<T>(clave: string): T {
    if (!this.notas.has(clave)) throw new Error(`${this.nombre} no anotó "${clave}"`);
    return this.notas.get(clave) as T;
  }
  
}

