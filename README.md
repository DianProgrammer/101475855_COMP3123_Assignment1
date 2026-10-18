# COMP3123 – Assignment 1
### Employee Management REST API

**Name:** Kiana Sepasian  
**Student ID:** 101475855  
**Course:** COMP3123 – Full Stack Development I  
**College:** George Brown Polytechnic

## About This Project

For Assignment 1, I developed an Employee Management REST API using Node.js, Express.js, and MongoDB Atlas.

The main purpose of this project was to build a backend application where users can create an account, log in, and manage their own employee records.

I implemented user authentication using JWT, password hashing using bcryptjs, and CRUD operations for employee management. I also added validation, error handling, logging, and some security features to make sure the API handles different types of requests properly.

I used Postman to test the endpoints and MongoDB Atlas to check the data stored in the database.

## Technologies I Used

- **Node.js and Express.js:** To build the server and API endpoints.
- **MongoDB Atlas and Mongoose:** To store and manage user and employee data.
- **JWT:** To authenticate users and protect employee endpoints.
- **bcryptjs:** To hash user passwords.
- **express-validator:** For request validation.
- **Helmet:** To add security-related HTTP headers.
- **express-rate-limit:** To limit the number of API requests.
- **Morgan:** To record HTTP requests.
- **dotenv:** To manage environment variables.
- **Nodemon:** To restart the server automatically during development.
- **Postman:** To test the API endpoints.

## Project Structure

```text
101475855_COMP3123_Assignment1/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── logs/
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── server.js
└── README.md
```

I organized the project into separate folders to keep the code easier to read and manage.

The `models` folder contains the MongoDB schemas, `controllers` contains the application logic, `routes` defines the API endpoints, and `middleware` handles authentication and errors.

## How to Run the Project

**1. Clone the repository**

```bash
git clone https://github.com/DianProgrammer/101475855_COMP3123_Assignment1.git
cd 101475855_COMP3123_Assignment1
```

**2. Install the required packages**

```bash
npm install
```

**3. Set up the environment variables**

Create a `.env` file in the root folder and use `.env.example` as a reference.

The project requires a MongoDB Atlas connection string and a JWT secret.

I did not include my actual `.env` file in the repository because it contains private credentials.

**4. Run the application**

```bash
npm start
```

For development, I also added:

```bash
npm run dev
```

The API runs locally at:

```text
http://localhost:3000
```

## API Endpoints

### User Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/v1/user/signup` | Create a new user account |
| POST | `/api/v1/user/login` | Log in and receive a JWT token |

For registration, the user provides a username, email, and password.

During login, the application checks the user's credentials and generates a JWT token if they are correct.

### Employee Management

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/v1/emp/employees` | Get all employees belonging to the logged-in user |
| POST | `/api/v1/emp/employees` | Create an employee |
| GET | `/api/v1/emp/employees/:eid` | Get an employee using their ID |
| PUT | `/api/v1/emp/employees/:eid` | Update an employee |
| DELETE | `/api/v1/emp/employees?eid=EMPLOYEE_ID` | Delete an employee |

All employee endpoints require a valid JWT token.

I also added a health-check endpoint:

`GET /health`

This endpoint can be used to check whether the server is running.

## Employee Information

Each employee record contains:

- First name and last name
- Email address
- Position
- Salary
- Date of joining
- Department

Each record is also connected to the user who created it.

One important part of my implementation was making sure users can only manage their own employees. For example, User A cannot view, update, or delete an employee created by User B.

## Authentication and Security

I used JWT to protect the employee routes. After a successful login, the token needs to be included in the Authorization header:

```text
Authorization: Bearer YOUR_JWT_TOKEN
```

The JWT token expires after one hour.

I also implemented password hashing, input validation, security headers, and rate limiting.

The API allows up to 100 requests within a 15-minute window. If that limit is exceeded, the server returns `429 Too Many Requests`.

## Error Handling and Logging

I added centralized error handling so the API can return JSON error responses instead of unexpected HTML pages.

Some of the status codes I tested include:

| Status | Description |
|---|---|
| 200 | Successful request |
| 201 | New resource created |
| 204 | Employee deleted |
| 400 | Invalid input or malformed JSON |
| 401 | Missing, incorrect, or expired authentication |
| 404 | Employee not found or not accessible |
| 409 | Duplicate username or email |
| 429 | Rate limit exceeded |
| 500 | Unexpected server error |

I used Morgan to record HTTP requests and a separate error logger to track errors.

The logs are stored in the `logs` folder.

## Testing with Postman

I tested the application using Postman and organized the requests into five folders:

1. User Authentication
2. Employee CRUD
3. Validation & Error Tests
4. Security & Ownership Tests
5. Health & Rate Limiting

I started by testing registration and login, followed by creating, retrieving, updating, and deleting employee records.

After that, I tested different error scenarios, including invalid employee IDs, missing fields, incorrect login credentials, duplicate users, invalid JSON, and invalid or expired JWT tokens.

I also created two separate test users to check whether one user could access another user's employee records. The API correctly rejected these requests.

Finally, I used the Postman Collection Runner to send multiple requests and confirm that the rate limiter returns HTTP 429 after the allowed limit is reached.

## MongoDB Atlas

I used MongoDB Atlas to store the application's users and employees.

**Database name:** `comp3123_assignment1`

I also checked that user passwords are stored as hashed values and that employee records are linked to the correct users.

## GitHub Repository

https://github.com/DianProgrammer/101475855_COMP3123_Assignment1

---

**Developed by Kiana Sepasian**  
**Student ID: 101475855**  
COMP3123 – Assignment 1