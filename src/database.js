const mysql = require('mysql');
const { database } = require('./keys');
const {promisify} = require('util');
//MODULO PARA convertir callbacks en promesas 

const pool = mysql.createPool(database);

pool.getConnection((err, connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.log('DATABASE CONNECTION CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.log('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.code === 'ECONNREFUSED'){
            console.log('DATABASE CONNECTION REFUSED');
        }

    }
    if(connection){
        connection.release();
        console.log("DB is connected");
    }
});

//promisify pool querys
// esta linea convierte las call backs a promesas 
pool.query = promisify(pool.query)

module.exports = pool;