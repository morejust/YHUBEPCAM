import React from 'react'
import { shortHash } from '../utils'

export const AddressLink = props => (
  <a href={`https://wavesexplorer.com/testnet/address/${props.address}`}>
    {shortHash(props.address)}
  </a>
)

export default AddressLink
