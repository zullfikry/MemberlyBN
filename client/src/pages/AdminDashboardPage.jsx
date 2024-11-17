import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Table,
  Button,
  Card,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { UserContext } from "../context/userContext";

const AdminDashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();
  const { user, loading } = useContext(UserContext);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      console.log("No user logged in, redirecting to login...");
      toast.error("You must be logged in to access the admin dashboard.");
      navigate("/login");
      return;
    }

    console.log("User data:", user);

    if (!user.isAdmin) {
      console.log("Non-admin user detected, logging out...");
      toast.error("You do not have admin privileges. Logging out...");
      axios
        .post("/logout")
        .then(() => {
          navigate("/login");
          window.location.reload();
        })
        .catch((error) => {
          console.error("Logout failed:", error);
          toast.error("Failed to log out");
        });
    } else {
      console.log("Fetching users for admin...");

      const fetchUsers = async () => {
        try {
          const { data } = await axios.get("/admin/users");
          setUsers(data);
        } catch (error) {
          toast.error("Failed to fetch users");
          if (error.response?.status === 403) navigate("/login");
        }
      };

      fetchUsers();
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    try {
      await axios.post("/logout");
      toast.success("Logged out successfully");
      navigate("/login");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Failed to log out");
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      await axios.delete(`/admin/users/${userToDelete}`);
      toast.success("User deleted successfully");
      setUsers((prevUsers) => prevUsers.filter((u) => u._id !== userToDelete));
      setShowDeleteModal(false);
      setUserToDelete(null);
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast.error("Failed to delete user");
    }
  };

  const openDeleteModal = (userId) => {
    setUserToDelete(userId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Container fluid>
      <Row className="my-4">
        <Col>
          <Card>
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h3>Admin Dashboard</h3>
              <Button variant="outline-light" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </Card.Header>
            <Card.Body>
              <h5 className="mb-4">Users List</h5>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subscription Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.subscriptionType || "None"}</td>
                      <td>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="me-2" // Bootstrap class for right margin
                          onClick={() => navigate(`/user/${user._id}`)}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => openDeleteModal(user._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user? This action cannot be
          undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboardPage;
