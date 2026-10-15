#!/usr/bin/env node
// Single-file OFFLINE review ONLY. No deploy, CDN, cookies, API or participant data.
// Both inline script and style are allowed by exact SHA-256 CSP hash in the preview.
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {createHash} from 'node:crypto';
const args=process.argv.slice(2);
if(args[0]!=='--out'||!args[1]||args.length!==2)throw Error('Use: node scripts/build_review_offline.mjs --out path/file.html');
const out=resolve(args[1]);
const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const sha=x=>createHash('sha256').update(x).digest('base64');
let html=read('index.html');
const banner='<div class="offline-banner" role="note">PRÉVIA OFFLINE PARA REVISÃO TÉCNICA — NÃO HOMOLOGADA PARA PACIENTES</div>';
const styles=read('style.css')+'\n.offline-banner{background:#173c43;color:white;padding:12px;text-align:center;font:700 13px/1.6 system-ui,sans-serif;letter-spacing:.01em}\n';
const code=['dist/domain.js','dist/content.js','dist/app.js'].map(path=>read(path).replace(/^import\s+.+?;\s*$/gm,'').replace(/^export\s+/gm,'')).join('\n\n');
if(/(?:^|\n)\s*(?:import|export)\s+/m.test(code))throw Error('ES modules remained in classic bundle');
if(code.includes('</script>'))throw Error('Unescaped script closing token');
const css='<link rel="stylesheet" href="./style.css">';
const js='<script type="module" src="./dist/app.js"></script>';
if(html.split(css).length!==2||html.split(js).length!==2)throw Error('Unexpected HTML template');
html=html.replace('<body><a class="skip"','<body>'+banner+'<a class="skip"');
html=html.replace(css,'<style>'+styles+'</style>');
html=html.replace(js,'');
html=html.replace('</body>','<script>'+code+'</script></body>');
const icon=readFileSync(new URL('../assets/favicon.svg',import.meta.url));
html=html.replace('href="./assets/favicon.svg"','href="data:image/svg+xml;base64,'+icon.toString('base64')+'"');
html=html.replace("script-src 'self'","script-src 'sha256-"+sha(code)+"'");
html=html.replace("style-src 'self'","style-src 'sha256-"+sha(styles)+"'");
for(const x of ["connect-src 'none'","form-action 'none'","object-src 'none'"])if(!html.includes(x))throw Error('CSP missing '+x);
mkdirSync(dirname(out),{recursive:true});
writeFileSync(out,html,'utf8');
console.log('REVIEW OFFLINE PASS: '+out+' ('+Buffer.byteLength(html)+' bytes; CSP hash; zero publishing)');
