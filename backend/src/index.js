const koa = require('koa')

const app = new koa()

app.use(async (ctx, next) => {
    // 允许所有来源访问
    ctx.set('Access-Control-Allow-Origin', '*');
    // 设置允许的 HTTP 方法
    ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // 设置允许的请求头
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // 设置响应头为 JSON 格式
    ctx.set('Content-Type', 'application/json');
    
    // 处理 OPTIONS 预检请求
    if (ctx.method === 'OPTIONS') {
        ctx.status = 204;
        return;
    }
    
    await next();
});

const main =  (ctx) => {
       if(如果前端请求的路径是'/auth/login'){
          //获取前端传过来的账号密码
       }
       else if(如果前端请求的路径是'/auth/login'){

       }
    
}

app.use(main)
app.listen(3000,() => {
    console.log('服务器已运行在3000端口');
    
})