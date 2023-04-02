const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'cliente',
    password: '12345678',
    database: 'nsolucoes'
});



module.exports = {connection};