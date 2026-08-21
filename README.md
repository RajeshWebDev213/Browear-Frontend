# Browear - Frontend

Browear is a men's fashion e-commerce website built with React.js. The frontend provides the complete shopping experience, from browsing products to managing the cart and wishlist.

The application is responsive and communicates with the Browear backend through REST APIs.

## Features

* Browse products and categories
* View individual product details
* Add products to cart
* Increase or decrease cart quantities
* Remove products from cart
* Add and remove products from wishlist
* User signup and login
* OTP-based account verification
* JWT-based authentication
* Responsive design for desktop, tablet, and mobile
* Protected user functionality

## Tech Stack

* React.js
* JavaScript
* Tailwind CSS
* Vite
* React Router DOM
* Axios
* Framer Motion
* Lucide React

## Project Structure

```text
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

The exact structure may vary depending on the current implementation.

## Getting Started

### Clone the repository

```bash
git clone <your-repository-url>
```

### Move into the frontend directory

```bash
cd frontend
```

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the frontend directory.

```env
VITE_API_URL=http://localhost:5000
```

For production, use the deployed backend URL:

```env
VITE_API_URL=https://your-backend-url.com
```

### Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## Backend Integration

The frontend communicates with the Browear backend using REST APIs.

The API URL is stored in the environment variables so that the same frontend code can be used for both local development and production.

Example:

```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

Axios is used to send requests to the backend.

## Authentication

Browear uses JWT-based authentication.

The general authentication flow is:

```text
Signup
   ↓
OTP Verification
   ↓
Account Creation
   ↓
JWT Token
   ↓
Authenticated User
```

For login:

```text
Login
   ↓
Backend validates credentials
   ↓
JWT Token
   ↓
Authenticated User
```

The token is then used when accessing protected backend APIs.

## Main Pages

The frontend contains pages for:

* Home
* Products
* Product Details
* Cart
* Wishlist
* Login
* Signup
* OTP Verification
* User Account
* Orders

## Build for Production

Create a production build using:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Deployment

The frontend can be deployed on platforms such as Vercel or Netlify.

Before deployment, make sure the production backend URL is configured in the environment variables.

```env
VITE_API_URL=https://your-production-backend-url.com
```

## Environment Variables

Do not commit `.env` files or other files containing secrets to the repository.

Example `.gitignore`:

```text
node_modules
dist
.env
.env.local
```

## Future Improvements

Some features that can be added in the future include:

* Product search
* Advanced filtering and sorting
* Product reviews and ratings
* Online payment integration
* Order tracking
* Coupon and discount support
* Improved user profile management

## Author

Rajesh Podilapu

* Portfolio: https://rajeshpodilapu.vercel.app/
* GitHub: https://github.com/RajeshWebDev213
* LinkedIn: https://www.linkedin.com/in/rajesh-podilapu
