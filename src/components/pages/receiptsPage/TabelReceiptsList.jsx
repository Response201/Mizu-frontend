

export const TabelReceiptsList = ({receipts, setReceipt}) => {
  return (
    <table >
    <thead>
      <tr>
        <th>Created</th>
        <th>Products</th>
        <th>Total</th>
        <th>Discount</th>
        <th>Receipt</th>
      </tr>
    </thead>
    <tbody>
      {receipts && receipts.map((receipt, index) => (
        <tr key={index} onClick={() => setReceipt(receipt)} >
          {/* Skapad Tid */}
          <td>{new Date(receipt.createdAt).toLocaleString().slice(0, -8)}</td>

          {/* Antal Produkter */}
          <td>{receipt.products.reduce((total, product) => total + product.quantity, 0)}</td>


          {/* Totalpris */}
          <td>{receipt.totalPrice}</td>

          {/* Rabatt */}
          <td>{receipt.discount}</td>

          {/* Förkortat Produkt-ID */}
          <td>
            {receipt.products.length > 0 && `#${receipt._id.slice(17, -1)}`}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}
