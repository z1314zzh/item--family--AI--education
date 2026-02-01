import React from 'react'
import ImageCaptureAndProcess from './components/imageCaptureAndProcess/index.jsx'
import axios from '../http/index.js'
import { Toast } from 'antd-mobile'
import { useState } from 'react'

// AI识物
export default function Recognition() {
  const [recognitionResult,setRecognitionResult] = useState(null)
  const realRecognition = async (file) => {
    try {
      //将图片资源配置成  base64
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (err) => reject(err)
      })
      // 识别提示
      Toast.show({
        content: '识别中...',
        duration: 0,
        icon: 'loading',
        maskClickable: false
      })
      //向工作流发请求
      const res = await axios.post('/api/coze/recognition', {
        img: dataUrl
      })

      // 获取语音文字描述
      const text = res.data.data.image_description
      // // 获取语音
      // const audioUrl = res.data.data.audio_url
      // // 播放语音
      // const audio = new Audio(audioUrl)
      // audio.play()
      // 清除提示
       Toast.clear()
       // 存储识别结果
       setRecognitionResult(text)
    } catch (error) {
      // 识别失败提示
      Toast.show({
        content: '识别失败',
        duration: 2000,
        icon: 'fail',
      })
    }
  }
  return (
    <div>
      <ImageCaptureAndProcess onRecognition={realRecognition} recognitionResult={recognitionResult}></ImageCaptureAndProcess>
    </div>
  )
}
