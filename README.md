# Ecommerce API

A fully-featured E-commerce RESTful API built with Node.js, Express, and MongoDB.

## 📂 Project Structure (`src` folder):

- **`config/`**: Contains configuration files, such as `db.js` for MongoDB connection.
- **`controllers/`**: Contains the core logic for each route, handling incoming requests and sending responses. (e.g., `authController.js` handles login and registration).
- **`models/`**: Defines the data schema for MongoDB collections. (e.g., `User.js`, `Product.js`, `Cart.js`, `Order.js`).
- **`routes/`**: Defines the API endpoints and maps them to the appropriate controller functions. (e.g., `/api/auth/login`).
- **`middlewares/`**: Custom middleware functions that run between receiving a request and reaching the controller. (e.g., `authMiddleware.js` verifies JWT tokens).
- **`services/`**: Encapsulates complex business logic and database interactions to keep controllers clean and focused.
- **`utils/`**: Reusable utility functions and helpers. (e.g., `generateToken.js` for JWT, `apiFeatures.js` for pagination and filtering).
- **`validations/`**: Contains data validation logic to ensure incoming request payloads are correct before processing them. (e.g., Joi validations in `authValidation.js`).

## 📄 Core Files:
- **`app.js`**: Sets up the Express application, configures global middlewares (like CORS and JSON parsing), and mounts all the application routes.
- **`server.js`**: The main entry point of the application. It connects to the database and starts the server listening on the specified port.
- **`.env`**: Stores environment variables such as the database connection string (`MONGO_URI`), server port (`PORT`), and secrets (`JWT_SECRET`).

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment Variables:**
   Update the `.env` file with your specific MongoDB URI and JWT Secret.

3. **Run the server:**
   ```bash
   npm start
   ```
   *Note: You may need to add a start script in your `package.json` like `"start": "node server.js"` or `"dev": "nodemon server.js"`.*
