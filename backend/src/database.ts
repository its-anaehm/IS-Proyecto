import mysql from "mysql2";

export const database = mysql.createConnection
(
  {
    host: 'localhost',
    user: 'admin',
    password: 'admin',
    database: 'Websted',
    multipleStatements: true
  }
);

database.connect((err) => {
  if (err) { 
      throw err; 
  }
  console.log("Conexión a la Base de Datos fue exitosa.");
  }
);

export const db = database.promise();