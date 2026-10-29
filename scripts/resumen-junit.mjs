// Convierte el JUnit de Cucumber en un resumen Markdown para la pestaña del job y el Pull Request.
// Uso: node scripts/resumen-junit.mjs [reports/cucumber-report.xml]
// En GitHub Actions escribe en $GITHUB_STEP_SUMMARY; en tu PC lo imprime en la consola.
import { appendFileSync, existsSync, readFileSync } from 'node:fs';

const archivo = process.argv[2] ?? 'reports/cucumber-report.xml';
const salida = (texto) =>
  process.env.GITHUB_STEP_SUMMARY ? appendFileSync(process.env.GITHUB_STEP_SUMMARY, texto) : process.stdout.write(texto);

if (!existsSync(archivo)) {
  salida(`### Pruebas\n\nNo se generó ${archivo}: la ejecución falló antes de correr los escenarios.\n`);
  process.exit(0);
}

const xml = readFileSync(archivo, 'utf8');
const texto = (s) =>
  s.replace(/&#xA;/g, ' ').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&amp;/g, '&');
const atributo = (etiqueta, nombre) => texto(etiqueta.match(new RegExp(`(?:^|\\s)${nombre}="([^"]*)"`))?.[1] ?? '');

const suite = xml.match(/<testsuite [^>]*>/)?.[0] ?? '';
const total = Number(atributo(suite, 'tests'));
const fallidos = Number(atributo(suite, 'failures')) + Number(atributo(suite, 'errors'));
const omitidos = Number(atributo(suite, 'skipped'));
const segundos = Number(atributo(suite, 'time')).toFixed(1);

const casos = [...xml.matchAll(/<testcase ((?:[^>"]|"[^"]*")*)>([\s\S]*?)<\/testcase>/g)].map(([, attrs, cuerpo]) => ({
  caracteristica: atributo(attrs, 'classname'),
  escenario: atributo(attrs, 'name').replace(/^.*#[\d.]+: /, ''),
  falla: cuerpo.match(/<(?:failure|error) [^>]*message="([^"]*)"/)?.[1],
}));

let md = `### ${fallidos ? 'Pruebas con fallas' : 'Pruebas en verde'}\n\n`;
md += '| Escenarios | Pasaron | Fallaron | Omitidos | Duración |\n|---|---|---|---|---|\n';
md += `| ${total} | ${total - fallidos - omitidos} | ${fallidos} | ${omitidos} | ${segundos} s |\n\n`;

const conFalla = casos.filter((c) => c.falla);
if (conFalla.length) {
  md += '| Característica | Escenario | Motivo |\n|---|---|---|\n';
  for (const c of conFalla) {
    // El mensaje propio del expect o, si no tiene, la parte "Expected ... Received ...".
    const mensaje = texto(c.falla).replace(/\s+/g, ' ');
    const propio = mensaje.split('expect(')[0].trim();
    const motivo = (propio || mensaje.slice(mensaje.indexOf('Expected'))).slice(0, 140).replace(/\|/g, '\\|');
    md += `| ${c.caracteristica} | ${c.escenario.replace(/\|/g, '\\|')} | ${motivo} |\n`;
  }
  md += '\nLas capturas y trazas están en el artefacto **reporte-cucumber** de esta ejecución.\n';
}
salida(md);