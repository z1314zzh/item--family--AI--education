import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Avatar, ActionSheet, List, ImageViewer, Toast, Popup, Input, Button } from 'antd-mobile'
import { useEffect, useState, useRef } from 'react'
import axios from '../http/index.js'
import '../styles/AccountSetting.less'


export default function AccountSetting() {
  const [account, setAccount] = useState('')
  const [avatar, setAvatar] = useState('')
  const [nickname, setNickname] = useState('')
  const navigate = useNavigate()
  const [visible, setVisible] = useState(false)
  const [imageVisible, setImageVisible] = useState(false)
  const avatarRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [popupVisible, setPopupVisible] = useState(false)
  const [newnickname, setNewNickname] = useState('')
  const [visiblePopupPassword, setVisiblePopupPassword] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const actions = [
    { text: '从相册中选择', key: 'select' }
  ]
  //第一次进入设置，直接获取用户信息
  useEffect(() => {
    axios.get('/api/auth/info').then(res => {
      setAccount(res.data.account)
      setAvatar(res.data.avatar)
      setNewNickname(res.data.nickname)
      setNickname(res.data.nickname)
    })
  }, [])

  //用于选择用户头像
  const avatarChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setUploading(reader.result)
      }
      setImageVisible(true)
    }
  }

  //上传用户头像
  const uploadAvatar = async () => {
    try {
      //限制图片大小为 9MB
      if (uploading.length > 9 * 1024 * 1024) {
        Toast.show({
          content: '图片大小不能超过 9MB',
          duration: 5000,
          icon: 'fail',
        })
      }
      //向后端上传图片
      // const formData = new FormData() //表单格式,这是十六进制的字符串
      // formData.append('avatar', uploading)
      // console.log(formData);  //麻烦，暂不使用
      // 向后端发送请求
      const params = {
        avatar: uploading,
      }
      await axios.post('/api/auth/updateAvatar', params)
      Toast.show({
        content: '上传成功',
        duration: 2000,
        icon: 'success',
      })
      setAvatar(uploading)
      //保证下一次上传同一张图时也会触发onChange
    } catch (error) {
      Toast.show({
        content: '上传失败',
        duration: 5000,
        icon: 'fail',
      })
    }
  }

  //用于修改用户昵称
  const updateNickname = () => {
    //限制昵称长度为 10 个字符
    if (newnickname.length > 10) {
      Toast.show({
        content: '昵称长度不能超过 10 个字符',
        duration: 5000,
        icon: 'fail',
      })
      return
    }
    //向后端发送请求
    const params = {
      nickname: newnickname,
    }
    axios.post('/api/auth/updateNickname', params).then(res => {
      if (res.data.code === 1) {
        Toast.show({
          content: '更新成功',
          duration: 2000,
          icon: 'success',
        })
        //更新本地状态
        setNickname(newnickname)
      }
    })
  }

  //用于修改用户密码
  const updatePassword = () => {
    //限制密码长度为 10 个字符
    if (newPassword.length > 10) {
      Toast.show({
        content: '密码长度不能超过 10 个字符',
        duration: 5000,
        icon: 'fail',
      })
      return
    }
    //向后端发送请求
    const params = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    }
    axios.post('/api/auth/updatePassword', params).then(res => {
      if (res.data.code === 1) {
        Toast.show({
          content: '更新成功',
          duration: 2000,
          icon: 'success',
        })
        //更新本地状态
        setOldPassword('')
        setNewPassword('')
      }
    })
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
          <List.Item onClick={() => { setVisible(true) }} extra={<Avatar style={{ '--border-radius': '50%' }} src={avatar} size={40} />} clickable>头像</List.Item>
          <List.Item onClick={() => { setPopupVisible(true) }} extra={nickname} clickable>昵称</List.Item>
          <List.Item onClick={() => { }} extra={account} clickable>手机号</List.Item>
          <List.Item onClick={() => { setVisiblePopupPassword(true) }} extra='修改密码'>密码</List.Item>
        </List>
      </section>

      <input type="file" accept='image/*' ref={avatarRef} onChange={avatarChange} style={{ display: 'none' }} />

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
        image={uploading}
        visible={imageVisible}
        renderFooter={() => (
          <div className='footer'>
            <div className='footerButton' onClick={() => {
              uploadAvatar()
              setImageVisible(false)
            }}>确认上传</div>
          </div>
        )}
        onClose={() => {
          setImageVisible(false)
        }}
      />
      {/* 用于修改用户选择的昵称的弹窗 */}
      <Popup
        visible={popupVisible}
        showCloseButton
        position='right'
        onClose={() => {
          setPopupVisible(false)
        }}
        afterShow={() => {
          setNewNickname(nickname)
        }}
      >
        <div className="update-nickname">
          <div className="update-nickname__title">新昵称:</div>
          <div className="update-nickname__input-container">
            <Input
              placeholder='请输入内容'
              value={newnickname}
              onChange={val => {
                setNewNickname(val)
              }}
            />
          </div>
        </div>
        <Button type='primary' block className='update-nickname__confirm' onClick={
          () => {
            updateNickname()
            setPopupVisible(false)
          }
        }>确认</Button>
      </Popup>

       {/* 用于修改用户的密码的弹窗 */}
       <Popup
        visible={visiblePopupPassword}
        showCloseButton
        position='right'
        onClose={() => {
          setVisiblePopupPassword(false)
        }}
      >
        {/* 旧密码 */}
        <div className="update-nickname">
          <div className="update-nickname__title">旧密码:</div> 
          <div className="update-nickname__input-container">
            <Input
              placeholder='请输入旧密码'
              value={oldPassword}
              onChange={val => {
                setOldPassword(val)
              }}
            />
          </div>
           <div className="update-nickname__title">新密码:</div> 
          <div className="update-nickname__input-container">
            <Input
              placeholder='请输入新密码'
              value={newPassword}
              onChange={val => {
                setNewPassword(val)
              }}
            />
          </div>
        </div>


        <Button type='primary' block className='update-nickname__confirm' onClick={
          () => {
            updatePassword()
            setVisiblePopupPassword(false)
          }
        }>确认</Button>
      </Popup>


    </div>
  )
}
