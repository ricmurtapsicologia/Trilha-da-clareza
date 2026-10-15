import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { readdirSync } from 'node:fs';

const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8');
const pkg = JSON.parse(read('package.json'));
const lock = JSON.parse(read('package-lock.json'));

test('Onda 3: runtime sem dependências externas', () => {
  assert.deepEqual(pkg.dependencies || {}, {});
  assert.equal(pkg.private, true);
  assert.equal(pkg.type, 'module');
});
test('Onda 3: versões exatas e lockfile coerente', () => {
  assert.equal(pkg.devDependencies.typescript, '5.8.3');
  assert.equal(lock.lockfileVersion, 3);
  assert.equal(lock.packages[''].devDependencies.typescript, pkg.devDependencies.typescript);
  assert.equal(lock.packages['node_modules/typescript'].version, '5.8.3');
  assert.match(lock.packages['node_modules/typescript'].integrity, /^sha512-/);
});
test('Onda 3: três módulos TypeScript sem dependências de runtime', () => {
  const files = readdirSync(new URL('../src/', import.meta.url)).filter(x => x.endsWith('.ts'));
  assert.deepEqual(files.sort(), ['app.ts', 'content.ts', 'domain.ts']);
  for (const file of files) {
    const source = read('src/' + file);
    assert.doesNotMatch(source, /from\s+['"](?!\.\/|\.\.\/)[^'"]+['"]/);
  }
});
test('Onda 3: aplicação servida diretamente do build estático', () => {
  const html = read('index.html');
  assert.match(html, /type="module"\s+src="\.\/dist\/app\.js"/);
  assert.match(html, /href="\.\/style\.css"/);
  for (const file of ['dist/app.js','dist/content.js','dist/domain.js','style.css','assets/favicon.svg']) {
    assert.ok(existsSync(new URL('../'+file, import.meta.url)), file);
  }
});
test('Onda 3: não existe mais workflow de importação com escrita na main', () => {
  assert.equal(existsSync(new URL('../.github/workflows/import-mvp.yml', import.meta.url)), false);
});
