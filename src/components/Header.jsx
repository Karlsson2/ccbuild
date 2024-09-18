import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";

function Header() {
  const baseUrl = import.meta.env.VITE_SUPABASE_BUCKET_URL;
  const imageUrl = `${baseUrl}/public/cclogo.png`;

  return (
    <Container>
      <Navbar>
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src={imageUrl}
              width="180"
              className="d-inline-block align-top"
            />
          </Navbar.Brand>
        </Container>
        <Container>
          <Nav.Link href="#">CCBUILD</Nav.Link>
          <Nav.Link href="#">TJÄNSTER</Nav.Link>
          <NavDropdown title="Marknadsplatsen" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#">Marknadsplatsen</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown title="Produktbanken" id="navbarScrollingDropdown">
            <NavDropdown.Item href="#">Produktbanken</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown
            title="Marie Kalmnäs"
            id="navbarScrollingDropdown"
          ></NavDropdown>
          <NavDropdown title="SV" id="navbarScrollingDropdown"></NavDropdown>
        </Container>
      </Navbar>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">ÖVERSIKT</Nav.Link>
              <Nav.Link href="#">PROJEKT</Nav.Link>
              <Nav.Link href="#">PRODUKTER</Nav.Link>
              <Nav.Link href="#">EFTERLYSNINGAR</Nav.Link>
              <Nav.Link href="#">ORGANISATIONSADMIN</Nav.Link>
              <Nav.Link href="#">VÄRDEANALYS</Nav.Link>
              <Nav.Link href="#">MÄRKNING</Nav.Link>
              <Nav.Link href="#">HJÄLP</Nav.Link>
            </Nav>
            <Nav>
              <Form className="d-flex">
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
              </Form>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default Header;
