import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImage, getName } from "../../../Util.js/getData";
import { SlOptionsVertical } from "react-icons/sl";
import { setOption } from "../../../Slices/MessageSlice";
const Header = ({ chat }) => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch()
  function openModal(){
    dispatch(setOption(true))
  }
  return (
    <div className="min-w-full bg-gray-100 min-h-4  flex items-center justify-between">
      <div className="flex  items-center ml-4">
        <img
          src={getImage(chat, user)}
          className="w-[3rem] aspect-square object-cover bg-center  rounded-full m-3 "
        />
        <p className="text-black text-2xl  ">
            {
                getName(chat,user)
            }
        </p>
      </div>
      {
        chat.isGroupChat && <SlOptionsVertical className="w-5 h-5 mr-5 cursor-pointer" onClick={openModal}/>
      }
    </div>
  );
};

export default Header;
