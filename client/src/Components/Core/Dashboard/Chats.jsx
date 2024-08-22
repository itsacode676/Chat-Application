import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChats } from "../../../Services/Operations/chat";
import { setSelectedChat } from "../../../Slices/ChatSlice";
import { useNavigate } from "react-router-dom";

import { FiPlus } from "react-icons/fi";
import { setGroupModal } from "../../../Slices/ModalSlice";
import { getImage, getName } from "../../../Util.js/getData";

const Chats = () => {
  const { chats } = useSelector((state) => state.chat);
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getChats(token));
  }, [dispatch, token]);

  function addChat(chat) {
    dispatch(setSelectedChat(chat));
    navigate(`/dashboard/selectedChat/${chat._id}`);
  }

  function addGroup() {
    dispatch(setGroupModal(true))
  }

  return (
    <div className="m-4 pl-3 w-full">
      <div className="w-full flex justify-around items-center">
        <div className="text-black text-3xl w-[40%] text-center p-2 pb-4">
          Messages
        </div>
        <div>
          <button
            onClick={addGroup}
            className="text-white flex items-center gap-2  bg-black text-lg focus:ring-4 shadow-lg hover:shadow-none hover:scale-95 transition duration-200 focus:outline-none focus:ring-primary-300 font-medium rounded-lg  px-5 py-4 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full"
          >
            New Group Chat <FiPlus className="h-7 w-7" />
          </button>
        </div>
      </div>

      {chats.map((chat) => (
        <div>
          <div
            key={chat?._id} // Assuming chat._id is a unique identifier
            className="flex items-center mr-3 p-5 gap-4 ml-2 hover:bg-gray-100 transition rounded-2xl cursor-pointer"
            onClick={() => addChat(chat)}
          >
            <img
              src={getImage(chat, user)}
              alt="Chat Avatar"
              className="h-12 w-12 rounded-full aspect-square bg-cover bg-center object-cover"
            />
            <div className="flex flex-col gap-1">
              <div className="text-black font-semibold text-xl">
                {getName(chat, user)}
              </div>
              <div className="text-black">
                {chat?.latestMessage ||
                  `Welcome to PigeonPost! ${getName(chat)}`}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
