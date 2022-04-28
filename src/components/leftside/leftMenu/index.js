import React, { useState } from 'react';
import { FaRegCalendarAlt, FaRegComments, FaRegEnvelopeOpen, FaRegMoon, FaToggleOff, FaToggleOn, FaUserAlt, FaUserAltSlash, FaUsers } from "react-icons/fa";
import Logo from '../../../images/logo-light.png';
import './menu.css';

const Menu = () => {

  let [darkoff, setDarkoff] = useState(false)
  let [darkon, setDarkon] = useState(false)

  const handleDarkOn = () => {
    setDarkoff(false)
    setDarkon(true)
  }
  const handleDarkOff = () => {
    setDarkoff(true)
    setDarkon(false)

  }
  return (
    <div className='horizontal__menu'>
        <div className="memu__logo">
          <img src={Logo} alt="logo light" />
        </div>
        <div className="memu__items">
          <ul>
            <li> <span className='menu__icons'><FaRegComments  /></span></li>
            <li> <span className='menu__icons'><FaRegEnvelopeOpen  /></span></li>
            <li> <span className='menu__icons'><FaUserAlt  /></span></li>
            <li> <span className='menu__icons'><FaUsers  /></span></li>
            <li> <span className='menu__icons'><FaRegCalendarAlt  /></span></li>
            <li> <span className='menu__icons'><FaUserAltSlash  /></span></li>
        
      

          </ul>
        </div>
        <div className="memu__footer">
          <div className="menu__dark">
            {darkon? 
              <button onClick={handleDarkOff} className='dark__off'> <FaToggleOff /></button>
            :
            <button onClick={handleDarkOn} className='dark__on'><FaToggleOn  /></button>
            }
            
            <div className="dark__text">
              <span className='dark__mode'>dark mode</span>
              <span className='dark__icon'><FaRegMoon /></span>
            </div>

          </div>
        </div>
    </div>
  )
}

export default Menu