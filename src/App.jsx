import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Header/navbar";
import Footer from "./Footer/footer";
import Signup from "./Header/Signup";
import Login from "./Header/Login";
import OTP from "./Header/OTP";
import Personal from "./Header/Personal";
import Landingpage from "./Landing page/landingpage";
import Cart from "./Cart/Cart";
import Wishlist from "./Wishlist/Wishlist";
import ProductDetails from "./Productdetails/ProductDetails";
import Profile from "./profile/Profile";
import Checkout from "./Cart/Checkout";
import Topwear from "./Products/topwear";
import Bottomwear from "./Products/bottomwear";
import Footwear from "./Products/footwear";
import ScrollToTop from "./components/ScrollToTop";
import AdminDashboard from "./AdminDashboard/AdminPanel";
function App() {
  const location = useLocation();

 const hideHeaderRoutes = [
  "/signup",
  "/Login",
  "/OTP",
  "/personal",
  "/adminpanel"
];

const shouldShowHeader = !hideHeaderRoutes.some(route => 
  location.pathname.toLowerCase().startsWith(route.toLowerCase())
);


  return (
    <div className="min-h-screen flex flex-col">


      {shouldShowHeader && (
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
      )}

      <main
        className={`flex-1 ${
          shouldShowHeader ? "pt-16" : ""
        }`}
      >
           <ScrollToTop />
        <Routes>
          <Route path="/" element={<Landingpage />} />
          <Route path="/Whishlist" element={<Wishlist />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Account" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/OTP" element={<OTP />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/topwear" element={<Topwear />} />
          <Route path="/bottomwear" element={<Bottomwear />} />
          <Route path="/footwear" element={<Footwear />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/trend/:id" element={<ProductDetails />} />
          <Route path="/fiftyoff/:id" element={<ProductDetails />} />
          <Route path="/Checkout" element = {<Checkout/>}/>
          <Route path="/adminpanel" element={<AdminDashboard/>}/>
        </Routes>
      </main>
     {/* <AdminDashboard/> */}
      {/* FOOTER */}
      {shouldShowHeader && <Footer />}
    </div>
  );
}

export default App;
