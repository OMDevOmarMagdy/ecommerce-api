# E-Commerce API Documentation

A fully-featured RESTful API for an E-Commerce platform built using Node.js, Express, and MongoDB. This API provides all the essential backend functionalities required to power a modern e-commerce web or mobile application.

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

---

## 🛠️ Tech Stack & Technologies
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building the REST API.
- **MongoDB**: NoSQL Database for storing structured data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JWT (JSON Web Tokens)**: Used for secure user authentication and authorization.
- **Bcrypt.js**: For hashing user passwords securely.
- **Joi**: For request payload validation.
- **Cors**: Cross-Origin Resource Sharing middleware.
- **Dotenv**: Environment variable management.

---

## ✨ Key Features & Capabilities

The application revolves around four primary building blocks: **Auth/Users**, **Products**, **Carts**, and **Orders**.

### 1. 🔐 User Authentication & Authorization
- **Registration & Login**: Users can sign up and log in securely. Passwords are encrypted using `bcryptjs`.
- **JWT Protection**: Protected routes require a valid JSON Web Token passed in the headers.
- **Role-Based Access Control (RBAC)**: Distinguishes between standard `user` and `admin`. Admin accounts have elevated privileges to manage products and view all orders.

### 2. 🛍️ Product Management
- **CRUD Operations**: Support for creating, reading, updating, and deleting products (Admins only for C/U/D).
- **Extensive Product Details**: Each product tracks name, description, price, category, brand, stock, images, ratings, number of reviews, and tags.
- **Recommendations**: An endpoint dedicated to fetching product recommendations.
- **Performance Optimized**: Database indexing on Categories and Prices for quick searching and sorting.

### 3. 🛒 Cart System
- **User Carts**: Each authenticated user has a personalized shopping cart.
- **Dynamic Cart Management**: Users can add products, specify quantities, and remove items from their carts.
- **Total Pricing**: Automatically calculates and tracks the total price of the items in the cart.

### 4. 📦 Order Management
- **Order Placement**: Users can convert their cart items into a formal order, providing shipping addresses and payment methods.
- **Pricing Breakdown**: Calculates items price, tax, shipping costs, and a final total price.
- **Order Tracking**: Users can view their own order history (`/myorders`). Admins can view all orders across the platform.
- **Status Updates**: Admins and system processes can update an order's payment status (`isPaid`, `paidAt`) and delivery status (`isDelivered`, `deliveredAt`).

---

## 🗄️ Database Models (Schemas)

### 1. User
- `name`, `email`, `password`
- `role`: 'user' or 'admin' 

### 2. Product
- `name`, `description`, `category`, `brand`, `tags`
- `price`, `stock`
- `image`
- `rating`, `numReviews`
- `user`: References the Admin who created it.

### 3. Cart
- `user`: References the cart owner.
- `items`: Array of products (`product` ID, `quantity`, `price`).
- `totalPrice`

### 4. Order
- `user`: Order owner.
- `orderItems`: Snapshot of the products ordered, quantity, and price.
- `shippingAddress`: Includes `address`, `city`, `postalCode`, `country`.
- `paymentMethod` & `paymentResult` (integration details).
- `itemsPrice`, `taxPrice`, `shippingPrice`, `totalPrice`.
- `isPaid`, `paidAt`, `isDelivered`, `deliveredAt`.

---

## 📡 API Endpoints Reference

### 🔐 Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/register` | Public | Register a new user account |
| POST | `/login` | Public | Authenticate a user and get token |
| GET | `/profile` | Private (User/Admin) | Get the current logged-in user's profile |

### 🛍️ Products (`/api/products`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/` | Public | Get all products |
| POST | `/` | Private (Admin) | Create a new product |
| GET | `/:id` | Public | Get a specific product by ID |
| PUT | `/:id` | Private (Admin) | Update an existing product |
| DELETE| `/:id` | Private (Admin) | Delete a product |
| GET | `/:id/recommendations` | Public | Get product recommendations |

### 🛒 Cart (`/api/cart`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/` | Private (User) | Get the current user's active cart |
| POST | `/` | Private (User) | Add a product to the cart |
| DELETE| `/:productId` | Private (User) | Remove a specific product from the cart |

### 📦 Orders (`/api/orders`)
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/` | Private (User) | Create a new order |
| GET | `/` | Private (Admin) | Get all orders in the system |
| GET | `/myorders` | Private (User) | Get the logged-in user's order history |
| GET | `/:id` | Private (User/Admin)| Get an order by ID |
| PUT | `/:id/pay` | Private (User/Admin)| Update order status to paid |
| PUT | `/:id/deliver` | Private (Admin) | Update order status to delivered |

---

## 🚀 Getting Started Locally

1. **Clone/Download the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Environment Setup**:
   Create a `.env` file in the root directory and configure:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. **Seed the database (Optional)**:
   You can populate the database with sample data.
   ```bash
   npm run seed
   ```
5. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5000` (or whatever `PORT` you specified).
