import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const airports = [
  { value: "BLR", label: "Bengaluru, Karnataka" },
  { value: "DEL", label: "New Delhi, NCT" },
  { value: "CCU", label: "Kolkata, West Bengal" },
  { value: "TRV", label: "Trivandrum, Kerala" },
  { value: "BOM", label: "Mumbai, Maharashtra" },
  { value: "HYD", label: "Hyderabad, Telangana" },
  { value: "MAA", label: "Chennai, Tamil Nadu" },
  { value: "IXR", label: "Ranchi, Jharkhand" },
  { value: "GAU", label: "Guwahati, Assam" },
  { value: "JAI", label: "Jaipur, Rajasthan" },
  { value: "LKO", label: "Lucknow, UP" },
  { value: "COK", label: "Kochi, Kerala" },
];

const Home = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "http://localhost:3000/api/flightRoutes",
        {
          params: { origin, destination, departure },
        }
      );
      setFlights(response.data);
    } catch (error) {
      console.error("Error searching flights:", error);
    }
  };

  const handleBook = (flight) => {
    navigate("/book-flight", { state: { flight } });
  };

  return (
    <div>
      <h2>Search Flights</h2>
      <Form onSubmit={handleSearch}>
        <Form.Group>
          <Form.Label>From</Form.Label>
          <Select
            options={airports}
            value={airports.find((airport) => airport.value === origin)}
            onChange={(selectedOption) => setOrigin(selectedOption.value)}
            placeholder="Origin"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>To</Form.Label>
          <Select
            options={airports}
            value={airports.find((airport) => airport.value === destination)}
            onChange={(selectedOption) => setDestination(selectedOption.value)}
            placeholder="Destination"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Departure Date</Form.Label>
          <Form.Control
            type="date"
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Adults</Form.Label>
          <div>
            <Button
              variant="outline-primary"
              onClick={() => setAdults(adults + 1)}
            >
              +
            </Button>
            <span>{adults}</span>
            <Button
              variant="outline-primary"
              onClick={() => setAdults(adults > 1 ? adults - 1 : 1)}
            >
              -
            </Button>
          </div>
        </Form.Group>
        <Form.Group>
          <Form.Label>Children</Form.Label>
          <div>
            <Button
              variant="outline-primary"
              onClick={() => setChildren(children + 1)}
            >
              +
            </Button>
            <span>{children}</span>
            <Button
              variant="outline-primary"
              onClick={() => setChildren(children > 0 ? children - 1 : 0)}
            >
              -
            </Button>
          </div>
        </Form.Group>
        <Button variant="primary" type="submit">
          Search Flights
        </Button>
      </Form>
      <h3 className="mt-4">Available Flights</h3>
      {flights.length > 0 ? (
        flights.map((flight) => (
          <Card key={flight._id} className="mb-3">
            <Card.Body>
              <Card.Title>{flight.airline}</Card.Title>
              <Card.Text>
                Flight Number: {flight.flightNumber}
                <br />
                Departure: {flight.departure}
                <br />
                Arrival: {flight.arrival}
                <br />
                Departure Time:{" "}
                {new Date(flight.departureTime).toLocaleString()}
                <br />
                Arrival Time: {new Date(flight.arrivalTime).toLocaleString()}
                <br />
                Price: ${flight.price}
              </Card.Text>
              <Button variant="success" onClick={() => handleBook(flight)}>
                Book Flight
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p>No flights found.</p>
      )}
    </div>
  );
};

export default Home;
