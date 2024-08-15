import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Button from "../Components/Reuseable/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../Slices/AuthSlice";
import { otp } from "../Services/Operations/auth";
import toast from "react-hot-toast";

const Homepage = () => {
  const [show, setShow] = useState(false);
  const [conshow, setConShow] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  function contoggle() {
    setConShow((prev) => !prev);
  }

  function toggle() {
    setShow((prev) => !prev);
  }

  function onSubmit(data) {
    dispatch(setSignupData(data));
    dispatch(otp(data));
    navigate("/otp");
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full min-h-screen px-10 py-10">

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Pigeon Post
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full flex items-center justify-center gap-10">
                <div className="">
                  <label
                    for="firstName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Jhon"
                    {...register("firstName", { required: true })}
                  />
                  {errors.firstName && (
                    <span className="-mt-1 text-[12px] text-red-600">
                      Please enter your name.
                    </span>
                  )}
                </div>
                <div className="">
                  <label
                    for="lastName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    {...register("lastName", { required: true })}
                  />
                  {errors.LastName && (
                    <span className="-mt-1 text-[12px] text-red-600">
                      Please enter your name.
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required=""
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="-mt-1 text-[12px] text-red-600">
                    Please enter your email.
                  </span>
                )}
              </div>
              <div className="relative">
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type={show ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  {...register("password", { required: true })}
                />
                {show ? (
                  <FaRegEye
                    className="text-md absolute bottom-[20%] right-[2%]"
                    onClick={toggle}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="text-md absolute bottom-[20%] right-[2%]"
                    onClick={toggle}
                  />
                )}
                {errors.password && (
                  <span className="-mt-1 text-[12px] text-red-600">
                    Please enter your password.
                  </span>
                )}
              </div>
              <div className="relative">
                <label
                  for="conPassword"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type={conshow ? "text" : "password"}
                  name="conPassword"
                  id="conPassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                  {...register("conPassword", { required: true })}
                />
                {conshow ? (
                  <FaRegEye
                    className="text-md absolute bottom-[20%] right-[2%]"
                    onClick={contoggle}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="text-md absolute bottom-[20%] right-[2%]"
                    onClick={contoggle}
                  />
                )}

                {errors.conPassword && (
                  <span className="-mt-1 text-[12px] text-red-600">
                    Please enter your password.
                  </span>
                )}
              </div>
              <Button data={"Create an account"} />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <NavLink
                  to={"/login"}
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
