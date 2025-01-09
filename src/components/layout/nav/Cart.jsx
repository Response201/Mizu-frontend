import { Dropdown, Badge, Button, ListGroup } from "react-bootstrap";
import { useCartContext } from '../../../context/CartContext';
import { CartAndTableBtns } from "../../cartAndTableBtns/CartAndTableBtns";
export const Cart = () => {
  const { totalPrice, cart, discount } = useCartContext()




  
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
            <ListGroup.Item className='emtpyList transparent'>Varukorgen är tom</ListGroup.Item>
          ) : (
            cart.map((item) => (
              <ListGroup.Item
                key={item.productId}
                className="d-flex justify-content-between align-items-center item border_bottom transparent productName"
              >
                <p>    {item.name}    </p>
                <span>
                  {item.quantity}</span>
                <>
                  <CartAndTableBtns item={item} />
                </>
              </ListGroup.Item>
            ))
          )}
          {cart && cart.length !== 0 && (
            <>
              {discount !== 0 && <ListGroup.Item className="d-flex align-items-center justify-content-end item border_bottom transparent ">
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
                <a href="/checkout">
                  <Button className="checkout___btn hover-target">
                    checkout
                  </Button>
                </a>
              </section></>
          )}
        </ListGroup>
      </Dropdown.Menu>
    </Dropdown>
  )
}
