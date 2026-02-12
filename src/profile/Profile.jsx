import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Header/AuthContext";
import Orders from "../Orders/Orders";
import { data, useLocation } from "react-router-dom";
function Profile() {
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("profile");

  const menu = [
    { key: "profile", label: "Profile" },
    { key: "orders", label: "My Orders" },
    { key: "contact", label: "Contact Us" },
    { key: "logout", label: "Logout" },
  ];

  //  AUTO OPEN ORDERS TAB AFTER CHECKOUT
  useEffect(() => {
    if (location.state?.openTab === "orders") {
      setActiveTab("orders");
    }
  }, [location.state]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">
        My Account
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* SIDEBAR */}
        <div className="md:col-span-1 border rounded-lg p-4 flex md:flex-col gap-2 overflow-x-auto">
          {menu.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveTab(item.key)}
              className={`px-4 py-2 rounded text-left whitespace-nowrap
                ${
                  activeTab === item.key
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* CONTENT */}
        <div className="md:col-span-3 border rounded-lg p-6 min-h-[400px]">
          {activeTab === "profile" && <ProfileInfo />}
          {activeTab === "orders" && <Orders />}
          {activeTab === "contact" && <Contact />}
          {activeTab === "logout" && <Logout />}
        </div>
      </div>
    </div>
  );
}


export default Profile;


function ProfileInfo() {
    const { user } = useContext(AuthContext);
    
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        Profile
      </h2>
      
      <p>
        <b>Name:</b> {user?.fullname || "Not provided"}
      </p>

      <p>
        <b>Email:</b> {user?.email}
      </p>
    </>
  );
}

function OrdersList() {
  return (
    <>
    <Orders/>
    </>
  );
}

function Contact() {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        Contact Us
      </h2>
      <p>Email: browear4@gmail.com</p>
      
    </>
  );
}

function Logout() {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">
        Logout
      </h2>
      <button
        onClick={handleLogout}
        className="px-5 py-2 bg-red-600 text-white rounded"
      >
        Logout
      </button>
    </>
  );
}
