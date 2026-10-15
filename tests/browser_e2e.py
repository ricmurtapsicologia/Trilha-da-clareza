"""Use with `python tests/browser_e2e.py`: no real user data."""
from playwright.sync_api import sync_playwright
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import threading, os, tempfile, pathlib, re
ROOT=pathlib.Path(__file__).resolve().parents[1]
class Quiet(SimpleHTTPRequestHandler):
 def __init__(self,*args,**kwargs): super().__init__(*args,directory=str(ROOT),**kwargs)
 def log_message(self,*args): pass
server=ThreadingHTTPServer(('127.0.0.1',0), Quiet)
thread=threading.Thread(target=server.serve_forever,daemon=True);thread.start()
url=ROOT.joinpath('index.html').as_uri()
checks=[]
def load(page):
 html=(ROOT/'index.html').read_text()
 html=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]*>', '', html)
 html=re.sub(r'<link rel="stylesheet"[^>]*>', '<style>'+ (ROOT/'style.css').read_text() +'</style>',html)
 html=re.sub(r'<script type="module"[^>]*></script>', '',html)
 scripts=[]
 for file in ['domain.js','content.js','app.js']:
  source=(ROOT/'dist'/file).read_text()
  source=re.sub(r'^import .*?;\s*$', '',source,flags=re.MULTILINE)
  source=re.sub(r'\bexport\s+', '',source)
  scripts.append(source)
 page.set_content(html, wait_until='load')
 page.evaluate('(code) => { (0, eval)(code) }','\n'.join(scripts))
def check(cond,name):
 assert cond,name
 checks.append(name)
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--disable-dev-shm-usage','--allow-file-access-from-files'])
 page=browser.new_page(viewport={'width':1365,'height':930},accept_downloads=True,reduced_motion='reduce')
 errors=[];requests=[]
 page.on('pageerror',lambda e: errors.append(str(e)))
 page.on('request',lambda req: requests.append(req.url))
 load(page)
 check(page.get_by_role('heading',name='Entre o que acontece e o que você faz, existe um espaço para escolher.').count()==1,'tela inicial com título')
 check(page.get_by_text('Sem cadastro · Sem histórico · Sem rastreadores').count()==1,'rodapé de privacidade')
 check(page.locator('#app').count()==1,'raiz única')
 page.screenshot(path=str(ROOT/'docs'/'preview-desktop.png'),full_page=True)
 page.get_by_role('button',name='Explorar as jornadas').click()
 check(page.locator('.journey-card').count()==3,'seletor de três jornadas')
 page.screenshot(path=str(ROOT/'docs'/'preview-jornadas.png'),full_page=True)
 check(page.get_by_text('Prévia de voz do dispositivo').count()==1,'limites de TTS explícitos')
 check(page.get_by_role('button',name='Ver transcrição').count()==1,'transcrição disponível')
 page.get_by_role('button',name='Ver transcrição').click()
 check(page.get_by_text('Bem-vindo à Trilha da Clareza.').count()==1,'texto da transcrição aparece')
 for i,j in enumerate(['pensamentos','controle','acao']):
  page.locator(f'[data-start="{j}"]').click()
  check(page.locator('.tile').count()==6,f'{j}: seis casas')
  page.get_by_role('button',name='Ⅱ Fazer uma pausa').click()
  check(page.get_by_role('dialog').is_visible(),f'{j}: pausa acessível')
  page.get_by_role('button',name='Continuar jornada').click()
  check(page.get_by_role('dialog').count()==0,f'{j}: retorna da pausa')
  for n in range(6):
   if i==0 and n==0: page.screenshot(path=str(ROOT/'docs'/'preview-jogo.png'),full_page=True)
   check(page.locator('.tile.active').count()==1,f'{j} etapa {n+1}: casa ativa')
   check(page.locator('button[data-choice]').count()==3,f'{j} etapa {n+1}: três escolhas')
   check(page.locator('button[data-action="next"]').is_disabled(),f'{j} etapa {n+1}: escolha necessária')
   page.locator(f'button[data-choice="{n%3}"]').click()
   check(page.locator('.feedback').count()==1,f'{j} etapa {n+1}: feedback')
   page.locator('button[data-action="next"]').click()
  check(page.get_by_text('Jornada concluída',exact=True).count()==1,f'{j}: conclusão')
  check(page.get_by_label('Qual atitude pequena você gostaria de experimentar?').count()==1,f'{j}: plano opcional')
  if i==0:
   page.locator('#next-step').fill('Conversa breve sobre um tema específico')
   with page.expect_download() as d:page.get_by_role('button',name='Salvar minha reflexão').click()
   download=d.value
   check(download.suggested_filename=='trilha-da-clareza-reflexao.txt','exportação local')
  page.get_by_role('button',name='Explorar outra jornada').click()
  check(page.locator('.journey-card').count()==3,f'{j}: retorna à seleção')
 # Verify no persistence across reload during a journey
 page.locator('[data-start="pensamentos"]').click()
 page.locator('button[data-choice="0"]').click()
 load(page)
 check(page.locator('.hero').count()==1,'estado de respostas descartado ao recarregar')
 check(not any(x for x in requests if x.startswith('http:') or x.startswith('https:')),'sem requisições externas')
 check(len(errors)==0,'sem erros de JavaScript desktop')
 # Mobile viewport: exercise key areas
 mobile=browser.new_page(viewport={'width':390,'height':844},is_mobile=True,has_touch=True,device_scale_factor=1,accept_downloads=True)
 load(mobile)
 check(mobile.locator('body').evaluate('(b)=>b.scrollWidth <= window.innerWidth + 1'),'sem scroll horizontal mobile home')
 mobile.screenshot(path=str(ROOT/'docs'/'preview-mobile.png'),full_page=True)
 mobile.locator('[data-action="select"]').first.click()
 mobile.locator('[data-start="controle"]').click()
 check(mobile.locator('body').evaluate('(b)=>b.scrollWidth <= window.innerWidth + 1'),'sem scroll horizontal mobile jogo')
 check(mobile.locator('.tile').count()==6,'tabuleiro móvel')
 mobile.locator('[data-choice="0"]').click()
 check(mobile.locator('.feedback').count()==1,'resposta no mobile')
 mobile.locator('[data-action="pause"]').click()
 check(mobile.get_by_role('dialog').is_visible(),'modal de pausa móvel')
 browser.close()
server.shutdown()
print('E2E OK: '+str(len(checks))+' verificações de navegador.')
for x in checks: print('PASS '+x)
