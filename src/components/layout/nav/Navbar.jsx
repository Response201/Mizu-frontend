import Cookies from "js-cookie";
import { Navbar, Nav, Container, Dropdown, } from "react-bootstrap";
import { Cart } from './Cart';
import { useGlobalContext } from '../../../context/GlobalContext';
import { Fetch } from "../../../services/Fetch";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseCheckLoginStatus } from "../../../services/UseCheckLoginStatus";

export const Navigation = () => {
  const { userId, setUserId, token, setToken, error } = useGlobalContext();
  const [url, setUrl] = useState('')
  const [body] = useState({})
  const { data } = Fetch(url, "post", body)
  const navigate = useNavigate()

  useEffect(() => {
    // If an error occurs with status 403, navigate to sign-in page
    if (error === "Request failed with status code 403") {
      navigate("signin")
    }
  }, [error, navigate])
  const handleLogout = () => {
    // Trigger logout request when user logs out
    setUrl("signout")
  };

  // Handle logout success
  if (data && data.message === "Logged out successfully" && token && userId) {
    setToken('')  // Clear token
    setUserId('')  // Clear userId
    Cookies.remove("jwtToken");  // Remove JWT token from cookies
    navigate("/")  // Redirect to home page
    window.scrollTo(0, 0);  // Scroll to the top of the page
  }


 UseCheckLoginStatus();

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
              <Nav.Link href="/" className='hover-target nav_link' >Home</Nav.Link>
              <Nav.Link href="/products" className='hover-target nav_link'>Products</Nav.Link>
              <Nav.Link href="/mix" className='hover-target nav_link'  >Pick & Mix</Nav.Link>
              <Nav.Link href="/about" className='hover-target nav_link' >About</Nav.Link>
            </Nav>
            <Nav className="nav-right transparent">
              {userId  ? (  // If user is logged in, show cart and profile options
                <>
                  {/* CART */}
                  <Cart />
                  <Dropdown align="end" >
                    <Dropdown.Toggle variant="light" id="dropdown-basic"  >
                      <div className='icons_nav'>
                        <i className="bi bi-person icons_nav"></i> {/* Profile icon */}
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='profil'>
                      <Dropdown.Item href="/receipts" className="hover-target">Receipts</Dropdown.Item>  {/* Receipts page link */}
                      <Dropdown.Item onClick={handleLogout} className='hover-target' >Sign out</Dropdown.Item>  {/* Sign out button */}
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                // If user is not logged in, show sign in and sign up options
                <>
                  <Dropdown align="end" className=''>
                    <Dropdown.Toggle variant="light" id="dropdown-basic" >
                      <div className='icons_nav'>
                        <i className="bi bi-person icons_nav"></i>  {/* Profile icon */}
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='profil'>
                    <Dropdown.Item href="/signin" className='hover-target'>Sign in</Dropdown.Item>  {/* Sign in link */}
                    <Dropdown.Item href="/register" className='hover-target' >Sign up</Dropdown.Item>  {/* Sign up link */}
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
