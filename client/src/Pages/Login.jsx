import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import Button from "../Components/Reuseable/Button";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Services/Operations/auth";
import Spinner from "../Components/Reuseable/Spinner"

const Login = () => {
  const [show, setShow] = useState(false);
  const { loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  function toggle() {
    setShow((prev) => !prev);
  }

  function onSubmit(data) {
    dispatch(login(data,navigate));
  }

  return loading ? (
    <Spinner />
  ) : (
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
              Welcome Back !
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
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
              <Button data={"Login your account"} />
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don't have an account?{" "}
                <NavLink
                  to={"/"}
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Create here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
