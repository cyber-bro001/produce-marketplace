# Ketlam

A full-stack web application that connects agricultural produce sellers with buyers through a centralized online marketplace.

## Overview

Ketlam is designed to simplify the process of buying and selling agricultural produce. Sellers can create and manage produce listings with images, while buyers can browse products, view product details, and place orders through an intuitive web interface.

The application implements secure authentication, role-based authorization, product management, image uploads, and order management, demonstrating the core functionality of a modern e-commerce platform.

## Features

- User registration and authentication using JWT
- Role-based access (Buyer & Seller)
- Product CRUD operations
- Product image upload
- Browse and search available products
- Place orders
- Seller order management
- Order status updates:
  - Pending
  - Confirmed
  - Completed
  - Cancelled
- Responsive user interface

## Tech Stack

### Frontend

- React
- TypeScript
- Tailwind CSS
- Axios
- Vite

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- JSON Web Tokens (JWT)

### File Upload

- Multer

### Deployment

- Vercel (Frontend)
- Render (Backend)

## Project Structure

```text
produce-marketplace/
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   ├── app.js
│   │   └── server.js
│   └── package.json
│
└── README.md
```

## Installation

### Clone the repository

```bash
git clone https://github.com/cyber-bro001/produce-marketplace.git
```

### Backend

```bash
cd server
npm install
npm run dev
```

### Frontend

```bash
cd client
npm install
npm run dev
```

## Environment Variables

### Backend (`.env`)

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5000
```

### Frontend (`.env`)

```env
VITE_API_URL=http://localhost:3000/api
```

## User Roles

### Buyer

- Browse products
- View product details
- Place orders

### Seller

- Create product listings
- Update product information
- Manage incoming orders
- Update order status

## Order Workflow

```text
Buyer
   │
   ▼
Browse Products
   │
   ▼
Place Order
   │
   ▼
Seller Receives Order
   │
   ▼
Update Status
   │
   ├── Pending
   ├── Confirmed
   ├── Completed
   └── Cancelled
```

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Retrieve all products |
| GET | `/api/products/:id` | Retrieve a single product |
| POST | `/api/products` | Create a product |
| PUT | `/api/products/:id` | Update a product |
| DELETE | `/api/products/:id` | Delete a product |

### Orders

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place an order |
| GET | `/api/orders` | Retrieve orders |
| PATCH | `/api/orders/:id` | Update order status |

Frontend:
```
https://produce-marketplace-pink.vercel.app/
```

Backend API:
```
https://produce-marketplace-server.onrender.com
```

Demo Video:
```
https://youtu.be/ysmROOUz83Q?si=4NEhRzoaYIkK8zvb
```

## Future Improvements

- Cloudinary image storage
- Online payment integration
- Product reviews and ratings
- Wishlist functionality
- Email notifications
- Real-time order updates
- Admin dashboard

## Author

**Kay**

Software Developer | Full-Stack Engineer

GitHub: https://github.com/cyber-bro001

LinkedIn: wwww.linkedin.com/in/victor-okwuwa-4b237335a

## License

This project is intended for educational and portfolio purposes.
