USE Websted;

INSERT INTO Producto(fk_id_categoria, fk_id_departamento, fk_id_municipio,fk_id_usuario, Nombre, Precio, Descripcion) VALUES

    (1, 2, 1, 1, 'Huawei Mate Pro', '50,000', 'Chipset Kirin 980, 189 g'),
    (1, 4, 2, 2, 'iPhone 6', '60,000', 'Resolución de 1.334 por 750 a 326 p/p'),
    (1, 6, 3, 3, 'iPhone 8', '80,000', 'Gama cromática amplia (P3)'),
	
	(2, 2, 1, 1, 'Test', '50,000', 'Desc'),
    (2, 4, 2, 2, 'TestTwo', '60,000', 'DescTwo'),
    (2, 6, 3, 3, 'TestThree', '80,000', 'DescThree'),

	(3, 2, 1, 1, 'Test', '50,000', 'Desc'),
    (3, 4, 2, 2, 'TestTwo', '60,000', 'DescTwo'),
    (3, 6, 3, 3, 'TestThree', '80,000', 'DescThree')
	
	;
	
INSERT INTO Imagen(fk_id_producto, Nombre) VALUES

	(1, 'Huawei Mate Pro.png'),
	(1, 'Huawei Mate Pro2.png'),
	(2, 'iPhone 6.png'),
	(3, 'iPhone 8.png');
	
INSERT INTO Suscripcion_Categoria(fk_id_categoria, fk_id_usuario) VALUES

	(2, 1),
	(3, 1),
	(4, 1);
	
INSERT INTO Lista_Deseo(fk_id_usuario, fk_id_producto) VALUES

	(1, 1),
	(1, 2),
	(1, 3);

INSERT INTO Comentario(fk_id_usuario,fk_id_producto,Comentario) VALUES

	(1,1,'Comentario de Prueba en el producto Huawei Mate Pro'),
	(2,1,'Comentario de Andrea en el producto Huawei Mate Pro'),
	(2,2,'Comentario de Prueba en el producto iPhone 6'),
	(3,3,'Comentario de Prueba en el producto iPhone 8');
	
