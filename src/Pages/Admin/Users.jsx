import { useEffect, useState } from "react";

import Loader from "../../components/common/Loader";
import UsersTable from "../../components/admin/UsersTable";

import {
  getAllUsers,
} from "../../services/profileService";

function Users() {

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);
    const [search, setSearch] = useState("");

const [roleFilter, setRoleFilter] = useState("");

const [currentPage, setCurrentPage] = useState(1);

const usersPerPage = 8;

  const fetchUsers = async () => {

    try {

      const data =
        await getAllUsers();

      setUsers(
        data.users || data
      );

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

    (user.fullname || "")
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    (user.email || "")
      .toLowerCase()
      .includes(search.toLowerCase());

  const matchesRole =

    roleFilter === ""

      ? true

      : user.role === roleFilter;

  return matchesSearch && matchesRole;

});
const lastIndex =
  currentPage * usersPerPage;

const firstIndex =
  lastIndex - usersPerPage;

const currentUsers =
  filteredUsers.slice(
    firstIndex,
    lastIndex
  );

const totalPages = Math.ceil(

  filteredUsers.length /

  usersPerPage

);

  if (loading) {

    return <Loader />;

  }


  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Users

        </h1>

        <p className="text-gray-500 mt-2">

          Manage all registered users

        </p>

      </div>
      <div className="flex gap-4 mb-6">

  <input

    type="text"

    placeholder="Search Users..."

    value={search}

    onChange={(e) => {

      setSearch(e.target.value);

      setCurrentPage(1);

    }}

    className="
    flex-1
    border
    rounded-xl
    px-4
    py-3
    "

  />

  <select

    value={roleFilter}

    onChange={(e) => {

      setRoleFilter(e.target.value);

      setCurrentPage(1);

    }}

    className="
    w-56
    border
    rounded-xl
    px-4
    "

  >

    <option value="">

      All Roles

    </option>

    <option value="user">

      User

    </option>

    <option value="admin">

      Admin

    </option>

  </select>

</div>

      <UsersTable

        users={currentUsers}

      />
      {totalPages > 1 && (

  <div className="flex justify-center gap-2 mt-8">

    {[...Array(totalPages)].map((_, index) => (

      <button

        key={index}

        onClick={() =>
          setCurrentPage(index + 1)
        }

        className={`
          w-10
          h-10
          rounded-lg

          ${
            currentPage === index + 1
              ? "bg-black text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }
        `}

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