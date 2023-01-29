import React from "react";
import { useNavigate} from "react-router-dom";
import profile from "../assets/pp.jpg";
import styles from "../styles/UserName.module.css";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidate } from "../helper/validate";
import useFetch from '../hooks/fetch.hook';
import { getUpdateUser } from "../helper/apiHelper";

export default function Profile() {
  const [{isLoading, apiData, serveError}] = useFetch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname:apiData?.firstname || "",
      lastname: apiData?.lastname ||"",
      mobile:apiData?.mobile ||'',
      email:apiData?.email||'',
      address:apiData?.address||'',
    },
    enableReinitialize:true,
    validate:(value)=>profileValidate(value),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      console.log(value);
      const getUpdatePromise =getUpdateUser(value);
      toast.promise(getUpdatePromise,{
        loading:"Updating...",
        success:"Profile Updated",
        error:"Updation failed",
      })
    },
  });

  function onLogout(){
    localStorage.removeItem('token');
    navigate('/');
  }

  if(isLoading) return (<h1 className="text-2xl font-bold">Loading...</h1>);
  if(serveError) return (<h1 className="text-2xl text-red-500">{serveError.error}</h1>);

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
                Want to logout?
                <span style={{color:'red'}} onClick={onLogout}>
                  Logout
              </span>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
