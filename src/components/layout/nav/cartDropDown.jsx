import { useState } from 'react';
import { Dropdown, Badge, Button, ListGroup } from "react-bootstrap";
export const CartDropDown = () => {
  const [totalPrice, setTotalPrice] = useState(1545456)
  const [discount, setDiscount] = useState(1000)
  const [cartItems, setCartItem] = useState([{ id: 15, name: 'hello', quantity: '5', price: "15" }, { id: 12, name: 'hello', quantity: '5', price: "15" }])


console.log(setCartItem,setDiscount,setTotalPrice)

  return (
    <Dropdown align="end" className='transparent '>
      <Dropdown.Toggle variant="light" id="dropdown-basic" className='transparent '>
        <i className="bi bi-cart3"></i>
        <Badge pill bg="ligth" className="ms-1 custom-badge ">
          <p>
            {cartItems.reduce((acc, item) => acc + +item.quantity, 0) /* Cart item count */}
          </p>
        </Badge>
      </Dropdown.Toggle>
      <Dropdown.Menu style={{ minWidth: '300px' }} className='backDrop' >
        <section className='blur'></section>
        <ListGroup className="ListGroup transparent ">
          {cartItems.length === 0 ? (
            <ListGroup.Item className='emtpyList'>Varukorgen är tom</ListGroup.Item>
          ) : (
            cartItems.map((item) => (
              <ListGroup.Item
                key={item.id}
                className="d-flex justify-content-between align-items-center item border_bottom transparent "
              >
                {item.name}
                <span>
                  {item.quantity}</span>
                <div className='transparent'>
                  <Button size="sm" className="btn">
                    <i className="bi bi-plus-lg"></i>
                  </Button>
                  <Button size="sm" className="btn">
                    <i className="bi bi-dash-lg"></i>
                  </Button>
                  <Button size="sm" className="btn">
                    <i className="bi bi-trash3"></i>
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          )}
          {cartItems.length !== 0 && (
            <>
              {discount && <ListGroup.Item className="d-flex align-items-center justify-content-end item border_bottom transparent ">
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
