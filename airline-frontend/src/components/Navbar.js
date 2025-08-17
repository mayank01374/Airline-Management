import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const AppNavbar = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      variant="dark"
      style={{
        backgroundColor: "rgba(0, 51, 102, 0.85)",
        backdropFilter: "blur(6px)",
        paddingTop: "0.4rem",
        paddingBottom: "0.4rem",
      }}
    >
      <Container fluid className="px-4">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <img
            src="/images/logo.png"
            alt="FlyHigh Logo"
            height="60"
            className="d-inline-block align-top me-2"
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "4px",
            }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="ms-auto d-flex align-items-center justify-content-end"
            style={{ width: "100%" }}
          >
            <Nav.Link as={Link} to="/" className="me-3">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/flight-status" className="me-3">
              Flight Status
            </Nav.Link>

            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" className="me-3">
                  Profile
                </Nav.Link>
                <Button
                  variant="outline-light"
                  size="sm"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Nav.Link as={Link} to="/signin">
                Sign In
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
