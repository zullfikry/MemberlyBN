import React, { useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext"; 
import axios from "axios";
import { toast } from "react-hot-toast"; 
import "../css/NotificationPage.css";

const NotificationPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext); 

  // Update notification settings in user context
  const handleSwitchChange = async (event) => {
    const { checked } = event.target;
  
    try {
      // Send patch request to update badge notification
      await axios.patch("/update-notifications", {
        userId: user.id,
        notificationType: "notifications",
        notificationKey: "badge",
        value: checked, 
      });
  
      // Immediately update the user context with the new notification value
      setUser((prevUser) => ({
        ...prevUser,
        notifications: {
          ...prevUser.notifications,
          badge: checked,
        },
      }));
  
      toast.success("Notification settings updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error updating notification settings.");
    }
  };

  const handleCheckboxChange = async (event) => {
    const { id, checked } = event.target;
    const [type, notification] = id.split("-"); 
  
    try {
      // Send patch request to update specific notification
      await axios.patch("/update-notifications", {
        userId: user.id,
        notificationType: type,
        notificationKey: notification,
        value: checked,
      });
  
      // Immediately update the user context with the new notification value
      setUser((prevUser) => ({
        ...prevUser,
        notifications: {
          ...prevUser.notifications,
          [type]: {
            ...prevUser.notifications[type],
            [notification]: checked,
          },
        },
      }));
  
      toast.success("Notification settings updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Error updating notification settings.");
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login"); 
    }
  }, [user, navigate]);

  if (!user) {
    return <div>Loading...</div>; 
  }

  return (
    <Container className="notification-container">
      {/* Back Arrow and Header */}
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <Button variant="link" onClick={() => navigate(-1)}>
            <FaArrowLeft size={20} />
          </Button>
        </Col>
        <Col>
          <h1 className="notification-header">Notification</h1>
        </Col>
      </Row>

      {/* Notification Badge Section */}
      <Row className="notification-row">
        <Col xs={8}>
          <h3><strong>Notification Badge</strong></h3>
          <p>Display a badge with the number of unread notifications</p>
        </Col>
        <Col xs={4} className="notification-switch">
          <Form.Check
            type="switch"
            id="notification-badge-switch"
            checked={user.notifications.badge}
            onChange={handleSwitchChange}
          />
        </Col>
      </Row>

      {/* Push Notification Section */}
      <Row className="notification-row">
        <Col xs={12}>
          <h5><strong>Push Notification</strong></h5>
        </Col>
      </Row>
      <Row className="notification-row">
        <Col xs={8}>
          <p>Subscription Expiration</p>
        </Col>
        <Col xs={4} className="notification-checkbox">
          <Form.Check
            type="checkbox"
            id="push-expiration"
            checked={user.notifications.push.expiration}
            onChange={handleCheckboxChange}
          />
        </Col>
      </Row>
      <Row className="notification-row">
        <Col xs={8}>
          <p>Subscription Renewal</p>
        </Col>
        <Col xs={4} className="notification-checkbox">
          <Form.Check
            type="checkbox"
            id="push-renewal"
            checked={user.notifications.push.renewal}
            onChange={handleCheckboxChange}
          />
        </Col>
      </Row>

      {/* Email Notification Section */}
      <Row className="notification-row">
        <Col xs={12}>
          <h5><strong>Email Notification</strong></h5>
        </Col>
      </Row>
      <Row className="notification-row">
        <Col xs={8}>
          <p>Subscription Expiration</p>
        </Col>
        <Col xs={4} className="notification-checkbox">
          <Form.Check
            type="checkbox"
            id="email-expiration"
            checked={user.notifications.email.expiration}
            onChange={handleCheckboxChange}
          />
        </Col>
      </Row>
      <Row className="notification-row">
        <Col xs={8}>
          <p>Subscription Renewal</p>
        </Col>
        <Col xs={4} className="notification-checkbox">
          <Form.Check
            type="checkbox"
            id="email-renewal"
            checked={user.notifications.email.renewal}
            onChange={handleCheckboxChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default NotificationPage;
