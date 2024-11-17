import React from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

const HomePage = () => {
  return (
    <Container className="text-center mt-5">
      {/* Image */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} className="d-flex justify-content-center">
          <img
            src={logo} 
            alt="Welcome"
            style={{ width: '33.33%', height: 'auto' }} 
          />
        </Col>
      </Row>

      {/* Welcome Message */}
      <Row className="justify-content-center mb-4">
        <Col xs="auto">
          <h1 style={{ fontSize: '3rem' }}>Welcome to memberly.bn</h1> 
        </Col>
      </Row>

      {/* Description Box */}
      <Row className="justify-content-center mb-4">
        <Col xs={12} md={8} className="bg-light p-4 rounded">
          <p style={{ fontSize: '1.2rem' }}>
            This is a platform for members to connect, share, and grow together. Join us today and be part of our community!
          </p>
        </Col>
      </Row>

      {/* Spacer to push buttons towards the bottom */}
      <Row className="flex-grow-1"></Row>

      {/* Buttons */}
      <Row className="justify-content-center mb-5">
        <Col xs={12} md={6} className="mb-3">
          <Button variant="dark" size="lg" style={{ width: '100%' }} as={Link} to="/login">
            Login
          </Button>
        </Col>
        <Col xs={12} md={6}>
          <Button variant="secondary" size="lg" style={{ width: '100%' }} as={Link} to="/signup" >
            Sign Up 
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;