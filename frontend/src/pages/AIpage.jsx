import React from 'react'
import '../styles/aiPage.less'
import { useNavigate } from 'react-router-dom'

export default function AIpage() {
  const navigate = useNavigate()
  return (
    <div className='ai-page-root'>
      <header className='ai-page-header'>
         <h1>AI小伙伴</h1>
         <p>让ai陪伴孩子成长</p>
      </header>

      <section className='ai-page-content'>
        <div className='ai-feature-card'>
          <i className='iconfont icon-robot-2-fill ai-feature-icon' onClick={() => {
            navigate('/AI-chat')
          } }></i>
          <h3>智能对话</h3>
          <p>与ai进行智能对话,解答各种问题</p>
        </div>
         <div className='ai-feature-card'>
          <i className='iconfont icon-shuben-book3 ai-feature-icon'></i>
          <h3>作业辅导</h3>
          <p>ai辅导孩子完成作业</p>
        </div>
         <div className='ai-feature-card'>
          <i className='iconfont icon-maikefeng ai-feature-icon' ></i>
          <h3>语言交互</h3>
          <p>与ai进行语言交互,进行学习</p>
        </div>
      </section>
    </div>
  )
}
