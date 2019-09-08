import React, { useState, useEffect } from 'react'

import { fetchTxList, decodeProducts, kassaAddress } from '../services/kassa.js'
import TxLink from '../components/TxLink'
import AddressLink from '../components/AddressLink'

export default () => {
  const [ list, setList ] = useState([])
  const [ isLoading, setLoading ] = useState(true)

  useEffect(() => {
    fetchTxList()
      .then(txList => txList[0].map(tx => ({ ...tx, products: decodeProducts(tx) })))
      .then(txList => setList(txList))
      .then(() => setLoading(false))
      .catch(err => alert(err.message))
  }, [])

  console.log('transactions', list)

  if (isLoading) {
    return (
      <header className="App-header">
      Loading...
      </header>
    )
  }

  return (
    <header className="App-header">
      <h1>Kassa address: <AddressLink address={kassaAddress} /></h1>
      <table>
        <thead>
          <tr>
            <th>TX ID</th>
            <th>SENDER</th>
            <th>TIME</th>
            <th>VALUE</th>
            <th>PRODUCT LIST</th>
          </tr>
        </thead>
        <tbody>
          {list.map((tx, index) => (
            <tr key={index} style={{ paddingTop: '30px' }}>
              <td>
                <TxLink txId={tx.id} />
              </td>
              <td>
                <AddressLink address={tx.sender} />
              </td>
              <td>{new Date(tx.timestamp).toLocaleString()}</td>
              <td>{(tx.amount / 1e5).toFixed(2) || '0'} RUB</td>
              <td>{(tx.products || []).map(p => (
                <a href={`/products/${p.i}`} style={{ display: 'block' }}>
                  {p.n}
                </a>
              )) || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </header>
  )
}
