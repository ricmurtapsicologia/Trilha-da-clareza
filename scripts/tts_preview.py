"""Gerar amostras neurais de revisão (sem uso clínico ou publicação).
Não incorpora modelos de voz ao repositório e não acessa dados de pacientes.
Requer Piper, ffmpeg, ffprobe e modelo local configurados via linha de comando.
"""
import argparse
import hashlib
import json
import subprocess
import sys
from pathlib import Path

parser=argparse.ArgumentParser()
parser.add_argument("--source",required=True)
parser.add_argument("--model",required=True)
parser.add_argument("--config",required=True)
parser.add_argument("--output",required=True)
args=parser.parse_args()
output=Path(args.output)
output.mkdir(parents=True,exist_ok=True)
items=json.loads(Path(args.source).read_text(encoding="utf-8"))
assert len(items)==12, "Esperados 12 roteiros"
ids=set()
manifest=[]
for item in items:
    ident=item["id"]
    assert ident not in ids and ident.replace("-","").isalpha(),ident
    ids.add(ident)
    text=item["text"]
    assert len(text)>30 and len(text)<2000
    wav=output/(ident+".wav")
    mp3=output/(ident+".mp3")
    subprocess.run([sys.executable,"-m","piper","--model",args.model,"--config",args.config,"--output_file",str(wav)],input=text+"\n",text=True,check=True)
    subprocess.run(["ffmpeg","-hide_banner","-nostdin","-y","-loglevel","error","-i",str(wav),"-af","loudnorm=I=-20:TP=-1.5:LRA=11","-ar","22050","-ac","1","-b:a","96k",str(mp3)],check=True)
    duration=float(subprocess.check_output(["ffprobe","-v","error","-show_entries","format=duration","-of","default=noprint_wrappers=1:nokey=1",str(mp3)],text=True).strip())
    assert duration>3 and mp3.stat().st_size>2048
    manifest.append({"id":ident,"title":item["title"],"duration_seconds":round(duration,2),"sha256":hashlib.sha256(mp3.read_bytes()).hexdigest(),"bytes":mp3.stat().st_size,"status":"AMOSTRA NÃO HOMOLOGADA"})
    wav.unlink()
(output/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding="utf-8")
(output/"LEIA_ANTES.txt").write_text(
    "TRILHA DA CLAREZA — VOZ PIPER FABER (PT-BR)\n"
    "Amostras experimentais, não homologadas e não integradas à página pública.\n"
    "Não utilizar comercial ou clinicamente até confirmação da licença completa do modelo/base, QA de voz e aprovação profissional.\n"
    "Fontes: https://huggingface.co/rhasspy/piper-voices/tree/v1.0.0/pt/pt_BR/faber/medium\n"
    "Discussão da licença: https://huggingface.co/rhasspy/piper-voices/discussions/111\n",
    encoding="utf-8"
)
print(f"AMOSTRAS PREPARADAS: {len(manifest)}, total={sum(x['bytes'] for x in manifest)} bytes")
