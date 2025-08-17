import React, { useEffect, useState } from "react";
import { Card, Alert, Spinner, Row, Col, Badge } from "react-bootstrap";
import axios from "axios";

const FlightStatus = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await axios.get("http://localhost:5000/api/flights");
        setFlights(response.data);
      } catch (err) {
        console.error("Error fetching flights:", err);
        setError("Failed to load flight information. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <div className="search-card">
          <Spinner animation="border" role="status" size="lg">
            <span className="sr-only">Loading...</span>
          </Spinner>
          <p className="mt-3 text-muted">Loading flight information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fade-in">
        <div className="search-card">
          <h2>Flight Status</h2>
          <Alert variant="danger">{error}</Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      {/* Hero Section and Status Summary */}
      <Row className="mb-4">
        <Col md={6}>
          <Card className="search-card" style={{ height: "200px" }}>
            <Card.Body className="text-center d-flex flex-column justify-content-center">
              <h2
                className="text-dark mb-2"
                style={{ fontSize: "1.8rem", fontWeight: "700" }}
              >
                Real-Time Flight Status
              </h2>
              <p className="text-dark" style={{ fontSize: "1rem" }}>
                Track your flights and get live updates
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="search-card" style={{ height: "200px" }}>
            <Card.Body className="d-flex align-items-center">
              <Row className="text-center w-100">
                <Col md={3}>
                  <div className="p-1">
                    <h5 className="text-primary mb-1">{flights.length}</h5>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Total Flights
                    </p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="p-1">
                    <h5 className="text-success mb-1">
                      {flights.filter((f) => f.status === "Scheduled").length}
                    </h5>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.8rem" }}
                    >
                      On Time
                    </p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="p-1">
                    <h5 className="text-warning mb-1">
                      {flights.filter((f) => f.status === "Delayed").length}
                    </h5>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Delayed
                    </p>
                  </div>
                </Col>
                <Col md={3}>
                  <div className="p-1">
                    <h5 className="text-info mb-1">
                      {flights.filter((f) => f.status === "Boarding").length}
                    </h5>
                    <p
                      className="text-muted mb-0"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Boarding
                    </p>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Flight List */}
      <div className="mt-4">
        <h3 className="text-white mb-4">Active Flights ({flights.length})</h3>

        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <Card key={flight._id || index} className="flight-card mb-3">
              <Card.Body>
                <Row className="align-items-center">
                  <Col md={2}>
                    <div className="text-center">
                      <Badge
                        bg={
                          flight.status === "Scheduled"
                            ? "success"
                            : flight.status === "Delayed"
                            ? "warning"
                            : "info"
                        }
                        className="mb-2"
                        style={{
                          color:
                            flight.status === "Scheduled"
                              ? "#ffffff"
                              : "#000000",
                          backgroundColor:
                            flight.status === "Scheduled"
                              ? "#28a745"
                              : undefined,
                        }}
                      >
                        {flight.status}
                      </Badge>
                      <div className="fw-bold text-primary">
                        {flight.airline}
                      </div>
                      <small className="text-muted">
                        {flight.flightNumber}
                      </small>
                    </div>
                  </Col>

                  <Col md={3}>
                    <div className="text-center">
                      <div className="fw-bold text-primary">
                        {flight.departure}
                      </div>
                      <small className="text-muted">Departure</small>
                      <div className="mt-1 text-dark">
                        {new Date(flight.departureTime).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                      <small className="text-muted">
                        {new Date(flight.departureTime).toLocaleDateString()}
                      </small>
                    </div>
                  </Col>

                  <Col md={3}>
                    <div className="text-center">
                      <div className="fw-bold text-primary">
                        {flight.arrival}
                      </div>
                      <small className="text-muted">Arrival</small>
                      <div className="mt-1 text-dark">
                        {new Date(flight.arrivalTime).toLocaleTimeString(
                          "en-US",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </div>
                      <small className="text-muted">
                        {new Date(flight.arrivalTime).toLocaleDateString()}
                      </small>
                    </div>
                  </Col>

                  <Col md={2}>
                    <div className="text-center">
                      <div
                        className="fw-bold text-success"
                        style={{ fontSize: "1.3rem" }}
                      >
                        ₹{flight.price}
                      </div>
                      <small className="text-muted">Price</small>
                    </div>
                  </Col>

                  <Col md={2}>
                    <div className="text-center">
                      <div className="d-flex justify-content-center">
                        <div className="me-2">
                          <small className="text-muted d-block">Duration</small>
                          <span className="fw-bold text-dark">
                            {Math.round(
                              (new Date(flight.arrivalTime) -
                                new Date(flight.departureTime)) /
                                (1000 * 60 * 60)
                            )}
                            h
                          </span>
                        </div>
                        <div>
                          <small className="text-muted d-block">Distance</small>
                          <span className="fw-bold text-dark">
                            ~{Math.floor(Math.random() * 1000) + 500}km
                          </span>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          <Card className="search-card">
            <Card.Body className="text-center">
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>✈️</div>
              <h4>No Active Flights</h4>
              <p className="text-muted">
                No flight information available at the moment.
              </p>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FlightStatus;
