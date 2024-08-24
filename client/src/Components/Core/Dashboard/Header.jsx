import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { setOpen } from "../../../Slices/DrawerSlice";
import { setProfileModal, setLogoutModal } from "../../../Slices/ModalSlice";
import logo from "../../../Assets/logo.png"
const Header = () => {
  const [drop, setDrop] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  function toggleDrop() {
    setDrop((prev) => !prev);
  }
  const handleProfileOpen = () => {
    dispatch(setProfileModal(true));
    toggleDrop();
  };
  const handelLogout = () => {
    dispatch(setLogoutModal(true));
    toggleDrop();
  };
  function openDrawer() {
    dispatch(setOpen(true));
  }
  return (
    <div className="w-full  bg-black">
      <div className="flex  items-center py-2 w-[83%] gap-50 mx-auto justify-between">
        <div>
          <div
            htmlFor=""
            className="flex items-center mx-2 gap-1 cursor-pointer"
            onClick={openDrawer}
          >
            <IoMdSearch className="text-gray-300 text-3xl font-black ml-3" />
            <div className="text-gray-300 text-xl ml-3">Search User</div>
          </div>
        </div>
        <a
          href="#"
          className="flex items-center mb-6 text-2xl mx-2 my-4 font-semibold text-white dark:text-white"
        >
          <img
            className="w-10 h-10 mr-2"
            src={logo}
            alt="logo"
          />
          Pigeon Post
        </a>

        <div className=" flex gap-4 items-center">
          <IoMdNotifications className="text-white text-4xl font-black m-1 cursor-pointer" />
          {
            <div className="">
              <div className="flex gap-1 items-center">
                <img
                  src={user.pic}
                  alt=""
                  className="h-10 w-10 rounded-full flex cursor-pointer object-cover bg-center"
                />
                {drop ? (
                  <MdOutlineArrowDropDown
                    className="text-2xl font-semibold text-white"
                    onClick={toggleDrop}
                  />
                ) : (
                  <MdOutlineArrowDropUp
                    className="text-2xl font-semibold text-white"
                    onClick={toggleDrop}
                  />
                )}
              </div>
              {drop && (
                <div className="transition flex flex-col rounded-md absolute z-50 gap-4 top-[10%] right-16 bg-[#f0f0f0] border shadow-xl p-7">
                  <div className="text-black font-semibold flex gap-2 items-center cursor-pointer">
                    <CgProfile className="text-xl" />
                    <span onClick={handleProfileOpen}>Manage Profile</span>
                  </div>
                  <div className="text-black font-semibold flex gap-2 items-center cursor-pointer">
                    <FiLogOut className="text-xl" />
                    <span onClick={handelLogout}>Logout</span>
                  </div>
                </div>
              )}
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default Header;
