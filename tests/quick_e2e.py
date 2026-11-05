"""E2E da prática breve sem cadastro, dados reais ou chamadas externas.

Uso: python tests/quick_e2e.py --url http://127.0.0.1:8765/
"""
import argparse
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect

parser = argparse.ArgumentParser()
parser.add_argument("--url", required=True)
args = parser.parse_args()
url = args.url
host = urlparse(url).netloc
assert urlparse(url).scheme in ("http", "https")
count = 0
with sync_playwright() as browser_api:
    browser = browser_api.chromium.launch(headless=True)
    for width, height in ((320,760),(390,844),(768,1024),(1366,900)):
        context = browser.new_context(viewport={"width":width,"height":height},accept_downloads=True,reduced_motion="reduce")
        page = context.new_page()
        failures=[]
        external=[]
        page.on("pageerror",lambda error: failures.append(str(error)))
        page.on("request",lambda req: external.append(req.url) if urlparse(req.url).netloc!=host else None)
        resp=page.goto(url,wait_until="networkidle",timeout=60000)
        assert resp is not None and resp.status==200
        assert page.locator(".welcome").count()==1
        assert page.locator(".route-card").count()==2
        page.locator('[data-action="quick"]').first.click()
        assert page.url.rstrip("/") == url.rstrip("/"), "A prática deve permanecer na mesma URL"
        assert page.get_by_role("heading",name="O que você precisa trabalhar agora?").is_visible()
        assert page.locator("[data-focus]").count()==3
        assert page.evaluate("document.documentElement.scrollWidth <= window.innerWidth + 1")
        count+=3

        page.locator('[data-focus="antecipacao"]').click()
        assert page.locator('[data-step="1"]').is_visible()
        page.locator("#observacao").fill("ANOTACAO_PRIVADA_123")
        page.locator("#interpretacao").fill("PREVISAO_PRIVADA_987")
        page.locator("#intensidade-inicial").select_option("7")
        page.locator('[data-next="2"]').click()
        assert page.locator('[data-step="2"]').is_visible()
        page.locator('[data-next="3"]').click()
        page.locator('[data-next="4"]').click()
        assert page.locator("#action-warning").is_visible()
        page.locator('#action-options input[value="verificar"]').check()
        page.locator("#acao-pessoal").fill("PASSO_PRIVADO_567")
        page.locator("#momento").select_option("Nos próximos dias")
        page.locator('[data-next="4"]').click()
        page.locator("#intensidade-final").select_option("4")
        neutral=page.locator("#resumo").inner_text()
        assert "Verificar uma informação" in neutral
        assert "ANOTACAO_PRIVADA" not in neutral
        assert "PASSO_PRIVADO" not in neutral
        count+=12

        page.locator("#copiar").click()
        expect(page.locator('#mensagem')).not_to_be_empty(timeout=10000)
        assert page.locator("#mensagem").inner_text()
        with page.expect_download(timeout=15000) as download_info:
            page.locator("#baixar").click()
        download=download_info.value
        assert download.suggested_filename=="trilha-da-clareza-reflexao-pessoal.txt"
        text=Path(download.path()).read_text(encoding="utf-8")
        assert "ANOTACAO_PRIVADA_123" in text
        assert "PREVISAO_PRIVADA_987" in text
        assert "PASSO_PRIVADO_567" in text
        count+=4

        page.locator("#reiniciar").click()
        assert page.locator('[data-step="0"]').is_visible()
        assert page.locator("#observacao").input_value()==""
        assert page.locator("#intensidade-inicial").input_value()==""
        assert page.locator("#resumo").inner_text()==""
        count+=4

        for focus, action in (("autocobranca","priorizar"),("limites","apoio")):
            page.locator('[data-focus="'+focus+'"]').click()
            page.locator('[data-next="2"]').click()
            page.locator('[data-next="3"]').click()
            page.locator('#action-options input[value="'+action+'"]').check()
            page.locator('[data-next="4"]').click()
            assert page.locator('[data-step="4"]').is_visible()
            page.locator("#reiniciar").click()
            count+=2

        page.locator('.top-actions [data-action="select"]').click()
        assert page.locator(".journey-card").count()==3, "As três jornadas originais continuam no mesmo endereço"
        assert page.url.rstrip("/") == url.rstrip("/")
        assert not failures, failures
        assert not external, external
        context.close()
    browser.close()
print("PASS: "+str(count)+" verificações E2E em quatro larguras; sem solicitações externas.")