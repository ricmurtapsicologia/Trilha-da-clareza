"""Jornadas E2E em HTTP/HTTPS real, sem pacientes ou dados identificáveis.

Exemplos:
  python tests/hosted_e2e.py --url http://127.0.0.1:8765/
  python tests/hosted_e2e.py --url https://ricmurtapsicologia.github.io/Trilha-da-clareza/
"""
import argparse
from urllib.parse import urlparse
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument("--url", required=True)
parser.add_argument("--candidate", action="store_true", help="Asserções específicas da versão em revisão")
args = parser.parse_args()
base = args.url.rstrip("/") + "/"
allowed = urlparse(base).netloc
evidence = Path('ux-evidencias')
if args.candidate:
    evidence.mkdir(exist_ok=True)
assert urlparse(base).scheme in ("http", "https")
count = 0

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    for width, height in ((320, 760), (390, 844), (768, 1024), (1366, 900)):
        context = browser.new_context(
            viewport={"width": width, "height": height},
            reduced_motion="reduce",
            accept_downloads=True,
        )
        page = context.new_page()
        problems = []
        external = []
        failures = []
        page.on("pageerror", lambda exc: problems.append(str(exc)))
        page.on("requestfailed", lambda req: failures.append(f"{req.url}: {req.failure}"))
        page.on("request", lambda req: external.append(req.url) if urlparse(req.url).netloc != allowed else None)

        response = page.goto(base, wait_until="networkidle", timeout=60000)
        assert response and response.status == 200, f"{base}: HTTP != 200"
        assert page.get_by_role("heading", name="Entre o que acontece e o que você faz, existe um espaço para escolher.").count() == 1
        assert page.locator("body").evaluate("(el) => el.scrollWidth <= innerWidth + 1"), f"Horizontal overflow ({width}px)"
        if args.candidate:
            page.screenshot(path=str(evidence / f"inicio-{width}.png"), full_page=True)
        if args.candidate:
            assert page.locator('.top-actions [data-action="help"]').is_visible(), f"Ajuda oculta em {width}px"
            count += 1
        page.get_by_role("button", name="Explorar as jornadas").click()
        assert page.locator(".journey-card").count() == 3
        if args.candidate:
            page.get_by_role("button", name="Ver transcrição").click()
            assert page.get_by_role("button", name="Ocultar transcrição").evaluate("(el) => document.activeElement === el"), "Foco da transcrição perdido"
            page.get_by_role("button", name="Ocultar transcrição").click()
            assert page.get_by_role("button", name="Ver transcrição").evaluate("(el) => document.activeElement === el")
            count += 2
        count += 4

        for journey in ("pensamentos", "controle", "acao"):
            page.locator(f'[data-start="{journey}"]').click()
            assert page.locator(".tile").count() == 6
            if args.candidate and journey == "pensamentos":
                page.locator('[data-choice="1"]').click()
                page.locator('.top-actions [data-action="select"]').click()
                assert page.locator('[data-action="resume-journey"]').count() == 1
                page.locator('[data-action="resume-journey"]').click()
                assert page.locator('[data-choice="1"]').get_attribute("aria-pressed") == "true"
                page.locator('.top-actions [data-action="help"]').click()
                assert page.locator('[data-action="resume-journey"]').count() == 1
                page.locator('[data-action="resume-journey"]').click()
                assert page.locator('[data-choice="1"]').get_attribute("aria-pressed") == "true"
                page.locator('[data-action="home"]').last.click()
                assert page.locator('[data-action="resume-journey"]').count() == 1
                page.locator('[data-action="resume-journey"]').click()
                page.evaluate("""() => { let b = document.querySelector('[data-choice="0"]'); b.dataset.choice = '99'; b.click(); }""")
                assert page.locator(".feedback").count() == 1, "Opção forjada não deve limpar escolha válida"
                page.locator('.top-actions [data-action="select"]').click()
                page.locator('[data-start="pensamentos"]').click()
                assert page.locator('[data-action="next"]').is_disabled(), "Reinício não apagou escolhas da sessão"
                count += 10
            page.get_by_role("button", name="Ⅱ Fazer uma pausa").click()
            assert page.get_by_role("dialog").is_visible()
            assert page.locator(".layout").get_attribute("inert") is not None or page.get_by_role("dialog").is_visible()
            if args.candidate:
                page.evaluate("""() => document.querySelector('.top-actions [data-action="select"]').click()""")
                assert page.get_by_role("dialog").is_visible(), "Fundo interagiu durante pausa"
                count += 1
            page.get_by_role("button", name="Continuar jornada").click()
            assert page.get_by_role("dialog").count() == 0
            count += 4
            for step in range(6):
                assert page.locator("button[data-choice]").count() == 3, (journey, step)
                assert page.locator('[data-action="next"]').is_disabled()
                if args.candidate:
                    assert page.locator(".choice-hint").count() == 1
                    page.locator('button[data-choice="0"]').scroll_into_view_if_needed()
                    previous_scroll = page.evaluate("window.scrollY")
                page.locator('button[data-choice="0"]').click()
                if args.candidate:
                    if width <= 390 and step == 0 and journey == "pensamentos":
                        assert previous_scroll > 100, "Cenário não percorreu a página móvel"
                    assert page.evaluate("window.scrollY") >= previous_scroll - 60, "Escolha causou salto de volta ao topo"
                    count += 2
                initial_feedback = page.locator(".feedback").inner_text()
                assert len(initial_feedback) > 45
                page.locator('button[data-choice="2"]').click()
                assert page.locator(".feedback").inner_text() != initial_feedback
                assert page.locator('[data-action="next"]').is_enabled()
                if args.candidate and journey == "pensamentos" and step == 0:
                    page.screenshot(path=str(evidence / f"desafio-{width}.png"), full_page=True)
                page.locator('[data-action="next"]').click()
                count += 7
            assert page.get_by_text("Jornada concluída", exact=True).count() == 1
            if journey == "pensamentos":
                with page.expect_download(timeout=15000) as event:
                    page.get_by_role("button", name="Salvar minha reflexão").click()
                assert event.value.suggested_filename == "trilha-da-clareza-reflexao.txt"
                count += 1
            page.get_by_role("button", name="Explorar outra jornada").click()
            if args.candidate:
                assert page.locator('[data-action="resume-journey"]').count() == 0, "Jornada concluída não deve oferecer retomada"
                count += 1
            count += 1

        page.locator('[data-start="pensamentos"]').click()
        page.locator('[data-choice="0"]').click()
        page.reload(wait_until="networkidle")
        assert page.locator(".hero").count() == 1
        assert not problems, f"Erros JavaScript: {problems}"
        assert not external, f"Requisições externas: {external}"
        assert not failures, f"Falhas de rede: {failures}"
        count += 4
        context.close()
    browser.close()

print(f"E2E HTTP PASS: {count} verificações ({base}, viewports 320, 390, 768 e 1366; candidata={args.candidate}).")
