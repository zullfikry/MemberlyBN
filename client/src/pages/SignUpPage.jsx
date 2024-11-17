import React, { useState } from "react";
import { Container, Button, Row, Col, Form, InputGroup } from 'react-bootstrap';
import { FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    dateOfBirth: Date,
    email: '',
    password: '',
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, dateOfBirth, password } = data;

    try {
      const response = await axios.post('/register', {
        name, email, dateOfBirth, password
      });

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          name: '',
          dateOfBirth: Date,
          email: '',
          password: '',
        }); 
        toast.success('Registration Successful. Welcome!');
        navigate('/login'); 
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred while registering.');
    }
  };

  const [showPassword, setShowPassword] = useState(false); 

  return (
    <Container className="d-flex flex-column justify-content-between" style={{ minHeight: "100vh" }}>
      {/* Back Arrow and Create an Account Header */}
      <Row className="align-items-center mb-0 mt-4">
        <Col xs="auto">
          <Button variant="link" as={Link} to="/">
            <FaArrowLeft size={20} />
          </Button>
        </Col>
        <Col>
          <h1 className="text-start" style={{ fontSize: "2.5rem" }}>
            Create an Account
          </h1>
        </Col>
      </Row>

      {/* Message below the Header */}
      <Row className="justify-content-center mb-0">
        <Col xs={12} className="text-center">
          <p>
            Enter your account details below or{" "}
            <Link to="/login">
              <strong>sign in</strong>
            </Link>
            .
          </p>
        </Col>
      </Row>

      {/* Sign Up Form */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={6}>
          <Form onSubmit={registerUser}>
            <Form.Group controlId="formUsername" className="mb-3 text-start">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                name="name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDOB" className="mb-3 text-start">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dateOfBirth"
                value={data.dateOfBirth}
                onChange={(e) => setData({ ...data, dateOfBirth: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3 text-start">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3 text-start">
              <Form.Label>Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"} 
                  placeholder="Enter your password"
                  name="password"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                  required
                />
                <InputGroup.Text style={{ cursor: "pointer" }} onClick={() => setShowPassword((prev) => !prev)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                  {/* Show/hide icon */}
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            {/* Sign Up Button */}
            <Row className="justify-content-center mt-4">
              <Col xs={12} md={6}>
                <Button
                  variant="secondary"
                  type="submit"
                  size="lg"
                  style={{ width: "100%" }}
                >
                  Sign Up
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      {/* Forgot Password Message */}
      <Row className="justify-content-center mb-1">
        <Col xs={12} className="text-center">
          <p>
            <Link to="/forgot-password">Forgot Password?</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}
