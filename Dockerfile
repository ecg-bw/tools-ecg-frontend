FROM nginx:alpine

# Standard-HTML-Dateien von Nginx entfernen
RUN rm -rf /usr/share/nginx/html/*

# Deine index.html in das Web-Root kopieren
COPY index.html /usr/share/nginx/html/index.html

# Eigene optimierte Nginx-Konfiguration einbinden (SPA-Routing & Caching)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Port 80 im Container exponieren
EXPOSE 80

# Nginx im Vordergrund starten
CMD ["nginx", "-g", "daemon off;"]