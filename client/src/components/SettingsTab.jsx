import React, { useContext } from 'react';
import { ListGroup } from 'react-bootstrap';
import { FaUserCircle, FaBell, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';
import toast from 'react-hot-toast';

const SettingsTab = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  // Handle sign out
  const handleSignOut = async (e) => {
    e.preventDefault(); 
    try {
      await axios.post('/logout'); 
      setUser(null); 
      toast.success('Logged out successfully');
      navigate('/login');
      window.location.reload()
    } catch (error) {
      console.error('Logout failed:', error);
      toast.error('Failed to log out');
    }
  };

  return (
    <ListGroup>
      <ListGroup.Item action variant="light" className="d-flex align-items-center">
        <span className="me-auto">Account</span>
      </ListGroup.Item>
      <ListGroup.Item
        as={Link}
        to="/my-profile"
        action
        variant="light"
        className="d-flex align-items-center"
      >
        <FaUserCircle className="me-2" />
        <span className="me-auto">Account Settings</span>
        <FaChevronRight />
      </ListGroup.Item>
      <ListGroup.Item
        as={Link}
        to="/notification"
        action
        variant="light"
        className="d-flex align-items-center"
      >
        <FaBell className="me-2" />
        <span className="me-auto">Notifications</span>
        <FaChevronRight />
      </ListGroup.Item>
      <ListGroup.Item
        action
        variant="light"
        className="d-flex align-items-center"
        onClick={handleSignOut} 
      >
        <FaSignOutAlt className="me-2" />
        <span className="me-auto">Sign Out</span>
        <FaChevronRight />
      </ListGroup.Item>
    </ListGroup>
  );
};

export default SettingsTab;
