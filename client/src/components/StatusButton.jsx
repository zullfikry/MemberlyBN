// StatusButton.jsx
import React from 'react';
import { Button } from 'react-bootstrap';

const StatusButton = ({ status, onClick }) => {
  return (
    <Button
      variant={status === 'Active' ? 'success' : status === 'Frozen' ? 'dark' : 'secondary'} 
      className="text-uppercase"
      size="sm"
      style={{
        borderRadius: '10px',
        fontWeight: 'bold',
        cursor: 'pointer',
        opacity: 0.8,
      }}
      onClick={onClick}
    >
      {status === 'Frozen' ? 'Frozen' : status} 
    </Button>
  );
};

export default StatusButton;
