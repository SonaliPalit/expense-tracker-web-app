# Expense Tracker

The Expense Tracker is a single-page application designed to help users easily track and manage their expenses. Users can add expenses with details such as name, type, date, and amount. The app employs a client-server architecture with the frontend managing the user interface and the backend handling API endpoints and database interactions.

## Project Architecture

The project is organized into two main folders:

- **Client:**
  - `index.html`: Defines the HTML structure of the application.
  - `style.css`: Provides styling for a user-friendly and visually appealing interface.
  - `app.js`: Handles client-side scripting, including user interaction event handlers and fetch calls to communicate with the server.

- **Server:**
  - `index.js`: Manages CRUD operations (Create, Read, Update, Delete) using the Express module.
  - **Database Connection**: Connects to a MongoDB database hosted on MongoDB Atlas.

## Database Configuration

The project uses MongoDB Atlas. To configure and connect to the database:
1. **Create an Account**: Sign up on the MongoDB Atlas website.
2. **Create a Cluster**: Set up a cluster for the database infrastructure.
3. **Configure IP Whitelist**: Add your machine's IP for authorized access.
4. **Copy Connection String**: Obtain the connection string from the cluster dashboard.
5. **Update `index.js`**: Replace the `uri` variable in `index.js` with the connection string.

## Local Setup

To run the Expense Tracker application locally:

1. **Install Node.js**: [Download Node.js](https://nodejs.org/) if not already installed.
2. **Install Dependencies**: Open a terminal, navigate to the root directory, and run:
   ```bash
   npm install
3. **Start the Application**:
  - Navigate to the server folder:
    ```bash
     cd server
  - Start the server:
    ```bash
    npm start

## Key Features

### 1. Add Expense Form
Users can add expenses through a form with the following fields:
- **Expense Name**: Identifier for the expense.
- **Type**: Dropdown menu for categorizing the expense (Utilities, Rent, Groceries, or Other).
- **Date**: Date picker for the expense date.
- **Amount**: Numerical input for the expense amount.

Upon clicking "Add Expense," the data is sent to the server to update both the database and frontend. Validation is provided to ensure correct input formats.

### 2. Display of Expenses
Expenses are displayed in a table format, allowing users to review spending patterns and past transactions. Expenses are organized by the order they were added.

### 3. Update and Delete Functionality
Each expense record has:
- **Update**: Opens a modal for modifying any field of the selected expense. Changes update the database and frontend.
- **Delete**: Removes the expense from both the database and frontend.

### 4. Highest Expense Information
The application tracks the highest expense and stores it locally in the user's browser, offering quick access to financial insights.

