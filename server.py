from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs
from datetime import datetime
import os
import mysql.connector

# CONFIGURACIÓN: Parámetros de conexión a la base de datos MySQL
db_config = {
    "host": "localhost",
    "user": "root",
    "password": "",      # Cambia si tu MySQL tiene contraseña
    "database": "contactos_db"
}

class MiServidor(BaseHTTPRequestHandler):

    # PETICIONES GET: Manejo de carga de archivos, navegación y rutas protegidas
    def do_GET(self):
        ruta = self.path
        
        # ACCESO ADMIN: Generación del formulario de login para el administrador
        if ruta == "/admin":
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()

            html = """
            <html>
            <head>
                <meta charset="utf-8">
                <title>Acceso administrador</title>
                <link rel="stylesheet" href="css/estilos.css">
            </head>
            <body>
                <main style="max-width:400px;margin:50px auto;text-align:center;">
                    <h2>Acceso protegido</h2>
                    <form method="POST" action="/login">
                        <input type="password" name="password" placeholder="Contraseña" required>
                        <button type="submit">Ingresar</button>
                    </form>
                </main>
            </body>
            </html>
            """
            self.wfile.write(html.encode("utf-8"))
            return
        
        # CONSULTA DB: Recuperación y visualización de mensajes desde MySQL
        if ruta == "/ver_mensajes":
            try:
                conexion = mysql.connector.connect(**db_config)
                cursor = conexion.cursor()

                # Obtener mensajes ordenados por fecha de forma descendente
                cursor.execute("""
                    SELECT nombre, email, asunto, mensaje, fecha_envio
                    FROM mensajes
                    ORDER BY fecha_envio DESC
                """)
                mensajes = cursor.fetchall()

                cursor.close()
                conexion.close()

                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.end_headers()

                html = """
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Mensajes recibidos</title>
                    <link rel="stylesheet" href="css/estilos.css">
                    <link rel="stylesheet" href="css/animaciones.css">
                </head>
                <body>
                    <main style="width:80%;margin:auto;">
                        <h2>Mensajes recibidos</h2>
                """

                # Construcción dinámica de la lista de mensajes
                for m in mensajes:
                    html += f"""
                    <div style="border:1px solid #ccc;padding:10px;margin-bottom:10px;">
                        <strong>Nombre:</strong> {m[0]}<br>
                        <strong>Email:</strong> {m[1]}<br>
                        <strong>Asunto:</strong> {m[2]}<br>
                        <strong>Mensaje:</strong> {m[3]}<br>
                        <small>{m[4]}</small>
                    </div>
                    """

                html += """
                        <a href="/" class="boton">Volver al inicio</a><br><br>
                        <button id="btnSubir">↑</button>
                    </main>
                </body>
                </html>
                """
                self.wfile.write(html.encode("utf-8"))

            except Exception as e:
                self.send_error(500, f"Error al obtener mensajes: {e}")
            return

        # ENRUTADO: Gestión de archivos estáticos (HTML, CSS, JS, Imágenes)
        if ruta == "/":
            ruta = "/index.html"

        archivo = ruta.lstrip("/")

        if os.path.isfile(archivo):
            self.send_response(200)
            
            # Cabeceras según el tipo de archivo solicitado
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

            # Envío del contenido del archivo binario
            with open(archivo, "rb") as f:
                self.wfile.write(f.read())
        else:
            self.send_error(404, "Archivo no encontrado")

    # PETICIONES POST: Procesamiento de login y envío de formularios
    def do_POST(self):

        # LOGIN: Verificación de credenciales de administrador
        if self.path == "/login":
            content_length = int(self.headers["Content-Length"])
            body = self.rfile.read(content_length).decode("utf-8")
            datos = parse_qs(body)
            password = datos.get("password", [""])[0]

            if password == "admin123":  # Validación de acceso simple
                self.send_response(302)
                self.send_header("Location", "/ver_mensajes")
                self.end_headers()
            else:
                self.send_response(200)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.end_headers()
                self.wfile.write("""
                <html>
                <body style="text-align:center;margin-top:50px;">
                    <h2>Contraseña incorrecta</h2>
                    <a href="/admin">Volver</a>
                </body>
                </html>
                """.encode("utf-8"))
            return
        
        # PROCESAMIENTO: Captura de datos del formulario de contacto
        if self.path == "/enviar":
            content_length = int(self.headers["Content-Length"])
            body = self.rfile.read(content_length).decode("utf-8")
            datos = parse_qs(body)
            
            fecha_envio = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            nombre = datos.get("nombre", [""])[0]
            email = datos.get("email", [""])[0]
            asunto = datos.get("asunto", [""])[0]
            fecha = datos.get("fecha", [""])[0]
            mensaje = datos.get("mensaje", [""])[0]

            # LOG LOCAL: Registro de respaldo en archivo de texto
            with open("mensajes.txt", "a", encoding="utf-8") as f:
                f.write("---- NUEVO MENSAJE ----\n")
                f.write(f"Nombre: {nombre}\n")
                f.write(f"Email: {email}\n")
                f.write(f"Asunto: {asunto}\n")
                f.write(f"Fecha nacimiento: {fecha}\n")
                f.write(f"Mensaje: {mensaje}\n\n")
                
            # MYSQL: Inserción de los datos en la base de datos
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

            # RESPUESTA: Página de confirmación tras envío exitoso
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

# EJECUCIÓN: Configuración e inicio del servidor en el puerto local
if __name__ == "__main__":
    puerto = 8000
    servidor = HTTPServer(("localhost", puerto), MiServidor)
    print(f"Servidor activo en http://localhost:{puerto}")
    servidor.serve_forever()