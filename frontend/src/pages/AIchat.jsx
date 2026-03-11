import React from 'react'
import '../styles/AIchat.less'
import { useState } from 'react'
import {DotLoading} from 'antd-mobile'
import { useNavigate } from 'react-router-dom'


export default function AIchat() {
    const [messages, setMessages] = useState([
        {id:1, role:'user', content:'你好',timestamp:new Date().toLocaleTimeString()},
        {id:2, role:'ai', content:'你好，有什么我可以帮助你的吗？',timestamp:new Date().toLocaleTimeString()},
    ])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const [isRecording, setIsRecording] = useState(false)

    return (
        <div className="ai-dialogue-root">
            <header className="ai-dialogue-header">
                <div className="ai-dialogue-header__back" onClick={
          () => {
            navigate(-1)
          }
        }>
                    <i className="iconfont icon-fanhui"></i>
                </div>
                <h1>智能对话</h1>
                <div className="ai-dialogue-header__more">
                    <i className="iconfont icon-More"></i>
                </div>
            </header>

            <div className="ai-dialogue-main">
                <div className="ai-dialogue-messages">
                    {/* 欢迎*/}
                    {
                        messages.length === 0 && (
                            <div className="ai-dialogue-welcome">
                                <i className='iconfont icon-robot-2-fill ai-dialogue-avatar'></i>
                                <p>你好，我是智能助手，有什么我可以帮助你的吗？</p>
                            </div>
                        ) 
                    }
                  <div className="ai-dialogue-welcome">
                    <i className='iconfont icon-robot-2-fill ai-dialogue-avatar'></i>
                    <p>你好，我是智能助手，有什么我可以帮助你的吗？</p>
                  </div>
                    {/* 消息列表*/}
                    {
                        messages.map((message) => (
                            <div key={message.id} className={`ai-dialogue-message ${message.role === 'user' ? 'user-message' : 'ai-message'}`}>
                                <div className="ai-dialogue-message__content">
                                    <div className="ai-dialogue-message__text">{message.content}</div>
                                    <div className="ai-dialogue-message__time">{message.timestamp}</div>
                                </div>
                            </div>
                        ))
                    }   
                    {/* ai回复加载中 */}
                    {
                     isLoading && <div className="ai-dialogue-message ai-message">
                        <div className="ai-dialogue-message__content">
                            <span style={{fontSize:24}}>
                                <DotLoading />
                            </span>
                        </div>
                     </div>
                    }
                </div>
            </div>

            <footer className='ai-dialogue-footer'>
                <div className="ai-dialogue-input-container">
                   <textarea className='ai-dialogue-input' placeholder='请输入' rows={1}></textarea>
                   <div className="ai-dialogue-actions">
                    <button className={`ai-dialogue-voice-btn ${isRecording ? 'recording' : ''}`} onClick={() => {
                        setIsRecording(!isRecording)
                    }}>
                        <i className={`iconfont ${isRecording ? 'icon-a-88_luyin_zhengzailuyin ' : 'icon-maikefeng'}`}></i>
                    </button>
                    <button className='ai-dialogue-send-btn'>
                        <i className="iconfont icon-fasong"></i>
                    </button>
                   </div>
                </div>
                {/* 展示正在录音 */}
                {
                    isRecording && <div className="ai-dialogue-recording-indicator">
                        <p>正在录音...</p>
                    </div>
                }
            </footer>

        </div>
        

    )
}
