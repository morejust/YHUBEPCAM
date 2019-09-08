import React, { useState } from 'react'
import QRReader from 'react-qr-reader'
// import './Pay.css'

import AddressLink from '../components/AddressLink'
import TxLink from '../components/TxLink'
import { sendFaucet, waitTx } from '../services/kassa'

// THIS IS SECURE
const UNSAFE_SEED = 'liquid trade skirt elbow employ bomb cradle genius liberty mean tape profit'

export default (props) => {
  const [ address, setAddress ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ txId, setTxId ] = useState(null)
  const [ txStatus, setTxStatus ] = useState(null)

  const handleScan = qr => {
    if (!qr) { return }

    console.log('scanned', qr)

    const _address = qr

    if (address === _address) { return }

    setAddress(_address)

    sendFaucet(_address, UNSAFE_SEED)
      .then(res => {
        setTxId(res.id)
        setTxStatus('tx sent')
        return waitTx(res.id)
      })
      .then(tx => setTxStatus('success'))
      .catch(err => handleError(err))
  }

  const handleError = err => setError(err.message)

  return (
    <div className="screen faucet-screen">
      <div style={{ paddingTop: '2rem' }}>&nbsp;</div>
      <h1>Получи бесплатные рубли на покупки через блокчейна!</h1>

      {error && (
        <div style={{ color: 'red' }}>{error}</div>
      )}
      {address && (
        <AddressLink address={address} />
      )}

      {txId && (
        <TxLink txId={txId} />
      )}

      {txStatus && (
        <h3>{txStatus}</h3>
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
