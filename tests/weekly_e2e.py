"""E2E da leitura semanal, sem uso de dados clínicos.
Uso: python tests/weekly_e2e.py --url http://127.0.0.1:8765/
"""
import argparse
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright,expect

p=argparse.ArgumentParser()
p.add_argument('--url',required=True)
args=p.parse_args()
base=args.url.rstrip('/')+'/'
host=urlparse(base).netloc
count=0
with sync_playwright() as api:
    browser=api.chromium.launch(headless=True)
    for width,height in [(320,760),(390,844),(768,1024),(1366,900)]:
        context=browser.new_context(viewport={'width':width,'height':height},accept_downloads=True,reduced_motion='reduce')
        page=context.new_page()
        errors=[];external=[]
        page.on('pageerror',lambda err:errors.append(str(err)))
        page.on('request',lambda req:external.append(req.url) if urlparse(req.url).netloc!=host else None)
        res=page.goto(base,wait_until='networkidle',timeout=60000)
        assert res is not None and res.status==200
        assert page.get_by_role('button',name='Começar leitura da semana').count()==1
        page.get_by_role('button',name='Começar leitura da semana').click()
        assert page.url.rstrip('/')==base.rstrip('/')
        assert page.locator('.weekly-reader').is_visible()
        assert page.locator('.weekly-page').count()==1
        assert 'Página 1 de 3' in page.locator('.weekly-progress').inner_text()
        assert page.locator('.weekly-page>p').count()>=4
        count+=6

        for no in [2,3]:
            page.get_by_role('button',name='Próxima página').click()
            assert 'Página '+str(no)+' de 3' in page.locator('.weekly-progress').inner_text()
            assert page.locator('.weekly-page').count()==1
            count+=2

        page.get_by_role('button',name='Interpretar o texto').click()
        assert page.get_by_role('heading',name='Qual conclusão é sustentada pela leitura?').is_visible()
        assert page.get_by_role('button',name='Escolher uma ação').is_disabled()
        page.locator('input[value="a"][name="weekly-understanding"]').check()
        assert 'Releia a diferença' in page.locator('.weekly-feedback').inner_text()
        page.locator('input[value="b"][name="weekly-understanding"]').check()
        assert 'Esta interpretação acompanha' in page.locator('.weekly-feedback').inner_text()
        page.get_by_role('button',name='Escolher uma ação').click()
        count+=6

        assert page.get_by_role('heading',name='Escolha somente uma atitude.').is_visible()
        assert page.locator('.weekly-pick').count()==3
        assert page.get_by_role('button',name='Preparar minha síntese').is_disabled()
        page.locator('input[value="inicio"][name="weekly-action"]').check()
        page.locator('#weekly-when').select_option('Em um momento tranquilo nesta semana')
        page.get_by_role('button',name='Preparar minha síntese').click()
        assert 'primeiro passo, por até dez minutos' in page.locator('#weekly-summary').inner_text()
        assert 'Sem envio automático' not in page.locator('#weekly-summary').inner_text() or 'sem envio automático' in page.locator('#weekly-summary').inner_text()
        count+=6

        with page.expect_download(timeout=12000) as event:
            page.get_by_role('button',name='Baixar em .txt').click()
        download=event.value
        assert download.suggested_filename=='trilha-da-clareza-atividade-da-semana.txt'
        output=Path(download.path()).read_text(encoding='utf-8')
        assert 'Em um momento tranquilo nesta semana' in output
        assert 'diagnóstico' in output
        count+=3

        page.locator('.top-actions [data-action="home"]').count()
        page.locator('.identity[data-action="home"]').click()
        assert page.url.rstrip('/')==base.rstrip('/')
        assert page.get_by_role('button',name='Iniciar prática breve').count()==1
        assert page.get_by_role('button',name='Conhecer as três jornadas').count()==1
        assert not errors,errors
        assert not external,external
        assert page.evaluate('localStorage.length===0 && sessionStorage.length===0')
        assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+1')
        count+=5
        context.close()
    browser.close()
print('WEEKLY E2E PASS:',count,'verificações em quatro resoluções, sem dados reais ou rede externa.')
