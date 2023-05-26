import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const registerData = {
        firstName,
        lastName,
        email,
        userType,
        password,
        passwordVerify,
      };

      const result = await axios.post("http://localhost:8060/user/register", registerData);

      if (result?.status === 201) {
        setLoading(false);
        alert("Verification Email Sent successfully");
        localStorage.removeItem("type");
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      setLoading(false);
      console.error(err?.response?.data?.errorMessage);
      alert(err?.response?.data?.errorMessage);
    }
  };

  const resetForm = (e) => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setUserType("");
    setPassword("");
    setPasswordVerify("");
  };

  return (
    <div className="main" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="sub-main" style={{ padding: "20px", backgroundColor: "#f2f2f2", borderRadius: "5px", textAlign:"center" }}>
        <h1>Sign Up</h1>
        <hr />
        <form onSubmit={register} border="dark">
          <Container>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    required
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    required
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="E-mail"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control
                    as="select"
                    onChange={(e) => setUserType(e.target.value)}
                    value={userType}
                  >
                    <option value="">Select Role</option>
                    <option value="Manager">Manager</option>
                    <option value="Blogger">Blogger</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password Verify"
                    required
                    onChange={(e) => setPasswordVerify(e.target.value)}
                    value={passwordVerify}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col>
                <Button
                  onClick={resetForm}
                  variant="secondary"
                  size="lg"
                  style={{ width: "70%", float: "right", margin: "5px" }}
                >
                  Reset
                </Button>
              </Col>
              <Col>
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  style={{ width: "70%", margin: "5px" }}
                >
                  {loading ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="sr-only">Registering...</span>
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </Col>
            </Row>
          </Container>
          <p style={{textAlign:"center", margin:"10px", textDecoration:"none"}}><a href="/" style={{ textDecoration:"none"}}>Sign In</a></p>
        <hr />
        </form>
      </div>
    </div>
  );
};

export default Register;
