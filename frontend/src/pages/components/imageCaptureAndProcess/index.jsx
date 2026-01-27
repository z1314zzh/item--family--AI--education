import React from 'react'
import './index.less'

export default function index() {
  return (
    <div className='image-capture-root'>
      <header className='image-capture-header'>
           <button className='image-capture-header__back'>
             <i className='iconfont icon-fanhui'></i>
           </button>
           <h1>AI拍照识物</h1>
           <div className='image-capture-header__placeholder'></div>
      </header>

      <main className='image-capture-main'></main>
    </div>
  )
}
