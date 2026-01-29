import React from 'react'
import ImageCaptureAndProcess from './components/imageCaptureAndProcess/index.jsx'

// AI识物
export default function Recognition() {
  const realRecognition = () => {
    
  }
  return (
    <div>
      
        <ImageCaptureAndProcess onRecognition={realRecognition}></ImageCaptureAndProcess>
    </div>
  )
}
