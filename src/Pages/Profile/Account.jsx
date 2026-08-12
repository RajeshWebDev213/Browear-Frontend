import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  Calendar,
  VenusAndMars,
  Pencil,
  BadgeCheck,
} from "lucide-react";

import { getProfile } from "../../services/profileService";

import Loader from "../../components/common/Loader";

function Account() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="border border-gray-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 px-8 py-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
            Account
          </span>
          <h2 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
            My Profile
          </h2>
        </div>

        <Link
          to="/account/edit"
          className="flex items-center gap-2 bg-black px-5 py-2.5 text-sm font-medium tracking-wide text-white transition-colors duration-300 hover:bg-zinc-800"
        >
          <Pencil size={15} />
          Edit Profile
        </Link>
      </div>

      {/* Profile Header */}
      <div className="flex flex-col items-center px-6 py-12">
        <div className="relative">
          {profile?.avatar?.url ? (
            <img
              src={profile.avatar.url}
              alt={profile.fullname}
              className="h-32 w-32 rounded-full border-4 border-white object-cover shadow-sm"
            />
          ) : (
            <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white bg-gray-100 shadow-sm">
              <User size={56} className="text-gray-400" />
            </div>
          )}

          <Link
            to="/account/edit"
            className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center border-2 border-white bg-black text-white transition-transform hover:scale-105"
          >
            <Pencil size={15} />
          </Link>
        </div>

        <h3 className="mt-6 text-2xl font-bold tracking-tight text-gray-900">
          {profile?.fullname}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{profile?.email}</p>

        <div className="mt-4 flex items-center gap-2 bg-green-50 px-4 py-1.5 text-xs font-medium text-green-700">
          <BadgeCheck size={15} />
          Verified Account
        </div>
      </div>

      {/* Personal Information */}
      <div className="grid gap-4 px-8 pb-10 md:grid-cols-2">
        <InfoCard
          icon={<User size={18} />}
          label="Full Name"
          value={profile?.fullname || "Not Added"}
        />

        <InfoCard
          icon={<Mail size={18} />}
          label="Email Address"
          value={profile?.email || "Not Added"}
        />

        <InfoCard
          icon={<Phone size={18} />}
          label="Phone Number"
          value={profile?.phone || "Not Added"}
        />

        <InfoCard
          icon={<VenusAndMars size={18} />}
          label="Gender"
          value={profile?.gender || "Not Added"}
        />

        <InfoCard
          icon={<Calendar size={18} />}
          label="Date of Birth"
          value={
            profile?.dateOfBirth
              ? new Date(profile.dateOfBirth).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : "Not Added"
          }
        />
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 border border-gray-200 p-5 transition-colors hover:border-black">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-gray-50 text-gray-700">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {label}
        </p>
        <p className="mt-1 truncate text-sm font-medium text-gray-900">
          {value}
        </p>
      </div>
    </div>
  );
}

export default Account;