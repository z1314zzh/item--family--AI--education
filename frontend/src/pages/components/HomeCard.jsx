import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ({ title, desc, tag, path }) {
  const navigate = useNavigate()

  return (
    <div className='home-card'>
      <div className='home-card__tag'>{tag}</div>
      <h3>{desc}</h3>
      <p>{title}</p>
      <button className='home-btn home-btn--small' onClick={() => {
        navigate(path)
      }}>进入</button>
    </div>
  )
}
