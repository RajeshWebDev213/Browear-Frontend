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
import logo from "../../assets/logo/browear-1.png";
import brand from "../../assets/logo/websitename.png";
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

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Topwear", path: "/topwear" },
    { label: "Bottomwear", path: "/bottomwear" },
    { label: "Footwear", path: "/footwear" },
  ];

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
/*  */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="text-white transition"
            >
              {mobileMenu ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <img src={logo} alt="Logo" className="h-9 w-9 object-contain" />
            <img src={brand} alt="Browear" className="hidden h-7 md:block" />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm tracking-wide text-white/70 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Search */}
          <div className="relative mx-8 hidden max-w-xs flex-1 lg:flex">
            <div className="flex w-full items-center gap-2 border-b border-white/20 py-2 transition-colors focus-within:border-white">
              <Search size={16} className="text-white/40" />
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onFocus={() => setShowSearch(true)}
                onBlur={() =>
                  setTimeout(() => {
                    setShowSearch(false);
                  }, 200)
                }
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
              />
            </div>

            {/* Search Dropdown */}
            {showSearch && search.length > 0 && (
              <div className="absolute top-12 left-0 z-50 w-full border border-gray-200 bg-white shadow-lg">
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <button
                      key={index}
                      onMouseDown={() => {
                        navigate(item.path);
                        setSearch("");
                        setShowSearch(false);
                      }}
                      className="w-full px-5 py-3 text-left text-sm text-gray-800 transition hover:bg-gray-50"
                    >
                      {item.label}
                    </button>
                  ))
                ) : (
                  <div className="px-5 py-4 text-sm text-gray-400">
                    No products found
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Desktop Right */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              to="/wishlist"
              className="text-white/80 transition-colors hover:text-white"
            >
              <Heart size={20} />
            </Link>

            <Link to="/cart" className="relative text-white/80 transition-colors hover:text-white">
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-sm text-white/80 transition-colors hover:text-white"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="border border-white px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-white hover:text-black"
                >
                  Signup
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-5">
                <Link
                  to="/account"
                  className="flex items-center gap-2 text-white/80 transition-colors hover:text-white"
                >
                  <User size={18} />
                  <span className="hidden text-sm lg:block">
                    {user.fullname}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-sm text-red-400 transition-colors hover:text-red-300"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-4 md:hidden">
            <Link to="/wishlist" className="text-white/80">
              <Heart size={20} />
            </Link>

            <Link to="/cart" className="relative text-white/80">
              <ShoppingBag size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* ==========================================
          MOBILE MENU
/*  */}
      {mobileMenu && (
        <>
          {/* Overlay */}
          <div
            onClick={() => setMobileMenu(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          />

          {/* Menu */}
          <div className="fixed top-16 left-0 z-50 h-[calc(100vh-64px)] w-full overflow-y-auto bg-white md:hidden">
            <div className="p-5">
              {/* Search */}
              <div className="relative flex items-center gap-2 border-b border-gray-300 py-3">
                <Search size={17} className="text-gray-400" />
                <input
                  type="text"
                  value={search}
                  placeholder="Search products..."
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-300"
                />
              </div>

              {/* Search Result */}
              {search.length > 0 && (
                <div className="mt-3 border border-gray-200">
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          navigate(item.path);
                          setSearch("");
                          setMobileMenu(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm text-gray-800 transition hover:bg-gray-50"
                      >
                        {item.label}
                      </button>
                    ))
                  ) : (
                    <div className="p-4 text-sm text-gray-400">
                      No products found
                    </div>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8">
                <span className="text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
                  Browse
                </span>
                <div className="mt-3 divide-y divide-gray-100">
                  {navLinks.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={() => setMobileMenu(false)}
                      className="flex items-center justify-between py-4 text-[15px] text-gray-900"
                    >
                      <span>{link.label}</span>
                    </Link>
                  ))}

                  <Link
                    to="/wishlist"
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center justify-between py-4 text-[15px] text-gray-900"
                  >
                    <span>Wishlist</span>
                    <Heart size={18} className="text-gray-400" />
                  </Link>

                  <Link
                    to="/cart"
                    onClick={() => setMobileMenu(false)}
                    className="flex items-center justify-between py-4 text-[15px] text-gray-900"
                  >
                    <span>Cart</span>
                    <div className="flex items-center gap-3">
                      {cartItems.length > 0 && (
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs text-white">
                          {cartItems.length}
                        </span>
                      )}
                      <ShoppingBag size={18} className="text-gray-400" />
                    </div>
                  </Link>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                {!user ? (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenu(false)}
                      className="block w-full border border-gray-300 py-3 text-center text-sm font-medium text-gray-900"
                    >
                      Login
                    </Link>

                    <Link
                      to="/signup"
                      onClick={() => setMobileMenu(false)}
                      className="block w-full bg-black py-3 text-center text-sm font-medium text-white"
                    >
                      Create Account
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-5">
                    <Link
                      to="/account"
                      onClick={() => setMobileMenu(false)}
                      className="flex items-center gap-3"
                    >
                      <div className="flex h-11 w-11 items-center justify-center bg-black text-white">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {user.fullname}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenu(false);
                      }}
                      className="flex w-full items-center justify-center gap-2 border border-red-200 bg-red-50 py-3 text-sm text-red-600 transition hover:bg-red-100"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}