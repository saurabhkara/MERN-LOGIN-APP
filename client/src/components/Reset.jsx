import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/UserName.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidate } from "../helper/validate";

export default function Reset() {
  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd:""
    },
    validate:(value)=>resetPasswordValidate(value),
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
            <h4 className="text-5xl font-bold">Reset Password</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-5">
              Create new password
            </span>
          </div>
          <form className="py-2" onSubmit={formik.handleSubmit}>
            
            <div className="textbox flex flex-col gap-6 items-center">
              <input
                type="password"
                placeholder="Enter your new password"
                className={styles.textbox}
                {...formik.getFieldProps("password")}
              />
              <input
                type="password"
                placeholder="Confirm password"
                className={styles.textbox}
                {...formik.getFieldProps("confirm_pwd")}
              />
              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Not a member{" "}
                <Link to="/" className="text-red-500">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
