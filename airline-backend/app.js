const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const flights = require("./routes/flightRoutes");
const users = require("./routes/users");
const reviews = require("./routes/reviews");
const booking = require("./routes/bookingRoutes");
app.use("/api/flightRoutes", flights);
app.use("/api/users", users);
app.use("/api/reviews", reviews);
app.use("/api/booking", booking);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
