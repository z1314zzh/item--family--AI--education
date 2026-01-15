function login(ctx) {
    // 解析请求体中的账号和密码
    
    const {account,password} = ctx.request.body
    if(!account || !password){
        ctx.status = 400; // 设置 http 的状态码
        ctx.body = {message: '账号与密码不能为空'}
        return
    }
    // 去数据库中查询是否存在相同的账号和密码
    
}

module.exports ={
    login
}