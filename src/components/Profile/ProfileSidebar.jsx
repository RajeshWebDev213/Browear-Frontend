import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, ShoppingBag, Heart, Lock, LogOut } from "lucide-react";

import { AuthContext } from "../../context/AuthContext";

function ProfileSidebar() {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    logout();
    navigate("/login");
  };

  const navClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
      isActive
        ? "bg-black text-white"
        : "text-gray-600 hover:bg-gray-50 hover:text-black"
    }`;

  return (
    <aside className="h-fit border border-gray-200 bg-white p-6 lg:sticky lg:top-24">
      {/* User */}
      <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-6">
        {user?.avatar?.url ? (
          <img
            src={user.avatar.url}
            alt={user.fullname}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-100">
            <User size={20} className="text-gray-400" />
          </div>
        )}

        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-gray-900">
            {user?.fullname}
          </h2>
          <p className="truncate text-xs text-gray-500">{user?.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-1">
        <NavLink end to="/account" className={navClass}>
          <User size={17} />
          Profile
        </NavLink>

        <NavLink to="/account/orders" className={navClass}>
          <ShoppingBag size={17} />
          My Orders
        </NavLink>

        <NavLink to="/wishlist" className={navClass}>
          <Heart size={17} />
          Wishlist
        </NavLink>

        <NavLink to="/account/change-password" className={navClass}>
          <Lock size={17} />
          Change Password
        </NavLink>
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-8 flex w-full items-center justify-center gap-2 border border-red-200 bg-red-50 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-100"
      >
        <LogOut size={16} />
        Logout
      </button>
    </aside>
  );
}

export default ProfileSidebar;