import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

interface NavbarInterface {
  isLoggedIn: boolean;
  username?: string;
  onLogout: () => void;
}

function NavbarComponent({ isLoggedIn, username, onLogout }: NavbarInterface) {
  const location = useLocation();

  return (
    <Navbar fixed='top' bg="dark" variant="dark" className='navbar'>
      <Container>
        <Navbar.Brand as={Link} to="/">Touiteur</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" active={location.pathname === "/"}>Tous les posts</Nav.Link>
          <Nav.Link as={Link} to="/popular" active={location.pathname === "/popular"}>Populaires</Nav.Link>
          <Nav.Link as={Link} to="/recent" active={location.pathname === "/recent"}>Récents</Nav.Link>
          <Nav.Link as={Link} to="/search" active={location.pathname === "/search"}>Recherche</Nav.Link>
          <Nav.Link as={Link} to="/profile" active={location.pathname === "/profile"}>Profile</Nav.Link>
        </Nav>

        {isLoggedIn ? (
          <>
            <span style={{ color: "white", marginRight: "10px" }}>👤 {username}</span>
            <Button variant="outline-light" onClick={onLogout}>Logout</Button>
          </>
        ) : (
          <Button variant="outline-light" as={Link} to="/login">Login</Button>
        )}
        
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;