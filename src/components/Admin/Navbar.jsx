import { useContext } from "react";

import { AuthContext } from "../../context/AuthContext";


function Navbar() {

  const { user } =
    useContext(AuthContext);


  const today =
    new Date().toLocaleDateString(
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
      h-16
      sm:h-20
      bg-white
      border-b
      border-gray-200
      px-3
      sm:px-5
      lg:px-8
      flex
      items-center
      justify-between
      gap-3
      "
    >

      {/* =========================
          LEFT
/*  */}

      <div className="min-w-0">

        <h2
          className="
          text-lg
          sm:text-xl
          lg:text-2xl
          font-bold
          text-gray-900
          truncate
          "
        >

          Admin Dashboard

        </h2>


        <p
          className="
          text-xs
          sm:text-sm
          text-gray-500
          mt-0.5
          sm:mt-1
          truncate
          "
        >

          {today}

        </p>

      </div>


      {/* =========================
          RIGHT — PROFILE
/*  */}

      <div
        className="
        flex
        items-center
        gap-2
        sm:gap-3
        shrink-0
        "
      >

        {/* Avatar */}

        <div
          className="
          w-9
          h-9
          sm:w-10
          sm:h-10
          lg:w-11
          lg:h-11
          rounded-full
          bg-black
          text-white
          flex
          items-center
          justify-center
          font-semibold
          text-sm
          sm:text-base
          lg:text-lg
          shrink-0
          "
        >

          {user?.fullname
            ? user.fullname
                .charAt(0)
                .toUpperCase()
            : "A"}

        </div>


        {/* User Info */}

        <div
          className="
          hidden
          md:block
          max-w-32
          lg:max-w-none
          "
        >

          <p
            className="
            font-semibold
            text-gray-900
            text-sm
            lg:text-base
            truncate
            "
          >

            {user?.fullname ||
              "Admin"}

          </p>


          <p
            className="
            text-xs
            lg:text-sm
            text-gray-500
            truncate
            "
          >

            {user?.role ||
              "Administrator"}

          </p>

        </div>

      </div>

    </header>

  );

}


export default Navbar;