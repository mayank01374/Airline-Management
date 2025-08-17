# Airline Management System

A comprehensive web-based airline booking and management platform built with React.js frontend and Node.js backend. This system provides a complete solution for flight search, booking, user authentication, and flight status tracking.

## Project Overview

The Airline Management System is a full-stack web application that simulates a real-world airline booking platform. It features a modern, responsive user interface with robust backend services for managing flights, bookings, and user accounts.

## Architecture

The project follows a client-server architecture with separate frontend and backend applications:

- **Frontend**: React.js application with Bootstrap UI components
- **Backend**: Node.js/Express.js REST API
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Firebase Authentication (Google Sign-in and Email/Password)
- **State Management**: React Hooks and Context API

## Features

### Core Functionality

- **Flight Search**: Advanced search with filters for origin, destination, dates, and passenger count
- **Flight Booking**: Complete booking workflow with passenger information collection
- **User Authentication**: Secure login/signup with Firebase integration
- **Flight Status**: Real-time flight status tracking
- **User Profile Management**: Personal information and booking history
- **Responsive Design**: Mobile-friendly interface across all devices

### Technical Features

- **Real-time Data**: Dynamic flight availability and pricing
- **Payment Integration**: Multiple payment method support (UPI, Cards, Net Banking)
- **Booking Confirmation**: Automated booking confirmation system
- **Error Handling**: Comprehensive error management and user feedback
- **Data Validation**: Client and server-side validation
- **Security**: CORS protection and secure API endpoints

## Technology Stack

### Frontend

- React.js 17.0.2
- React Router DOM 6.23.1
- React Bootstrap 1.6.8
- Bootstrap 4.6.2
- Axios 1.7.2
- Firebase 11.10.0
- React Firebase Hooks 5.1.1
- React Select 5.8.0

### Backend

- Node.js
- Express.js 4.19.2
- MongoDB with Mongoose 8.4.1
- Body Parser 1.20.2
- CORS 2.8.5
- Dotenv 16.4.5

### External Services

- Firebase Authentication
- Google OAuth Integration

## Project Structure

```
Airline-Management/
├── airline-frontend/          # React.js frontend application
│   ├── public/               # Static assets and HTML template
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── firebase.js       # Firebase configuration
│   │   ├── App.js           # Main application component
│   │   └── index.js         # Application entry point
│   └── package.json
├── airline-backend/          # Node.js backend application
│   ├── models/              # MongoDB schemas
│   ├── routes/              # API route handlers
│   ├── app.js              # Express server configuration
│   └── package.json
└── README.md
```

## Installation and Setup

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd airline-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:

   ```
   MONGO_URI=mongodb://localhost:27017/airline-management
   PORT=5000
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

   For development with auto-restart:

   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd airline-frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## API Endpoints

### Flight Management

- `GET /api/flights` - Retrieve all flights
- `POST /api/flightRoutes` - Search flights based on criteria

### User Management

- `POST /api/users/login` - User authentication
- `GET /api/users/profile` - Get user profile

### Booking Management

- `POST /api/booking` - Create new booking
- `GET /api/booking/:id` - Get booking details

### Reviews

- `GET /api/reviews` - Get flight reviews
- `POST /api/reviews` - Submit new review

## Database Schema

### Flight Model

```javascript
{
  flightNumber: String,
  airline: String,
  departure: String,
  arrival: String,
  departureTime: Date,
  arrivalTime: Date,
  status: String,
  price: Number
}
```

### Booking Model

```javascript
{
  flightId: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  age: Number,
  gender: String,
  paymentMethod: String,
  address: String,
  bookingDate: Date
}
```

## Key Components

### Frontend Components

- **Home**: Main landing page with flight search functionality
- **FlightBookingForm**: Complete booking workflow
- **FlightStatus**: Real-time flight status tracking
- **Profile**: User profile and booking history
- **SignIn/SignupPage**: Authentication components
- **Navbar**: Navigation and user session management

### Backend Routes

- **flightRoutes.js**: Flight search and management
- **bookingRoutes.js**: Booking creation and management
- **userRoutes.js**: User authentication and profile
- **reviews.js**: Review system implementation

## Configuration

### Environment Variables

Backend environment variables should be configured in the `.env` file:

- `MONGO_URI`: MongoDB connection string
- `PORT`: Server port (default: 5000)

### Firebase Configuration

Firebase configuration is handled in `airline-frontend/src/firebase.js` with the following services:

- Authentication (Google Sign-in, Email/Password)
- Analytics (optional)

## Development Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Follow JavaScript ES6+ conventions
- Implement proper error handling
- Add meaningful comments for complex logic

### Testing

- Frontend: React Testing Library
- Backend: Jest or Mocha
- API Testing: Postman or similar tools

### Deployment

- Frontend: Build for production using `npm run build`
- Backend: Use PM2 or similar process manager
- Database: MongoDB Atlas for cloud deployment

## Security Considerations

- CORS configuration for API access control
- Input validation on both client and server
- Secure authentication with Firebase
- Environment variable protection
- HTTPS enforcement in production

## Performance Optimization

- React component optimization with proper hooks usage
- Database query optimization
- Image and asset compression
- Lazy loading for better user experience

## Troubleshooting

### Common Issues

1. **MongoDB Connection**: Ensure MongoDB is running and connection string is correct
2. **Port Conflicts**: Check if ports 3000 (frontend) and 5000 (backend) are available
3. **Firebase Configuration**: Verify Firebase project settings and API keys
4. **CORS Errors**: Ensure backend CORS configuration matches frontend URL

### Debug Mode

Enable debug logging by setting environment variables:

```
DEBUG=express:*
NODE_ENV=development
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.

## Support

For technical support or questions, please refer to the project documentation or create an issue in the repository.
