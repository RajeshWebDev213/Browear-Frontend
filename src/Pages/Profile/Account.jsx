import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import {
  User,
  Mail,
  Phone,
  Calendar,
  VenusAndMars,
  Pencil,
} from "lucide-react";

import {
  getProfile,
} from "../../services/profileService";

import Loader from "../../components/common/Loader";

function Account() {

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const data =
        await getProfile();

      setProfile(
        data.user || data
      );

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

    <div
      className="
      bg-white
      rounded-2xl
      border
      border-gray-200
      p-8
      shadow-sm
      "
    >

      {/* Header */}

      <div
        className="
        flex
        items-center
        justify-between
        mb-8
        "
      >

        <h2 className="text-2xl font-bold">

          My Profile

        </h2>

        <Link

          to="/account/edit"

          className="
          flex
          items-center
          gap-2
          bg-black
          text-white
          px-5
          py-3
          rounded-xl
          hover:bg-zinc-900
          transition
          "

        >

          <Pencil size={18} />

          Edit Profile

        </Link>

      </div>

      {/* Avatar */}

      <div
        className="
        flex
        flex-col
        items-center
        mb-10
        "
      >

        {

          profile?.avatar ? (

            <img

              src={profile.avatar}

              alt={profile.fullname}

              className="
              w-28
              h-28
              rounded-full
              object-cover
              border-4
              border-gray-200
              "

            />

          ) : (

            <div
              className="
              w-28
              h-28
              rounded-full
              bg-black
              text-white
              text-4xl
              font-bold
              flex
              items-center
              justify-center
              "
            >

              {

                profile?.fullname
                  ?.charAt(0)
                  ?.toUpperCase() || "U"

              }

            </div>

          )

        }

        <h3 className="mt-5 text-2xl font-semibold">

          {profile?.fullname}

        </h3>

        <p className="text-gray-500">

          {profile?.email}

        </p>

      </div>

      {/* Personal Information */}

      <div
        className="
        grid
        md:grid-cols-2
        gap-6
        "
      >

        <InfoCard

          icon={<User size={20} />}

          label="Full Name"

          value={profile?.fullname}

        />

        <InfoCard

          icon={<Mail size={20} />}

          label="Email"

          value={profile?.email}

        />

        <InfoCard

          icon={<Phone size={20} />}

          label="Phone"

          value={
            profile?.phonenumber ||
            "Not Added"
          }

        />

        <InfoCard

          icon={
            <VenusAndMars size={20} />
          }

          label="Gender"

          value={
            profile?.gender ||
            "Not Added"
          }

        />

        <InfoCard

          icon={<Calendar size={20} />}

          label="Date of Birth"

          value={
            profile?.dob
              ? new Date(
                  profile.dob
                ).toLocaleDateString()
              : "Not Added"
          }

        />

      </div>

    </div>

  );

}

function InfoCard({

  icon,

  label,

  value,

}) {

  return (

    <div
      className="
      border
      rounded-2xl
      p-5
      flex
      items-center
      gap-4
      "
    >

      <div
        className="
        w-12
        h-12
        rounded-full
        bg-gray-100
        flex
        items-center
        justify-center
        "
      >

        {icon}

      </div>

      <div>

        <p
          className="
          text-sm
          text-gray-500
          "
        >

          {label}

        </p>

        <p className="font-semibold">

          {value}

        </p>

      </div>

    </div>

  );

}

export default Account;