import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Button, Alert, Container } from "react-bootstrap";

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { booking } = location.state || {};

  if (!booking) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          No booking information found. Please make a booking first.
        </Alert>
        <Button variant="primary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4 text-dark fw-bold">
        🎉 Booking Confirmation
      </h1>

      <Card
        className="mb-4 shadow border-0"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
      >
        <Card.Header className="bg-primary text-white">
          <h4 className="mb-0">✈️ Flight Details</h4>
        </Card.Header>
        <Card.Body className="text-dark">
          <div className="row">
            <div className="col-md-6">
              <p className="mb-2">
                <strong className="text-primary">Flight Number:</strong>{" "}
                <span className="text-dark">{booking.flightNumber}</span>
              </p>
              <p className="mb-2">
                <strong className="text-primary">Airline:</strong>{" "}
                <span className="text-dark">{booking.airline}</span>
              </p>
              <p className="mb-2">
                <strong className="text-primary">Departure:</strong>{" "}
                <span className="text-dark">{booking.departure}</span>
              </p>
              <p className="mb-2">
                <strong className="text-primary">Arrival:</strong>{" "}
                <span className="text-dark">{booking.arrival}</span>
              </p>
            </div>
            <div className="col-md-6">
              <p className="mb-2">
                <strong className="text-primary">Departure Time:</strong>{" "}
                <span className="text-dark">
                  {new Date(booking.departureTime).toLocaleString()}
                </span>
              </p>
              <p className="mb-2">
                <strong className="text-primary">Arrival Time:</strong>{" "}
                <span className="text-dark">
                  {new Date(booking.arrivalTime).toLocaleString()}
                </span>
              </p>
              <p className="mb-2">
                <strong className="text-primary">Status:</strong>{" "}
                <span className="text-success fw-bold">{booking.status}</span>
              </p>
              <p className="mb-2">
                <strong className="text-primary">Price:</strong>{" "}
                <span className="text-danger fw-bold fs-5">
                  ₹{booking.price}
                </span>
              </p>
            </div>
          </div>
        </Card.Body>
      </Card>

      <Card
        className="mb-4 shadow border-0"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
      >
        <Card.Header className="bg-success text-white">
          <h4 className="mb-0">👤 Passenger Information</h4>
        </Card.Header>
        <Card.Body className="text-dark">
          <p className="mb-2">
            <strong className="text-success">Name:</strong>{" "}
            <span className="text-dark">
              {booking.firstName} {booking.lastName}
            </span>
          </p>
          <p className="mb-2">
            <strong className="text-success">Email:</strong>{" "}
            <span className="text-dark">{booking.email}</span>
          </p>
          <p className="mb-2">
            <strong className="text-success">Phone:</strong>{" "}
            <span className="text-dark">{booking.phone}</span>
          </p>
          {booking.age && (
            <p className="mb-2">
              <strong className="text-success">Age:</strong>{" "}
              <span className="text-dark">{booking.age}</span>
            </p>
          )}
          {booking.gender && (
            <p className="mb-2">
              <strong className="text-success">Gender:</strong>{" "}
              <span className="text-dark">{booking.gender}</span>
            </p>
          )}
          {booking.paymentMethod && (
            <p className="mb-2">
              <strong className="text-success">Payment Method:</strong>{" "}
              <span className="text-dark">{booking.paymentMethod}</span>
            </p>
          )}
          {booking.address && (
            <p className="mb-2">
              <strong className="text-success">Address:</strong>{" "}
              <span className="text-dark">{booking.address}</span>
            </p>
          )}
        </Card.Body>
      </Card>

      <div className="text-center">
        <Alert
          variant="success"
          className="mb-4 shadow"
          style={{ backgroundColor: "rgba(212, 237, 218, 0.95)" }}
        >
          <h5 className="mb-2 text-success fw-bold">
            ✅ Your booking has been confirmed!
          </h5>
          <p className="mb-0 text-dark">
            You will receive a confirmation email shortly.
          </p>
        </Alert>

        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/")}
          className="me-3 shadow"
        >
          🏠 Book Another Flight
        </Button>
        <Button
          variant="outline-secondary"
          size="lg"
          onClick={() => navigate("/profile")}
          className="shadow"
        >
          👤 View Profile
        </Button>
      </div>
    </Container>
  );
};

export default Confirmation;
