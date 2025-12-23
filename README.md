# Aplicación Web Personal – Laboratorio de Desarrollo Web

Este proyecto corresponde a una **aplicación web personal** desarrollada como parte del curso *Introducción al Desarrollo Web*.  
La aplicación integra tecnologías de **Frontend (HTML, CSS y JavaScript)** y **Backend (Python puro con MySQL)**, implementando un sitio web multipágina con funcionalidades interactivas, manejo de formularios y persistencia de datos.


## Tecnologías Utilizadas

- HTML5
- CSS3 (Flexbox y Grid)
- JavaScript (DOM, eventos, validaciones y juegos interactivos)
- Python 3.x (http.server)
- MySQL
- mysql-connector-python
- WampServer (recomendado)
- phpMyAdmin

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrese de contar con:

- Python 3.x instalado.
- Servidor de base de datos MySQL.
- WampServer (recomendado, utilizado durante el desarrollo).
- Navegador web actualizado (Chrome, Firefox, Edge).

## Instalación de WampServer (Recomendado)

Para configurar el entorno de base de datos, se recomienda instalar WampServer siguiendo la guía paso a paso disponible en el siguiente enlace:

https://www.youtube.com/watch?v=C7IQR0GUID8

Una vez instalado, verifique que los servicios de **Apache** y **MySQL** estén activos.

## Configuración de la Base de Datos

1. Inicie WampServer.
2. Acceda a **phpMyAdmin**.
3. Cree una nueva base de datos (por ejemplo: `contactos_web`).
4. Importe o copie el código SQL incluido en el archivo `.sql` del repositorio.
5. Ejecute el script para crear la tabla donde se almacenarán los mensajes del formulario de contacto.

## Ejecución del Servidor Web

1. Abra una terminal o consola en la carpeta raíz del proyecto.
2. Ejecute el archivo del servidor Python correspondiente.
3. Al iniciarse correctamente, se mostrará un mensaje indicando que el servidor está activo.

Ejemplo: Servidor activo en http://localhost:8000

## Acceso a la Aplicación

Abra un navegador web y acceda a la siguiente dirección:

Desde allí podrá navegar por todas las secciones del sitio web.


## Funcionalidades Principales

- Sitio web multipágina con navegación estructurada.
- Juegos interactivos desarrollados en JavaScript:
  - Tres en Raya.
  - Adivina el Número.
- Formulario de contacto con validaciones del lado del cliente.
- Cálculo automático de edad.
- Servidor backend en Python puro con manejo manual de rutas.
- Almacenamiento de mensajes en base de datos MySQL.
- Panel de administración protegido para visualizar mensajes.

## Panel de Administración

El panel administrativo permite visualizar los mensajes enviados desde el formulario de contacto.

Acceso: http://localhost:8000/admin

Esta sección está protegida mediante una contraseña simple y es accesible únicamente para el administrador.

## Estructura del Proyecto

El proyecto incluye archivos organizados por tipo:

- Archivos HTML para las páginas del sitio.
- Archivos CSS para estilos y animaciones.
- Archivos JavaScript para la lógica e interactividad.
- Archivo Python para el servidor backend.
- Archivo SQL para la base de datos.
- Archivo README con instrucciones de ejecución.

## Notas Finales

- Se recomienda ejecutar el proyecto en un entorno local.
- Asegúrese de que WampServer esté activo antes de iniciar el servidor Python.
- No cierre la consola del servidor mientras la aplicación esté en uso.

## Autor

**Alessandro Josue Justo Vilca**  
Escuela Profesional de Ingeniería de Sistemas  
Universidad Nacional de San Agustín – 2025


