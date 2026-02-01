import React, { useRef, useState } from 'react'
import './index.less'
import { useNavigate } from 'react-router-dom';

export default function index({
  theme = 'default',
  onRecognition,
  recognitionResult
}) {
  const [selectedImage,setSelectedImage] = useState(null)
  const navigate = useNavigate('')
  const fileInputRef = useRef(null)

  // 主题颜色配置
  const themeConfig = {
    default: {
      primary: '#ff7a45',
      secondary: '#f5f5f5',
      loading: '#ff6b6b',
      voice: '#ffd166',
      gradient: ['#fef3e6', '#e6f7ff']
    },
    green: {
      primary: '#4caf50',
      secondary: '#f5f5f5',
      loading: '#4caf50',
      voice: '#4caf50',
      gradient: ['#e8f5e8', '#fff3e0']
    }
  };
  const currentTheme = themeConfig[theme] || themeConfig.default
  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if(file){
      const imageUrl = URL.createObjectURL(file) //将 file 对象转换成 url
      setSelectedImage(imageUrl)
      // ai识别
      onRecognition(file)
    }
  }

  const handleClear = () => { //清除预览效果
      setSelectedImage(null)
      fileInputRef.current.value = null
  }

  return (
    <div className='image-capture-root'>
      <header className='image-capture-header'>
        <button className='image-capture-header__back' onClick={
          () => {
            navigate(-1)
          }
        }>
          <i className='iconfont icon-fanhui'></i>
        </button>
        <h1>AI拍照识物</h1>
        <div className='image-capture-header__placeholder'></div>
      </header>

      <main className='image-capture-main'>
        {/* 图片预览区域 */}
        <section className="image-capture-preview" style={{
          background: `radial-gradient(circle at 20% 20%, ${currentTheme.gradient[0]} 0, transparent 35%),
                      radial-gradient(circle at 90% 10%, ${currentTheme.gradient[1]} 0, transparent 40%),
                      #ffffff`}}>
            {selectedImage ? (
              <div className="image-capture-preview__image-container">
                <img src={selectedImage} alt="" className='image-capture-preview__image' />
                <button className='image-capture-preview__clear' onClick={() => {
                  handleClear()
                }}>
                  <i className='iconfont icon-close'></i>
                </button>
              </div>
            ) : (
              <div className="image-capture-preview__placeholder">
                <i className='iconfont icon-image'></i>
                <p>点击下方按钮拍照或者上传图片</p>
              </div>
            )
          }
        </section>
        <section className='image-capture-actions'>
          <button className='image-capture-btn image-capture-btn--primary' style={{backgroundColor:currentTheme.primary}}>
            <i className='iconfont icon-xiangji-copy'></i>
            拍照
          </button>
          <button className='image-capture-btn image-capture-btn--secondary'
          onClick={() => {
              fileInputRef.current.click()
          }}>
            <i className='iconfont icon-shangchuan'></i>
            上传图片
          </button>
          <input type="file" accept='image/*'  ref={fileInputRef} onChange={handleImageUpload} style={{display:'none'}}/>
        </section>
        {
          recognitionResult && (
            <div className='image-capture-result'>
              <p>识别结果: {recognitionResult}</p>
            </div>
          )
        }
      </main>

      
    </div>
  )
}
