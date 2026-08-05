import { Link } from "react-router-dom";

import {
  Eye,
} from "lucide-react";

function UsersTable({

  users = [],

}) {

  return (

    <div
      className="
      bg-white
      rounded-2xl
      border
      border-gray-200
      shadow-sm
      overflow-hidden
      "
    >

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-6 py-4 text-left">

                Name

              </th>

              <th className="px-6 py-4 text-left">

                Email

              </th>

              <th className="px-6 py-4 text-left">

                Phone

              </th>

              <th className="px-6 py-4 text-left">

                Role

              </th>

              <th className="px-6 py-4 text-left">

                Joined

              </th>

              <th className="px-6 py-4 text-center">

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {

              users.length === 0 ? (

                <tr>

                  <td
                    colSpan="6"
                    className="
                    py-16
                    text-center
                    text-gray-500
                    "
                  >

                    No Users Found

                  </td>

                </tr>

              ) : (

                users.map((user) => (

                  <tr

                    key={user._id}

                    className="
                    border-t
                    hover:bg-gray-50
                    "

                  >

                    <td className="px-6 py-4">

                      {user.fullname}

                    </td>

                    <td className="px-6 py-4">

                      {user.email}

                    </td>

                    <td className="px-6 py-4">

                      {user.phonenumber || "-"}

                    </td>

                    <td className="px-6 py-4">

                      <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm

                        ${
                          user.role === "admin"

                            ? "bg-purple-100 text-purple-700"

                            : "bg-gray-100 text-gray-700"

                        }
                        `}
                      >

                        {user.role}

                      </span>

                    </td>

                    <td className="px-6 py-4">

                      {

                        new Date(
                          user.createdAt
                        ).toLocaleDateString()

                      }

                    </td>

                    <td className="px-6 py-4">

                      <div className="flex justify-center">

                        <Link

                          to={`/admin/users/${user._id}`}

                          className="
                          p-2
                          rounded-lg
                          bg-blue-100
                          hover:bg-blue-200
                          transition
                          "

                        >

                          <Eye
                            size={18}
                            className="text-blue-600"
                          />

                        </Link>

                      </div>

                    </td>

                  </tr>

                ))

              )

            }

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default UsersTable;