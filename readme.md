
# Library Management System

## Table of Contents

- [Library Management System](#library-management-system)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
    - [Prerequisites](#prerequisites)
  - [Directory Structure](#directory-structure)
  - [API Endpoints](#api-endpoints)
    - [User Routes](#user-routes)
      - [Register User](#register-user)
      - [Login User](#login-user)
      - [Get User Details (Protected)](#get-user-details-protected)
    - [Book Routes](#book-routes)
      - [Add Book (Admin)](#add-book-admin)
      - [Get All Books](#get-all-books)
      - [Get Book Details](#get-book-details)
      - [Update Book (Admin)](#update-book-admin)
      - [Delete Book (Admin)](#delete-book-admin)
    - [Borrow/Return Book Routes](#borrowreturn-book-routes)
      - [Borrow Book](#borrow-book)
      - [Return Book](#return-book)
  - [Usage](#usage)
    - [User Registration](#user-registration)
    - [User Login](#user-login)
    - [Viewing Books](#viewing-books)
    - [Borrowing a Book](#borrowing-a-book)
    - [Returning a Book](#returning-a-book)

## Introduction

The Library Management System is a web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) to manage library operations such as book cataloging, user authentication, and book borrowing/returning.

## Features

- User registration and authentication
- Book catalog management
- Borrowing and returning books
- User dashboard to view borrowed books
- Admin functionalities for managing books and users

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)

### Prerequisites

- Node.js and npm
- MongoDB

## Directory Structure

```plaintext
library-management-system/
│
├── backend/
│   ├── models/
│   │   ├── Book.js
│   │   └── User.js
│   ├── routes/
│   │   ├── books.js
│   │   └── users.js
│   ├── controllers/
│   ├── server.js
│   └── .env
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Register.js
│   │   │   ├── Login.js
│   │   │   ├── BookList.js
│   │   │   ├── UserDashboard.js
│   │   │   └── Home.js
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   └── package.json
│
├── .gitignore
├── README.md
└── package.json
```

## API Endpoints

### User Routes

#### Register User

- **Path**: `/api/users/register`
- **Method**: POST
- **Request Body**: `{ username, password }`
- **Response**: User data or error message.

#### Login User

- **Path**: `/api/users/login`
- **Method**: POST
- **Request Body**: `{ username, password }`
- **Response**: JWT token or error message.

#### Get User Details (Protected)

- **Path**: `/api/users/:id`
- **Method**: GET
- **Headers**: `{ Authorization: Bearer <token> }`
- **Response**: User data or error message.

### Book Routes

#### Add Book (Admin)

- **Path**: `/api/books`
- **Method**: POST
- **Request Body**: `{ title, author, isbn, available }`
- **Response**: Book data or error message.

#### Get All Books

- **Path**: `/api/books`
- **Method**: GET
- **Response**: Array of book data or error message.

#### Get Book Details

- **Path**: `/api/books/:id`
- **Method**: GET
- **Response**: Book data or error message.

#### Update Book (Admin)

- **Path**: `/api/books/:id`
- **Method**: PUT
- **Request Body**: `{ title, author, isbn, available }`
- **Response**: Updated book data or error message.

#### Delete Book (Admin)

- **Path**: `/api/books/:id`
- **Method**: DELETE
- **Response**: Success message or error message.

### Borrow/Return Book Routes

#### Borrow Book

- **Path**: `/api/books/:id/borrow`
- **Method**: POST
- **Headers**: `{ Authorization: Bearer <token> }`
- **Response**: Success message or error message.

#### Return Book

- **Path**: `/api/books/:id/return`
- **Method**: POST
- **Headers**: `{ Authorization: Bearer <token> }`
- **Response**: Success message or error message.

## Usage

### User Registration

1. Navigate to the `/register` page.
2. Fill in the registration form with a username and password.
3. Submit the form to create a new account.

### User Login

1. Navigate to the `/login` page.
2. Fill in the login form with your username and password.
3. Submit the form to log in and receive a JWT token.

### Viewing Books

1. Navigate to the `/books` page.
2. Browse the list of available books.

### Borrowing a Book

1. Ensure you are logged in.
2. Navigate to the `/books/:id` page of the book you wish to borrow.
3. Click the "Borrow" button to borrow the book.

### Returning a Book

1. Ensure you are logged in.
2. Navigate to your user dashboard at `/dashboard`.
3. Click the "Return" button next to the book you wish to return.
