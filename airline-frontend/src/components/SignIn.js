import React, { useState } from "react";
import { auth, provider } from "../firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Button, Form, Card, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const saveUserToBackend = async (firebaseUser) => {
    const { uid, email, displayName, photoURL, providerData } = firebaseUser;
    const provider = providerData[0]?.providerId || "unknown";

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        uid,
        email,
        name: displayName,
        photo: photoURL,
        provider,
      });
      console.log("User synced to DB:", res.data);
    } catch (err) {
      console.error("Failed to sync user:", err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      await saveUserToBackend(result.user);
      console.log("✅ Signed in:", result.user);
      navigate("/");
    } catch (err) {
      console.error("❌ Sign-in error:", err);
      setError(err.message);
    }
  };

  const handleEmailSignUp = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await saveUserToBackend(result.user);
      alert("Account created!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEmailSignIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await saveUserToBackend(result.user);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Card className="p-4 mt-5 mx-auto" style={{ maxWidth: 400 }}>
      <h3 className="mb-3 text-center">Sign In</h3>

      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      <div className="button-group">
        <Button variant="primary" onClick={handleEmailSignIn}>
          Sign In
        </Button>
        <Button variant="secondary" onClick={() => navigate("/signup")}>
          Create Account
        </Button>
      </div>

      <hr className="my-4" />

      <div className="d-flex justify-content-center">
        <button className="gsi-material-button" onClick={handleGoogleSignIn}>
          <div className="gsi-material-button-state"></div>
          <div className="gsi-material-button-content-wrapper">
            <svg className="gsi-material-button-icon" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="gsi-material-button-contents">
              Sign up with Google
            </span>
          </div>
        </button>
      </div>
    </Card>
  );
};

export default SignIn;
