import React, { useState } from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Accordion,
  Row,
  Col,
  Offcanvas,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../css/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [activeKeys, setActiveKeys] = useState([]); 

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleShowOffcanvas = () => setShowOffcanvas(true);

  const membershipOptions = {
    "One-time Pass": [
      { name: "One-time Pass", price: "$5" },
      { name: "Student Pass", price: "$4" },
      { name: "Sunday Pass", price: "$3" },
      { name: "Couple Pass", price: "$8" },
      { name: "Grouping", price: "$15" },
    ],
    "Multi-Day Pass": [
      { name: "3-Day Pass", price: "$12" },
      { name: "3-Day Student Pass", price: "$10" },
      { name: "7-Day Pass", price: "$30" },
      { name: "7-Day Student Pass", price: "$28" },
    ],
    "Membership Pass": [
      { name: "1 Month Member", price: "$90" },
      { name: "3 Month Member", price: "$230" },
      { name: "6 Month Member", price: "$500" },
      { name: "1 Year Member", price: "$800" },
    ],
    "Student Membership Pass": [
      { name: "1 Month Student Member", price: "$70" },
      { name: "3 Month Student Member", price: "$180" },
      { name: "6 Month Student Member", price: "$400" },
      { name: "1 Year Student Member", price: "$700" },
    ],
  };

  const handleAccordionToggle = (key) => {
    setActiveKeys((prevKeys) => {
      if (prevKeys.includes(key)) {
        return prevKeys.filter((k) => k !== key); 
      } else {
        return [...prevKeys, key]; 
      }
    });
  };

  return (
    <Container fluid className="landing-page">
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="justify-content-between">
        <Navbar.Brand>Memberly.Bn</Navbar.Brand>
        <Button
          variant="link"
          className="offcanvas-button"
          onClick={handleShowOffcanvas}
        >
          <FaBars size={24} />
        </Button>
      </Navbar>

      {/* Offcanvas for mobile menu */}
      <Offcanvas
        show={showOffcanvas}
        onHide={handleCloseOffcanvas}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link
              onClick={() => {
                navigate("/payment");
                handleCloseOffcanvas();
              }}
            >
              Payment
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/attendance");
                handleCloseOffcanvas();
              }}
            >
              Attendance
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/user-dashboard");
                handleCloseOffcanvas();
              }}
            >
              Dashboard
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Header */}
      <Container className="text-center my-4">
        <h1 className="landing-header">Hi, Welcome to Memberly.Bn</h1>
        <p className="landing-message">
          Please select a <strong>membership pass</strong> below.
        </p>
      </Container>

      {/* Membership Options in Accordion */}
      <Container>
        <Row>
          {Object.entries(membershipOptions).map(
            ([passType, options], index) => (
              <Col xs={12} md={6} className="mb-3" key={passType}>
                <Accordion activeKey={activeKeys}>
                  <Accordion.Item eventKey={index.toString()}>
                    <Accordion.Header
                      onClick={() => handleAccordionToggle(index.toString())}
                    >
                      {passType}
                    </Accordion.Header>
                    <Accordion.Body>
                      {options.map((option) => (
                        <div className="membership-option" key={option.name}>
                          <span>{option.name}</span>
                          <span className="price">{option.price}</span>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            )
          )}
        </Row>
      </Container>

      {/* Proceed Button */}
      <Container className="text-center my-4">
        <Row className="d-flex flex-column align-items-center">
          <Col xs={12} className="mb-2">
            <Button
              variant="secondary"
              size="lg"
              className="proceed-button"
              onClick={() => {
                navigate("/user-dashboard");
                window.location.reload();
              }}
            >
              Dashboard
            </Button>
          </Col>
          <Col xs={12}>
            <Button
              variant="primary"
              size="lg"
              className="proceed-button"
              onClick={() => navigate("/payment")}
            >
              Payment
            </Button>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default LandingPage;
