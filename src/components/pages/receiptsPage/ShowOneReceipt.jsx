

export const ShowOneReceipt = ({receipt, setReceipt}) => {
  return (
    <section className="receiptsContent___receipt">


    <div className="orderDetails">
      <section className="orderDetails___btnContainer">

        <button onClick={() => setReceipt(null)}>  <i className="bi bi-x-lg"></i>
        </button>
      </section>

      <h2 className="orderDetails___title">Order Information</h2>
      <p className="orderDetails___info">
        <strong>Receipt ID:</strong> #{receipt._id.slice(17, -1)}
      </p>
      <p className="orderDetails___info">
        <strong>Order Created At:</strong> {new Date(receipt.createdAt).toLocaleString().slice(0, -3)}
      </p>

      <h3 className="orderDetails___productsTitle">Products:</h3>
      <ul className="orderDetails___productsList">
        {receipt.products.map((product, index) => (
          <li className="orderDetails___product" key={index}>
            <section>   {product.name}      </section>
            <section>   {product.pickAndMix ? 'mix' : '-'}      </section>
            <section>      {product.price} kr  x  {product.quantity}</section>
            <section>  {product.price * product.quantity} kr </section>
          </li>
        ))}
      </ul>

      <p className="orderDetails___discount">
        <strong>Discount:</strong> {receipt.discount}kr
      </p>
      <p className="orderDetails___totalPrice">
        <strong>Total:</strong> {receipt.totalPrice}kr
      </p>
    </div>


  </section>
  )
}
