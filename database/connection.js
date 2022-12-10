require('dotenv').config()
const mysql = require("mysql");
const { promisify }= require('util');

var mysqlConnection = {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
};

const pool = mysql.createPool(mysqlConnection);
//Basicamente de esta forma conseguimos convertir el código de código asíncrono a código síncrono

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }

  if (connection) connection.release();
  console.log('DB is Connected');

  return;
});

//? Promisify Pool Querys
pool.query = promisify(pool.query);
//Esta linea de código permite convertir el query de callback a promise de forma que se puede extraer el valor sin siquiera usar el formato de promesa.

module.exports = pool;