import React from 'react'

export default function index({recognitionResult}) {
  return (
    <div>
      {
        recognitionResult && (
          <div className='object-recognition-result result-container'>
            <div className="object-recogintion-result__header">
              <h2>识别结果</h2>
              <button className='object-recognition-result__voice'><i className='iconfont icon-voice'></i></button>
            </div>
          </div>
        )
      }
    </div>
  )
}
