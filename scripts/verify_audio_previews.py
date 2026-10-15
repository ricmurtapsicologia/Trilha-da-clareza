#!/usr/bin/env python3
"""Validação técnica de duração/codec/SHA; NÃO avalia naturalidade nem licença."""
import argparse
import hashlib
import json
import subprocess
from pathlib import Path
EXPECTED={"welcome","intro-pensamentos","intro-controle","intro-acao","skill-fatos","skill-controle","skill-passo","skill-palavras","skill-incerteza","skill-escolhas","grounding","ending"}

def verify(manifest_path, directory=None):
    manifest=json.loads(Path(manifest_path).read_text(encoding="utf-8"))
    items=manifest["items"]
    assert len(items)==12 and {x["id"] for x in items}==EXPECTED
    assert "não" in manifest["license_status"].lower() or "pendente" in manifest["license_status"].lower()
    for item in items:
        ident=item["id"]
        duration=float(item["duration_seconds"])
        assert (60<=duration<=90) if ident=="grounding" else (15<=duration<=35), (ident,duration)
        assert len(item["sha256"])==64 and all(ch in "0123456789abcdef" for ch in item["sha256"])
        if directory:
            file=Path(directory)/(ident+".mp3")
            assert file.is_file() and file.stat().st_size==item["bytes"],ident
            assert hashlib.sha256(file.read_bytes()).hexdigest()==item["sha256"],ident
            result=subprocess.check_output(["ffprobe","-v","error","-show_entries","stream=codec_name,channels,sample_rate:format=duration","-of","json",str(file)],text=True)
            info=json.loads(result)
            assert info["streams"][0]["codec_name"]=="mp3"
            assert int(info["streams"][0]["channels"])==1
            assert int(info["streams"][0]["sample_rate"])==22050
            assert abs(float(info["format"]["duration"])-duration)<0.15,ident
    print("PASS: 12 IDs/tempos/SHA"+(" e 12 arquivos MP3" if directory else " (manifesto sem MP3)"))
if __name__=="__main__":
    a=argparse.ArgumentParser()
    a.add_argument("--manifest",required=True)
    a.add_argument("--directory")
    x=a.parse_args()
    verify(x.manifest,x.directory)
