import React from 'react'
import Login from './pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './styles/app.less'
import { useState } from 'react'


// 登录注册页面组件
const AuthPage = () => {
 const [activeTab,setActiveTab] = useState('login')
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
                <button className='slider-tab'>登录</button>
                <button className='slider-tab'>注册</button>
              </div>
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
        <Route path='/login' element={<AuthPage />}></Route>
      </Routes>
    </BrowserRouter>
  )
}
