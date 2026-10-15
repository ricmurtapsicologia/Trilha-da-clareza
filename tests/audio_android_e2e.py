"""Android TTS mock QA: voice list empty, Google non-local voice, local voice, failure.
Tests call browser SpeechSynthesis with mocked engine. Does NOT prove audible sound
on a physical Android device, or remote TTS availability.
"""
import argparse
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright
parser=argparse.ArgumentParser()
parser.add_argument('--url',required=True)
args=parser.parse_args()
base=args.url.rstrip('/')+'/'
assert urlparse(base).scheme in ('http','https')
total=0
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    for width in [390,1366]:
        context=browser.new_context(viewport={'width':width,'height':844})
        page=context.new_page()
        page.add_init_script("""
          window.__speechTest={voices:[],spoken:[],cancelled:0,last:null};
          class MockSpeechSynthesisUtterance {
            constructor(text){this.text=text;this.voice=null;this.lang='';this.rate=1;this.pitch=1;this.volume=1;}
          }
          Object.defineProperty(window,'SpeechSynthesisUtterance',{configurable:true,value:MockSpeechSynthesisUtterance});
          Object.defineProperty(window,'speechSynthesis',{configurable:true,value:{
            cancel(){window.__speechTest.cancelled++},
            getVoices(){return window.__speechTest.voices},
            speak(utterance){
              window.__speechTest.last=utterance;
              window.__speechTest.spoken.push({
                lang:utterance.lang,text:utterance.text,voice:utterance.voice?.name||null
              });
            }
          }});
        """)
        res=page.goto(base,wait_until='networkidle',timeout=60000)
        assert res and res.status==200
        page.get_by_role('button',name='Explorar as jornadas').click()
        audio=page.locator('[data-audio="welcome"]')
        assert audio.count()==1
        assert "Google" in page.locator('[data-audio-feedback]').inner_text()
        page.evaluate("window.__speechTest.voices=[]")
        audio.click()
        assert page.evaluate("window.__speechTest.spoken.length")==1
        assert page.evaluate("window.__speechTest.spoken[0].lang")=="pt-BR"
        assert page.evaluate("window.__speechTest.spoken[0].voice") is None
        assert "Parar" in audio.inner_text()
        total+=4
        audio.click()
        assert "Ouvir orientação" in audio.inner_text()
        page.evaluate("window.__speechTest.voices=[{name:'Google português',lang:'pt-BR',localService:false}]")
        audio.click()
        assert page.evaluate("window.__speechTest.spoken.at(-1).voice")=="Google português"
        total+=2
        page.evaluate("window.__speechTest.last.onerror({error:'network'})")
        assert "não conseguiu reproduzir" in page.locator('[data-audio-feedback]').inner_text()
        assert "Ouvir orientação" in audio.inner_text()
        total+=2
        page.evaluate("""window.__speechTest.voices=[
          {name:'Google português',lang:'pt-BR',localService:false},
          {name:'Voz pt-BR local',lang:'pt-BR',localService:true}
        ]""")
        audio.click()
        assert page.evaluate("window.__speechTest.spoken.at(-1).voice")=="Voz pt-BR local"
        total+=1
        context.close()
    browser.close()
print(f"ANDROID TTS MOCK PASS: {total} asserts, voice list empty, Google fallback, local priority, visible error; NO physical sound test")
