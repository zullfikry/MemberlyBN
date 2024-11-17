import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import toast from 'react-hot-toast'; 
import { UserContext } from '../context/userContext';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/logo.jpg';
import Card1 from "../assets/Visa.jpg";
import Card2 from "../assets/Mastercard.jpg";
import Card3 from "../assets/PayPal.jpg";
import "../css/PaymentPage.css";

const membershipOptions = {
  "One-time Pass": [
    { name: "One-time Pass", price: 5, duration: 0 },
    { name: "Student Pass", price: 4, duration: 0 },
    { name: "Sunday Pass", price: 3, duration: 0 },
    { name: "Couple Pass", price: 8, duration: 0 },
    { name: "Grouping", price: 15, duration: 0 },
  ],
  "Multi-Day Pass": [
    { name: "3-Day Pass", price: 12, duration: 3 },
    { name: "3-Day Student Pass", price: 10, duration: 3 },
    { name: "7-Day Pass", price: 30, duration: 7 },
    { name: "7-Day Student Pass", price: 28, duration: 7 },
  ],
  "Membership Pass": [
    { name: "1 Month Member", price: 90, duration: 30 },
    { name: "3 Month Member", price: 230, duration: 90 },
    { name: "6 Month Member", price: 500, duration: 180 },
    { name: "1 Year Member", price: 800, duration: 365 },
  ],
  "Student Membership Pass": [
    { name: "1 Month Student Member", price: 70, duration: 30 },
    { name: "3 Month Student Member", price: 180, duration: 90 },
    { name: "6 Month Student Member", price: 400, duration: 180 },
    { name: "1 Year Student Member", price: 700, duration: 365 },
  ],
};

const paymentMethods = [
  { src: Card1, alt: "Visa" },
  { src: Card2, alt: "Mastercard" },
  { src: Card3, alt: "PayPal" },
];

export default function PaymentPage() {
  const [category, setCategory] = useState("");
  const [option, setOption] = useState(null);
  const [total, setTotal] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user already has an active membership
    if (user.isActive) {
      toast.error("You currently already have an active membership.");
      return;
    }

    if (!option) {
      toast.error("Please select a membership option.");
      return;
    }

    try {
      const { data } = await axios.post("/update-subscription", {
        userId: user.id,
        subscriptionType: option.name,
        duration: option.duration,
      });
      toast.success("Subscription updated successfully!");
      setUser(data); 
      navigate('/user-dashboard');
    } catch (err) {
      console.error(err);
      toast.error("Failed to update subscription.");
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setOption(null);
    setTotal(0);
  };

  const handleOptionChange = (opt) => {
    setOption(opt);
    setTotal(opt.price);
  };

  return (
    <Container className="payment-page">
      {/* Back Arrow and Logo */}
      <div className="header">
        <FaArrowLeft
          className="back-arrow"
          onClick={() => navigate("/landing")}
        />
        <div className="logo">
          <img src={logo} alt="Memberly.Bn" />
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="payment-method-section text-center">
        <h2>Payment Method</h2>
        <Row className="justify-content-center">
          {paymentMethods.map((method, index) => (
            <Col xs={4} className="payment-method" key={index}>
              <img
                src={method.src}
                alt={method.alt}
                className="payment-image"
                onClick={() => setSelectedMethod(method.alt)}
              />
            </Col>
          ))}
        </Row>
        {selectedMethod && <p>You have selected {selectedMethod} as your payment method.</p>}
      </div>

      {/* Membership Options Form */}
      <Form onSubmit={handleSubmit}>
        <div>
          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Select a category</option>
              {Object.keys(membershipOptions).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>

        {category && (
          <div>
            <Form.Label>Options</Form.Label>
            {membershipOptions[category].map((opt) => (
              <Form.Check
                type="radio"
                id={opt.name}
                label={`${opt.name} - $${opt.price}`}
                value={opt.name}
                onChange={() => handleOptionChange(opt)}
                checked={option && option.name === opt.name}
              />
            ))}
          </div>
        )}

        {/* Total Section */}
        {option && (
          <div className="total-section mt-4">
            <h4>Total</h4>
            <p className="total-price">${total}</p>
          </div>
        )}

        {/* Card Details Section */}
        <div className="card-details-section mt-4">
          <Row>
            <Col md={6}>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="cardNumber" className="mt-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control type="text" placeholder="Card Number" />
          </Form.Group>
        </div>

        <Button variant="primary" type="submit" className="mt-3">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
