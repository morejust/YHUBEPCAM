import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../logo.svg'


export default () => {
  return (
    <header className="App-header">
      <Link to="/pay">
        <img src={logo} className="App-logo" alt="logo" />
      </Link>
      <p>
        Tap to scan QR code.
      </p>
    </header>
  )
}
