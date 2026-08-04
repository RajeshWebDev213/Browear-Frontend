import { Search, Bell } from "lucide-react";

import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";

function Navbar() {

  const { user } = useContext(AuthContext);

  const today = new Date().toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (

    <header
      className="
      h-20
      bg-white
      border-b
      border-gray-200
      px-8
      flex
      items-center
      justify-between
      "
    >

      {/* Left */}

      <div>

        <h2
          className="
          text-2xl
          font-bold
          text-gray-900
          "
        >

          Admin Dashboard

        </h2>

        <p
          className="
          text-sm
          text-gray-500
          mt-1
          "
        >

          {today}

        </p>

      </div>

      {/* Right */}

      <div
        className="
        flex
        items-center
        gap-5
        "
      >

        {/* Search */}

        <div
          className="
          relative
          hidden
          md:block
          "
        >

          <Search
            size={18}
            className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            "
          />

          <input

            type="text"

            placeholder="Search..."

            className="
            w-72
            h-11
            rounded-xl
            border
            border-gray-300
            pl-11
            pr-4
            outline-none
            focus:border-black
            transition
            "

          />

        </div>

        {/* Notification */}

        <button
          className="
          relative
          w-11
          h-11
          rounded-xl
          border
          border-gray-300
          flex
          items-center
          justify-center
          hover:bg-gray-100
          transition
          "
        >

          <Bell size={20} />

          <span
            className="
            absolute
            top-2
            right-2
            w-2
            h-2
            rounded-full
            bg-red-500
            "
          />

        </button>

        {/* Profile */}

        <div
          className="
          flex
          items-center
          gap-3
          "
        >

          <div
            className="
            w-11
            h-11
            rounded-full
            bg-black
            text-white
            flex
            items-center
            justify-center
            font-semibold
            text-lg
            "
          >

            {user?.fullname
              ? user.fullname.charAt(0).toUpperCase()
              : "A"}

          </div>

          <div
            className="
            hidden
            md:block
            "
          >

            <p
              className="
              font-semibold
              text-gray-900
              "
            >

              {user?.fullname || "Admin"}

            </p>

            <p
              className="
              text-sm
              text-gray-500
              "
            >

              {user?.role || "Administrator"}

            </p>

          </div>

        </div>

      </div>

    </header>

  );

}

export default Navbar;