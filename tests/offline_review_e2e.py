"""Offline review E2E: file:// Chromium only, NOT a physical smartphone test."""
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
import sys
assert len(sys.argv)==2
file=Path(sys.argv[1]).resolve()
assert file.is_file() and file.stat().st_size>25000
checks=0
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    for w,h in [(320,760),(390,844),(1366,900)]:
        context=browser.new_context(viewport={"width":w,"height":h},accept_downloads=True)
        page=context.new_page()
        errors=[];remote=[]
        page.on("pageerror",lambda x:errors.append(str(x)))
        page.on("request",lambda r:remote.append(r.url) if urlparse(r.url).scheme in ("http","https") else None)
        page.goto(file.as_uri(),wait_until="load")
        assert page.locator('.offline-banner').count()==1
        assert page.locator('.hero').count()==1,errors
        assert "NÃO HOMOLOGADA" in page.locator('.offline-banner').inner_text()
        checks+=3
        page.get_by_role('button',name='Explorar as jornadas').click()
        assert page.locator('.journey-card').count()==3
        page.locator('[data-start="pensamentos"]').click()
        for n in range(6):
            assert page.locator('[data-action="next"]').is_disabled()
            page.locator('[data-choice="0"]').click()
            assert page.locator('.feedback').count()==1
            page.locator('[data-action="next"]').click()
            checks+=3
        assert page.get_by_text('Jornada concluída',exact=True).count()==1
        page.get_by_role('button',name='Explorar outra jornada').click()
        page.locator('[data-start="controle"]').click()
        page.locator('[data-choice="1"]').click()
        page.locator('[data-action="pause"]').click()
        page.get_by_role('button',name='Encerrar e descartar respostas').click()
        assert page.locator('[data-action="resume-journey"]').count()==0
        page.locator('[data-start="controle"]').click()
        assert page.locator('[data-action="next"]').is_disabled()
        assert not remote,remote
        assert not errors,errors
        checks+=6
        context.close()
    browser.close()
print("OFFLINE REVIEW PASS: "+str(checks)+" synthetic checks across 3 viewports; no outbound HTTP(S), no JS errors")
