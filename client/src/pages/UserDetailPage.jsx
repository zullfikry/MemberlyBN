import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import '../css/UserDetailPage.css';

const UserDetailPage = () => {
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    contactNumber: '',
    dateOfBirth: '',
    subscriptionType: '',
    keyPass: '',
    keyDuration: '',
    isActive: false,
    hasFrozen: false,
    freezeDuration: 0,
    expirationDate: null,
  });

  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const navigate = useNavigate();

  // Fetch user details by userId when component mounts
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const { data } = await axios.get(`/admin/users/${userId}`);
        setUserDetails(data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch user details');
        navigate('/admin-dashboard');
      }
    };

    fetchUserDetails();
  }, [userId, navigate]);

  // Handle the form submission to update user details
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUserDetails = {};
    Object.keys(userDetails).forEach((key) => {
      if (userDetails[key] !== '') {
        updatedUserDetails[key] = userDetails[key];
      }
    });

    try {
      const { data } = await axios.patch(`/admin/users/${userId}`, updatedUserDetails);
      toast.success('User details updated successfully!');
      navigate('/admin-dashboard');
    } catch (error) {
      toast.error('Failed to update user details');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid>
      <Row className="my-4">
        <Col md={8} lg={6} className="mx-auto">
          <Card>
            <Card.Header className="bg-primary text-white">
              <h3>Edit User Details</h3>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter user's name"
                        value={userDetails.name}
                        onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="address">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter user's address"
                        value={userDetails.address}
                        onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="contactNumber">
                      <Form.Label>Contact Number</Form.Label>
                      <Form.Control
                        type="tel"
                        placeholder="Enter user's contact number"
                        value={userDetails.contactNumber}
                        onChange={(e) => setUserDetails({ ...userDetails, contactNumber: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="subscriptionType">
                      <Form.Label>Subscription Type</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter subscription type"
                        value={userDetails.subscriptionType}
                        onChange={(e) => setUserDetails({ ...userDetails, subscriptionType: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="keyPass">
                      <Form.Label>Key Pass</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter key pass"
                        value={userDetails.keyPass}
                        onChange={(e) => setUserDetails({ ...userDetails, keyPass: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="keyDuration">
                      <Form.Label>Key Duration</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter key duration"
                        value={userDetails.keyDuration}
                        onChange={(e) => setUserDetails({ ...userDetails, keyDuration: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="isActive">
                      <Form.Check
                        type="checkbox"
                        label="Active"
                        checked={userDetails.isActive}
                        onChange={(e) => setUserDetails({ ...userDetails, isActive: e.target.checked })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="hasFrozen">
                      <Form.Check
                        type="checkbox"
                        label="Frozen"
                        checked={userDetails.hasFrozen}
                        onChange={(e) => setUserDetails({ ...userDetails, hasFrozen: e.target.checked })}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group controlId="freezeDuration">
                      <Form.Label>Freeze Duration</Form.Label>
                      <Form.Control
                        type="number"
                        value={userDetails.freezeDuration}
                        onChange={(e) => setUserDetails({ ...userDetails, freezeDuration: e.target.value })}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group controlId="expirationDate">
                      <Form.Label>Expiration Date</Form.Label>
                      <Form.Control
                        type="text"
                        value={userDetails.expirationDate}
                        readOnly
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-between mt-4">
                  <Button variant="primary" type="submit">Update User</Button>
                  <Button variant="secondary" onClick={() => navigate('/admin-dashboard')}>Cancel</Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetailPage;
