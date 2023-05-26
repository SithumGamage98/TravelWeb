import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const loginData = {
        email,
        password
      };

      const result = await axios.post("http://localhost:8060/login", loginData);

      if (result) {
        setLoading(false);
        localStorage.setItem("type", result?.data?.type);
        if (result?.data?.verified === false) {
          alert("Please Update Your Profile");
          navigate("/profile");
          window.location.reload();
        } else {
          navigate("/dashboard");
          window.location.reload();
        }
      }
    } catch (err) {
      setLoading(false);
      alert(err.response.data.errorMessage);
      console.error(err.response.data.errorMessage);
    }
  };

  return (
    <div className="main" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div className="sub-main" style={{ padding: "20px", backgroundColor: "#f2f2f2", borderRadius: "5px" }}>
        <div className="main-center">
          <h1 style={{ margin: "2%", textAlign:"center" }}>Sign In</h1>
        </div>
        <hr />
        <form onSubmit={login}>
          <Container>
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
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </Form.Group>
              </Col>
            </Row>
          </Container>
          <div className="main-center" style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="primary"
              size="lg"
              type="submit"
              style={{
                width: "40%",
                margin: "5px",
                backgroundColor: "#4CAF50",
                borderColor: "#4CAF50"
              }}
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span className="sr-only">Login...</span>
                </>
              ) : (
                "Login"
              )}
            </Button>
          </div>
        </form>
        <p style={{textAlign:"center", margin:"10px", textDecoration:"none"}}><a href="/register" style={{ textDecoration:"none"}}>Sign Up</a></p>
        <hr />
      </div>
    </div>
  );
};

export default Login;
