# React Library Management

This project is a full-stack web application designed to manage a library's inventory of books. It allows users to browse, borrow, and return books, and administrators to manage the library's collection and users. The project is built using React for the frontend and Node.js with Express for the backend. MongoDB is used as the database, and Firebase handles authentication.

## Table of Contents

-   [Features](#features)
-   [Project Structure](#project-structure)
-   [Installation](#installation)
-   [Usage](#usage)
-   [API Endpoints](#api-endpoints)
-   [Technologies Used](#technologies-used)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   User authentication (sign up, sign in, sign out) using Firebase
-   Role-based access control for users and administrators
-   Book inventory management (CRUD operations)
-   Borrowing and returning books
-   Viewing borrowed book history
-   Search functionality for books by title, author, and genre

## Project Structure

The project is divided into two main parts: the frontend and the backend.

### Frontend

Located in the `frontend` directory, this part of the project is built with React and includes the following:

-   Components: Reusable UI elements like Navbar, Book Cards, etc.
-   Pages: Different views such as Home, SignIn, SignUp, and Admin Portal.
-   Context: State management using React Context API for user and book states.
-   Styles: CSS files for styling components.

### Backend

Located in the `backend` directory, this part of the project is built with Node.js and Express and includes the following:

-   Routes: Defines the API endpoints for books and users.
-   Controllers: Contains the logic for handling requests and responses.
-   Models: Defines the data schema for MongoDB using Mongoose.
-   Middleware: Functions for authentication and error handling.
-   Utilities: Helper functions such as token generation and email sending.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/dipto-kainin/react-library-management
    ```

2. Install dependencies for both frontend and backend:

    ```bash
    //for backend
    npm install
    ```

    ```bash
    //for frontend
    cd ../frontend
    npm install
    ```

3. Set up environment variables:
    - Create a `.env` file in the `root` directory with the following variables:
    ```
        PORT=your_port_number
        FRONTEND=your_frontend_url
        MONGO_URI=your_mongodb_uri
        JWT_SECRET=your_jwt_secret
        JWT_EXPIRES_IN=your_jwt_expiration_time
        EMAIL=your_email
        PASSWORD=your_email_password(app password not actual password)
        apiKey=your_firebase_api_key
        authDomain=your_firebase_auth_domain
        projectId=your_firebase_project_id
        storageBucket=your_firebase_storage_bucket
        messagingSenderId=your_firebase_messaging_sender_id
        appId=your_firebase_app_id
        NODE_ENV=your_node_environment

    ```

## Usage

1. Start the backend server:

    ```bash
    npm start
    ```

2. Start the frontend development server:

    ```bash
    cd frontend
    npm start
    ```

3. Open your browser and navigate to `http://localhost:3000` to use the application.

## API Endpoints

### User Routes

-   `POST /api/users/signup`: Register a new user
-   `POST /api/users/signin`: Authenticate a user
-   `GET /api/users/profile`: Get user profile (protected)
-   `PUT /api/users/profile`: Update user profile (protected)
-   ...and many more

### Book Routes

-   `GET /api/books`: Get all books
-   `POST /api/books`: Add a new book (admin)
-   `GET /api/books/:id`: Get a book by ID
-   `PUT /api/books/:id`: Update a book by ID (admin)
-   `DELETE /api/books/:id`: Delete a book by ID (admin)
-   ...and many more

## Technologies Used

-   **Frontend**: React, React Router, Context API
-   **Backend**: Node.js, Express, Mongoose
-   **Database**: MongoDB
-   **Authentication**: Firebase
-   **Others**: JWT, CSS

## Test login 
website test login 

-    **admin** : kaininhop@gmail.com ( 123456 )
-    **user** : resgister as you like

## Contributing

Contributions are welcome! Please create an issue or submit a pull request for any enhancements or bug fixes.
