
import { useCartContext } from '../../context/CartContext'
import { useGlobalContext } from '../../context/GlobalContext';
import { Button } from 'react-bootstrap';
import getAnimation from "../../assets/lotties/buttonOrange.json";
import { MainButton } from '../lottieBtn/MainBtn';
export const TableListProducts = (showButtons) => {
  const {totalPrice, cart, handleFetch, discount} = useCartContext()
  const {  userId } = useGlobalContext();


/* add, remove, delete from cart */
const handleItemToCart = (item, action) => {
    handleFetch(userId,item.productId, action); 
};

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
        {cart.map((item) => (
          <tr key={item.productId}>
            <td>{item.name}</td>
            <td className='td___quantity'>{item.quantity}</td>
            <td>${(item.price * item.quantity).toFixed(2)}</td>
            {showButtons && (
              <td>
                  <Button size="sm" className="btn" onClick={()=>handleItemToCart(item, 'add')}>
           <i className="bi bi-plus-lg"></i>
         </Button>
         <Button size="sm" className="btn" onClick={()=>handleItemToCart(item, 'remove')}>
           <i className="bi bi-dash-lg"></i>
         </Button>
         <Button size="sm" className="btn" onClick={()=>handleItemToCart(item, 'delete')}>
           <i className="bi bi-trash3"></i>
         </Button>
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
        {showButtons &&  <tr>
       
          <td colSpan={ 4 } >
    





<MainButton text="Pay" getAnimation={getAnimation} />

 

          </td>
        </tr> }
      </tfoot>
    </table>
  </section>
  )
}
