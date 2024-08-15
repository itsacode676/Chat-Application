import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Components/Reuseable/Spinner";
import { signup } from "../Services/Operations/auth";
import { useNavigate } from "react-router-dom";

export default function Otp() {
  const { signupData, loading } = useSelector((state) => state.auth);
  const [newotp, setOtp] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate()
  async function otpSubmit() {
    let otp = Number(newotp)
    let newData = {...signupData , otp}
    await dispatch(signup(newData))
    navigate('/login')
  }
  return loading ? (
    <Spinner />
  ) : (
    <div className="min-h-screen w-full ">
      <div className="mx-auto w-[83%] min-h-full mt-10  flex flex-col gap-7 items-center justify-center">
        <div className=" flex flex-col gap-3 justify-center items-center w-full">
          <div className="text-center font-semibold text-2xl">
            Verification Code
          </div>
          <div className="text-left ml-24 font-semibold text-sm w-[30%] text-gray-500">
            We have sent the code of verification on{" "}
            <span className="text-blue-400 font-bold">{`${signupData?.email}`}</span>
          </div>
        </div>

        <OtpInput
          value={newotp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span style={{ width: "8px" }}></span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={{
            border: "1px solid black",
            borderRadius: "8px",
            width: "44px",
            height: "44px",
            fontSize: "1rem",
            color: "#000",
            fontWeight: "400",
            caretColor: "blue",
          }}
          focusStyle={{
            border: "2px solid #CFD3DB",
            outline: "none",
          }}
        />
        <div className="w-[25%]">
          <button
            onClick={otpSubmit}
            type="submit"
            className="w-full text-white bg-black focus:ring-4 shadow-lg hover:shadow-none hover:scale-95 transition duration-200 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
