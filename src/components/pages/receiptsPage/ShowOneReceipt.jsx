export const ShowOneReceipt = ({ receipt, setReceipt }) => {
  return (
    <section className="receiptsContent___receipt">
      {/* Close button to reset the current receipt */}
      <div className="orderDetails">
        <section className="orderDetails___btnContainer">
          <button onClick={() => setReceipt(null)}>
            <i className="bi bi-x-lg"></i> {/* Close icon */}
          </button>
        </section>

        {/*  Title */}
        <h2 className="orderDetails___title">Order Information</h2>

        {/*  Receipt id */}
        <p className="orderDetails___info">
          <strong>Receipt id:</strong> #{receipt._id.slice(17, -1)} {/* Slice to extract a more readable part of the ID */}
        </p>

        {/* Creation Date */}
        <p className="orderDetails___info">
          <strong>Order Created At:</strong> {new Date(receipt.createdAt).toLocaleString().slice(0, -3)}
          {/* Formats the date and removes the milliseconds part */}
        </p>

        {/* Products List  */}
        <h3 className="orderDetails___productsTitle">Products:</h3>
        <ul className="orderDetails___productsList">
          {receipt.products.map((product, index) => (
            <li className="orderDetails___product" key={index}>
              <section>{product.name}</section> {/* Product name */}
              <section>{product.pickAndMix ? 'mix' : '-'}</section> {/* Display 'mix' if product is part of pick and mix */}
              <section>{product.price} kr x {product.quantity}</section> {/* Price per item and quantity */}
              <section>{product.price * product.quantity} kr</section> {/* Total price per product */}
            </li>
          ))}
        </ul>

        {/*  Discount */}
        <p className="orderDetails___discount">
          <strong>Discount:</strong> {receipt.discount} kr
        </p>

        {/*  Total Price */}
        <p className="orderDetails___totalPrice">
          <strong>Total:</strong> {receipt.totalPrice} kr
        </p>
      </div>
    </section>
  );
};
