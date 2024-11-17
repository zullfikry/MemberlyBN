import React from "react";
import { useState, useContext } from "react";
import { Container, Button, Row, Col, Form } from "react-bootstrap";
import { FaArrowLeft, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from 'axios'
import toast from "react-hot-toast";

export default function LoginPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false); 

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data: responseData } = await axios.post('/login', { email, password });
      
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        // Update the context with the logged-in user
        setUser(responseData);  // Set user context here

        if (responseData.isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/landing');
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong during login.");
    }
  };

  return (
<Container
      className="d-flex flex-column justify-content-between"
      style={{ minHeight: "100vh" }}
    >
      {/* Arrow Button and Welcome Back Header */}
      <Row className="align-items-center mb-0 mt-4">
        <Col xs="auto">
          <Button variant="link" as={Link} to="/">
            <FaArrowLeft size={20} />
          </Button>
        </Col>
        <Col>
          <h1 className="text-start" style={{ fontSize: "2.5rem" }}>
            Welcome Back
          </h1>
        </Col>
      </Row>

      {/* Login Message */}
      <Row className="justify-content-center mb-0">
        <Col xs={12} className="text-center">
          <p>
            Login below or create an account{" "}
            <Link to="/signup">
              <strong>here</strong>
            </Link>
          </p>
        </Col>
      </Row>

      {/* Login Form */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={6}>
          <Form onSubmit={loginUser}>
            <Form.Group controlId="formEmail" className="mb-3 text-start">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
              required 
              value={data.email}
              onChange={(e) => setData({...data, email: e.target.value})}
              />
            </Form.Group>

            <Form.Group
              controlId="formPassword"
              className="mb-3 text-start position-relative"
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type={showPassword ? "text" : "password"} 
                placeholder="Enter your password"
                required
                value={data.password}
                onChange={(e) => setData({...data, password: e.target.value})}
                style={{ paddingRight: "40px" }} 
              />
              {/* Eye icon to toggle password visibility */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "78%", // Adjust to center vertically
                  cursor: "pointer",
                  transform: "translateY(-70%)", // Center the icon vertically
                }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </Form.Group>
            <Button
              variant="dark"
              type="submit"
              size="lg"
              style={{ width: "100%" }}
            >
              Login
            </Button>
          </Form>
        </Col>
      </Row>

      {/* Forgot Password Message */}
      <Row className="justify-content-center mb-2">
        <Col xs={12} className="text-center">
          <p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
