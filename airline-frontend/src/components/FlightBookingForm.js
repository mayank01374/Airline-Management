import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import {
  Form,
  Row,
  Col,
  Card,
  Button,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";

const FlightBookingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const flight = state?.flight;
  const [firebaseUser] = useAuthState(auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    email: "",
    phone: "",
    paymentMethod: "UPI",
  });

  useEffect(() => {
    if (firebaseUser) {
      setForm((prev) => ({
        ...prev,
        email: firebaseUser.email || "",
        phone: prev.phone, // You can fetch phone from backend if needed
      }));
    }
  }, [firebaseUser]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      console.log("Booking submit clicked");
      const bookingData = {
        ...form,
        flightId: flight._id,
        flightNumber: flight.flightNumber,
        airline: flight.airline,
        departure: flight.departure,
        arrival: flight.arrival,
        departureTime: flight.departureTime,
        arrivalTime: flight.arrivalTime,
        status: "Confirmed",
        price: totalFare,
      };
      console.log("Booking data to send:", bookingData);

      const res = await fetch("http://localhost:5000/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();
      console.log("Booking response:", data);

      if (res.ok) {
        // Navigate to confirmation page with booking data
        navigate("/confirmation", { state: { booking: data } });
      } else {
        alert("❌ Booking failed: " + data.message);
      }
    } catch (err) {
      console.error("Booking error:", err);
      alert("❌ Server error. Please try again.");
    }
  };

  if (!flight) return <p>No flight selected.</p>;

  const baseFare = flight.price;
  const taxes = {
    cute: 75,
    rcs: 50,
    security: 236,
    udf: 207,
    tax: 360,
    convenience: 200,
  };

  const totalFare =
    baseFare +
    taxes.cute +
    taxes.rcs +
    taxes.security +
    taxes.udf +
    taxes.tax +
    taxes.convenience;

  return (
    <div className="container mt-5">
      <h3 className="mb-4 text-dark fw-bold">✈️ Book Your Flight</h3>
      <Row>
        {/* Passenger Information */}
        <Col md={6}>
          <Card
            className="p-4 mb-4 shadow-sm border-0"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
          >
            <h5 className="text-primary fw-bold">Passenger Information</h5>
            <Form>
              <Row>
                <Col>
                  <FormGroup className="mb-3">
                    <FormLabel className="text-dark fw-semibold">
                      First Name
                    </FormLabel>
                    <FormControl
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      className="text-dark"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="mb-3">
                    <FormLabel className="text-dark fw-semibold">
                      Last Name
                    </FormLabel>
                    <FormControl
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      className="text-dark"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup className="mb-3">
                    <FormLabel className="text-dark fw-semibold">Age</FormLabel>
                    <FormControl
                      name="age"
                      type="number"
                      value={form.age}
                      onChange={handleChange}
                      className="text-dark"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="mb-3">
                    <FormLabel className="text-dark fw-semibold">
                      Gender
                    </FormLabel>
                    <FormControl
                      as="select"
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      style={{ backgroundColor: "white" }}
                      className="text-dark"
                    >
                      <option value="">Select</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </FormControl>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <FormGroup className="mb-3">
                    <FormLabel className="text-dark fw-semibold">
                      Email
                    </FormLabel>
                    <FormControl
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      className="text-dark"
                    />
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup className="mb-3">
                    <FormLabel className="text-dark fw-semibold">
                      Phone
                    </FormLabel>
                    <FormControl
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="text-dark"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup className="mb-3">
                    <FormLabel className="text-dark fw-semibold">
                      Payment Method
                    </FormLabel>
                    <FormControl
                      as="select"
                      name="paymentMethod"
                      value={form.paymentMethod}
                      onChange={handleChange}
                      style={{ backgroundColor: "white" }}
                      className="text-dark"
                    >
                      <option value="UPI">UPI</option>
                      <option value="Card">Credit/Debit Card</option>
                      <option value="NetBanking">Net Banking</option>
                    </FormControl>
                  </FormGroup>
                </Col>
                <Col
                  md={6}
                  className="d-flex align-items-end justify-content-end"
                >
                  <Button
                    variant="success"
                    size="lg"
                    type="button"
                    onClick={handleSubmit}
                    className="shadow"
                  >
                    Continue to Payment
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>

        {/* Fare Summary */}
        <Col md={6}>
          <Card
            className="p-4 mb-4 shadow-sm border-0"
            style={{ backgroundColor: "rgba(248, 249, 250, 0.95)" }}
          >
            <h5 className="text-primary fw-bold">Fare Summary</h5>
            <p className="text-dark">
              <strong>{flight.airline}</strong> - {flight.flightNumber}
            </p>
            <p className="text-dark">Base Fare: ₹{baseFare}</p>
            <ul className="list-unstyled text-dark">
              <li>CUTE Fees: ₹{taxes.cute}</li>
              <li>RCS & Admin Charge: ₹{taxes.rcs}</li>
              <li>Aviation Security Fee: ₹{taxes.security}</li>
              <li>User Development Fee: ₹{taxes.udf}</li>
              <li>Tax: ₹{taxes.tax}</li>
              <li>Convenience Fee: ₹{taxes.convenience}</li>
            </ul>
            <h5 className="mt-3 text-danger fw-bold">You Pay: ₹{totalFare}</h5>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FlightBookingForm;
