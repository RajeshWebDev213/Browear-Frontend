import { useEffect, useState } from "react";

import Loader from "../../components/common/Loader";
import UsersTable from "../../components/admin/UsersTable";
import UserStatsCard from "../../components/admin/UserStatsCard";

import { getAllUsers } from "../../services/profileService";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  const fetchUsers = async () => {
    try {
      const data = await getAllUsers();
      setUsers(data.users || data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.fullname || "").toLowerCase().includes(search.toLowerCase()) ||
      (user.email || "").toLowerCase().includes(search.toLowerCase());

    const matchesRole = roleFilter === "" ? true : user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const lastIndex = currentPage * usersPerPage;
  const firstIndex = lastIndex - usersPerPage;
  const currentUsers = filteredUsers.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
          Management
        </span>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Users
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage all registered users
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <UserStatsCard title="Total Users" value={users.length} />
        <UserStatsCard
          title="Admins"
          value={users.filter((user) => user.role === "admin").length}
        />
        <UserStatsCard
          title="Customers"
          value={users.filter((user) => user.role === "user").length}
        />
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="flex-1 border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-black"
        />

        <select
          value={roleFilter}
          onChange={(e) => {
            setRoleFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-black sm:w-56"
        >
          <option value="">All Roles</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <UsersTable users={currentUsers} />
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 pt-2">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`flex h-9 w-9 items-center justify-center border text-sm font-medium transition-colors ${
                currentPage === index + 1
                  ? "border-black bg-black text-white"
                  : "border-gray-300 text-gray-600 hover:border-black hover:text-black"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Users;