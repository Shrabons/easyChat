import React from 'react'
import Menu from './leftMenu'
import MessageMember from './leftmessage'
import './leftside.css'

const Leftside = () => {
  return (
      <>
        <div className='left'>
            <div className="left__menu">
                <Menu />
            </div>
            <div className="left__message">
                <MessageMember />
            </div>
        </div>
      </>
  )
}

export default Leftside