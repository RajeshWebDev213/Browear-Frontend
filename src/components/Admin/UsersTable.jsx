import { Eye, User } from "lucide-react";
import { Link } from "react-router-dom";

function UsersTable({ users = [] }) {
  return (
    <div className="border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-400">
                Joined
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {users.length === 0 ? (
              <tr>
                <td colSpan="5">
                  <div className="py-16 text-center">
                    <h2 className="text-base font-semibold text-gray-900">
                      No Users Found
                    </h2>
                    <p className="mt-1 text-sm text-gray-500">
                      Try another search.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user._id} className="transition-colors hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {user.avatar?.url ? (
                        <img
                          src={user.avatar.url}
                          alt={user.fullname}
                          className="h-10 w-10 rounded-full border border-gray-200 object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
                          <User size={18} className="text-gray-400" />
                        </div>
                      )}

                      <div>
                        <h3 className="text-sm font-medium text-gray-900">
                          {user.fullname || "No Name"}
                        </h3>
                        <p className="text-xs text-gray-400">
                          ID #{user._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {user.email}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 text-xs font-medium ${
                        user.role === "admin"
                          ? "bg-red-50 text-red-600"
                          : "bg-green-50 text-green-700"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <Link
                      to={`/admin/users/${user._id}`}
                      className="inline-flex h-8 w-8 items-center justify-center border border-gray-200 text-gray-500 transition-colors hover:border-black hover:text-black"
                    >
                      <Eye size={16} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersTable;