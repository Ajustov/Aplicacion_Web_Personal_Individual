from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs
from datetime import datetime
import os
import mysql.connector

# CONFIGURACIÓN DE LA BASE DE DATOS MYSQL
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",      # cambia si tu MySQL tiene contraseña
    "database": "contactos_db"
}

class MiServidor(BaseHTTPRequestHandler):

    # PETICIONES GET: Manejo de carga de archivos y navegación
    def do_GET(self):
        ruta = self.path

        # Enrutado inicial a la página principal
        if ruta == "/":
            ruta = "/index.html"

        archivo = ruta.lstrip("/")

        # Verificación y envío de archivos estáticos
        if os.path.isfile(archivo):
            self.send_response(200)

            # Asignación de Content-Type según extensión
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

            # Lectura y escritura del archivo en la respuesta
            with open(archivo, "rb") as f:
                self.wfile.write(f.read())
        else:
            self.send_error(404, "Archivo no encontrado")

    # PETICIONES POST: Procesamiento de datos del formulario
    def do_POST(self):

        if self.path == "/enviar":
            content_length = int(self.headers["Content-Length"])
            body = self.rfile.read(content_length).decode("utf-8")

            # Parseo de datos recibidos
            datos = parse_qs(body)
            mensaje = datos.get("mensaje", [""])[0]
            fecha_envio = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

            nombre = datos.get("nombre", [""])[0]
            email = datos.get("email", [""])[0]
            asunto = datos.get("asunto", [""])[0]
            fecha = datos.get("fecha", [""])[0]
            mensaje = datos.get("mensaje", [""])[0]

            # ALMACENAMIENTO: Registro de mensajes en archivo de texto
            with open("mensajes.txt", "a", encoding="utf-8") as f:
                f.write("---- NUEVO MENSAJE ----\n")
                f.write(f"Nombre: {nombre}\n")
                f.write(f"Email: {email}\n")
                f.write(f"Asunto: {asunto}\n")
                f.write(f"Fecha nacimiento: {fecha}\n")
                f.write(f"Mensaje: {mensaje}\n\n")
                
            # ALMACENAMIENTO: Guardar mensaje en MySQL
            try:
                conexion = mysql.connector.connect(**db_config)
                cursor = conexion.cursor()

                sql = """
                    INSERT INTO mensajes
                    (nombre, email, asunto, fecha_nacimiento, mensaje, fecha_envio)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """

                valores = (nombre, email, asunto, fecha, mensaje, fecha_envio)

                cursor.execute(sql, valores)
                conexion.commit()

                cursor.close()
                conexion.close()

            except Exception as e:
                print("Error al guardar en MySQL:", e)

            # RESPUESTA: Generación de confirmación en HTML
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()

            respuesta = f"""
            <html>
            <head>
                <meta charset="utf-8">
                <title>Mensaje enviado</title>
                <link rel="stylesheet" href="css/estilos.css">
            </head>
            <body>
                <main style="text-align:center; margin-top:50px;">
                    <h2>¡Mensaje enviado correctamente!</h2>
                    <p>Gracias <strong>{nombre}</strong>, hemos recibido tu mensaje.</p>
                    <a href="/contacto.html" class="boton">Volver al formulario</a>
                </main>
            </body>
            </html>
            """

            self.wfile.write(respuesta.encode("utf-8"))

# EJECUCIÓN: Configuración e inicio del servidor local
if __name__ == "__main__":
    puerto = 8000
    servidor = HTTPServer(("localhost", puerto), MiServidor)
    print(f"Servidor activo en http://localhost:{puerto}")
    servidor.serve_forever()