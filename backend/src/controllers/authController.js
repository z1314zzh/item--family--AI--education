const {findUserByAccount} = require('../models/authModel.js')
const bcrypt = require('bcrypt')

async function login(ctx) {
    // 解析请求体中的账号和密码
    
    const {account,password} = ctx.request.body
    if(!account || !password){
        ctx.status = 400; // 设置 http 的状态码
        ctx.body = {message: '账号与密码不能为空'}
        return
    }
    // 去数据库中查询是否存在相同的账号和密码
    const user =await findUserByAccount(account)
    
    if (!user){
        ctx.status = 400 
        ctx.body = {message:'账号不存在'}
        return
    }
    // 校验密码
    const ok = await bcrypt.compare(password,user.password_hash)
    if(!ok){
        ctx.status = 400
        ctx.body = {message:'密码错误'}
        return
    }
    console.log('登录成功');
    
    
}

module.exports ={
    login
}