import { Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import AdminLayout from "./layouts/AdminLayout";
import AccountLayout from "./layouts/AccountLayout";

// Route guards
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import OTPRoute from "./routes/OTPRoute";
import PersonalRoute from "./routes/PersonalRoute";
import AdminRoute from "./routes/AdminRoute";

// Auth pages
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import OTP from "./Pages/Auth/OTP";
import Personal from "./Pages/Auth/Personal";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import ResetPassword from "./Pages/Auth/ResetPassword";

// Customer pages
import Home from "./Pages/Home/Home";
import ProductsPage from "./Pages/Products/Products";
import ProductDetails from "./Pages/Products/ProductDetails";
import Topwear from "./Pages/Products/Topwear";
import Bottomwear from "./Pages/Products/Bottomwear";
import Footwear from "./Pages/Products/Footwear";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Cart/Checkout";
import Wishlist from "./Pages/Wishlist/Wishlist";

// Profile pages
import Account from "./Pages/Profile/Account";
import EditProfile from "./Pages/Profile/EditProfile";
import MyOrders from "./Pages/Profile/MyOrders";
import ProfileOrderDetails from "./Pages/Profile/OrderDetails";
import ChangePassword from "./Pages/Profile/ChangePassword";

// Admin pages
import Dashboard from "./Pages/Admin/Dashboard";
import AdminProducts from "./Pages/Admin/Products";
import AddProduct from "./Pages/Admin/AddProduct";
import EditProduct from "./Pages/Admin/EditProduct";
import Orders from "./Pages/Admin/Orders";
import AdminOrderDetails from "./Pages/Admin/OrderDetails";
import Users from "./Pages/Admin/Users";
import UserDetails from "./Pages/Admin/UserDetails";
import Reviews from "./Pages/Admin/Reviews";
import ReviewDetails from "./Pages/Admin/ReviwDetails";
import Settings from "./Pages/Admin/Settings";

// Common
import notFound from "./Pages/Notfound/Notfound";

function App() {
  return (
    <Routes>
      {/* Auth routes */}
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

      {/* Customer routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/topwear" element={<Topwear />} />
        <Route path="/bottomwear" element={<Bottomwear />} />
        <Route path="/footwear" element={<Footwear />} />

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

        {/* Account routes */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <AccountLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Account />} />
          <Route path="edit" element={<EditProfile />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="orders/:id" element={<ProfileOrderDetails />} />
          <Route path="change-password" element={<ChangePassword />} />
        </Route>
      </Route>

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />

        <Route path="products" element={<AdminProducts />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/edit/:id" element={<EditProduct />} />

        <Route path="orders" element={<Orders />} />
        <Route path="orders/:id" element={<AdminOrderDetails />} />

        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<UserDetails />} />

        <Route path="reviews" element={<Reviews />} />
        <Route path="reviews/:reviewId" element={<ReviewDetails />} />

        <Route path="settings" element={<Settings />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<notFound/>} />
    </Routes>
  );
}

export default App;