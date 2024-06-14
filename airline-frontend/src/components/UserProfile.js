import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

const UserProfile = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/users", {
        firstname,
        lastname,
        email,
        phone,
        address,
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>User Profile</h2>
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
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone No</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Phone No"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Profile
        </Button>
      </Form>
    </div>
  );
};

export default UserProfile;
