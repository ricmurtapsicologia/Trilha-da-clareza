#!/usr/bin/env python3
"""Inspeciona recursos HTTP reais sem transmitir dados de usuários."""
import argparse, hashlib, json, ssl, urllib.request, urllib.error
from pathlib import Path
from urllib.parse import urljoin,urlparse

p=argparse.ArgumentParser()
p.add_argument("--url",required=True)
p.add_argument("--out",required=True)
args=p.parse_args()
base=args.url.rstrip("/")+"/"
assert urlparse(base).scheme in ("http","https")
host=urlparse(base).netloc
resources=["","style.css","dist/app.js","dist/content.js","dist/domain.js","assets/favicon.svg"]
records=[]
for path in resources:
    url=urljoin(base,path)
    with urllib.request.urlopen(urllib.request.Request(url,headers={"User-Agent":"Trilha-onda7-auditoria/1"}),timeout=30) as response:
        assert response.status==200,(path,response.status)
        assert urlparse(response.url).netloc==host,"Redirecionamento para host externo"
        data=response.read(2_000_000)
        assert data,(path,"vazio")
        headers={key.lower():value for key,value in response.headers.items()}
        if path=="": assert b"Trilha da Clareza" in data
        if path=="dist/app.js": assert b"speechSynthesis" in data
        records.append({"path":path or "/","status":response.status,"bytes":len(data),
          "sha256":hashlib.sha256(data).hexdigest(),"content_type":headers.get("content-type"),
          "security_headers":{k:headers.get(k) for k in ("content-security-policy","strict-transport-security","x-frame-options","x-content-type-options","referrer-policy","permissions-policy")},
          "cache_control":headers.get("cache-control")})
probe=urljoin(base,"__onda7_arquivo_inexistente_20261015__.txt")
try:
    with urllib.request.urlopen(probe,timeout=20) as response:
        raise AssertionError("Arquivo ausente respondeu HTTP "+str(response.status))
except urllib.error.HTTPError as exc:
    assert exc.code==404,("Arquivo inexistente:",exc.code)
out=Path(args.out)
out.parent.mkdir(parents=True,exist_ok=True)
out.write_text(json.dumps({"url":base,"records":records,"missing_path_status":404,
  "notice":"Cabeçalhos ausentes são lacuna de segurança da hospedagem, não aprovação de anti-iframe."},indent=2,ensure_ascii=False),encoding="utf-8")
print("WAVE7 HTTP PASS:",len(records),"recursos 200, ausente 404. Headers registrados no artefato.")
for key in ("content-security-policy","strict-transport-security","x-frame-options","x-content-type-options","referrer-policy"):
    val=records[0]["security_headers"][key]
    print("HEADER",key, "presente" if val else "ausente")
