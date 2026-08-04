import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

import Home from "./Pages/Home/Home";

import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import OTP from "./Pages/Auth/OTP";
import Personal from "./Pages/Auth/Personal";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";

import OTPRoute from "./routes/OTPRoute";
import PersonalRoute from "./routes/PersonalRoute";
import Checkout from "./Pages/Cart/Checkout";
import Cart from "./Pages/Cart/Cart";
import NotFound from "./Pages/NotFound";
import ProductSkeleton from "./components/Product/ProductSkeleton";
import ProductCard from "./components/Product/ProductCard";
import ProductFilter from "./components/Product/ProductFilter";
function App() {
  return (
    <>
    <ProductFilter/>
    </>
    // <Routes>

    //   {/* Home */}

    //   <Route
    //     path="/"
    //     element={
    //       <>
    //         <Navbar />
    //         <Home />
    //         <Footer />
    //       </>
    //     }
    //   />

    //   {/* Authentication */}

    //   <Route path="/login" element={<Login />} />

    //   <Route path="/signup" element={<Signup />} />

    //   <Route
    //     path="/otp"
    //     element={
    //       <OTPRoute>
    //         <OTP />
    //       </OTPRoute>
    //     }
    //   />

    //   <Route
    //     path="/personal"
    //     element={
    //       <PersonalRoute>
    //         <Personal />
    //       </PersonalRoute>
    //     }
    //   />

    //   <Route
    //     path="/forgot-password"
    //     element={<ForgotPassword />}
    //   />

    //   <Route
    //     path="/reset-password"
    //     element={<ResetPassword />}
    //   />

    //   {/* 404 */}

    //   <Route path="*" element={<NotFound />} />

    // </Routes>

  );
}

export default App;