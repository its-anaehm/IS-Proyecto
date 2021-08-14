DROP DATABASE IF EXISTS Websted ;
CREATE DATABASE Websted CHARACTER SET utf8 COLLATE utf8_unicode_ci;

USE Websted;

CREATE TABLE Usuario(
    id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(15) NOT NULL,
    Apellido VARCHAR(15) NOT NULL,
    Email VARCHAR(50) UNIQUE NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    Rol ENUM('Administrador', 'Usuario') DEFAULT 'Usuario',
    Contrasena VARCHAR(150) NOT NULL
);

CREATE TABLE Departamento(
    id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL
);

CREATE TABLE Municipio(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_departamento INT NOT NULL, 
    Nombre VARCHAR(50) NOT NULL,

    FOREIGN KEY (fk_id_departamento)
        REFERENCES Departamento(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Categoria(
    id INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(40) NOT NULL,
    Imagen VARCHAR(70) NOT NULL,
    Num_Visita  INT NOT NULL DEFAULT 0
);

CREATE TABLE Producto(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_categoria INT NOT NULL,
    fk_id_departamento INT NOT NULL,
    fk_id_municipio INT NOT NULL,
    fk_id_usuario INT NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    Descripcion VARCHAR(500) NOT NULL,
    Fecha_Publicacion DATETIME DEFAULT NOW(),
    Num_Visita  INT NOT NULL DEFAULT 0,
    Estado INT NOT NULL DEFAULT 1,
    Disponibilidad ENUM('Disponible','Vendido', 'Retirado') DEFAULT 'Disponible',

    FOREIGN KEY (fk_id_categoria)
        REFERENCES Categoria(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (fk_id_departamento)
        REFERENCES Departamento(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (fk_id_usuario)
        REFERENCES Usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (fk_id_municipio)
        REFERENCES Municipio(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Comentario(
    fk_id_usuario INT NOT NULL,
    fk_id_producto INT NOT NULL,
    Comentario VARCHAR(500) NOT NULL,
    Fecha_Publicacion DATETIME DEFAULT NOW(),
    FOREIGN KEY (fk_id_usuario)
        REFERENCES Usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (fk_id_producto)
        REFERENCES Producto(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    
);

CREATE TABLE Venta(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_producto INT NOT NULL,
    fk_id_usuario INT NOT NULL,
    Fecha_Venta DATETIME DEFAULT NOW(),
    Total VARCHAR(15),

    FOREIGN KEY (fk_id_producto)
        REFERENCES Venta(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
    FOREIGN KEY (fk_id_usuario)
        REFERENCES Usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Denuncia(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_denunciador INT NOT NULL,
    fk_id_acusado INT NOT NULL,
    Fecha_denuncia DATETIME DEFAULT NOW(),
    Tipo_Denuncia ENUM('1','2'),
    Estado ENUM('Aprobado','Desestimado', 'Pendiente') DEFAULT 'Pendiente',

    FOREIGN KEY (fk_id_denunciador)
        REFERENCES Usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (fk_id_acusado)
        REFERENCES Usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Lista_Deseo(
    fk_id_usuario INT NOT NULL,
    fk_id_producto INT NOT NULL,

    FOREIGN KEY (fk_id_usuario)
        REFERENCES Usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (fk_id_producto)
        REFERENCES Producto(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Imagen(
    fk_id_producto INT NOT NULL,
    Nombre VARCHAR(100),

    FOREIGN KEY (fk_id_producto)
        REFERENCES Producto(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE Suscripcion_Categoria(
    fk_id_categoria INT NOT NULL,
    fk_id_usuario INT NOT NULL,

    FOREIGN KEY (fk_id_categoria)
        REFERENCES Categoria(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    FOREIGN KEY (fk_id_usuario)
        REFERENCES Usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);
