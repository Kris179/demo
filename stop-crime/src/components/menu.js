import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Menu() {
  return (
    <Navbar bg="body-tertiary" expand="lg">
      <Navbar.Brand href="#">Navbar</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarNavDropdown" />
      <Navbar.Collapse id="navbarNavDropdown">
        <Nav className="me-auto">
          <NavDropdown title="Заявления" id="nav-dropdown">
            <NavDropdown.Item as={Link} to="/Papers">Все заявления</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/New_paper">Новое заявление</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link as={Link} to="/Signup">Зарегистрироваться</Nav.Link>
          <Nav.Link as={Link} to="/Signin">Войти</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Menu;
