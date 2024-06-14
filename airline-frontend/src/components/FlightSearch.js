import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "axios";

const FlightSearch = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/api/flights", {
        params: { origin, destination, departure, returnDate },
      });
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Search Flights</h2>
      <Form onSubmit={handleSearch}>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>From</Form.Label>
            <Form.Control
              type="text"
              placeholder="City or Airport"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>To</Form.Label>
            <Form.Control
              type="text"
              placeholder="City or Airport"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group as={Col}>
            <Form.Label>Departure Date</Form.Label>
            <Form.Control
              type="date"
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Return Date</Form.Label>
            <Form.Control
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </Form.Group>
        </Form.Row>
        <Button variant="primary" type="submit">
          Search Flights
        </Button>
      </Form>
    </div>
  );
};

export default FlightSearch;
