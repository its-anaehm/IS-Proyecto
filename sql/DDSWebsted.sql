DROP DATABASE IF EXISTS Websted ;
CREATE DATABASE Websted CHARACTER SET utf8;

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
    Nombre VARCHAR(40) NOT NULL
);

CREATE TABLE Producto(
    id INT AUTO_INCREMENT PRIMARY KEY,
    fk_id_categoria INT NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    Precio VARCHAR(15) NOT NULL,
    Descripcion VARCHAR(70) NOT NULL,
    Fecha_Publicacion DATETIME DEFAULT NOW(),
    Estado ENUM('Disponible','Vendido', 'Retirado'),

    FOREIGN KEY (fk_id_categoria)
        REFERENCES Categoria(id)
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
    Tipo_Denuncia ENUM('Uno','Dos'),
    Estado ENUM('No Revisado','Aprobado','Desestimado') DEFAULT 'No Revisado',

    FOREIGN KEY (fk_id_denunciador)
        REFERENCES Usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    
    FOREIGN KEY (fk_id_acusado)
        REFERENCES Usuario(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);