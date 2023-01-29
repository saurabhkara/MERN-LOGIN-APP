import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../assets/pp.jpg";
import styles from "../styles/UserName.module.css";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidate } from "../helper/validate";
import {convertToBase64} from '../helper/convert.js'
import { getRegister } from "../helper/apiHelper";

export default function Register() {
  const navigate = useNavigate();
  const [dp, setDp] =useState('');

  const formik = useFormik({
    initialValues: {
      username: "",
      email:"",
      password:''
    },
    validate:(value)=>registerValidate(value),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (value) => {
      value=Object.assign(value,{profile:dp})
      console.log(value);
      let regisgterPromise = getRegister(value);
      toast.promise(regisgterPromise,{
        loading: "Creating",
        success: <b>Register Successfully...</b>,
        error: <b>Could not Register..</b>
      });
      regisgterPromise.then(()=>{
        navigate('/');
      })
    },
  });


const onUpload= async (e)=>{
  let base64 = await convertToBase64(e.target.files[0]);
  setDp(base64)
}

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className={styles.glass} style={{height:'95%'}}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-2 text-sm w-2/3 text-center text-gray-5">
              Happy to join you !!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img src={dp || profile} alt="avatar" className={styles.profile_img} />
              </label>
              <input type='file' id='profile' name="profile" onChange={onUpload} />
            </div>
            <div className="textbox flex flex-col gap-4 items-center">
              <input
                type="text"
                placeholder="Username"
                className={styles.textbox}
                {...formik.getFieldProps("username")}
              />
              <input
                type="text"
                placeholder="abc@gmail.com"
                className={styles.textbox}
                {...formik.getFieldProps("email")}
              />
              <input
                type="password"
                placeholder="admin@123"
                className={styles.textbox}
                {...formik.getFieldProps("password")}
              />
              <button className={styles.btn} type="submit">
                Sign up
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Already member{" "}
                <Link to="/register" className="text-red-500">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

