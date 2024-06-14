import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import FlightStatus from "./components/FlightStatus";
import ReviewsPage from "./components/ReviewsPage";
import NotificationsPage from "./components/NotificationsPage";
import FlightBookingForm from "./components/FlightBookingForm";
import Confirmation from "./components/Confirmation";

function App() {
  return (
    <>
      <Navbar />
      <Container className="mt-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/flight-status" element={<FlightStatus />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/book-flight" element={<FlightBookingForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
