import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, ActionSheet, List, ImageViewer } from 'antd-mobile'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
import '../styles/AccountSetting.less'

export default function AccountSetting() {
  const [account, setAccount] = useState('')
  const [avatar, setAvatar] = useState('')
  const [nickname, setNickname] = useState('')
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const avatarRef = useRef(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [uploading, setUploading] = useState(false)
  const actions = [
    { text: '从相册中选择', key: 'select' }
  ]

  useEffect(() => {
    axios.get('/api/auth/info').then(res => {
      setAccount(res.data.account)
      setAvatar(res.data.avatar)
      setNickname(res.data.nickname)
    })
  }, [])

  const avatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file) //将 file 对象转换成 url
      setUploading(imageUrl)
      setImageVisible(true)
      // 通过后端向数据库上传头像
    }

  }


  return (
    <div className='account-setting'>
      {/* 共用了 ai 识物组件的头部样式 */}
      <header className='image-capture-header'>
        <button className='image-capture-header__back' onClick={
          () => {
            navigate(-1)
          }
        }>
          <i className='iconfont icon-fanhui'></i>
        </button>
        <h1>账号设置</h1>
        <div className='image-capture-header__placeholder'></div>
      </header>

      <section className="account-setting__section">
        <List>
          <List.Item onClick={() => { setVisible(true) }} extra={<Avatar style={{ '--border-radius': '50%' }} src={selectedImage} size={40} />} clickable>头像</List.Item>
          <List.Item onClick={() => { }} extra='zzh' clickable>昵称</List.Item>
          <List.Item onClick={() => { }} extra='17879987232' clickable>手机号</List.Item>
          <List.Item onClick={() => { }} extra='修改密码'>密码</List.Item>
        </List>
      </section>

      <input type="file" accept='image/*' ref={avatarRef} onChange={avatarChange} style={{ display: 'none' }} />

      <ActionSheet
        visible={visible}
        actions={actions}
        onClose={() => setVisible(false)}
        cancelText='手滑了'
        onAction={(action, index) => {
          //从相册中选择
          if (action.key === 'select') {
            setVisible(true)
            avatarRef.current.click()
          }
          setVisible(false)
        }}
      />
      <ImageViewer
        classNames={{
          mask: 'customize-mask',
          body: 'customize-body',
        }}
        image={uploading}
        visible={imageVisible}
        renderFooter={(uploading) => (
          <div className='footer'>
            <div className='footerButton' onClick={() => {
              setImageVisible(false)
              setSelectedImage(uploading)
            }}>确认上传</div>
          </div>
        )}
        onClose={() => {
          setImageVisible(false)
        }}
      />



    </div>
  )
}
