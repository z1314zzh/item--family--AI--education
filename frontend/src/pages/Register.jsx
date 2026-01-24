import React, { useState } from 'react'
import '../styles/register.less'
import { useEffect } from 'react'
import axios from '../http'
import { Toast } from 'antd-mobile'

export default function Register({ changeActiveTab }) {
  const [nickname, setNickname] = useState('')
  const [account, setAccount] = useState('')
  const [captchaCode, setCaptchaCode] = useState('')
  const [password, setPassword] = useState('')
  const [captchaId, setCaptchaId] = useState('')
  const [captchaSvg, setCaptchaSvg] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

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

  //请求验证码
  async function loadCaptcha() {
    const res = await axios.get('/api/auth/captcha')
    setCaptchaId(res.data.captchaId)
    setCaptchaSvg(res.data.svg)
  }
  useEffect(() => {
    loadCaptcha()
  }, [])

  //实现注册按钮功能
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!nickname || !account || !captchaCode || !password) {
      Toast.show({
        content: '请输入完整信息',
        icon: 'fail'
      })
      return
    }
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

    // 这里添加注册逻辑
    setLoading(true)

    try {
      // 发送注册请求
      const res = await axios.post('/api/auth/register', {
        nickname,
        account,
        captchaCode,
        password,
        captchaId
      })

      // 注册成功处理
      Toast.show({
        content: res.data.message,
        icon: 'success'
      })
      changeActiveTab("login",{account,password})
    } catch (error) {
      // 错误处理由axios拦截器完成，这里只需要关闭loading状态
      console.error('注册失败:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <form className='register-form' onSubmit={handleSubmit}>
        {/* 错误信息显示 */}
        {error && <div className="auth-form__error">{error}</div>}
        <div className="register-form__group">
          <i className='iconfont icon-zhanghao'></i>
          <input
            type="text"
            placeholder='请输入昵称'
            className='register-form__input'
            value={nickname}
            onChange={(e) => {
              setNickname(e.target.value)
            }}
          />
        </div>
        <div className="register-form__group">
          <i className='iconfont icon-shoujihaoma-mian'></i>
          <input
            type="text"
            placeholder='请输入手机号或邮箱'
            className='register-form__input'
            value={account}
            onChange={(e) => {
              setAccount(e.target.value)
            }}
          />
        </div>
        <div className="register-form__group register-form__group--captcha">
          <i className='iconfont icon-yanzhengma-mianxing'></i>
          <input
            type="text"
            placeholder='请输入验证码'
            className='register-form__input register-form__input--captcha'
            value={captchaCode}
            onChange={(e) => {
              setCaptchaCode(e.target.value)
            }}
            maxLength={4}
          />
          <div className="register-form__captcha-img" title='点击刷新验证码'
            dangerouslySetInnerHTML={{ __html: captchaSvg }}
            onClick={loadCaptcha}
          ></div>
        </div>
        <div className="register-form__group">
          <i className='iconfont icon-mima-copy'></i>
          <input
            type="password"
            placeholder='请设置密码'
            className='register-form__input'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </div>

        <button className='register-form__submit' type='submit' disabled={loading}>{loading ? '注册中...' : '注册'} </button>

      </form>
    </div>
  )
}