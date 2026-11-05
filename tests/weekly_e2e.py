"""E2E: 6 etapas, continuidade cognitiva, biblioteca, plano e revisão, uma URL.
Usa exclusivamente entradas fictícias; não depende de backend clínico.
"""
import argparse
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect

parser=argparse.ArgumentParser()
parser.add_argument("--url",required=True)
args=parser.parse_args()
base=args.url.rstrip("/")+"/"
host=urlparse(base).netloc
checks=0
with sync_playwright() as api:
    browser=api.chromium.launch(headless=True)
    for width,height in ((320,760),(390,844),(768,1024),(1366,900)):
        context=browser.new_context(viewport={"width":width,"height":height},
                                     reduced_motion="reduce",accept_downloads=True)
        page=context.new_page()
        errors=[];external=[]
        page.on("pageerror",lambda err:errors.append(str(err)))
        page.on("request",lambda req:external.append(req.url) if urlparse(req.url).netloc!=host else None)
        resp=page.goto(base,wait_until="networkidle",timeout=60000)
        assert resp and resp.status==200
        page.get_by_role("button",name="Começar leitura da semana").click()
        expect(page.locator(".weekly-page")).to_have_count(1)
        expect(page.get_by_role("progressbar",name="Progresso completo da atividade")).to_have_attribute("aria-valuemax","6")
        expect(page.get_by_role("progressbar",name="Progresso completo da atividade")).to_have_attribute("aria-valuenow","1")
        assert page.url.rstrip("/")==base.rstrip("/")
        checks+=4

        page.get_by_role("button",name="Modo leitura").click()
        expect(page.locator("body")).to_have_class("reading-focus")
        page.get_by_role("button",name="Sair do modo leitura").click()
        expect(page.locator("body")).not_to_have_class("reading-focus")
        checks+=2

        page.get_by_role("button",name="Próxima parte").click()
        expect(page.get_by_role("progressbar",name="Progresso completo da atividade")).to_have_attribute("aria-valuenow","2")
        page.locator('.identity[data-action="home"]').click()
        assert "Leitura em andamento" in page.locator(".resume-strip").inner_text()
        page.get_by_role("button",name="Retomar de onde parei").click()
        expect(page.get_by_role("progressbar",name="Progresso completo da atividade")).to_have_attribute("aria-valuenow","2")
        page.get_by_role("button",name="Próxima parte").click()
        expect(page.get_by_role("progressbar",name="Progresso completo da atividade")).to_have_attribute("aria-valuenow","3")
        page.get_by_role("button",name="Interpretar o texto").click()
        expect(page.get_by_role("progressbar",name="Progresso completo da atividade")).to_have_attribute("aria-valuenow","4")
        checks+=6

        continue_button=page.get_by_role("button",name="Escolher uma ação")
        assert continue_button.is_disabled()
        wrong=page.locator('input[name="weekly-understanding"][value="a"]')
        wrong.check()
        expect(wrong).to_be_focused()
        assert "motivação" in page.locator("#weekly-feedback").inner_text()
        assert not continue_button.is_disabled()
        correct=page.locator('input[name="weekly-understanding"][value="b"]')
        correct.check()
        expect(correct).to_be_focused()
        assert "passo específico" in page.locator("#weekly-feedback").inner_text()
        page.locator('input[name="weekly-reason"][value="observavel"]').check()
        assert "informações observáveis" in page.locator("#weekly-reason-feedback").inner_text()
        continue_button.click()
        checks+=7

        expect(page.get_by_role("progressbar",name="Progresso completo da atividade")).to_have_attribute("aria-valuenow","5")
        assert page.get_by_role("button",name="Preparar minha síntese").is_disabled()
        page.locator('input[name="weekly-action"][value="inicio"]').check()
        page.locator('input[name="weekly-cue"][value="agenda"]').check()
        page.locator("#weekly-when").select_option("intervalo")
        page.locator('input[name="weekly-barrier"][value="tempo"]').check()
        assert "preparação inicial de um minuto" in page.locator("#weekly-fallback").inner_text()
        page.get_by_role("button",name="Preparar minha síntese").click()
        expect(page.get_by_role("progressbar",name="Progresso completo da atividade")).to_have_attribute("aria-valuenow","6")
        summary=page.locator("#weekly-summary").inner_text()
        assert "até cinco minutos" in summary
        assert "Depois de consultar minha agenda" in summary
        assert "Se não houver tempo" in summary
        assert "Num intervalo previamente reservado" in summary
        checks+=9

        with page.expect_download(timeout=15000) as event:
            page.get_by_role("button",name="Salvar plano (.txt)").click()
        download=event.value
        assert download.suggested_filename=="trilha-da-clareza-plano-semanal.txt"
        assert "Se–então:" in Path(download.path()).read_text(encoding="utf-8")
        page.get_by_role("button",name="Revisar uma tentativa").click()
        assert page.get_by_role("heading",name="O que aconteceu quando tentou?").is_visible()
        assert page.get_by_role("button",name="Salvar revisão (.txt)").is_disabled()
        page.locator('input[name="weekly-review"][value="parcial"]').check()
        page.locator('input[name="weekly-obstacle"][value="interrupcao"]').check()
        page.locator('input[name="weekly-adjust"][value="menor"]').check()
        assert "precisei interromper" in page.locator("#weekly-review-summary").inner_text()
        with page.expect_download(timeout=15000) as event2:
            page.get_by_role("button",name="Salvar revisão (.txt)").click()
        assert "Reduzir o próximo passo" in Path(event2.value.path()).read_text(encoding="utf-8")
        checks+=7

        page.get_by_role("button",name="Biblioteca").click()
        assert page.locator(".weekly-catalog-item").count()==4
        page.locator(".weekly-catalog-item").nth(1).get_by_role("button",name="Abrir leitura").click()
        assert "O que a preocupação tenta resolver?" in page.locator("#weekly-heading").inner_text()
        assert page.get_by_role("button",name="Salvar leitura completa (.txt)").is_visible()
        with page.expect_download(timeout=15000) as reading_event:
            page.get_by_role("button",name="Salvar leitura completa (.txt)").click()
        assert "PARTE 3:" in Path(reading_event.value.path()).read_text(encoding="utf-8")
        checks+=4

        page.emulate_media(media="print")
        assert page.locator(".weekly-print-content").is_visible()
        page.emulate_media(media="screen")
        page.locator('.identity[data-action="home"]').click()
        page.get_by_role("button",name="Revisar uma tentativa anterior").click()
        assert page.get_by_role("heading",name="O que aconteceu quando tentou?").is_visible()
        assert page.url.rstrip("/")==base.rstrip("/")
        checks+=4

        assert not errors,errors
        assert not external,external
        assert page.evaluate("localStorage.length===0 && sessionStorage.length===0")
        assert page.evaluate("document.documentElement.scrollWidth<=innerWidth+1")
        checks+=4
        context.close()
    browser.close()
print("WEEKLY E2E PASS:",checks,"verificações em quatro larguras; continuidade, leitura, revisão e privacidade.")
