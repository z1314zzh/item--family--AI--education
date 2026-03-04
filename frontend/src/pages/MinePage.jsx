import React from 'react'
import '../styles/MinePage.less'
import { Button, Card, Toast } from 'antd-mobile'
import { AntOutline, RightOutline } from 'antd-mobile-icons'
import { List, Switch } from 'antd-mobile'

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
      <div className='mine-page-content'>
        
          <Card headerStyle={{height: '60px' }} title='我的内容' className='mine-page-card'>
            <List>
              <List.Item  prefix={<i className='iconfont icon-shoucang'></i>} onClick={() => { }  }>我的收藏</List.Item>
              <List.Item  prefix={<i className='iconfont icon-liulanlishi'></i>} onClick={() => { }}>浏览历史</List.Item>
            </List>
          </Card>

          <Card headerStyle={{height: '60px' }} title='设置' className='mine-page-card'>
            <List>
              <List.Item  prefix={<i className='iconfont icon-shezhi-copy'></i>} onClick={() => { }}>账号设置</List.Item>
              <List.Item  prefix={<i className='iconfont icon-tongzhi'></i>} onClick={() => { }}>通知设置</List.Item>
              <List.Item  prefix={<i className='iconfont icon-bangzhu'></i>} onClick={() => { }}>帮助中心</List.Item>
              <List.Item  prefix={<i className='iconfont icon-tuichudenglu'></i>} onClick={() => { }}>退出登录</List.Item>
            </List>

          </Card>
        

      </div>

    </div>
  )
}
