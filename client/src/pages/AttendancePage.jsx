import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext'; 
import { useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; 

const AttendancePage = () => {
  const { user, setUser } = useContext(UserContext); 
  const [generatedCode, setGeneratedCode] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState(null);
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString());
  const navigate = useNavigate();

  // Calculate remaining time until expiration
  useEffect(() => {
    if (user?.keyPass && user?.expirationDate) {
      const expirationTime = new Date(user.expirationDate).getTime();
      const interval = setInterval(() => {
        const remaining = expirationTime - new Date().getTime();
        if (remaining <= 0) {
          clearInterval(interval);
          setUser((prevUser) => ({ ...prevUser, keyPass: '', expirationDate: null }));
        } else {
          setTimeRemaining(formatTimeRemaining(remaining));
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [user?.keyPass, user?.expirationDate, setUser]);

  const handleGenerateCode = () => {
    // Generate a random six-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(code);
  };

  const handleConfirmCode = async (e) => {
    e.preventDefault(); 
    
    // Validate the key pass
    if (!generatedCode) {
      alert("Please generate a key pass first.");
      return;
    }
  
    // Calculate the key duration (in days)
    const expirationDate = new Date(user.expirationDate);
    const startDateObj = new Date(startDate);
    const keyDuration = Math.ceil((expirationDate - startDateObj) / (1000 * 60 * 60 * 24));
  
    try {
      // Send the request to the backend to update the key pass and key duration
      const { data } = await axios.post('/update-key-pass', {
        userId: user.id,
        keyPass: generatedCode,
        keyDuration,
      });
  
      // Success: Update the user context and navigate
      toast.success("Key pass updated successfully!");
      setUser(data); 
  
      navigate('/user-dashboard'); 
  
      setGeneratedCode(null); 
  
    } catch (error) {
      console.error('Error updating key pass:', error);
      toast.error("Failed to update key pass.");
    }
  };
  
  

  const formatTimeRemaining = (ms) => {
    const months = Math.floor(ms / (1000 * 60 * 60 * 24 * 30.44)); 
    const days = Math.floor((ms % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return `${months}m ${days}d ${hours}h ${minutes}m ${seconds}s remaining`;
  };

  if (!user?.expirationDate) {
    return (
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ height: '80vh' }}>
        <h1 className="text-center" style={{ fontSize: '2.5rem', color: '#6c757d' }}>
          You currently don't have an active subscription
        </h1>
        <p className="text-center mt-3" style={{ fontSize: '1.25rem', color: '#6c757d' }}>
          You can return to the <a href="/landing" style={{ textDecoration: 'underline' }}>main page</a> or renew your subscription below.
        </p>
        <Button 
          variant="primary" 
          onClick={() => navigate('/payment')} 
          className="mt-4"
          style={{ fontSize: '1.25rem' }}
        >
          Payment
        </Button>
      </Container>
    );
  }

  return (
    <Container className="d-flex flex-column align-items-center mt-5">
      {/* Back Arrow and Attendance Header */}
      <Row className="align-items-center mb-4 w-100">
        <Col xs="auto" className="me-auto">
          <Button variant="link" onClick={() => navigate(-1)}>
            <FaArrowLeft size={20} />
          </Button>
        </Col>
        <Col>
          <h1 className="text-start" style={{ fontSize: '2.5rem' }}>Attendance</h1>
        </Col>
      </Row>

      {/* Display keyPass message or Generate Password section */}
      {user.keyPass && user.expirationDate ? (
        <div
          className="d-flex flex-column justify-content-center align-items-center"
          style={{ height: '80vh', textAlign: 'center' }}
        >
          <h2 style={{ fontSize: '2.5rem' }}>
            Your current password is: <strong>{user.keyPass}</strong>
          </h2>
          <p className="mt-3" style={{ fontSize: '2rem' }}>
            Valid from {startDate} to {new Date(user.expirationDate).toLocaleDateString()}.
            The time remaining is <strong>{timeRemaining}</strong>.
          </p>
        </div>
      ) : (
        <div className="text-center w-50">
          {/* Start Date and Expiration Date fields */}
          <Form className="w-100 mb-3">
            <Form.Group controlId="startDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="text" value={startDate} readOnly />
            </Form.Group>
            <Form.Group controlId="endDate">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="text"
                value={new Date(user.expirationDate).toLocaleDateString()}
                readOnly
              />
            </Form.Group>
          </Form>

          {/* Generate Password and Confirm Button */}
          <Button
            variant="primary"
            onClick={handleGenerateCode}
            style={{ marginBottom: '20px' }}
          >
            Generate Password
          </Button>

          {/* Generated Code Section */}
          {generatedCode && (
            <>
              <Row className="justify-content-center mt-4">
                <Col xs={12} md={6} className="d-flex justify-content-center">
                  {[...generatedCode].map((digit, index) => (
                    <Form.Group
                      key={index}
                      controlId={`generated-code-${index}`}
                      className="mb-3"
                      style={{ flex: 1 }}
                    >
                      <Form.Control
                        type="text"
                        maxLength={1}
                        value={digit}
                        readOnly
                        style={{
                          textAlign: 'center',
                          height: '60px',
                          width: '60px',
                          fontSize: '1.5rem',
                          border: '2px solid #6c757d',
                          borderRadius: '8px',
                          margin: '0 5px',
                        }}
                      />
                    </Form.Group>
                  ))}
                </Col>
              </Row>

              {/* Confirm Button */}
              <Button
                variant="secondary"
                onClick={handleConfirmCode}
                style={{ marginTop: '20px' }}
              >
                Confirm
              </Button>
            </>
          )}
        </div>
      )}
    </Container>
  );
};

export default AttendancePage;
