import { useEffect, useState } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";

import Loader from "../../components/common/Loader";

import {
  getSingleUser,
  updateUserRole,
  deleteUser,
} from "../../services/profileService";

import {
  showSuccess,
  showError,
} from "../../utils/toast";

function UserDetails() {

  const { userId } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const [role, setRole] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const fetchUser = async () => {

    try {

      const data = await getSingleUser(userId);

      const currentUser = data.user || data;

      setUser(currentUser);

      setRole(currentUser.role);

    } catch (error) {

      console.log(error);

      showError("Failed to load user.");

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
        "Role Updated Successfully"
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

    const confirmDelete =
      window.confirm(
        "Delete this user?"
      );

    if (!confirmDelete) return;

    try {

      setDeleting(true);

      await deleteUser(userId);

      showSuccess(
        "User Deleted Successfully"
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
        className="text-blue-600"
      >
        ← Back
      </Link>

      <div className="bg-white rounded-2xl border p-8">

        <h1 className="text-3xl font-bold">

          User Details

        </h1>

        <div className="mt-8 space-y-4">

          <p>

            <strong>Name:</strong>{" "}

            {user.fullname}

          </p>

          <p>

            <strong>Email:</strong>{" "}

            {user.email}

          </p>

          <p>

            <strong>Phone:</strong>{" "}

            {user.phonenumber || "-"}

          </p>

          <p>

            <strong>Gender:</strong>{" "}

            {user.gender || "-"}

          </p>

          <p>

            <strong>Date of Birth:</strong>{" "}

            {user.dob || "-"}

          </p>

          <p>

            <strong>Joined:</strong>{" "}

            {new Date(
              user.createdAt
            ).toLocaleDateString()}

          </p>

        </div>

      </div>

      <div className="bg-white rounded-2xl border p-8">

        <h2 className="text-xl font-semibold mb-4">

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
          "

        >

          {saving

            ? "Updating..."

            : "Update Role"}

        </button>

      </div>

      <div className="bg-white rounded-2xl border p-8">

        <h2 className="text-xl font-semibold text-red-600">

          Danger Zone

        </h2>

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
          "

        >

          {deleting

            ? "Deleting..."

            : "Delete User"}

        </button>

      </div>

    </div>

  );

}

export default UserDetails;