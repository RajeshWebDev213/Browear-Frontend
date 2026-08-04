import { Outlet } from "react-router-dom";

import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

function AdminLayout() {

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="flex flex-col flex-1">

        {/* Navbar */}

        <Navbar />

        {/* Page Content */}

        <main
          className="
          flex-1
          p-6
          overflow-y-auto
          "
        >

          <Outlet />

        </main>

      </div>

    </div>

  );

}

export default AdminLayout;