import { useEffect, useState } from "react";

import {

  getProfile,

  updateProfile,
  changePassword,

} from "../../services/profileService";

import {

  showSuccess,

  showError,

} from "../../utils/toast";

import Loader from "../../components/common/Loader";

function Settings() {

  const [profile, setProfile] =
    useState({});

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);
    const [passwords, setPasswords] =
useState({

  currentPassword: "",

  newPassword: "",

  confirmPassword: "",

});

const [passwordLoading, setPasswordLoading] =
useState(false);

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

  useEffect(() => {

    fetchProfile();

  }, []);

  const handleChange = (e) => {

    setProfile({

      ...profile,

      [e.target.name]:
      e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      await updateProfile(profile);

      showSuccess(
        "Profile Updated Successfully"
      );

    } catch (error) {

      console.log(error);

      showError(
        error.response?.data?.message ||
        "Update Failed"
      );

    } finally {

      setSaving(false);

    }

  };
  const handlePasswordChange = async (
  e
) => {

  e.preventDefault();

  if (

    passwords.newPassword !==

    passwords.confirmPassword

  ) {

    showError(
      "Passwords do not match"
    );

    return;

  }

  try {

    setPasswordLoading(true);

    await changePassword({

      currentPassword:
        passwords.currentPassword,

      newPassword:
        passwords.newPassword,

    });

    showSuccess(
      "Password Changed Successfully"
    );

    setPasswords({

      currentPassword: "",

      newPassword: "",

      confirmPassword: "",

    });

  } catch (error) {

    console.log(error);

    showError(

      error.response?.data?.message ||

      "Failed to change password"

    );

  } finally {

    setPasswordLoading(false);

  }

};

  if (loading) {

    return <Loader />;

  }

  return (

    <div className="max-w-3xl mx-auto">

      <div className="bg-white rounded-2xl border p-8">

        <h1 className="text-3xl font-bold">

          Settings

        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 mt-8"
        >

          <input

            name="fullname"

            value={profile.fullname || ""}

            onChange={handleChange}

            placeholder="Full Name"

            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            "

          />

          <input

            name="email"

            value={profile.email || ""}

            readOnly

            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            bg-gray-100
            "

          />

          <input

            name="phonenumber"

            value={profile.phonenumber || ""}

            onChange={handleChange}

            placeholder="Phone"

            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            "

          />

          <select

            name="gender"

            value={profile.gender || ""}

            onChange={handleChange}

            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            "

          >

            <option value="">

              Select Gender

            </option>

            <option value="male">

              Male

            </option>

            <option value="female">

              Female

            </option>

            <option value="other">

              Other

            </option>

          </select>

          <input

            type="date"

            name="dob"

            value={profile.dob || ""}

            onChange={handleChange}

            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            "

          />

          <button

            type="submit"

            disabled={saving}

            className="
            bg-black
            text-white
            px-6
            py-3
            rounded-xl
            "

          >

            {

              saving

                ? "Saving..."

                : "Save Changes"

            }

          </button>

        </form>
        <div
  className="
  bg-white
  rounded-2xl
  border
  p-8
  mt-8
  "
>

  <h2 className="text-2xl font-bold mb-6">

    Change Password

  </h2>

  <form

    onSubmit={handlePasswordChange}

    className="space-y-5"

  >

    <input

      type="password"

      placeholder="Current Password"

      value={passwords.currentPassword}

      onChange={(e) =>

        setPasswords({

          ...passwords,

          currentPassword:
            e.target.value,

        })

      }

      className="
      w-full
      border
      rounded-xl
      px-4
      py-3
      "

    />

    <input

      type="password"

      placeholder="New Password"

      value={passwords.newPassword}

      onChange={(e) =>

        setPasswords({

          ...passwords,

          newPassword:
            e.target.value,

        })

      }

      className="
      w-full
      border
      rounded-xl
      px-4
      py-3
      "

    />

    <input

      type="password"

      placeholder="Confirm Password"

      value={passwords.confirmPassword}

      onChange={(e) =>

        setPasswords({

          ...passwords,

          confirmPassword:
            e.target.value,

        })

      }

      className="
      w-full
      border
      rounded-xl
      px-4
      py-3
      "

    />

    <button

      type="submit"

      disabled={passwordLoading}

      className="
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

        passwordLoading

          ? "Changing..."

          : "Change Password"

      }

    </button>

  </form>

</div>

      </div>

    </div>

  );

}

export default Settings;