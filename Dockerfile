# Build-Stage
FROM node:22-alpine AS build

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

# Produktions-Stage
FROM nginx:alpine

# Standard-HTML-Dateien von Nginx entfernen
RUN rm -rf /usr/share/nginx/html/*

# Deine index.html in das Web-Root kopieren
COPY --from=build /app/build /usr/share/nginx/html/

# Eigene optimierte Nginx-Konfiguration einbinden (SPA-Routing & Caching)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port 80 im Container exponieren
EXPOSE 80

# Nginx im Vordergrund starten
CMD ["nginx", "-g", "daemon off;"]