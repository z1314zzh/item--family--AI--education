import React from 'react'
import '../styles/MinePage.less'
import { Card } from 'antd-mobile'
import { List } from 'antd-mobile'
import { ActionSheet, Button, Toast ,ImageViewer} from 'antd-mobile'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function MinePage() {
  const navigate = useNavigate()
  const handleLogout = () => {
    setVisible(true)
  }
  const actions = [
    { text: '确认退出登录吗？', key: 'confirm' }
  ]
  const [visible, setVisible] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [imageVisible, setImageVisible] = useState(false)


  // 第一次进入设置，直接获取用户信息
  useEffect(() => {
    axios.get('/api/auth/info').then(res => {
      setUserInfo(res.data)
    })
  }, [])

  return (
    <div className='mine-page-root'>
      <header className='mine-page-header'>
        <div className="user-info">
          <div className="user-avatar" onClick={() => {
            setImageVisible(true)
          }}>
            {userInfo?.avatar ? (<img src={userInfo.avatar} alt="用户头像" />) : (<i className='iconfont icon-zhanghao'></i>)}
          </div>
          <div className="user-details">
            <h2>{userInfo?.nickname || '用户昵称'}</h2>
            <p>亲子教育 AI 助手</p>
          </div>
        </div>
      </header>
      <div className='mine-page-content'>

        <Card headerStyle={{ height: '60px' }} title='我的内容' className='mine-page-card'>
          <List>
            <List.Item prefix={<i className='iconfont icon-shoucang'></i>} onClick={() => { }}>我的收藏</List.Item>
            <List.Item prefix={<i className='iconfont icon-liulanlishi'></i>} onClick={() => { }}>浏览历史</List.Item>
          </List>
        </Card>

        <Card headerStyle={{ height: '60px' }} title='设置' className='mine-page-card'>
          <List>
            <List.Item prefix={<i className='iconfont icon-shezhi-copy'></i>} onClick={() => { navigate('/AccountSetting') }}>账号设置</List.Item>
            <List.Item prefix={<i className='iconfont icon-tongzhi'></i>} onClick={() => { }}>通知设置</List.Item>
            <List.Item prefix={<i className='iconfont icon-bangzhu'></i>} onClick={() => { }}>帮助中心</List.Item>
            <List.Item prefix={<i className='iconfont icon-tuichudenglu'></i>} onClick={() => { handleLogout() }}>退出登录</List.Item>
          </List>
        </Card>

      </div>
      <div className='mine-page-footer'>
      </div>
      <ActionSheet
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
        cancelText='手滑了'
        onAction={(action, index) => {
          if (action.key === 'confirm') {
            // 退出登录
            setVisible(false)
            // 清除登录状态
            localStorage.removeItem('token')
            // 跳转到登录页
            navigate('/login')
          }
        }}
      />
            {/* 用于用户修改头像的弹窗 */}
      <ActionSheet
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
        cancelText='手滑了'
        onAction={(action, index) => {
          //从相册中选择
          if (action.key === 'select') {
            // 点击选择图片后，将input的value清空，否则会上传上次选择的图片
            avatarRef.current.value = ''
            setVisible(true)
            avatarRef.current.click()
          }
          setVisible(false)
        }}
      />
      {/* 用于显示用户选择的头像 */}
      <ImageViewer
        classNames={{
          mask: 'customize-mask',
          body: 'customize-body',
        }}
        image={userInfo?.avatar || ''}
        visible={imageVisible}
        onClose={() => {
          setImageVisible(false)
        }}
      />


    </div>
  )
}
