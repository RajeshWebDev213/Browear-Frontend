import { Routes, Route } from "react-router-dom";

/* ==========================================
   Layouts
========================================== */

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";

/* ==========================================
   Route Guards
========================================== */

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import OTPRoute from "./routes/OTPRoute";
import PersonalRoute from "./routes/PersonalRoute";
import AdminRoute from "./routes/AdminRoute";

/* ==========================================
   Customer Pages
========================================== */

import Home from "./Pages/Home/Home";

import ProductsPage from "./Pages/Products/Products";
import ProductDetails from "./Pages/Products/ProductDetails";

import Topwear from "./Pages/Products/Topwear";
import Bottomwear from "./Pages/Products/Bottomwear";
import Footwear from "./Pages/Products/Footwear";

import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Cart/Checkout";

import Wishlist from "./Pages/Wishlist/Wishlist";

/* ==========================================
   Authentication Pages
========================================== */

import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import OTP from "./Pages/Auth/OTP";
import Personal from "./Pages/Auth/Personal";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";

/* ==========================================
   Admin Pages
========================================== */

import Dashboard from "./Pages/Admin/Dashboard";
import AdminProducts from "./Pages/Admin/Products";
import AddProduct from "./Pages/Admin/AddProduct";
import EditProduct from "./Pages/Admin/EditProduct";

import Orders from "./Pages/Admin/Orders";
import OrderDetails from "./Pages/Admin/OrderDetails";

import Users from "./Pages/Admin/Users";
import UserDetails from "./Pages/Admin/UserDetails";

import Reviews from "./Pages/Admin/Reviews";
import ReviewDetails from "./Pages/Admin/ReviwDetails";

import Settings from "./Pages/Admin/Settings";

/* ==========================================
   Common
========================================== */

import NotFound from "./Pages/NotFound";

import AccountLayout from "./layouts/AccountLayout";

import Account from "./Pages/Profile/Account";
import EditProfile from "./Pages/Profile/EditProfile";
import MyOrders from "./Pages/Profile/MyOrders";
function App() {

  return (

    <Routes>
      <Route
  path="edit"
  element={<EditProfile />}
/>
            {/* ==========================================
          Authentication Routes
      ========================================== */}

      <Route element={<AuthLayout />}>

        <Route

          path="/login"

          element={

            <PublicRoute>

              <Login />

            </PublicRoute>

          }

        />

        <Route

          path="/signup"

          element={

            <PublicRoute>

              <Signup />

            </PublicRoute>

          }

        />

        <Route

          path="/otp"

          element={

            <OTPRoute>

              <OTP />

            </OTPRoute>

          }

        />

        <Route

          path="/personal"

          element={

            <PersonalRoute>

              <Personal />

            </PersonalRoute>

          }

        />

        <Route

          path="/forgot-password"

          element={

            <PublicRoute>

              <ForgotPassword />

            </PublicRoute>

          }

        />

        <Route

          path="/reset-password"

          element={

            <PublicRoute>

              <ResetPassword />

            </PublicRoute>

          }

        />

      </Route>
            {/* ==========================================
          Customer Routes
      ========================================== */}

      <Route element={<MainLayout />}>

        <Route

          path="/"

          element={<Home />}

        />

        <Route

          path="/products"

          element={<ProductsPage />}

        />

        <Route

          path="/products/:id"

          element={<ProductDetails />}

        />

        <Route

          path="/topwear"

          element={<Topwear />}

        />

        <Route

          path="/bottomwear"

          element={<Bottomwear />}

        />

        <Route

          path="/footwear"

          element={<Footwear />}

        />

        <Route

          path="/cart"

          element={

            <ProtectedRoute>

              <Cart />

            </ProtectedRoute>

          }

        />

        <Route

          path="/checkout"

          element={

            <ProtectedRoute>

              <Checkout />

            </ProtectedRoute>

          }

        />

        <Route

          path="/wishlist"

          element={

            <ProtectedRoute>

              <Wishlist />

            </ProtectedRoute>

          }

        />

      </Route>
            {/* ==========================================
          Admin Routes
      ========================================== */}
<Route
  path="/account"
  element={
    <ProtectedRoute>
      <AccountLayout />
    </ProtectedRoute>
  }
>

  <Route
    index
    element={<Account />}
  />

  <Route
    path="orders"
    element={<MyOrders/>}
  />
  <Route
  path="orders/:id"
  element={<OrderDetails />}
/>
  <Route
    path="change-password"
    element={<div>Change Password</div>}
  />

</Route>
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >

        {/* Dashboard */}

        <Route
          index
          element={<Dashboard />}
        />

        {/* Products */}

        <Route
          path="products"
          element={<AdminProducts />}
        />

        <Route
          path="products/add"
          element={<AddProduct />}
        />

        <Route
          path="products/edit/:id"
          element={<EditProduct />}
        />

        {/* Orders */}

        <Route
          path="orders"
          element={<Orders />}
        />

        <Route
          path="orders/:id"
          element={<OrderDetails />}
        />

        {/* Users */}

        <Route
          path="users"
          element={<Users />}
        />

        <Route
          path="users/:userId"
          element={<UserDetails />}
        />

        {/* Reviews */}

        <Route
          path="reviews"
          element={<Reviews />}
        />

        <Route
          path="reviews/:reviewId"
          element={<ReviewDetails />}
        />

        {/* Settings */}

        <Route
          path="settings"
          element={<Settings />}
        />

      </Route>

      {/* ==========================================
          404
      ========================================== */}

      <Route
        path="*"
        element={<NotFound />}
      />

    </Routes>

  );

}

export default App;
  