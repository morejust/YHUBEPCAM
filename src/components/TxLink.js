import React from 'react'
import { shortHash } from '../utils'

export const TxLink = props => (
  <a href={`https://wavesexplorer.com/testnet/tx/${props.txId}`} target="_blank" rel="noopener">
    {shortHash(props.txId)}
  </a>
)

export default TxLink
