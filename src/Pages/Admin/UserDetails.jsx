import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import Loader from "../../components/common/Loader";

import {

  getSingleUser,

  updateUserRole,

  adminDeleteUser,

} from "../../services/profileService";

import {

  showSuccess,

  showError,

} from "../../utils/toast";

function UserDetails() {

  const { userId } = useParams();

  const navigate = useNavigate();

  const [user, setUser] =
    useState(null);

  const [role, setRole] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  const fetchUser = async () => {

    try {

      const data =
        await getSingleUser(userId);

      const currentUser =
        data.user || data;

      setUser(currentUser);

      setRole(currentUser.role);

    } catch (error) {

      console.log(error);

      showError(

        error.response?.data?.message ||

        "Failed to load user"

      );

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchUser();

  }, []);

  const handleRoleUpdate = async () => {

    try {

      setSaving(true);

      await updateUserRole(

        userId,

        role

      );

      showSuccess(

        "User role updated successfully"

      );

      fetchUser();

    } catch (error) {

      console.log(error);

      showError(

        error.response?.data?.message ||

        "Failed to update role"

      );

    } finally {

      setSaving(false);

    }

  };

  const handleDelete = async () => {

    try {

      setDeleting(true);

      await adminDeleteUser(userId);

      showSuccess(

        "User deleted successfully"

      );

      navigate("/admin/users");

    } catch (error) {

      console.log(error);

      showError(

        error.response?.data?.message ||

        "Failed to delete user"

      );

    } finally {

      setDeleting(false);

    }

  };

  if (loading) {

    return <Loader />;

  }

  return (

    <div className="max-w-4xl mx-auto space-y-6">

      <Link

        to="/admin/users"

        className="text-blue-600 hover:underline"

      >

        ← Back to Users

      </Link>

      <div className="bg-white rounded-2xl border p-8">

        <div className="flex items-center gap-5">

          {

            user.avatar ? (

              <img

                src={user.avatar}

                alt={user.fullname}

                className="w-24 h-24 rounded-full object-cover"

              />

            ) : (

              <div
                className="
                w-24
                h-24
                rounded-full
                bg-black
                text-white
                flex
                items-center
                justify-center
                text-3xl
                font-bold
                "
              >

                {

                  user.fullname

                    ?.charAt(0)

                    ?.toUpperCase()

                }

              </div>

            )

          }

          <div>

            <h1 className="text-3xl font-bold">

              {user.fullname}

            </h1>

            <p className="text-gray-500">

              {user.email}

            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 gap-6 mt-10">

          <div>

            <label className="font-semibold">

              Phone

            </label>

            <p>

              {user.phonenumber || "-"}

            </p>

          </div>

          <div>

            <label className="font-semibold">

              Gender

            </label>

            <p>

              {user.gender || "-"}

            </p>

          </div>

          <div>

            <label className="font-semibold">

              Date of Birth

            </label>

            <p>

              {user.dob || "-"}

            </p>

          </div>

          <div>

            <label className="font-semibold">

              Joined

            </label>

            <p>

              {

                new Date(

                  user.createdAt

                ).toLocaleDateString()

              }

            </p>

          </div>

        </div>

      </div>

      <div className="bg-white rounded-2xl border p-8">

        <h2 className="text-xl font-semibold mb-5">

          Update Role

        </h2>

        <select

          value={role}

          onChange={(e) =>
            setRole(e.target.value)
          }

          className="
          w-full
          border
          rounded-xl
          px-4
          py-3
          "

        >

          <option value="user">

            User

          </option>

          <option value="admin">

            Admin

          </option>

        </select>

        <button

          onClick={handleRoleUpdate}

          disabled={saving}

          className="
          mt-5
          bg-black
          text-white
          px-6
          py-3
          rounded-xl
          hover:bg-zinc-900
          transition
          "

        >

          {

            saving

              ? "Updating..."

              : "Update Role"

          }

        </button>

      </div>

      <div className="bg-white rounded-2xl border border-red-200 p-8">

        <h2 className="text-xl font-semibold text-red-600">

          Danger Zone

        </h2>

        <p className="text-gray-500 mt-2">

          Permanently delete this user.

        </p>

        <button

          onClick={handleDelete}

          disabled={deleting}

          className="
          mt-5
          bg-red-600
          text-white
          px-6
          py-3
          rounded-xl
          hover:bg-red-700
          transition
          "

        >

          {

            deleting

              ? "Deleting..."

              : "Delete User"

          }

        </button>

      </div>

    </div>

  );

}

export default UserDetails;