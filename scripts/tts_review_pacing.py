#!/usr/bin/env python3
"""Pós-processa amostras EXISTENTES para escuta interna. NÃO publica, NÃO licencia."""
import argparse
import hashlib
import json
import subprocess
import tempfile
from pathlib import Path
from pydub import AudioSegment

TEMPO = 0.65
BREAKS = [(2.45,5.5),(7.08,5),(12.10,6),(16.19,5),(20.65,5.5)]
IDS = {"welcome","intro-pensamentos","intro-controle","intro-acao","skill-fatos","skill-controle","skill-passo","skill-palavras","skill-incerteza","skill-escolhas","grounding","ending"}

def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def produce(source, output):
    items=json.loads((source/"manifest.json").read_text(encoding="utf-8"))
    assert len(items)==12 and {i["id"] for i in items}==IDS
    output.mkdir(parents=True,exist_ok=True)
    records=[]
    with tempfile.TemporaryDirectory() as temp:
        for item in items:
            ident=item["id"]
            original=source/(ident+".mp3")
            if digest(original)!=item["sha256"]:
                raise ValueError("Arquivo de entrada adulterado: "+ident)
            wav=Path(temp)/(ident+".wav")
            subprocess.run(["ffmpeg","-hide_banner","-nostdin","-y","-loglevel","error","-i",str(original),"-af",f"atempo={TEMPO},loudnorm=I=-20:TP=-1.5:LRA=11","-ar","22050","-ac","1",str(wav)],check=True)
            audio=AudioSegment.from_wav(wav)
            if ident=="grounding":
                output_audio=AudioSegment.empty()
                pos=0
                for t,seconds in BREAKS:
                    end=int(t/TEMPO*1000)
                    assert pos<end<len(audio)
                    output_audio+=audio[pos:end]
                    output_audio+=AudioSegment.silent(duration=int(seconds*1000),frame_rate=22050)
                    pos=end
                output_audio+=audio[pos:]
                audio=output_audio
            result=output/(ident+".mp3")
            audio.export(result,format="mp3",bitrate="96k",parameters=["-ac","1"])
            length=len(AudioSegment.from_mp3(result))/1000
            assert (60<=length<=90) if ident=="grounding" else (15<=length<=35), (ident,length)
            records.append({"id":ident,"duration_seconds":round(length,2),"sha256":digest(result),"bytes":result.stat().st_size})
    (output/"manifest-v2.json").write_text(json.dumps({"status":"AMOSTRA NÃO HOMOLOGADA / USO PROFISSIONAL NÃO AUTORIZADO","items":records},ensure_ascii=False,indent=2),encoding="utf-8")
    print(f"OK: {len(records)} amostras experimentais e checksums. Sem publicação.")

if __name__=="__main__":
    p=argparse.ArgumentParser()
    p.add_argument("--source",required=True,type=Path)
    p.add_argument("--output",required=True,type=Path)
    a=p.parse_args()
    produce(a.source,a.output)
