import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
function UsersTable({ users = [] }) {

  return (

    <div
      className="
      bg-white
      rounded-2xl
      border
      border-gray-200
      shadow-sm
      p-6
      "
    >

      <div className="flex items-center justify-between mb-6">

        <h2 className="text-xl font-semibold">

          Recent Users

        </h2>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">

                User

              </th>

              <th className="text-left py-3">

                Email

              </th>

              <th className="text-left py-3">

                Role

              </th>

              <th className="text-left py-3">

                Joined

              </th>

              <th className="text-center py-3">

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {

              users.length === 0 ? (

                <tr>

          <td colSpan="5">

  <div className="py-16 text-center">

    <h2 className="text-xl font-semibold">

      No Users Found

    </h2>

    <p className="text-gray-500 mt-2">

      Try another search.

    </p>

  </div>

</td>

                </tr>

              ) : (

                users.map((user) => (

                  <tr
                    key={user._id}
                    className="
                    border-b
                    hover:bg-gray-50
                    "
                  >

                    <td className="py-4">

                      <div className="flex items-center gap-3">

                        {

                          user.avatar ? (

                            <img

  src={
    user.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.fullname || "User"
    )}`
  }

  alt={user.fullname}

  className="
  w-10
  h-10
  rounded-full
  object-cover
  "

/>

                          ) : (

                            <div
                              className="
                              w-10
                              h-10
                              rounded-full
                              bg-black
                              text-white
                              flex
                              items-center
                              justify-center
                              font-semibold
                              "
                            >

                              {

                                user.fullname
                                  ?.charAt(0)
                                  ?.toUpperCase() || "U"

                              }

                            </div>

                          )

                        }

                        <span>

                          {user.fullname || "No Name"}

                        </span>

                      </div>

                    </td>

                    <td>

                      {user.email}

                    </td>

                    <td>

                      <span
                        className={`
                        px-3
                        py-1
                        rounded-full
                        text-sm

                        ${
                          user.role === "admin"

                            ? "bg-red-100 text-red-700"

                            : "bg-green-100 text-green-700"

                        }
                        `}
                      >

                        {user.role}

                      </span>

                    </td>

                    <td>

                      {

                        new Date(
                          user.createdAt
                        ).toLocaleDateString()

                      }

                    </td>

<td className="text-center">

  <Link

    to={`/admin/users/${user._id}`}

    className="
    inline-flex
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