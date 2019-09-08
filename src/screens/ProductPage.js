import React from 'react'
import db from '../services/db.json'

export default (props) => {
  const { id } = props.match.params
  console.log(id)
  const product = db.items.find(p => p.i === parseInt(id, 10))

  if (!product) {
    return (
      <header className="App-header">
        <h1>Product not found</h1>
      </header>
    )
  }
  return (
    <header className="App-header">
      <h1>Product {id}</h1>
      <table>
        <tr>
          <td>
          ID
          </td>
          <td>
          {product.i}
          </td>
        </tr>
        <tr>
          <td>
            Name
          </td>
          <td>
            {product.n}
          </td>
        </tr>
        <tr>
          <td>
            Image
          </td>
          <td>
            <img src={product.p} style={{ maxWidth: '300px', maxHeight: '300px' }} alt="" />
          </td>
        </tr>
        <tr>
          <td>
            Price
          </td>
          <td>
            {product.amount} RUB
          </td>
        </tr>
      </table>
    </header>
  )
}
