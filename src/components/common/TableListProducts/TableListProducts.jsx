import { useCartContext } from '../../../context/CartContext'

import getAnimation from "../../../assets/lotties/buttonOrange.json";
import { MainButton } from '../lottieBtn/MainBtn';
import { CartAndTableBtns } from '../cartAndTableBtns/CartAndTableBtns';


/* Table displaying cart products, pricing, and actions */
export const TableListProducts = ({ showButtons, cart, totalPrice }) => {
  const {   discount } = useCartContext();


  return (
    <section className="table">
      <table className="table__content">
        <thead>
          <tr>
            <th>Product</th>
            <th>Mix</th>
            <th>Quantity</th>
            <th>Price</th>
            {showButtons && <th>Actions</th>}  {/* Show action buttons if `showButtons` is true */}
          </tr>
        </thead>
        <tbody>
          {cart && cart.map((item) => (
            <tr key={item.productId}>
              <td>{item.name}</td>
              <td>{item.pickAndMix ? 'yes': 'no'}</td>
              <td className='td___quantity'>{item.quantity}</td>
              <td>{(item.price * item.quantity).toFixed(2)}</td>
              {showButtons && (
                <td>
                  <CartAndTableBtns item={item} /> {/* Render Cart and Table Buttons if `showButtons` is true */}

                </td>
              )}
            </tr>
          ))}
        </tbody>
        <tfoot>
        <tr>
            <td colSpan={showButtons ? 4 : 3}>Discount</td> {/* Show discount row */}
            <td colSpan={showButtons ? 3 : 3}>${discount.toFixed(2)}</td> {/* Display discount value */}
          </tr>
          <tr>
            <td colSpan={showButtons ? 4 : 3}>Total</td> {/* Show total price row */}
            <td colSpan={showButtons ? 2 : 3}>${totalPrice.toFixed(2)}</td> {/* Display total price */}
          </tr>
          {showButtons && (
            <tr>
              <td colSpan={5}>
                <a href='/payment'>
                  <MainButton text="Pay" getAnimation={getAnimation} /> {/* Display payment button */}
                </a>
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </section>
  );
};
