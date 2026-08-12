import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Save } from "lucide-react";

import {
  getProfile,
  updateProfile,
  uploadProfilePicture,
} from "../../services/profileService";

import Loader from "../../components/common/Loader";
import { showSuccess, showError } from "../../utils/toast";

function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    avatar: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const data = await getProfile();
      const user = data.user || data;
      console.log("Profile API Response:", user);

      setFormData({
        fullname: user.fullname || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "",
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.substring(0, 10) : "",
        avatar: user.avatar || "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const data = new FormData();
      data.append("avatar", file);

      const res = await uploadProfilePicture(data);

      setFormData({ ...formData, avatar: res.avatar });
      showSuccess("Profile picture updated");
    } catch (error) {
      console.log(error);
      showError("Upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      console.log("Frontend sending:", formData);
      await updateProfile(formData);

      showSuccess("Profile Updated");
      navigate("/account");
    } catch (error) {
      console.log(error);
      showError(error.response?.data?.message || "Update Failed");
    } finally {
      setSaving(false);
    }
  };

  console.log("Current formData:", formData);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="border border-gray-200 bg-white p-8">
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
        Account
      </span>
      <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
        Edit Profile
      </h2>

      <form onSubmit={handleSubmit} className="mt-8 space-y-8">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="relative">
            {formData.avatar ? (
              <img
                src={formData.avatar}
                alt="avatar"
                className="h-28 w-28 rounded-full border border-gray-200 object-cover"
              />
            ) : (
              <div className="flex h-28 w-28 items-center justify-center rounded-full bg-black text-3xl text-white">
                {formData.fullname?.charAt(0)?.toUpperCase()}
              </div>
            )}

            <label className="absolute bottom-0 right-0 flex h-9 w-9 cursor-pointer items-center justify-center border-2 border-white bg-black text-white">
              <Upload size={15} />
              <input type="file" hidden accept="image/*" onChange={handleImage} />
            </label>
          </div>
        </div>

        {/* Fields */}
        <div className="grid gap-6 md:grid-cols-2">
          <Input
            label="Full Name"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
          />

          <Input
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <Input
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <div>
            <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-2 w-full border-b border-gray-300 bg-transparent py-2.5 text-[15px] text-gray-900 outline-none transition-colors focus:border-black"
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <Input
            type="date"
            label="Date of Birth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>

        <button
          disabled={saving}
          className="mt-2 flex items-center gap-2 bg-black px-8 py-3 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800 disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}

function Input({ label, type = "text", ...props }) {
  return (
    <div>
      <label className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </label>
      <input
        type={type}
        {...props}
        className="mt-2 w-full border-b border-gray-300 bg-transparent py-2.5 text-[15px] text-gray-900 outline-none transition-colors focus:border-black"
      />
    </div>
  );
}

export default EditProfile;