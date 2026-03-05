const koa = require('koa')
const Router = require('koa-router')
const authRoutes = require('./routes/authRoutes.js')
const coze_api = require('./routes/coze_api.js')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const dotenv = require('dotenv')

dotenv.config({
    path:['.env.local','.env']
})

const app = new koa()
app.use(cors({
    origin(){
        return'http://localhost:5173'
    }
}))

//测试接口
const router = new Router({
    prefix:'/api'  //路由前缀
})

router.get('/test',(ctx) => {
    ctx.response.type = 'json'
    ctx.body = {
        status: 'ok',
        message:'koa backend is running'
    }
})


app
.use(bodyParser())  //先让 koa 拥有解析参数的能力
.use(router.routes())
.use(router.allowedMethods())
.use(authRoutes.routes())
.use(authRoutes.allowedMethods())
.use(coze_api.routes())
.use(coze_api.allowedMethods())

app.listen(3000,() => {
    console.log('服务器已运行在3000端口');
    
})