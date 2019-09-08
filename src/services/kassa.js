import * as waves from '@waves/waves-transactions'
import db from './db.json'

const { broadcast, verify } = waves

window.waves = waves

const nodeUrl = 'https://testnodes.wavesnodes.com'

export const sendTx = async tx => {

  console.log('tx', tx)

  const parsed = JSON.parse(tx)
  console.log('parsed', parsed)

  console.log('verify', verify(parsed))

  return broadcast(parsed, nodeUrl)
}
