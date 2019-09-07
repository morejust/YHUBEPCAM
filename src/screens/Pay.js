import React, { useState } from 'react'
import QRReader from 'react-qr-reader'
import * as waves from '@waves/waves-transactions'
import './Pay.css'

const { broadcast, verify } = waves

window.waves = waves
const nodeUrl = 'https://testnodes.wavesnodes.com'

export default () => {

  const sendTx = async tx => {
    console.log('tx', tx)

    try {
      const parsed = JSON.parse(tx)
      console.log('parsed', parsed)

      console.log('verify', verify(parsed))

      const resp = await broadcast(parsed, nodeUrl)

      handleSendSuccess(resp)
    } catch (err) {
      handleError(err)
    }

  }

  const handleSendSuccess = resp => {
    console.log('resp', resp)

    const hash = resp
    console.log('Sent tx! hash=', hash)

    showOverlaySuccess()
  }

  const handleError = (error) => {
    console.error(error)

    showOverlayError(error.message)
  }

  const handleScan = qr => {
    if (!qr) { return }

    console.log('scanned', qr)

    const _tx = qr

    if (tx === _tx) { return }

    setTx(_tx)
    sendTx(_tx)
  }

  const [ overlayType, setOverlay ] = useState('none')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ tx, setTx ] = useState('')

  const showOverlaySuccess = () => {
    setOverlay('success')
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
        style={{ height: '100%' }}
      />

      <span style={{ display: 'inline-block', padding: '40px' }}>(c) YHUBEPCAM</span>

      <div className={`overlay overlay-${overlayType}`} onClick={hideOverlay}>
        {overlayType === 'success' && (
          <span>Success!</span>
        )}

        {overlayType === 'error' && (
          <span>Error: {errorMessage}</span>
        )}

        {overlayType === 'none' && (
          <span>Please, scan signed tx.</span>
        )}
      </div>
    </div>
  )
}
