const db = require('../config/db.js')


async function findUserByAccount(account) {
  const [rows] = await db.query(`SELECT * FROM users WHERE account=${account}`)
  return rows[0]
}

//注册功能，创建用户
async function createUser({ account, passwordHash, nickname }) {
  const [res] = await db.execute('INSERT INTO users (account,password_hash,create_time,nickname) VALUES (?,?,NOW(),?)', [account, passwordHash, nickname])
  if(res.affectedRows){
    return {
      id:res.insertId,
      account
    }
  }
}

//根据id查找数据库内容
async function findUserById(id) {
  const [rows] = await db.execute(`SELECT * FROM users WHERE id=${id}`)
  return rows[0]
}

//用于更新数据库内用户数据
async function updateUserInfo(params,id) {
  const allKeys = ['id','avatar','nickname','password_hash']
  const currentKeys = Object.keys(params)
  currentKeys.forEach((item) => {
    if(!allKeys.includes(item)){
      throw new Error(`参数${item}错误`)
    }
  })
  const _sql = currentKeys.map((item) => `${item}=?`).join(',') // ['avatar=?','nickname=?','password_hash=?']
  // 更新数据库
  const res = await db.execute(`UPDATE users SET ${_sql} WHERE id= ?`,[...currentKeys.map((item) => params[item]),id] )
  return res
  
}

module.exports = {
  findUserByAccount,
  createUser,
  findUserById,
  updateUserInfo
}