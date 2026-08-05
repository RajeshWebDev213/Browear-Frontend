import { useEffect, useState } from "react";

import {
  useNavigate,
} from "react-router-dom";

import {
  Upload,
  Save,
} from "lucide-react";

import {
  getProfile,
  updateProfile,
  uploadProfilePicture,
} from "../../services/profileService";

import Loader from "../../components/common/Loader";

import {
  showSuccess,
  showError,
} from "../../utils/toast";

function EditProfile() {

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [formData, setFormData] =
    useState({

      fullname: "",

      email: "",

      phonenumber: "",

      gender: "",

      dob: "",

      avatar: "",

    });

  useEffect(() => {

    fetchProfile();

  }, []);

  const fetchProfile = async () => {

    try {

      const data =
        await getProfile();

      const user =
        data.user || data;

      setFormData({

        fullname:
          user.fullname || "",

        email:
          user.email || "",

        phonenumber:
          user.phonenumber || "",

        gender:
          user.gender || "",

        dob:
          user.dob
            ? user.dob.substring(0,10)
            : "",

        avatar:
          user.avatar || "",

      });

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value,

    });

  };

  const handleImage = async (e) => {

    try {

      const file =
        e.target.files[0];

      if(!file) return;

      const data =
        new FormData();

      data.append(
        "avatar",
        file
      );

      const res =
        await uploadProfilePicture(
          data
        );

      setFormData({

        ...formData,

        avatar:
          res.avatar,

      });

      showSuccess(
        "Profile picture updated"
      );

    } catch (error) {

      console.log(error);

      showError(
        "Upload failed"
      );

    }

  };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        setSaving(true);

        await updateProfile(
          formData
        );

        showSuccess(
          "Profile Updated"
        );

        navigate("/account");

      } catch (error) {

        console.log(error);

        showError(

          error.response?.data
            ?.message ||

          "Update Failed"

        );

      } finally {

        setSaving(false);

      }

    };

  if(loading){

    return <Loader/>;

  }

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

      <h2 className="text-2xl font-bold mb-8">

        Edit Profile

      </h2>

      <form

        onSubmit={handleSubmit}

        className="space-y-6"

      >

        <div className="flex justify-center">

          <div className="relative">

            {

              formData.avatar ?

              (

                <img

                  src={formData.avatar}

                  alt="avatar"

                  className="
                  w-32
                  h-32
                  rounded-full
                  object-cover
                  border
                  "

                />

              ) :

              (

                <div
                  className="
                  w-32
                  h-32
                  rounded-full
                  bg-black
                  text-white
                  text-4xl
                  flex
                  items-center
                  justify-center
                  "
                >

                  {

                    formData.fullname
                      ?.charAt(0)
                      ?.toUpperCase()

                  }

                </div>

              )

            }

            <label
              className="
              absolute
              bottom-0
              right-0
              bg-black
              text-white
              p-2
              rounded-full
              cursor-pointer
              "
            >

              <Upload size={18}/>

              <input

                type="file"

                hidden

                accept="image/*"

                onChange={handleImage}

              />

            </label>

          </div>

        </div>

        <div
          className="
          grid
          md:grid-cols-2
          gap-6
          "
        >

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

            name="phonenumber"

            value={formData.phonenumber}

            onChange={handleChange}

          />

          <div>

            <label className="font-medium">

              Gender

            </label>

            <select

              name="gender"

              value={formData.gender}

              onChange={handleChange}

              className="
              w-full
              mt-2
              border
              rounded-xl
              px-4
              py-3
              "

            >

              <option value="">

                Select

              </option>

              <option value="Male">

                Male

              </option>

              <option value="Female">

                Female

              </option>

              <option value="Other">

                Other

              </option>

            </select>

          </div>

          <Input

            type="date"

            label="Date of Birth"

            name="dob"

            value={formData.dob}

            onChange={handleChange}

          />

        </div>

        <button

          disabled={saving}

          className="
          mt-6
          bg-black
          text-white
          px-8
          py-3
          rounded-xl
          flex
          items-center
          gap-2
          hover:bg-zinc-900
          disabled:opacity-50
          "

        >

          <Save size={18}/>

          {

            saving

            ?

            "Saving..."

            :

            "Save Changes"

          }

        </button>

      </form>

    </div>

  );

}

function Input({

  label,

  type="text",

  ...props

}){

  return(

    <div>

      <label className="font-medium">

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
        "

      />

    </div>

  );

}

export default EditProfile;