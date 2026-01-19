const db = require('../config/db.js')


async function findUserByAccount(account) {
  const [rows] = await db.query(`SELECT * FROM users WHERE account=${account}`)
  return rows[0]
  
}

module.exports = {
    findUserByAccount
}