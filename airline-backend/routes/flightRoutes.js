const express = require("express");
const router = express.Router();
const { ObjectId } = require("mongodb");

// Function to generate dates spread over 15 days from today
const generateFlightDates = () => {
  const today = new Date();
  const dates = [];
  for (let i = 0; i < 15; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const flightDates = generateFlightDates();

// Dummy data for flights
const dummyFlights = [
  {
    _id: new ObjectId(),
    flightNumber: "AI202",
    airline: "Air India",
    departure: "BLR",
    arrival: "DEL",
    departureTime: new Date(flightDates[0].getTime() + 9 * 60 * 60 * 1000), // 9:00 AM
    arrivalTime: new Date(
      flightDates[0].getTime() + 11 * 60 * 60 * 1000 + 15 * 60 * 1000
    ), // 11:15 AM
    status: "Scheduled",
    price: 5800,
  },
  {
    _id: new ObjectId(),
    flightNumber: "6E405",
    airline: "IndiGo",
    departure: "DEL",
    arrival: "BOM",
    departureTime: new Date(flightDates[1].getTime() + 14 * 60 * 60 * 1000), // 2:00 PM
    arrivalTime: new Date(flightDates[1].getTime() + 16 * 60 * 60 * 1000), // 4:00 PM
    status: "Scheduled",
    price: 4200,
  },
  {
    _id: new ObjectId(),
    flightNumber: "SG707",
    airline: "SpiceJet",
    departure: "BLR",
    arrival: "DEL",
    departureTime: new Date(
      flightDates[2].getTime() + 6 * 60 * 60 * 1000 + 30 * 60 * 1000
    ), // 6:30 AM
    arrivalTime: new Date(
      flightDates[2].getTime() + 8 * 60 * 60 * 1000 + 45 * 60 * 1000
    ), // 8:45 AM
    status: "Scheduled",
    price: 5100,
  },
  {
    _id: new ObjectId(),
    flightNumber: "UK108",
    airline: "Vistara",
    departure: "MAA",
    arrival: "BOM",
    departureTime: new Date(flightDates[3].getTime() + 10 * 60 * 60 * 1000), // 10:00 AM
    arrivalTime: new Date(
      flightDates[3].getTime() + 12 * 60 * 60 * 1000 + 15 * 60 * 1000
    ), // 12:15 PM
    status: "Scheduled",
    price: 4700,
  },
  {
    _id: new ObjectId(),
    flightNumber: "AI303",
    airline: "Air India",
    departure: "DEL",
    arrival: "HYD",
    departureTime: new Date(
      flightDates[4].getTime() + 5 * 60 * 60 * 1000 + 45 * 60 * 1000
    ), // 5:45 AM
    arrivalTime: new Date(
      flightDates[4].getTime() + 7 * 60 * 60 * 1000 + 55 * 60 * 1000
    ), // 7:55 AM
    status: "Scheduled",
    price: 4900,
  },
  {
    _id: new ObjectId(),
    flightNumber: "IX225",
    airline: "Air India Express",
    departure: "COK",
    arrival: "DEL",
    departureTime: new Date(flightDates[5].getTime() + 11 * 60 * 60 * 1000), // 11:00 AM
    arrivalTime: new Date(
      flightDates[5].getTime() + 13 * 60 * 60 * 1000 + 30 * 60 * 1000
    ), // 1:30 PM
    status: "Scheduled",
    price: 5300,
  },
  {
    _id: new ObjectId(),
    flightNumber: "QP117",
    airline: "Akasa Air",
    departure: "BOM",
    arrival: "CCU",
    departureTime: new Date(flightDates[6].getTime() + 15 * 60 * 60 * 1000), // 3:00 PM
    arrivalTime: new Date(flightDates[6].getTime() + 18 * 60 * 60 * 1000), // 6:00 PM
    status: "Scheduled",
    price: 5600,
  },
  {
    _id: new ObjectId(),
    flightNumber: "6E201",
    airline: "IndiGo",
    departure: "DEL",
    arrival: "BLR",
    departureTime: new Date(
      flightDates[7].getTime() + 12 * 60 * 60 * 1000 + 30 * 60 * 1000
    ), // 12:30 PM
    arrivalTime: new Date(
      flightDates[7].getTime() + 14 * 60 * 60 * 1000 + 45 * 60 * 1000
    ), // 2:45 PM
    status: "Scheduled",
    price: 4800,
  },
  {
    _id: new ObjectId(),
    flightNumber: "SG505",
    airline: "SpiceJet",
    departure: "HYD",
    arrival: "DEL",
    departureTime: new Date(flightDates[8].getTime() + 8 * 60 * 60 * 1000), // 8:00 AM
    arrivalTime: new Date(flightDates[8].getTime() + 10 * 60 * 60 * 1000), // 10:00 AM
    status: "Scheduled",
    price: 4700,
  },
  {
    _id: new ObjectId(),
    flightNumber: "AI607",
    airline: "Air India",
    departure: "GAU",
    arrival: "CCU",
    departureTime: new Date(
      flightDates[9].getTime() + 7 * 60 * 60 * 1000 + 15 * 60 * 1000
    ), // 7:15 AM
    arrivalTime: new Date(
      flightDates[9].getTime() + 8 * 60 * 60 * 1000 + 30 * 60 * 1000
    ), // 8:30 AM
    status: "Scheduled",
    price: 3500,
  },
  {
    _id: new ObjectId(),
    flightNumber: "6E303",
    airline: "IndiGo",
    departure: "DEL",
    arrival: "COK",
    departureTime: new Date(flightDates[10].getTime() + 16 * 60 * 60 * 1000), // 4:00 PM
    arrivalTime: new Date(
      flightDates[10].getTime() + 18 * 60 * 60 * 1000 + 30 * 60 * 1000
    ), // 6:30 PM
    status: "Scheduled",
    price: 5400,
  },
  {
    _id: new ObjectId(),
    flightNumber: "UK901",
    airline: "Vistara",
    departure: "BOM",
    arrival: "BLR",
    departureTime: new Date(flightDates[11].getTime() + 17 * 60 * 60 * 1000), // 5:00 PM
    arrivalTime: new Date(
      flightDates[11].getTime() + 19 * 60 * 60 * 1000 + 15 * 60 * 1000
    ), // 7:15 PM
    status: "Scheduled",
    price: 4600,
  },
  {
    _id: new ObjectId(),
    flightNumber: "IX910",
    airline: "Air India Express",
    departure: "MAA",
    arrival: "TRV",
    departureTime: new Date(
      flightDates[12].getTime() + 9 * 60 * 60 * 1000 + 30 * 60 * 1000
    ), // 9:30 AM
    arrivalTime: new Date(flightDates[12].getTime() + 11 * 60 * 60 * 1000), // 11:00 AM
    status: "Scheduled",
    price: 3200,
  },
  {
    _id: new ObjectId(),
    flightNumber: "SG312",
    airline: "SpiceJet",
    departure: "DEL",
    arrival: "IXR",
    departureTime: new Date(flightDates[13].getTime() + 13 * 60 * 60 * 1000), // 1:00 PM
    arrivalTime: new Date(flightDates[13].getTime() + 15 * 60 * 60 * 1000), // 3:00 PM
    status: "Scheduled",
    price: 4900,
  },
  {
    _id: new ObjectId(),
    flightNumber: "AI707",
    airline: "Air India",
    departure: "BLR",
    arrival: "CCU",
    departureTime: new Date(flightDates[14].getTime() + 18 * 60 * 60 * 1000), // 6:00 PM
    arrivalTime: new Date(
      flightDates[14].getTime() + 20 * 60 * 60 * 1000 + 30 * 60 * 1000
    ), // 8:30 PM
    status: "Scheduled",
    price: 5000,
  },
  {
    _id: new ObjectId(),
    flightNumber: "UK814",
    airline: "Vistara",
    departure: "DEL",
    arrival: "GAU",
    departureTime: new Date(flightDates[0].getTime() + 6 * 60 * 60 * 1000), // 6:00 AM (reusing day 1)
    arrivalTime: new Date(
      flightDates[0].getTime() + 8 * 60 * 60 * 1000 + 30 * 60 * 1000
    ), // 8:30 AM
    status: "Scheduled",
    price: 5200,
  },
  {
    _id: new ObjectId(),
    flightNumber: "6E718",
    airline: "IndiGo",
    departure: "COK",
    arrival: "BLR",
    departureTime: new Date(flightDates[1].getTime() + 10 * 60 * 60 * 1000), // 10:00 AM (reusing day 2)
    arrivalTime: new Date(
      flightDates[1].getTime() + 11 * 60 * 60 * 1000 + 30 * 60 * 1000
    ), // 11:30 AM
    status: "Scheduled",
    price: 3900,
  },
  {
    _id: new ObjectId(),
    flightNumber: "QP104",
    airline: "Akasa Air",
    departure: "BOM",
    arrival: "DEL",
    departureTime: new Date(
      flightDates[2].getTime() + 13 * 60 * 60 * 1000 + 45 * 60 * 1000
    ), // 1:45 PM (reusing day 3)
    arrivalTime: new Date(
      flightDates[2].getTime() + 15 * 60 * 60 * 1000 + 45 * 60 * 1000
    ), // 3:45 PM
    status: "Scheduled",
    price: 4400,
  },
  {
    _id: new ObjectId(),
    flightNumber: "SG606",
    airline: "SpiceJet",
    departure: "DEL",
    arrival: "JAI",
    departureTime: new Date(flightDates[3].getTime() + 19 * 60 * 60 * 1000), // 7:00 PM (reusing day 4)
    arrivalTime: new Date(
      flightDates[3].getTime() + 20 * 60 * 60 * 1000 + 20 * 60 * 1000
    ), // 8:20 PM
    status: "Scheduled",
    price: 3700,
  },
  {
    _id: new ObjectId(),
    flightNumber: "AI908",
    airline: "Air India",
    departure: "DEL",
    arrival: "LKO",
    departureTime: new Date(flightDates[4].getTime() + 21 * 60 * 60 * 1000), // 9:00 PM (reusing day 5)
    arrivalTime: new Date(
      flightDates[4].getTime() + 22 * 60 * 60 * 1000 + 15 * 60 * 1000
    ), // 10:15 PM
    status: "Scheduled",
    price: 3600,
  },
];

// GET all flights (for flight status page)
router.get("/", async (req, res) => {
  try {
    res.json(dummyFlights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST search flights based on criteria
router.post("/", async (req, res) => {
  try {
    // Handle both request body structures
    const searchData = req.body.data || req.body;
    const { origin, destination, departure } = searchData;

    console.log("Full request body:", req.body);
    console.log("Search data:", searchData);

    if (!origin || !destination || !departure) {
      return res.status(400).json({
        message: "Missing required fields: origin, destination, departure",
      });
    }

    console.log("Search criteria:", { origin, destination, departure });

    const flights = dummyFlights.filter((flight) => {
      // Convert flight departure time to local date string for comparison
      const flightDate = flight.departureTime.toLocaleDateString("en-CA"); // Returns YYYY-MM-DD format

      console.log(
        `Flight ${flight.flightNumber}: ${flight.departure} -> ${
          flight.arrival
        }, Date: ${flightDate}, Match: ${
          flight.departure === origin &&
          flight.arrival === destination &&
          flightDate === departure
        }`
      );

      return (
        flight.departure === origin &&
        flight.arrival === destination &&
        flightDate === departure
      );
    });

    console.log("Filtered flights:", flights);
    res.json(flights);
  } catch (error) {
    console.error("Error searching flights:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
