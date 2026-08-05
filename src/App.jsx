import { Routes, Route } from "react-router-dom";

/* ===========================
   Layouts
=========================== */

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

/* ===========================
   Route Guards
=========================== */

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import OTPRoute from "./routes/OTPRoute";
import PersonalRoute from "./routes/PersonalRoute";

/* ===========================
   Customer Pages
=========================== */

import Home from "./Pages/Home/Home";

import Products from "./Pages/Products/Products";
import ProductDetails from "./Pages/Products/ProductDetails";
import Topwear from "./Pages/Products/Topwear";
import Bottomwear from "./Pages/Products/Bottomwear";
import Footwear from "./Pages/Products/Footwear";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Cart/Checkout";

import Wishlist from "./Pages/Wishlist/Wishlist";
 

// import Account from "./Pages/Profile/Account";

/* ===========================
   Authentication Pages
=========================== */

import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import OTP from "./Pages/Auth/OTP";
import Personal from "./Pages/Auth/Personal";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";

/* ===========================
   Common
=========================== */

import NotFound from "./Pages/NotFound";

import AdminLayout from "./layouts/AdminLayout";

import AdminRoute from "./routes/AdminRoute";

import Dashboard from "./Pages/Admin/Dashboard";
import Products from "./Pages/Admin/Products";
import AddProduct from "./Pages/Admin/AddProduct";
import EditProduct from "./Pages/Admin/EditProduct";
import Orders from "./Pages/Admin/Orders";
import OrderDetails from "./Pages/Admin/OrderDetails";
import Users from "./Pages/Admin/Users";
import UserDetails from "./Pages/Admin/OrderDetails";
import Reviews from "./Pages/Admin/Reviews";
function App() {
  return (
    <Routes>

      {/* ==========================================
          Authentication Layout
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
          Main Layout
      ========================================== */}
{/* ==========================================
    Main Layout
========================================== */}

<Route element={<MainLayout />}>

  <Route
    path="/"
    element={<Home />}
  />

  <Route
    path="/products"
    element={<Products />}
  />
  

  <Route
    path="/products/:id"
    element={<ProductDetails />}
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
  <Route path="/topwear" element={<Topwear/>}/>
   <Route path="/bottomwear" element={<Bottomwear/>}/>
    <Route path="/footwear" element={<Footwear/>}/>
  {/*
  <Route
    path="/account"
    element={
      <ProtectedRoute>
        <Account />
      </ProtectedRoute>
    }
  />
  */}

</Route>
{/* ==========================================
    Admin Layout
========================================== */}

<Route
  element={
    <AdminRoute>

      <AdminLayout />

    </AdminRoute>
  }
>

  <Route
    path="/admin"
    element={<Dashboard />}
  />

</Route>
<Route
  path="/admin/products"
  element={<Products />}
/>

<Route
  path="/admin/products/add"
  element={<AddProduct />}
/>

<Route
  path="/admin/products/edit/:id"
  element={<EditProduct />}
/>
<Route

  path="/admin/orders"

  element={<Orders />}

/>
<Route

  path="/admin/orders/:id"

  element={<OrderDetails />}

/>
<Route

  path="/admin/users"

  element={<Users />}

/>
<Route
  path="/admin/users/:userId"
  element={<UserDetails />}
/>
<Route

  path="/admin/reviews"

  element={<Reviews />}

/>
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