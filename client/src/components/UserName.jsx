import React from "react";
import { Link, useNavigate} from "react-router-dom";
import profile from "../assets/pp.jpg";
import styles from "../styles/UserName.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { usernameValidate } from "../helper/validate";
import { useAuthStore } from "../store/store";

export default function UserName() {
    const setUsername = useAuthStore(state=>state.setUsername);
    const navigate= useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validate:(value)=>usernameValidate(value),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      setUsername(value.username);
      navigate('/password')
    },
  });

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello Again!!</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-5">
              Explore more by connecting with us!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={profile} alt="avatar" className={styles.profile_img} />
            </div>
            <div className="textbox flex flex-col gap-6 items-center">
              <input
                type="text"
                placeholder="Username"
                className={styles.textbox}
                {...formik.getFieldProps("username")}
              />
              <button className={styles.btn} type="submit">
                Let's Go
              </button>
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
