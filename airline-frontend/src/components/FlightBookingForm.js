import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const FlightBookingForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { flight } = location.state;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleBooking = async (e) => {
    e.preventDefault();
    const bookingData = {
      flightId: flight._id,
      firstName,
      lastName,
      email,
      phone,
      address,
    };

    try {
      const response = await axios.post("/api/bookings", bookingData);
      navigate("/confirmation", { state: { booking: response.data } });
    } catch (error) {
      console.error("Error booking flight:", error);
    }
  };

  return (
    <div>
      <h2>Book Flight</h2>
      <Form onSubmit={handleBooking}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Confirm Booking
        </Button>
      </Form>
    </div>
  );
};

export default FlightBookingForm;
