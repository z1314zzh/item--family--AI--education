const db = require('../config/db.js')


async function findUserByAccount(account) {
  const [rows] = await db.query(`SELECT * FROM users WHERE account=${account}`)
  return rows[0]
}

async function createUser({ account, passwordHash, nickname }) {
  const [res] = await db.execute('INSERT INTO users (account,password_hash,create_time,nickname) VALUES (?,?,NOW(),?)', [account, passwordHash, nickname])
  if(res.affectedRows){
    return {
      id:res.insertId,
      account
    }
  }
}

async function findUserById(id) {
  const [rows] = await db.execute(`SELECT * FROM users WHERE id=${id}`)
  return rows[0]
}

module.exports = {
  findUserByAccount,
  createUser,
  findUserById
}