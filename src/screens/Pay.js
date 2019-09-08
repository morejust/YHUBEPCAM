import React, { useState } from 'react'
import QRReader from 'react-qr-reader'
import './Pay.css'

import { sendTx, waitForTx } from '../services/kassa'

export default () => {

  const handleScan = qr => {
    if (!qr) { return }

    console.log('scanned', qr)

    const _tx = qr

    if (tx === _tx) { return }

    setTx(_tx)

    sendTx(_tx)
      .then(resp => {
        console.log('resp', resp)
        handleSendSuccess(resp)
        const { id } = resp
        return waitForTx(id)
      })
      .then(resp => handlePaySuccess(resp))
      .catch(err => handleError(err))
  }

  const handleSendSuccess = resp => {
    console.log('resp', resp)

    const hash = resp
    console.log('Sent tx! hash=', hash)

    showOverlaySent()
  }

  const handlePaySuccess = resp => {
    console.log('resp', resp)

    const hash = resp
    console.log('Sent tx! hash=', hash)

    showOverlayPaid()
  }

  const handleError = (error) => {
    console.error(error)

    showOverlayError(error.message)
  }

  const [ overlayType, setOverlay ] = useState('none')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ tx, setTx ] = useState('')

  const showOverlaySent = () => {
    setOverlay('sent')
  }

  const showOverlayPaid = () => {
    setOverlay('paid')
  }

  const showOverlayError = (message = '') => {
    setOverlay('error')
    setErrorMessage(message)
  }

  const hideOverlay = () => {
    setOverlay('hide')
  }
  // const [ overlayText, showOverlayText ] = useState('none')

  return (
    <div className="screen pay-screen">
      <QRReader
        delay={300}
        resolution={1000}
        onError={handleError}
        onScan={handleScan}
        style={{ padding: '50px', maxWidth: '500px', margin: '0 auto' }}
      />

      <span style={{ display: 'inline-block', padding: '40px' }}>(c) YHUBEPCAM</span>

      <div className={`overlay overlay-${overlayType}`} onClick={hideOverlay}>
        {overlayType === 'sent' && (
          <span>Sent!</span>
        )}

        {overlayType === 'paid' && (
          <span>Paid!</span>
        )}

        {overlayType === 'error' && (
          <span>Error: {errorMessage}</span>
        )}

        {overlayType === 'none' && (
          <span>Please, scan signed tx.</span>
        )}

        {overlayType === 'list' && (
          <div>
            <span>- Moloko</span>
            <span>- Bread</span>
          </div>
        )}
      </div>
    </div>
  )
}
