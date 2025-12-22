CREATE DATABASE contactos_db;
USE contactos_db;

CREATE TABLE mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    email VARCHAR(100),
    asunto VARCHAR(100),
    fecha_nacimiento DATE,
    mensaje TEXT,
    fecha_envio DATETIME
);
