import Cookies from "js-cookie";
import { Navbar, Nav, Container, Dropdown, } from "react-bootstrap";
import { Cart } from './Cart';
import { useGlobalContext } from '../../../context/GlobalContext';
import { Fetch } from "../../../services/Fetch";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



export const Navigation = () => {
  /*   const [categories, setCategories] = useState([]);
    const [cartCount, setCartCount] = useState(0); */
  const { userId, setUserId, token, setToken } = useGlobalContext();
  const [url, setUrl] = useState('')
  const [body] = useState({})
  const { data } = Fetch(url, "post", body)
  const navigate = useNavigate()


  const handleLogout = () => {
    setUrl("signout")
  };

  if (data && data.message === "Logged out successfully" && token && userId) {

    setToken('')
    setUserId('')
    Cookies.remove("jwtToken");
    navigate("/")
    window.scrollTo(0, 0);


  }


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

              <Nav.Link href="/" className='hover-target nav_link' >Hem</Nav.Link>
              <Nav.Link href="/products" className='hover-target nav_link' >Produkter</Nav.Link>
              <Nav.Link href="/mix" className='hover-target nav_link'  >Pick & Mix</Nav.Link>
              <Nav.Link href="/about" className='hover-target nav_link' >About</Nav.Link>

            </Nav>
            <Nav className="nav-right transparent">
              {userId ? (
                <>
                  {/* CART */}
                  <Cart />



                  <Dropdown align="end" >
                    <Dropdown.Toggle variant="light" id="dropdown-basic"  >
                      <div className='icons_nav'>
                        <i className="bi bi-person icons_nav"></i>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='profil'>
                      <Dropdown.Item href="/profil" className="hover-target">Profil</Dropdown.Item>
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
                      <Dropdown.Item href="/signin" className='hover-target'>Logga in</Dropdown.Item>

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
