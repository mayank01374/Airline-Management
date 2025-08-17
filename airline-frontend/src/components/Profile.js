import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import axios from "axios";
import { Card, Spinner } from "react-bootstrap";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user) return;
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/${user.email}`
        );
        setUserData(res.data);
      } catch (err) {
        console.error("Failed to fetch user info", err);
      }
    };

    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/booking");
        const userBookings = res.data.filter((b) => b.email === user.email);
        setBookings(userBookings);
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserInfo();
      fetchBookings();
    }
  }, [user]);

  if (loading)
    return <Spinner animation="border" variant="primary" className="m-5" />;

  return (
    <div className="container mt-5 profile-container">
      <h2>My Profile</h2>
      {userData && (
        <Card className="p-4 mb-4">
          <h5>User Details</h5>
          <p>
            <strong>Name:</strong> {userData.firstName} {userData.lastName}
          </p>
          <p>
            <strong>Email:</strong> {userData.email}
          </p>
          <p>
            <strong>Phone:</strong> {userData.phone}
          </p>
        </Card>
      )}

      <Card className="p-4">
        <h5>Flight Bookings</h5>
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((booking) => {
            // Use populated flight details if available
            const flight = booking.flightId || {};
            const airline = flight.airline || booking.airline || "";
            const flightNumber =
              flight.flightNumber || booking.flightNumber || "";
            const departure = flight.departure || booking.departure || "";
            const arrival = flight.arrival || booking.arrival || "";
            const departureTime =
              flight.departureTime || booking.departureTime || null;
            const price = booking.price || flight.price || "";
            return (
              <Card className="mb-3 p-3" key={booking._id}>
                <p>
                  <strong>Airline:</strong> {airline}
                </p>
                <p>
                  <strong>Flight:</strong> {flightNumber}
                </p>
                <p>
                  <strong>From:</strong> {departure} → <strong>To:</strong>{" "}
                  {arrival}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {departureTime
                    ? new Date(departureTime).toLocaleString()
                    : ""}
                </p>
                <p>
                  <strong>Price Paid:</strong> ₹{price}
                </p>
              </Card>
            );
          })
        )}
      </Card>
    </div>
  );
};

export default Profile;
