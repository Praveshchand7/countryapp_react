import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';
import { auth, logOut } from '../auth/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';



const Layout = () => {
  const [user] = useAuthState(auth)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
    <Container fluid>
      <Row>
        <Navbar bg="light" variant="light">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav>
                <LinkContainer to="/">
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/countries">
                  <Nav.Link>Countries</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/favourites">
                  <Nav.Link>Favourites</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link>Register</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
            {user?(<Button onClick={logOut}>Logout</Button>):(
              <Link to='/login'><Button>Login</Button></Link>
            )} 
          </Container>
        </Navbar>
      </Row>
      <Row style={{ flex: 1 }}>
        <Outlet/>
        </Row>
        
    </Container>
    </div>
  );
};

export default Layout;
