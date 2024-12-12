import { useState } from 'react';
import { Navbar, Nav, Container, Dropdown,  } from "react-bootstrap";
import { CartDropDown } from './cartDropdown';

export const Navigation = () => {
/*   const [categories, setCategories] = useState([]);
  const [cartCount, setCartCount] = useState(0); */
  const [isLoggedIn, setIsLoggedIn] = useState(true);

 
  console.log(setIsLoggedIn)
  const handleLogout = () => {
    setIsLoggedIn(false); // Logic to log out the user
  };
  const handleLogin = () => {
    setIsLoggedIn(true); // Logic to log in the user (this could be replaced with actual login flow)
  };
  return (
    <>
      <Navbar expand="lg" className="navbar-container">
        <Container fluid className='nav'>
          <Navbar.Brand href="/" className="nav-left transparent  nav_home_link hover-target " >
            Mizu
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto transparent nav-middle">
              <div>
                <Nav.Link href="/" className='hover-target nav_link' >Hem</Nav.Link>
                <Nav.Link href="/products" className='hover-target nav_link' >Produkter</Nav.Link>
                <Nav.Link href="/mix" className='hover-target nav_link'  >Pick & Mix</Nav.Link>
                <Nav.Link href="/about" className='hover-target nav_link' >About</Nav.Link>
              </div>
            </Nav>
            <Nav className="nav-right transparent">
              {isLoggedIn ? (
                <>
                  {/* CART */}
                  <CartDropDown />



                  <Dropdown align="end" >
                    <Dropdown.Toggle variant="light" id="dropdown-basic"  >
                      <div className='icons_nav'>
                    <i className="bi bi-person icons_nav"></i>
</div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='profil'>
                      <Dropdown.Item href="/profile" className="hover-target" >Profil</Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout} className='hover-target' >Logga ut</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <Dropdown align="end" className=''>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" >
                    <div className='icons_nav'>
                    <i className="bi bi-person icons_nav"></i>
</div>

                    </Dropdown.Toggle>
                    <Dropdown.Menu className='profil'>
                      <Dropdown.Item onClick={handleLogin} className='hover-target' >Logga in</Dropdown.Item>
                      <Dropdown.Item href="/register" className='hover-target' >Skapa konto</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
