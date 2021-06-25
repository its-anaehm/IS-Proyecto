import mysql from "mysql";
const db = mysql.createConnection
(
  {
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'Websted',
    multipleStatements: true
  }
);
  
db.connect((err) => 
{
if (err) 
{ 
    throw err; 
}
console.log("Conexión a la Base de Datos fue exitosa.");
});
  