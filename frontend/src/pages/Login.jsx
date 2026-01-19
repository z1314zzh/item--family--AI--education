import React, { useState } from 'react'
import '../styles/login.less'
import { Toast } from 'antd-mobile'
import axios from '../http'
import  {Navigate, useNavigate} from 'react-router-dom'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [account, setAccount] = useState('17870067232')
  const [password, setPassword] = useState('123')
  const [error, setError] = useState('')
  const Navigate = useNavigate()

  // 手机号格式校验正则表达式
  const validatePhone = (phoneNumber) => {
    // 中国大陆手机号正则：以1开头，第二位3-9，后面9位数字，共11位
    const phoneRegex = /^1[3-9]\d{9}$/
    return phoneRegex.test(phoneNumber)
  }

  // 邮箱格式校验正则表达式
  const validateEmail = (email) => {
    // 邮箱正则：支持常见邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // 验证账号格式（支持手机号或邮箱）
  const validateAccount = (account) => {
    return validatePhone(account) || validateEmail(account)
  }

  const handleSubmit = (e) => {
    e.preventDefault()// 阻止默认行为
    //校验账号格式
    setError('')

    // 校验账号格式
    if (!account.trim()) {
      setError('请输入手机号或邮箱')
      return
    }

    if (!validateAccount(account)) {
      setError('请输入正确的手机号或邮箱格式')
      return
    }

    // 校验密码
    if (!password.trim()) {
      setError('请输入密码')
      return
    }

    // 这里添加登录逻辑
    setLoading(true)
    Toast.show({
      icon: 'loading',
      content: '登录中…',
    })


    // 模拟登录请求
    setTimeout(async () => {
      setLoading(false)
      //向后端请求
      // const res = await fetch('http://localhost:3000/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ account, password })
      // })
      const res = await axios.post('/api/auth/login',{
           account,
           password
      })

      if (res.token) {
        Toast.show({
          icon: 'success',
          content: '登录成功',
        })
      }
      console.log(res);
      localStorage.setItem('token',res.data)
      Navigate('/')
    }, 2000)
  }
  const accountChange = (e) => {
    setAccount(e.target.value)
  }
  const passwordChange = (e) => {
    setPassword(e.target.value)
  }
  return (
    <div>
      <form className='auth-form' onSubmit={handleSubmit}>
        {/* 错误信息显示 */}
        {error && <div className="auth-form__error">{error}</div>}

        <div className="auth-form__group">
          <i className='iconfont icon-zhanghao'></i>
          <input
            type="text"
            placeholder='请输入手机号或邮箱'
            className='auth-form__input'
            onChange={accountChange}
            value={account}
          />
        </div>

        <div className="auth-form__group">
          <i className='iconfont icon-mima-copy'></i>
          <input
            type="password"
            placeholder='请输入密码'
            className='auth-form__input'
            onChange={passwordChange}
            value={password}
          />
        </div>

        <div className="auth-form__forgot-wrapper">
          <a href="#" className='auth-form__forgot'>忘记密码?</a>
        </div>
        <button className='auth-form__submit' type='submit' disabled={loading} >
          {loading ? '登录中...' : '登录'}
        </button>
      </form>
    </div>
  )
}

