import { useContext } from "react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import {

  User,

  ShoppingBag,

  Heart,

  Lock,

  LogOut,

} from "lucide-react";

import { AuthContext } from "../../context/AuthContext";

function ProfileSidebar() {

  const navigate = useNavigate();

  const { user, logout } =
    useContext(AuthContext);

const handleLogout = () => {

  const confirmLogout = window.confirm(
    "Are you sure you want to logout?"
  );

  if (!confirmLogout) return;

  logout();

  navigate("/login");

};

  const navClass = ({ isActive }) => `
    flex
    items-center
    gap-3
    px-4
    py-3
    rounded-xl
    transition
    ${
      isActive
        ? "bg-black text-white"
        : "hover:bg-gray-100 text-gray-700"
    }
  `;

  return (

    <aside
className="
bg-white
rounded-2xl
border
border-gray-200
p-6
h-fit
lg:sticky
lg:top-24
"
    >

      {/* User */}

      <div
        className="
        flex
        items-center
        gap-4
        border-b
        pb-6
        mb-6
        "
      >

 {

user?.avatar ? (

  <img

    src={user.avatar}

    alt={user.fullname}

    className="
    w-14
    h-14
    rounded-full
    object-cover
    "

  />

) : (

  <div
    className="
    w-14
    h-14
    rounded-full
    bg-black
    text-white
    flex
    items-center
    justify-center
    text-xl
    font-bold
    "
  >

    {

      user?.fullname
        ?.charAt(0)
        ?.toUpperCase() || "U"

    }

  </div>

)

}

        <div>

          <h2 className="font-semibold">

            {user?.fullname}

          </h2>

          <p className="text-sm text-gray-500">

            {user?.email}

          </p>

        </div>

      </div>

      {/* Navigation */}

      <nav className="space-y-2">

        <NavLink
          end
          to="/account"
          className={navClass}
        >

          <User size={20} />

          Profile

        </NavLink>

        <NavLink
          to="/account/orders"
          className={navClass}
        >

          <ShoppingBag size={20} />

          My Orders

        </NavLink>

        <NavLink
          to="/wishlist"
          className={navClass}
        >

          <Heart size={20} />

          Wishlist

        </NavLink>

        <NavLink
          to="/account/change-password"
          className={navClass}
        >

          <Lock size={20} />

          Change Password

        </NavLink>

      </nav>

      {/* Logout */}

      <button

        onClick={handleLogout}

        className="
        w-full
        mt-8
        flex
        items-center
        justify-center
        gap-2
        bg-red-50
        text-red-600
        py-3
        rounded-xl
        hover:bg-red-100
        transition
        "

      >

        <LogOut size={18} />

        Logout

      </button>

    </aside>

  );

}

export default ProfileSidebar;