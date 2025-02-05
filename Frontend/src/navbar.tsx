import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

interface NavbarProps {
  isLoggedIn: boolean;
  username?: string;
  onLogout: () => void;
}

function NavbarComponent({ isLoggedIn, username, onLogout }: NavbarProps) {
  const location = useLocation();

  return (
    <Navbar sticky='top' bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Touiteur</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={Link} to="/" active={location.pathname === "/"}>Tous les posts</Nav.Link>
          <Nav.Link as={Link} to="/features" active={location.pathname === "/features"}>Populaires</Nav.Link>
          <Nav.Link as={Link} to="/pricing" active={location.pathname === "/pricing"}>Récents</Nav.Link>
        </Nav>

        {/* Affichage dynamique selon l'état de connexion */}
        {isLoggedIn ? (
          <>
            <span style={{ color: "white", marginRight: "10px" }}>👤 {username}</span>
            <Button variant="outline-light" onClick={onLogout}>Logout</Button>
          </>
        ) : (
          <Button variant="outline-light">Login</Button>
        )}
        
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;