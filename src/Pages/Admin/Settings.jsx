import { useEffect, useState } from "react";

import { getProfile, updateProfile, changePassword } from "../../services/profileService";

import { showSuccess, showError } from "../../utils/toast";

import Loader from "../../components/common/Loader";

function Settings() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordLoading, setPasswordLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      setProfile(data.user || data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      await updateProfile(profile);
      showSuccess("Profile Updated Successfully");
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Update Failed");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      showError("Passwords do not match");
      return;
    }

    try {
      setPasswordLoading(true);

      await changePassword({
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      showSuccess("Password Changed Successfully");

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Failed to change password");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const inputClass =
    "w-full border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none transition-colors focus:border-black";
  const labelClass = "mb-2 block text-xs font-medium uppercase tracking-wide text-gray-500";

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Profile */}
      <div className="border border-gray-200 p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
          Account
        </span>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
          Settings
        </h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              name="fullname"
              value={profile.fullname || ""}
              onChange={handleChange}
              placeholder="Full Name"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              name="email"
              value={profile.email || ""}
              readOnly
              className={`${inputClass} bg-gray-50 text-gray-500`}
            />
          </div>

          <div>
            <label className={labelClass}>Phone</label>
            <input
              name="phonenumber"
              value={profile.phonenumber || ""}
              onChange={handleChange}
              placeholder="Phone"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Gender</label>
            <select
              name="gender"
              value={profile.gender || ""}
              onChange={handleChange}
              className={`${inputClass} bg-white`}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={profile.dob || ""}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-black px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Change Password */}
      <div className="border border-gray-200 p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
          Security
        </span>
        <h2 className="mt-1 text-xl font-bold tracking-tight text-gray-900">
          Change Password
        </h2>

        <form onSubmit={handlePasswordChange} className="mt-6 space-y-5">
          <input
            type="password"
            placeholder="Current Password"
            value={passwords.currentPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, currentPassword: e.target.value })
            }
            className={inputClass}
          />

          <input
            type="password"
            placeholder="New Password"
            value={passwords.newPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, newPassword: e.target.value })
            }
            className={inputClass}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={passwords.confirmPassword}
            onChange={(e) =>
              setPasswords({ ...passwords, confirmPassword: e.target.value })
            }
            className={inputClass}
          />

          <button
            type="submit"
            disabled={passwordLoading}
            className="bg-black px-6 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800 disabled:opacity-50"
          >
            {passwordLoading ? "Changing..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Settings;