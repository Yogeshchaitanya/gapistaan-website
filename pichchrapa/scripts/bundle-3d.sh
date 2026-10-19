#!/bin/sh
# Rebuilds public/js/stunt3d.js (the 3D Raja + Mantri lane above the reel strip) from src3d/.
# Needs network once, to fetch three@0.170.0 and esbuild into a temp folder (nothing is added to the repo).
set -e
HERE="$(cd "$(dirname "$0")/.." && pwd)"
TMP="${TMPDIR:-/tmp}/pichchrapa-3d-build"
mkdir -p "$TMP"
[ -d "$TMP/node_modules/three" ] || (cd "$TMP" && npm init -y >/dev/null && npm install --no-audit --no-fund three@0.170.0 esbuild@0.24.0 >/dev/null)
"$TMP/node_modules/.bin/esbuild" "$HERE/src3d/stunt3d.js" --bundle --minify --format=esm --target=es2020 \
  --alias:three="$TMP/node_modules/three/src/Three.js" \
  --alias:three/examples/jsm="$TMP/node_modules/three/examples/jsm" \
  --outfile="$HERE/public/js/stunt3d.js" --log-level=warning
ls -l "$HERE/public/js/stunt3d.js"
