import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import axios from "axios";

const UserProfile = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !email || !phone || !address) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const data = {
        firstName: firstname,
        lastName: lastname,
        email,
        phone,
        address,
      };

      const response = await axios.post(
        "http://localhost:5000/api/users",
        data
      );
      console.log("Profile update response:", response.data);
      setSuccess("Profile updated successfully!");

      // Clear form after successful update
      setFirstname("");
      setLastname("");
      setEmail("");
      setPhone("");
      setAddress("");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(
        err.response?.data?.message ||
          "Failed to update profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError("")}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      <Form onSubmit={handleUpdate}>
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your first name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your last name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone No</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Phone No"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            placeholder="Enter your Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </Button>
      </Form>
    </div>
  );
};

export default UserProfile;
