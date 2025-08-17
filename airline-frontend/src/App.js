import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Profile from "./components/Profile";
import FlightStatus from "./components/FlightStatus";
import FlightBookingForm from "./components/FlightBookingForm";
import Confirmation from "./components/Confirmation";
import SignIn from "./components/SignIn";
import SignupPage from "./components/SignupPage";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  const backgroundStyle = {
    backgroundImage: "url('/images/background.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    color: "#fff",
  };

  return (
    <div style={backgroundStyle}>
      <Navbar user={user} />
      <Container className="mt-0">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/flight-status" element={<FlightStatus />} />
          <Route path="/book-flight" element={<FlightBookingForm />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
