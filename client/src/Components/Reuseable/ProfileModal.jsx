import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { RxCross1 } from "react-icons/rx";
import { setProfileModal } from "../../Slices/ModalSlice";
import DropZone from "./DropZone";
import { useState } from "react";
import { userUpdate } from "../../Services/Operations/user";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#E5E5E5",
  boxShadow: 24,
  borderRadius: 4, // Adjust the value as needed
};

export default function ProfileModal() {
  const { user } = useSelector((state) => state.auth);
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.modal);
  const handleClose = () => dispatch(setProfileModal(false));


  function userHandler(e) {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  }

  function getFile(fileData) {
    const reader = new FileReader();
    reader.readAsDataURL(fileData);
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    setFile(fileData);
  }

  function submitHandler() {
    const formData = new FormData();
    formData.append("pic", file);
    formData.append("firstName", userData.firstName);
    formData.append("lastName", userData.lastName);
    dispatch(userUpdate(formData,user))
    dispatch(setProfileModal(false))
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={profile}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={profile}>
          <Box sx={style}>
            <div className="relative rounded-xl w-full h-full mb-3">
              <RxCross1
                className="h-7 w-7 m-5 mt-9 font-black text-black cursor-pointer absolute top-0 left-0"
                onClick={handleClose}
              />
              <div className="flex flex-col gap-5">
                <div className="w-full flex justify-center my-5">
                  <img
                    src={preview || user.pic}
                    alt="User"
                    className="h-[4.5rem] w-[4.5rem] rounded-full flex cursor-pointer bg-cover bg-center object-cover aspect-ratio"
                  />
                </div>
                <div className="flex flex-col gap-2 mx-auto w-full font-semibold text-black">
                  <div className="flex flex-col gap-2 ml-5">
                    <label className="text-xl m-1">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      className="w-[85%] bg-[#E5E5E5] text-lg py-2 border-2 px-4 border-[#A9A9A9] rounded-lg"
                      placeholder="FirstName"
                      value={userData.firstName}
                      onChange={(e) => userHandler(e)}
                    />
                  </div>
                  <div className="flex flex-col gap-2 ml-5">
                    <label className="text-xl m-1">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      className="w-[85%] bg-[#E5E5E5] text-lg py-2  border-2 px-4 border-[#A9A9A9] rounded-lg"
                      placeholder="LastName"
                      value={userData.lastName}
                      onChange={(e) => userHandler(e)}
                    />
                  </div>
                  <DropZone getFile={getFile} text={"Change Picture"} />
                  <div className="flex items-center gap-4 w-full ml-8">
                    <button
                      onClick={submitHandler}
                      className="w-[80%]  text-white bg-black focus:ring-4 shadow-lg hover:shadow-none hover:scale-95 transition duration-200 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
