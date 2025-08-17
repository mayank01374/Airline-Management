const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection with fallback
const mongoUri =
  process.env.MONGO_URI || "mongodb://localhost:27017/airline-management";
const port = process.env.PORT || 5000;

mongoose
  .connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.log("MongoDB connection error:", err.message);
    console.log("Using dummy data mode - some features may be limited");
  });

// Routes
const flights = require("./routes/flightRoutes");
const users = require("./routes/users");
const reviews = require("./routes/reviews");
const booking = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");

// API routes
app.use("/api/flightRoutes", flights);
app.use("/api/flights", flights);
app.use("/api/users", userRoutes);
app.use("/api/reviews", reviews);
app.use("/api/booking", booking);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "FlyHigh API is running",
    timestamp: new Date().toISOString(),
  });
});

app.listen(port, () => console.log(`FlyHigh server running on port ${port}`));
