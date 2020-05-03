import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
  <div className="header">
    <h1 className="header__title">CryptoDash</h1>
    <div className="nav">
      <NavLink to="/" className="nav__link" activeClassName="nav__link--active" exact={true}>Dashboard</NavLink>
      <NavLink to="/settings" className="nav__link" activeClassName="nav__link--active">Settings</NavLink>
    </div>
  </div>
)

export default Header