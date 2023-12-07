import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Logo from './Logo';
import Iconbutton from '../buttons/IconButton';
import { GithubIcon } from 'lucide-react';
import styled from 'styled-components';
import NavMenuItem from './NavMenuItem';

const NavBar = () => {
  return (
    <NavContainer className="mb-3" expand={"md"} fixed='top'>
      <Container >
        <Logo />
        {/* <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand> */}
        <Navbar.Toggle aria-controls={'offcanvasNavbar-expand}'} />
        <Navbar.Offcanvas
          id={'offcanvasNavbar-expand}'}
          aria-labelledby={'offcanvasNavbarLabel-expand}'}
          placement="end"
        >
          <Offcanvas.Header closeButton >
            <Offcanvas.Title id={'offcanvasNavbarLabel-expand-}'}>
              klog
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              {/* <Nav.Link href="#action1">Posts</Nav.Link> */}
              <NavMenuItem to="/posts">Posts</NavMenuItem>
              <NavMenuItem to="/photos">Photos</NavMenuItem>
              <NavMenuItem to="/sample">Sample</NavMenuItem>
              {/* <NavDropdown
                title="Dropdown"
                id={'offcanvasNavbarDropdown-expand}'}
              >
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown> */}
              <Iconbutton>
                <GithubIcon />
              </Iconbutton>
              {/* <Iconbutton
                onClick={modeHandler}
              >
                <Sun />
              </Iconbutton> */}
            </Nav>
            
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </NavContainer>
  );
}

export default NavBar;

const NavContainer = styled(Navbar)`
  background: var(--brown);
`;