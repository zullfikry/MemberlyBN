import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Nav, Tab, Tabs, Card, Spinner } from "react-bootstrap";
import { FaBell, FaUserCircle, FaClipboardList } from "react-icons/fa";
import CalendarComponent from "../components/Calendar";
import ActiveSubscriptionCard from "../components/ActiveSubscriptionCard";
import SubscriptionTab from "../components/SubscriptionTab";
import SettingsTab from "../components/SettingsTab";
import { UserContext } from "../context/userContext";
import "../css/UserDashboard.css";
import { useNavigate } from "react-router-dom";

const UserDashboardPage = () => {
  const navigate = useNavigate;
  const handleClick = () => {
    navigate('/notification', { replace: true }); 
  };
  const { user } = useContext(UserContext); 
  const [key, setKey] = useState("dashboard");
  
  // Loading state if user data is not yet available
  if (!user) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container fluid className="user-dashboard-container">
      {/* Navbar */}
      <Navbar bg="light" expand="lg" className="mb-3 navbar-full-width">
        <Navbar.Brand
          as={Link}
          to="/landing"
          className="d-flex align-items-center"
        >
          <span className="dashboard-welcome">Hi, {user?.name || "User"}</span>
        </Navbar.Brand>

        <Nav className="ms-auto d-flex flex-row align-items-center">
          {/* Navbar Icons */}
          <Nav.Link as={Link} to="/attendance" className="px-2">
            <FaClipboardList size={24} /> {/* Attendance Icon */}
          </Nav.Link>
          <Nav.Link as={Link} to="/notification" className="px-2">
            <FaBell size={24} />
          </Nav.Link>
          <Nav.Link as={Link} to="/my-profile" className="px-2" onClick={handleClick}>
            <FaUserCircle size={24} />
          </Nav.Link>
        </Nav>
      </Navbar>

      {/* Dashboard Tabs */}
      <Tabs
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="dashboard-tabs mb-3"
        fill
        justify
      >
        <Tab eventKey="dashboard" title="Dashboard">
          {/* Dashboard Content */}

          {/* Active Subscription Card */}
          <ActiveSubscriptionCard />

          {/* Calendar Component */}
          <Card className="calendar-card">
            <Card.Body>
              <h5 className="text-center">Calendar</h5>
              <CalendarComponent />
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="subscription" title="Subscription">
          <SubscriptionTab />
        </Tab>

        <Tab eventKey="settings" title="Settings">
          <SettingsTab />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default UserDashboardPage;
