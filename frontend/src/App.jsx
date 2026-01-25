import React from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/app.less'
import { useState } from 'react'
import Layout from './pages/Layout'


// 登录注册页面组件
const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login')
  const [account,setAccount] = useState('')
  const [password,setPassword] = useState('')

  const login = () => {
    setActiveTab('login')
  }
  const resgister = () => {
    setActiveTab('register')
  }

  const changeActiveTab = (tab,{account,password}) => {
      setActiveTab(tab)
      setAccount(account)
      setPassword(password)
  }

  return (
    <div className='app-root'>
      <div className="cartoon-bg"></div>
      <div className="auth-card">
        <div className="auth-card-wrapper">
          <div className="auth-header">
            <div className="auth-logo">logo</div>
            <h1 className='auth-title'>亲子教育 · 成长教育伴侣</h1>
            <p className="auth-subtitle">专注AI亲子教育,更科学省心的教育方式</p>
          </div>
          <div className="slider-container">
            <div className={`slider-button ${activeTab === 'register' ? 'slider-button--right' : ''}`}></div>
            <div className="slider-tabs">
              <button className={`slider-tab ${activeTab === 'login' ? 'slider-tab--active' : ''}`} onClick={login}>登录</button>
              <button className={`slider-tab ${activeTab === 'register' ? 'slider-tab--active' : ''}`} onClick={resgister}>注册</button>
            </div>
          </div>
          {/* 登录模块 */}
          {
            activeTab === 'login' ? (<Login user={{account,password}}></Login>) : <Register changeActiveTab = {changeActiveTab}></Register>
          }
          <div className="social-login">
            <div className="divider">
              <div className="divider-line"></div>
              <div className="divider-text">第三方账号登录</div>
              <div className="divider-line"></div>
            </div>
            <div className="oauth-buttons">
              <button className='oauth-buttons__btn'>
                <i className='iconfont icon-weixin'></i>
              </button>
              <button className='oauth-buttons__btn'>
                <i className='iconfont icon-QQ'></i>
              </button>
              <button className='oauth-buttons__btn'>
                <i className='iconfont icon-github-fill'></i>
              </button>
            </div>
          </div>
          <div className="auth-footnote">
            <p>注册既表示您同意 <a href="#">《用户协议》</a>和<a href="#">《隐私政策》</a></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {



  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout/>}></Route>
        <Route path='/login' element={<AuthPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
