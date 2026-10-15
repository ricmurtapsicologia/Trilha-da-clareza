#!/usr/bin/env bash
# Read-only public HTTPS smoke; no clinical information.
set -euo pipefail
BASE='https://ricmurtapsicologia.github.io/Trilha-da-clareza'
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
for path in / /style.css /dist/app.js /dist/content.js /dist/domain.js /assets/favicon.svg; do
  name="$(printf %s "$path" | tr '/' '_' )"
  printf 'GET %s%s\n' "$BASE" "$path"
  curl --fail --location --silent --show-error --retry 4 --retry-all-errors --retry-delay 3 --max-time 25 "$BASE$path" -o "$TMP/$name"
  test -s "$TMP/$name"
done
grep -q 'Trilha da Clareza' "$TMP/_"
grep -q 'connect-src' "$TMP/_"
grep -q 'speechSynthesis' "$TMP/_dist_app.js"
grep -q 'intro-controle' "$TMP/_dist_content.js"
printf 'PASS: 6 recursos HTTPS, identidade, CSP e módulos carregados\n'
