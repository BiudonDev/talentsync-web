#!/usr/bin/env bash
# Builds the production image and curls the URLs the nginx rewrite exists to fix.
# See DECISIONS.md D9. Exits non-zero on any mismatch. Skips cleanly with no docker.
set -uo pipefail

# PORT=0 means "let Docker pick a free one", and that is the default on purpose.
# A fixed port is a collision waiting to happen on a shared dev box: a stray listener
# on the old hardcoded 4399 answered every request with 404, the run reported 9 of 10
# assertions failed, and the image under test was perfect. The script must not be able
# to grade a server it did not start. Set PORT to pin it if you need a stable URL.
PORT=${PORT:-0}
IMAGE=talentsync-smoke
NAME=talentsync-smoke

command -v docker >/dev/null 2>&1 || { echo "SKIP: docker not installed — nginx smoke test not run"; exit 0; }
docker info >/dev/null 2>&1 || { echo "SKIP: docker daemon not running — start Docker and re-run \`npm run smoke\`"; exit 0; }

cleanup() { docker rm -f "$NAME" >/dev/null 2>&1 || true; }
trap cleanup EXIT
cleanup

echo "building $IMAGE (this runs npm ci + next build inside the image)..."
docker build -t "$IMAGE" . || { echo "FAIL: docker build"; exit 1; }
# 127.0.0.1, not 0.0.0.0: this is a local test, it has no business being reachable off-box.
docker run -d --name "$NAME" -p "127.0.0.1:$PORT:3000" "$IMAGE" >/dev/null || { echo "FAIL: docker run — see docker's error above (a pinned PORT already in use is the usual cause)"; exit 1; }
mapped=$(docker port "$NAME" 3000 | head -1 | sed 's/.*://')
[ -n "$mapped" ] || { echo "FAIL: could not read the published port back from docker"; exit 1; }
BASE="http://127.0.0.1:$mapped"
echo "container $NAME listening on $BASE"

# Wait for a real 200 on /, not merely for something to answer: "answered at all" is
# what let a foreign listener pass for the container under test.
ready=
for _ in $(seq 1 60); do
  [ "$(curl -s -o /dev/null -w '%{http_code}' "$BASE/" 2>/dev/null)" = "200" ] && { ready=1; break; }
  sleep 0.25
done
[ -n "$ready" ] || { echo "FAIL: $BASE/ never returned 200 — nginx did not come up"; docker logs "$NAME" 2>&1 | tail -20; exit 1; }

fails=0
total=0
hdr=$(mktemp)
body=$(mktemp)
trap 'rm -f "$hdr" "$body"; cleanup' EXIT

# check <path> <want-status> [want-location]
check() {
  local path=$1 want=$2 wantloc=${3:-}
  local got loc
  total=$((total + 1))
  got=$(curl -sS -o "$body" -D "$hdr" -w '%{http_code}' "$BASE$path")
  if [ "$got" != "$want" ]; then
    echo "FAIL $path — status $got, wanted $want"
    fails=$((fails + 1))
    return
  fi
  if [ -n "$wantloc" ]; then
    loc=$(tr -d '\r' < "$hdr" | sed -n 's/^[Ll]ocation: *//p')
    if [ "$loc" != "$wantloc" ]; then
      echo "FAIL $path — Location \"$loc\", wanted \"$wantloc\" (absolute_redirect/port_in_redirect not off?)"
      fails=$((fails + 1))
      return
    fi
  fi
  echo "ok   $path -> $got${wantloc:+ Location: $wantloc}"
}

# A slashless inbound URL must 301 to a RELATIVE Location. Behind Railway's TLS
# termination nginx sees plain http on :3000, so an absolute redirect would send
# the visitor to http://host:3000/… — wrong scheme, unroutable port.
check /privacy      301 /privacy/
check /privacy/     200

# One service route. These are the money pages and the ones inbound links hit
# without a trailing slash.
check /b2b-engineer-recruitment  301 /b2b-engineer-recruitment/
check /b2b-engineer-recruitment/ 200

# A hub that is BOTH a page and a parent directory. try_files has to fall past $uri
# (a directory, not a file) and past $uri.html (does not exist) to $uri/ — the classic
# place a static-export nginx config serves a directory listing or a 404 instead.
check /case-studies  301 /case-studies/
check /case-studies/ 200

# One dynamic child route — the nested case, where a broken redirect loses the
# whole path segment rather than just the slash.
check /case-studies/barca-mobile  301 /case-studies/barca-mobile/
check /case-studies/barca-mobile/ 200

check /nonexistent  404
# ...and the 404 must be the branded 404.html, not the homepage served with a 404 code
total=$((total + 1))
if ! docker exec "$NAME" cat /usr/share/nginx/html/404.html 2>/dev/null | diff -q - "$body" >/dev/null 2>&1; then
  echo "FAIL /nonexistent — body is not /404.html (error_page not wired, or 404.html missing from out/)"
  fails=$((fails + 1))
else
  echo "ok   /nonexistent body == /404.html"
fi
check /sitemap.xml  200
check /robots.txt   200

if [ "$fails" -ne 0 ]; then
  echo
  echo "SMOKE FAIL — $fails of $total assertions failed"
  echo "  (a 404 instead of 301/200 usually just means the route is not in out/ yet)"
  exit 1
fi
echo "SMOKE PASS — $total/$total"
