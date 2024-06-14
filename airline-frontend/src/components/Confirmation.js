import React from "react";
import { useLocation } from "react-router-dom";

const Confirmation = () => {
  const location = useLocation();
  const { booking } = location.state;

  return (
    <div className="container">
      <h1>Booking Confirmation</h1>
      <div>
        <p>
          <strong>Flight Number:</strong> {booking.flightNumber}
        </p>
        <p>
          <strong>Airline:</strong> {booking.airline}
        </p>
        <p>
          <strong>Departure:</strong> {booking.departure}
        </p>
        <p>
          <strong>Arrival:</strong> {booking.arrival}
        </p>
        <p>
          <strong>Departure Time:</strong>{" "}
          {new Date(booking.departureTime).toLocaleString()}
        </p>
        <p>
          <strong>Arrival Time:</strong>{" "}
          {new Date(booking.arrivalTime).toLocaleString()}
        </p>
        <p>
          <strong>Status:</strong> {booking.status}
        </p>
        <p>
          <strong>Price:</strong> ${booking.price}
        </p>
        <p>
          <strong>Passenger Name:</strong> {booking.firstName}{" "}
          {booking.lastName}
        </p>
        <p>
          <strong>Email:</strong> {booking.email}
        </p>
        <p>
          <strong>Phone:</strong> {booking.phone}
        </p>
        <p>
          <strong>Address:</strong> {booking.address}
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
