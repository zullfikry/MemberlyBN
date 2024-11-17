import React, { useState } from "react";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [stage, setStage] = useState("email");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post("/forgot-password", {
        email,
        stage: "verifyEmail",
      });

      if (response.data.success) {
        toast.success("Email verified successfully!");
        setStage("verify");
      } else {
        toast.error(response.data.message || "Failed to verify email.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while verifying the email.");
    }
  };

  const handleVerify = () => {
    setStage("resetPassword");
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("/forgot-password", {
        email,
        stage: "resetPassword",
        password: newPassword,
      });

      if (response.data.success) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while resetting the password.");
    }
  };

  const handlePinChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < 3) {
      const nextInput = document.getElementById(`pin-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const renderPinInputs = () => (
    <Row className="justify-content-center">
      <Col xs="auto" className="d-flex justify-content-between">
        {pin.map((digit, index) => (
          <Form.Group key={index} controlId={`pin-input-${index}`}>
            <Form.Control
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handlePinChange(index, e.target.value)}
              style={{
                textAlign: "center",
                height: "50px",
                width: "50px",
                fontSize: "1.5rem",
                borderRadius: "5px",
                border: "2px solid #6c757d",
                margin: "0 10px",
              }}
            />
          </Form.Group>
        ))}
      </Col>
    </Row>
  );

  const renderSection = (content, sectionName) => (
    <div
      className={`w-50 mt-4 p-4 border ${
        stage !== sectionName && "bg-light text-muted"
      }`}
      style={{
        cursor: stage !== sectionName ? "pointer" : "default",
        opacity: stage !== sectionName ? 0.7 : 1,
        transition: "opacity 0.3s",
      }}
      onClick={() => stage !== sectionName && setStage(sectionName)}
    >
      {content}
    </div>
  );

  return (
    <Container className="d-flex flex-column align-items-center mt-4">
      <Row className="w-100 align-items-center">
        <Col xs="auto">
          <Button variant="link" onClick={() => navigate(-1)}>
            <FaArrowLeft size={20} />
          </Button>
        </Col>
        <Col>
          <h1 className="text-start" style={{ fontSize: "1.5rem" }}>
            Forgot Your Password?
          </h1>
        </Col>
      </Row>

      {/* Email Section */}
      {renderSection(
        <>
          <p className="text-center">
            Provide the email address associated with your account to recover
            your password.
          </p>
          <Form>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {emailError && (
                <Alert variant="danger" className="mt-2">
                  {emailError}
                </Alert>
              )}
            </Form.Group>
            <Button
              variant="primary"
              className="mt-3 w-100"
              onClick={handleEmailSubmit}
            >
              Confirm
            </Button>
          </Form>
        </>,
        "email"
      )}

      {/* Verify PIN Section */}
      {stage === "verify" &&
        renderSection(
          <>
            <h4 className="text-center">Verify Your Account</h4>
            <p className="text-center">
              Enter the 4-digit PIN code sent to your email.
            </p>
            {renderPinInputs()}
            <Button
              variant="primary"
              onClick={handleVerify}
              className="mt-3 w-100"
            >
              Verify
            </Button>
            <p className="text-center mt-2">
              <Link to="#">Request new code</Link>
            </p>
          </>,
          "verify"
        )}

      {/* Reset Password Section */}
      {stage === "resetPassword" &&
        renderSection(
          <>
            <h4 className="text-center">Reset Password</h4>
            <Form>
              <Form.Group controlId="formNewPassword">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formConfirmPassword" className="mt-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Form.Group>
              {passwordError && (
                <Alert variant="danger" className="mt-2">
                  {passwordError}
                </Alert>
              )}
              <Button
                variant="primary"
                onClick={handlePasswordReset}
                className="mt-3 w-100"
              >
                Reset Password
              </Button>
            </Form>
          </>,
          "resetPassword"
        )}
    </Container>
  );
};

export default ForgotPasswordPage;
