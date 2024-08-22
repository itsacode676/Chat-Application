import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGroup } from "../../../Services/Operations/chat";
import { setData } from "../../../Slices/DrawerSlice";

const AddSearches = () => {
  const dispatch = useDispatch();
  const { searchData } = useSelector((state) => state.drawer);
  const { selectedChat } = useSelector((state) => state.chat);
  const {token , user} = useSelector(state => state.auth)
  function addUser(data) {
    const newData = {
        userId:data._id,
        groupId:selectedChat._id
    }
    dispatch(addGroup(newData,token))
    dispatch(setData([]))
  }

  return (
    <div className="w-[100%] flex flex-col gap-2">
      {searchData?.slice(0, 4).map((search) => (
        <div
          onClick={() => addUser(search)}
          className="w-full flex items-center gap-4  bg-gray-100 hover:bg-gray-300 transition p-2 rounded-xl cursor-pointer"
        >
          <img
            src={search.pic}
            className="h-10 w-10 rounded-full bg-center object-cover aspect-square"
          />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <div className="text-black font-semibold">{search.firstName}</div>
              <div className="text-black font-semibold">{search.lastName}</div>
            </div>
            <div className="text-black font-extralight">{search.email}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AddSearches;
