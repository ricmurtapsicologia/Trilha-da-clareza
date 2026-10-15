import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';

for (const path of ['dist/app.js', 'dist/content.js', 'dist/domain.js']) {
  if (!existsSync(path)) {
    console.error('FALHA: saída TypeScript ausente:', path);
    process.exitCode = 1;
  }
}
const html = readFileSync('index.html', 'utf8');
if (!html.includes('src="./dist/app.js"')) {
  console.error('FALHA: entrada HTML não referencia o build oficial.');
  process.exitCode = 1;
}
const result = spawnSync('git', ['diff', '--exit-code', '--', 'dist/'], { encoding: 'utf8' });
if (result.status !== 0) {
  console.error('FALHA: arquivos dist/ divergem da compilação do TypeScript.');
  console.error('Execute npm run build e inclua os arquivos dist/ recompilados no commit.');
  console.error((result.stdout || '').slice(0, 2800));
  process.exitCode = 1;
}
if (result.status === 0 && process.exitCode !== 1) {
  console.log('PASS: os módulos publicados correspondem à compilação e ao entrypoint HTML.');
}
