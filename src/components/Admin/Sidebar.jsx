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

  const { logout } =
    useContext(AuthContext);


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
      w-20
      sm:w-60
      lg:w-72
      min-h-screen
      bg-black
      text-white
      flex
      flex-col
      shrink-0
      "
    >


      {/* =========================
          LOGO
/*  */}

      <div
        className="
        h-20
        flex
        items-center
        justify-center
        border-b
        border-zinc-800
        px-2
        "
      >

        {/* Mobile */}

        <h1
          className="
          block
          sm:hidden
          text-lg
          font-bold
          tracking-wider
          "
        >

          B

        </h1>


        {/* Tablet/Desktop */}

        <h1
          className="
          hidden
          sm:block
          text-xl
          lg:text-2xl
          font-bold
          tracking-[0.2em]
          "
        >

          BROWEAR

        </h1>

      </div>


      {/* =========================
          NAVIGATION
/*  */}

      <nav
        className="
        flex-1
        px-2
        sm:px-3
        lg:px-4
        py-5
        sm:py-6
        space-y-1
        "
      >

        {menuItems.map((item) => {

          const Icon =
            item.icon;


          return (

            <NavLink

              key={item.title}

              to={item.path}

              title={item.title}

              className={({
                isActive,
              }) =>

                `
                flex
                items-center
                justify-center
                sm:justify-start
                gap-3
                lg:gap-4
                px-2
                sm:px-3
                lg:px-4
                py-3
                border-l-2
                transition-colors
                duration-200

                ${
                  isActive

                    ? "bg-zinc-900 border-white text-white font-medium"

                    : "border-transparent hover:bg-zinc-950 hover:border-zinc-700 text-gray-400"
                }
                `

              }

            >

              <Icon
                size={19}
                className="shrink-0"
              />


              <span
                className="
                hidden
                sm:inline
                text-sm
                lg:text-base
                "
              >

                {item.title}

              </span>

            </NavLink>

          );

        })}

      </nav>


      {/* =========================
          LOGOUT
/*  */}

      <div
        className="
        p-2
        sm:p-3
        lg:p-4
        border-t
        border-zinc-800
        "
      >

        <button

          onClick={
            handleLogout
          }

          title="Logout"

          className="
          w-full
          flex
          items-center
          justify-center
          sm:justify-start
          gap-3
          px-2
          sm:px-3
          lg:px-4
          py-3
          border
          border-transparent
          text-red-400
          hover:border-red-900
          hover:bg-red-950/40
          transition
          "

        >

          <LogOut
            size={19}
            className="shrink-0"
          />


          <span
            className="
            hidden
            sm:inline
            text-sm
            lg:text-base
            "
          >

            Logout

          </span>

        </button>

      </div>

    </aside>

  );

}


export default Sidebar;