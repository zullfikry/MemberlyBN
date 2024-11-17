import React, { useState, useContext } from "react";
import { Card, Table, Modal, Button, Form } from "react-bootstrap";
import StatusButton from "../components/StatusButton";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { toast } from "react-hot-toast";  
import "../css/ActiveSubscriptionCard.css";

const ActiveSubscriptionCard = () => {
  const { user, setUser } = useContext(UserContext); 

  if (!user) {
    return <div>Loading...</div>;
  }

  const [isFrozen, setIsFrozen] = useState(user.hasFrozen || false); 
  const [showFreezeModal, setShowFreezeModal] = useState(false);
  const [freezeDuration, setFreezeDuration] = useState(0);

  // Handle showing the freeze modal
  const handleStatusClick = () => {
    if (!isFrozen && !user.hasFrozen) {
      setShowFreezeModal(true);
    } else {
      toast.error("You have already used your freeze option for this membership.");
    }
  };

  // Function to update freeze status on the backend
  const updateFreezeStatus = async (newExpirationDate, freezeDuration) => {
    try {
      // Send the request to the backend
      const { data } = await axios.post("/update-freeze-status", {
        userId: user.id,
        expirationDate: newExpirationDate,
        hasFrozen: true,
        freezeDuration,
      });
  
      toast.success("Account frozen successfully!");
      setUser(data);  

    } catch (error) {
      console.error(error);
      toast.error("Error updating freeze status.");
    }
  };
  
  // Handle freezing the account
  const handleConfirmFreeze = () => {
    if (freezeDuration > 0) {
      const newExpirationDate = new Date(user.expirationDate);
      newExpirationDate.setDate(newExpirationDate.getDate() + freezeDuration);

      // Update the user context and backend
      setUser({
        ...user,
        expirationDate: newExpirationDate.toISOString(),
        hasFrozen: true, 
      });

      updateFreezeStatus(newExpirationDate.toISOString(), freezeDuration); 

      setIsFrozen(true); 
      setShowFreezeModal(false);
    } else {
      alert("Please select a valid freeze duration.");
    }
  };

  // Subscription information
  const subscriptions = user.subscriptionType
    ? [
        {
          type: user.subscriptionType,
          expiration: user.expirationDate,
          status: user.isActive ? (isFrozen ? "Frozen" : "Active") : "Inactive",
        },
      ]
    : [];

  return (
    <div className="card-container">
      <Card className="mb-4 card-background">
        <Card.Body>
          <Card.Title>Active Subscription</Card.Title>
          <Table className="card-table" responsive>
            <thead>
              <tr>
                <th>Type</th>
                <th>Expiration</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.length > 0 ? (
                subscriptions.map((subscription, index) => (
                  <tr key={index}>
                    <td>{subscription.type}</td>
                    <td>
                      {subscription.expiration
                        ? new Date(subscription.expiration).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td>
                      <StatusButton
                        status={subscription.status}
                        onClick={handleStatusClick} 
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center">
                    No active subscriptions
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Freeze Account Modal */}
      <Modal show={showFreezeModal} onHide={() => setShowFreezeModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Freeze Account</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="freezeDuration">
              <Form.Label>Select freeze duration (in days)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                placeholder="Enter days to freeze"
                value={freezeDuration}
                onChange={(e) => setFreezeDuration(parseInt(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFreezeModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmFreeze}>
            Confirm Freeze
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ActiveSubscriptionCard;
