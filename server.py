from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs
import os

class MiServidor(BaseHTTPRequestHandler):

    def do_GET(self):
        ruta = self.path

        if ruta == "/":
            ruta = "/index.html"

        archivo = ruta.lstrip("/")

        if os.path.isfile(archivo):
            self.send_response(200)

            if archivo.endswith(".html"):
                self.send_header("Content-Type", "text/html; charset=utf-8")
            elif archivo.endswith(".css"):
                self.send_header("Content-Type", "text/css")
            elif archivo.endswith(".js"):
                self.send_header("Content-Type", "application/javascript")
            elif archivo.endswith(".jpg") or archivo.endswith(".png"):
                self.send_header("Content-Type", "image/jpeg")
            else:
                self.send_header("Content-Type", "text/plain")

            self.end_headers()

            with open(archivo, "rb") as f:
                self.wfile.write(f.read())
        else:
            self.send_error(404, "Archivo no encontrado")