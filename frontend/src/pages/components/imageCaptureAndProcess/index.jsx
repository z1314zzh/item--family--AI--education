import React, { useRef, useState } from 'react'
import './index.less'
import { useNavigate } from 'react-router-dom';




export default function index({
  theme = 'default',
  onRecognition,
  children,
}) {
  const [selectedImage, setSelectedImage] = useState(null)
  const navigate = useNavigate('')
  const fileInputRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

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
    if (file) {
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

  // 拍照逻辑
  const handleCapture = async () => {
    //打开摄像头 
    const stream = await navigator.mediaDevices.getUserMedia({ video: true }) // 获取视频流
    videoRef.current.srcObject = stream // 将视频流赋值给 video 元素
    videoRef.current.play() // 播放视频流

    setTimeout(() => {
      const canvas = canvasRef.current
      const context = canvas.getContext('2d') //创建二维画布
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height) //将视频帧绘制到画布上

      // 停止摄像头
      stream.getTracks().forEach(track => track.stop())
      //将 canvas 转换成 blob 格式
      canvas.toBlob((blob) => {
        console.log(blob);
        if (!blob) {
          return
        }
        // 调用 onRecognition 函数进行识别
        const image = URL.createObjectURL(blob)
        setSelectedImage(image)
        const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' })
        onRecognition(file)
      }, 'image/jpeg', 1)
    }, 1000)
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
          <button className='image-capture-btn image-capture-btn--primary' style={{ backgroundColor: currentTheme.primary }} onClick={handleCapture}>
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
          <input type="file" accept='image/*' ref={fileInputRef} onChange={handleImageUpload} style={{ display: 'none' }} />
        </section>
        {
          children
        }
      </main>

      <video ref={videoRef} ></video>
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
