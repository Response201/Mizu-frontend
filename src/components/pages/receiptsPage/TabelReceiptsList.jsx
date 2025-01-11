

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
          {/*  Creation date */}
          <td>{new Date(receipt.createdAt).toLocaleString().slice(0, -8)}</td>

          {/* Aumber of products */}
          <td>{receipt.products.reduce((total, product) => total + product.quantity, 0)}</td>


          {/* Total pric */}
          <td>{receipt.totalPrice}</td>

          {/* Discount  */}
          <td>{receipt.discount}</td>

          {/*  Receipt id */}
          <td>
            {receipt.products.length > 0 && `#${receipt._id.slice(17, -1)}`}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  )
}
