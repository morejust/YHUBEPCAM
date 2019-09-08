import React from 'react'
import { shortHash } from '../utils'

export const TxLink = props => (
  <a href={`https://wavesexplorer.com/testnet/tx/${props.txId}`}>
    {shortHash(props.txId)}
  </a>
)

export default TxLink
