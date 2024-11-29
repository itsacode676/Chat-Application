import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setOption } from "../../../Slices/MessageSlice";
import { Fade } from "@mui/material";
import { RxCross1 } from "react-icons/rx";
import GroupMembers from "./GroupMembers";
import { useState } from "react";
import { removeFromGroup, renameGroup } from "../../../Services/Operations/chat";
import { searchSender } from "../../../Services/Operations/user";
import { GrLinkNext } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import AddSearches from "./AddSearches";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "400px",
  backgroundColor: "background.paper",
  boxShadow: 24,
  borderRadius: 3,
  padding: "16px",
};

export default function MessageModal() {
  const { user } = useSelector((state) => state.auth);
  const { option } = useSelector((state) => state.message);
  const { selectedChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const handleClose = () => dispatch(setOption(false));
  const [search, setSearch] = useState("");
  const [rename, setRename] = useState({
    groupName: "",
  });
  function renameHandler(e) {
    setRename({
      [e.target.name]: e.target.value,
    });
  }
  function changeNameGroup() {
    const data = { ...rename, groupId: selectedChat._id };
    dispatch(renameGroup(data, user.token));
  }
  function searchUser() {
    dispatch(searchSender(search, user.token));
  }
  function leaveGrp(data) {
    const newData = {
      userId: user.id,
      groupId: selectedChat?._id,
    };
    dispatch(removeFromGroup(newData, user.token));
  }
  return (
    <div>
      <Modal
        open={option}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="min-w-full">
            <div className="relative rounded-xl w-full h-full mb-3 flex flex-col">
              <RxCross1
                className="h-7 w-7 font-black text-black cursor-pointer mr-5 mb-2"
                onClick={handleClose}
              />
              <div className="min-w-full px-3">
                <div className="flex flex-col gap-2  min-w-full font-semibold text-black">
                  <div className="flex min-w-full mr-4 my-3">
                    <label
                      className="text-lg m-1 order-2 px-5 py-3 cursor-pointer text-white bg-black rounded-lg flex items-center justify-center"
                      onClick={changeNameGroup}
                    >
                      Rename
                    </label>
                    <input
                      type="text"
                      name="groupName"
                      className="w-[85%] bg-[#fff] text-lg py-2 border-2 px-4 border-[#A9A9A9] rounded-lg"
                      placeholder="Group Name"
                      onChange={(e) => renameHandler(e)}
                      value={rename.groupName}
                    />
                  </div>
                  {selectedChat?.groupAdmin?._id == user.id && <GroupMembers />}
                  {selectedChat?.groupAdmin?._id == user.id && (
                    <div className="flex flex-col  gap-2  w-full">
                      <div className="w-full">
                        <label
                          htmlFor=""
                          className="w-[100%] flex items-center  gap-1 bg-white rounded-xl border border-black"
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
                      <AddSearches />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <button className="ml-3 text-md text-white p-2 px-3 rounded-md bg-[#b71c1c]" onClick={leaveGrp}>Leave group</button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
