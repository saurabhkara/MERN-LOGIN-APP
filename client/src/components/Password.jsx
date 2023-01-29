import React from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../assets/pp.jpg";
import styles from "../styles/UserName.module.css";
import { Toaster,toast } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "../helper/validate";
import useFetch from "../hooks/fetch.hook";
import { useAuthStore } from "../store/store";
import { getLogin } from "../helper/apiHelper";

export default function Password() {
  const navigate = useNavigate();
  const username = useAuthStore((state) => state.auth.username);
  const [{isLoading, apiData, serveError}] = useFetch();
  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: (value) => passwordValidate(value),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      let loginPromise = getLogin({username, password:value.password});
      toast.promise(loginPromise,{
        loading:"Loading...",
        success:"Successfully Login",
        error:"Login failed, try again"
      });

      loginPromise.then((data)=>{
        localStorage.setItem('token',data.token);
        navigate('/profile')
      })
    },
  });

  if(isLoading) return (<h1 className="text-2xl font-bold">Loading...</h1>);
  if(serveError) return (<h1 className="text-2xl text-red-500">{serveError.error}</h1>);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Hello {apiData?.firstname ||apiData?.username}</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-5">
              Explore more by connecting with us!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img src={apiData?.profile || profile} alt="avatar" className={styles.profile_img} />
            </div>
            <div className="textbox flex flex-col gap-6 items-center">
              <input
                type="password"
                placeholder="password"
                className={styles.textbox}
                {...formik.getFieldProps("password")}
              />
              <button className={styles.btn} type="submit">
                Signin
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                forgot password ?{" "}
                <Link to="/recovery" className="text-red-500">
                  Recover Password
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
