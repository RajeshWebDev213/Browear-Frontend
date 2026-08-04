import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBag,
  faHeart,
  faUser,
  faSearch,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Cart/CartContext";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function Navbar() {
  const { cartItems } = useCart();
  const { user, logout } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

 const searchData = [
  // 🔹 TOPWEAR CATEGORY
  { label: "Men Shirts", path: "/topwear" },
  { label: "Casual T-Shirts", path: "/topwear" },
  { label: "Formal Shirts", path: "/topwear" },
  { label: "Printed T-Shirts", path: "/topwear" },
  { label: "Oversized T-Shirts", path: "/topwear" },

  // 🔹 BOTTOMWEAR CATEGORY
  { label: "Men Pants", path: "/bottomwear" },
  { label: "Jeans", path: "/bottomwear" },
  { label: "Cargo Pants", path: "/bottomwear" },
  { label: "Track Pants", path: "/bottomwear" },
  { label: "Shorts", path: "/bottomwear" },

  // 🔹 FOOTWEAR CATEGORY
  { label: "Men Shoes", path: "/footwear" },
  { label: "Sneakers", path: "/footwear" },
  { label: "Running Shoes", path: "/footwear" },
  { label: "Casual Shoes", path: "/footwear" },
  { label: "Formal Shoes", path: "/footwear" },
];


  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const filteredData = searchData.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* NAVBAR */}
      <div className="bg-[#111111] h-16 flex items-center justify-between px-4 md:px-10 relative">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/browear-1.png" className="w-10 md:w-14" alt="logo" />
          <img src="/websitename.png" className="hidden md:block h-10" alt="name" />
        </Link>

        {/* 🔍 SEARCH (DESKTOP) */}
        <div className="hidden md:block relative">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search anything..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setOpenSearch(true)}
              className="w-80 h-9 bg-white outline-none px-2 text-black"
            />
            <button
              className="bg-black text-white px-3 py-2 h-9"
              onClick={() => {
                if (filteredData.length > 0) {
                  navigate(filteredData[0].path);
                  setSearch("");
                  setOpenSearch(false);
                }
              }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          {/* 🔽 SEARCH DROPDOWN */}
         {openSearch && search.length > 0 && (
  <div className="absolute top-10 left-0 w-80 max-h-60 overflow-y-auto bg-white border shadow-lg z-50 rounded">
    {filteredData.length > 0 ? (
      filteredData.map((item, index) => (
        <div
          key={index}
          onMouseDown={() => {
            navigate(item.path);
            setSearch("");
            setOpenSearch(false);
          }}
          className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-black"
        >
          {item.label}
        </div>
      ))
    ) : (
      <p className="px-3 py-2 text-gray-500">
        No results found
      </p>
    )}
  </div>
)}

        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6 text-white">

          <Link to="/Whishlist" className="flex gap-1 items-center">
            <FontAwesomeIcon icon={faHeart} />
            Wishlist
          </Link>

          <Link to="/Cart" className="flex gap-1 items-center">
            <FontAwesomeIcon icon={faShoppingBag} />
            Cart
            <span className="font-bold ml-1">{cartItems.length}</span>
          </Link>

          {!user ? (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <Link to="/Account" className="flex gap-1 items-center">
                <FontAwesomeIcon icon={faUser} />
                Account
              </Link>
              <button onClick={handleLogout} className="text-red-400">
                Logout
              </button>
            </>
          )}
        </div>

        {/* MOBILE ICONS */}
        <div className="flex md:hidden items-center gap-4 text-white">
          <Link to="/Cart" className="relative">
            <FontAwesomeIcon icon={faShoppingBag} />
            <span className="absolute -top-2 -right-2 text-xs font-bold">
              {cartItems.length}
            </span>
          </Link>

          <button onClick={() => setOpen(!open)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="bg-[#111111] md:hidden flex flex-col gap-4 p-4 text-white">
          <Link to="/Whishlist">Wishlist</Link>
          <Link to="/Cart">Cart</Link>

          {!user ? (
            <>
              <Link to="/signup">Signup</Link>
              <Link to="/login">Login</Link>
            </>
          ) : (
            <>
              <Link to="/Account">Account</Link>
              <button
                onClick={handleLogout}
                className="text-left text-red-400"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
