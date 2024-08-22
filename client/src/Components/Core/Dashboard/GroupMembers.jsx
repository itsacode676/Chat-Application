import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { removeMember } from "../../../Slices/ChatSlice";

const GroupMembers = () => {
    const dispatch = useDispatch()
    function removeUser(data){
        dispatch(removeMember(data._id))
    }
  const { groupMembers } = useSelector((state) => state.chat);
  return (
    <div className="w-full ml-7 mb-2 flex gap-3 items-center flex-wrap">
      {groupMembers.map((data) => (
        <div className=" bg-black flex gap-2 rounded-xl py-2 px-3  items-center">
          <div className="flex text-white  font-normal gap-1">
            <span>{data.firstName}</span> <span>{data.lastName}</span>
          </div>
          <RxCross1 className="text-white text-sm cursor-pointer" onClick={() => removeUser(data)}/>
        </div>
      ))}
    </div>
  );
};

export default GroupMembers;
