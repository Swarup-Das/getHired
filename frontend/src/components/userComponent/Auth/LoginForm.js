import React, { useContext, useState } from "react";
import Base from "../../core/Base";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/esm/Container";
import { loginApiCall } from "./AuthHelper";
import { Navigate } from "react-router-dom";

// import { UserProfileContext } from "../../Contexts/UserProfileContext";

const LoginForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [showMessage, setShowMessage] = useState({
    success: false,
    displayMessage: false,
    redirectToHome: false,
  });
  // const [userProfile, setUserProfile] = useContext(UserProfileContext);

  const redirectTo = (target) => {
    return <Navigate to={target} />;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);
    console.log(userData);
    loginApiCall(userData).then((resp) => {
      if (resp.error) {
        setShowMessage({ success: false, displayMessage: true });
      } else {
        setShowMessage({ success: true, displayMessage: true });
        if (window.localStorage != undefined) {
          localStorage.setItem("user", JSON.stringify(resp));

          setShowMessage({ ...showMessage, redirectToHome: true });
        }
      }
      setLoading(false);
    });
  };

  const successMessage = () => {
    return (
      <>
        <p className="text-center">
          You have been signed up for <strong>{userData.message}</strong>
        </p>
      </>
    );
  };

  const failureMessage = () => {
    return (
      <>
        <p className="text-center">
          Login unsuccessful due to <strong>{userData.email}</strong>
        </p>
      </>
    );
  };

  return (
    <Base>
      {showMessage.redirectToHome && redirectTo("/")}
      {showMessage.success && showMessage.displayMessage && successMessage()}
      {showMessage.success == false &&
        showMessage.displayMessage &&
        failureMessage()}
      {loading && <div>Loading...</div>}
      {!loading && !showMessage.displayMessage && (
        <Container>
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

            <Button onClick={(e) => handleSubmit(e)} variant="primary">
              Submit
            </Button>
          </Form>
        </Container>
      )}
    </Base>
  );
};

export default LoginForm;
