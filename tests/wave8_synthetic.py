"""Onda 8: ensaio de tarefas SINTÉTICAS de pré-piloto. Nunca com pessoas reais."""
import argparse, json
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

p=argparse.ArgumentParser()
p.add_argument('--url',required=True)
p.add_argument('--out',required=True)
args=p.parse_args()
url=args.url.rstrip('/')+'/'
host=urlparse(url).netloc
assert urlparse(url).scheme in ('http','https')
checks=[]
forbidden=[]
errors=[]
with sync_playwright() as play:
    browser=play.chromium.launch(headless=True)
    for width,height in [(390,844),(1366,900)]:
        context=browser.new_context(viewport={'width':width,'height':height},reduced_motion='reduce')
        page=context.new_page()
        page.on('request',lambda r: forbidden.append(r.url) if urlparse(r.url).netloc!=host else None)
        page.on('pageerror',lambda e: errors.append(str(e)))
        response=page.goto(url,wait_until='networkidle',timeout=60000)
        assert response and response.status==200
        checks.append(f'{width}:abrir')
        page.locator('.top-actions [data-action="help"]').click()
        text=page.locator('.help').inner_text()
        assert 'não é teste psicológico' in text.lower() and 'privacidade' in text.lower()
        checks.append(f'{width}:entender_limites_tecnicamente_presentes')
        page.locator('[data-action="select"]').last.click()
        page.locator('[data-start="pensamentos"]').click()
        assert page.locator('.tile').count()==6
        checks.append(f'{width}:iniciar')
        page.locator('[data-choice="0"]').click()
        assert page.locator('.feedback').count()==1
        checks.append(f'{width}:feedback')
        page.locator('[data-action="transcript"]').click()
        assert page.locator('.text-audio').count()==1
        page.locator('[data-action="transcript"]').click()
        checks.append(f'{width}:transcricao')
        page.locator('[data-action="pause"]').click()
        assert page.get_by_role('dialog').is_visible()
        page.get_by_role('button',name='Continuar jornada').click()
        assert not page.get_by_role('dialog').count()
        checks.append(f'{width}:pausa_e_retomada')
        page.locator('.top-actions [data-action="help"]').click()
        assert page.locator('[data-action="resume-journey"]').count()==1
        page.locator('[data-action="resume-journey"]').click()
        assert page.locator('[data-choice="0"]').get_attribute('aria-pressed')=='true'
        checks.append(f'{width}:retomar_temporario')
        page.locator('[data-action="pause"]').click()
        page.get_by_role('button',name='Encerrar e descartar respostas').click()
        assert page.locator('[data-action="resume-journey"]').count()==0
        page.locator('[data-start="pensamentos"]').click()
        assert page.locator('[data-action="next"]').is_disabled()
        checks.append(f'{width}:descarte_irreversivel_na_sessao')
        assert context.cookies()==[]
        assert page.evaluate('localStorage.length===0 && sessionStorage.length===0')
        checks.append(f'{width}:sem_persistencia_navegador')
        context.close()
    browser.close()
assert not errors,errors
assert not forbidden,forbidden
report={'status':'PASS','kind':'SYNTHETIC_ONLY','human_sessions':0,'clinical_approval':False,
  'usability_with_people':False,'participant_personal_data':False,'url':url,
  'viewports':['390x844','1366x900'],'checks':len(checks),'tasks':checks,
  'limitations':['No human comprehension evaluated','No clinical outcomes or efficacy measured',
                 'No consent gathered','No patients recruited','Not a screen reader or physical device test']}
out=Path(args.out)
out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'ONDA8 SYNTHETIC PASS: {len(checks)} verificações, 0 participantes, 0 dados pessoais. Gate clínico inalterado.')
