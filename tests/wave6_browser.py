"""Wave 6: WCAG automated scan + privacy/keyboard smoke (synthetic interactions only).
axe-core is loaded from a pinned, LOCAL CI file; bypass_csp only to inject the audit
engine. This is NOT a claim of certified WCAG conformance or real screen-reader QA.
"""
import argparse
import json
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

parser=argparse.ArgumentParser()
parser.add_argument("--url",required=True)
parser.add_argument("--axe",required=True,type=Path)
args=parser.parse_args()
assert args.axe.is_file() and args.axe.stat().st_size>200000
base=args.url.rstrip("/")+"/"
host=urlparse(base).netloc
out=Path("wave6-evidence")
out.mkdir(exist_ok=True)
results=[]
external=[]
errors=[]
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    for width,height in ((320,800),(390,844),(1366,900)):
        context=browser.new_context(viewport={"width":width,"height":height},bypass_csp=True,reduced_motion="reduce")
        page=context.new_page()
        page.on("request",lambda req: external.append(req.url) if urlparse(req.url).netloc != host else None)
        page.on("pageerror",lambda exc: errors.append(str(exc)))
        response=page.goto(base,wait_until="networkidle",timeout=60000)
        assert response and response.status==200
        assert page.locator('meta[name="referrer"]').get_attribute("content")=="no-referrer"
        csp=page.locator('meta[http-equiv="Content-Security-Policy"]').get_attribute("content")
        assert "connect-src 'none'" in csp and "script-src 'self'" in csp
        assert "frame-ancestors" not in csp, "Meta CSP does not enforce frame-ancestors"
        page.add_script_tag(content=args.axe.read_text(encoding="utf-8"))
        assert page.evaluate("typeof axe === 'object'")

        def scan(stage):
            report=page.evaluate("""async () => {
              const r = await axe.run(document, {runOnly: {type:'tag',values:
              ['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}});
              return {violations:r.violations.map(v=>({
                id:v.id,impact:v.impact,help:v.help,nodes:v.nodes.map(n=>({
                target:n.target,failureSummary:n.failureSummary}))})),
                passes:r.passes.length,incomplete:r.incomplete.length};
            }""")
            results.append({"width":width,"stage":stage,**report})
            if report["violations"]:
                print(f"A11Y FINDINGS {width}/{stage}: "+
                    ", ".join(f'{v["id"]}({v["impact"]}:{len(v["nodes"])})' for v in report["violations"]))

        page.keyboard.press("Tab")
        # a visible skip link is the first keyboard focus candidate.
        assert page.evaluate("document.activeElement.classList.contains('skip')")
        scan("home")
        page.locator('[data-action="select"]').first.click()
        scan("select")
        page.locator('[data-start="pensamentos"]').click()
        scan("challenge-empty")
        page.locator('[data-choice="0"]').click()
        scan("challenge-feedback")
        page.locator('[data-action="pause"]').click()
        assert page.get_by_role("dialog").is_visible()
        assert page.locator(".layout").get_attribute("inert") is not None
        assert page.get_by_role("button",name="Continuar jornada").evaluate("(e)=>e===document.activeElement")
        scan("pause")
        page.keyboard.press("Escape")
        assert page.get_by_role("dialog").count()==0
        for step in range(6):
            if step>0: page.locator('[data-choice="0"]').click()
            page.locator('[data-action="next"]').click()
        scan("finish")
        page.locator('[data-action="help"]').first.click()
        assert "hospedagem GitHub Pages" in page.locator(".help").inner_text()
        scan("help")
        assert page.context.cookies()==[], "Cookies inesperados"
        storage=page.evaluate("""() => ({local:localStorage.length,session:sessionStorage.length,
          db: ('indexedDB' in window) ? 'supported' : 'unavailable'})""")
        assert storage["local"]==0 and storage["session"]==0
        assert not page.locator("form").count(), "Form de coleta de dados inesperado"
        context.close()
    browser.close()
assert not external, f"Recursos externos detectados: {external}"
assert not errors, f"Exceções JS: {errors}"
(out/"axe-automated-report.json").write_text(json.dumps(results,ensure_ascii=False,indent=2),encoding="utf-8")
bad=[{"width":r["width"],"stage":r["stage"],"violations":r["violations"]} for r in results if r["violations"]]
print(f"WAVE6: {len(results)} cenários, 0 cookies, 0 storage, 0 recursos externos; axe violations={len(bad)}.")
assert not bad,"WCAG automated audit found issues; inspect wave6-evidence/axe-automated-report.json"
