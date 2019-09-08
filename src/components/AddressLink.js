import React from 'react'
import { shortHash } from '../utils'

export const AddressLink = props => (
  <a href={`https://wavesexplorer.com/testnet/address/${props.address}`} target="_blank" rel="noopener">
    {shortHash(props.address)}
  </a>
)

export default AddressLink
