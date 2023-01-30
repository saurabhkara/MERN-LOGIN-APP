import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/UserName.module.css";
import { Toaster, toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { useAuthStore } from "../store/store";
import { getGenerateOTP, getVerifyOTP } from "../helper/apiHelper";

export default function Recovery() {
  const navigate = useNavigate();
  const username = useAuthStore((state) => state.auth.username);
  const [OTP, setOTP] = useState("");

  useEffect(() => {
    try {
      let OTPpromise = getGenerateOTP({ username })
        .then((code) => {
          if (code) {
            console.log(code);
            return toast.success(
              "OTP has been sent to your registered mail.!!"
            );
          }
        })
        .catch((error) => {
          return toast.error(error);
        });
      toast.promise(OTPpromise, {
        loading: "Sending OTP",
      });
    } catch (error) {
      return toast.error("Couldn't genrate OTP");
    }
  }, [username]);

  function onSubmitHandle(e) {
    e.preventDefault();
    let code = parseInt(OTP);
    getVerifyOTP({ code, username })
      .then((item) => {
        if (item.status === 200) {
          toast.success("OTP Verified");
          navigate("/reset");
        }
      })
      .catch(() => {
        return toast.error("Please enter correct OTP");
      });
  }

  const onResendHandle = async () => {
    try {
      const responsePromise = getGenerateOTP({ username }).then((code) => {
        console.log(code);
      });

      toast.promise(responsePromise, {
        loading: "Sending",
        success: "OTP resent",
        error: "Failed !!, please try again",
      });
    } catch (error) {
      console.log(error);
    }
  };

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
                onChange={(e) => {
                  setOTP(e.target.value);
                }}
              />
              <button
                className={styles.btn}
                type="submit"
                onClick={onSubmitHandle}
              >
                Verify
              </button>
            </div>
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500">
              Don't Receive OTP ?{" "}
              <span
                onClick={onResendHandle}
                className="text-red-500"
                style={{ backgroundColor: "transparent" }}
              >
                Resend OTP
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
