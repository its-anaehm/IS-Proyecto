USE Websted;

DELIMITER $$
    DROP PROCEDURE IF EXISTS pagination$$
    -- Recibe el numero de paginas y la catidad de registros a mostrar
    CREATE PROCEDURE pagination (IN num_page INT, IN num_limit INT, IN data_type INT)
    BEGIN
        DECLARE minRecord INT;

        SET minRecord = num_page*num_limit - num_limit;

        IF data_type = 1 THEN
            IF minRecord = 0 THEN
                SELECT id, fk_id_categoria AS category, fk_id_departamento AS department, fk_id_municipio AS municipy, FORMAT(Precio,2) AS price, Nombre AS name, descripcion AS details, Disponibilidad AS productStatus FROM Producto LIMIT num_limit;
            ELSE
                SELECT id, fk_id_categoria AS category, fk_id_departamento AS department, fk_id_municipio AS municipy, FORMAT(Precio,2) AS price, Nombre AS name, descripcion AS details, Disponibilidad AS productStatus FROM Producto WHERE Producto.id > (SELECT a.id FROM (SELECT * FROM Producto LIMIT minRecord) AS a ORDER BY a.id DESC LIMIT 1) LIMIT num_limit;
            END IF;
        ELSE
            IF minRecord = 0 THEN
                SELECT Producto.id AS id, 
                    CONCAT(Usuario.Nombre,' ',Usuario.Apellido) AS owner, 
                    Producto.Nombre AS name, 
                    FORMAT(Producto.Precio,2) AS price, 
                    Producto.Descripcion AS details, 
                    DATE_FORMAT(Producto.Fecha_Publicacion, '%y-%m-%d') AS date, 
                    Categoria.id AS category, 
                    Producto.fk_id_usuario AS vendorID,
                    Departamento.Nombre AS department, 
                    Municipio.Nombre AS municipy 
                    FROM Producto JOIN Categoria ON Producto.fk_id_categoria = Categoria.id 
                    JOIN Municipio ON Producto.fk_id_municipio = Municipio.id 
                    JOIN Departamento ON Producto.fk_id_departamento = Departamento.id 
                    JOIN Usuario ON Producto.fk_id_usuario = Usuario.id 
                WHERE Producto.Disponibilidad = "Disponible" LIMIT num_limit;
            ELSE
                SELECT Producto.id AS id, 
                    CONCAT(Usuario.Nombre,' ',Usuario.Apellido) AS owner, 
                    Producto.Nombre AS name, 
                    Producto.Descripcion AS details, 
                    Producto.fk_id_usuario AS vendorID,
                    FORMAT(Producto.Precio,2) AS price, 
                    DATE_FORMAT(Producto.Fecha_Publicacion, '%y-%m-%d') AS date, 
                    Categoria.id AS category, 
                    Departamento.Nombre AS department, 
                    Municipio.Nombre AS municipy 
                    FROM Producto JOIN Categoria ON Producto.fk_id_categoria = Categoria.id 
                    JOIN Municipio ON Producto.fk_id_municipio = Municipio.id 
                    JOIN Departamento ON Producto.fk_id_departamento = Departamento.id 
                    JOIN Usuario ON Producto.fk_id_usuario = Usuario.id
                WHERE Producto.Disponibilidad = "Disponible" AND Producto.id > (SELECT a.id FROM (SELECT * FROM Producto LIMIT minRecord) AS a ORDER BY a.id DESC LIMIT 1) LIMIT num_limit;
            END IF;
        END IF;
    END$$
DELIMITER ;