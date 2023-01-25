import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/UserName.module.css";
import { Toaster } from "react-hot-toast";


export default function Recovery() {
 

  return (
    <div className="container mx-auto">
      <div className="flex justify-center items-center h-screen">
        <Toaster position="top-center" reverseOrder={false}></Toaster>
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Recovery</h4>
            <span className="py-4 text-sm w-2/3 text-center text-gray-5">
              Please enter your 6 digit OTP
            </span>
          </div>
          <form className="py-4">
            <div className="textbox flex flex-col gap-6 items-center">
              <input
                type="text"
                placeholder="OTP"
                className={styles.textbox}
              />
              <button className={styles.btn} type="submit">
                Signin
              </button>
            </div>
            <div className="text-center py-4">
              <span className="text-gray-500">
                Don't Receive OTP ? {" "}
                <Link to="/recovery" className="text-red-500">
                  Resend Password
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

