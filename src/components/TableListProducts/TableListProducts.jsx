import { useCartContext } from '../../context/CartContext'

import getAnimation from "../../assets/lotties/buttonOrange.json";
import { MainButton } from '../lottieBtn/MainBtn';
import { CartAndTableBtns } from '../CartAndTableBtns/CartAndTableBtns';

export const TableListProducts = ({ showButtons, cart, totalPrice }) => {
  const {   discount } = useCartContext();




  return (
    <section className="table">
      <table className="table__content">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            {showButtons && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {cart && cart.map((item) => (
            <tr key={item.productId}>
              <td>{item.name}</td>
              <td className='td___quantity'>{item.quantity}</td>
              <td>{(item.price * item.quantity).toFixed(2)}</td>
              {showButtons && (
                <td>
                  <CartAndTableBtns item={item} />
                </td>
              )}
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={showButtons ? 3 : 2}>Discount</td>
            <td colSpan={showButtons ? 1 : 2}>${discount.toFixed(2)}</td>
          </tr>
          <tr>
            <td colSpan={showButtons ? 3 : 2}>Total</td>
            <td colSpan={showButtons ? 1 : 2}>${totalPrice.toFixed(2)}</td>
          </tr>
          {showButtons && (
            <tr>
              <td colSpan={4}>
                <a href='/payment'>
                  <MainButton text="Pay" getAnimation={getAnimation} />
                </a>
              </td>
            </tr>
          )}
        </tfoot>
      </table>
    </section>
  );
};
