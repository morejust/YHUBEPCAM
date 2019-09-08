import React, { useState } from 'react'
import QRReader from 'react-qr-reader'
// import './Pay.css'

import { sendFaucet } from '../services/kassa'

// THIS IS SECURE
const UNSAFE_SEED = 'liquid trade skirt elbow employ bomb cradle genius liberty mean tape profit'

export default (props) => {
  const [ address, setAddress ] = useState(null)

  const handleScan = qr => {
    if (!qr) { return }

    console.log('scanned', qr)

    const _address = qr

    if (address === _address) { return }

    setAddress(_address)

    sendFaucet(_address, UNSAFE_SEED)
      .then(res => alert(res))
      .catch(err => handleError(err))
  }

  const handleError = err => alert(err.message)

  return (
    <div className="screen faucet-screen">
      <div style={{ paddingTop: '2rem' }}>&nbsp;</div>
      <h1>Получи бесплатные рубли на покупки через блокчейна!</h1>

      {address && (
        <span>{address}</span>
      )}

      <QRReader
        delay={300}
        resolution={1000}
        onError={handleError}
        onScan={handleScan}
        style={{ padding: '50px', maxWidth: '500px', margin: '0 auto' }}
      />

      <span style={{ display: 'inline-block', padding: '40px' }}>(c) YHUBEPCAM</span>

    </div>
  )
}
