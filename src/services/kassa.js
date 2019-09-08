import * as waves from '@waves/waves-transactions'
import db from './db.json'
// import keychain from './keychain'

const { broadcast, verify, waitForTx, libs, transfer } = waves

window.waves = waves

const nodeUrl = 'https://testnodes.wavesnodes.com'
window.nodeUrl = nodeUrl

export const kassaAddress = '3MvgqcdKFrgrNjEbgtsV42Jd3KnkgkywWJY'

export const verifyTx = async tx => {
  console.log('tx', tx)

  const parsed = JSON.parse(tx)
  console.log('parsed', parsed)

  return verify(parsed)
}

export const sendTx = async tx => {

  console.log('tx', tx)

  const parsed = JSON.parse(tx)
  console.log('parsed', parsed)

  console.log('verify', verify(parsed))

  return broadcast(parsed, nodeUrl)
}

export const fetchTxList = async (address = kassaAddress, limit = 100) => {
  return fetch(`${nodeUrl}/transactions/address/${address}/limit/${limit}`)
    .then(res => res.json())
}

export const decodeProduct = productId => {
  // use keychain.decodeMessage

  return db.items.find(product => product.i === parseInt(productId, 10))
}

export const decodeProducts = tx => {
  const productBytes = libs.crypto.base58Decode(tx.attachment)
  const enc = new TextDecoder("utf-8")
  const productList = enc.decode(productBytes)

  // const productList = "333,123"

  const products = productList.split(',')

  console.log('products', products)
  console.log('decoded', products.map(id => decodeProduct(id)))

  return products.map(id => decodeProduct(id)).filter(p => !!p)
}

export const sendFaucet = async (address, seed) => {
  const signedTranserTx = transfer({
    amount: 1e7,
    recipient: address,
  }, seed)

  return broadcast(signedTranserTx, nodeUrl)
}

export const waitTx = async txId => waitForTx(txId, { apiBase: nodeUrl })
