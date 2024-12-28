
import { Dropdown, Badge, Button, ListGroup } from "react-bootstrap";
import { useGlobalContext } from '../../../context/GlobalContext';
import { useCartContext } from '../../../context/CartContext';
export const Cart = () => {
  const {totalPrice, cart, handleFetch, discount} = useCartContext()
  const {  userId } = useGlobalContext();

 


 

  

/* add, remove, delete from cart */
  const handleItemToCart = (item, action) => {
    handleFetch(userId,item.productId, action); 
};



  return (
    <Dropdown align="end" className='transparent '>
      <Dropdown.Toggle variant="light" id="dropdown-basic" className='transparent icons_nav_cart'>
        <i className="bi bi-cart3 "></i>
        <Badge pill bg="ligth" className="ms-1 custom-badge ">
          <p>
             {cart && cart.reduce((acc, item) => acc + +item.quantity, 0)  /* Cart item count */}
          </p>
        </Badge>
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ minWidth: '300px' }} className='backDrop' >
        <section className='blur'></section>
        <ListGroup className="ListGroup transparent ">
          {cart && cart.length === 0 ? (
            <ListGroup.Item className='emtpyList'>Varukorgen är tom</ListGroup.Item>
          ) : (
            cart.map((item) => (
              <ListGroup.Item
                key={item.productId}
                className="d-flex justify-content-between align-items-center item border_bottom transparent productName"
              >
                <p>    {item.name}    </p>
              
                <span>
                  {item.quantity}</span>
                <div className='transparent btnContainer'>
                  <Button size="sm" className="btn" onClick={()=>handleItemToCart(item, 'add')}>
                    <i className="bi bi-plus-lg"></i>
                  </Button>
                  <Button size="sm" className="btn" onClick={()=>handleItemToCart(item, 'remove')}>
                    <i className="bi bi-dash-lg"></i>
                  </Button>
                  <Button size="sm" className="btn" onClick={()=>handleItemToCart(item, 'delete')}>
                    <i className="bi bi-trash3"></i>
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          )}
          {cart && cart.length !== 0 && (
            <>
              { discount !== 0 && <ListGroup.Item className="d-flex align-items-center justify-content-end item border_bottom transparent ">
                <section className='price'>
                  <p >Discount:</p>  <p>{discount}kr</p>
                </section>
              </ListGroup.Item>}
              <ListGroup.Item className="d-flex justify-content-end align-items-center item border_bottom transparent ">
                <section className='price'>
                  <p>Totalt:</p>
                  <p >{totalPrice}kr </p>
                </section>
              </ListGroup.Item >
              <section className="checkout hover-target" >
                <button className="checkout___btn hover-target">
                  checkout  </button>
              </section></>
          )}
        </ListGroup>
      </Dropdown.Menu>
    </Dropdown>
  )
}
