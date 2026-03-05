import React from 'react'
import { useNavigate } from 'react-router-dom'
import { List } from 'antd-mobile'
import { Avatar } from 'antd-mobile'
import { useEffect } from 'react'
import axios from 'axios'

export default function accountSetting() {
  const [userInfo, setUserInfo] = useState({})
  const navigate = useNavigate()
  
  useEffect(() => {
    axios.get('/api/auth/info').then(res => {
      if (res.data.code === 200) {
        setUserInfo(res.data.data)
      }
    })
  }, [])


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
          <List.Item onClick={() => {}} extra={<Avatar style={{'--border-radius': '50%'}} src='' size={40}  />}>头像</List.Item>
          <List.Item onClick={() => {}} extra='zzh' clickable>昵称</List.Item>
          <List.Item onClick={() => {}} extra='17879987232' clickable>手机号</List.Item>
          <List.Item onClick={() => {}} extra='修改密码'>密码</List.Item>
        </List>
      </section>



    </div>
  )
}
