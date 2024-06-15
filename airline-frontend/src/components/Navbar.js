import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const AppNavbar = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand as={Link} to="/">
        Airline Booking
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/profile">
            Profile
          </Nav.Link>
          <Nav.Link as={Link} to="/flight-status">
            Flight Status
          </Nav.Link>
          <Nav.Link as={Link} to="/reviews">
            Reviews
          </Nav.Link>
          <Nav.Link as={Link} to="/notifications">
            Notifications
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppNavbar;
