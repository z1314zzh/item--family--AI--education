import React from 'react'
import ImageCaptureAndProcess from './components/imageCaptureAndProcess/index.jsx'
import axios from '../http/index.js'

// AI识物
export default function Recognition() {
  const realRecognition =async (file) => {
    try{
      //将图片资源配置成  base64
      const dataUrl = await new Promise((resolve,reject) => {
         const reader = new FileReader()
         reader.readAsDataURL(file)
         reader.onload = () => resolve(reader.result)
         reader.onerror = (err) => reject(err)
      })

      //向工作流发请求
    await axios.post('/api/coze/recognition',{
      img:dataUrl
    })
    }catch(error){

    }
  }
  return (
    <div>
        <ImageCaptureAndProcess onRecognition={realRecognition}></ImageCaptureAndProcess>
    </div>
  )
}
