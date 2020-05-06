import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'

const Header = () => {
  const [mobileClass, setMobileClass] = useState('nav-hidden')
  const handleMobileMenu = () => {
    if(mobileClass === 'nav-hidden') {
      setMobileClass('')
    } else {
      setMobileClass('nav-hidden')
    }
  }
  const closeMobileMenu = () => {
    setMobileClass('nav-hidden')
  }
  return (
    <div className='content-container'>
      <div className="header">
        <h1 className="header__title">CryptoDash</h1>
        <div className="mobile-menu show-for-mobile"><FaBars size="3.2rem" onClick={handleMobileMenu} /></div>
        <div className={"nav " + mobileClass}>
          <NavLink to="/" className="nav__link" activeClassName="nav__link--active" exact={true} onClick={closeMobileMenu}>Dashboard</NavLink>
          <NavLink to="/coins" className="nav__link" activeClassName="nav__link--active" onClick={closeMobileMenu}>Coins</NavLink>
          <NavLink to="/settings" className="nav__link" activeClassName="nav__link--active" onClick={closeMobileMenu}>Settings</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Header