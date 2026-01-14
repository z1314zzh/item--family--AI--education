import React from 'react'

export default function Login() {



  return (
    <div>
      <form className='auth-form'>
        <div className="auth-form__group">
          <i className='iconfont icon-zhanghao'></i>
          <input type="tel" placeholder='请输入手机号或邮箱' className='auth-form__input'/>
        </div>
        <div className="auth-form__group">
          <i className='iconfont icon-mima-copy'></i>
          <input type="password" placeholder='请输入密码' className='auth-form__input'/>
        </div>
        <div className="auth-form__forgot-wrapper">
          <a href="#" className='auth-form__forgot'>忘记密码?</a>
        </div>
        <button className='auth-form__submit' type='submit' disabled={true}>登录</button>
      </form>
    </div>
  )
  
}

 