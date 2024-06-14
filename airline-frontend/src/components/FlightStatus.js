import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

const FlightStatus = () => {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get("/api/flights");
        setFlights(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div>
      <h2>Real-time Flight Information</h2>
      {flights.map((flight, index) => (
        <Card key={index} className="mb-3">
          <Card.Body>
            <Card.Title>Flight {flight.flightNumber}</Card.Title>
            <Card.Text>
              Departure: {flight.origin} -{" "}
              {new Date(flight.departureTime).toLocaleString()}
            </Card.Text>
            <Card.Text>
              Arrival: {flight.destination} -{" "}
              {new Date(flight.arrivalTime).toLocaleString()}
            </Card.Text>
            <Card.Text>
              <small className="text-muted">Status: {flight.status}</small>
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default FlightStatus;
