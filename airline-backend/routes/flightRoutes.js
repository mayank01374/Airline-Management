const express = require("express");
const router = express.Router();
const flightRoutes = require("../routes/flightRoutes");

// Dummy data for flights
const dummyFlights = [
  {
    _id: "1",
    flightNumber: "6E123",
    airline: "Indigo",
    departure: "BLR",
    arrival: "DEL",
    departureTime: new Date("2024-07-01T10:00:00Z"),
    arrivalTime: new Date("2024-07-01T13:00:00Z"),
    status: "Scheduled",
    price: 5000,
  },
  {
    _id: "2",
    flightNumber: "UK456",
    airline: "Vistara",
    departure: "MAA",
    arrival: "BOM",
    departureTime: new Date("2024-07-01T14:00:00Z"),
    arrivalTime: new Date("2024-07-01T17:00:00Z"),
    status: "Scheduled",
    price: 4500,
  },
  {
    _id: "3",
    flightNumber: "QP789",
    airline: "Akasa Air",
    departure: "CCU",
    arrival: "GAU",
    departureTime: new Date("2024-07-01T18:00:00Z"),
    arrivalTime: new Date("2024-07-01T21:00:00Z"),
    status: "Scheduled",
    price: 3500,
  },
];

// Get flights based on search criteria
router.post("/", async (req, res) => {
  try {
    const { origin, destination, departure } = req.body;
    console.log(req.body);
    const flights = dummyFlights.filter(
      (flight) =>
        flight.departure === origin &&
        flight.arrival === destination &&
        flight.departureTime.toISOString().split("T")[0] === departure
    );
    console.log("Filtered flights", flights);
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
