# Stage 1: Build
# node:20-alpine satisfies next@16's `engines: { node: ">=20.9.0" }`.
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# The export is now ~24 routes across nested directories, not one index.html.
# Assert the shape before the runtime stage inherits it: 404.html is what
# nginx's `error_page 404` serves, sitemap.xml comes from app/sitemap.ts, and
# privacy/index.html proves a nested trailingSlash route actually emitted.
# Without this a build regression ships a one-page site and only fails in prod.
RUN test -f out/404.html && test -f out/sitemap.xml && test -f out/robots.txt \
  && test -f out/privacy/index.html \
  || (echo "FATAL: out/ is missing an expected route — next build produced a broken export"; find out -maxdepth 2 -type d; exit 1)

# Stage 2: Production
FROM nginx:alpine AS production

# nginx:alpine ships its own index.html and 50x.html in this directory, and
# `COPY <dir> <dest>` merges rather than replaces. Clear it so the served tree
# is exactly `out/` and no stock page can be reached at a real URL.
RUN rm -rf /usr/share/nginx/html/*

# Copy the whole built static tree — every nested route directory, 404.html,
# sitemap.xml, robots.txt, _next/ and images/.
COPY --from=builder /app/out/ /usr/share/nginx/html/

# Copy nginx config: =404 fallback, error_page 404 /404.html, and the
# absolute_redirect/port_in_redirect off pair Railway's TLS termination needs.
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
