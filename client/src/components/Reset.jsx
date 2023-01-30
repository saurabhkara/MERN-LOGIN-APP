import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/UserName.module.css";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidate } from "../helper/validate";
import { getResetPassword } from "../helper/apiHelper";
import { useAuthStore } from "../store/store";

export default function Reset() {
  
  const navigate = useNavigate();
  const username = useAuthStore((state) => state.auth.username);

  useEffect(()=>{
  
  },[])

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: (value) => resetPasswordValidate(value),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      console.log(value);
      const resetPromise = getResetPassword({
        username,
        password: value.password,
      }).then(() => {
        setTimeout(() => {
          navigate("/");
        }, 500);
      }).catch((err)=>{
        console.log(err);
      })
    
      toast.promise(resetPromise, {
        loading: "Verifying",
        success: "Password Updated",
        error: "Password updation failed",
      });
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
