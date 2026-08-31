#!/usr/bin/env bash
# Builds the production image and curls the five URLs the nginx rewrite exists to fix.
# See DECISIONS.md D9. Exits non-zero on any mismatch. Skips cleanly with no docker.
set -uo pipefail

# 4399, not 4321: `verify:live` serves out/ on 4321 and the two must not collide.
PORT=${PORT:-4399}
IMAGE=talentsync-smoke
NAME=talentsync-smoke
BASE="http://127.0.0.1:$PORT"   # 127.0.0.1, not localhost: docker binds v4, localhost may resolve to ::1

command -v docker >/dev/null 2>&1 || { echo "SKIP: docker not installed — nginx smoke test not run"; exit 0; }
docker info >/dev/null 2>&1 || { echo "SKIP: docker daemon not running — start Docker and re-run \`npm run smoke\`"; exit 0; }

cleanup() { docker rm -f "$NAME" >/dev/null 2>&1 || true; }
trap cleanup EXIT
cleanup

echo "building $IMAGE (this runs npm ci + next build inside the image)..."
docker build -t "$IMAGE" . || { echo "FAIL: docker build"; exit 1; }
docker run -d --name "$NAME" -p "$PORT:3000" "$IMAGE" >/dev/null || { echo "FAIL: docker run (is port $PORT free?)"; exit 1; }

for _ in $(seq 1 40); do
  curl -sS -o /dev/null "$BASE/" 2>/dev/null && break
  sleep 0.25
done

fails=0
hdr=$(mktemp)
body=$(mktemp)
trap 'rm -f "$hdr" "$body"; cleanup' EXIT

# check <path> <want-status> [want-location]
check() {
  local path=$1 want=$2 wantloc=${3:-}
  local got loc
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

check /privacy      301 /privacy/   # relative, no scheme, no :3000
check /privacy/     200
check /nonexistent  404
# ...and the 404 must be the branded 404.html, not the homepage served with a 404 code
if ! docker exec "$NAME" cat /usr/share/nginx/html/404.html 2>/dev/null | diff -q - "$body" >/dev/null 2>&1; then
  echo "FAIL /nonexistent — body is not /404.html (error_page not wired, or 404.html missing from out/)"
  fails=$((fails + 1))
fi
check /sitemap.xml  200
check /robots.txt   200

if [ "$fails" -ne 0 ]; then
  echo
  echo "SMOKE FAIL — $fails of 6 assertions failed"
  echo "  (a /privacy 404 instead of 301 usually just means the route is not in out/ yet)"
  exit 1
fi
echo "SMOKE PASS — 6/6"
