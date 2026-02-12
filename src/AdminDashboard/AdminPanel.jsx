import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Header/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [active, setActive] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const {logout} = useContext(AuthContext);
  const navigate = useNavigate();
  const menuBtn = (key, label) => (
    <button
      onClick={() => {
        setActive(key);
        setIsOpen(false);
      }}
      className={`w-full text-left px-4 py-2 rounded transition
        ${
          active === key
            ? "bg-indigo-600 text-white"
            : "hover:bg-gray-800 text-white"
        }`}
    >
      {label}
    </button>
  );
   const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-black text-white">

      <aside
        className={`bg-black border-r border-gray-800 w-64 p-6
        fixed md:static top-0 left-0 h-full z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6 md:hidden">
          <h1 className="text-xl font-bold">Admin</h1>
          <button onClick={() => setIsOpen(false)}>✕</button>
        </div>

        <h1 className="text-2xl font-bold mb-6 hidden md:block">
          Admin Panel
        </h1>

        <nav className="space-y-2">
          {menuBtn("dashboard", "Dashboard")}
          {menuBtn("users", "Users")}
          {menuBtn("orders", "Orders")}
      
        </nav>
      </aside>

      {/* Overlay (Mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/70 z-40 md:hidden"
        />
      )}

    
      <main className="flex-1 p-6">

        {/* Top bar */}
        <div className="flex justify-between items-center mb-8">
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsOpen(true)}
          >
            ☰
          </button>

          <h2 className="text-3xl font-semibold capitalize">
            {active}
          </h2>

          <button className="bg-indigo-600 px-4 py-2 rounded" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Sections */}
        {active === "dashboard" && <Dashboard />}
        {active === "users" && <Users />}
        {active === "orders" && <Orders />}
      

      </main>
    </div>
  );
}


function Dashboard() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const [stats, setStats] = useState({
    total_users: 0,
    total_orders: 0,
    total_revenue: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔐 auth + role guard
  if (!user || !token) {
    return <p className="text-red-500">Unauthorized</p>;
  }

  if (user.role !== "admin") {
    return <p className="text-red-500">Access denied</p>;
  }

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://browear-backend-production.up.railway.app/api/admin/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard data");
        }

        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {/* USERS */}
      <div className="bg-gray-900 p-6 rounded border border-gray-800 text-white">
        <h4 className="text-gray-400">Total Users</h4>
        <p className="text-3xl font-bold mt-2">{stats.total_users}</p>
      </div>

      {/* ORDERS */}
      <div className="bg-gray-900 p-6 rounded border border-gray-800 text-white">
        <h4 className="text-gray-400">Total Orders</h4>
        <p className="text-3xl font-bold mt-2">{stats.total_orders}</p>
      </div>

      {/* REVENUE */}
      <div className="bg-gray-900 p-6 rounded border border-gray-800 text-white">
        <h4 className="text-gray-400">Total Revenue</h4>
        <p className="text-3xl font-bold mt-2">
          ₹{stats.total_revenue}
        </p>
      </div>
    </div>
  );
}

/* ===================== USERS ===================== */

function Users() {
  const { user } = useContext(AuthContext);

  const token = localStorage.getItem("token");
   
  if (!user || !token) {
    return <p className="text-red-500">Unauthorized</p>;
  }

  if (user.role !== "admin") {
    return <p className="text-red-500">Access denied</p>;
  }

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("https://browear-backend-production.up.railway.app/api/admin/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });

        if (!res.ok) {
          throw new Error("Unauthorized or failed to fetch users");
        }

        const data = await res.json();

        // handle both response styles
        if (Array.isArray(data)) {
          setUsers(data);
        } else if (Array.isArray(data.users)) {
          setUsers(data.users);
        } else {
          setUsers([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-gray-900 p-6 rounded border border-gray-800 text-white">
      <h3 className="text-xl mb-4">Users</h3>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-800 text-gray-400">
            <th className="py-2">ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="4" className="py-4 text-center text-gray-400">
                No users found
              </td>
            </tr>
          )}

          {users.map((u, index) => (
            <tr
              key={u.id || index}
              className="border-b border-gray-800 hover:bg-gray-800"
            >
              <td className="py-2">{u.id || index + 1}</td>
              <td>{u.username || u.fullname || "-"}</td>
              <td>{u.email}</td>
              <td
                className={
                  u.role === "admin"
                    ? "text-green-400 font-semibold"
                    : "text-yellow-400"
                }
              >
                {u.role}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}




/* ===================== ORDERS ===================== */

function Orders() {
  const { user } = useContext(AuthContext);

  //  token source (correct)
  const token = localStorage.getItem("token");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  //  auth + role guard
  if (!user || !token) {
    return <p className="text-red-500">Unauthorized</p>;
  }

  if (user.role !== "admin") {
    return <p className="text-red-500">Access denied</p>;
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("https://browear-backend-production.up.railway.app/api/admin/orders", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
           
        });

        if (!res.ok) {
          throw new Error("Unauthorized or failed to fetch orders");
        }

        const data = await res.json();

        // handle both response styles
        if (Array.isArray(data)) {
          setOrders(data);
        } else if (Array.isArray(data.orders)) {
          setOrders(data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;



  const updateStatus = async (id, newStatus) => {
  try {
    const res = await fetch(
      `https://browear-backend-production.up.railway.app/api/admin/orders/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update status");
    }

    // Refresh UI
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );

  } catch (err) {
    console.error(err);
  }
};

return (
  <div className="bg-gray-900 p-6 rounded border border-gray-800 text-white">
    <h3 className="text-xl mb-4 font-semibold">Orders</h3>

    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700 text-gray-400 text-left">
            <th className="py-3 px-4">Order ID</th>
            <th className="px-4">User</th>
            <th className="px-4">Amount</th>
            <th className="px-4">Status</th>
            <th className="px-4">City</th>
            <th className="px-4">Address</th>
            <th className="px-4">Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.length === 0 && (
            <tr>
              <td colSpan="7" className="py-6 text-center text-gray-400">
                No orders found
              </td>
            </tr>
          )}

          {orders.map((o, index) => (
            <tr
              key={o.id || index}
              className="border-b border-gray-800 hover:bg-gray-800 transition"
            >
              <td className="py-3 px-4 font-medium">
                {o.order_number || o.id}
              </td>

              <td className="px-4">
                <div className="flex flex-col">
                  <span className="font-semibold">{o.ordered_name}</span>
                  <span className="text-xs text-gray-400">
                    ID: {o.user_id}
                  </span>
                </div>
              </td>

              <td className="px-4 font-semibold text-yellow-400">
                ₹{o.total_amount}
              </td>

              <td className="px-4">
                <select
  value={o.status}
  onChange={(e) => updateStatus(o.id, e.target.value)}
  className="bg-gray-800 text-white px-2 py-1 rounded"
>
  <option value="Placed">Placed</option>
  <option value="Pending">Pending</option>
  <option value="Shipping">Shipping</option>
  <option value="Delivered">Delivered</option>
  <option value="Cancelled">Cancelled</option>
</select>

              </td>

              <td className="px-4">{o.city}</td>

              <td className="px-4 max-w-[200px] truncate">
                {o.address}
              </td>

              <td className="px-4 text-gray-400 text-xs">
                {new Date(o.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}



