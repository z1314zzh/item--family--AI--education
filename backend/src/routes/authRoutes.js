// 创建所以与账号有关的接口
const {login} = require('../controllers/authController')  //{login: fn}
const Router = require('koa-router')


const router =new Router({
    prefix: '/api/auth'
})

router.post('/login',login)

module.exports = router
