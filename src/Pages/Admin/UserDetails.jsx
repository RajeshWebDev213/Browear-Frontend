import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, User } from "lucide-react";

import Loader from "../../components/common/Loader";
import {
  getSingleUser,
  updateUserRole,
  adminDeleteUser,
} from "../../services/profileService";

import { showSuccess, showError } from "../../utils/toast";

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
      showError(error.response?.data?.message || "Failed to load user");
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
      await updateUserRole(userId, role);
      showSuccess("User role updated successfully");
      fetchUser();
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Failed to update role");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleting(true);
      await adminDeleteUser(userId);
      showSuccess("User deleted successfully");
      navigate("/admin/users");
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const cardClass = "border border-gray-200 p-8";
  const sectionLabelClass = "text-xs font-semibold uppercase tracking-[0.15em] text-gray-400";

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Link
        to="/admin/users"
        className="inline-flex items-center gap-2 text-sm text-gray-500 transition-colors hover:text-black"
      >
        <ArrowLeft size={16} />
        Back to Users
      </Link>

      {/* Profile */}
      <div className={cardClass}>
        <div className="flex items-center gap-5">
          {user.avatar?.url ? (
            <img
              src={user.avatar.url}
              alt={user.fullname}
              className="h-20 w-20 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
              <User size={40} className="text-gray-400" />
            </div>
          )}

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {user.fullname}
            </h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 border-t border-gray-100 pt-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">Phone</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {user.phone || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">Gender</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {user.gender || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Date of Birth
            </p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {user.dateOfBirth || "-"}
            </p>
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-gray-400">Joined</p>
            <p className="mt-1 text-sm font-medium text-gray-900">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Update Role */}
      <div className={cardClass}>
        <span className={sectionLabelClass}>Update Role</span>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-4 w-full border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-black"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          onClick={handleRoleUpdate}
          disabled={saving}
          className="mt-5 bg-black px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800 disabled:opacity-50"
        >
          {saving ? "Updating..." : "Update Role"}
        </button>
      </div>

      {/* Danger Zone */}
      <div className="border border-red-200 p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-red-500">
          Danger Zone
        </span>
        <p className="mt-2 text-sm text-gray-500">
          Permanently delete this user.
        </p>

        <button
          onClick={handleDelete}
          disabled={deleting}
          className="mt-5 bg-red-600 px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-red-700 disabled:opacity-50"
        >
          {deleting ? "Deleting..." : "Delete User"}
        </button>
      </div>
    </div>
  );
}

export default UserDetails;