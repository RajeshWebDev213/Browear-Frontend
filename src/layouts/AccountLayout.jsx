import { Outlet } from "react-router-dom";

import ProfileSidebar from "../components/Profile/ProfileSidebar";
import ProfileHeader from "../components/Profile/ProfileHeader";

function AccountLayout() {

  return (

    <section
      className="
      min-h-screen
      bg-gray-50
      "
    >

      <div
        className="
        max-w-7xl
        mx-auto
        px-5
        py-8
        "
      >

        <ProfileHeader />

        <div
          className="
          mt-8
          grid
          grid-cols-1
          lg:grid-cols-[260px_1fr]
          gap-8
          "
        >

          <ProfileSidebar />

          <main>

            <Outlet />

          </main>

        </div>

      </div>

    </section>

  );

}

export default AccountLayout;