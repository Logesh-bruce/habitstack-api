# HabitStack API

HabitStack is a RESTful habit-tracking API built with Node.js and Express.js. It allows users to securely manage habits, track daily completions, and analyze consistency through streak-based statistics.

## Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Habit CRUD operations
- User-specific habit management
- Habit completion tracking
- Current and longest streak calculation
- Completion statistics

## Tech Stack

- Node.js
- Express.js
- JavaScript
- JSON Web Token (JWT)
- bcrypt

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Register a user |
| POST | `/api/auth/login` | Login and get JWT |
| GET | `/api/habits` | Get user's habits |
| GET | `/api/habits/:id` | Get a specific habit |
| POST | `/api/habits` | Create a habit |
| PUT | `/api/habits/:id` | Update a habit |
| DELETE | `/api/habits/:id` | Delete a habit |
| POST | `/api/habits/:id/complete` | Log habit completion |
| GET | `/api/habits/:id/stats` | Get habit statistics |

## Getting Started

```bash
git clone <repository-url>
cd habitstack
npm install
node server.js
```

The API runs at:

```text
http://localhost:3000
```

## Authentication

Protected endpoints require a JWT:

```text
Authorization: Bearer <token>
```

## Data Storage

This project uses in-memory JavaScript arrays to focus on REST API design, authentication, data relationships, and backend logic. Data resets when the server restarts.

## Author

Bruce
