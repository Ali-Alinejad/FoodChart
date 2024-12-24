# 🍽️ Food Reserve Employee

## Introduction

The **Food Reserve Employee** application is a Vue.js-based web application designed to help employees reserve their meals for the week. The application provides a user-friendly interface for viewing the weekly menu, selecting meals, and managing orders. It also includes a login system to ensure that only authorized users can access the reservation features.

## Features

- 📅 **Weekly Menu Display**: View the weekly menu with options for each day.
- 🍲 **Meal Selection**: Select meals for each day from the available options.
- 📝 **Order Management**: Place new orders, update existing orders, and delete orders.
- 🔒 **Login System**: Secure login system to authenticate users.
- 📱 **Responsive Design**: Optimized for both desktop and mobile devices.

## Components

### `Reserve.vue`

This component is responsible for displaying the weekly menu and allowing users to select and manage their meal orders.

#### Key Features:
- 📋 Fetches the weekly menu and orders from the API.
- 🍽️ Displays the menu items for each day.
- ✅ Allows users to select meals and place orders.
- ❌ Provides functionality to delete existing orders.

### `Login.vue`

This component handles the user authentication process.

#### Key Features:
- 🔑 Provides a login form for users to enter their credentials.
- 🔐 Authenticates users and stores the access token in local storage.
- 🚀 Redirects authenticated users to the reservation page.

## API Integration

The application integrates with a backend API to fetch the weekly menu and manage orders. The API endpoints used are:
- `GET /weekly-menu/`: Fetches the weekly menu.
- `GET /order/`: Fetches the user's orders.
- `POST /order/`: Places a new order.
- `PUT /order/:id/`: Updates an existing order.
- `DELETE /order/:id/`: Deletes an order.
- `POST /auth/jwt/create`: Authenticates the user and returns a JWT token.

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/FoodReserveEmployee.git
   cd FoodReserveEmployee
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the API base URL:
   ```env
   VITE_API_BASE_URL=http://your-api-url
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

1. **🔑 Login**: Enter your username and password to log in.
2. **📅 View Menu**: Navigate to the reservation page to view the weekly menu.
3. **🍽️ Select Meals**: Click on the meal options to select your preferred meals for each day.
4. **📝 Manage Orders**: Use the delete button to remove any unwanted orders.

## Picture Demo

Here are some screenshots of the application in action:

### Login Page
![Login Page](https://github.com/yourusername/FoodReserveEmployee/issues/1#issue-1)

### Weekly Menu
![Weekly Menu](https://github.com/yourusername/FoodReserveEmployee/issues/2#issue-2)

### Meal Selection
![Meal Selection](https://github.com/yourusername/FoodReserveEmployee/issues/3#issue-3)

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
