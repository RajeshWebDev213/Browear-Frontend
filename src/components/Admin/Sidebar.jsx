import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Star,
  Settings,
  LogOut,
} from "lucide-react";
import {
  NavLink,
  useNavigate,
} from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";
import { showSuccess } from "../../utils/toast";
function Sidebar() {

  const navigate = useNavigate();
  const {logout} = useContext(AuthContext);
const handleLogout = () => {

  logout();

  showSuccess(
    "Logged out successfully"
  );

  navigate("/login");

};

  const menuItems = [

    {
      title: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },

    {
      title: "Products",
      path: "/admin/products",
      icon: ShoppingBag,
    },

    {
      title: "Orders",
      path: "/admin/orders",
      icon: Package,
    },

    {
      title: "Users",
      path: "/admin/users",
      icon: Users,
    },

    {
      title: "Reviews",
      path: "/admin/reviews",
      icon: Star,
    },

    {
      title: "Settings",
      path: "/admin/settings",
      icon: Settings,
    },

  ];

  return (

    <aside
      className="
      w-72
      min-h-screen
      bg-black
      text-white
      flex
      flex-col
      "
    >

      {/* Logo */}

      <div
        className="
        h-20
        flex
        items-center
        justify-center
        border-b
        border-zinc-800
        "
      >

        <h1
          className="
          text-2xl
          font-bold
          tracking-wider
          "
        >

          BROWEAR

        </h1>

      </div>

      {/* Navigation */}

      <nav
        className="
        flex-1
        px-4
        py-6
        space-y-2
        "
      >

        {

          menuItems.map((item) => {

            const Icon = item.icon;

            return (

              <NavLink

                key={item.title}

                to={item.path}

                className={({ isActive }) =>

                  `
                  flex
                  items-center
                  gap-4
                  px-4
                  py-3
                  rounded-xl
                  transition-all
                  duration-300

                  ${
                    isActive
                      ? "bg-white text-black font-semibold"
                      : "hover:bg-zinc-900 text-gray-300"
                  }
                  `
                }

              >

                <Icon size={20} />

                <span>

                  {item.title}

                </span>

              </NavLink>

            );

          })

        }

      </nav>

      {/* Logout */}

      <div
        className="
        p-4
        border-t
        border-zinc-800
        "
      >

<button

  onClick={handleLogout}

  className="
  w-full
  mt-auto
  flex
  items-center
  gap-3
  px-4
  py-3
  rounded-xl
  text-red-600
  hover:bg-red-50
  transition
  "

>

  <LogOut size={20} />

  Logout

</button>

      </div>

    </aside>

  );

}

export default Sidebar;