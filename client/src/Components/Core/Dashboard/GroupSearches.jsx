import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMember } from "../../../Slices/ChatSlice";

const GroupSearches = () => {
  const dispatch = useDispatch();
  const { searchData } = useSelector((state) => state.drawer);

  function addUser(data) {
    dispatch(addMember(data));
  }

  return (
    <div className="w-[90%] flex flex-col gap-2  mx-auto ">
      {searchData?.slice(0, 4).map((search) => (
        <div
          onClick={() => addUser(search)}
          className="flex items-center gap-4 ml-2  bg-gray-100 hover:bg-gray-300 transition p-2 rounded-xl cursor-pointer"
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

export default GroupSearches;
