"""Jornadas E2E em HTTP/HTTPS real, sem pacientes ou dados identificáveis.

Exemplos:
  python tests/hosted_e2e.py --url http://127.0.0.1:8765/
  python tests/hosted_e2e.py --url https://ricmurtapsicologia.github.io/Trilha-da-clareza/
"""
import argparse
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument("--url", required=True)
args = parser.parse_args()
base = args.url.rstrip("/") + "/"
allowed = urlparse(base).netloc
assert urlparse(base).scheme in ("http", "https")
count = 0

with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True)
    for width, height in ((390, 844), (1366, 900)):
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
        page.get_by_role("button", name="Explorar as jornadas").click()
        assert page.locator(".journey-card").count() == 3
        count += 4

        for journey in ("pensamentos", "controle", "acao"):
            page.locator(f'[data-start="{journey}"]').click()
            assert page.locator(".tile").count() == 6
            page.get_by_role("button", name="Ⅱ Fazer uma pausa").click()
            assert page.get_by_role("dialog").is_visible()
            assert page.locator(".layout").get_attribute("inert") is not None or page.get_by_role("dialog").is_visible()
            page.get_by_role("button", name="Continuar jornada").click()
            assert page.get_by_role("dialog").count() == 0
            count += 4
            for step in range(6):
                assert page.locator("button[data-choice]").count() == 3, (journey, step)
                assert page.locator('[data-action="next"]').is_disabled()
                page.locator('button[data-choice="0"]').click()
                initial_feedback = page.locator(".feedback").inner_text()
                assert len(initial_feedback) > 45
                page.locator('button[data-choice="2"]').click()
                assert page.locator(".feedback").inner_text() != initial_feedback
                assert page.locator('[data-action="next"]').is_enabled()
                page.locator('[data-action="next"]').click()
                count += 7
            assert page.get_by_text("Jornada concluída", exact=True).count() == 1
            if journey == "pensamentos":
                with page.expect_download(timeout=15000) as event:
                    page.get_by_role("button", name="Salvar minha reflexão").click()
                assert event.value.suggested_filename == "trilha-da-clareza-reflexao.txt"
                count += 1
            page.get_by_role("button", name="Explorar outra jornada").click()
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

print(f"E2E HTTP PASS: {count} verificações ({base}, viewport 390 e 1366).")
