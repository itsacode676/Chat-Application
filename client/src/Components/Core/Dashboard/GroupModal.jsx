import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { RxCross1 } from "react-icons/rx";
import { useState } from "react";
import { FaUsers } from "react-icons/fa";
import { setGroupModal } from "../../../Slices/ModalSlice";
import DropZone from "../../Reuseable/DropZone";
import { searchSender } from "../../../Services/Operations/user";
import { IoMdSearch } from "react-icons/io";
import { GrLinkNext } from "react-icons/gr";
import GroupSearches from "./GroupSearches";
import GroupMembers from "./GroupMembers";
import { createGroup } from "../../../Services/Operations/chat";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "#fff",
  boxShadow: 24,
  borderRadius: 4, // Adjust the value as needed
};

export default function groupModal() {
  const { token } = useSelector((state) => state.auth);
  const {groupMembers} = useSelector(state => state.chat)
  const [userData, setUserData] = useState({
    chatName: "",
  });
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const { group } = useSelector((state) => state.modal);
  const handleClose = () => dispatch(setGroupModal(false));
  const [search, setSearch] = useState("");

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
    formData.append("groupPic", file);
    formData.append("groupName", userData.chatName);
    formData.append("users", JSON.stringify(groupMembers));
    dispatch(createGroup(formData , token))
    dispatch(setGroupModal(false));
  }

  function searchUser() {
    dispatch(searchSender(search, token));
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={group}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={group}>
          <Box sx={style}>
            <div className=" flex">
              <div className="relative rounded-xl w-[50%] h-full mb-3 flex flex-col">
                <RxCross1
                  className="h-7 w-7 m-5 mt-5 font-black text-black cursor-pointer absolute top-0 left-0"
                  onClick={handleClose}
                />
                <div className="flex flex-col gap-5">
                  <div className="w-full flex justify-center my-5">
                    {preview ? (
                      <img
                        src={preview}
                        alt="User"
                        className="h-[4.5rem] w-[4.5rem] rounded-full flex cursor-pointer bg-cover bg-center object-cover aspect-ratio"
                      />
                    ) : (
                      <FaUsers className="h-12 w-12" />
                    )}
                  </div>
                  <div className="flex flex-col gap-2 mx-auto w-full font-semibold text-black">
                    <div className="flex flex-col gap-2 ml-5">
                      <label className="text-xl m-1">Group Name</label>
                      <input
                        type="text"
                        name="chatName"
                        className="w-[85%] bg-[#fff] text-lg py-2 border-2 px-4 border-[#A9A9A9] rounded-lg"
                        placeholder="Group Name"
                        value={userData.chatName}
                        onChange={(e) => userHandler(e)}
                      />
                    </div>
                    <DropZone getFile={getFile} text={"Group Picture"} />
                    <GroupMembers />
                    <div className="flex items-center gap-4 w-full ml-6">
                      <button
                        onClick={submitHandler}
                        className="w-[80%]  text-white bg-black focus:ring-4 shadow-lg hover:shadow-none hover:scale-95 transition duration-200 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Create
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-[0.10rem] min-h-full bg-gray-200"></div>
              <div className="w-[50%]  flex flex-col items-center">
                <div className="w-full">
                  <label
                    htmlFor=""
                    className="w-[88%] flex items-center m-7 gap-1 bg-white rounded-xl border border-black"
                  >
                    <IoMdSearch className="text-gray-300 text-3xl font-black ml-3" />
                    <input
                      type="text"
                      value={search}
                      placeholder={`Search User`}
                      onChange={(e) => setSearch(e.target.value)}
                      className="p-[10px]  px-2 outline-none"
                    />
                    <GrLinkNext
                      className="text-gray-300 text-xl font-black ml-14 hover:text-gray-900"
                      onClick={searchUser}
                    />
                  </label>
                </div>
                <GroupSearches />
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
