import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const EditProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [name, setName] = useState(user.name);
  const [address, setAddress] = useState(user.address);
  const [contactNumber, setContactNumber] = useState(user.contactNumber);
  const [profilePicture] = useState(user.profilePicture);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const { data } = await axios.post('/update-profile', {
        userId: user.id, 
        name,
        address,
        contactNumber,
      });
  
      if (data.success) {
        // Update user context with the new data
        setUser((prevUser) => ({
          ...prevUser,
          name,
          address,
          contactNumber,
        }));
  
        toast.success('Profile updated successfully!');
        navigate('/my-profile');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile.');
    }
  };
  

  return (
    <Container>
      <Row className="mt-5">
        <Col md={12} className="text-center">
          <h1>Edit Profile</h1>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={4} className="offset-md-4 text-center">
          <Image
            src={profilePicture || 'https://via.placeholder.com/200x200'}
            roundedCircle
            fluid
          />
          <Form onSubmit={handleSubmit} className="mt-4">
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="contactNumber">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter your contact number"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Confirm
            </Button>{' '}
            <Button as={Link} to="/my-profile" variant="secondary" type="reset" className="mt-3">
              Cancel
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfilePage;
