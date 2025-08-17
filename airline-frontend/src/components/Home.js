import React, { useState } from "react";
import { Form, Button, Card, Alert, Row, Col, Badge } from "react-bootstrap";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

const customStyles = {
  control: (provided) => ({
    ...provided,
    color: "black",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
  menu: (provided) => ({
    ...provided,
    color: "black",
  }),
  option: (provided, state) => ({
    ...provided,
    color: "black",
    backgroundColor: state.isSelected ? "#e6e6e6" : "#fff",
  }),
};

const Home = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [tripType, setTripType] = useState("oneWay");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!origin || !destination || !departure) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = {
        origin,
        destination,
        departure,
        returnDate: tripType === "roundTrip" ? returnDate : null,
        tripType,
        adults,
        children,
      };

      const response = await axios.post(
        "http://localhost:5000/api/flightRoutes",
        data
      );

      setFlights(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to search flights. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <Card className="p-4 rounded-4 shadow-lg flight-search-card">
        <h5 className="mb-4 fw-bold text-primary">✈️ Book a flight</h5>

        <div className="mb-3 d-flex gap-4 justify-content-start">
          <Form.Check
            inline
            label="One Way"
            name="tripType"
            type="radio"
            id="trip-oneway"
            checked={tripType === "oneWay"}
            onChange={() => setTripType("oneWay")}
          />
          <Form.Check
            inline
            label="Round Trip"
            name="tripType"
            type="radio"
            id="trip-roundtrip"
            checked={tripType === "roundTrip"}
            onChange={() => setTripType("roundTrip")}
          />
        </div>

        <Form onSubmit={handleSearch}>
          <Row className="gy-3">
            <Col md={6}>
              <Form.Label>From</Form.Label>
              <Select
                options={airports}
                value={airports.find((a) => a.value === origin)}
                onChange={(opt) => setOrigin(opt.value)}
                placeholder="Departure city"
                styles={customStyles}
              />
            </Col>

            <Col md={6}>
              <Form.Label>To</Form.Label>
              <Select
                options={airports}
                value={airports.find((a) => a.value === destination)}
                onChange={(opt) => setDestination(opt.value)}
                placeholder="Arrival city"
                styles={customStyles}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Departure Date</Form.Label>
              <Form.Control
                type="date"
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                required
              />
            </Col>

            <Col md={6}>
              <Form.Label>Return Date</Form.Label>
              <Form.Control
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                disabled={tripType !== "roundTrip"}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Adults</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
              />
            </Col>

            <Col md={6}>
              <Form.Label>Children</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
              />
            </Col>

            <Col md={12}>
              <Form.Label>Promo Code</Form.Label>
              <Form.Control placeholder="Enter promo code (optional)" />
            </Col>
          </Row>

          {error && (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          )}

          <div className="d-flex justify-content-end mt-4">
            <Button
              type="submit"
              size="lg"
              variant="primary"
              disabled={loading}
            >
              {loading ? "🔍 Searching..." : "🔍 Search Flights"}
            </Button>
          </div>
        </Form>
      </Card>

      {/* Flight Results Section */}
      {flights.length > 0 && (
        <div className="mt-5">
          <h4 className="mb-4 text-primary fw-bold fs-3">
            ✈️ Available Flights ({flights.length})
          </h4>
          <div className="row g-4">
            {flights.map((flight, index) => (
              <div key={flight._id || index} className="col-12">
                <Card className="mb-4 p-3 shadow-sm rounded-4">
                  <Row className="align-items-center">
                    <Col md={3} className="text-center">
                      <h5 className="text-primary mb-1">{flight.airline}</h5>
                      <div className="text-secondary">
                        {flight.flightNumber}
                      </div>
                      <small className="text-secondary">{flight.status}</small>
                    </Col>

                    <Col md={3} className="text-center">
                      <div className="fw-bold text-primary">
                        {flight.departure}
                      </div>
                      <div className="text-secondary">Departure</div>
                      <div className="text-dark">
                        {new Date(flight.departureTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="text-secondary">
                        {new Date(flight.departureTime).toLocaleDateString()}
                      </div>
                    </Col>

                    <Col md={3} className="text-center">
                      <div className="fw-bold text-primary">
                        {flight.arrival}
                      </div>
                      <div className="text-secondary">Arrival</div>
                      <div className="text-dark">
                        {new Date(flight.arrivalTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                      <div className="text-secondary">
                        {new Date(flight.arrivalTime).toLocaleDateString()}
                      </div>
                    </Col>

                    <Col md={2} className="text-center">
                      <div className="fw-bold text-success fs-5">
                        ₹{flight.price}
                      </div>
                      <small className="text-secondary">Price</small>
                    </Col>

                    <Col md={1} className="text-center">
                      <Button
                        variant="outline-primary"
                        onClick={() =>
                          navigate("/book-flight", { state: { flight } })
                        }
                        className="rounded-pill px-3"
                      >
                        Book
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {!loading &&
        flights.length === 0 &&
        origin &&
        destination &&
        departure && (
          <div className="mt-5">
            <Card className="flight-card">
              <Card.Body className="text-center">
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✈️</div>
                <h4>No Flights Found</h4>
                <p className="text-muted">
                  No flights available for the selected criteria. Please try
                  different dates or routes.
                </p>
              </Card.Body>
            </Card>
          </div>
        )}
    </div>
  );
};

export default Home;
