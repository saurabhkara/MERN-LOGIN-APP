import React from "react";
import { Link } from "react-router-dom";
import profile from "../assets/pp.jpg";
import styles from "../styles/UserName.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidate } from "../helper/validate";

export default function Profile() {
  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname:"",
      mobile:'',
      email:'',
      address:'',
    },
    validate:(value)=>profileValidate(value),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      console.log(value);
    },
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Profile</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-5">
              You can update your details.
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={profile} alt="avatar" className={styles.profile_img} />
            </div>
            <div className="textbox flex flex-col gap-6 items-center">
              <div className="flex flex-row gap-3 w-2/3">
                <input
                  type="text"
                  placeholder="First Name"
                  className={styles.textbox}
                  {...formik.getFieldProps("firstname")}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className={styles.textbox}
                  {...formik.getFieldProps("lastname")}
                />
              </div>
              <div className="flex flex-row gap-3 w-2/3">
                <input
                  type="text"
                  placeholder="Mobile No."
                  className={styles.textbox}
                  {...formik.getFieldProps("mobile")}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className={styles.textbox}
                  {...formik.getFieldProps("email")}
                />
              </div>
              <div className="flex flex-row gap-3 w-2/3">
                <input
                  type="text"
                  placeholder="Address"
                  className={styles.textbox}
                  {...formik.getFieldProps("address")}
                />
                <button className={styles.btn} type="submit">
                Update Profile
              </button>
              </div>
              
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a member{" "}
                <Link to="/register" className="text-red-500">
                  Register Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
