let keyPair = null

const ALGORITHM = {
  name: "RSA-OAEP",
  modulusLength: 4096,
  publicExponent: new Uint8Array([1, 0, 1]),
  hash: "SHA-256"
}

export const generateKey = async () => {
  if (localStorage.getItem('cypherkey')) throw new Error('Key already exists')

  keyPair = await window.crypto.subtle.generateKey(
    ALGORITHM,
    true,
    ["encrypt", "decrypt"],
  )

  const exportedPrivateKey = await window.crypto.subtle.exportKey("jwk", keyPair.privateKey)
  const exportedPublicKey = await window.crypto.subtle.exportKey("jwk", keyPair.publicKey)

  localStorage.setItem('privateKey', JSON.stringify(exportedPrivateKey))
  localStorage.setItem('publicKey', JSON.stringify(exportedPublicKey))

  return keyPair
}


export const importKey = async () => {
  const privateKey = JSON.parse(localStorage.getItem('privateKey'))
  const publicKey = JSON.parse(localStorage.getItem('publicKey'))

  if (!privateKey || !publicKey) return console.error('Cannot')

  keyPair = {
    privateKey: await window.crypto.subtle.importKey(
      "jwk",
      privateKey,
      ALGORITHM,
      true,
      ["decrypt"],
    ),
    publicKey: await window.crypto.subtle.importKey(
      "jwk",
      publicKey,
      ALGORITHM,
      true,
      ["encrypt"],
    )
  }

  return keyPair
}

/*
Get the encoded message, encrypt it and display a representation
of the ciphertext in the "Ciphertext" element.
*/
export const encryptMessage = async (key, message) => {
  const enc = new TextEncoder()
  const encoded = enc.encode(message)

  const ciphertext = await window.crypto.subtle.encrypt(
    ALGORITHM,
    key,
    encoded,
  )

  // let buffer = new Uint8Array(ciphertext, 0, 5)
  // const ciphertextValue = document.querySelector(".rsa-oaep .ciphertext-value")
  // ciphertextValue.classList.add('fade-in')
  // ciphertextValue.addEventListener('animationend', () => {
  //   ciphertextValue.classList.remove('fade-in')
  // })
  // ciphertextValue.textContent = `${buffer}...[${ciphertext.byteLength} bytes total]`

  return ciphertext
}

/*
Fetch the ciphertext and decrypt it.
Write the decrypted message into the "Decrypted" box.
*/
export const decryptMessage = async (key, ciphertext) => {
  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP"
    },
    key,
    ciphertext,
  )

  const dec = new TextDecoder()
  return dec.decode(decrypted)
  //
  // const decryptedValue = document.querySelector(".rsa-oaep .decrypted-value")
  // decryptedValue.classList.add('fade-in')
  // decryptedValue.addEventListener('animationend', () => {
  //   decryptedValue.classList.remove('fade-in')
  // })
  // decryptedValue.textContent = dec.decode(decrypted)
}

const keychain = {
  importKey,
  generateKey,
  encryptMessage,
  decryptMessage,
}

window.keychain = keychain
