import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

import { changePassword } from "../../services/profileService";
import { showSuccess, showError } from "../../utils/toast";

function ChangePassword() {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      return showError("Passwords do not match");
    }

    try {
      setLoading(true);

      await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      showSuccess("Password Changed Successfully");

      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border border-gray-200 bg-white p-8">
      <div className="flex items-center gap-2 border-b border-gray-100 pb-6">
        <Lock size={18} className="text-gray-400" />
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
          Change Password
        </span>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <Input
          type="password"
          label="Current Password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
        />

        <Input
          type="password"
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />

        <Input
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="bg-black px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
  );
}

function Input({ label, type, ...props }) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </label>

      <div className="relative mt-2">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          {...props}
          className="w-full border-b border-gray-300 bg-transparent py-2.5 pr-8 text-[15px] text-gray-900 outline-none transition-colors focus:border-black"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
          >
            {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;