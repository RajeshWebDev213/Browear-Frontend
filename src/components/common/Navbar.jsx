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


import { AuthContext } from "../../context/AuthContext";
import logo from "../../assets/logo/browear-1.png"
import brand from "../../assets/logo/websitename.png"
import { useCart } from "../../hooks/useCart";
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

    {/* ==========================================
        NAVBAR
    ========================================== */}

    <header
      className="
      sticky
      top-0
      z-50
      bg-zinc-950
      border-b
      border-zinc-800
      shadow-lg
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        h-16
        px-4
        flex
        items-center
        justify-between
        "
      >

        {/* ================= Mobile Menu ================= */}

        <div
          className="
          flex
          items-center
          gap-3
          md:hidden
          "
        >

          <button

            onClick={() =>

              setMobileMenu(

                !mobileMenu

              )

            }

            className="
            text-white
            transition
            "

          >

            {

              mobileMenu

                ?

                <X size={28} />

                :

                <Menu size={28} />

            }

          </button>

        </div>

        {/* ================= Logo ================= */}

        <Link

          to="/"

          className="
          flex
          items-center
          gap-3
          shrink-0
          "

        >

          <img

            src={logo}

            alt="Logo"

            className="
            w-11
            h-11
            object-contain
            "

          />

          <img

            src={brand}

            alt="Browear"

            className="
            hidden
            md:block
            h-9
            "

          />

        </Link>

        {/* ================= Desktop Search ================= */}

        <div
          className="
          hidden
          lg:flex
          relative
          flex-1
          max-w-xl
          mx-8
          "
        >

          <div
            className="
            w-full
            h-12
            bg-zinc-100
            rounded-full
            flex
            items-center
            px-4
            "
          >

            <Search

              size={18}

              className="text-gray-500"

            />

            <input

              type="text"

              placeholder="Search for products..."

              value={search}

              onFocus={() =>
                setShowSearch(true)
              }

              onBlur={() =>

                setTimeout(() => {

                  setShowSearch(false);

                }, 200)

              }

              onChange={(e) =>

                setSearch(

                  e.target.value

                )

              }

              className="
              bg-transparent
              outline-none
              px-3
              w-full
              text-sm
              "

            />

          </div>

          {/* Search Dropdown */}
                  {

            showSearch &&

            search.length > 0 && (

              <div
                className="
                absolute
                top-14
                left-0
                w-full
                bg-white
                rounded-2xl
                shadow-2xl
                border
                border-gray-200
                overflow-hidden
                z-50
                "
              >

                {

                  filteredData.length > 0 ? (

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
                        px-5
                        py-3
                        text-left
                        hover:bg-gray-100
                        transition
                        "

                      >

                        {item.label}

                      </button>

                    ))

                  ) : (

                    <div
                      className="
                      px-5
                      py-4
                      text-gray-500
                      "
                    >

                      No products found

                    </div>

                  )

                }

              </div>

            )

          }

        </div>

        {/* ================= Desktop Right ================= */}

        <div
          className="
          hidden
          md:flex
          items-center
          gap-6
          "
        >

          <Link

            to="/wishlist"

            className="
            text-white
            hover:text-gray-300
            transition
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

            {

              cartItems.length > 0 && (

                <span
                  className="
                  absolute
                  -top-2
                  -right-2
                  w-5
                  h-5
                  rounded-full
                  bg-red-600
                  text-white
                  text-[10px]
                  flex
                  items-center
                  justify-center
                  "
                >

                  {cartItems.length}

                </span>

              )

            }

          </Link>

          {

            !user ? (

              <>

                <Link

                  to="/login"

                  className="
                  text-white
                  hover:text-gray-300
                  transition
                  "

                >

                  Login

                </Link>

                <Link

                  to="/signup"

                  className="
                  bg-white
                  text-black
                  px-5
                  py-2
                  rounded-full
                  font-medium
                  hover:bg-gray-200
                  transition
                  "

                >

                  Signup

                </Link>

              </>

            ) : (

              <div
                className="
                flex
                items-center
                gap-5
                "
              >

                <Link

                  to="/account"

                  className="
                  flex
                  items-center
                  gap-2
                  text-white
                  hover:text-gray-300
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
                  text-red-400
                  hover:text-red-300
                  transition
                  "

                >

                  <LogOut size={18} />

                  Logout

                </button>

              </div>

            )

          }

        </div>
                {/* ================= Mobile Icons ================= */}

        <div
          className="
          flex
          md:hidden
          items-center
          gap-4
          "
        >

          <Link
            to="/wishlist"
            className="text-white"
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

            {

              cartItems.length > 0 && (

                <span
                  className="
                  absolute
                  -top-2
                  -right-2
                  w-5
                  h-5
                  rounded-full
                  bg-red-600
                  text-white
                  text-[10px]
                  flex
                  items-center
                  justify-center
                  "
                >

                  {cartItems.length}

                </span>

              )

            }

          </Link>

        </div>

      </div>

    </header>

    {/* ==========================================
        MOBILE MENU
    ========================================== */}

    {

      mobileMenu && (

        <>

          {/* Overlay */}

          <div

            onClick={() =>
              setMobileMenu(false)
            }

            className="
            fixed
            inset-0
            bg-black/50
            backdrop-blur-sm
            z-40
            md:hidden
            "

          />

          {/* Menu */}

          <div
            className="
            fixed
            top-16
            left-0
            w-full
            h-[calc(100vh-64px)]
            bg-white
            z-50
            overflow-y-auto
            md:hidden
            "
          >

            <div className="p-5">

              {/* Search */}

              <div className="relative">

                <Search
                  size={18}
                  className="
                  absolute
                  left-4
                  top-1/2
                  -translate-y-1/2
                  text-gray-500
                  "
                />

                <input

                  type="text"

                  value={search}

                  placeholder="Search products..."

                  onChange={(e)=>

                    setSearch(
                      e.target.value
                    )

                  }

                  className="
                  w-full
                  h-12
                  pl-11
                  pr-4
                  border
                  rounded-xl
                  outline-none
                  focus:border-black
                  "

                />

              </div>

              {/* Search Result */}

              {

                search.length > 0 && (

                  <div
                    className="
                    mt-3
                    border
                    rounded-xl
                    overflow-hidden
                    "
                  >

                    {

                      filteredData.length > 0 ? (

                        filteredData.map(

                          (item,index)=>(

                            <button

                              key={index}

                              onClick={()=>{

                                navigate(item.path);

                                setSearch("");

                                setMobileMenu(false);

                              }}

                              className="
                              w-full
                              px-4
                              py-3
                              text-left
                              hover:bg-gray-100
                              transition
                              "

                            >

                              {item.label}

                            </button>

                          )

                        )

                      ) : (

                        <div
                          className="
                          p-4
                          text-gray-500
                          "
                        >

                          No products found

                        </div>

                      )

                    }

                  </div>

                )

              }

              {/* Navigation */}

              <div className="mt-8 space-y-2">

                <Link

                  to="/"

                  onClick={()=>

                    setMobileMenu(false)

                  }

                  className="
                  flex
                  items-center
                  justify-between
                  px-4
                  py-4
                  rounded-xl
                  hover:bg-gray-100
                  "

                >

                  <span>

                    Home

                  </span>

                </Link>

                <Link

                  to="/topwear"

                  onClick={()=>

                    setMobileMenu(false)

                  }

                  className="
                  flex
                  items-center
                  justify-between
                  px-4
                  py-4
                  rounded-xl
                  hover:bg-gray-100
                  "

                >

                  <span>

                    Topwear

                  </span>

                </Link>

                <Link

                  to="/bottomwear"

                  onClick={()=>

                    setMobileMenu(false)

                  }

                  className="
                  flex
                  items-center
                  justify-between
                  px-4
                  py-4
                  rounded-xl
                  hover:bg-gray-100
                  "

                >

                  <span>

                    Bottomwear

                  </span>

                </Link>

                <Link

                  to="/footwear"

                  onClick={()=>

                    setMobileMenu(false)

                  }

                  className="
                  flex
                  items-center
                  justify-between
                  px-4
                  py-4
                  rounded-xl
                  hover:bg-gray-100
                  "

                >

                  <span>

                    Footwear

                  </span>

                </Link>
                                <Link

                  to="/wishlist"

                  onClick={() =>

                    setMobileMenu(false)

                  }

                  className="
                  flex
                  items-center
                  justify-between
                  px-4
                  py-4
                  rounded-xl
                  hover:bg-gray-100
                  "

                >

                  <span>

                    Wishlist

                  </span>

                  <Heart size={20} />

                </Link>

                <Link

                  to="/cart"

                  onClick={() =>

                    setMobileMenu(false)

                  }

                  className="
                  flex
                  items-center
                  justify-between
                  px-4
                  py-4
                  rounded-xl
                  hover:bg-gray-100
                  "

                >

                  <span>

                    Cart

                  </span>

                  <div className="flex items-center gap-3">

                    {

                      cartItems.length > 0 && (

                        <span
                          className="
                          bg-red-600
                          text-white
                          text-xs
                          w-5
                          h-5
                          rounded-full
                          flex
                          items-center
                          justify-center
                          "
                        >

                          {cartItems.length}

                        </span>

                      )

                    }

                    <ShoppingBag size={20} />

                  </div>

                </Link>

              </div>

              <div className="border-t mt-8 pt-6">

                {

                  !user ? (

                    <div className="space-y-3">

                      <Link

                        to="/login"

                        onClick={() =>

                          setMobileMenu(false)

                        }

                        className="
                        block
                        w-full
                        text-center
                        border
                        border-gray-300
                        rounded-xl
                        py-3
                        font-medium
                        "

                      >

                        Login

                      </Link>

                      <Link

                        to="/signup"

                        onClick={() =>

                          setMobileMenu(false)

                        }

                        className="
                        block
                        w-full
                        text-center
                        bg-black
                        text-white
                        rounded-xl
                        py-3
                        font-medium
                        "

                      >

                        Create Account

                      </Link>

                    </div>

                  ) : (

                    <div className="space-y-5">

                      <Link

                        to="/account"

                        onClick={() =>

                          setMobileMenu(false)

                        }

                        className="
                        flex
                        items-center
                        gap-3
                        "

                      >

                        <div
                          className="
                          w-12
                          h-12
                          rounded-full
                          bg-black
                          text-white
                          flex
                          items-center
                          justify-center
                          "
                        >

                          <User size={22} />

                        </div>

                        <div>

                          <p className="font-semibold">

                            {user.fullname}

                          </p>

                          <p className="text-sm text-gray-500">

                            {user.email}

                          </p>

                        </div>

                      </Link>

                      <button

                        onClick={() => {

                          handleLogout();

                          setMobileMenu(false);

                        }}

                        className="
                        w-full
                        flex
                        items-center
                        justify-center
                        gap-2
                        py-3
                        rounded-xl
                        bg-red-50
                        text-red-600
                        hover:bg-red-100
                        transition
                        "

                      >

                        <LogOut size={18} />

                        Logout

                      </button>

                    </div>

                  )

                }

              </div>

            </div>

          </div>

        </>

      )

    }

  </>

);


}