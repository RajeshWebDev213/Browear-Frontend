import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import { useCart } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo/browear-1.png"
import brand from "../../assets/logo/websitename.png"

export default function Navbar() {

  const { cartItems } = useCart();
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    setMobileMenu(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const searchData = [

    // Topwear
    { label: "Men Shirts", path: "/topwear" },
    { label: "Casual T-Shirts", path: "/topwear" },
    { label: "Formal Shirts", path: "/topwear" },
    { label: "Printed T-Shirts", path: "/topwear" },
    { label: "Oversized T-Shirts", path: "/topwear" },

    // Bottomwear
    { label: "Jeans", path: "/bottomwear" },
    { label: "Cargo Pants", path: "/bottomwear" },
    { label: "Track Pants", path: "/bottomwear" },
    { label: "Shorts", path: "/bottomwear" },

    // Footwear
    { label: "Sneakers", path: "/footwear" },
    { label: "Running Shoes", path: "/footwear" },
    { label: "Casual Shoes", path: "/footwear" },
    { label: "Formal Shoes", path: "/footwear" },

  ];

  const filteredData = searchData.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <header className="sticky top-0 z-50 bg-zinc-950 backdrop-blur-xl border-b border-gray-200">

        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

          {/* Logo */}

          <Link
            to="/"
            className="flex items-center gap-3"
          >

            <img
              src={logo}
              alt="logo"
              className="w-11 h-11 object-contain"
            />

            <img
              src={brand}
              alt="Browear"
              className="hidden md:block h-9"
            />

          </Link>

          {/* Search */}

          <div className="hidden lg:flex relative">

            <div className="flex items-center bg-gray-100 rounded-full px-4 h-12 w-[380px]">

              <Search
                size={18}
                className="text-gray-500"
              />

              <input

                type="text"

                value={search}

                placeholder="Search products..."

                onFocus={() => setShowSearch(true)}

                onChange={(e) =>
                  setSearch(e.target.value)
                }

                className="
                bg-transparent
                outline-none
                px-3
                w-full
                text-sm
                placeholder:text-gray-400
                "

              />

            </div>

            {/* Search dropdown comes in Part 2 */}

          </div>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-7">

            <Link
              to="/wishlist"
              className="
              transition
              hover:text-white
              text-white
              "
            >
              <Heart size={22} />
            </Link>

            <Link
              to="/cart"
              className="relative"
            >

              <ShoppingBag
                size={22}
                className="text-white"
              />

              {cartItems.length > 0 && (

                <span
                  className="
                  absolute
                  -top-2
                  -right-2
                  w-5
                  h-5
                  rounded-full
                  bg-black
                  text-white
                  text-[10px]
                  flex
                  items-center
                  justify-center
                  "
                >

                  {cartItems.length}

                </span>

              )}

            </Link>

            {!user ? (

              <>

                <Link
                  to="/login"
                  className="
                  text-white
                  hover:text-white
                  transition
                  "
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="
                  bg-black
                  text-white
                  px-5
                  py-2.5
                  rounded-full
                  hover:bg-gray-900
                  transition
                  "
                >
                  Signup
                </Link>

              </>

            ) : (

              <div className="flex items-center gap-5">

                <Link
                  to="/account"
                  className="
                  flex
                  items-center
                  gap-2
                  text-gray-700
                  hover:text-black
                  transition
                  "
                >

                  <User size={20} />

                  <span className="hidden lg:block">
                    {user.fullname}
                  </span>

                </Link>

                <button
                  onClick={handleLogout}
                  className="
                  flex
                  items-center
                  gap-2
                  text-red-500
                  hover:text-red-600
                  transition
                  "
                >

                  <LogOut size={18} />

                  Logout

                </button>

              </div>

            )}

          </div>

          {/* Mobile Menu Button */}

          <button

            onClick={() =>
              setMobileMenu(!mobileMenu)
            }

            className="md:hidden"

          >

            {mobileMenu ? (
              <X size={28} />
            ) : (
              <Menu size={28} />
            )}

          </button>

        </div>

        {/* Mobile Menu & Search Dropdown will be added in Part 2 */}

      </header>
              {/* ================= SEARCH DROPDOWN ================= */}

        {showSearch && search.length > 0 && (

          <div
            className="
            absolute
            top-20
            left-1/2
            -translate-x-1/2
            w-[380px]
            bg-white
            rounded-2xl
            shadow-2xl
            border
            border-gray-100
            overflow-hidden
            hidden
            lg:block
            "
          >

            {filteredData.length > 0 ? (

              filteredData.map((item, index) => (

                <button

                  key={index}

                  onMouseDown={() => {

                    navigate(item.path);

                    setSearch("");

                    setShowSearch(false);

                  }}

                  className="
                  w-full
                  text-left
                  px-5
                  py-3
                  hover:bg-gray-50
                  transition
                  "

                >

                  {item.label}

                </button>

              ))

            ) : (

              <div className="p-5 text-gray-500">

                No products found

              </div>

            )}

          </div>

        )}

        {/* ================= MOBILE MENU ================= */}

        {mobileMenu && (

          <div
            className="
            md:hidden
            border-t
            border-gray-200
            bg-white
            px-6
            py-6
            space-y-5
            "
          >

            {/* Mobile Search */}

            <div className="flex items-center bg-gray-100 rounded-full px-4 h-11">

              <Search
                size={18}
                className="text-gray-500"
              />

              <input

                value={search}

                onChange={(e) =>
                  setSearch(e.target.value)
                }

                placeholder="Search..."

                className="
                bg-transparent
                outline-none
                px-3
                w-full
                text-sm
                "

              />

            </div>

            {/* Search Result */}

            {search.length > 0 && (

              <div className="rounded-xl border border-gray-200 overflow-hidden">

                {filteredData.length > 0 ? (

                  filteredData.map((item, index) => (

                    <button

                      key={index}

                      onClick={() => {

                        navigate(item.path);

                        setSearch("");

                        setMobileMenu(false);

                      }}

                      className="
                      w-full
                      text-left
                      px-4
                      py-3
                      hover:bg-gray-50
                      "

                    >

                      {item.label}

                    </button>

                  ))

                ) : (

                  <div className="px-4 py-3 text-gray-500">

                    No products found

                  </div>

                )}

              </div>

            )}

            <Link

              to="/wishlist"

              className="
              flex
              items-center
              gap-3
              text-gray-700
              "

            >

              <Heart size={20} />

              Wishlist

            </Link>

            <Link

              to="/cart"

              className="
              flex
              items-center
              justify-between
              text-gray-700
              "

            >

              <div className="flex items-center gap-3">

                <ShoppingBag size={20} />

                Cart

              </div>

              <span className="font-semibold">

                {cartItems.length}

              </span>

            </Link>

            {!user ? (

              <>

                <Link

                  to="/login"

                  className="
                  block
                  text-center
                  border
                  rounded-full
                  py-3
                  "

                >

                  Login

                </Link>

                <Link

                  to="/signup"

                  className="
                  block
                  text-center
                  rounded-full
                  py-3
                  bg-black
                  text-white
                  "

                >

                  Create Account

                </Link>

              </>

            ) : (

              <>

                <Link

                  to="/account"

                  className="
                  flex
                  items-center
                  gap-3
                  "

                >

                  <User size={20} />

                  {user.fullname}

                </Link>

                <button

                  onClick={handleLogout}

                  className="
                  flex
                  items-center
                  gap-3
                  text-red-500
                  "

                >

                  <LogOut size={20} />

                  Logout

                </button>

              </>

            )}

          </div>

        )}

      </>
  );

}