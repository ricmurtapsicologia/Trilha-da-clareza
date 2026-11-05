"""Regressão UX 2.0: entrada orientada, um único endereço e navegação cognitiva.
Somente dados fictícios. Requer Playwright e HTTP/HTTPS.
"""
import argparse
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

p=argparse.ArgumentParser()
p.add_argument("--url", required=True)
args=p.parse_args()
url=args.url.rstrip("/")+"/"
assert urlparse(url).scheme in ("http","https")
host=urlparse(url).netloc
count=0
with sync_playwright() as playwright:
    browser=playwright.chromium.launch(headless=True)
    for width,height in [(320,760),(390,844),(768,1024),(1366,900)]:
        context=browser.new_context(viewport={"width":width,"height":height},reduced_motion="reduce",accept_downloads=True)
        page=context.new_page()
        errors=[]
        external=[]
        page.on("pageerror",lambda error:errors.append(str(error)))
        page.on("request",lambda req:external.append(req.url) if urlparse(req.url).netloc!=host else None)
        response=page.goto(url,wait_until="networkidle",timeout=60000)
        assert response and response.status==200
        assert page.get_by_role("heading",name="Vamos começar pelo que você precisa agora.").is_visible()
        assert page.locator(".route-card").count()==2
        assert page.get_by_role("button",name="Iniciar prática breve").count()==1
        assert page.get_by_role("button",name="Explorar as jornadas").count()==1
        assert page.locator(".footer-grid>div").count()==3
        assert page.locator(".welcome-steps span").count()==3
        assert page.evaluate("document.documentElement.scrollWidth<=window.innerWidth+1")
        assert page.locator(".route-card").first.bounding_box()["y"]<height, "Escolhas invisíveis na primeira dobra"
        count+=8

        page.get_by_role("button",name="Iniciar prática breve").click()
        assert page.url.rstrip("/")==url.rstrip("/")
        assert page.locator(".quick-ui").is_visible()
        assert page.get_by_role("heading",name="O que você precisa trabalhar agora?").is_visible()
        assert page.locator(".quick-onboard span").count()==3
        page.locator('.top-actions [data-action="select"]').click()
        assert page.locator(".journey-card").count()==3
        assert page.locator(".onboard-inline span").count()==3
        assert page.url.rstrip("/")==url.rstrip("/")
        count+=7

        page.locator('.journey-card [data-start="pensamentos"]').click()
        assert page.locator(".tile").count()==6
        page.locator('[data-action="pause"]').click()
        assert page.get_by_role("dialog").is_visible()
        page.get_by_role("button",name="Continuar jornada").click()
        assert not page.get_by_role("dialog").count()
        page.locator('.top-actions [data-action="help"]').click()
        assert page.get_by_role("heading",name="Como funciona a Trilha?").is_visible()
        assert "GitHub Pages" in page.locator(".help").inner_text() or "hospedagem" in page.locator(".help").inner_text().lower()
        assert page.url.rstrip("/")==url.rstrip("/")
        count+=7

        assert not errors, errors
        assert not external, external
        context.close()
    browser.close()
print(f"PASS UX2: {count} assertivas em 4 resoluções; navegação em URL única.")
