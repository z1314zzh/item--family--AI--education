import React, { useState } from 'react'
import '../styles/layout.less'

export default function Layout() {
    const [activeTab, setactiveTab] = useState('home')


    const tabs = [
        { id: 'home', name: '首页', icon: 'icon-shouye' },
        { id: 'ai', name: 'AI小伙伴', icon: 'icon-a-034-robot', isHighLighted: true },
        { id: 'mine', name: '我的', icon: 'icon-wode' }
    ]

    return (
        <div className='layout'>
            <div className="layout-page"></div>
            <div className="bottom-nav">
                {
                    tabs.map((tab) => (
                        <div key={tab.id} className={`bottom-nav__item ${tab.isHighLighted ? 'highLighted' : ''} ${activeTab === tab.id ? 'active' : ''}`} 
                        onClick={() => {
                             setactiveTab(tab.id)
                        }}
                        >
                            <div className="bottom-nav__icon-container">
                                <i className={`iconfont ${tab.icon}`}></i>
                            </div>
                            <span className='bottom-nav__label'>{tab.name}</span>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
