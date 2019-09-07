import React, { useState } from 'react'
import QRReader from 'react-qr-reader'
import { broadcast, verify } from '@waves/waves-transactions'

import './Pay.css'

const nodeUrl = 'https://testnodes.wavesnodes.com'

export default () => {

  const sendTx = async tx => {
    console.log('tx', tx)

    try {
      console.log('verify', verify(tx))

      const resp = await broadcast(tx, nodeUrl)

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

    showOverlayError()
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
  const [ tx, setTx ] = useState('')

  const showOverlaySuccess = () => {
    setOverlay('success')
  }

  const showOverlayError = () => {
    setOverlay('error')
  }

  const hideOverlay = () => {
    setOverlay('hide')
  }
  // const [ overlayText, showOverlayText ] = useState('none')

  return (
    <div className="screen pay-screen">
      <QRReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ height: '100%' /*, borderRadius: '50px', overflow: 'hidden' */ }}
      />

      <span style={{ display: 'inline-block', padding: '40px' }}>(c) YHUBEPCAM</span>

      <div className={`overlay overlay-${overlayType}`} onClick={hideOverlay}>
        {overlayType === 'success' && (
          <span>Success!</span>
        )}

        {overlayType === 'error' && (
          <span>Error.</span>
        )}

        {overlayType === 'none' && (
          <span>Please, scan signed tx.</span>
        )}
      </div>
    </div>
  )
}
