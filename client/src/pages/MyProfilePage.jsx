import React, { useContext } from 'react';
import { Container, Button, Row, Col, ListGroup, Image } from 'react-bootstrap';
import { UserContext } from '../context/userContext'; 
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const MyProfilePage = () => {
  const { user } = useContext(UserContext); 
  const navigate = useNavigate();

  return (
    <Container className="mt-5">
      <Row className="align-items-center mb-4">
        <Col xs="auto">
          <Button variant="link" onClick={() => navigate("/user-dashboard") }>
            <FaArrowLeft size={24} />
          </Button>
        </Col>
        <Col>
          <h1 className="text-start" style={{ fontSize: '2.5rem' }}>My Profile</h1>
        </Col>
      </Row>
      
      <Row className="justify-content-center">
        <Col md={{ span: 6 }} className="text-center">
          {/* Profile Picture */}
          <Image
            src={user?.profilePicture || 'https://via.placeholder.com/150'} 
            roundedCircle
            fluid
            style={{ width: '150px', height: '150px' }}
            className="mb-4 mx-auto"
          />
          
          {/* Profile Information List */}
          <ListGroup variant="flush">
            <ListGroup.Item>
              <div>
                <strong>Name:</strong>
                <div>{user?.name || 'N/A'}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div>
                <strong>Email:</strong>
                <div>{user?.email || 'N/A'}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div>
                <strong>Address:</strong>
                <div>{user?.address || 'N/A'}</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item>
              <div>
                <strong>Contact Number:</strong>
                <div>{user?.contactNumber || 'N/A'}</div>
              </div>
            </ListGroup.Item>
          </ListGroup>

          {/* Edit Profile Button */}
          <div className="text-center mt-4">
            <Button as={Link} to="/edit-profile" variant="primary" size="lg">
              Edit Profile
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyProfilePage;
