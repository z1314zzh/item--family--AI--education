# 亲子教育平台 (Family Education)

> AI 驱动的亲子教育应用，让教育更科学、更省心

---

## 📁 项目结构

```
family-education/
├── frontend/          # 前端应用 (React + Vite)
│   ├── src/
│   │   ├── pages/        # 页面组件
│   │   │   ├── components/   # 页面级组件
│   │   │   ├── Login.jsx        # 登录页
│   │   │   ├── Register.jsx     # 注册页
│   │   │   ├── Home.jsx         # 首页
│   │   │   ├── MinePage.jsx     # 个人中心
│   │   │   ├── AIpage.jsx       # AI 功能页
│   │   │   ├── AIchat.jsx       # AI 对话页
│   │   │   ├── Recognition.jsx  # 识别页
│   │   │   ├── AccountSetting.jsx  # 账号设置
│   │   │   └── Layout.jsx       # 布局容器
│   │   ├── http/          # HTTP 请求封装
│   │   │   └── index.js   # axios 二次封装
│   │   ├── styles/        # 样式文件
│   │   ├── utils/         # 工具函数
│   │   ├── App.jsx       # 根组件 & 路由配置
│   │   └── main.jsx      # 入口文件
│   └── vite.config.js    # Vite 配置
│
└── backend/           # 后端服务 (Koa)
    └── src/
        ├── routes/       # 路由层 (接口定义)
        │   ├── authRoutes.js    # 认证相关接口
        │   ├── coze_api.js      # Coze AI 接口
        │   └── deepseek-api.js  # DeepSeek AI 接口
        ├── controllers/  # 控制层 (业务逻辑)
        │   ├── authController.js
        │   ├── cozeController.js
        │   └── deepseekController.js
        ├── models/       # 模型层 (数据库操作)
        │   └── authModel.js
        ├── config/      # 配置文件
        ├── utils/       # 工具函数 (JWT)
        └── index.js     # 服务入口
```

---

## 🛠️ 技术栈

### 前端

| 技术 | 版本 | 用途 |
|------|------|------|
| **React** | 19.x | UI 框架 |
| **Vite** | 7.x | 构建工具 |
| **antd-mobile** | 5.x | 移动端 UI 组件库 |
| **react-router-dom** | 7.x | 路由管理 |
| **axios** | 1.x | HTTP 请求 |
| **Less** | 4.x | CSS 预处理器 |
| **ESLint** | 9.x | 代码检查 |

### 后端

| 技术 | 版本 | 用途 |
|------|------|------|
| **Koa** | 3.x | Node.js Web 框架 |
| **koa-router** | 14.x | 路由管理 |
| **koa-bodyparser** | 4.x | 请求体解析 |
| **mysql2** | 3.x | MySQL 数据库驱动 |
| **bcrypt** | 6.x | 密码加密 |
| **jsonwebtoken** | 9.x | JWT 令牌 |
| **svg-captcha** | 1.x | 验证码生成 |
| **@koa/cors** | 5.x | 跨域处理 |
| **axios** | 1.x | 外部 API 调用 |

---

## 🎨 前端架构设计

### 1. 路由架构

```
BrowserRouter
├── AuthPage (登录/注册页)
│   ├── Login.jsx
│   └── Register.jsx
└── Layout (Tab 布局)
    ├── Home (首页)
    ├── AIpage (AI 功能页)
    ├── MinePage (个人中心)
    └── Recognition (识别页)
    
独立页面 (不在 Tab 布局内)
├── AccountSetting (账号设置)
└── AI-chat (AI 对话)
```

### 2. 移动端适配方案

- **rem 适配**：封装 rem.js 动态计算 font-size
- **响应式布局**：不同屏幕尺寸使用不同排版
- **antd-mobile**：开箱即用的移动端组件

### 3. HTTP 请求封装

`src/http/index.js` 对 axios 进行了二次封装：

```
请求拦截器:
  ├── 添加 baseURL: http://8.148.243.156:3000
  ├── 设置 Content-Type: application/json
  └── 自动携带 token (从 localStorage)

响应拦截器:
  ├── 统一错误处理 (code !== 1 显示 Toast)
  ├── 416 状态码 → 重定向到登录页
  └── 返回 Promise.reject 供页面 catch
```

### 4. 状态管理

- **localStorage**：存储 token、用户信息
- **React useState**：页面级状态管理

---

## ⚙️ 后端架构设计 (MVC)

```
┌─────────────────────────────────────────────────────────┐
│                      请求入口                            │
│                  http://8.148.243.156:3000              │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│  路由层 (routes/)                                        │
│  ├── /api/auth/*    → 认证接口 (登录/注册/验证码)        │
│  ├── /api/coze     → Coze AI 接口                       │
│  └── /api/deepseek → DeepSeek AI 接口                   │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│  控制层 (controllers/)                                  │
│  ├── authController.js    → 登录/注册/验证码/用户操作    │
│  ├── cozeController.js   → Coze API 转发               │
│  └── deepseekController.js → DeepSeek API 转发         │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│  模型层 (models/)                                       │
│  └── authModel.js                                       │
│      ├── findUserByAccount()   → 查询用户               │
│      ├── createUser()         → 创建用户               │
│      ├── findUserById()       → ID 查询用户            │
│      └── updateUserInfo()     → 更新用户信息           │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│  数据库 (MySQL)                                         │
│  └── users 表                                           │
│      ├── id, account, password_hash                    │
│      ├── nickname, avatar, create_time                 │
└─────────────────────────────────────────────────────────┘
```

### 核心接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/auth/login` | POST | 登录 |
| `/api/auth/register` | POST | 注册 |
| `/api/auth/captcha` | GET | 验证码 |
| `/api/auth/info` | GET | 获取用户信息 |
| `/api/auth/updateAvatar` | POST | 更新头像 |
| `/api/auth/updateNickname` | POST | 更新昵称 |
| `/api/auth/updatePassword` | POST | 修改密码 |
| `/api/coze/chat` | POST | Coze AI 对话 |
| `/api/deepseek/chat` | POST | DeepSeek AI 对话 |

### 中间件

- **CORS**：允许跨域请求
- **bodyParser**：解析 POST 请求体
- **JWT**：验证用户身份

### 安全机制

1. **密码加密**：bcrypt 哈希存储
2. **Token 验证**：JWT 签发与校验
3. **验证码**：svg-captcha 防止机器注册

---

## 🤖 AI 集成

项目接入了两大 AI 能力：

### Coze API
- 用于智能对话、亲子教育建议
- 支持流式响应

### DeepSeek API  
- 作为备选 AI 能力
- 同样的对话接口

---

## 🚀 快速启动

### 前端

```bash
cd frontend
npm install
npm run dev
```

### 后端

```bash
cd backend
npm install
npm run dev  # 使用 nodemon 热重载
```

---

## 📝 环境变量

### 后端 (.env.local)
```
MYSQL_HOST=xxx
MYSQL_USER=xxx
MYSQL_PASSWORD=xxx
MYSQL_DATABASE=xxx
JWT_SECRET=xxx
COZE_API_KEY=xxx
DEEPSEEK_API_KEY=xxx
```

---

## 🔗 端口说明

| 服务 | 端口 |
|------|------|
| 前端 (Vite) | 5173 |
| 后端 (Koa) | 3000 |
| MySQL | 3306 |
