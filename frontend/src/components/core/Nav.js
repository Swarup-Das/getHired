import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, Navigate } from "react-router-dom";
import { isAuthenticated } from "../userComponent/Auth/AuthHelper";

function NavScrollExample() {
  const [redirectToLoginPage, setRedirectToLoginPage] = useState(false);
  const redirectHelper = (target) => {
    return <Navigate to={target} />;
  };

  const showLogOutConfirmation = () => {
    window.confirm("Do You want to log out?");
    if (
      window.localStorage !== undefined &&
      window.localStorage.getItem("user") !== undefined
    ) {
      window.localStorage.removeItem("user");
      setRedirectToLoginPage(true);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      {redirectToLoginPage && redirectHelper("/login")}
      <Container fluid>
        <Navbar.Brand href="#">jobfinder.io</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {!isAuthenticated() && (
              <Nav.Link>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/signup"
                >
                  Sign Up
                </Link>
              </Nav.Link>
            )}
            {!isAuthenticated() && (
              <Nav.Link>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/login"
                >
                  Login
                </Link>
              </Nav.Link>
            )}
            {isAuthenticated() && (
              <Nav.Link>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/job/create"
                >
                  Create Job
                </Link>
              </Nav.Link>
            )}
            {isAuthenticated() && (
              <Nav.Link>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/user/profile"
                >
                  Profile
                </Link>
              </Nav.Link>
            )}
            {isAuthenticated() && (
              <Nav.Link
                onClick={() => {
                  showLogOutConfirmation();
                }}
              >
                LogOut
              </Nav.Link>
            )}

            <Nav.Link href="/signup">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
