"""Offline UX regression. Fictional content, no clinical identifiers."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import re
ROOT=Path(__file__).resolve().parents[1]
def load(page):
    html=(ROOT/'index.html').read_text(encoding='utf-8')
    html=re.sub(r'<meta http-equiv="Content-Security-Policy"[^>]*>', '', html)
    html=re.sub(r'<link rel="stylesheet"[^>]*>', '<style>'+(ROOT/'style.css').read_text(encoding='utf-8')+'</style>', html)
    html=re.sub(r'<script type="module"[^>]*></script>', '', html)
    scripts=[]
    for name in ('domain.js','content.js','app.js'):
        code=(ROOT/'dist'/name).read_text(encoding='utf-8')
        code=re.sub(r'^import .*?;\\s*$', '', code, flags=re.MULTILINE)
        code=re.sub(r'\\bexport\\s+', '', code)
        scripts.append(code)
    page.set_content(html)
    page.evaluate('(source) => { (0, eval)(source) }', '\\n'.join(scripts))
passed=[]
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox'])
    for width in (320,390,768,1366):
        page=browser.new_page(viewport={'width':width,'height':850},accept_downloads=True,reduced_motion='reduce')
        errors=[]
        page.on('pageerror',lambda exc: errors.append(str(exc)))
        load(page)
        assert not page.locator('body').evaluate('(e)=>e.scrollWidth > innerWidth+1'),f'overflow {width}'
        page.get_by_role('button',name='Explorar as jornadas').click()
        for journey in ('pensamentos','controle','acao'):
            page.locator(f'[data-start="{journey}"]').click()
            page.get_by_role('button',name='Ⅱ Fazer uma pausa').click()
            assert page.get_by_role('dialog').is_visible()
            assert page.locator('.layout').get_attribute('inert') is not None
            page.keyboard.press('Escape')
            assert page.get_by_role('dialog').count()==0
            for stage in range(6):
                previous=set()
                for choice in range(3):
                    page.locator(f'[data-choice="{choice}"]').click()
                    current=page.locator('.feedback').inner_text()
                    assert len(current)>50 and current not in previous
                    previous.add(current)
                    passed.append(f'{width}:{journey}:{stage}:{choice}')
                page.locator('[data-action="next"]').click()
            assert page.get_by_text('Jornada concluída',exact=True).count()==1
            page.get_by_role('button',name='Explorar outra jornada').click()
        assert not errors,errors
        passed.append(f'{width}:responsive-and-modal')
        page.close()
    browser.close()
print('UX E2E PASS:',len(passed),'assertivas')
