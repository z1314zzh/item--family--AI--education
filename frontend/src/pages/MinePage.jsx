import React from 'react'
import '../styles/MinePage.less'

export default function MinePage() {
  return (
    <div className='mine-page-root'>
      <header className='mine-page-header'>
        <div className="user-info">
          <div className="user-avatar">
            <i className='iconfont icon-zhanghao avatar-icon'></i>
          </div>
          <div className="user-details">
            <h2>用户昵称</h2>
            <p>亲子教育 AI 助手</p>
          </div>
        </div>
      </header>
    </div>
  )
}
