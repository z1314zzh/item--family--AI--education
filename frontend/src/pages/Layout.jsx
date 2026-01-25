import React, { useState } from 'react'
import '../styles/layout.less'
import { Outlet , useNavigate} from 'react-router-dom'


export default function Layout() {
    const [activeTab, setactiveTab] = useState('home')
    const navigate = useNavigate()

    const tabs = [
        { id: 'home', name: '首页', icon: 'icon-shouye',path:'/home' },
        { id: 'ai', name: 'AI小伙伴', icon: 'icon-a-034-robot', isHighLighted: true ,path:'/aipage'},
        { id: 'mine', name: '我的', icon: 'icon-wode', path:'/minepage'}
    ]

    return (
        <div className='layout'>
            <div className="layout-page">
                {/* 凡是 layout 的二级路由都展示在这里 */}
                <Outlet></Outlet>
            </div>
            <div className="bottom-nav">
                {
                    tabs.map((tab) => (
                        <div key={tab.id} className={`bottom-nav__item ${tab.isHighLighted ? 'highLighted' : ''} ${activeTab === tab.id ? 'active' : ''}`} 
                        onClick={() => {
                             setactiveTab(tab.id)
                             navigate(tab.path)
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
