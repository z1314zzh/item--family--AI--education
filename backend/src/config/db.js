const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password:"123456",
  database: 'parent_ai_education',
  waitForConnections: true,
  connectionLimit: 10,
  port:3306
})
module.exports = pool