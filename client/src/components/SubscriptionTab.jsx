import React, {useContext} from 'react';
import { Table } from 'react-bootstrap';
import { UserContext } from '../context/userContext'; 

const formatDate = (date) => {
  const options = { year: '2-digit', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  return formattedDate;
};

const SubscriptionTab = () => {
  const { user } = useContext(UserContext); 

  return (
    <Table striped hover className="mt-4 border-0"> 
      <thead style={{ backgroundColor: '#007bff', color: '#ffffff' }}>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>DOB</th>
          <th>Membership Type</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {/* Render user data */}
        <tr>
          <td>1</td>
          <td>{user.name || 'N/A'}</td>
          <td>{user.dateOfBirth ? formatDate(user.dateOfBirth) : 'N/A'}</td> 
          <td>{user.subscriptionType || 'N/A'}</td>
          <td>{user.isActive ? 'Active' : 'Inactive'}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default SubscriptionTab;

