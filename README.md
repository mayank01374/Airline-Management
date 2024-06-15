# Airline Management and Booking App

This project is an airline management and booking application that streamlines flight scheduling, seat reservations, and customer interactions. The application includes features such as real-time flight status updates, secure payment processing, personalized booking options, and a notification system to enhance the overall travel experience for users.

## Table of Contents

- [Features](#features)
- [Setup and Installation](#setup-and-installation)
- [Usage](#usage)
- [Image Credits](#image-credits)
- [License](#license)

## Features

- **Flight Search and Booking**: Users can search for flights based on their destination, travel dates, and preferences.
  ![Screenshot 2024-06-15 182915](https://github.com/mayank01374/Airline-Management/assets/133500570/e05d48be-c72d-4c4d-b6fe-61b2cd12c5da)
- **User Profiles**: Users can create profiles to store personal information, travel preferences, and past booking history.
  ![Screenshot 2024-06-15 183048](https://github.com/mayank01374/Airline-Management/assets/133500570/cbcad324-ecfd-495b-aeea-0ff670bc107e)
- **Real-time Flight Information**: Provides real-time updates on flight availability, schedules, and prices.
- **Reviews and Ratings**: Users can leave reviews and ratings for airlines and flights they have booked.
  ![Screenshot 2024-06-15 183227](https://github.com/mayank01374/Airline-Management/assets/133500570/8bc2fa98-f0df-4ef4-bdc0-73820ee65b2e)
- **Notification System**: Sends alerts and reminders about upcoming flights, check-in deadlines, and other important travel-related information.
  ![Screenshot 2024-06-15 183344](https://github.com/mayank01374/Airline-Management/assets/133500570/bc476a22-62d6-458c-beee-56f837161fd6)

## Setup and Installation

### Prerequisites

- Node.js (v16) or use nvm
- npm or yarn
- MongoDB

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/mayank01374/Airline-Management.git
   cd Airline-Management
   ```

2. **Backend Setup**

   ```bash
   cd airline-backend
   npm install express mongoose body-parser cors axios
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install axios bootstrap react-bootstrap
   ```

4. **Environment Variables**

   In the `.env` file in the `airline-backend` directory update the URI to local MongoDB:

   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=5000
   ```

5. **Run the Backend Server**

   ```bash
   cd airline-backend
   node app.js
   ```

6. **Run the Frontend Development Server**

   ```bash
   cd airline-frontend
   npm start
   ```

## Usage

- Open your browser and go to `http://localhost:3000/` to use the application.
- Use the home page to search for flights based on origin, destination, and departure date.
- View available flights and book a flight by filling in the required details.
- Check your profile for stored personal information and booking history.
- Receive notifications about your upcoming flights.

## Image Credits

- Background image by Ahmed Muntasir(https://www.pexels.com/@ahmedmuntasir/) on Pexels(https://www.pexels.com/photo/gray-airliner-912050/).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

