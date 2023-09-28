# DineTable - Table Reservation Management System

DineTable is a full-stack table reservation management system built upon Next.js 13, React, PostgreSQL, and Prisma. This application facilitates table reservations for restaurants and provides user roles for customers, restaurant owners, and administrators.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)

## Features

DineTable offers the following key features:

### User Roles

- **Customers:** Customers can browse available restaurants, view their menus, and make table reservations.
- **Restaurant Owners:** Restaurant owners can manage their restaurant's profile, menu, and view reservation details.
- **Admin:** Administrators have access to manage user accounts and restaurant listings.

### Table Reservations

- Customers can select a restaurant, choose a date and time, and make a reservation.
- Restaurant owners can view and confirm reservations.
- Implemented smart table allocation system based on table size and party size(number of people reserving)

### Restaurant Management

- Restaurant owners can add and update their restaurant's information and menu items.

### User Authentication

Secure user authentication system for all user roles.

### Database Integration

- [PostgreSQL](https://www.postgresql.org/): An open-source relational database system.
- [Prisma](https://www.prisma.io/): A modern database toolkit for TypeScript and Node.js.

## Technologies Used

DineTable is built using the following technologies:

- [Next.js 13](https://nextjs.org/): A React framework for server-rendered React applications.
- [React](https://reactjs.org/): A JavaScript library for building user interfaces.
- [PostgreSQL](https://www.postgresql.org/): An open-source relational database system.
- [Prisma](https://www.prisma.io/): A modern database toolkit for TypeScript and Node.js.
- [Vercel](https://vercel.com/): A cloud platform for serverless deployment.

## Installation

To run DineTable locally, follow these steps:

1. **Clone the repository:**

   `git clone https://github.com/your-username/dinetable.git`

2. **Navigate to the project directory:**

   `cd dinetable`

3. **Install the project dependencies:**

   `npm install`

4. **Set up your PostgreSQL database and update the database connection configuration in the .env file.**

5. **Run the command create the necessary database schema:**

   `npx prisma db push`

6. **Start the development server:**

   `npm run dev`

7. **Access the application in your web browser at http://localhost:3000.**

## Usage

DineTable is designed to serve three primary user roles: Customers, Restaurant Owners, and Admins.

### Customer Role

1. **Registration/Login:**

   - Register as a customer if you don't have an account, or log in if you already have one.

2. **Browsing Restaurants:**

   - After logging in, browse through the list of available restaurants.

3. **Viewing Menus:**

   - Select a restaurant to view its menu and details.

4. **Making Reservations:**
   - Choose your desired restaurant, date, and time.
   - Make a reservation for a table.

### Restaurant Owner Role

1. **Request for ownership:**

   - Login as a customer and request for business oppurtunity to the admin by filling a form

2. **Managing Restaurant Profile:**

   - After logging in, you can manage your restaurant's profile.
   - Update restaurant information, such as name, address, and contact details , cuisines and image gallery

3. **Managing Menu Items:**

   - Add, edit, or delete menu items.
   - Keep your menu up-to-date with the latest offerings.

4. **Viewing Reservations:**
   - View reservation requests from customers.
   - Confirm or reject reservation requests.

### Admin Role

1. **Registration/Login:**

   - Register as an administrator if you don't have an account, or log in if you already have one.

2. **User Account Management:**

   - As an admin, you can manage user accounts.
   - Add, edit, or delete user accounts as needed.

3. **Restaurant Listing Management:**
   - Admins can manage restaurant listings.
   - Add, edit, or remove restaurant listings from the platform.


## Deployment

DineTable is deployed on Vercel and uses Vercel's PostgreSQL database for production.
