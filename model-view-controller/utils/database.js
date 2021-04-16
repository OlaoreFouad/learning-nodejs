const mysql = require('mysql2')

const pool = mysql.createPool({
    user: 'root',
    password: '',
    database: 'node_complete',
    host: 'localhost'
})

module.exports = pool.promise()