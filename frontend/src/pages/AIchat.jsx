import React from 'react'
import '../styles/AIchat.less'

export default function AIchat() {
    const [messages, setMessages] = useState([
        { role:'user', content:'你好'},
    ])
    return (
        <div className="ai-dialogue-root">
            <header className="ai-dialogue-header">
                <div className="ai-dialogue-header__back">
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
                  <div className="ai-dialogue-welcome">
                    <i className='iconfont icon-robot-2-fill ai-dialogue-avatar'></i>
                    <p>你好，我是智能助手，有什么我可以帮助你的吗？</p>
                  </div>
                    {/* 消息列表*/}
            
                </div>
            </div>
        </div>
        

    )
}
