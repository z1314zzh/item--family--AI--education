import './index.less'
import { Toast } from 'antd-mobile'
import { useRef,useState,useEffect } from 'react'




export default function index({recognitionResult}) {
  const {audio_url,image_description} = recognitionResult || {}
  const  audioRef = useRef(null)
  const [isPlaying,setIsPlaying] = useState(false)
  
  useEffect(() => {
    setIsPlaying(false)
  }, [recognitionResult])
  


  const handlePlayAudio = () => {
      //播放过程中再次点击暂停
      if (isPlaying) {
        audioRef.current?.pause()
        setIsPlaying(false)
      } else {
        audioRef.current?.play()
        setIsPlaying(true)
      }
    
  }
  
  return <div>
      {
       recognitionResult && (
          <div className='object-recognition-result result-container'>
            <div className="object-recognition-result__header">
              <h2>识别结果</h2>
              <div className='object-recognition-result__voice'>
                <i className='iconfont icon-shengyin' onClick={() => {
                  handlePlayAudio()
                }} style={{
                  color: isPlaying ? 'red' : 'inherit'
                }}></i>
              </div>
            </div>
            <div className="object-recognition-result__content">
             <div className="object-recognition-result__description">
              <h4>物品介绍</h4>
              <p>{image_description || '暂无介绍'}</p>
             </div>
             <div className="object-recognition-result__safety">
              <h4>安全提示</h4>
              <p>{recognitionResult?.safety || '暂无安全提示'}</p>
             </div>
            </div>
            <audio src={audio_url || 'null'} controls ref={audioRef}></audio>
          </div>
        )
      }
    </div>
  
}
