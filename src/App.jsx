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