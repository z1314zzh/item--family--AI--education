const {verifyToken} = require('../utils/jwt.js')
const {deepseekChat} = require('../controllers/deepseekController.js')
const Router = require('koa-router');


const router = new Router({
    prefix: '/api/deepseek'
})

router.post('/chat', verifyToken(),deepseekChat)

module.exports = router