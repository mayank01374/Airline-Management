# Airline Management - Setup Guide

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)

## Quick Setup

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd airline-backend
npm install

# Install frontend dependencies
cd ../airline-frontend
npm install
```

### 2. Environment Setup

Create a `.env` file in the `airline-backend` directory:

```env
MONGO_URI=mongodb://localhost:27017/airline-management
PORT=5000
```

**Note:** If you don't have MongoDB installed locally, you can use MongoDB Atlas:

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Get your connection string
4. Replace the MONGO_URI with your Atlas connection string

### 3. Start the Application

#### Option A: Start Both Servers (Recommended)

```bash
# From the root directory
npm run dev
```

#### Option B: Start Servers Separately

```bash
# Terminal 1 - Backend
npm run backend

# Terminal 2 - Frontend
npm run frontend
```

### 4. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Available Scripts

- `npm run dev` - Start both frontend and backend servers
- `npm run backend` - Start only the backend server
- `npm run frontend` - Start only the frontend server
- `npm run build` - Build the frontend for production

## Troubleshooting

### MongoDB Connection Issues

1. Make sure MongoDB is running locally
2. Check your connection string in `.env`
3. If using Atlas, ensure your IP is whitelisted

### Port Already in Use

- Backend: Change PORT in `.env` file
- Frontend: React will automatically suggest an alternative port

### Dependencies Issues

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Features Working

✅ Flight search and filtering
✅ Flight status display
✅ User profile creation
✅ Review submission and display
✅ Flight booking flow
✅ Booking confirmation

## Next Steps

- Add user authentication
- Implement real payment processing
- Add email notifications
- Improve UI/UX design
