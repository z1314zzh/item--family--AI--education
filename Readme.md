# frontend(客户端)
- 移动端: 
 1. 适配不同的屏幕尺寸  （）
  - 不同屏幕尺寸元素的排版
  - 不同屏幕尺寸的元素大小  （rem）
  - 封装 rem.js 用来动态的修改页面和字体大小

 2. 样式初始化



 3. npm i react-router-dom 安装路由，开发登录注册页面

 # 服务端
 - 定义多个接口
 1. npm i koa-router 安装路由，用来分门别类的定义后端接口地址

 2. 路由层: 定义接口
    控制层: 当前端请求该接口，响应的逻辑
    模板层: 响应逻辑中与数据库打交道的代码

 3. npm i koa-bodyparser 辅助 koa 解析 post 请求体中的参数

 4. npm install --save mysql2 安装 mysql (用法看文档)
 
 5. npm i bcrypt 通过bcrypt.js 对密码进行加密解密