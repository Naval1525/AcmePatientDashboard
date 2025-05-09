# Acme Patient Dashboard

A minimalist patient dashboard for tracking weight loss progress and medication shipments.

## Project Structure

- `/backendd/prisma` - Database schema and migrations
- `/backend` - Backend server code (Express.js)
- `/client` - Frontend React application

## Setup Instructions

### Prerequisites

- Node.js v16+ and npm
- Neon PostgreSQL database (or any PostgreSQL database)

### Backend Setup

1. Clone the repository

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory (use the provided `.env.example` as a template)

4. Set up your Neon PostgreSQL database and update the `DATABASE_URL` in the `.env` file

5. Generate Prisma client:
   ```
   npm run prisma:generate
   ```

6. Run migrations:
   ```
   npm run prisma:migrate
   ```

7. Seed the database:
   ```
   npm run seed
   ```

8. Start the development server:
   ```
   npm run dev
   ```

The server will start on http://localhost:5000

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The client will start on http://localhost:5173

### Test User

After running the seed script, you can log in with the following credentials:

- Email: test@example.com
- Password: password123

## Features

- Secure user authentication
- Dashboard overview with key metrics
- Weight tracking with progress visualization
- Medication shipment tracking

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile

### Dashboard
- `GET /api/dashboard/overview` - Get dashboard overview data

### Weight Tracking
- `POST /api/weight` - Add new weight entry
- `GET /api/weight` - Get all weight entries
- `GET /api/weight/:id` - Get a single weight entry
- `PUT /api/weight/:id` - Update a weight entry
- `DELETE /api/weight/:id` - Delete a weight entry

### Shipment Tracking
- `GET /api/shipment` - Get all shipments
- `GET /api/shipment/upcoming` - Get upcoming shipments
- `GET /api/shipment/past` - Get past shipments
- `GET /api/shipment/:id` - Get a single shipment
