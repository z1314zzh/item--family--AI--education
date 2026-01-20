// 创建所以与账号有关的接口
const {login,getCaptcha,register} = require('../controllers/authController')  //{login: fn}
const Router = require('koa-router')


const router =new Router({
    prefix: '/api/auth'
})

//定义登录接口
router.post('/login',login)
//验证码接口
router.get('/captcha',getCaptcha)
//注册接口
router.post('/register',register)



module.exports = router
