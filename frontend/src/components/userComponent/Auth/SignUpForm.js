import React, { useState } from "react";
import Base from "../../core/Base";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { signUpApiCall } from "./AuthHelper";

const SignUpForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState({
    success: false,
    displayMessage: false,
  });

  const handleSubmit = () => {
    setLoading(true);
    console.log(userData);
    signUpApiCall(userData).then((resp) => {
      console.log(resp);
      if (resp.error) {
        setShowMessage({ success: false, displayMessage: true });
      } else {
        setShowMessage({ success: true, displayMessage: true });
      }
      setLoading(false);
    });
  };

  const successMessage = () => {
    return (
      <>
        <p className="text-center">
          You have been signed up for <strong>{userData.email}</strong>
        </p>
      </>
    );
  };

  const failureMessage = () => {
    return (
      <>
        <p className="text-center">
          You have been signed up for <strong>{userData.email}</strong>
        </p>
      </>
    );
  };

  return (
    <Base>
      {showMessage.success && showMessage.displayMessage && successMessage()}
      {showMessage.success == false &&
        showMessage.displayMessage &&
        failureMessage()}
      {loading && <div>Loading...</div>}
      {!loading && !showMessage.displayMessage && (
        <Container>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => {
                setUserData({ ...userData, name: e.target.value });
              }}
              type="text"
              placeholder="Enter name"
            />
          </Form.Group>

          <Form class="w-25 p-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setUserData({ ...userData, email: e.target.value });
                }}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setUserData({ ...userData, password: e.target.value });
                }}
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button onClick={() => handleSubmit()} variant="primary">
              Submit
            </Button>
          </Form>
        </Container>
      )}
    </Base>
  );
};

export default SignUpForm;
