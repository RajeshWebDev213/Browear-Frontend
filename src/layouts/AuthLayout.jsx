import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div
      className="
      min-h-screen
      bg-gradient-to-br
      from-gray-50
      via-white
      to-gray-100
      flex
      items-center
      justify-center
      px-4
      py-10
      "
    >
      <div
        className="
        w-full
        max-w-md
        "
      >
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;