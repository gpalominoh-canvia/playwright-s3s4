// Configuración de Cucumber. Cada export es un perfil (--profile <nombre>).
const comun = {
  paths: ['features/**/*.feature'],
  import: ['src/**/*.ts'],
  format: ['progress-bar', 'html:reports/cucumber-report.html', 'junit:reports/cucumber-report.xml'],
  formatOptions: { snippetInterface: 'async-await' },
  language: 'es',
};

// npm test: todo menos los @bug (fallas conocidas de la aplicación, ver BUGS.md).
export default { ...comun, tags: 'not @bug' };

// npm run test:bugs: solo los @bug. Se espera que fallen mientras los bugs existan.
export const bugs = { ...comun, tags: '@bug' };