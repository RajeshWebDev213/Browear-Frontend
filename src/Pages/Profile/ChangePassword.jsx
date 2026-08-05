import { useState } from "react";

import { Lock } from "lucide-react";

import {
  changePassword,
} from "../../services/profileService";

import {
  showSuccess,
  showError,
} from "../../utils/toast";

function ChangePassword() {

  const [formData, setFormData] =
    useState({

      currentPassword: "",

      newPassword: "",

      confirmPassword: "",

    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (

      formData.newPassword !==

      formData.confirmPassword

    ) {

      return showError(

        "Passwords do not match"

      );

    }

    try {

      setLoading(true);

      await changePassword({

        currentPassword:
          formData.currentPassword,

        newPassword:
          formData.newPassword,

      });

      showSuccess(

        "Password Changed Successfully"

      );

      setFormData({

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

      setLoading(false);

    }

  };

  return (

    <div
      className="
      bg-white
      rounded-2xl
      border
      border-gray-200
      p-8
      "
    >

      <div
        className="
        flex
        items-center
        gap-3
        mb-8
        "
      >

        <Lock size={28} />

        <h2 className="text-2xl font-bold">

          Change Password

        </h2>

      </div>

      <form

        onSubmit={handleSubmit}

        className="space-y-6"

      >

        <Input

          type="password"

          label="Current Password"

          name="currentPassword"

          value={
            formData.currentPassword
          }

          onChange={handleChange}

        />

        <Input

          type="password"

          label="New Password"

          name="newPassword"

          value={
            formData.newPassword
          }

          onChange={handleChange}

        />

        <Input

          type="password"

          label="Confirm Password"

          name="confirmPassword"

          value={
            formData.confirmPassword
          }

          onChange={handleChange}

        />

        <button

          disabled={loading}

          className="
          bg-black
          text-white
          px-8
          py-3
          rounded-xl
          hover:bg-zinc-900
          disabled:opacity-50
          "

        >

          {

            loading

              ? "Updating..."

              : "Change Password"

          }

        </button>

      </form>

    </div>

  );

}

function Input({

  label,

  type,

  ...props

}) {

  return (

    <div>

      <label
        className="
        font-medium
        "
      >

        {label}

      </label>

      <input

        type={type}

        {...props}

        className="
        w-full
        mt-2
        border
        rounded-xl
        px-4
        py-3
        outline-none
        focus:border-black
        "

      />

    </div>

  );

}

export default ChangePassword;