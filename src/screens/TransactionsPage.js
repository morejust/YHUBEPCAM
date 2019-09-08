import React, { useState, useEffect } from 'react'

import { fetchTxList, decodeProducts } from '../services/kassa.js'

const shortHash = hash => {
  if (!hash) return ''
  return `${hash.slice(0, 3)}...${hash.slice(-3)}`
}

export default () => {
  const [ list, setList ] = useState([{}])

  useEffect(() => {
    fetchTxList()
      .then(txList => txList[0].map(tx => ({ ...tx, products: decodeProducts(tx) })))
      .then(txList => setList(txList))
      .catch(err => alert(err.message))
  }, [])

  console.log('transactions', list)

  return (
    <header className="App-header">
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
            <tr key={index}>
              <td>
                <a href={`https://wavesexplorer.com/testnet/tx/${tx.id}`}>
                  {shortHash(tx.id)}
                </a>
              </td>
              <td>{shortHash(tx.sender)}</td>
              <td>{new Date(tx.timestamp).toLocaleString()}</td>
              <td>{(tx.amount / 1e5).toFixed(2) || '0'} RUB</td>
              <td>{(tx.products || []).map(p => p.n).join(",\n") || '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </header>
  )
}
