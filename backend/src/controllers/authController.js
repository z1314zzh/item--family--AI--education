const { findUserByAccount } = require('../models/authModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const generateCaptcha = require('../utils/captcha.js')

//校验登录逻辑
async function login(ctx) {
    // 解析请求体中的账号和密码

    const { account, password } = ctx.request.body
    if (!account || !password) {
        ctx.status = 400; // 设置 http 的状态码
        ctx.body = { message: '账号与密码不能为空' }
        return
    }
    // 去数据库中查询是否存在相同的账号和密码
    const user = await findUserByAccount(account)

    if (!user) {
        ctx.status = 400
        ctx.body = { message: '账号不存在' }
        return
    }
    // 校验密码
    const ok = await bcrypt.compare(password, user.password_hash)
    if (!ok) {
        ctx.status = 400
        ctx.body = { message: '密码错误' }
        return
    }
    //生成一个 token
    const token = jwt.sign({ id: user.id, account: user.account }, 'zzh', { expiresIn: '7d' })
    ctx.body = {
        message: '登录成功',
        token,
        user: {
            id: user.id,
            account: user.account
        },
        code: 1
    }



}

//生成图形验证码
function getCaptcha(ctx) {
    try {
        const captcha = generateCaptcha()
        ctx.body = {
            captchaId: captcha.id,
            svg: captcha.svg,
            code:1
        }
    }catch(error){
        ctx.status = 500,
        ctx.body = {
            message:'生成验证码失败',
            code:0,
            error:error.message
            
        }
    }
}

//验证注册逻辑
function register(ctx){
    
}
module.exports = {
    login, getCaptcha
}