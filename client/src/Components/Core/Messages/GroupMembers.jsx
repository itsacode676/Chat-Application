import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RxCross1 } from "react-icons/rx";
import { removeFromGroup } from "../../../Services/Operations/chat";

const GroupMembers = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { selectedChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  function removeUser(data) {
    const newData = {
      userId: data._id,
      groupId: selectedChat._id,
    };
    dispatch(removeFromGroup(newData, token));
  }

  return (
    <div className="w-full  mb-2 flex gap-3 items-center flex-wrap">
      {selectedChat.user.map(
        (data) =>
          data._id != user.id && (
            <div className=" bg-[#6200ea] flex gap-2 rounded-xl py-2 px-3  items-center">
              <div className="flex text-white  font-normal gap-1">
                <span>{data.firstName}</span> <span>{data.lastName}</span>
              </div>
              <RxCross1
                className="text-white text-sm cursor-pointer"
                onClick={() => removeUser(data)}
              />
            </div>
          )
      )}
    </div>
  );
};

export default GroupMembers;
