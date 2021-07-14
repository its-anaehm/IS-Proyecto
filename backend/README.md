# Endpoints Disponibles 

## Ruta principal de la API


>  http://localhost:4000/


## Usuarios

* Obtener la información de un usario en especifico.

    > GET /users/:id
    
    Params:
    * id : ID del usuario del cual se desea obenter la información.    

    Headers:
    * Authorization

* Obtener la información del usuario actual.
    > GET /users/my_details 
    
    Headers:
    > Authorization

* Obtener lista de usuarios registrados (máximo 20).
    
    > GET /users/page=:page

    Params:
    * page = se refiere al numero de página de la lista de usuarios que se desea obtener.

    Headers:
    * Authorization

* Registrar usuario.

    > POST /users/register

    Headers
    * Content-Type

    Body 
    ```json
        {
            "firstname",
            "lastname",
            "email",
            "phone",
            "password",
            "role" // Si el administrador registra un usuario
        }
    ```

* Loguear a un usuario.

    > POST /users/login
    
    Headers:
    * Content-Type

    Body:
    ```json
        {
            "email",
            "password"
        }
    ```

* Actualizar información de usuario
    
    > PUT /users/:id
 
    Params:
    * id = Id del usuario a actualizar
    
    Heade4rs:
    * Content-Tpye
    * Authorization

    Body:
    ```json
        {
            "firstname",
            "lastname",
            "email",
            "phone"
        }
    ```

* Eliminar un usuario
    
    > PUT /users/:id
 
    Params:
    * id = Id del usuario a actualizar
    
    Heade4rs:
    * Authorization

## Productos

* Obtener lista de productos

    > GET /products/

* Obtener lista de productos mas populares(maximo 50).

    > GET /producst/popular/

* Agregar un producto

    > POST /products/

    Headers:
    * Content-Type
        - Debe ser form-data
    * Authorization

    Body:
    ```json
        {
            "name",
            "price",
            "description",
            "category", // ID
            "department", // ID
            "municipy", // ID
            "productImages" // Máximo 6 imágenes
        }
    ```

